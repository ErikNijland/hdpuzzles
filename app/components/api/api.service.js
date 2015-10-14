(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .service('api', apiService);

    apiService.$inject = ['$q', '$http'];

    function apiService ($q, $http) {
        return {
            "query": query,
            "get": get
        };

        function query () {
            return getPuzzles();
        }

        function get (id) {
            return getPuzzles().then(function (response) {
                return response.data.filter(function (puzzle) {
                    return puzzle.id === id;
                })[0];
            });
        }

        function getPuzzles () {
            return $http.get('puzzles.json');
        }
    }
})();