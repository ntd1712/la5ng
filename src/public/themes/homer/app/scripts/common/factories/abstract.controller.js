(function(_, angular, chaos, Lockr) { "use strict";
/**
 * @author ntd1712
 */
chaos.factory("AbstractController", Anonymous);

function Anonymous($compile) {
    // Private static attributes
    var $scope,
        map = {
            id: "Id",
            count: "count",
            data: "data",
            success: "success",
            start: "start",
            length: "length"
        };

    /**
     * @constructor
     * @param {Object} $rootScopeProvider
     * @param {AbstractRepository} repository
     */
    function AbstractController($rootScopeProvider, repository) {
        $scope = $rootScopeProvider;
        this.repository = repository;
        this.route = $scope.$state.get("^.index") ? "^.index" : "^";
    }

    // Public, non-privileged methods
    AbstractController.prototype = {
        /**
         * @param {Object.<string|Object>} [params]
         * @returns {AbstractController}
         */
        index: function(params) {
            this.repository.index(params).then(
                function(response) {
                    $scope.collection = Object(response)[map.data];
                });

            return this;
        },
        /**
         * @returns {AbstractController}
         */
        create: function() {
            if ("function" === typeof this.beforeForm) {
                this.beforeForm.call(this, undefined, true);
            }

            $scope.model = this.repository.exchangeObject({});
            $scope.mistr = angular.copy($scope.model);

            if ("function" === typeof this.afterForm) {
                this.afterForm.call(this, undefined, undefined, true);
            }

            return this;
        },
        /**
         * @param {Object} model
         * @returns {AbstractController}
         */
        store: function(model) {
            return this.save(model, undefined, true);
        },
        /**
         * @param {(number|*)} id
         * @returns {AbstractController}
         */
        show: function(id) {
            return this.edit(id);
        },
        /**
         * @param {(number|*)} id
         * @returns {AbstractController}
         * @throws {Error} If ID is invalid
         */
        edit: function(id) {
            if (!id) {
                throw new Error(t("YOUR_REQUEST_IS_INVALID"));
            }

            if ("function" === typeof this.beforeForm) {
                this.beforeForm.call(this, id, false);
            }

            var me = this;
            var handler = function(response) {
                if (!response[map.success]) {
                    throw new Error(response[map.data] || t("YOUR_REQUEST_IS_INVALID"));
                }

                $scope.model = response[map.data];
                $scope.mistr = angular.copy($scope.model);

                if ("function" === typeof me.afterForm) {
                    me.afterForm.call(me, id, response, false);
                }
            };

            if (void 0 !== $scope.collection) {
                var model = _.find($scope.collection, eval("({" + map.id + ":"
                    + ("number" === typeof id ? id : '"' + String(id).replace(/"/g, "&quot;") + '"') + "})"));
                handler({ data: model, success: void 0 !== model });
            }
            else {
                this.repository.show(id).then(
                    function(response) {
                        handler(Object(response));
                    },
                    function(response) {
                        handler({ data: response.data.error || response.statusText, success: false });
                    });
            }

            return this;
        },
        /**
         * @param {Object} model
         * @param {(number|*)} id
         * @returns {AbstractController}
         */
        update: function(model, id) {
            return this.save(model, id, false);
        },
        /**
         * @param {(number|*)} id
         * @returns {AbstractController}
         * @throws {Error} If ID is invalid
         */
        destroy: function(id) {
            if (!id) {
                throw new Error(t("YOUR_REQUEST_IS_INVALID"));
            }

            if ("function" === typeof this.beforeDestroy) {
                this.beforeDestroy.call(this, id);
            }

            var me = this;
            confirm(function() {
                me.repository.destroy(id).then(
                    function(response) {
                        if ("function" === typeof me.afterDestroy) {
                            me.afterDestroy.call(me, id, response);
                        }

                        $scope.$parent.growl = "DELETED_SUCCESSFULLY";
                        $scope.$state.reload();
                    },
                    function() {
                        $scope.$parent.growl = "DELETED_UNSUCCESSFULLY_PERHAPS_IT_IS_IN_USE_OR_CORRUPTED";
                    });
            });

            return this;
        },
        /**
         * @param {string} mode
         * @returns {AbstractController}
         */
        bootstrap: function(mode) {
            if (!mode) {
                mode = void 0 !== $scope.$state.current.data.isNew ? "form" : "grid";
            }

            switch (mode) {
                case "form":
                    false === $scope.$state.current.data.isNew ? this.edit($scope.$state.params.id) : this.create();
                    break;
                default:
                    $scope.dtColumns = this.getDTColumns($scope.dtColumns);
                    $scope.dtOptions = this.getDTOptions($scope.dtOptions);
            }
        },
        /**
         * @param {Object} model
         * @returns {AbstractController|*}
         */
        cancel: function(model) {
            if (!model) {
                model = Object($scope.model);
            }

            if (angular.equals(model, Object($scope.mistr))) {
                return $scope.$state.go(this.route);
            }

            confirm(function() {
                $scope.$state.go(this.route);
            }, this);

            return this;
        },
        /**
         * @returns {AbstractController}
         */
        reset: function() {
            $scope.model = angular.copy($scope.mistr);
            return this;
        },
        /**
         * @param {Object} model
         * @param {(number|*)} [id]
         * @param {boolean} [isNew=false]
         * @returns {AbstractController|*}
         * @throws {Error} If ID is invalid and isNew is FALSE
         */
        save: function(model, id, isNew) {
            if (!model) {
                model = Object($scope.model);
            }

            if ("boolean" !== typeof isNew) {
                isNew = Boolean($scope.$state.current.data.isNew);
            }

            if (!isNew) {
                if (!id) {
                    id = $scope.$state.params.id || model.Id || false;
                }

                if (!id) {
                    throw new Error(t("YOUR_REQUEST_IS_INVALID"));
                }
            }

            if ("function" === typeof this.beforeSave) {
                this.beforeSave.call(this, model, id, isNew);
            }

            if (angular.equals(model, Object($scope.mistr))) {
                $scope.$parent.growl = "THERE_IS_NO_CHANGES";
                return $scope.$state.reload();
            }

            var me = this;
            var handler = function(model, id, isNew) {
                if ("function" === typeof me.afterSave) {
                    me.afterSave.call(me, model, id, isNew);
                }

                $scope.$parent.error = undefined;
                $scope.$parent.growl = "DATA_SAVED_SUCCESSFULLY";
                $scope.$state.go(me.route);
            };

            if (isNew) {
                this.repository.store(model).then(
                    function() {
                        handler(model, undefined, true);
                    },
                    function(response) {
                        $scope.$parent.error = response.data.error || response.statusText;
                    });
            }
            else {
                this.repository.update(model, id).then(
                    function() {
                        handler(model, id, false);
                    },
                    function(response) {
                        $scope.$parent.error = response.data.error || response.statusText;
                    });
            }

            return this;
        },
        /**
         * @param {Object} [options]
         * @returns {Object[]}
         */
        getDTColumns: function(options) {
            var columns = this.repository.model.getFields();

            if (false !== options) {
                var state = $scope.$state.$current.parent.name || $scope.$state.current.name,
                    actions = Object(options).ops || ["edit", "destroy"];

                columns.push({
                    data: null,
                    class: "col-sm-1 text-center",
                    sortable: false,
                    render: function(model) {
                        return '<a class="btn btn-success btn-xs" title="' + t("VIEW_DETAILS") + '" ng-if="' + (-1 !== actions.indexOf("show")) + '"' +
                            ' ui-sref="' + state + '.show({ id: ' + model.Id + ' })"><i class="fa fa-file-text-o"></i></a> ' +
                            '<a class="btn btn-info btn-xs" title="' + t("EDIT") + '" ng-if="' + (-1 !== actions.indexOf("edit")) + '"' +
                            ' ui-sref="' + state + '.edit({ id: ' + model.Id + ' })"><i class="fa fa-edit"></i></a> ' +
                            '<a class="btn btn-danger btn-xs" title="' + t("DELETE") + '" ng-if="' + (-1 !== actions.indexOf("destroy")) + '"' +
                            ' ng-click="ctrl.destroy(' + model.Id + ')"><i class="fa fa-trash-o"></i></a>';
                    }
                });
            }

            return columns;
        },
        /**
         * @param {Object} [options]
         * @returns {Object}
         */
        getDTOptions: function(options) {
            var me = this;

            return angular.extend({
                aaSorting: [],
                // bStateSave: true,
                oLanguage: { sUrl: "l10n/" + Lockr.get("NG_TRANSLATE_LANG_KEY") + "/.datatables.json" },
                processing: true,
                serverSide: true,
                sAjaxDataProp: map.data,
                ajax: function(data, callback) {
                    // prepare query variables
                    var params = eval("({" + map.start + ":" + data.start + "," + map.length + ":" + data.length + "})"),
                        sort = [], i;

                    if (0 !== data.order.length) {
                        for (i in data.order) {
                            if (data.order.hasOwnProperty(i)) {
                                sort.push({
                                    property: data.columns[data.order[i].column].data,
                                    direction: data.order[i].dir.toUpperCase()
                                });
                            }
                        }

                        if (0 !== sort.length) {
                            params.sort = angular.toJson(sort);
                        }
                    }

                    if (4 <= data.search.value.length) {
                        params.filter = data.search.value;
                    }

                    // transmit to server
                    me.repository.index(params).then(
                        function(response) {
                            $scope.$parent.collection = (response = Object(response))[map.data];
                            callback(angular.extend(response, {
                                draw: data.draw,
                                recordsTotal: response[map.count],
                                recordsFiltered: response[map.count]
                            }));
                        });
                },
                fnCreatedRow: function(row) {
                    // $compile(angular.element(row))($scope); equals to $compile(row)($scope);
                    // $compile(angular.element(row).contents())($scope); // pass $scope to td(s)
                    $compile(row)($scope);                                // pass $scope to tr & td(s)
                },
                fnInitComplete: function() {
                    $scope.$parent.dtInstance = this.fnSetFilteringDelay();
                }
            }, options);
        },
        /**
         * @param {(number|*)} [id]
         * @param {Object} [response] - Exists in afterForm only
         * @param {boolean} [isNew=false]
         * @returns {AbstractController}
         */
        beforeForm: undefined,
        afterForm: undefined,
        /**
         * @param {Object} model
         * @param {(number|*)} [id]
         * @param {boolean} [isNew=false]
         * @returns {AbstractController}
         */
        beforeSave: undefined,
        afterSave: undefined,
        /**
         * @param {(number|*)} id
         * @param {Object} response - Exists in afterDestroy only
         * @returns {AbstractController}
         */
        beforeDestroy: undefined,
        afterDestroy: undefined
    };

    return AbstractController;
}

})(window._, window.angular, window.chaos, window.Lockr);