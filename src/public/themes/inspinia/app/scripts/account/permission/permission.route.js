(function(chaos) { "use strict";
/**
 * @author ntd1712
 */
chaos.config(configBlocks);

function configBlocks($stateProvider) {
    $stateProvider
        .state("permission", {
            url: "/permission",
            templateUrl: "views/common/content-small.html",
            resolve: {
                deps: function($ocLazyLoad, $translatePartialLoader) {
                    $translatePartialLoader.addPart("permission");
                    return $ocLazyLoad.load("permission");
                }
            },
            data: {
                pageTitle: "PERMISSION"
            },
            controller: "PermissionController as ctrl",
            abstract: true
        })
        .state("permission.index", {
            url: "",
            templateUrl: "views/common/simple-grid.html",
            data: {
                pageTitle: "MANAGE_PERMISSIONS",
                pageDesc: "FROM_HERE_YOU_CAN_BROWSE_ALL_OF_THE_LATEST_RECORDS"
            }
        })
        .state("permission.create", {
            url: "/create",
            views: {
                "": {
                    templateUrl: "views/common/simple-form.html"
                },
                "@permission.create": {
                    templateUrl: "views/account/permission/form.html"
                }
            },
            data: {
                pageTitle: "CREATE_PERMISSION",
                pageDesc: "FROM_HERE_YOU_CAN_CREATE_A_NEW_RECORD",
                isNew: true
            }
        })
        .state("permission.edit", {
            url: "/edit/{id:int}",
            views: {
                "": {
                    templateUrl: "views/common/simple-form.html"
                },
                "@permission.edit": {
                    templateUrl: "views/account/permission/form.html"
                }
            },
            data: {
                pageTitle: "EDIT_PERMISSION",
                pageDesc: "FROM_HERE_YOU_CAN_EDIT_AN_EXISTING_RECORD",
                isNew: false
            }
        });
}

})(window.chaos);