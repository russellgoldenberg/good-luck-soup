(function() {
	'use strict';
	
	log('v0.0.1');

	var _setup;
	var _action;
	var _dimensions = {};
	var _offset = 0;

	var $window = $(window);
	var $htmlBody = $('html, body');
	var $fullscreen = $('.fullscreen');
	var $fullscreenPeek = $('.fullscreen-peek');
	var $introContainer = $('.intro-container');
	var $sectionContainer = $('.section-container');

	var NUM_CHAPTERS = 7;

	var init = function() {
		for(var s in _setup) {
			_setup[s]();
		}
		
		_action.sequence();	
	};

	var resize = function() {
		_dimensions.w = window.innerWidth;
		_dimensions.h = $window.height();
		$fullscreen.css('min-height', _dimensions.h);
		$fullscreen.css('height', _dimensions.h);
		$fullscreenPeek.css('min-height', _dimensions.h * 0.8);
		$fullscreenPeek.css('height', _dimensions.h * 0.8);
		$('.story-container-chapters').css('width', _dimensions.w * NUM_CHAPTERS);
		$('.story-chapter').css('width', _dimensions.w);
	};

	var jumpTo = function(el) {
		var top = $(el).offset().top;
		$htmlBody.animate({
			scrollTop: top
		});
	};

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
		},

		waypoints: function() {
			// video triggers
			$('.intro-container .video-bg').each(function() {
				var waypoint = new Waypoint.Inview({
					'element': $(this)[0],
					'enter': function(direction) {
						this.element.play();
					},
					'exited': function(direction) {
						this.element.pause();
					}
				});
			});
			
		}
	};

	_action = {
		begin: function() {
			jumpTo('.intro-preface');
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

			var htmlContent = GoodLuckSoup.templates['story-content'](chapter);
			var template = 'story-content-' + story.template;
			var htmlTemplate = GoodLuckSoup.templates[template](story);

			var $content = $(htmlContent);
			$content.find('.story-content-template').html(htmlTemplate);

			var $el = $('<div class="story-chapter" data-chapter="' + i + '"></div>');

			$el.append(htmlChapter);
			$el.append($content);

			$('.story-container-chapters').append($el);
		}
		$('.story-chapter').css('width', _dimensions.w);

		$('.story-navigation-next .btn').on('click', function() {
			var index = +$(this).parent().parent().attr('data-chapter');
			slide(index);
		});

		$('.story-navigation-prev .btn').on('click', function() {
			var index = +$(this).parent().parent().attr('data-chapter') - 2;
			slide(index);
		});
	};

	var slide = function(index) {
		var offset = '-' + index * _dimensions.w + 'px';
		$('.story-container-chapters').velocity({ 
			properties: { 'left': offset },
			options: { 'duration': 500 }
		});
	};

	init();
})();