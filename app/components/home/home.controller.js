(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope'];

    function HomeController ($scope) {
        $scope.who = 'world';
    }
})();