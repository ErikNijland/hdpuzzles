(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .service('game', gameService);

    gameService.$inject = ['difficultySettings', 'shuffle', 'statistics'];

    function gameService (difficultySettings, shuffleService, statistics) {
        var difficulty,
            pieces = [];

        return {
            "newGame": newGame,
            "getPieces": getPieces,
            "swapPieces": swapPieces
        };

        function newGame (difficulty) {
            var pieces = [],
                numberOfPieces,
                i;

            numberOfPieces = difficultySettings[difficulty].NUMBER_OF_COLUMNS * difficultySettings[difficulty].NUMBER_OF_ROWS;

            for (i = 0; i < numberOfPieces; i++) {
                pieces.push(i);
            }

            pieces = shuffleService.shuffle(pieces);

            statistics.startTimer();
        }

        function getPieces () {
            return pieces;
        }

        function swapPieces (a, b) {
            /*
            Todo:
            - swap the piece
            - statistics.increment
            */
        }
    }
})();