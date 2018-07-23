(function(_, chaos, $, Lockr) {
/**
 * @author ntd1712
 */
chaos.directive("animatePanel", animatePanel)
     .directive("icheck", icheck)
     .directive("ifRole", ifRole)
     .directive("landingScrollspy", landingScrollspy)
     .directive("minimalizaMenu", minimalizaMenu)
     .directive("pageTitle", pageTitle)
     .directive("panelTools", panelTools)
     .directive("sideNavigation", sideNavigation)
     .directive("smallHeader", smallHeader)
     .directive("sparkline", sparkline)
     .directive("touchSpin", touchSpin)
     .directive("unescape", unescape);

/**
 * @param   $timeout
 * @param   $state
 * @returns {{restrict: string, link: link}}
 */
function animatePanel($timeout, $state) {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            // set defaul values for start animation and delay
            var startAnimation = 0,
                delay = 0.06, // seconds
                start = Math.abs(delay) + startAnimation,
                currentState = $state.current.name; // store current state where directive was start

            // set default values for attrs
            if (!attrs.effect) { attrs.effect = "zoomIn" }
            if (attrs.delay) { delay = attrs.delay / 10 } else { delay = 0.06 }
            if (!attrs.child) { attrs.child = ".row > div" } else { attrs.child = "." + attrs.child }

            // get all visible element and set opactiy to 0
            var panel = element.find(attrs.child).addClass("opacity-0"),
                renderTime = panel.length * delay * 1000 + 700; // count render time

            // wrap to $timeout to execute after ng-repeat
            $timeout(function() {
                // get all elements and add effect class
                panel = element.find(attrs.child);
                panel.addClass("animated-panel").addClass(attrs.effect);

                // add delay for each child elements
                panel.each(function(i, elm) {
                    start += delay;
                    $(elm).css("animation-delay", Math.round(start * 10) / 10 + "s")
                          .removeClass("opacity-0"); // remove opacity 0 after finish
                });
                // clear animate class after finish render
                $timeout(function() {
                    // check if user change state and only run renderTime on current state
                    if (currentState == $state.current.name) {
                        //remove effect class - fix for any backdrop plgins (e.g. Tour)
                        $(".animated-panel:not([ng-repeat])").removeClass(attrs.effect);
                    }
                }, renderTime)
            });
        }
    }
}

/**
 * @param   $timeout
 * @returns {{restrict: string, require: string, link: link}}
 * @link    http://icheck.fronteed.com
 */
function icheck($timeout) {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attrs, controller) {
            return $timeout(function() {
                scope.$watch(attrs["ngModel"], function() {
                    element.iCheck("update");
                });

                return element
                    .iCheck({
                        checkboxClass: "icheckbox_square-green",
                        radioClass: "iradio_square-green"
                    })
                    .on("ifChanged", function(event) {
                        if (attrs["ngModel"]) {
                            switch (element.attr("type")) {
                                case "checkbox":
                                    scope.$apply(function() {
                                        controller.$setViewValue(event.target.checked);
                                    });
                                    break;
                                case "radio":
                                    scope.$apply(function() {
                                        controller.$setViewValue(attrs["value"]);
                                    });
                                    break;
                                default:
                            }
                        }
                    });
            });
        }
    };
}

/**
 * @returns {{restrict: string, link: link}}
 */
function ifRole() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            if (!scope.$user || !scope.$user.Permissions || !scope.$user.Permissions[attrs["ifRole"]]) {
                element.remove();
            }
        }
    };
}

/**
 * @returns {{restrict: string, link: link}}
 */
function landingScrollspy() {
    return {
        restrict: "A",
        link: function(scope, element) {
            element.scrollspy({
                target: ".navbar-fixed-top",
                offset: 80
            });
        }
    }
}

/**
 * @returns {{restrict: string, template: string, controller: controller}}
 */
function minimalizaMenu() {
    return {
        restrict: "EA",
        template: '<div class="header-link hide-menu" ng-click="minimalize()"><i class="fa fa-bars"></i></div>',
        controller: function($scope) {
            $scope.minimalize = function() {
                $("body").toggleClass(769 > $(window).width() ? "show-sidebar" : "hide-sidebar");
            };
        }
    };
}

