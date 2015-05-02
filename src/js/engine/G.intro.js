G.intro = (function () {
	'use strict';

	var _filepath = {
		img: 'assets/img/intro/',
		audio: 'assets/audio/intro/'
	};
	var _loaded = false;

	var preload = function(cb) {
		var loadAllImages = function(i, callback) {
			loadImage(_filepath.img + G.data.intro.img[i], function() {
				i++;
				if(i < G.data.intro.img.length) {
					loadAllImages(i, callback);
				} else {
					callback();
				}
			});
		};

		var loadAllAudio = function(callback) {
			G.audio.loadIntro(function() {
				callback();	
			});
		};

		loadAllImages(0, function() {
			loadAllAudio(function() {
				_loaded = true;
				cb();
			});
		});
	};

	var self = {
		init: function() {
			preload(function() {
				G.ui.showIntro();
			});
		},
		loaded: function() {
			return _loaded;
		}
	};

	return self;

})();