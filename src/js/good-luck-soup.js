(function() {
	'use strict';	
	log('v0.0.2');

	var _setup;
	var _action;
	var _dimensions = {};

	var $window = $(window);
	var $htmlBody = $('html, body');
	var $fullscreen = $('.fullscreen');
	var $fullscreenPeek = $('.fullscreen-peek');
	var $storyContainerChapters = $('.story-container-chapters');
	var $storyChapter = $('.story-chapter');
	var $introBtn = $('.intro-container .btn');
	var $introVideoBg = $('.intro-container .video-bg');
	var $introContainer = $('.intro-container');
	var $storyContainer = $('.story-container');

	var NUM_CHAPTERS = 7;

	var init = function() {
		for(var s in _setup) {
			_setup[s]();
		}
		// _action.sequence();	
	};

	var resize = function() {
		_dimensions.w = window.innerWidth;
		_dimensions.h = $window.height();

		$fullscreen.css('min-height', _dimensions.h);
		$fullscreen.css('height', _dimensions.h);
		$fullscreenPeek.css('min-height', _dimensions.h * 0.8);
		$fullscreenPeek.css('height', _dimensions.h * 0.8);
		$storyContainerChapters.css('width', _dimensions.w * NUM_CHAPTERS);
		$storyChapter.css('width', _dimensions.w);
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
			$introBtn.on('click', function() {
				var action = $(this).attr('data-action');
				_action[action]();
			});
		},

		waypoints: function() {
			// video triggers
			$introVideoBg.each(function() {
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
			$introContainer.fadeOut(function() {
				$(this).addClass('hide');
				//TODO fadein with velocity
				$storyContainer.removeClass('hide');
				setTimeout(function() {
					$storyContainer.removeClass('transparent');
				}, 30);
				generateStory();
			});
		}
	};

	var generateStory = function() {
		for(var i = 0; i < NUM_CHAPTERS; i++) {
			var chapter = testConfig.chapters[i];
			var story = refineData(testStory[i]);

			var htmlChapter = GoodLuckSoup.templates['story-title-card'](chapter);

			var htmlContent = GoodLuckSoup.templates['story-content'](chapter);
			var template = 'story-template-' + story.template;
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

	var refineData = function(story) {
		story.textTease = story.text.slice(0,137);
		var lastSpace = story.textTease.lastIndexOf(' ');
		story.textTease = story.textTease.slice(0, lastSpace) + '...';
		return story;
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