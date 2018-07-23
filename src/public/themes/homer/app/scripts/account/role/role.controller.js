(function(angular) { "use strict";
/**
 * @author ntd1712
 */
angular.module("homer").controller("RoleController", Anonymous);

function Anonymous($scope, RoleRepository, PermissionRepository, AbstractController) {
    function RoleController() {
        this.__super__.constructor.apply(this, arguments);
    }
    extend(RoleController, AbstractController);

    RoleController.prototype.beforeForm = function() {
        PermissionRepository.index().then(function(response) {
            $scope.permissions = response.data;
        });
    };

    RoleController.prototype.toggle = function(mode) {
        switch (mode) {
            case "check":
                $scope.model.Permissions = $scope.permissions.map(function(item) {
                    return item;
                });
                break;
            case "uncheck":
                $scope.model.Permissions = [];
                break;
            default:
        }
    };

    return RoleController.newInstance(arguments);
}

})(window.angular);