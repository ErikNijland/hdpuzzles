(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .service('audio', audioService);

    audioService.$inject = ['$window', 'soundEffects'];

    function audioService ($window, soundEffects) {
        return {
            "playSoundEffect": playSoundEffect
        };

        function playSoundEffect (name) {
            var audio = new $window.Audio();
            audio.src = soundEffects[name];
            audio.play();
        }
    }
})();