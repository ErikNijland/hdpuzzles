(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .service('audio', audioService);

    audioService.$inject = ['$window', 'soundEffects', 'settings'];

    function audioService ($window, soundEffects, settings) {
        var audio;

        return {
            "preload": preload,
            "playSoundEffect": playSoundEffect
        };

        function preload () {
            audio = new $window.Audio();
            audio.src = 'audio/swap_default.mp3';
            audio.play();
        }

        function playSoundEffect () {
            if (!settings.get('ENABLE_SOUND_EFFECTS')) {
                return;
            }

            //var audio = new $window.Audio();
            //alert(audio.muted);
            //audio.src = soundEffects[name];
            audio.play();
        }
    }
})();