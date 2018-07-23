(function(CFG, chaos, Lockr) { "use strict";
/**
 * @author ntd1712
 */
chaos.config(configBlocks)
     .run(runBlocks);

function configBlocks($compileProvider, $httpProvider, $urlRouterProvider,
                      $translateProvider, $translatePartialLoaderProvider, jwtOptionsProvider) {
    // setup pascalprecht.translate
    $translatePartialLoaderProvider.addPart(".messages");
    $translateProvider
        .fallbackLanguage(CFG.app.fallback_locale)
        .preferredLanguage(CFG.app.locale)
        .useLoader("$translatePartialLoader", {
            urlTemplate: CFG.app.url + "/themes/" + CFG.app.theme + "/app/l10n/{lang}/{part}.json"
        })
        .useSanitizeValueStrategy("escape", "sanitizeParameters")
        .useStorage("Lockr");

    // setup angular-jwt & misc.
    jwtOptionsProvider.config({
        tokenGetter: ["options", "$http", "jwtHelper", function(options, $http, jwtHelper) {
            if (void 0 !== options) {
                var ext = options.url.substr(options.url.length - 5);

                if (".html" === ext || ".json" === ext) {
                    return null;
                }
            }

            var token = Lockr.get(CFG.session.cookie + "_jwt");

            if (void 0 !== token && void 0 !== jwtHelper && jwtHelper.isTokenExpired(token)) {
                return $http({
                    method: "POST",
                    skipAuthorization: true,
                    url: $http.defaults.route + "auth/renewtoken?token=" + token
                })
                .then(function(response) {
                    if (response.headers("authorization")) {
                        token = (response.headers("authorization") + "").replace(/bearer\s*/i, "");
                        Lockr.set(CFG.session.cookie + "_jwt", token);

                        return token;
                    }
                });
            }

            return token;
        }],
        unauthenticatedRedirector: ["$state", function($state) {
            $state.go("login", {}, { reload: true });
        }],
        whiteListedDomains: [String(CFG.session.domain), "localhost", "127.0.0.1", "0.0.0.0"]
    });

    $httpProvider.interceptors.push("jwtInterceptor", "RequestProvider");
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];

    $compileProvider.debugInfoEnabled(false);
    $urlRouterProvider.otherwise(function($injector) {
        $injector.get("$state").go(
            Lockr.get(CFG.session.cookie + "_jwt") ? (CFG.app.default_route || "setting.index") : "login",
            {}, { reload: true });
    });
}

function runBlocks($http, $rootScope, $state, $transitions, $translate, jwtHelper) {
    // setup some defaults
    $http.defaults.route = (CFG.urls.api || (CFG.app.url + "/api")) + "/";
    $rootScope.$state = $state;
    $rootScope.CFG = CFG;
    // $rootScope._ = window._;
    // $rootScope.moment = window.moment;

    // localization & misc.
    window.t = function(langKey) {
        return $translate.instant(langKey);
    };
    $rootScope.changeLanguage = function(langKey) {
        $translate.use(langKey);
        location.reload(true);
    };
    $rootScope.$on("$translatePartialLoaderStructureChanged", function() {
        $translate.refresh();
    });
    $rootScope.$watch("growl", function(newValue) {
        if (void 0 !== newValue) {
            chaos.growl(t(newValue));
            $rootScope.growl = undefined;
        }
    });

    // what if the user is not authenticated
    $rootScope.$on("unauthenticated", function() {
        $rootScope.error = t("INVALID_OR_EXPIRED_SESSION");
        $rootScope.isAuthenticated = false;
        $state.go("login", {}, { reload: true });
    });
    $rootScope.$on("tokenHasExpired", function() {
        $rootScope.$broadcast("unauthenticated");
    });

    $transitions.onBefore({}, function(/** Transition */$transition$) {
        var to = $transition$.to();

        if (!("logout" === to.name || to.data.allowGuest) || to.requiresLogin) {
            var token = Lockr.get(CFG.session.cookie + "_jwt");

            if (!token) {
                // event.preventDefault();
                return $rootScope.$broadcast("unauthenticated", token);
            }

            if (!$rootScope.$user) {
                var decoded = jwtHelper.decodeToken(token);
                $rootScope.$user = decoded.res;
            }
        }
    });
}

})(window.CFG, window.chaos, window.Lockr);