(function(chaos) { "use strict";
/**
 * @author ntd1712
 */
chaos.config(configBlocks);

function configBlocks($stateProvider) {
    $stateProvider
        .state("role", {
            url: "/role",
            templateUrl: "views/common/content-small.html",
            resolve: {
                deps: function($ocLazyLoad, $translatePartialLoader) {
                    $translatePartialLoader.addPart("role");
                    return $ocLazyLoad.load(["checklist-model", "permission", "role"]);
                }
            },
            data: {
                pageTitle: "ROLE"
            },
            controller: "RoleController as ctrl",
            abstract: true
        })
        .state("role.index", {
            url: "",
            templateUrl: "views/common/simple-grid.html",
            data: {
                pageTitle: "MANAGE_ROLES",
                pageDesc: "FROM_HERE_YOU_CAN_BROWSE_ALL_OF_THE_LATEST_RECORDS"
            }
        })
        .state("role.create", {
            url: "/create",
            views: {
                "": {
                    templateUrl: "views/common/simple-form.html"
                },
                "@role.create": {
                    templateUrl: "views/account/role/form.html"
                }
            },
            data: {
                pageTitle: "CREATE_ROLE",
                pageDesc: "FROM_HERE_YOU_CAN_CREATE_A_NEW_RECORD",
                isNew: true
            }
        })
        .state("role.edit", {
            url: "/edit/{id:int}",
            views: {
                "": {
                    templateUrl: "views/common/simple-form.html"
                },
                "@role.edit": {
                    templateUrl: "views/account/role/form.html"
                }
            },
            data: {
                pageTitle: "EDIT_ROLE",
                pageDesc: "FROM_HERE_YOU_CAN_EDIT_AN_EXISTING_RECORD",
                isNew: false
            }
        });
}

})(window.chaos);