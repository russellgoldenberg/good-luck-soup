G.ui = (function () {
	'use strict';

	var Actions;

	var $dom = {};
	var _dimensions = {};
	var _transition;
	var _introWaypoints = [];
	
	var STORY_TOP_HEIGHT = 0.35;
	var MAX_STORY_TOP_HEIGHT = 150;

	var setupDom = function() {
		$dom = {
			window: $(window),
			htmlBody: $('html, body'),
			belowTheFold: $('#below-the-fold'),
			fullscreen: $('.fullscreen'),
			fullscreenPeek: $('.fullscreen-peek'),
			fullscreenJumbo: $('.fullscreen-jumbo'),
			videoBgContainer: $('.video-bg-container'),
			introBtn: $('.intro-container .btn'),
			introContainer: $('.intro-container'),
			storyContainer: $('.stories-container'),
			stories: $('.stories'),
			storyTitleOverlineSpan: $('.story-title-overline span'),
			storyTitleHed: $('.story-title-hed'),
			story: null,
			storyTop: null,
			introVideoBg: null,
			currentStory: null,
			nextStory: null,
			prevStory: null,
		};
	};

	var setupEvents = function() {
		$dom.introBtn.on('click', function() {
			G.audio.hack();
			if(G.intro.loaded) {
				var action = $(this).attr('data-action');
				Intro[action](this);
			}
		});

		$dom.window.on('resize', debounce(self.resize, 150));

		$dom.stories.on('click', '.story-top', function() {
			var index = $(this).attr('data-index');
			var next = $(this).closest('.story').hasClass('next');
			if(next) {
				Story.transitionToNext();
			}
		});

		$dom.stories.on('click', '.audio-player-btn', function() {
			var src = $(this).attr('data-src');
			G.audio.toggleChapter({el: $(this), id: src});
		});

		$dom.stories.on('click', '.btn-prev', function() {
			var current = $(this).closest('.story').hasClass('current');
			var prevIndex = G.story.currentIndex() - 1;
			if(prevIndex > -1) {
				Story.transitionToPrev();
			}
		});
	};

	var getStoryTopHeight = function() {
		return Math.max(_dimensions.h * STORY_TOP_HEIGHT * 0.5, MAX_STORY_TOP_HEIGHT);
	};

	var Intro = {
		insertVideos: function() {
			$dom.videoBgContainer.each(function() {
				var index = $(this).attr('data-index');
				var html = GoodLuckSoup.templates['intro-video']({index: index});
				$(this).prepend(html);
			});
			$dom.introVideoBg = $('.intro-container .video-bg');
		},

		setupWaypoints: function() {
			$dom.introVideoBg.each(function() {
				var waypoint = new Waypoint.Inview({
					'element': $(this)[0],
					'enter': function(direction) {
						this.element.play();
					},
					'exited': function(direction) {
						this.element.pause();
					}
				});
				_introWaypoints.push(waypoint);
			});
		},

		begin: function() {
			self.jumpTo('.intro-preface');
		},

		chapters: function() {
			G.mode('story');
			Waypoint.disableAll();
			$dom.introBtn.last().text('loading...');
			self.enableScroll(false);
			G.story.generate(function() {
				$dom.story = $('.story');
				$dom.storyTop = $('.story-top');

				$dom.currentStory = $dom.story.eq(0);
				$dom.nextStory = $dom.story.eq(1);
				$dom.prevStory = null;

				$dom.currentStory.addClass('current');
				$dom.nextStory.addClass('next');

				$dom.currentStory.find('.story-top-text').removeClass('off');
				$dom.currentStory.find('.story-top-next').addClass('off');
				self.resize();

				//TODO this simulates actual preloading
				setTimeout(function() {
					$dom.storyContainer.removeClass('hide').removeClass('transparent');
					Story.revealAll();
				}, 700);
			});
		}
	};

	var Story = {
		revealAll: function() {
			var offset = -1 * (_dimensions.h);
			var offsetNext = offset + 'px';
			var offsetCurrent = offset * 0.5 + 'px';

			$dom.currentStory.find('.story-top').css('height', getStoryTopHeight());

			$dom.currentStory.velocity({ 
				properties: { 
					'translateY': offsetNext,
					'translateZ': 0
				},
				options: { 'duration': G.data.duration.half, complete: function(){
					$dom.currentStory.css('transform', '');
					$dom.currentStory.velocity({ 
						properties: { 'translateY': 0 },
						options: { 'duration': 0 }
					});
					self.enableScroll(true);
					$dom.introContainer.addClass('hide');
					$dom.window.scrollTop(0);
				}}
			});
		},

		appendChapter: function(el) {
			$dom.stories.append(el);
		},

		transitionToNext: function() {

			self.enableScroll(false);

			var offset = -1 * (_dimensions.h - _dimensions.h * STORY_TOP_HEIGHT);
			var offsetNext = offset + 'px';
			var offsetCurrent = offset * 0.5 + 'px';

			$dom.nextStory.addClass('current').removeClass('next');
			$dom.nextStory.find('.story-top-next').addClass('off');
			$dom.nextStory.find('.story-top-text').removeClass('off');

			$dom.nextStory.find('.story-top').css('height', getStoryTopHeight());

			if($dom.prevStory) {
				$dom.prevStory.removeClass('prev');	
			}

			$dom.nextStory.velocity({ 
				properties: { 
					'translateY': offsetNext,
					'translateZ': 0
				},
				options: { 'duration': G.data.duration.half, complete: Story.transitionComplete }
			});
			$dom.currentStory.velocity({ 
				properties: {
					'translateY': offsetCurrent,
					'translateZ': 0,
					'scale': 0.8,
					'opacity': 0
				},
				options: { 'duration': G.data.duration.half }
			});

			G.story.currentIndex(1);

			if(G.story.currentIndex() < G.story.numChapters() - 1)  {
				$dom.nextStory = $dom.story.eq(G.story.currentIndex() + 1);	
				$dom.nextStory.addClass('next');
			} else {
				$dom.nextStory = null;
			}

			if(G.story.currentIndex() > 0)  {
				$dom.prevStory = $dom.story.eq(G.story.currentIndex()  - 1);	
				$dom.prevStory.addClass('prev');
			} else {
				$dom.prevStory = null;
			}

			// pause audio if playing
			G.audio.pauseChapter();
		},

		transitionToPrev: function() {
			self.enableScroll(false);

			var offset = _dimensions.h;
			var offsetPrev = -1 * offset + 'px';
			var offsetCurrent = 0;

			//jump previous story to -100%?
			$dom.prevStory.removeClass('prev').addClass('current');
			$dom.prevStory.velocity({ 
				properties: {
					'translateY': '',
					'translateZ': 0,
					'scale': 1,
					'opacity': 1
				},
				options: { 'duration': 0 }
			});
			var h = $dom.prevStory[0].offsetHeight;
			$dom.window.scrollTop(h);

			self.jumpTo($dom.prevStory[0], function() {
				self.enableScroll(true);
				$dom.currentStory.removeClass('current');	
				$dom.nextStory.removeClass('next');

				G.story.currentIndex(-1);

				$dom.currentStory = $dom.story.eq(G.story.currentIndex());

				if(G.story.currentIndex() < G.story.numChapters() - 1)  {
					var next = G.story.currentIndex() + 1;
					$dom.nextStory = $dom.story.eq(next);
					$dom.nextStory.addClass('next');
				
					$dom.nextStory.find('.story-top-next').removeClass('off');
					$dom.nextStory.find('.story-top-text').addClass('off');
					$dom.nextStory.find('.story-top-prev').addClass('off');
					$dom.nextStory.find('.story-top').css('height', _dimensions.h * STORY_TOP_HEIGHT);
				} else {
					$dom.nextStory = null;
				}

				if(G.story.currentIndex() > 0) {
					$dom.prevStory = $dom.story.eq(G.story.currentIndex()  - 1);	
					$dom.prevStory.addClass('prev');
				} else {
					$dom.prevStory = null;
				}
			});

			// pause audio if playing
			G.audio.pauseChapter();
		},

		transitionComplete: function() {
			self.enableScroll(true);
			$dom.currentStory.removeClass('current');
			$dom.currentStory = $dom.story.eq(G.story.currentIndex());
			
			$dom.currentStory.css('transform', '');
			
			$dom.currentStory.velocity({ 
				properties: { 'translateY': 0 },
				options: { 'duration': 0 }
			});

			if(G.story.currentIndex() > 0) {
				$dom.currentStory.find('.story-top-prev').removeClass('off');
			}

			$dom.window.scrollTop(0);
		}
	};

	var self = {
		init: function() {
			setupDom();
			setupEvents();
			self.resize();
			// Intro.chapters();
		},

		resize: function() {
			_dimensions.w = window.innerWidth;
			_dimensions.h = window.innerHeight;

			$dom.fullscreen.css('min-height', _dimensions.h);
			$dom.fullscreen.css('height', _dimensions.h);
			$dom.fullscreenPeek.css('min-height', _dimensions.h * 0.8);
			$dom.fullscreenPeek.css('height', _dimensions.h * 0.8);
			$dom.fullscreenJumbo.css('min-height', _dimensions.h * 1.4);
			$dom.fullscreenJumbo.css('height', _dimensions.h * 1.4);

			//stories are showing
			if(G.mode() === 'story') {
				$dom.storyTop.css('height', _dimensions.h * STORY_TOP_HEIGHT);
				$dom.currentStory.find('.story-top').css('height', getStoryTopHeight());
				$('.story-content-img-inner .main-img').css('max-height', _dimensions.h * 0.8);
			}
		},

		jumpTo: function(el, cb) {
			var complete = false;
			var top = $(el).offset().top;
			$dom.htmlBody.animate({
				scrollTop: top
			}, G.data.duration.half, function() {
				if(typeof cb === 'function' && !complete) {
					complete = true;
					cb();
				}
			});
		},

		enableScroll: function(disable) {
			if(disable) {
				$dom.window.off('mousewheel');
			} else {
				$dom.window.on('mousewheel', function(e){
					e.preventDefault();
				});
			}
		},

		showIntro: function() {
			$dom.introBtn.first().text('Begin');
			//show below the fold
			$dom.belowTheFold.removeClass('hide');
			//insert intro videos
			if(!G.mobile()) {
				Intro.insertVideos();
				Intro.setupWaypoints();
			}
		},

		appendChapter: function(el) {
			Story.appendChapter(el);
		},

		updateAudioProgress: function(params) {
			params.el.root.css('left', params.percent);
			params.el.progress.css('width', params.percent);
		}
	};

	return self; 
})();