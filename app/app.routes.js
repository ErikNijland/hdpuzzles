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
            .when('/puzzles/:id', {
                templateUrl: 'puzzle/index.html'
            })
            .when('/comments', {
                templateUrl: 'comments/index.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();