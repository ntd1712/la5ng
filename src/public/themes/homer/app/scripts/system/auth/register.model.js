(function(chaos) { "use strict";
/**
 * @author ntd1712
 */
chaos.service("RegisterModel", Anonymous);

function Anonymous(AbstractModel) {
    function RegisterModel(data) {
        this.__super__.constructor.apply(this, [data, RegisterModel.getFields()]);
    }
    extend(RegisterModel, AbstractModel);

    /**
     * @returns {string}
     */
    RegisterModel.getRoute = function() {
        return "auth/register";
    };

    /**
     * @return {Object[]}
     */
    RegisterModel.getFields = function() {
        return [{
            data: "Id",
            value: 0,
            visible: false
        },{
            data: "Name",
            title: t("USERNAME"),
            value: ""
        },{
            data: "Email",
            title: t("EMAIL"),
            value: ""
        },{
            data: "Password",
            value: "",
            visible: false
        },{
            data: "ConfirmPassword",
            value: "",
            visible: false
        },{
            data: "Profile",
            value: "",
            visible: false
        },{
            data: "Roles",
            value: [],
            visible: false
        }];
    };

    return RegisterModel;
}

})(window.chaos);