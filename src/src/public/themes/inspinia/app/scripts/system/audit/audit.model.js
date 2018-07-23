(function(chaos) { "use strict";
/**
 * @author ntd1712
 */
chaos.service("AuditModel", Anonymous);

function Anonymous(AbstractModel) {
    function AuditModel(data) {
        this.__super__.constructor.apply(this, [data, AuditModel.getFields()]);
    }
    extend(AuditModel, AbstractModel);

    /**
     * @returns {string}
     */
    AuditModel.getRoute = function() {
        return "system/audit";
    };

    /**
     * @return {Object[]}
     */
    AuditModel.getFields = function() {
        return [{
            data: "Id",
            value: 0,
            visible: false
        },{
            data: "Name",
            title: t("NAME"),
            value: "",
            class: "col-xs-2"
        },{
            data: "Action",
            title: t("ACTION"),
            value: "",
            class: "col-xs-2"
        },{
            data: "Information",
            title: t("INFORMATION"),
            value: "",
            class: "text-wrap",
            sortable: false
        },{
            data: "Type",
            value: "",
            visible: false
        },{
            data: "IpAddress",
            value: "",
            visible: false
        },{
            data: "Request",
            value: "",
            visible: false
        },{
            data: "Params",
            value: "",
            visible: false
        },{
            data: "Referrer",
            value: "",
            visible: false
        },{
            data: "CreatedAt",
            title: t("DATE"),
            value: "",
            class: "col-xs-2",
            render: function(data) {
                return (data && data.date) || data;
            }
        }];
    };

    return AuditModel;
}

})(window.chaos);