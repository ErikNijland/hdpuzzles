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
                    var context;

                    context = element.find('canvas')[0].getContext('2d');

                    scope.canvasWidth = 1425;
                    scope.canvasHeight = 605;
                    scope.$digest();

                    if (scope.preview) {
                        //Draw the complete image
                        context.drawImage(image, 0, 0, image.width, image.height, 0, 0, scope.canvasWidth, scope.canvasHeight);
                    } else {
                        //Draw the puzzle pieces
                    }
                }

                //angular.element($window).on('resize', render);
            },
            template: '<canvas width="{{canvasWidth}}" height="{{canvasHeight}}"></canvas>'
        };
    }
})();