(function(document, window, $) { "use strict";
/**
 * HOMER - Responsive Admin Theme
 * version 1.8
 */
function fixWrapperHeight($window) {
    // get and set current height
    var navigationH = $("#navigation").height(),
        contentH = $("div.content").height(),
        windowH = $window.height();

    if (contentH < navigationH) {
        $("#wrapper").css("min-height", (navigationH < windowH ? windowH - 62 : navigationH) + "px");
    }
    else if (contentH > navigationH && contentH < windowH) {
        // set new height when content is higher than navigation but less than window
        $("#wrapper").css("min-height", (windowH - 62) + "px");
    }
}

function setBodySmall($window) {
    if (769 > $window.width()) {
        $(document.body).addClass("page-small");
    }
    else {
        $(document.body).removeClass("page-small show-sidebar");
    }

    return $window;
}

function setPanelSize($window) {
    var $wrapper = $("#wrapper"),
        height = $window.height() - $("#logo").height() - $("div.color-line").height();

    if (height > $wrapper.height()) {
        $wrapper.css("height", height + "px");
    }
}

var $window = $(window)
    .on("load", function() {
        $("div.splash").css("display", "none"); // remove splash screen after load
    })
    .on("resize click", function() {
        // add special class to minimize page elements when screen is less than 768px
        setPanelSize(setBodySmall($window));
        // wait until metisMenu, collapse and other effect finish and set wrapper height
        setTimeout(function() { fixWrapperHeight($window) }, 300);
    });

$(function() {
    $window.trigger("click");
});

})(document, window, window.jQuery);
