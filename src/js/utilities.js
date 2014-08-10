// utilities
function log(msg) {
	if (window.console && console.log) {
		console.log(msg);
	}
}

function isMobile() {
	return /iPad|iPod|iPhone|Android/.test(navigator.userAgent) || document.location.hash == "#ipad";
}

// debounce
function isObject(b){return!(!b||!objectTypes[typeof b])}function isFunction(b){return"function"==typeof b}var nativeMax=Math.max;
function debounce(b,e,a){var f,c,g,h,k,d,p,l=0,m=!1,n=!0;if(!isFunction(b))throw new TypeError;e=nativeMax(0,e)||0;if(!0===a)var q=!0,n=!1;else isObject(a)&&(q=a.leading,m="maxWait"in a&&(nativeMax(e,a.maxWait)||0),n="trailing"in a?a.trailing:n);var r=function(){var a=e-(new Date-h);0>=a?(c&&clearTimeout(c),a=p,c=d=p=void 0,a&&(l=+new Date,g=b.apply(k,f))):d=setTimeout(r,a)},t=function(){d&&clearTimeout(d);c=d=p=void 0;if(n||m!==e)l=+new Date,g=b.apply(k,f)};return function(){f=arguments;h=+new Date;
k=this;p=n&&(d||!q);if(!1===m)var a=q&&!d;else{c||q||(l=h);var s=m-(h-l);0>=s?(c&&(c=clearTimeout(c)),l=h,g=b.apply(k,f)):c||(c=setTimeout(t,s))}d||e===m||(d=setTimeout(r,e));a&&(g=b.apply(k,f));return g}};
