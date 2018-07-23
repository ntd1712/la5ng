(function(chaos) { "use strict";
/**
 * @author ntd1712
 */
chaos.config(configBlocks);

function configBlocks($stateProvider) {
    $stateProvider
        .state("register", {
            url: "/register",
            templateUrl: "views/system/auth/register.html",
            resolve: {
                deps: function($ocLazyLoad, $translatePartialLoader) {
                    $translatePartialLoader.addPart("user");
                    return $ocLazyLoad.load("register");
                }
            },
            data: {
                allowGuest: true,
                pageTitle: "REGISTER",
                specialClass: "blank"
            },
            controller: "RegisterController as ctrl"
        });
}

})(window.chaos);