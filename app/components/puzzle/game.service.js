(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .service('game', gameService);

    function gameService () {
        var pieces = [];

        return {
            "new": newGame,
            "swapPieces": swapPieces
        };

        function newGame () {
            //Difficulty
            //Make an array of pieces
            //Shuffle pieces
            //Start logging statistics

            //Listen for user input (channeled through the controller)
        }

        function swapPieces (a, b) {

        }
    }
})();