/**
 * @param   $rootScope
 * @returns {{link: link}}
 */
function pageTitle($rootScope) {
    return {
        link: function(scope, element, attrs) {
            $rootScope.$on("$stateChangeSuccess", function(event, toState) {
                element.text(toState.data && toState.data.pageTitle ?
                    toState.data.pageTitle + " | " + attrs.pageTitle : attrs.pageTitle);
            });
        }
    }
}

/**
 * @param   $timeout
 * @returns {{restrict: string, scope: boolean, templateUrl: string, controller: controller}}
 */
function panelTools($timeout) {
    return {
        restrict: "A",
        scope: true,
        templateUrl: "views/common/panel-tools.html",
        controller: function($scope, $element) {
            // function for collapse ibox
            $scope.showhide = function() {
                var hpanel = $element.closest("div.hpanel"),
                    icon = $element.find("i:first"),
                    body = hpanel.find("div.panel-body"),
                    footer = hpanel.find("div.panel-footer");

                body.slideToggle(300);
                footer.slideToggle(200);

                // toggle icon from up to down
                icon.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down");
                hpanel.toggleClass("").toggleClass("panel-collapse");

                $timeout(function() {
                    hpanel.resize();
                    hpanel.find("[id^=map-]").resize();
                }, 50);
            };

            // function for close ibox
            $scope.closebox = function() {
                $element.closest("div.hpanel").remove();
            };
        }
    };
}

/**
 * @returns {{restrict: string, link: link}}
 */
function sideNavigation() {
    return {
        restrict: "A",
        link: function(scope, element) {
            // call the metisMenu plugin and plug it to sidebar navigation
            element.metisMenu();
            // collapse menu in mobile mode after click on element
            $('#side-menu a:not([href$="\\#"])').on("click", function() {
                if (769 > $(window).width()) {
                    $("body").toggleClass("show-sidebar");
                }
            });
        }
    };
}

/**
 * @returns {{restrict: string, scope: boolean, controller: controller}}
 */
function smallHeader() {
    return {
        restrict: "A",
        scope: true,
        controller: function($scope, $element) {
            $scope.small = function() {
                $element.toggleClass("small-header");
                $element.find("#hbreadcrumb").toggleClass("m-t-lg");
                $element.find("i:first").toggleClass("fa-arrow-up").toggleClass("fa-arrow-down");
            }
        }
    }
}

/**
 * @returns {{restrict: string, scope: {sparkData: string, sparkOptions: string}, link: link}}
 */
function sparkline() {
    return {
        restrict: "A",
        scope: {
            sparkData: "=",
            sparkOptions: "="
        },
        link: function(scope, element) {
            var render = function() {
                element.sparkline(scope.sparkData, scope.sparkOptions);
            };
            scope.$watch(scope.sparkData, function() {
                render();
            });
            scope.$watch(scope.sparkOptions, function() {
                render();
            });
        }
    }
}

/**
 * @returns {{restrict: string, scope: {spinOptions: string}, link: link}}
 */
function touchSpin() {
    return {
        restrict: "A",
        scope: {
            spinOptions: "="
        },
        link: function (scope, element) {
            scope.$watch(scope.spinOptions, function(){
                element.TouchSpin(scope.spinOptions);
            });
        }
    }
}

/**
 * @returns {{restrict: string, require: string, link: link}}
 */
function unescape() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attrs, controller) {
            controller.$parsers.unshift(function(value) {
                return _.unescape(value)
                    .replace(/&#0?39;|&apos;/g, "'")
                    .replace(/&#0?34;/g, '"');
            });
            controller.$formatters.unshift(function(value) {
                if (value) {
                    return _.unescape(value)
                        .replace(/&#0?39;|&apos;/g, "'")
                        .replace(/&#0?34;/g, '"');
                }

                return void 0;
            });
        }
    };
}

})(window._, window.chaos, window.jQuery, window.Lockr);