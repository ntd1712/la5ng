(function(chaos) { "use strict";
/**
 * @author ntd1712
 */
chaos.service("LoginModel", Anonymous);

function Anonymous(AbstractModel) {
    function LoginModel(data) {
        this.__super__.constructor.apply(this, [data, LoginModel.getFields()]);
    }
    extend(LoginModel, AbstractModel);

    /**
     * @returns {string}
     */
    LoginModel.getRoute = function() {
        return "auth/login";
    };

    /**
     * @return {Object[]}
     */
    LoginModel.getFields = function() {
        return [{
            data: "email",
            value: ""
        },{
            data: "password",
            value: ""
        },{
            data: "remember_token",
            value: true
        }];
    };

    return LoginModel;
}

})(window.chaos);