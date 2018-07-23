(function(chaos) { "use strict";
/**
 * @author ntd1712
 */
chaos.config(configBlocks);

function configBlocks($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        modules: [{
        // packages
            name: "icheck",
            files: [
                "../node_modules/icheck/icheck.min.js"
            ]
        },{
            name: "masonry",
            files: [
                "../node_modules/masonry-layout/dist/masonry.pkgd.min.js"
            ]
        },{
            name: "ui-select",
            files: [
                "../node_modules/ui-select/dist/select.min.css",
                "../node_modules/ui-select/dist/select.min.js"
            ]
        },{
            name: "checklist-model",
            files: [
                "../node_modules/checklist-model/checklist-model.js"
            ]
        },{
            name: "ng-file-upload",
            files: [
                "../node_modules/ng-file-upload/dist/ng-file-upload.min.js"
            ]
        },{
        // account
            name: "permission",
            files: [
                "scripts/account/permission/permission.model.js",
                "scripts/account/permission/permission.repository.js",
                "scripts/account/permission/permission.controller.js"
            ]
        },{
            name: "role",
            files: [
                "scripts/account/role/role.model.js",
                "scripts/account/role/role.repository.js",
                "scripts/account/role/role.controller.js"
            ]
        },{
            name: "user",
            files: [
                "scripts/account/user/user.model.js",
                "scripts/account/user/user.repository.js",
                "scripts/account/user/user.controller.js"
            ]
        },{
        // system
            name: "register",
            files: [
                "scripts/system/auth/register.model.js",
                "scripts/system/auth/register.repository.js",
                "scripts/system/auth/register.controller.js"
            ]
        },{
            name: "audit",
            files: [
                "scripts/system/audit/audit.model.js",
                "scripts/system/audit/audit.repository.js",
                "scripts/system/audit/audit.controller.js"
            ]
        },{
            name: "lookup",
            files: [
                "scripts/system/lookup/lookup.model.js",
                "scripts/system/lookup/lookup.repository.js",
                "scripts/system/lookup/lookup.controller.js"
            ]
        },{
            name: "setting",
            files: [
                "scripts/system/setting/setting.model.js",
                "scripts/system/setting/setting.repository.js",
                "scripts/system/setting/setting.controller.js"
            ]
        }]
    });
}

})(window.chaos);