(function(angular) { "use strict";
/**
 * @author ntd1712
 */
angular.module("homer").controller("LookupController", Anonymous);

function Anonymous($scope, LookupRepository, AbstractController) {
    function LookupController() {
        this.__super__.constructor.apply(this, arguments);
    }
    extend(LookupController, AbstractController);

    return LookupController.newInstance(arguments);
}

})(window.angular);