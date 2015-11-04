(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$location', 'api', 's3'];

    function HomeController ($scope, $location, api, s3) {
        api.query().then(function (puzzles) {
            $scope.puzzles = puzzles.map(function (puzzle) {
                puzzle.filename = s3.THUMBNAIL_LOCATION + puzzle.filename;

                return puzzle;
            });
        });

        $scope.randomPuzzle = function () {
            api.random().then(function (puzzle) {
                $location.path('/puzzles/' + puzzle.id);
            });
        };
    }
})();