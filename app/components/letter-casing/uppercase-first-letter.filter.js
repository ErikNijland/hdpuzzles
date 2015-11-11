(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .filter('uppercaseFirstLetter', uppercaseFirstLetterFilter);

    function uppercaseFirstLetterFilter () {
        return function (input) {
            return input.substring(0, 1).toUpperCase() + input.substring(1).toLocaleLowerCase();
        };
    }
})();