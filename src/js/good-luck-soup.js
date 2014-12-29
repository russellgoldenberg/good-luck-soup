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
	// var $section = $('.section');

	// var HEADER_HEIGHT = 42;
	var HEADER_HEIGHT = 0;

	function init() {
		for(var s in _setup) {
			_setup[s]();
		}
	}

	function resize() {
		_dimensions.w = $window.width();
		_dimensions.h = $window.height() - HEADER_HEIGHT;
		$fullscreen.css('min-height', _dimensions.h);
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
			jumpTo('.intro-preface');
		},
		propoganda: function() {
			jumpTo('.intro-propoganda');
			$('#video-propoganda')[0].play();
		},
		stories: function() {
			jumpTo('.intro-stories');
			$('#video-propoganda')[0].pause();
		},
		sequence: function() {
			jumpTo('.intro-sequence');
		},
		begin: function() {
			// $introContainer.addClass('hide');
			// $sectionContainer.removeClass('hide');
			// $htmlBody.scrollTop(0);
		}
	};



	init();
})();