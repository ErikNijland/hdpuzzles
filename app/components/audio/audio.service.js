(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .service('audio', audioService);

    audioService.$inject = ['$window', 'soundEffects', 'settings'];

    function audioService ($window, soundEffects, settings) {
        return {
            "preload": preload,
            "playSoundEffect": playSoundEffect
        };

        function preload () {
            angular.forEach(soundEffects, function (filename) {
                var audio = new $window.Audio();
                audio.src = filename;
                audio.play();
            });
        }

        function playSoundEffect (name) {
            if (!settings.get('ENABLE_SOUND_EFFECTS')) {
                return;
            }

            var audio = new $window.Audio();
            console.log(audio.muted);
            audio.src = soundEffects[name];
            audio.play();
        }
    }
})();