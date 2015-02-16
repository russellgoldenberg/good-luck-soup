'use strict';
window.G = (function () {
	
	var _mode = 'intro';
	var _isMobile = isMobile.any();

	var self = {
		init: function() {
			log('Good Luck Soup v0.1.0');
			G.ui.init();
			G.intro.init();
		},
		mode: function(mode) {
			if(mode) {
				_mode = mode;
			}
			return _mode;
		},
		mobile: function() {
			return _isMobile;
		}
	};

	return self;

})();