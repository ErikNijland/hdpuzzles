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

    PuzzleController.$inject = ['$routeParams', '$scope', '$timeout', '$window', '$document', 'api', 'game', 'difficultySettings', 's3', 'statistics'];

    function PuzzleController ($routeParams, $scope, $timeout, $window, $document, api, game, difficultySettings, s3, statistics) {
        var puzzleId = $routeParams.id;

        $scope.state = 'LOADING';

        api.get(puzzleId).then(initialize);

        function initialize (puzzle) {
            $scope.state = 'NEW';
            $scope.difficulties = difficultySettings;

            $scope.image = s3.IMAGE_LOCATION + puzzle.filename;
            $scope.thumbnail = s3.THUMBNAIL_LOCATION + puzzle.filename;
            $scope.showPreview = true;

            $scope.newGame = newGame;

            angular.element($document).on('keydown', togglePreview);
            angular.element($document).on('keyup', togglePreview);

            $scope.$on('$destroy', function () {
                angular.element($document).off('keydown', togglePreview);
                angular.element($document).off('keyup', togglePreview);
            });
        }

        function newGame (difficulty) {
            $scope.difficulty = difficulty;
            $scope.state = 'PLAYING';
            $scope.showPreview = false;

            $scope.togglePreview = function () {
                $scope.showPreview = !$scope.showPreview;
            };

            game.newGame(puzzleId, difficulty);

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

        function togglePreview (event) {
            if (event.keyCode !== 32) {
                //32 = spacebar
                return;
            }

            $scope.showPreview = $scope.state === 'PLAYING' && event.type === 'keydown';
            $scope.$digest();
        }

        function hidePreview () {
            $scope.showPreview = false;
            $scope.$digest();
        }

        return {
            "swapPieces": swapPieces,
            "hidePreview": hidePreview
        };
    }
})();