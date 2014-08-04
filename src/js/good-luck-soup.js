(function() {
	log('v0.0.4');

	function init() {
		// setup swipe
		if(Modernizr.touch) {
			$('#ui').remove();
			var el = $('#card-container')[0],
				mc = new Hammer.Manager(el);

			mc.add(new Hammer.Swipe());
			mc.get('swipe').set({velocity: 0.1, distance: 5});
			mc.on('swipe', swipe);
		}
		resize();

		$(window).on('resize', debounce(resize, 150));
		$('.card').on('click', function() {
			log('cd');
		});
	}


	function swipe(e) {
		//8 - up, 4 - right, 16 - down, 2 - left
		var dir;
		if(e.direction === 8) {
			dir = 'up';
		} else if(e.direction === 4) {
			dir = 'right';
		} else if(e.direction === 16) {
			dir = 'down';
		} else if(e.direction === 2) {
			dir = 'left';
		}
	}

	function resize() {
		var h = $(window).height();
		$('#container').css({
			height: h
		});
	}

	init();
})();