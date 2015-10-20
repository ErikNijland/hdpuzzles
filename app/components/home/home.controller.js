(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$location', 'api'];

    function HomeController ($scope, $location, api) {
        api.query().then(function (puzzles) {
            $scope.puzzles = puzzles;
        });

        $scope.randomPuzzle = function () {
            api.random().then(function (puzzle) {
                $location.path('/puzzles/' + puzzle.id);
            });
        };
    }
})();