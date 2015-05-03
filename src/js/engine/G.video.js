G.video = (function () {
	'use strict';

	var init = function() {
		Chapter.setup();
	};

	var Intro = {
		
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
						poster: 'assets/img/story/poster.jpg',
						title: id
					});
				},
				timeupdate: Chapter.updateProgress,
				error: function(e) {
	            	log(e);
	            },
				abort: function(e) {
					log('audio abort');
				},
				play: function(e) {
					
				},
				pause: function(e) {
					
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
					Chapter.el[id].jPlayer('play').jPlayer('pauseOthers');
				}
				btn.find('.icon-play').toggleClass('hide');
				btn.find('.icon-pause').toggleClass('hide');
			}
		}
	};


	var self = {
		createChapter: Chapter.create,
		toggleChapter: Chapter.toggle
	};
	
	return self; 
})(); 