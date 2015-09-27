(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .config(routesConfig);

    routesConfig.$inject = ['$routeProvider'];

    function routesConfig ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.html'
            })
            .when('/puzzles/1', {
                controller: 'PuzzleController',
                templateUrl: 'puzzle/index.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();