G.story = (function () {
	'use strict';
	var _data;	
	var _preset = [0,1,2,3,4,5,6]; //ids for specific posts to start with
	var _currentIndex = 0;
	var _storiesUrl = 'http://goodlucksoup.com/php/get-stories.php';

	var NUM_CHAPTERS = 7;

	window.onLoadFeatured = function(response) {
		sortFeaturedData(response);
	};

	var sortFeaturedData = function(response) {
		response.data.forEach(function(datum) {
			var chapter = parseInt(datum.chapter);
			_data[chapter].push(datum);
		});
	};

	var getStoryIds = function() {
		//pop it off the top yo
		var output = [];
		for (var i = 0; i < _data.length; i++) {
			var datum = _data[i].shift();
			output.push(datum);
			//add back to end
			_data[i].push(datum);
		}
		return output;
	};

	var getStoryData = function(ids, cb) {

		var stringIds = '';
		for(var i = 0; i < ids.length; i++) {
			if(i > 0) {
				stringIds += ',';
			}
			stringIds += ids[i].id;
		}

		$.ajax({
			url: _storiesUrl,
			type: 'POST',
			data:  {'ids': stringIds},
			success: function(response) {
				cb(null,response.data);
			},
			error: function(err){
				cb(err);
			} 
		});
	};

	var refineStory = function(story) {
		//template 
		if(story.custom) {
			story.template = story.custom;
		} else {
			story.template = 'text-img';
		}

		//name
		story.name = story.name || 'Anonymous';

		return story;
	};

	var createHtml = function(story, chapter) {
		var template = 'story-template-' + story.template;
		
		var htmlChapter = GoodLuckSoup.templates['story-content'](chapter);
		var htmlTemplate = GoodLuckSoup.templates[template](story);

		var $chapter = $(htmlChapter);
		$chapter.find('.story-content-template').html(htmlTemplate);

		if(chapter === NUM_CHAPTERS - 1) {
			var htmlEnd = GoodLuckSoup.templates['end']();
			$chapter.find('.story-bottom').append(htmlEnd);
		}

		var $el = $('<div class="story" data-chapter="' + (chapter + 1) + '"></div>');
		$el.append($chapter);

		G.ui.appendChapter($el);
	}

	var self = {
		init: function() {
			_data = [];
			for(var i = 0; i < NUM_CHAPTERS; i++) {
				_data[i] = [];
			}
			$.ajax({
				url: 'http://goodlucksoup.com/featured-data.jsonp',
				dataType: 'jsonp',
				jsonpCallback: 'onLoadFeatured',
				error: function() {
					console.log('error loading data');
				}
			});
		},

		generate: function(cb) {
			_currentIndex = 0;

			var ids = getStoryIds();

			getStoryData(ids, function(err, data) {
				if(err) {
					console.log(err);
					//TODO handle error
				} else if(data) {
					for(var i = 0; i < NUM_CHAPTERS; i++) {
						var chapter = G.data.story.chapters[i];
						var story = data[i];

						story = refineStory(story);
						createHtml(story, chapter);
					}
					cb();
				} else {
					// TODO handle no data
				}
			});
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