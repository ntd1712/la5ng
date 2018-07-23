(function(chaos) { "use strict";
/**
 * @author ntd1712
 */
chaos.factory("UserRepository", Anonymous);

function Anonymous(UserModel, AbstractRepository) {
    function UserRepository() {
        this.__super__.constructor.apply(this, arguments);
    }
    extend(UserRepository, AbstractRepository);

    return UserRepository.newInstance(arguments);
}

})(window.chaos);