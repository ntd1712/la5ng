(function(chaos) { "use strict";
/**
 * @author ntd1712
 */
chaos.service("RegisterRepository", Anonymous);

function Anonymous(RegisterModel, AbstractRepository) {
    function RegisterRepository() {
        this.__super__.constructor.apply(this, arguments);
    }
    extend(RegisterRepository, AbstractRepository);

    return RegisterRepository.newInstance(arguments);
}

})(window.chaos);