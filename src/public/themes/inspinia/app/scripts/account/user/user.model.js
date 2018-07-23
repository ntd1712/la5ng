(function(chaos) { "use strict";
/**
 * @author ntd1712
 */
chaos.service("UserModel", Anonymous);

function Anonymous(AbstractModel) {
    function UserModel(data) {
        this.__super__.constructor.apply(this, [data, UserModel.getFields()]);
    }
    extend(UserModel, AbstractModel);

    /**
     * @returns {string}
     */
    UserModel.getRoute = function() {
        return "account/user";
    };

    /**
     * @return {Object[]}
     */
    UserModel.getFields = function() {
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
            data: "Profile",
            value: "",
            visible: false
        },{
            data: "Roles",
            value: [],
            visible: false
        }];
    };

    return UserModel;
}

})(window.chaos);