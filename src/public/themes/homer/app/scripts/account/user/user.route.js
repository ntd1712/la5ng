(function(chaos) { "use strict";
/**
 * @author ntd1712
 */
chaos.config(configBlocks);

function configBlocks($stateProvider) {
    $stateProvider
        .state("user", {
            url: "/user",
            templateUrl: "views/common/content-small.html",
            resolve: {
                deps: function($ocLazyLoad, $translatePartialLoader) {
                    $translatePartialLoader.addPart("user");
                    return $ocLazyLoad.load(["ui-select", "role", "user"]);
                }
            },
            data: {
                pageTitle: "USER"
            },
            controller: "UserController as ctrl",
            abstract: true
        })
        .state("user.index", {
            url: "",
            templateUrl: "views/account/user/grid.html",
            data: {
                pageTitle: "MANAGE_USERS",
                pageDesc: "FROM_HERE_YOU_CAN_BROWSE_ALL_OF_THE_LATEST_USER_ACCOUNTS"
            }
        })
        .state("user.create", {
            url: "/create",
            views: {
                "": {
                    templateUrl: "views/common/simple-form.html"
                },
                "@user.create": {
                    templateUrl: "views/account/user/form.html"
                }
            },
            data: {
                pageTitle: "CREATE_USER",
                pageDesc: "FROM_HERE_YOU_CAN_CREATE_A_NEW_USER_ACCOUNT",
                isNew: true
            }
        })
        .state("user.edit", {
            url: "/edit/{id:int}",
            views: {
                "": {
                    templateUrl: "views/common/simple-form.html"
                },
                "@user.edit": {
                    templateUrl: "views/account/user/form.html"
                }
            },
            data: {
                pageTitle: "EDIT_USER",
                pageDesc: "FROM_HERE_YOU_CAN_EDIT_AN_EXISTING_USER_ACCOUNT",
                isNew: false
            }
        });
}

})(window.chaos);