(function () {
	'use strict';
	
	var _data = [];
	var NUM_CHAPTERS = 7;

	var init = function() {
		var chapter = checkChapter();
		if(chapter) {
			displaySingleChapter(chapter);
		} else {
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
		}
	};

	var checkChapter = function() {
		var search = window.location.search;
		if(search.length && search.indexOf('chapter=') > -1) {
			var index = search.indexOf('=') + 1;
			var chapter = parseInt(search.substring(index, search.length));
			if(chapter >-1 && chapter < 8) {
				return chapter;
			} else {
				return false;
			}
		}
		return false;
	};

	var setupEvents = function() {
	
	};

	var displaySingleChapter = function(chapter) {
		var url = 'http://goodlucksoup.com/php/get-chapter.php';
		$.ajax({
			url: url,
			type: 'POST',
			data:  {'chapter': (chapter - 1)},
			success: function(response) {
				renderSingleChapter(response.data, chapter - 1);
			},
			error: function(err){
				cb(err);
			} 
		});
	};

	var renderSingleChapter = function(items, index) {
		var html = '';
		html += '<h3>Chapter ' + (index + 1) + ' : ' + G.data.story.chapters[index].hed + '</h3>';
		items.forEach(function(item, i) {
			if(i%3 === 0) {
				html += '<ul>';
			}
			html += '<li><a target="_blank" href="http://goodlucksoup.com/story.html?id=' + item.id + '">';

			if(item.image) {
				item.image = 'http://goodlucksoup.com/uploaded-images/' + item.image.replace('.jpg', '_thumb.jpg');
			} else {
				item.image = 'assets/img/story/chapter-' + (index + 1) + '.jpg';
			}
			html += '<img src="' + item.image + '" />';
			html += '<p>' + item.hed + '</p>';
			html += '</a></li>';

			if(i%3 === 2 || i === items.length - 1) {
				html += '</ul>';
			}
		});

		html += '<div class="archive-back"><a class="btn" href="/archive.html">Back to archive</a></div>';

		$('.chapters').append(html);
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
				item.image = 'http://goodlucksoup.com/uploaded-images/' + item.image.replace('.jpg', '_thumb.jpg');
			} else {
				item.image = 'assets/img/story/chapter-' + (index + 1) + '.jpg';
			}
			html += '<img src="' + item.image + '" />';
			html += '<p>' + item.hed + '</p>';
			html += '</a></li>';
		});

		html += '</ul>';

		html += '<div class="archive-see-more"><a class="btn" href="/archive.html?chapter=' + (index + 1) + '">See more</a></div>';

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