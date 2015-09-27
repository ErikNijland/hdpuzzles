(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .service('audio', audioService);

    audioService.$inject = ['soundEffects'];

    function audioService (soundEffects) {
        return {
            "playSoundEffect": playSoundEffect
        };

        function playSoundEffect (name) {
            console.log(soundEffects[name]);
        }
    }
})();