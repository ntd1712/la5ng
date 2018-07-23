(function(document, window, $) { "use strict";
/**
 * INSPINIA - Responsive Admin Theme
 * version 2.6.2.1
 */
function fixHeight($window) {
    var $wrapper = $("#page-wrapper"),
        wrapperH = $wrapper.height(),
        navbarH = $("nav.navbar-default").height();

    if (navbarH > wrapperH) {
        $wrapper.css("min-height", navbarH + "px");
    }
    else if (navbarH < wrapperH) {
        $wrapper.css("min-height", ($body.hasClass("fixed-nav") ? $window.height() - 60 : $window.height()) + "px");
    }

    $(".sidebard-panel").css("min-height", ($("#wrapper").height() - 61) + "px");
}

var $body = $(document.body),
    $window = $(window)
        .on("load resize", function() {
            if (769 > $(document).width()) {
                $body.addClass("body-small");
            }
            else {
                $body.removeClass("body-small");
            }
        });

$(function() {
    $window
        .on("load resize scroll", function() {
            if (!$body.hasClass("body-small")) {
                fixHeight($window);
            }
        })
        .on("scroll", function() {
            if (0 < $window.scrollTop() && !$body.hasClass("fixed-nav")) {
                $("#right-sidebar").addClass("sidebar-top");
            }
            else {
                $("#right-sidebar").removeClass("sidebar-top");
            }
        });
    setTimeout(function() { fixHeight($window) }, 0);
});

})(document, window, window.jQuery);