(function(chaos) { "use strict";
/**
 * @author ntd1712
 */
chaos.service("LoginRepository", Anonymous);

function Anonymous(LoginModel, AbstractRepository) {
    function LoginRepository() {
        this.__super__.constructor.apply(this, arguments);
    }
    extend(LoginRepository, AbstractRepository);

    return LoginRepository.newInstance(arguments);
}

})(window.chaos);