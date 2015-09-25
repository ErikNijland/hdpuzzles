(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .service('api', apiService);

    apiService.$inject = ['$resource'];

    function apiService ($resource) {
        return {
            "getPuzzles": null
        }
    }
})();

