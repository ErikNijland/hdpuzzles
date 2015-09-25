(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .directive('hdpTest', hdpTestDirective);

    function hdpTestDirective () {
        return {
            //template: '<p>This a template for the hdp-test directive!</p>'
            templateUrl: 'test/test.html'
        };
    }
})();