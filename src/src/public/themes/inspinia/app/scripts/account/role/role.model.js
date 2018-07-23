(function(chaos) { "use strict";
/**
 * @author ntd1712
 */
chaos.service("RoleModel", Anonymous);

function Anonymous(AbstractModel) {
    function RoleModel(data) {
        this.__super__.constructor.apply(this, [data, RoleModel.getFields()]);
    }
    extend(RoleModel, AbstractModel);

    /**
     * @returns {string}
     */
    RoleModel.getRoute = function() {
        return "account/role";
    };

    /**
     * @return {Object[]}
     */
    RoleModel.getFields = function() {
        return [{
            data: "Id",
            value: 0,
            visible: false
        },{
            data: "Name",
            title: t("NAME"),
            value: "",
            class: "col-xs-4"
        },{
            data: "Description",
            title: t("DESCRIPTION"),
            value: "",
            class: "text-wrap",
            sortable: false
        },{
            data: "Permissions",
            value: [],
            visible: false
        }];
    };

    return RoleModel;
}

})(window.chaos);