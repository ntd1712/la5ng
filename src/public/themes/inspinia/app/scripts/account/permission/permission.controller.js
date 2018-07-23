(function(angular) { "use strict";
/**
 * @author ntd1712
 */
angular.module("inspinia").controller("PermissionController", Anonymous);

function Anonymous($scope, PermissionRepository, AbstractController) {
    function PermissionController() {
        this.__super__.constructor.apply(this, arguments);
    }
    extend(PermissionController, AbstractController);

    return PermissionController.newInstance(arguments);
}

})(window.angular);