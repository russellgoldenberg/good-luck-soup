G.story = (function () {
	'use strict';
	var _data = {'custom': [], 'general': []};
	var _currentIndex = 0;
	var _currentViewing = -1;
	var _storiesUrl = 'http://goodlucksoup.com/php/get-stories.php';
	var _filepath = {
		img: 'http://goodlucksoup.com/uploaded-images/', //TODO replace with relative path
		audio: 'assets/audio/ambient/'
	};

	var NUM_CHAPTERS = 7;

	window.onLoadFeatured = function(response) {
		sortFeaturedData(response);
	};

	var sortFeaturedData = function(response) {
		response.data.forEach(function(datum) {
			
			//integerize
			datum.chapter = parseInt(datum.chapter);
			datum.id = parseInt(datum.id);
			
			var chapter = datum.chapter;
			if(datum.custom) {
				_data.custom[chapter].push(datum);
			} else {
				_data.general[chapter].push(datum);
			}
		});

		//shuffle arrays
		for(var i = 0; i < NUM_CHAPTERS; i++) {
			if(_data.custom[i]) {
				_data.custom[i] = shuffleArray(_data.custom[i]);	
			}
			if(_data.general[i]) {
				_data.general[i] = shuffleArray(_data.general[i]);	
			}

			//find the preset item in the array, put it at first spot
			var id = G.data.story.preset[0][i];
			if(id) {
				for(var d = 0; d < _data.custom[i].length; d++) {
					var datum = _data.custom[i][d];
					if(datum.id === id) {
						var preset = _data.custom[i].splice(d, 1);
						_data.custom[i].splice(0,0,preset[0]);
						break;
					}
				}
			}
		}

		// console.log(_data);
	};

	var getStoryIds = function() {
		//pop it off the top yo
		var output = [];
		//determine where to pull from

		var preset = _currentViewing === 0 ? 0 : _currentViewing % 4 + 1;

		for (var i = 0; i < NUM_CHAPTERS; i++) {
			var custom = G.data.story.preset[preset][i];
			var pool = custom ? 'custom' : 'general';
			var datum = _data[pool][i].shift();
			output.push(datum);
			//add back to end
			_data[pool][i].push(datum);
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

		//date 
		var date = ((new Date(story.datetime)).toDateString());
		story.date = date.substring(4,date.length);

		return story;
	};

	var createHtml = function(story, chapter) {
		var template = 'story-template-' + story.template;
		
		var htmlChapter = GoodLuckSoup.templates['story-content'](chapter);
		var htmlTemplate = GoodLuckSoup.templates[template](story);

		var $chapter = $(htmlChapter);
		$chapter.find('.story-content-template').html(htmlTemplate);

		var share = generateShare(story);

		if(_currentViewing > 0) {
			share.archive = 'http://goodlucksoup.com/archive.html?chapter=' + (_currentIndex + 1); 
		}

		var htmlShare = GoodLuckSoup.templates['story-share'](share);

		$chapter.find('.story-content-template').append(htmlShare);

		if(chapter.index === NUM_CHAPTERS) {
			var htmlEnd = GoodLuckSoup.templates['end']();
			$chapter.find('.story-bottom').append(htmlEnd);
		}

		var $el = $('<div class="story" data-chapter="' + (chapter.index) + '"></div>');
		$el.append($chapter);

		G.ui.appendChapter($el);
	};

	var generateShare = function(story) {
		var text = '“' + story.hed + '” - A Good Luck Soup story ';
		var href = 'http://goodlucksoup.com/story.html?id=' + story.id;
		var encoded = encodeURIComponent(text);
		return {
			twitter: 'https://twitter.com/intent/tweet?text=' + encoded + '&via=GoodLuckSoup&url=' + encodeURI(href),
    		facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURI(href)
		};
	};

	var preloadStories = function(data, cb) {
		var loadStory = function(i) {
			var chapter = G.data.story.chapters[i];
			var story = data[i];
			story = refineStory(story);
			
			if(story.image) {
				var url = _filepath.img + story.image;
				loadImage(url, function(img) {
					story.image_width = img.naturalWidth;
					story.image_height = img.naturalHeight;
					createHtml(story, chapter);
					advance(i);
				});
			} else {
				createHtml(story, chapter);
				advance(i);
			}
		};

		var advance = function(i) {
			i++;
			if(i < NUM_CHAPTERS) {
				loadStory(i);
			} else {
				cb();
			}
		};

		loadStory(0);
	};

	var self = {
		init: function() {
			for(var i = 0; i < NUM_CHAPTERS; i++) {
				_data.custom[i] = [];
				_data.general[i] = [];
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
			_currentViewing += 1;
			var ids = getStoryIds();

			getStoryData(ids, function(err, data) {
				if(err) {
					console.log(err);
					//TODO handle error
				} else if(data) {
					preloadStories(data, cb);
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
		},

		direct: function(id, cb) {
			var ids = [{id: id}];
			getStoryData(ids, function(err, data) {
				if(!err && data) {
					var story = refineStory(data[0]);

					var createHTML = function() {
						var template = 'story-template-' + story.template;
						var htmlTemplate = GoodLuckSoup.templates[template](story);

						var $chapter = $('<div class="story-content-template single-story"></div>');
						$chapter.html(htmlTemplate);

						var share = generateShare(story);
						var htmlShare = GoodLuckSoup.templates['story-share'](share);

						$chapter.append(htmlShare);

						G.ui.appendChapter($chapter);
						cb();
					};

					if(story.image) {
						var url = _filepath.img + story.image;	
						loadImage(url, function(img) {
							story.image_width = img.naturalWidth;
							story.image_height = img.naturalHeight;
							
							createHTML();
						});
					} else {
						createHTML();
					}
				} else {
					// TODO handle no data
				}
			});
		}
	};
	
	return self;
})(); 	