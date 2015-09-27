(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .constant('soundEffects', {
            "SWAP_DEFAULT": "audio/swap_default.mp3",
            "SWAP_MATCH": "audio/swap_match.mp3",
            "PUZZLE_COMPLETE": "audio/congratulations.mp3"
        });
})();