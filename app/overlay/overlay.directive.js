(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .directive('overlay', overlayDirective);

    function overlayDirective () {
        return {
            restrict: 'A',
            transclude: true,
            templateUrl: 'overlay.html'
        };
    }
})();