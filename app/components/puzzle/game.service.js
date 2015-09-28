(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .service('game', gameService);

    gameService.$inject = ['difficultySettings', 'shuffle'];

    function gameService (difficultySettings, shuffle) {
        var difficulty,
            pieces = [];

        return {
            "newGame": newGame,
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

            console.log(pieces);
            console.log(shuffle.shuffle(pieces));
            //Shuffle pieces
            //Start logging statistics

            //Listen for user input (channeled through the controller)
        }

        function swapPieces (a, b) {

        }
    }
})();