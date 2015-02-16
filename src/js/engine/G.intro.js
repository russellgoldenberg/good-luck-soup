'use strict';
G.intro = (function () {

	var _filepath = 'assets/img/';
	var _loaded = false;

	var preload = function(cb) {
		var loadNext = function(i) {
			loadImage(_filepath + G.data.intro.img[i], function() {
				i++;
				if(i < G.data.intro.img.length) {
					loadNext(i);
				} else {
					_loaded = true;
					cb();
				}
			});
		};

		loadNext(0);
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