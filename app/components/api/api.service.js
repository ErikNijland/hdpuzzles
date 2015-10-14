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
            getPuzzles();

            var d = $q.defer();

            d.resolve();

            return d.promise;
        }

        function get (id) {
            var d = $q.defer();

            d.resolve();

            return d.promise;
        }

        function getPuzzles () {
            $http.get('puzzles.json').then(function (data) {
                console.log(data);
            });
        }
    }
})();