'use strict';
(function() {
	log('v0.0.4');

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
	var STORY_TOP_HEIGHT = 0.35;

	var init = function() {
		for(var s in _setup) {
			_setup[s]();
		}
		// _action.chapters();	
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

		//stories are showing
		if($storyTop.length) {
			$storyTop.css('height', _dimensions.h * STORY_TOP_HEIGHT);	
			$('.story-content-img-inner .main-img').css('max-height', _dimensions.h * 0.8);
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

			$stories.on('click', '.audio-player-btn', function() {
				var src = $(this).attr('data-src');
				Audio.toggle({el: $(this), id: src});
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
			$('.btn-chapters').text('loading...');
			enableScroll(false);
			generateStory(function() {
				setTimeout(function() {
					$storyContainer.removeClass('hide').removeClass('transparent');
					_mode = 'story';

					var offset = -1 * (_dimensions.h);
					var offsetNext = offset + 'px';
					var offsetCurrent = offset * 0.5 + 'px';

					$currentStory.velocity({ 
						properties: { 
							'translateY': offsetNext,
							'translateZ': 0
						},
						options: { 'duration': DURATION.half, complete: function(){
							$currentStory.css('transform', '');
							$currentStory.velocity({ 
								properties: { 'translateY': 0 },
								options: { 'duration': 0 }
							});
							enableScroll(true);
							$introContainer.addClass('hide');
							$window.scrollTop(0);
						}}
					});
				}, 700);
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

		enableScroll(false);

		var offset = -1 * (_dimensions.h - _dimensions.h * STORY_TOP_HEIGHT);
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
			options: { 'duration': DURATION.half, complete: transitionComplete }
		});
		$currentStory.velocity({ 
			properties: {
				'translateY': offsetCurrent,
				'translateZ': 0,
				'scale': 0.8,
				'opacity': 0
			},
			options: { 'duration': DURATION.half }
		});

		_currentIndex++;

		if(_currentIndex < NUM_CHAPTERS - 1)  {
			$nextStory = $story.eq(_currentIndex + 1);	
			$nextStory.addClass('next');
		}

		// pause audio if playing
		Audio.pause();
	};

	var transitionComplete = function() {
		enableScroll(true);
		$currentStory.removeClass('current');
		$currentStory = $story.eq(_currentIndex);
		
		$currentStory.css('transform', '');
		
		$currentStory.velocity({ 
			properties: { 'translateY': 0 },
			options: { 'duration': 0 }
		});

		if(_currentIndex > 0) {
			$currentStory.find('.story-top-prev').removeClass('off');
		}

		$window.scrollTop(0);
	};

	var enableScroll = function(disable) {
		if(disable) {
			$window.off('mousewheel');
		} else {
			$window.on('mousewheel', function(e){
				e.preventDefault();
			});
		}
	};

	var Audio = {
		path: 'assets/audio/stories/',
		players: {},
		timeout: null,

		toggle: function(params) {
			if(Audio.players[params.id]) {
				if(Audio.playing === params.id) {
					Audio.pause(Audio.players[params.id]);
				} else {
					Audio.play(Audio.players[params.id]);
				}
			} else {
				Audio.setupPlayer(params);
			}
		},
		setupPlayer: function(params) {
			Audio.players[params.id] = new Howl({
				src: [Audio.path + params.id + '.ogg', Audio.path + params.id + '.mp3'],
				autoplay: false,
				loop: false,
				preload: true,
				volume: 0.8,
				onload: function(s) {
					Audio.play(this);
				},
				onend: function() {
					Audio.playing = null;
					Audio.toggleIcon(this.el);
				}
			});

			Audio.players[params.id].goodluckId = params.id;
			Audio.players[params.id].el = { 
				root: params.el,
				play: params.el.find('.icon-play'), 
				pause: params.el.find('.icon-pause'),
				progress: params.el.siblings('.audio-player-progress')
			};
		},
		play: function(howlee) {
			Audio.playing = howlee.goodluckId;
			Audio.toggleIcon(howlee.el);
			howlee.play();
			Audio.updateProgress(howlee);
		},
		pause: function(howlee) {
			howlee = howlee || Audio.players[Audio.playing];
			if(howlee) {
				clearTimeout(Audio.timeout);
				Audio.playing = null;
				Audio.toggleIcon(howlee.el);
				howlee.pause();
			}
		},
		toggleIcon: function(el) {
			el.play.toggleClass('hide');
			el.pause.toggleClass('hide');
		},
		updateProgress: function(howlee) {
			var progress = Math.min((howlee.seek() / howlee.duration() * 100), 100) + '%';
			howlee.el.root.css('left', progress);
			howlee.el.progress.css('width', progress);
			if(Audio.playing) {
				Audio.timeout = setTimeout(function() { Audio.updateProgress(howlee) }, DURATION.quarter);
			}
		}
	};
	init();
})(); 	