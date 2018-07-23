(function(chaos) { "use strict";
/**
 * @author ntd1712
 */
chaos.factory("RoleRepository", Anonymous);

function Anonymous(RoleModel, AbstractRepository) {
    function RoleRepository() {
        this.__super__.constructor.apply(this, arguments);
    }
    extend(RoleRepository, AbstractRepository);

    return RoleRepository.newInstance(arguments);
}

})(window.chaos);