(function(chaos) { "use strict";
/**
 * @author ntd1712
 */
chaos.service("LookupModel", Anonymous);

function Anonymous(AbstractModel) {
    function LookupModel(data) {
        this.__super__.constructor.apply(this, [data, LookupModel.getFields()]);
    }
    extend(LookupModel, AbstractModel);

    /**
     * @returns {string}
     */
    LookupModel.getRoute = function() {
        return "system/lookup";
    };

    /**
     * @return {Object[]}
     */
    LookupModel.getFields = function() {
        return [{
            data: "Id",
            value: 0,
            visible: false
        },{
            data: "Name",
            title: t("NAME"),
            value: "",
            sortable: false
        },{
            data: "Code",
            title: t("CODE"),
            value: 0,
            class: "col-xs-1 text-center",
            sortable: false
        },{
            data: "Type",
            title: t("TYPE"),
            value: ""
        },{
            data: "Position",
            title: t("POSITION"),
            value: 0,
            class: "col-xs-1 text-center",
            sortable: false
        }];
    };

    return LookupModel;
}

})(window.chaos);