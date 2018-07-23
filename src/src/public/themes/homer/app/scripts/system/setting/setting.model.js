(function(chaos) { "use strict";
/**
 * @author ntd1712
 */
chaos.service("SettingModel", Anonymous);

function Anonymous(AbstractModel) {
    function SettingModel(data) {
        this.__super__.constructor.apply(this, [data, SettingModel.getFields()]);
    }
    extend(SettingModel, AbstractModel);

    /**
     * @returns {string}
     */
    SettingModel.getRoute = function() {
        return "system/setting";
    };

    /**
     * @return {Object[]}
     */
    SettingModel.getFields = function() {
        return [{
            data: "Id",
            value: 0,
            visible: false
        },{
            data: "Name",
            title: t("NAME"),
            value: "",
            class: "col-xs-3"
        },{
            data: "Value",
            title: t("VALUE"),
            value: "",
            class: "text-wrap",
            sortable: false
        },{
            data: "Description",
            value: "",
            visible: false
        }];
    };

    return SettingModel;
}

})(window.chaos);