(function () {
	var _prompt;
	var _writingMode;

	var $prompt = $('.prompt');
	var $submit = $('.submit-container .btn');
	var $storyForm = $('.user-story-form');

	var init = function() {
		setupEvents();
	};

	var setupEvents = function() {
		$prompt.on('click', function() {
			if(!_writingMode) {
				_writingMode = true;
				_prompt = $(this).index();
				$prompt.not(this).addClass('hide');
				$storyForm.removeClass('hide');	
			}
		});	

		$submit.on('click', function() {
			if (typeof FileReader !== 'undefined') {
				console.log($('#file-upload')[0].files[0]);
			    // var size = $('file-upload')[0].files[0].size;
			    // console.lo
			}
		});
	};

	init();
	
})();