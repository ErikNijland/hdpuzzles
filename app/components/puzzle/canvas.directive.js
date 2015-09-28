(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .directive('hdpuzzlesCanvas', hdpuzzlesCanvasDirective);

    hdpuzzlesCanvasDirective.$inject = ['$window'];

    function hdpuzzlesCanvasDirective ($window) {
        return {
            scope: {
                image: '@',
                difficulty: '@',
                preview: '='
            },
            link: function () {


                angular.element($window).on('resize', function () {
                    //Stuff
                });
            },
            template: '<canvas></canvas>'
        };
    }
})();