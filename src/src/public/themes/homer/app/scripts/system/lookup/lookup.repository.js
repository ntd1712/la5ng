(function(chaos) { "use strict";
/**
 * @author ntd1712
 */
chaos.service("LookupRepository", Anonymous);

function Anonymous(LookupModel, AbstractRepository) {
    function LookupRepository() {
        this.__super__.constructor.apply(this, arguments);
    }
    extend(LookupRepository, AbstractRepository);

    return LookupRepository.newInstance(arguments);
}

})(window.chaos);