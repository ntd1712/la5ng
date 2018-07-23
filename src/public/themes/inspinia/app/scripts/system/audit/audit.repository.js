(function(chaos) { "use strict";
/**
 * @author ntd1712
 */
chaos.service("AuditRepository", Anonymous);

function Anonymous(AuditModel, AbstractRepository) {
    function AuditRepository() {
        this.__super__.constructor.apply(this, arguments);
    }
    extend(AuditRepository, AbstractRepository);

    return AuditRepository.newInstance(arguments);
}

})(window.chaos);