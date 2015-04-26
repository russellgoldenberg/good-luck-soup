G.audio = (function () {
	'use strict';

	var init = function() {
		Ambient.setup();
		Chapter.setup();
	};

	var Ambient = {
		path: 'assets/audio/ambient/',
		player: $('#audio-player-ambient'),
		current: null,
		playing: false,

		setup: function() {
			Ambient.player.jPlayer({
	            swfPath: 'js/lib',
	            loop: true,
	            supplied: 'mp3',
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

				}
        	});
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
		hack: Ambient.hack,
		pauseChapter: function() {
			Chapter.pause();
		},
		toggleChapter: function(params) {
			Chapter.toggle(params);
		}
	};
	
	return self; 
})(); 