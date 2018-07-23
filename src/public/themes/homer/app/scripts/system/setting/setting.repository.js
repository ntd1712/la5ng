(function(chaos) { "use strict";
/**
 * @author ntd1712
 */
chaos.service("SettingRepository", Anonymous);

function Anonymous(SettingModel, AbstractRepository) {
    function SettingRepository() {
        this.__super__.constructor.apply(this, arguments);
    }
    extend(SettingRepository, AbstractRepository);

    return SettingRepository.newInstance(arguments);
}

})(window.chaos);