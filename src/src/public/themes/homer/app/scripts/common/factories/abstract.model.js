(function(chaos) { "use strict";
/**
 * @author ntd1712
 */
chaos.factory("AbstractModel", Anonymous);

function Anonymous() {
    // Private static attributes
    var $data,
        map = {
            data: "data",
            value: "value"
        };

    /**
     * @constructor
     * @param {Object} data
     * @param {Object[]} [fields]
     */
    function AbstractModel(data, fields) {
        $data = data || {};

        if (void 0 !== fields) {
            var len = fields.length, i;

            for (i = 0; i < len; i++) {
                this[fields[i][map.data]] = $data[fields[i][map.data]] || fields[i][map.value];
            }
        }
    }

    // Public, non-privileged methods
    AbstractModel.prototype = {
        /**
         * @returns {Object}
         */
        getData: function() {
            return $data;
        }
    };

    // Public static methods
    /**
     * @returns {string}
     */
    AbstractModel.getRoute = function() {
        return "";
    };

    /**
     * @return {Object[]}
     */
    AbstractModel.getFields = function() {
        return [];
    };

    return AbstractModel;
}

})(window.chaos);