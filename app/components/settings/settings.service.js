(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .service('settings', settingsService);

    settingsService.$inject = ['$window'];

    function settingsService ($window) {
        var defaultSettings = {
                "ENABLE_SOUND_EFFECTS": true
            },
            settings;

        initialize();

        return {
            "get": get,
            "set": set
        };

        function initialize () {
            var savedSettings = JSON.parse($window.localStorage.getItem('settings'));

            if (angular.isObject(savedSettings)) {
                settings = angular.extend(defaultSettings, savedSettings);
            } else {
                settings = defaultSettings;
            }
        }

        function get (name) {
            return settings[name];
        }

        function set (name, value) {
            settings[name] = value;

            $window.localStorage.setItem('settings', JSON.stringify(settings));
        }
    }
})();