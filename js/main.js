function signalIt(signal) {
	divolte.signal(signal);
}

window.cookieconsent_options = {
    theme:'dark-bottom', 
    consent_hook: function() { 
        signalIt('cookieconsent_given'); 
    } 
};

window.onload = function() {

    var hashids = new Hashids("this is the sound of c");
    var tha = hashids.encode(+divolte.fpId);
    window.tha = tha;

    var $menuIcon = document.getElementsByClassName('menu-icon')[0],
        $offCanva = document.getElementsByClassName('off-canvas')[0];
        $siteWrap = document.getElementsByClassName('site-wrapper')[0];

    $menuIcon.addEventListener('click', function() {
        toggleClass($menuIcon, 'close');
        toggleClass($offCanva, 'toggled');
        toggleClass($siteWrap, 'open');
        signalIt('bio');
    }, false);

    $menuIcon.addEventListener('mouseenter', function() {
        addClass($menuIcon, 'hover');
    });

    $menuIcon.addEventListener('mouseleave', function() {
        removeClass($menuIcon, 'hover');
    });

    function addClass(element, className) {
        element.className += " " + className;
    }

    function removeClass(element, className) {
        // Capture any surrounding space characters to prevent repeated
        // additions and removals from leaving lots of spaces.
        var classNameRegEx = new RegExp("\\s*" + className + "\\s*");
        element.className = element.className.replace(classNameRegEx, " ");
    }

    function toggleClass(element, className) {
        if (!element || !className) {
            return;
        }

        if (element.className.indexOf(className) === -1) {
            addClass(element, className);
        } else {
            removeClass(element, className);
        }
    }

	function addEventListenerByClass(className, event, fn) {
	    var list = document.getElementsByClassName(className);
	    for (var i = 0, len = list.length; i < len; i++) {
	        list[i].addEventListener(event, fn);
	    }
	}

    function changeHref(className, subTag) {
		var list = document.getElementsByClassName(className);
	    for (var i = 0, len = list.length; i < len; i++) {
	        var tags = list[i].getElementsByTagName(subTag);
	        for (var j = 0, len2 = tags.length; j < len2; j++) {
	        	tags[j].href = tags[j].href + "#" + window.tha;
	        }
	    }
	}

	function changeHrefRef(className, subTag) {
		var list = document.getElementsByClassName(className);
	    for (var i = 0, len = list.length; i < len; i++) {
	        var tags = list[i].getElementsByTagName(subTag);
	        for (var j = 0, len2 = tags.length; j < len2; j++) {
	        	var attr = tags[j].getAttribute('rel');
	        	if (attr == 'prev' || attr == 'next') {
	        		tags[j].href = tags[j].href + "#" + window.tha;
	        	}
	        }
	    }
	}

    function changeHrefSubclass(className, subClass) {
        var list = document.getElementsByClassName(className);
        for (var i = 0, len = list.length; i < len; i++) {
            var tags = list[i].getElementsByClassName(subClass);
            for (var j = 0, len2 = tags.length; j < len2; j++) {
                tags[j].href = tags[j].href + "#" + window.tha;
            }
        }
    }

	changeHref('posts', 'a');
    changeHref('tposts', 'a');
    //changeHref('post-tags', 'a');
	changeHrefRef('single-content', 'a');
    changeHrefSubclass('single-content', 'int');
    changeHrefSubclass('title', 'home');

	addEventListenerByClass('popup', 'click', function(e) {
        e.preventDefault()
        var width  = 575,
            height = 400,
            left   = (document.documentElement.clientWidth  - width)  / 2,
            top    = (document.documentElement.clientHeight - height) / 2,
            //url    = this.href + '%23' + tha,
            url    = this.href + '%23' + tha,
            opts   = 'status=1' +
                     ',width='  + width  +
                     ',height=' + height +
                     ',top='    + top    +
                     ',left='   + left;
        window.open(url, 'share', opts);
        signalIt('share');
        return false;
    });

}