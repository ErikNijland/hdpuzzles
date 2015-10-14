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
            var q = $q.defer();

            getPuzzles().then(function (response) {
                var puzzle = response.data.filter(function (puzzle) {
                    return puzzle.id === id;
                });

                q.resolve(puzzle[0]);
            });

            return q.promise;
        }

        function getPuzzles () {
            return $http.get('puzzles.json');
        }
    }
})();