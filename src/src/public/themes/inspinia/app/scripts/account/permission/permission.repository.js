(function(chaos) { "use strict";
/**
 * @author ntd1712
 */
chaos.service("PermissionRepository", Anonymous);

function Anonymous(PermissionModel, AbstractRepository) {
    function PermissionRepository() {
        this.__super__.constructor.apply(this, arguments);
    }
    extend(PermissionRepository, AbstractRepository);

    return PermissionRepository.newInstance(arguments);
}

})(window.chaos);