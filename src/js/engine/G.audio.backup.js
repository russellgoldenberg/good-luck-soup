'use strict';
G.audio = (function () {

	var Chapter = {
		path: 'assets/audio/story/',
		players: {},
		timeout: null,

		toggle: function(params) {
			if(Chapter.players[params.id]) {
				if(Chapter.playing === params.id) {
					Chapter.pause(Chapter.players[params.id]);
				} else {
					Chapter.play(Chapter.players[params.id]);
				}
			} else {
				Chapter.setupPlayer(params);
			}
		},

		setupPlayer: function(params) {
			Chapter.players[params.id] = new Howl({
				src: [Chapter.path + params.id + '.mp3', Chapter.path + params.id + '.ogg'],
				autoplay: false,
				loop: false,
				preload: true,
				volume: 0.8,
				onload: function(s) {
					Chapter.play(this);
				},
				onend: function() {
					Chapter.playing = null;
					Chapter.toggleIcon(this.el);
				}
			});

			Chapter.players[params.id].goodluckId = params.id;
			Chapter.players[params.id].el = { 
				root: params.el,
				play: params.el.find('.icon-play'), 
				pause: params.el.find('.icon-pause'),
				progress: params.el.siblings('.audio-player-progress')
			};
		},

		play: function(howlee) {
			Chapter.playing = howlee.goodluckId;
			Chapter.toggleIcon(howlee.el);
			howlee.play();
			Chapter.updateProgress(howlee);
		},

		pause: function(howlee) {
			howlee = howlee || Chapter.players[Chapter.playing];
			if(howlee) {
				clearTimeout(Chapter.timeout);
				Chapter.playing = null;
				Chapter.toggleIcon(howlee.el);
				howlee.pause();
			}
		},

		toggleIcon: function(el) {
			el.play.toggleClass('hide');
			el.pause.toggleClass('hide');
		},

		updateProgress: function(howlee) {
			var progress = Math.min((howlee.seek() / howlee.duration() * 100), 100) + '%';
			G.ui.updateAudioProgress({el: howlee.el, percent: progress});
			if(Chapter.playing) {
				Chapter.timeout = setTimeout(function() { Chapter.updateProgress(howlee) }, G.data.duration.quarter);
			}
		}
	};


	var self = {
		pauseChapter: function() {
			Chapter.pause();
		},

		toggleChapter: function(params) {
			Chapter.toggle(params);
		}
	};
	
	return self; 
})(); 