G.ui = (function () {
	'use strict';

	var Actions;

	var $dom = {};
	var _dimensions = {};
	var _transition;
	var _introWaypoints = [];
	
	var STORY_TOP_HEIGHT = 140;
	var HEADER_HEIGHT = 42;
	var MAX_WIDTH = 960;

	var setupDom = function() {
		$dom = {
			window: $(window),
			htmlBody: $('html, body'),
			belowTheFold: $('#below-the-fold'),
			fullscreen: $('.fullscreen'),
			fullscreenPeek: $('.fullscreen-peek'),
			fullscreenJumbo: $('.fullscreen-jumbo'),
			introVideoBg: $('.video-bg'),
			introBtn: $('.intro-container .btn'),
			introContainer: $('.intro-container'),
			storyContainer: $('.stories-container'),
			stories: $('.stories'),
			storyTitleOverlineSpan: $('.story-title-overline span'),
			storyTitleHed: $('.story-title-hed'),
			audioPlayerIntroTop: $('#audio-player-intro-top'),
			audioPlayerIntroBottom: $('#audio-player-intro-bottom'),
			story: null,
			storyTop: null,
			currentStory: null,
			nextStory: null,
			prevStory: null,
		};
	};

	var setupEvents = function() {
		$dom.introBtn.on('click', function() {
			if(G.intro.loaded()) {
				var action = $(this).attr('data-action');
				Intro[action](this);
			}
		});

		$dom.window.on('resize', $.debounce(G.data.duration.quarter, self.resize));

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

		$dom.stories.on('click', '.video-player-btn', function() {
			var id = $(this).attr('data-video');
			G.video.toggleChapter(id, $(this));
		});

		$dom.stories.on('click', '.btn-prev', function() {
			var current = $(this).closest('.story').hasClass('current');
			var prevIndex = G.story.currentIndex() - 1;
			if(prevIndex > -1) {
				Story.transitionToPrev();
			}
		});

		$dom.stories.on('click', '.end-stories-choices .btn', function() {
			var action = $(this).attr('data-action');
			Story[action]($(this));
		});

		//intro scroll throttle
		if(!G.mobile()) {
			$dom.window.on('scroll', $.throttle(G.data.duration.second, Intro.onScroll));	
		}
	};

	var Intro = {
		insertVideos: function() {
			var numVideos = 6;
			var insertNext = function(i) {
				G.video.insertIntro(i, function() {
					i++;
					if(i < numVideos) {
						insertNext(i);
					}
				});
			};
			
			insertNext(0);
		},

		setupWaypoint: function(el) {
			var waypoint = new Waypoint.Inview({
				'element': el[0],
				'enter': function(direction) {
					var id = el.attr('data-video');
					G.video.playIntro(id);
				},
				'exited': function(direction) {
					var id = el.attr('data-video');
					G.video.pauseIntro(id);
				}
			});
			_introWaypoints.push(waypoint);
		},

		begin: function() {
			G.audio.playIntro();
			self.jumpTo('.intro-preface');
		},

		chapters: function() {
			G.mode('story');
			Waypoint.disableAll();
			$dom.introBtn.last().text('loading...');
			self.enableScroll(false);

			if(!G.mobile()) {
				$dom.window.off('scroll');	
			}

			G.story.generate(function() {
				G.audio.fadeIntroToAmbient(function() {
					G.video.destroyIntro();
					G.audio.setupAmient();
					$dom.story = $('.story');

					$dom.currentStory = $dom.story.eq(0);
					$dom.nextStory = $dom.story.eq(1);
					$dom.prevStory = null;

					$dom.currentStory.addClass('current');
					$dom.nextStory.addClass('next');

					$dom.currentStory.find('.story-top-text').removeClass('off');
					$dom.currentStory.find('.story-top-next').addClass('off');
					self.resize();

					$dom.storyContainer.removeClass('hide').removeClass('transparent');
					
					setTimeout(Story.revealAll, 17);
				});
			});
		},

		onScroll: function() {
			var pos = $dom.window.scrollTop();
			var top = $dom.audioPlayerIntroTop.offset().top;
			var bottom = $dom.audioPlayerIntroBottom.offset().top;

			G.audio.updateIntro(pos, top, bottom);
		}
	};

	var Story = {
		revealAll: function() {
			var offset = -1 * (_dimensions.h - HEADER_HEIGHT);
			var offsetNext = offset + 'px';
			var offsetCurrent = offset * 0.5 + 'px';

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

					$dom.window.scrollTop(0);
				}}
			});

			$dom.introContainer.velocity({
				properties: {
					'translateY': '-200px',
					'translateZ': 0,
					'opacity': 0
				},
				options: {'duration': G.data.duration.half, complete: function() {
					$dom.introContainer.addClass('hide').remove();
				}}
			});
			
		},

		appendChapter: function(el) {
			$dom.stories.append(el);
			var video = $(el).find('.story-video');
			if(video.length) {
				var id = $(video).attr('data-video');
				G.video.createChapter(id);
			}
		},

		transitionToNext: function() {

			self.enableScroll(false);

			var offset = -1 * (_dimensions.h - HEADER_HEIGHT - STORY_TOP_HEIGHT * 1.5);
			var offsetNext = offset + 'px';
			var offsetCurrent = offset * 0.5 + 'px';

			$dom.nextStory.addClass('current').removeClass('next');
			$dom.nextStory.find('.story-top-next').addClass('off');
			$dom.nextStory.find('.story-top-text').removeClass('off');

			if($dom.prevStory) {
				$dom.prevStory.removeClass('prev');	
			}

			$dom.nextStory.velocity({ 
				properties: { 
					'translateY': offset,
					'translateZ': 0
				},
				options: { 'duration': G.data.duration.half, complete: Story.transitionComplete }
			});
			$dom.currentStory.velocity({ 
				properties: {
					'translateY': '-100px',
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
			G.video.pauseChapter();
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

				if($dom.nextStory) {
					$dom.nextStory.removeClass('next');	
				}

				G.story.currentIndex(-1);

				$dom.currentStory = $dom.story.eq(G.story.currentIndex());

				if(G.story.currentIndex() < G.story.numChapters() - 1)  {
					var next = G.story.currentIndex() + 1;
					$dom.nextStory = $dom.story.eq(next);
					$dom.nextStory.addClass('next');
				
					$dom.nextStory.find('.story-top-next').removeClass('off');
					$dom.nextStory.find('.story-top-text').addClass('off');
					$dom.nextStory.find('.story-top-prev').addClass('off');
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
			G.video.pauseChapter();
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
		},

		setImageDimensions: function() {
			
			var getRealHeight = function(maxHeight, ratio) {
				var maxWidth = Math.min(MAX_WIDTH, _dimensions.w * 0.9);
				var found = false;
				while(!found) {
					var currentWidth = ratio * maxHeight;
					if(currentWidth > maxWidth) {
						maxHeight -= 1;
					} else {
						found = true;
					}
				}
				return maxHeight;
			};

			var $el = $('.story-content-img-inner');

			$el.each(function() {
				var naturalW = $(this).attr('data-width');
				var naturalH = $(this).attr('data-height');

				var maxHeight = Math.min(_dimensions.h * 0.8, naturalH);
				var ratio = naturalW / naturalH;

				var h = Math.floor(getRealHeight(maxHeight, ratio));
				var w = Math.floor(h * ratio);
				
				$(this).find('figure').css({
					width: w,
					height: h
				});
			});
		},

		newChapters: function(btn) {
			self.enableScroll(false);
			btn.text('Loading...');

			G.audio.destroyChapter();
			G.video.destroyChapter();
			G.story.generate(function() {
				//delete all except current
				$dom.story.not('.current').remove();
				
				$dom.story = $('.story');
				$dom.currentStory = $dom.story.eq(0);
				$dom.nextStory = $dom.story.eq(1);
				$dom.nextStory.addClass('next');

				$dom.nextStory.find('.story-top-next').addClass('off');
				$dom.nextStory.find('.story-top-text').removeClass('off');
				$dom.prevStory = null;
				
				self.resize();

				var offset = -1 * (_dimensions.h - HEADER_HEIGHT);
				var offsetNext = offset + 'px';
				var offsetCurrent = offset * 0.5 + 'px';

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
						$dom.window.scrollTop(0);
						$dom.currentStory.remove();

						$dom.story = $('.story');
						var cur = G.story.currentIndex();
						$dom.currentStory = $dom.story.eq(cur);
						$dom.currentStory.addClass('current').removeClass('next');
						$dom.nextStory = $dom.story.eq((cur+1));
						$dom.nextStory.addClass('next');
					}}
				});
			});
		}
	};

	var self = {
		init: function() {
			setupDom();
			setupEvents();
			self.resize();
		},

		resize: function() {
			_dimensions.w = window.innerWidth;
			_dimensions.h = window.innerHeight;

			$dom.fullscreen.css('min-height', _dimensions.h - HEADER_HEIGHT);
			$dom.fullscreen.css('height', _dimensions.h - HEADER_HEIGHT);
			$dom.fullscreenPeek.css('min-height', _dimensions.h * 0.8);
			$dom.fullscreenPeek.css('height', _dimensions.h * 0.8);
			$dom.fullscreenJumbo.css('min-height', _dimensions.h * 1.4);
			$dom.fullscreenJumbo.css('height', _dimensions.h * 1.4);

			//stories are showing
			if(G.mode() === 'story') {
				Story.setImageDimensions();
			}
		},

		jumpTo: function(el, cb) {
			var complete = false;
			var top = $(el).offset().top - HEADER_HEIGHT;
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
			}
		},

		appendChapter: function(el) {
			Story.appendChapter(el);
		},

		updateAudioProgress: function(params) {
			params.el.root.css('left', params.percent);
			params.el.progress.css('width', params.percent);
		},

		setupWaypoint: Intro.setupWaypoint
	};

	return self; 
})();