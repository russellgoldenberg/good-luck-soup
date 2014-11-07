(function() {
	'use strict';
	
	log('v0.0.1');

	var _setup;
	var _action;
	var _dimensions = {};

	var $window = $(window);
	var $htmlBody = $('html, body');
	var $fullscreen = $('.fullscreen');
	var $introContainer = $('.intro-container');
	var $sectionContainer = $('.section-container');
	var $section = $('.section');

	function init() {
		for(var s in _setup) {
			_setup[s]();
		}
	}

	function resize() {
		_dimensions.w = $window.width();
		_dimensions.h = $window.height();
		$fullscreen.css('height', _dimensions.h);
		$section.css('min-height', _dimensions.h);
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
			jumpTo('.intro-preface');
		},
		about: function() {
			jumpTo('.intro-about');
		},
		stories: function() {
			$introContainer.addClass('hide');
			$sectionContainer.removeClass('hide');
			$htmlBody.scrollTop(0);
		}
	};



	init();
})();