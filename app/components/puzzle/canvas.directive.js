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
            link: function (scope, element) {
                var image;

                image = new $window.Image();
                image.src = scope.image;
                image.onload = render;

                function render () {
                    var context = element.find('canvas')[0].getContext('2d');
                    context.drawImage(image, 0, 0, 800, 600);
                }

                angular.element($window).on('resize', render);
            },
            template: '<canvas width="800" height="450"></canvas>'
        };
    }
})();