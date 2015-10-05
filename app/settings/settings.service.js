(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .service('settings', settingsService);

    function settingsService () {
        var settings = {
            "ENABLE_SOUND_EFFECTS": true
        };

        return {
            "get": get,
            "set": set
        };

        function get (name) {
            return settings[name];
        }

        function set (name, value) {
            settings[name] = value;
        }
    }
})();