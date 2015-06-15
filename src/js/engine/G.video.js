G.video = (function () {
	'use strict';

	var Intro = {
		path: 'assets/video/intro/',
		players: {},

		insert: function(index, cb) {
			var id = 'intro-' + index;
			Intro.players[id] = {
				el: $('#video-bg-' + index),
				loaded: false
			};

			Intro.players[id].el.jPlayer({
				swfPath: 'js/lib',
				supplied: 'm4v',
				loop: true,
				size: {width: 'auto', height: 'auto' },
				ready: function() {
					Intro.players[id].el.jPlayer('setMedia', {
						m4v: Intro.path + id + '.mp4'
					});
					Intro.players[id].ready = true;
				},
				error: function(e) {
	            	log('error loading intro video');
	            },
				abort: function(e) {
					log('video abort');
				},
				play: function(e) {
				},
				pause: function(e) {
				},
				ended: function(e) {
				},
				canplaythrough: function() {
					//only fire once, not on loop
					if(!Intro.players[id].loaded) {
						Intro.players[id].loaded = true;
						Intro.players[id].el.removeClass('hide');
						G.ui.setupWaypoint(Intro.players[id].el);
						cb();
					}
				}
			});
		},
		play: function(id) {
			// console.log('scroll trigger play', id);
			Intro.players[id].el.jPlayer('play');
		},
		pause: function(id) {
			// console.log('scroll trigger pause', id);
			Intro.players[id].el.jPlayer('pause');
		},
		destroy: function() {
			for(var p in Intro.players) {
				Intro.players[p].el.jPlayer('destroy');
			}
		}
	};

	var Chapter = {
		path: 'assets/video/story/',
		el: {},
		playing: false,
		create: function(id) {
			Chapter.el[id] = $('#story-content-video-' + id);

			Chapter.el[id].jPlayer({
				swfPath: 'js/lib',
				supplied: 'm4v',
				size: {width: '100%', height: 'auto' },
				ready: function() {
					Chapter.el[id].jPlayer('setMedia', {
						m4v: Chapter.path + id + '.mp4',
						poster: 'assets/img/story/poster-' + id + '.jpg',
						title: id
					});
				},
				timeupdate: Chapter.updateProgress,
				error: function(e) {
	            	log('error loading chapter video');
	            },
				abort: function(e) {
					log('video abort');
				},
				play: function(e) {
					G.audio.fadeAmbient('out');
				},
				pause: function(e) {
					G.audio.fadeAmbient('in');
				},
				ended: function(e) {
				},
				canplaythrough: function() {
					
				}
			});
		},

		toggle: function(id, btn) {
			if(Chapter.el[id]) {
				if(Chapter.playing === id) {
					Chapter.el[id].jPlayer('pause');
					Chapter.playing = null;
				} else {
					Chapter.playing = id;
					Chapter.el[id].jPlayer('play');
				}
				btn.find('.icon-play').toggleClass('hide');
				btn.find('.icon-pause').toggleClass('hide');
			}
		},

		pause: function() {
			if(Chapter.playing) {
				Chapter.el[Chapter.playing].jPlayer('pause');
				Chapter.playing = false;
				$('.video-player-btn .icon-play').removeClass('hide');
				$('.video-player-btn .icon-pause').addClass('hide');
			}
		},

		destroy: function() {
			for(var p in Chapter.el) {
				Chapter.el[p].jPlayer('destroy');
			}
			Chapter.el = {};
			Chapter.playing = false;
		}
	};


	var self = {
		playIntro: Intro.play,
		pauseIntro: Intro.pause,
		insertIntro: Intro.insert,
		destroyIntro: Intro.destroy,
		createChapter: Chapter.create,
		toggleChapter: Chapter.toggle,
		pauseChapter: Chapter.pause,
		destroyChapter: Chapter.destroy,
	};
	
	return self; 
})(); 