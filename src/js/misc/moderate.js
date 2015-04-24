(function () {
	var _moderateUrl = 'http://goodlucksoup.com/php/moderate.php';

	$submit = $('.submit');
	$inputCode = $('.input-code');
	$submissions = $('.submissions');

	var init = function() {
		setupEvents();
	};

	var setupEvents = function() {
		
		$submit.on('click', function() {
			var code = $inputCode.val();

			$.ajax({
				url: _moderateUrl,
				type: 'POST',
				data:  {'secret': code},
				success: function(data){
					if(data.error) {
						alert(data.error);
					} else {
						displaySubmissions(data);
						$inputCode.val('');
					}
				},
				error: function(err){
					alert('error talk to russell');
				} 
			});
		});

		$submissions.on('click', '.approve-btn', function() {
			var featured = +$(this).attr('data-featured');
			var id = $(this).attr('data-id');
			var parent = $(this).parentsUntil('.submissions')[2];
			var chapter = $(parent).find('.chapter').val().trim();
			var content = addHTML($(parent).find('.content').val().trim());

			var hed = $(parent).find('.story-hed-input').val().trim();
			var caption = '';
			var captionEl = $(parent).find('.image-caption-input');
			if(captionEl) {
				caption = captionEl.val().trim();
			}

			if(chapter) {
				chapter = parseInt(chapter) - 1;
				console.log(hed, caption);
				$.ajax({
					url: _moderateUrl,
					type: 'POST',
					data:  {'approve': id, 'featured': featured, 'chapter': chapter, 'content': content, 'hed': hed, 'caption': caption },
					success: function(data){
						console.log(data);
						if(data.error) {
							alert(data.error);
						} else {
							if(data.result) {
								$('.submission-' + id).remove();
								alert('approved');
							} else {
								alert('no data');
							}
						}
					},
					error: function(err){
						alert('error talk to russell');
					} 
				});
			} else {
				alert('enter chapter');
			}
		});
	};

	var displaySubmissions = function(data) {
		if(data.length) {
			$submissions.empty();
			data.forEach(function(el) {
				var html = '<div class="submission submission-' + el.id + '">';
				html += '<h3>Info</h3>';
				html += '<div class="name">name: ' + el.name + '</div>';
				html += '<div class="email">email: ' + el.email + '</div>';
				html += '<div class="date">submitted: ' + el.datetime + '</div>';

				html += '<h3>Story</h3>';
				html += '<div class="story-hed">Title: <input class="story-hed-input" value="' + el.hed + '"></div>';
				html += '<textarea class="content">' +  editableContent(el.content)  + '</textarea>';

				if(el.image) {
					html += '<div class="image"><img src="http://goodlucksoup.com/uploaded-images/' + el.image + '">';
					if(el['image_caption']) {
						html += '<div class="image-caption">Caption: <input class="image-caption-input" value="' + el['image_caption'] + '"></div>';	
					}
				}
				html += '<p>Enter chapter number:</p><input class="chapter">';
				html += '<div class="approve-btn-container">';
				html += '<div class="btn approve-btn" data-id="' + el.id + '" data-featured="1">Approve (feature)</div></div>';
				html += '<div class="btn approve-btn" data-id="' + el.id + '" data-featured="0">Approve (database)</div></div>';
				html += '</div>';

				$submissions.append(html);
			});
		} else {
			alert('Nothing new. Go outside.')
		}
	};

	var editableContent = function(str) {
		str = str.replace(/<p\>/g, '');
		str = str.replace(/<\/p\>/g, '\n\n');
		return str;
	};

	var addHTML = function(str) {
		var output = '';
		str = str.split('\n');
		str.forEach(function(s) {
			s = s.trim();
			if(s.length) {
				output += '<p>' + s + '</p>';
			}
		});

		return output;
	};

	init();
	
})();