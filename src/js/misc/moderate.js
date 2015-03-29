(function () {
	var _moderateUrl = 'http://goodlucksoup.com/dev/php/moderate.php';

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
			var id = $(this).attr('data-id');
			$.ajax({
				url: _moderateUrl,
				type: 'POST',
				data:  {'approve': id},
				success: function(data){
					if(data.error) {
						alert(data.error);
					} else {
						if(data.result) {
							$('.submission-' + id).remove();
							alert('approved');	
						}
					}
				},
				error: function(err){
					alert('error talk to russell');
				} 
			});
		});
	};

	var displaySubmissions = function(data) {
		console.log(data);
		$submissions.empty();
		data.forEach(function(el) {
			var html = '<div class="submission submission-' + el.id + '">';
			html += '<h3>Info</h3>';
			html += '<div class="name">name: ' + el.name + '</div>';
			html += '<div class="subject">subject: ' + el.subject + '</div>';
			html += '<div class="relationship">relationship: ' + el.relationship + '</div>';
			html += '<div class="email">email: ' + el.email + '</div>';
			html += '<div class="date">submitted: ' + el.datetime + '</div>';
			html += '<div class="chapter">chapter: ' + (+el.chapter + 1) + '</div>';
			html += '<div class="camp">camp: ' + el.camp + '</div>';
			html += '<div class="city-before">city-before: ' + el['city_before'] + '</div>';
			html += '<div class="city-after">city-after: ' + el['city_after'] + '</div>';

			html += '<h3>Story</h3>';
			html += '<div class="content">' + el.content + '</div>';
			if(el.image) {
				html += '<div class="image"><img src="http://goodlucksoup.com/dev/uploaded-images/' + el.image + '">';
				if(el['image_caption']) {
					html += '<div class="image-caption">Caption: ' + el['image_caption'] + '</div>';	
				}
			}
			html += '<div class="approve-btn-container">';
			html += '<div class="btn approve-btn" data-id="' + el.id + '">Approve</div></div>';
			html += '</div>';
			$submissions.append(html);
		});

		//show data
		//make buttons for each entry
		//approve / delete php
	}

	init();
	
})();