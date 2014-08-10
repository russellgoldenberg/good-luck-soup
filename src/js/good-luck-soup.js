(function() {
	log('v0.0.4');

	function init() {
		setupUI();
		setupEvents();
		resize();
	}

	function setupUI() {
		// show different nav options if mobile or desktop
		//TODO use modernizr or is mobile?
		if(Modernizr.touch) {
			log('touch');
			//remove desktop ui (default)
			$('#ui').addClass('hide');
			
			//setup hammer touch events
			var el = $('#card-container')[0],
				mc = new Hammer.Manager(el);
			mc.add(new Hammer.Swipe());
			mc.get('swipe').set({velocity: 0.1, distance: 5});
			mc.on('swipe', swipe);
		} else {
			log('no touch');
		}
	}

	function setupEvents() {
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

	//resize everything on window resize (with debounce)
	function resize() {
		var h = $(window).height();
		$('#container').css('height', h);
	}

	init();
})();