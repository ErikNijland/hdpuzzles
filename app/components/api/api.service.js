(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .service('api', apiService);

    apiService.$inject = ['$http', 'shuffle'];

    function apiService ($http, shuffleService) {
        return {
            "query": query,
            "get": get,
            "random": random
        };

        function query () {
            return getPuzzles().then(function (response) {
                return shuffleService.shuffle(response.data);
            });
        }

        function get (id) {
            return getPuzzles().then(function (response) {
                return response.data.filter(function (puzzle) {
                    return puzzle.id === id;
                })[0];
            });
        }

        function random () {
            return query().then(function (puzzles) {
                return puzzles[0];
            });
        }

        function getPuzzles () {
            return $http.get('puzzles.json');
        }
    }
})();