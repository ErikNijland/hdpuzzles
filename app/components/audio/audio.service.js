(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .service('audio', audioService);

    audioService.$inject = ['$window', 'soundEffects', 'settings'];

    function audioService ($window, soundEffects, settings) {
        var audio = {};

        return {
            "preload": preload,
            "playSoundEffect": playSoundEffect
        };

        function preload () {

            angular.forEach(soundEffects, function (name) {
                audio[name] = new $window.Audio();
                audio.src = 'audio/swap_default.mp3';
                audio.play();
            });
        }

        function playSoundEffect (name) {
            if (!settings.get('ENABLE_SOUND_EFFECTS')) {
                return;
            }

            audio[name].play();
        }
    }
})();