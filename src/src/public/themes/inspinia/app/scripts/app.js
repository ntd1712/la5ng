(function(angular, Lockr) { "use strict";
/**
 * @author ntd1712
 * @namespace
 */
window.chaos = angular.module("inspinia", [
    "ngSanitize",
    "ui.bootstrap",
    "ui.router",
    "datatables",
    "angular-jwt",
    "pascalprecht.translate",
    "oc.lazyLoad"
])
/**
 * To support pascalprecht.translate::useStorage
 */
.factory("Lockr", function() {
    return angular.extend(Lockr, {
        put: function() {
            return Lockr.set.apply(this, arguments);
        }
    });
});

/**
 * @param {string|Object} message
 */
chaos.growl = function(message) {
    if (void 0 !== window.Noty) {
        new Noty(angular.extend({
            layout: "topRight",
            theme: "mint",
            type: "information",
            text: "...",
            animation: {
                open: "noty_effects_open",
                close: "noty_effects_close"
            },
            timeout: 5000,
            closeWith: ["click", "timeout"]
        }, "string" === typeof message ? { text: message } : Object(message))).show();
    }
    else {
        alert.apply(null, arguments);
    }
};

if (void 0 !== window.swal) {
    /**
     * @param {string|Object} message
     * @param {string=} text
     * @param {("error"|"warning"|"info"|"success"|"input"|"prompt")} type The allowed type of the message
     * @link https://lipis.github.io/bootstrap-sweetalert The documentation of swal
     */
    window.alert = function(message, text, type) {
        swal("object" === typeof message ? message : String(message), text, type);
    };

    /**
     * @param {string|Function|*} message
     * @param {Function=} handler
     * @param {Object=} context
     */
    window.confirm = function(message, handler, context) {
        switch (typeof message) {
            case "function":
                if (3 > arguments.length) {
                    context = handler;
                }

                handler = message;
                message = {};
                break;
            case "string":
                message = { title: message };
                break;
            default:
                message = Object(message);
        }

        return !!swal(angular.extend({
            title: "Are you sure?",
            text: "You won't be able to undo the changes.",
            type: "warning",
            showCancelButton: true,
            showLoaderOnConfirm: true,
            confirmButtonText: "Yes, do it!"
        }, message),
        function(isConfirm) {
            if (isConfirm && "function" === typeof handler) {
                handler.call(context);
            }
        });
    };
}

})(window.angular, window.Lockr);

// <editor-fold desc="Prototypal inheritance" defaultstate="collapsed">

if (void 0 === Object.create) {
    /**
     * @param {Object=} proto
     * @returns {Object}
     */
    Object.create = function(proto) {
        function F() {}
        F.prototype = proto;
        return new F();
    };
}

if (void 0 === Function.prototype.newInstance) {
    /**
     * @param   {Array=} args
     * @returns {Object}
     */
    Function.prototype.newInstance = function(args) {
        var instance = Object.create(this.prototype);
        this.apply(instance, args);
        return instance;
    }
}

if (void 0 === window.extend) {
    /**
     * @param {Object} child
     * @param {Object} parent
     * @returns {Object}
     */
    function extend(child, parent) {
        function F() {
            this.constructor = child;
            this.__super__ = parent.prototype;
        }

        parent.prototype.constructor = parent; // @link http://goo.gl/PxO37U
        F.prototype = parent.prototype;
        // F.__super__ = parent.prototype;

        var old_proto = child.prototype;
        child.prototype = new F();

        for (var key in old_proto) {
            if (old_proto.hasOwnProperty(key)) {
                child.prototype[key] = old_proto[key];
            }
        }

        for (key in parent) {
            if (!child.hasOwnProperty(key) && parent.hasOwnProperty(key)) {
                child[key] = parent[key];
            }
        }
    }
}

// </editor-fold>