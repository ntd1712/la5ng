(function(chaos) { "use strict";
/**
 * @author ntd1712
 */
chaos.factory("AbstractRepository", Anonymous);

function Anonymous($cacheFactory, $http) {
    // Private static attributes
    var map = {
        data: "data",
        success: "success"
    };

    /**
     * @constructor
     * @param {AbstractModel} model
     */
    function AbstractRepository(model) {
        this.cache = true;
        this.model = model;
        this.route = $http.defaults.route + model.getRoute();
    }

    // Public, non-privileged methods
    AbstractRepository.prototype = {
        /**
         * @param {Object.<string|Object>} [params]
         * @returns {Object} HttpPromise
         */
        index: function(params) {
            var me = this;
            return $http
                .get(this.route, { params: params, cache: this.cache })
                .then(function(response) {
                    if (response.data[map.success]) {
                        response.data[map.data] = me.exchangeArray(response.data[map.data]);
                    }

                    return response.data;
                });
        },
        /**
         * @param {Object} model
         * @returns {Object} HttpPromise
         */
        store: function(model) {
            this.clearCache();
            return $http.post(this.route, model);
        },
        /**
         * @param {(number|*)} id
         * @returns {Object} HttpPromise
         */
        show: function(id) {
            var me = this;
            return $http
                .get(this.route + "/" + id, { cache: this.cache })
                .then(function(response) {
                    if (response.data[map.success]) {
                        response.data[map.data] = me.exchangeObject(response.data[map.data]);
                    }

                    return response.data;
                });
        },
        /**
         * @param {Object} model
         * @param {(number|*)} id
         * @returns {Object} HttpPromise
         */
        update: function(model, id) {
            this.clearCache();
            return $http.put(this.route + "/" + id, model);
        },
        /**
         * @param {(number|*)} id
         * @returns {Object} HttpPromise
         */
        destroy: function(id) {
            this.clearCache();
            return $http.delete(this.route + "/" + id);
        },
        /**
         * @returns {AbstractRepository}
         */
        clearCache: function() {
            $cacheFactory.get("$http").removeAll();
            return this;
        },
        /**
         * @param {(Object|Object[])} data
         * @returns {(AbstractModel|AbstractModel[])}
         */
        exchangeArray: function(data) {
            if (Array.isArray(data)) {
                var collection = [],
                    len = data.length, i;

                for (i = 0; i < len; i++) {
                    collection.push(this.exchangeObject(data[i]));
                }

                return collection;
            }

            return this.exchangeObject(data);
        },
        /**
         * @param {Object} data
         * @returns {AbstractModel}
         */
        exchangeObject: function(data) {
            return new this.model(data);
        }
    };

    return AbstractRepository;
}

})(window.chaos);