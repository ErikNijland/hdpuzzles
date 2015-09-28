/*
(incomplete) todo:
 - input events (drag drop / spacebar)
 - state: not_started / playing / solved
 - check if puzzle is complete >> by calling game.service
 */

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

    PuzzleController.$inject = ['$routeParams', '$scope', 'api', 'game'];

    function PuzzleController ($routeParams, $scope, api, game) {
        var puzzleId = $routeParams.id;

        $scope.state = 'LOADING';

        api.get(puzzleId).then(initialize);

        function initialize (puzzle) {
            $scope.state = 'NEW';

            $scope.image = puzzle.filename;
            $scope.showPreview = true;

            $scope.newGame = newGame;
        }

        function newGame (difficulty) {
            $scope.state = 'PLAYING';
            $scope.showPreview = false;

            game.newGame(difficulty);
            //Check for events
        }
    }
})();