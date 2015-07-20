(function () {
	'use strict';
	
	var _data = [];
	var _names = [];
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

		setupEvents();
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
		$('form').on('submit', submitForm);
			
	};

	var submitForm = function(e) {
		e.preventDefault();
		var name = $('.input-name').val().trim();
		var keyword = $('.input-keyword').val().trim();

		if(name.length) {
			findName(name);
		} else if(keyword.length) {
			findKeyword(keyword);
		} else {
			alert('You must enter a name or keyword');
		}

		$('input').val('');

		return false;
	};

	var findName = function(name) {
		var threshold = 6;
		var output = [];
		for(var i = 0; i < _names.length; i++) {
			var score = levenshteinDistance(name, _names[i].name);
			if(score < threshold) {
				output.push({index: i, score: score});
			}
		}

		if(output.length) {
			output.sort(function(a,b) {
				return compareForSort({items: [a, b], direction: 'ascending', property: 'score' });
			});

			displayNames(output, name);
		} else {
			displayNames(false, name);
		}
	};

	var displayNames = function(output, name) {
		var html = '';
		html += '<h3>Results for "' + name + '"</h3>';
		
		if(output) {
			
			var num = Math.min(10, output.length);

			for(var i = 0; i < num; i++) {
				var o = output[i];
				var datum = _names[o.index];
				html += '<p>';
				html += '<a href="http://goodlucksoup.com/story.html?id=' + datum.id + '">' + datum.hed + '</a>';
				html += ' by ' + datum.name;
				html += '</p>';
			}
		} else {
			html += '<p>Could not find any matches. Try again.</p>';
		}

		$('.search-results').empty().append(html);
	};

	var findKeyword = function(keyword) {
		$('.search-results').empty().append('<p>Searching database, please wait.</p>');
		$.ajax({
			url: 'http://goodlucksoup.com/php/get-keyword.php',
			type: 'POST',
			data:  {'keyword': keyword},
			success: function(data) {
				displayKeywords(data, keyword)
			},
			error: function(err) {
				console.log(err);
				alert('Error finding keyword');
			} 
		});	
	};

	var displayKeywords = function(data, keyword) {
		var html = '';
		html += '<h3>Results for "' + keyword + '"</h3>';

		if(data && data.length) {
			
			var num = Math.min(10, data.length);

			for(var i = 0; i < num; i++) {
				var datum = data[i];
				html += '<p>';
				html += '<a href="http://goodlucksoup.com/story.html?id=' + datum.id + '">' + datum.hed + '</a>';
				html += ' by ' + datum.name;
				html += '</p>';
			}
		} else {
			html += '<p>Could not find any matches. Try again.</p>';
		}

		$('.search-results').empty().append(html);
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

			_names.push({name: datum.name, id: datum.id, hed: datum.hed});
		});

		displayChapters();
	};




	// lev dist
	/*
	Copyright (c) 2011 Andrei Mackenzie
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	*/
	 
	var levenshteinDistance = function(a, b){
	  if(a.length == 0) return b.length; 
	  if(b.length == 0) return a.length; 
	 
	  var matrix = [];
	 
	  // increment along the first column of each row
	  var i;
	  for(i = 0; i <= b.length; i++){
	    matrix[i] = [i];
	  }
	 
	  // increment each column in the first row
	  var j;
	  for(j = 0; j <= a.length; j++){
	    matrix[0][j] = j;
	  }
	 
	  // Fill in the rest of the matrix
	  for(i = 1; i <= b.length; i++){
	    for(j = 1; j <= a.length; j++){
	      if(b.charAt(i-1) == a.charAt(j-1)){
	        matrix[i][j] = matrix[i-1][j-1];
	      } else {
	        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
	                                Math.min(matrix[i][j-1] + 1, // insertion
	                                         matrix[i-1][j] + 1)); // deletion
	      }
	    }
	  }
	 
	  return matrix[b.length][a.length];
	};

	var compareForSort = function(params) {
		var dir = params.direction === 'ascending' ? 1 : -1; 
		var a = params.items[0][params.property];
		var b = params.items[1][params.property];
		if(a < b) {
			return -1 * dir;
		} else if (a > b) {
			return 1 * dir;
		}
		return 0;
	};

	init();
	
})();