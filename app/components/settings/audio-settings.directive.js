(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .directive('audioSettings', audioSettingsDirective);

    audioSettingsDirective.$inject = ['settings'];

    function audioSettingsDirective (settings) {
        return {
            restrict: 'EA',
            templateUrl: 'settings/audio-settings.html',
            link: function (scope) {
                scope.muteSoundEffects = !settings.get('ENABLE_SOUND_EFFECTS');

                scope.changeSetting = function () {
                    settings.set('ENABLE_SOUND_EFFECTS', !scope.muteSoundEffects);
                };
            }
        };
    }
})();