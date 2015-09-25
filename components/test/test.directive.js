(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .directive('hdpTest', hdpTestDirective);

    function hdpTestDirective () {
        return {
            link: function () {
                console.log('jaja');
            },
            template: '<p>This a template for the hdp-test directive!</p>'
        };
    }
})();