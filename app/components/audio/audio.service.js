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

            angular.forEach(soundEffects, function (filename, name) {
                audio[name] = new $window.Audio();
                audio[name].src = filename;
                //audio[name].play();
            });
        }

        function playSoundEffect (name) {
            if (!settings.get('ENABLE_SOUND_EFFECTS')) {
                return;
            }
            console.log(audio, name);
            audio[name].play();
        }
    }
})();