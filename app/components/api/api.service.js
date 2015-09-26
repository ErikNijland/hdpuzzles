(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .service('api', apiService);

    apiService.$inject = ['$q'];

    function apiService ($q) {
        return {
            "query": query
        };

        function query () {
            var d = $q.defer();

            d.resolve([{
                "id": 1,
                "filename": "1.jpg"
            }, {
                "id": 2,
                "filename": "2.jpg"
            }, {
                "id": 3,
                "filename": "3.jpg"
            }, {
                "id": 4,
                "filename": "4.jpg"
            }, {
                "id": 5,
                "filename": "5.jpg"
            }, {
                "id": 6,
                "filename": "6.jpg"
            }, {
                "id": 7,
                "filename": "7.jpg"
            }, {
                "id": 8,
                "filename": "8.jpg"
            }, {
                "id": 9,
                "filename": "9.jpg"
            }, {
                "id": 10,
                "filename": "10.jpg"
            }, {
                "id": 1,
                "filename": "1.jpg"
            }, {
                "id": 2,
                "filename": "2.jpg"
            }, {
                "id": 3,
                "filename": "3.jpg"
            }, {
                "id": 4,
                "filename": "4.jpg"
            }, {
                "id": 5,
                "filename": "5.jpg"
            }, {
                "id": 6,
                "filename": "6.jpg"
            }, {
                "id": 7,
                "filename": "7.jpg"
            }, {
                "id": 8,
                "filename": "8.jpg"
            }, {
                "id": 9,
                "filename": "9.jpg"
            }, {
                "id": 10,
                "filename": "10.jpg"
            }]);

            return d.promise;
        }
    }
})();