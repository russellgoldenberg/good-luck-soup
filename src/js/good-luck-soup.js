(function() {
	'use strict';	
	log('v0.0.2');

	var _setup;
	var _action;
	var _dimensions = {};
	var _currentIndex = 0;
	var _expand;
	var _expandHeight;
	var _transition;

	var $window = $(window);
	var $htmlBody = $('html, body');
	var $fullscreen = $('.fullscreen');
	var $fullscreenPeek = $('.fullscreen-peek');
	
	var $introBtn = $('.intro-container .btn');
	var $introVideoBg = $('.intro-container .video-bg');
	var $introContainer = $('.intro-container');
	
	var $storyContainer = $('.story-container');
	var $storyTop = $('.story-top');
	var $storyBottom = $('.story-bottom');
	var $storyChapters = $('.story-chapters');
	var $storyChapter = $('.story-chapter');
	var $storyExpand = $('.expand .story-top');
	var $storyBtnNext = $('.story-navigation-next .btn');
	var $storyBtnPrev = $('.story-navigation-prev .btn');
	var $storyChapterTitleOverlineSpan = $('.story-chapter-title-overline span');
	var $storyChapterTitleHed = $('.story-chapter-title-hed');
	var $storyTitleCards = $('.story-title-cards');

	var NUM_CHAPTERS = 7;
	var SCROLL_TRIGGER = 30;
	var DURATION = {
		quarter: 250,
		half: 500
	};

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
		$storyChapters.css('width', _dimensions.w * NUM_CHAPTERS);
		$storyTitleCards.css('width', _dimensions.w * NUM_CHAPTERS);
		$storyChapter.css('width', _dimensions.w);
		$storyChapter.css('width', _dimensions.w);	

		_expandHeight = _dimensions.h * 0.35;
		if(_expand) {
			$storyExpand.css('height', _expandHeight);
			$storyBottom.css('top', _expandHeight);
		}
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

			$storyBtnNext.on('click', function() {
				if(!_transition) {
					_currentIndex += 1;
					slide();	
				}
			});

			$storyBtnPrev.on('click', function() {
				if(!_transition) {
					_currentIndex -= 1;
					slide();	
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
		sequence: function() {
			$introContainer.fadeOut(function() {
				$(this).addClass('hide');
				//show storyContainer
				//TODO fadein with velocity
				$storyContainer.removeClass('hide').removeClass('transparent');
				generateStory();
			});
		}
	};

	var generateStory = function() {
		
		_currentIndex = 0;
		_expand = true;
		
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
			$el.append($content);

			$storyChapters.append($el);

			$storyTitleCards.append(htmlChapter);
		}

		$storyChapter = $('.story-chapter');

		updateChapterInfo();
		resize();
		slideComplete();

		// setTimeout(function() {
		// 	toggleTop('collapse');
		// }, 2000);
	};

	var refineData = function(story) {
		story.textTease = story.text.slice(0,137);
		var lastSpace = story.textTease.lastIndexOf(' ');
		story.textTease = story.textTease.slice(0, lastSpace) + '...';
		return story;
	};

	var slide = function() {
		_transition = true;
		toggleTop('expand');
		
		setTimeout(function() {
			var offset = '-' + _currentIndex * _dimensions.w + 'px';

			$storyChapters.velocity({ 
				properties: { 'left': offset },
				options: { 'duration': DURATION.half, complete: slideComplete }
			});

			$storyTitleCards.velocity({ 
				properties: { 'left': offset },
				options: { 'duration': DURATION.half }
			});

		}, DURATION.quarter * 2);

		updateChapterInfo();
	};

	var slideComplete = function() {
		_transition = false;
		$window.on('scroll', function(e) {
			var top = $(this).scrollTop();
			if(top > SCROLL_TRIGGER) {
				toggleTop('collapse');
				$window.off('scroll');
			}
		});
	};

	var updateChapterInfo = function() {
		var title = testConfig.chapters[_currentIndex].hed;
		var index = testConfig.chapters[_currentIndex].index;
		$storyChapterTitleHed.text(title);
		$storyChapterTitleOverlineSpan.text(_currentIndex + 1);
	};

	var toggleTop = function(dir) {
		if(dir === 'expand') {
			// $storyBottom.addClass('expand');
			$storyContainer.removeClass('expand');
			_expand = false;
			$storyExpand.css('height', _expandHeight);
			$storyBottom.css('top', _expandHeight);
		} else {
			// $storyBottom.removeClass('expand');
			$storyContainer.removeClass('expand');
			_expand = false;
			$storyExpand.css('height', '');	
			$storyBottom.css('top', '5em');
		}
	};

	init();
})();