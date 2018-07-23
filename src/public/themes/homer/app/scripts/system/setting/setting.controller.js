(function(angular) { "use strict";
/**
 * @author ntd1712
 */
angular.module("homer").controller("SettingController", Anonymous);

function Anonymous($scope, SettingRepository, AbstractController) {
    function SettingController() {
        this.__super__.constructor.apply(this, arguments);
    }
    extend(SettingController, AbstractController);

    return SettingController.newInstance(arguments);
}

})(window.angular);