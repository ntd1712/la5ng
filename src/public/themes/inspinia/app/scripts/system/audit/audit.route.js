(function(chaos) { "use strict";
/**
 * @author ntd1712
 */
chaos.config(configBlocks);

function configBlocks($stateProvider) {
    $stateProvider
        .state("audit", {
            url: "/audit",
            views: {
                "": {
                    templateUrl: "views/common/content-small.html"
                },
                "@audit": {
                    templateUrl: "views/common/simple-grid.html",
                    controller: "AuditController as ctrl"
                }
            },
            resolve: {
                deps: function($ocLazyLoad, $translatePartialLoader) {
                    $translatePartialLoader.addPart("audit");
                    return $ocLazyLoad.load("audit");
                }
            },
            onEnter: function($rootScope) {
                $rootScope.dtColumns = { ops: ["show", "destroy"] };
            },
            onExit: function($rootScope) {
                $rootScope.dtColumns = undefined;
            },
            data: {
                pageTitle: "AUDIT_TRAIL",
                pageDesc: "FROM_HERE_YOU_CAN_BROWSE_ALL_OF_THE_LATEST_RECORDS"
            }
        })
        .state("audit.show", {
            url: "/show/{id:int}",
            views: {
                "": {
                    templateUrl: "views/common/simple-details.html",
                    controller: "AuditController as ctrl"
                },
                "@audit.show": {
                    templateUrl: "views/system/audit/details.html"
                }
            },
            data: {
                pageTitle: "AUDIT_TRAIL",
                pageDesc: "FROM_HERE_YOU_CAN_VIEW_DETAILS_OF_AN_EXISTING_RECORD",
                isNew: false
            }
        });
}

})(window.chaos);