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
            /*
            What is this preload trickery?
            ==============================
            iOS 9.1 doesn't allow media playback on touchend events (dropping a puzzle piece) unless it has been played
            before. This is done to prevent aggressive ads/spam.

            This might be fixed in a future update though: http://trac.webkit.org/changeset/190327
            */
            angular.forEach(soundEffects, function (filename, name) {
                audio[name] = new $window.Audio();
                audio[name].src = filename;

                audio[name].play();
                audio[name].pause();
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