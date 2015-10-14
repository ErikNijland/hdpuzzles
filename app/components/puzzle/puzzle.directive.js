(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .directive('puzzle', puzzleDirective);

    function puzzleDirective () {
        return {
            controller: PuzzleController,
            templateUrl: 'puzzle/puzzle.html'
        };
    }

    PuzzleController.$inject = ['$routeParams', '$scope', '$timeout', 'api', 'game', 'statistics'];

    function PuzzleController ($routeParams, $scope, $timeout, api, game, statistics) {
        var puzzleId = $routeParams.id;

        $scope.state = 'LOADING';

        api.get(puzzleId).then(initialize);

        function initialize (puzzle) {
            $scope.state = 'NEW';

            $scope.image = puzzle.filename;
            console.log($scope.image);
            $scope.showPreview = true;

            $scope.newGame = newGame;
        }

        function newGame (difficulty) {
            $scope.state = 'PLAYING';

            $scope.difficulty = difficulty;
            $scope.showPreview = false;

            game.newGame(difficulty);

            $timeout(function () {
                $scope.$digest();
            });
        }

        function swapPieces (from, to) {
            game.swapPieces(from, to);

            if (game.isComplete()) {
                $scope.state = 'PUZZLE_COMPLETE';
                $scope.statistics = statistics.getStatistics();
                $scope.$digest();
            }
        }

        return {
            "swapPieces": swapPieces
        };
    }
})();