'use strict';
(function() {
	log('v0.0.3');

	var _setup;
	var _action;
	var _dimensions = {};
	var _currentIndex = 0;
	var _expand;
	var _expandHeight;
	var _transition;
	var _mode = 'intro';

	var $window = $(window);
	var $htmlBody = $('html, body');
	var $fullscreen = $('.fullscreen');
	var $fullscreenPeek = $('.fullscreen-peek');
	var $fullscreenJumbo = $('.fullscreen-jumbo');
	
	var $introBtn = $('.intro-container .btn');
	var $introVideoBg = $('.intro-container .video-bg');
	var $introContainer = $('.intro-container');
	
	var $storyContainer = $('.stories-container');
	var $stories = $('.stories');
	var $story = $('.story');
	var $storyTitleOverlineSpan = $('.story-title-overline span');
	var $storyTitleHed = $('.story-title-hed');
	var $storyTop = $('.story-top');

	var $currentStory;
	var $nextStory;

	var NUM_CHAPTERS = 7;
	var SCROLL_TRIGGER = 30;
	var DURATION = {
		tenth: 100,
		quarter: 250,
		third: 333,
		half: 500,
		three_quarters: 750,
		second: 1000
	};

	var init = function() {
		for(var s in _setup) {
			_setup[s]();
		}
		// _action.sequence();	
	};

	var resize = function() {
		_dimensions.w = window.innerWidth;
		_dimensions.h = $window.height() + 1;

		$fullscreen.css('min-height', _dimensions.h);
		$fullscreen.css('height', _dimensions.h);
		$fullscreenPeek.css('min-height', _dimensions.h * 0.8);
		$fullscreenPeek.css('height', _dimensions.h * 0.8);
		$fullscreenJumbo.css('min-height', _dimensions.h * 1.4);
		$fullscreenJumbo.css('height', _dimensions.h * 1.4);

		if($storyTop.length) {
			$storyTop.css('height', _dimensions.h * 0.35);	
		}
	};

	var jumpTo = function(el, cb) {
		var top = $(el).offset().top;
		$htmlBody.animate({
			scrollTop: top
		}, DURATION.half, function() {
			if(typeof cb === 'function') {
				cb();
			}
		});
	};

	_setup = {
		resize: function() {
			$window.on('resize', debounce(resize, 150));
			resize();
		},

		events: function() {
			$introBtn.on('click', function() {
				var action = $(this).attr('data-action');
				_action[action](this);
			});

			// $storyBtnNext.on('click', function() {
			// 	if(!_transition) {
			// 		_currentIndex += 1;
			// 		if(_currentIndex < NUM_CHAPTERS) {
			// 			slide();
			// 		}
			// 		_currentIndex = Math.min(NUM_CHAPTERS - 1, _currentIndex);
			// 	}
			// });

			// $storyBtnPrev.on('click', function() {
			// 	if(!_transition) {
			// 		_currentIndex -= 1;
			// 		if(_currentIndex > -1) {
			// 			slide();
			// 		}
			// 		_currentIndex = Math.max(0, _currentIndex);
			// 	}
			// });

			$stories.on('click', '.story-top', function() {
				var index = $(this).attr('data-index');
				var next = $(this).closest('.story').hasClass('next');
				if(next) {
					transitionToNext();
				}
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
		chapters: function() {
			generateStory(function() {
				$storyContainer.removeClass('hide').removeClass('transparent');
				_mode = 'story';
				$introContainer.addClass('hide');
				$window.scrollTop(0);
			});
		}
	};

	var generateStory = function(cb) {
		
		_currentIndex = 0;
		_expand = true;
		
		for(var i = 0; i < NUM_CHAPTERS; i++) {
			var chapter = testConfig.chapters[i];
			var story = refineData(testStory[i]);

			var htmlChapter = GoodLuckSoup.templates['story-content'](chapter);
			var template = 'story-template-' + story.template;
			var htmlTemplate = GoodLuckSoup.templates[template](story);

			var $chapter = $(htmlChapter);
			$chapter.find('.story-content-template').html(htmlTemplate);

			var $el = $('<div class="story" data-chapter="' + (i+1) + '"></div>');
			$el.append($chapter);

			$stories.append($el);
		}

		$story = $('.story');
		$storyTop = $('.story-top');

		$currentStory = $story.eq(_currentIndex);
		$nextStory = $story.eq(_currentIndex + 1);

		$currentStory.addClass('current');
		$nextStory.addClass('next');

		$currentStory.find('.story-top-text').removeClass('off');
		$currentStory.find('.story-top-next').addClass('off');
		resize();
		cb();
	};

	var refineData = function(story) {
		story.textTease = story.text.slice(0,137);
		var lastSpace = story.textTease.lastIndexOf(' ');
		story.textTease = story.textTease.slice(0, lastSpace) + '...';
		return story;
	};

	var transitionToNext = function() {

		//TODO disable scroll

		var offset = -1 * (_dimensions.h - _dimensions.h * 0.35);
		var offsetNext = offset + 'px';
		var offsetCurrent = offset * 0.5 + 'px';

		$nextStory.addClass('current').removeClass('next');
		$nextStory.find('.story-top-next').addClass('off');
		$nextStory.find('.story-top-text').removeClass('off');

		$nextStory.velocity({ 
			properties: { 
				'translateY': offsetNext,
				'translateZ': 0
			},
			options: { 'duration': DURATION.three_quarters, complete: transitionComplete }
		});
		$currentStory.velocity({ 
			properties: {
				'translateY': offsetCurrent,
				'translateZ': 0,
				'scale': 0.8,
				'opacity': 0
			},
			options: { 'duration': DURATION.three_quarters }
		});

		_currentIndex++;

		if(_currentIndex < NUM_CHAPTERS - 1)  {
			$nextStory = $story.eq(_currentIndex + 1);	
			$nextStory.addClass('next');
		}
	};

	var transitionComplete = function() {
		$currentStory.removeClass('current');
		$currentStory = $story.eq(_currentIndex);
		
		$currentStory.css('transform', '');
		
		$currentStory.velocity({ 
			properties: { 'translateY': 0 },
			options: { 'duration': 0 }
		});

		$window.scrollTop(0);
	};

	init();
})(); 	