(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .service('game', gameService);

    gameService.$inject = ['difficultySettings', 'shuffle', 'statistics'];

    function gameService (difficultySettings, shuffleService, statistics) {
        var difficulty,
            numberOfColumns,
            numberOfRows,
            pieces = [];

        return {
            "newGame": newGame,
            "getPieces": getPieces,
            "hasMatchingPiece": hasMatchingPiece,
            "swapPieces": swapPieces
        };

        function newGame (newDifficulty) {
            var numberOfPieces,
                i;

            difficulty = newDifficulty;
            numberOfColumns = difficultySettings[difficulty].NUMBER_OF_COLUMNS;
            numberOfRows = difficultySettings[difficulty].NUMBER_OF_ROWS;

            numberOfPieces = numberOfColumns * numberOfRows;

            pieces.length = 0;

            for (i = 0; i < numberOfPieces; i++) {
                pieces.push(i);
            }

            pieces = shuffleService.shuffle(pieces);

            statistics.startTimer();
        }

        function getPieces () {
            return pieces;
        }

        function hasMatchingPiece (index, position) {
            switch (position) {
                case 'right':
                    if (index % numberOfColumns === numberOfColumns - 1) {
                        //Is this piece at the right edge of the board?
                        return false;
                    } else {
                        return pieces[index] + 1 === pieces[index + 1];
                    }

                    break;

                case 'bottom':
                    if (index > numberOfColumns * (numberOfRows - 1)) {
                        //Is this piece at the bottom?
                        return false;
                    } else {
                        return pieces[index] + numberOfColumns === pieces[index + numberOfColumns];
                    }
            }
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