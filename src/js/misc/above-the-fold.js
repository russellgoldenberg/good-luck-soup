(function () {
	var waitForAbove = function() {
		var el = document.getElementById('above-the-fold');
		if(el) {
			var h = window.innerHeight;
			el.style.height = h + 'px';
		} else {
			setTimeout(waitForAbove, 17);
		}
	};
	waitForAbove();
})();