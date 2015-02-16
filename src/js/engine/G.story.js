'use strict';
G.story = (function () {
	
	var _currentIndex = 0;

	var NUM_CHAPTERS = 7;

	var refineData = function(story) {
		story.textTease = story.text.slice(0,137);
		var lastSpace = story.textTease.lastIndexOf(' ');
		story.textTease = story.textTease.slice(0, lastSpace) + '...';
		return story;
	};

	var self = {
		generate: function(cb) {
			_currentIndex = 0;
			
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

				G.ui.appendChapter($el);
			}
			cb();
		},

		currentIndex: function(inc) {
			if(inc) {
				_currentIndex += inc;
			}
			return _currentIndex;
		},

		numChapters: function() {
			return NUM_CHAPTERS;
		}
	};
	
	return self;
})(); 	