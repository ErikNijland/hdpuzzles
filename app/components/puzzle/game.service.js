(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .service('game', gameService);

    gameService.$inject = ['difficultySettings', 'shuffle', 'statistics', 'audio', 'analytics'];

    function gameService (difficultySettings, shuffleService, statistics, audio, analytics) {
        var puzzleId,
            difficulty,
            numberOfColumns,
            numberOfRows,
            pieces = [];

        return {
            "newGame": newGame,
            "getPieces": getPieces,
            "getPieceByIndex": getPieceByIndex,
            "hasMatchingPiece": hasMatchingPiece,
            "swapPieces": swapPieces,
            "isComplete": isComplete
        };

        function newGame (newPuzzleId, newDifficulty) {
            var numberOfPieces,
                i;

            puzzleId = newPuzzleId;
            difficulty = newDifficulty;
            numberOfColumns = difficultySettings[difficulty].NUMBER_OF_COLUMNS;
            numberOfRows = difficultySettings[difficulty].NUMBER_OF_ROWS;

            numberOfPieces = numberOfColumns * numberOfRows;

            pieces.length = 0;

            for (i = 0; i < numberOfPieces; i++) {
                pieces.push(i);
            }

            pieces = shuffleService.shuffle(pieces);

            audio.preload();
            statistics.startTimer();
            analytics.trackEvent('Puzzle game', 'Start', difficulty, puzzleId);
        }

        function getPieces () {
            return pieces;
        }

        function getPieceByIndex (index) {
            return pieces[index];
        }

        function hasMatchingPiece (index, position) {
            switch (position) {
                case 'right':
                    return checkRight();

                case 'bottom':
                    return checkBottom();

                default:
                    return checkTop() || checkRight() || checkBottom() || checkLeft();
            }

            function checkTop () {
                if (index < numberOfColumns) {
                    //Is this piece at the top?
                    return false;
                } else {
                    return pieces[index] - numberOfColumns === pieces[index - numberOfColumns];
                }
            }

            function checkRight () {
                if (index % numberOfColumns === numberOfColumns - 1) {
                    //Is this piece currently at the right edge of the board?
                    return false;
                } else if (pieces[index] % numberOfColumns === numberOfColumns - 1) {
                    //Does the piece belong at the right edge of the board, but isn't?
                    return false;
                } else {
                    return pieces[index] + 1 === pieces[index + 1];
                }
            }

            function checkBottom () {
                if (index > numberOfColumns * (numberOfRows - 1)) {
                    //Is this piece at the bottom?
                    return false;
                } else {
                    return pieces[index] + numberOfColumns === pieces[index + numberOfColumns];
                }
            }

            function checkLeft () {
                if (index % numberOfColumns === 0) {
                    //Is this piece at the left edge of the board?
                    return false;
                } else if (pieces[index] % numberOfColumns === 0) {
                    //Does the piece belong at the left edge of the board, but isn't?
                    return false;
                } else {
                    return pieces[index] - 1 === pieces[index - 1];
                }
            }
        }

        function swapPieces (from, to) {
            var temp;

            if (from === to) {
                return;
            }

            temp = pieces[from];

            pieces[from] = pieces[to];
            pieces[to] = temp;

            if (hasMatchingPiece(to)) {
                audio.playSoundEffect('SWAP_MATCH');
            } else {
                audio.playSoundEffect('SWAP_DEFAULT');
            }

            statistics.incrementMoves();

            if (isComplete()) {
                audio.playSoundEffect('PUZZLE_COMPLETE');

                statistics.stopTimer();
                analytics.trackEvent('Puzzle game', 'Finish', difficulty, puzzleId);
            }
        }

        function isComplete () {
            var sortedPieces;

            sortedPieces = angular.copy(pieces);
            sortedPieces.sort(function (a, b) {
                return a - b;
            });

            return angular.equals(pieces, sortedPieces);
        }
    }
})();