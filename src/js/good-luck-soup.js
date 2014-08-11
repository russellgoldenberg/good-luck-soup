(function() {
	log('v0.0.4');

	var NUM_COLUMNS = 3;

	var _currentPosition = {x: 0, y: 0 },
		_transitions = {
			'up': {x: 0, y: 0 },
			'right': {x: 0, y: 0 },
			'left': {x: 0, y: 0 },
			'down': {x: 0, y: 0 }
		},
		_screen = { w: 0, h: 0 };

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

			//arrow click events
			$('.arrow').on('click', arrowClicked);

			//or arrow keys
			$(window).on('keyup', keyPressed);
		}
	}

	function arrowClicked() {
		 var dir = $(this).attr('data-dir');
		 transition(dir);
	}

	function keyPressed(e) {
		e.preventDefault();
		var dir;
		if(e.which === 38) {
			dir = 'up';
		} else if(e.which === 40) {
			dir = 'down';
		} else if(e.which === 37) {
			dir = 'left';
		} else if(e.which === 39) {
			dir = 'right';
		}

		if(dir) {
			transition(dir);	
		}
		return false;
	}

	function transition(dir) {
		log(dir);
		_currentPosition.x += _transitions[dir].x;
		_currentPosition.y += _transitions[dir].y;
		$('#card-container').velocity({ 
    		translateX: _currentPosition.x,
    		translateY: _currentPosition.y	
		});
	}

	function setupEvents() {
		$(window).on('resize', debounce(resize, 150));
		$('.card').on('click', function() {
			log('cd');
		});
	}
	
	function swipe(e) {
		var dir;
		if(e.direction === 16) {
			dir = 'up';
		} else if(e.direction === 2) {
			dir = 'right';
		} else if(e.direction === 8) {
			dir = 'down';
		} else if(e.direction === 4) {
			dir = 'left';
		}
		transition(dir);
	}

	//resize everything on window resize (with debounce)
	function resize() {
		_screen.w = $(window).width();
		_screen.h = $(window).height();
		$('#container').css({
			height: _screen.h
		});
		$('#card-container').css({
			width: _screen.w * NUM_COLUMNS
		});
		$('.card').css({
			height: _screen.h
		});
		$('.column').css({
			width: _screen.w
		});
		_transitions.up.y = _screen.h;
		_transitions.right.x = -_screen.w;
		_transitions.down.y = -_screen.h;
		_transitions.left.x = _screen.w;
	}

	init();
})();