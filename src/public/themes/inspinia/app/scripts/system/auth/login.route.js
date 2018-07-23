(function(CFG, chaos, Lockr) { "use strict";
/**
 * @author ntd1712
 */
chaos.config(configBlocks);

function configBlocks($stateProvider) {
    $stateProvider
        .state("login", {
            url: "/login",
            templateUrl: "views/system/auth/login.html",
            resolve: {
                deps: function($ocLazyLoad, $translatePartialLoader) {
                    $translatePartialLoader.addPart("user");
                    return $ocLazyLoad.load(["icheck"]);
                }
            },
            onEnter: function() {
                switch ((CFG.auth || {}).default) {
                    case "oauth2":
                        var url = CFG.auth.drivers.oauth2.redirectUri,
                            token = Lockr.get(CFG.session.cookie + "_ret");

                        if (token) {
                            url += "?grant=refresh_token&refresh_token=" + token;
                        }

                        return location.replace(url);
                    default:
                        Lockr.rm(CFG.session.cookie + "_jwt");
                }
            },
            data: {
                allowGuest: true,
                pageTitle: "LOGIN",
                specialClass: "gray-bg"
            },
            controller: "LoginController as ctrl"
        })
        .state("logout", {
            templateUrl: "views/system/auth/logout.html",
            controller: "LoginController as ctrl"
        })
        .state("recovery", {
            url: "/recovery",
            templateUrl: "views/system/auth/recovery.html",
            data: {
                allowGuest: true,
                pageTitle: "RECOVERY_PASSWORD",
                specialClass: "blank"
            },
            controller: "LoginController as ctrl"
        })
        .state("reset", {
            url: "/reset",
            templateUrl: "views/system/auth/reset.html",
            data: {
                allowGuest: true,
                pageTitle: "RESET_PASSWORD",
                specialClass: "blank"
            },
            controller: "LoginController as ctrl"
        })
        .state("oauth2", {
            url: "/oauth2",
            data: {
                allowGuest: true
            },
            controller: "LoginController as ctrl",
            onEnter: function($state) {
                var parts = location.hash.split("?s=")[1].split("&r=");

                if (parts[0]) {
                    Lockr.set(CFG.session.cookie + "_jwt", parts[0]);
                    Lockr.set(CFG.session.cookie + "_ret", parts[1]);

                    return $state.go(CFG.app.default_route, {}, { reload: true });
                }

                throw new Error("INVALID_TOKEN");
            }
        });
}

})(window.CFG, window.chaos, window.Lockr);