(function () {
	'use strict';
	
	var _data = [];
	var NUM_CHAPTERS = 7;

	var init = function() {
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
	};

	var setupEvents = function() {
	
	};

	var displayChapters = function() {
		_data.forEach(function(chapter, i) {
			renderChapter(chapter.slice(0,3), i);
		});
	};

	var renderChapter = function(items, index) {
		var html = '';
		html += '<h3>Chapter ' + (index + 1) + ' : ' + G.data.story.chapters[index].hed + '</h3>';
		html += '<ul>';
		items.forEach(function(item) {
			html += '<li><a target="_blank" href="http://goodlucksoup.com/story.html?id=' + item.id + '">';

			if(item.image) {
				item.image = item.image.replace('.jpg', '_thumb.jpg');
			} else {
				// TODO no plan?
			}
			html += '<img src="http://goodlucksoup.com/uploaded-images/' + item.image + '" />';
			html += '<span>' + item.hed + '</span>';

			html += '</a></li>';
		});

		html += '</ul>';

		html += '<p><a href="#">See more</a></p>';

		$('.chapters').append(html);
	};

	window.onLoadFeatured = function(response) {
		sortFeaturedData(response);
	};

	var sortFeaturedData = function(response) {
		response.data.forEach(function(datum) {
			
			//integerize
			datum.chapter = parseInt(datum.chapter);
			datum.id = parseInt(datum.id);
			
			var chapter = datum.chapter;
			_data[chapter].push(datum);
		});

		displayChapters();
	};

	init();
	
})();