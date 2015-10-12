(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .service('audio', audioService);

    audioService.$inject = ['$window', 'soundEffects', 'settings'];

    function audioService ($window, soundEffects, settings) {
        return {
            "playSoundEffect": playSoundEffect
        };

        function playSoundEffect (name) {
            if (!settings.get('ENABLE_SOUND_EFFECTS')) {
                return;
            }

            var audio = new $window.Audio();
            audio.src = soundEffects[name];
            audio.play();
        }
    }
})();