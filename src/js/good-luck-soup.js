(function() {
	log('v0.0.1');

	var _setup;
	var _action;
	var _dimensions = {};

	var $window = $(window);
	var $htmlBody = $('html, body');
	var $fullscreen = $('.fullscreen');

	function init() {
		for(var s in _setup) {
			_setup[s]();
		}
	}

	function resize() {
		_dimensions.w = $window.width();
		_dimensions.h = $window.height();
		$fullscreen.css('height', _dimensions.h);
	}

	function jumpTo(el) {
		var top = $(el).offset().top;
		$htmlBody.animate({
			scrollTop: top
		});
	}

	_setup = {
		resize: function() {
			$(window).on('resize', debounce(resize, 150));
			resize();
		},

		events: function() {
			$('.btn').on('click', function() {
				var action = $(this).attr('data-action');
				_action[action]();
			});
		}
	};

	_action = {
		preface: function() {
			jumpTo('.below-the-fold');
		}
	};



	init();
})();