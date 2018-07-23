(function(chaos) { "use strict";
/**
 * @author ntd1712
 */
chaos.config(configBlocks);

function configBlocks($stateProvider) {
    $stateProvider
        .state("setting", {
            url: "/setting",
            templateUrl: "views/common/content-small.html",
            resolve: {
                deps: function($ocLazyLoad, $translatePartialLoader) {
                    $translatePartialLoader.addPart("setting");
                    return $ocLazyLoad.load("setting");
                }
            },
            data: {
                pageTitle: "SETTING"
            },
            controller: "SettingController as ctrl",
            abstract: true
        })
        .state("setting.index", {
            url: "",
            templateUrl: "views/common/simple-grid.html",
            data: {
                pageTitle: "MANAGE_SETTINGS",
                pageDesc: "FROM_HERE_YOU_CAN_BROWSE_ALL_OF_THE_LATEST_RECORDS"
            }
        })
        .state("setting.create", {
            url: "/create",
            views: {
                "": {
                    templateUrl: "views/common/simple-form.html"
                },
                "@setting.create": {
                    templateUrl: "views/system/setting/form.html"
                }
            },
            data: {
                pageTitle: "CREATE_SETTING",
                pageDesc: "FROM_HERE_YOU_CAN_CREATE_A_NEW_RECORD",
                isNew: true
            }
        })
        .state("setting.edit", {
            url: "/edit/{id:int}",
            views: {
                "": {
                    templateUrl: "views/common/simple-form.html"
                },
                "@setting.edit": {
                    templateUrl: "views/system/setting/form.html"
                }
            },
            data: {
                pageTitle: "EDIT_SETTING",
                pageDesc: "FROM_HERE_YOU_CAN_EDIT_AN_EXISTING_RECORD",
                isNew: false
            }
        });
}

})(window.chaos);