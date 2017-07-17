var d = document;

var domReady = function(callback) {
    var ready = false;

    var detach = function() {
        if(document.addEventListener) {
            document.removeEventListener("DOMContentLoaded", completed);
            window.removeEventListener("load", completed);
        } else {
            document.detachEvent("onreadystatechange", completed);
            window.detachEvent("onload", completed);
        }
    }
    var completed = function() {
        if(!ready && (document.addEventListener || event.type === "load" || document.readyState === "complete")) {
            ready = true;
            detach();
            callback();
        }
    };

    if(document.readyState === "complete") {
        callback();
    } else if(document.addEventListener) {
        document.addEventListener("DOMContentLoaded", completed);
        window.addEventListener("load", completed);
    } else {
        document.attachEvent("onreadystatechange", completed);
        window.attachEvent("onload", completed);

        var top = false;

        try {
            top = window.frameElement == null && document.documentElement;
        } catch(e) {}

        if(top && top.doScroll) {
            (function scrollCheck() {
                if(ready) return;

                try {
                    top.doScroll("left");
                } catch(e) {
                    return setTimeout(scrollCheck, 50);
                }

                ready = true;
                detach();
                callback();
            })();
        }
    }
};

domReady(function() {
    
    Reveal.addEventListener( 'slidechanged', function(event) {
        // Called each time the slide with the "stats" state is made visible

       

            var slide = Reveal.getCurrentSlide();
            
            var hide_logo = false;

            slide.classList.forEach(function(item) { 
                if (item == "hide_logo") {
                    hide_logo = true;
                }
            })
            
            //console.debug(slide);

            if (hide_logo) {
                toggle_logo('hide');
            } else {
                toggle_logo('show');
            }

            
      


    } );

});


function toggle_logo(state) {
    
    state = state || "display";

    var logo = d.getElementById("sticky_logo");

    if (state == "hide") {
        logo.style.visibility = 'hidden';    
    } else {
        logo.style.visibility = 'visible';
    }
    
}
