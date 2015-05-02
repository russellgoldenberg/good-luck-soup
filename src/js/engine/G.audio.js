G.audio = (function () {
	'use strict';

	var init = function() {
		Chapter.setup();
	};

	var Intro = {
		path: 'assets/audio/ambient/',
		player: {
			mobile: $('#audio-player-intro-mobile'),
			top: $('#audio-player-intro-top'),
			bottom: $('#audio-player-intro-bottom')
		},
		volume: { top: 1, bottom: 0, mobile: 0.8 },
		playing: false,
		loaded: { top: false, bottom: false },

		setup: function(cb) {
			if(G.mobile()) {
				//setup the audio players
				Intro.player.mobile.jPlayer({
		            swfPath: 'js/lib',
		            loop: true,
		            supplied: 'mp3',
		            volume: 1,
		            error: function(e) { log('audio error'); },
					abort: function(e) { log('audio abort'); },
					canplaythrough: function(e) { 
						console.log('ahooy');
						Intro.player.mobile.jPlayer('play');	
					}
	        	});

				cb();

			} else {
				
				var checkLoad = function() {
					if(Intro.loaded.top && Intro.loaded.bottom) {
						cb();
					}
				};

				//setup the audio players
				Intro.player.top.jPlayer({
		            swfPath: 'js/lib',
		            loop: true,
		            supplied: 'mp3',
		            volume: 1,
		            error: function(e) { log('audio error'); },
					abort: function(e) { log('audio abort'); },
					canplaythrough: function(e) { 
						Intro.loaded.top = true;
						checkLoad();
					}
	        	});

	        	Intro.player.bottom.jPlayer({
		            swfPath: 'js/lib',
		            loop: true,
		            supplied: 'mp3',
		            volume: 0,
		            error: function(e) { log('audio error'); },
					abort: function(e) { log('audio abort'); },
					canplaythrough: function(e) {
						Intro.loaded.bottom = true;
						checkLoad();
					}
	        	});	

	        	//load the files
	        	Intro.player.top.jPlayer('setMedia', {
					mp3: Intro.path + 'intro-top.mp3'
				});
				Intro.player.bottom.jPlayer('setMedia', {
					mp3: Intro.path + 'intro-bottom.mp3'
				});


			}
		},

		play: function() {
			Intro.playing = true;
			if(G.mobile()) {
				Intro.player.mobile.jPlayer('setMedia', {
					mp3: Intro.path + 'intro-mobile.mp3'
				});
				// Intro.player.mobile.jPlayer('play');
			} else {
				Intro.player.top.jPlayer('play');
				Intro.player.bottom.jPlayer('play');
			}
			
		},

		update: function(pos, top, bottom) {
			if(Intro.playing) {
				var total = bottom - top;

				var newTop = Math.min(1, Math.max(0, ((bottom - pos) / total)));
				var newBottom = Math.min(1, Math.max(0, ((pos - top) / total)));

				Intro.player.top.jPlayerFade().to(G.data.duration.half * 0.9, Intro.volume.top, newTop);
				Intro.player.bottom.jPlayerFade().to(G.data.duration.half, Intro.volume.bottom, newBottom);

				Intro.volume.top = newTop;
				Intro.volume.bottom = newBottom;

				// Intro.volume.bottom = Math.min(1, Math.max(0, ((pos - top) / total)));
				// Intro.volume.top = Math.min(1, Math.max(0, ((bottom - pos) / total)));
				// Intro.player.top.jPlayer('volume', Intro.volume.top);
				// Intro.player.bottom.jPlayer('volume', Intro.volume.bottom);	
			}
		},

		fade: function() {
			if(Intro.playing) {
				if(G.mobile()) {
					Intro.player.mobile.jPlayerFade().to(G.data.duration.second * 2, 0.8, 0, function() {
						Intro.player.mobile.jPlayer('destroy');
						Ambient.setup();
					});
				} else {
					Intro.player.top.jPlayerFade().to(G.data.duration.second * 2, Intro.volume.top, 0);
					Intro.player.bottom.jPlayerFade().to(G.data.duration.second * 2, Intro.volume.bottom, 0, function() {
						Intro.player.top.jPlayer('destroy');
						Intro.player.bottom.jPlayer('destroy');
						Ambient.setup();
					});
				}
			}
		}
	};

	var Ambient = {
		path: 'assets/audio/ambient/',
		player: {
			top: $('#audio-player-intro-top'),
			bottom: $('#audio-player-intro-bottom')
		},
		current: null,
		playing: false,

		setup: function() {
			// Ambient.player.jPlayer({
	  //           swfPath: 'js/lib',
	  //           loop: true,
	  //           supplied: 'mp3',
	  //           error: function(e) {
	  //           	log('audio error');
	  //           },
			// 	abort: function(e) {
			// 		log('audio abort');
			// 	},
			// 	play: function(e) {
					
			// 	},
			// 	pause: function(e) {
					
			// 	},
			// 	ended: function(e) {

			// 	}
   //      	});
		},

		hack: function() {
			log('hack the planet');
			if(!Ambient.hacked && G.mobile()) {
				Ambient.player.jPlayer('setMedia', {
		            mp3: Ambient.path + 'hack.mp3',
		        }).jPlayer('pause');
			}
			Ambient.hacked = true;
		}
	};

	var Chapter = {
		path: 'assets/audio/story/',
		player: $('#audio-player-chapter'),
		current: null,
		playing: false,

		setup: function() {
			Chapter.player.jPlayer({
	            swfPath: 'js/lib',
	            loop: false,
	            supplied: 'mp3',
	            timeupdate: Chapter.updateProgress,
	            error: function(e) {
	            	log('audio error');
	            },
				abort: function(e) {
					log('audio abort');
				},
				play: function(e) {
					
				},
				pause: function(e) {
					
				},
				ended: function(e) {
					Chapter.playing = false;
					Chapter.toggleIcon();	
				}
        	});
		},

		toggle: function(params) {
			if(Chapter.current && Chapter.current === params.id) {
				if(Chapter.playing) {
					Chapter.pause();
				} else {
					Chapter.play();
				}
			} else {
				Chapter.setMedia(params);
				Chapter.play();
			}
		},

		setMedia: function(params) {
			Chapter.current = params.id;
			Chapter.el = {
				root: params.el,
				play: params.el.find('.icon-play'), 
				pause: params.el.find('.icon-pause'),
				progress: params.el.siblings('.audio-player-progress')
			};
			Chapter.player.jPlayer('setMedia', {
				mp3: Chapter.path + params.id + '.mp3'
			});
		},

		play: function() {
			Chapter.playing = true;
			Chapter.player.jPlayer('play');
			Chapter.toggleIcon();
		},

		pause: function() {
			if(Chapter.current && Chapter.playing) {
				Chapter.playing = false;
				Chapter.player.jPlayer('pause');
				Chapter.toggleIcon();
			}
		},

		toggleIcon: function() {
			if(Chapter.current) {
				Chapter.el.play.toggleClass('hide');
				Chapter.el.pause.toggleClass('hide');	
			}
		},

		updateProgress: function(e) {
			if(Chapter.current) {
				var total = e.jPlayer.status.duration;
	        	var position = e.jPlayer.status.currentTime;

	        	var percent = position / total * 100;

				var progress = Math.min(percent, 100) + '%';
				G.ui.updateAudioProgress({el: Chapter.el, percent: progress});	
			}
		}
	};


	var self = {
		init: init,
		loadIntro: Intro.setup,
		playIntro: Intro.play,
		updateIntro: Intro.update,
		fadeIntro: Intro.fade,
		pauseChapter: Chapter.pause,
		toggleChapter: Chapter.toggle,
	};
	
	return self; 
})(); 