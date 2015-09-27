(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'api'];

    function HomeController ($scope, api) {
        api.query().then(function (puzzles) {
            $scope.puzzles = puzzles;
        });
    }
})();