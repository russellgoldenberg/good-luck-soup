(function () {
	var _promptKey;
	var _writingMode;
	var _uploadUrl = 'http://goodlucksoup.com/dev/php/upload.php';

	var MB = 1048576;
	var _imgFile;

	var $prompt = $('.prompt');
	var $submit = $('.submit-container .btn');
	var $storyForm = $('.user-story-form');
	var $infoQuestionInput = $('.info-question .answer');
	var $promptTextarea = $('.prompt-textarea');
	var $imageCaption = $('.image-caption');
	var $chooseImage = $('.choose-image');
	var $fileUpload = $('#file-upload');
	var $imageResult = $('.image-result');

	var init = function() {
		setupEvents();
	};

	var setupEvents = function() {
		$prompt.on('click', function() {
			if(!_writingMode) {
				_writingMode = true;
				_promptKey = $(this).index();
				$prompt.not(this).addClass('hide');
				$storyForm.removeClass('hide');	
			}
		});	

		$submit.on('click', function() {
			submitData();
		});

		$chooseImage.on('click', function() {
			$fileUpload.click();
		});

		$fileUpload.on('change', function() {
			if (typeof FileReader !== 'undefined') {
				_imgFile = $('#file-upload')[0].files[0];
		        
		        if(_imgFile) {
		        	var invalid = invalidImage(_imgFile);
		        	if(invalid) {
		        		$imageResult.text('Your image "' + _imgFile.name + '" ' + invalid);
		        		_imgFile = null;
		        	} else {
		        		$imageResult.text('Your image "' + _imgFile.name + '" meets criteria.')
		        	}
		        }
		    }
		});
	};

	var submitData = function() {
		var formData = new FormData();

		$infoQuestionInput.each(function() {
			var val = $(this).val();
			var key = $(this).attr('data-key');
			formData.append(key, val);
		});

		var promptVal = addHTML($promptTextarea.val());

		formData.append('story_text', promptVal);
		formData.append('story_key', _promptKey);

		if(_imgFile) {
			var caption = $imageCaption.val().trim();
			formData.append('image_file', _imgFile);
			formData.append('image_caption', caption);	
		}
		$.ajax({
			url: _uploadUrl,
			type: 'POST',
			data:  formData,
			contentType: false,
			cache: false,
			processData:false,
			success: function(data){
				console.log(data);
			},
			error: function(err){
				console.log('error', err);
			} 
		});
	};

	var addHTML = function(str) {
		var output = '';
		str = str.split('\n');
		str.forEach(function(s) {
			s = s.trim();
			if(s.length) {
				output += '<p>' + s + '</p>'	
			}
		});

		return output;
	};

	var invalidImage = function(imgFile) {
		if(imgFile.size < MB) {
			var t = imgFile.type;
			if(t === 'image/jpg' || t === 'image/jpeg' || t === 'image/png' || t === 'image/gif') {
				return null;
			} else {
				return 'is the wrong file type. It Must be a jpg, png, or gif.'
			}
		} else {
			return 'is too big. It Must be less than 1 mb.'
		}

		return null;
	};

	init();
	
})();