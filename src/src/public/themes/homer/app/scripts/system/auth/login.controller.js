(function(angular, Lockr) { "use strict";
/**
 * @author ntd1712
 */
angular.module("homer").controller("LoginController", Anonymous);

function Anonymous($scope, LoginRepository, AbstractController) {
    function LoginController() {
        this.__super__.constructor.apply(this, arguments);
    }
    extend(LoginController, AbstractController);

    LoginController.prototype.login = function(model) {
        this.repository.store(model).then(
            function(response) {
                Lockr.set($scope.CFG.session.name + "_jwt", response.data.token);
                $scope.$parent.error = undefined;
                $scope.$state.go($scope.CFG.app.default_route, {}, { reload: true });
            },
            function(response) {
                $scope.$parent.error = response.data.error || t("COULD_NOT_LOG_IN");
            });

        return this;
    };

    LoginController.prototype.logout = function(model) {
        this.repository.store(model)
            .then(function() {
                $scope.$state.go("login", {}, { reload: true });
            })
            .finally(function() {
                Lockr.rm($scope.CFG.session.name + "_jwt");
            });

        return this;
    };

    LoginController.prototype.recovery = function(model) {
        this.repository.store(model).then(
            function() {
                $scope.$parent.error = undefined;
                $scope.$parent.growl = "PLEASE_CHECK_YOUR_EMAIL_FOR_THE_RESET_PASSWORD_INSTRUCTIONS";
                $scope.$state.go("login", {}, { reload: true });
            },
            function(response) {
                $scope.$parent.error = response.data.error || t("YOUR_EMAIL_IS_INVALID");
            });

        return this;
    };

    LoginController.prototype.reset = function(model) {
        if (model.password !== model.confirmPassword) {
            return $scope.$parent.error = t("PASSWORD_DOES_NOT_MATCH_THE_CONFIRM_PASSWORD");
        }

        this.repository.store(model).then(
            function() {
                $scope.$parent.error = undefined;
                $scope.$state.go("login", {}, { reload: true });
            },
            function(response) {
                $scope.$parent.error = response.data.error || t("COULD_NOT_RESET_PASSWORD");
            });

        return this;
    };

    return LoginController.newInstance(arguments);
}

})(window.angular, window.Lockr);