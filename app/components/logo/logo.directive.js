(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .directive('logo', logoDirective);

    function logoDirective () {
        return {
            restrict: 'EA',
            scope: {
                useLink: '='
            },
            templateUrl: 'logo/logo.html',
            link: function (scope) {
                console.log(scope.useLink);
            }
        };
    }
})();