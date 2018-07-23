(function(_, angular) { "use strict";
/**
 * @author ntd1712
 */
angular.module("homer").controller("UserController", Anonymous);

function Anonymous($scope, UserRepository, RoleRepository, AbstractController) {
    function UserController() {
        this.__super__.constructor.apply(this, arguments);
    }
    extend(UserController, AbstractController);

    UserController.prototype.beforeForm = function(/*id, isNew*/) {
        $scope.roles = { data: [], primary: { Id: 0 }, secondary: [], filter: function(value) {
            return void 0 === _.find([$scope.roles.primary].concat($scope.roles.secondary), { Id: value.Id });
        }};
    };

    UserController.prototype.afterForm = function(id, response, isNew) {
        if (!isNew) {
            if (Array.isArray($scope.model.Profile)) {
                $scope.model.Profile = {};
            }

            $scope.model.Password = $scope.mistr.Password = "******";
        }

        RoleRepository.index().then(function(response) {
            $scope.roles.data = response.data;
            var defaultRole = _.find($scope.roles.data, { Name: "User" }),
                primaryRole = _.find($scope.model.Roles, { IsPrimary: true });

            if (void 0 !== primaryRole) {
                $scope.roles.primary = primaryRole.Role;
            }
            else if (void 0 !== defaultRole) {
                $scope.roles.primary = defaultRole;
            }

            _.forEach(_.without($scope.model.Roles, primaryRole), function(value) {
                $scope.roles.secondary.push(value.Role);
            });
        });
    };

    UserController.prototype.beforeSave = function(model/*, id, isNew*/) {
        model.Roles = [$scope.roles.primary].concat($scope.roles.secondary);
    };

    return UserController.newInstance(arguments);
}

})(window._, window.angular);