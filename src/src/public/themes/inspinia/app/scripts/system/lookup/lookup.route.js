(function(chaos) { "use strict";
/**
 * @author ntd1712
 */
chaos.config(configBlocks);

function configBlocks($stateProvider) {
    $stateProvider
        .state("lookup", {
            url: "/lookup",
            templateUrl: "views/common/content-small.html",
            resolve: {
                deps: function($ocLazyLoad, $translatePartialLoader) {
                    $translatePartialLoader.addPart("lookup");
                    return $ocLazyLoad.load("lookup");
                }
            },
            data: {
                pageTitle: "LOOKUP"
            },
            controller: "LookupController as ctrl",
            abstract: true
        })
        .state("lookup.index", {
            url: "",
            templateUrl: "views/common/simple-grid.html",
            data: {
                pageTitle: "MANAGE_LOOKUPS",
                pageDesc: "FROM_HERE_YOU_CAN_BROWSE_ALL_OF_THE_LATEST_RECORDS"
            }
        })
        .state("lookup.create", {
            url: "/create",
            views: {
                "": {
                    templateUrl: "views/common/simple-form.html"
                },
                "@lookup.create": {
                    templateUrl: "views/system/lookup/form.html"
                }
            },
            data: {
                pageTitle: "CREATE_LOOKUP",
                pageDesc: "FROM_HERE_YOU_CAN_CREATE_A_NEW_RECORD",
                isNew: true
            }
        })
        .state("lookup.edit", {
            url: "/edit/{id:int}",
            views: {
                "": {
                    templateUrl: "views/common/simple-form.html"
                },
                "@lookup.edit": {
                    templateUrl: "views/system/lookup/form.html"
                }
            },
            data: {
                pageTitle: "EDIT_LOOKUP",
                pageDesc: "FROM_HERE_YOU_CAN_EDIT_AN_EXISTING_RECORD",
                isNew: false
            }
        });
}

})(window.chaos);