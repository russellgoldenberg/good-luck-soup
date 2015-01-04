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

	// var HEADER_HEIGHT = 42;
	var HEADER_HEIGHT = 0;
	var NUM_CHAPTERS = 7;

	var init = function() {
		for(var s in _setup) {
			_setup[s]();
		}
	}

	var resize = function() {
		_dimensions.w = $window.width();
		_dimensions.h = $window.height() - HEADER_HEIGHT;
		$fullscreen.css('min-height', _dimensions.h);
		$fullscreen.css('height', _dimensions.h);
	}

	var jumpTo = function(el) {
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
			$('.intro-container .btn').on('click', function() {
				var action = $(this).attr('data-action');
				_action[action]();
			});
			$('.strip-current').on('click', function() {
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
			$('.intro-container').fadeOut(function() {
				$(this).addClass('hide');
				//TODO fadein with velocity
				$('.story-container').removeClass('hide');
				setTimeout(function() {
					$('.story-container').removeClass('transparent');
				}, 30);
				generateStory();
			});
			
		}
	};

	var generateStory = function() {
		for(var i = 0; i < NUM_CHAPTERS; i++) {
			var chapter = testConfig.chapters[i];
			var story = testStory[i];
			var htmlChapter = GoodLuckSoup.templates['story-title-card'](chapter);

			var template = 'story-content-' + story.template;
			var htmlStory = GoodLuckSoup.templates[template](story);

			var $el = $('<div class="story-chapter"></div>');

			$el.append(htmlChapter);
			$el.append(htmlStory);
			$('.story-container').append($el);
		}

		$('.story-chapter').eq(0).addClass('highlight');

		$('.story-chapter.highlight').on('click', expandFirst);
	}

	var expandFirst = function() {
		$('.story-chapter.highlight').off('click');

		$('.story-chapter').not('.highlight').addClass('hide');

		$('.story-chapter.highlight').removeClass('highlight').addClass('current');

		$('.story-content-1').removeClass('hide');

		$('.story-navigation-next .btn').on('click', function() {
			$('.story-chapter.current').addClass('hide').removeClass('current');
			$('.story-chapter').eq(1).addClass('current').removeClass('hide');
			$('.story-content-2').removeClass('hide');			
		});
	}


	init();
})();