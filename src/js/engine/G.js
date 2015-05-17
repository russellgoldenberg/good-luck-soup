window.G = (function () {
	'use strict';
	
	var _mode = 'intro';
	var _isMobile = isMobile.any();

	var self = {
		init: function() {
			log('Good Luck Soup v0.2.0');
			var share = self.checkShare();
			if(share) {
				self.direct(share);
			} else {
				self.kickoff();	
			}
		},
		kickoff: function() {
			self.visit(function() {
				G.ui.init();
				G.audio.init();
				G.intro.init();
				G.story.init();
			});
		},
		direct: function(id) {
			_mode = 'share';
			G.ui.init();
			G.audio.init();
			G.story.direct(id);
		},
		mode: function(mode) {
			if(mode) {
				_mode = mode;
			}
			return _mode;
		},
		mobile: function() {
			return _isMobile;
		},
		visit: function(cb) {
			self.storgeItem({'key': 'sequences_viewed', callback: function(err, value) {
				cb();
			}});
		},
		storgeItem: function(params) {
			// if value then set
			if(params.value) {
				localforage.setItem(params.key, params.value);
			} else{
				localforage.getItem(params.key, function(err, value) {
					if(params.callback && typeof params.callback === 'function') {
						params.callback(err, value);
					}
				});
			}
		},

		checkShare: function() {
			var pathname = window.location.pathname;
			var search = window.location.search;

			if(pathname.indexOf('story') > -1) {
				if(search.length && search.indexOf('id=') > -1) {
					var index = search.indexOf('=') + 1;
					return parseInt(search.substring(index, search.length));
				} else {
					// TODO error 
					log('error no story index');
				}
			}

			return false;
		}
	};

	return self;

})();