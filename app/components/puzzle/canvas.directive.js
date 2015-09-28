(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .directive('hdpuzzlesCanvas', hdpuzzlesCanvasDirective);

    hdpuzzlesCanvasDirective.$inject = ['$window', '$timeout'];

    function hdpuzzlesCanvasDirective ($window, $timeout) {
        return {
            scope: {
                image: '@',
                difficulty: '@',
                preview: '='
            },
            link: function (scope, element) {
                var availableWidth,
                    availableHeight,
                    canvasWidth,
                    canvasHeight,
                    image,
                    context;

                context = element.find('canvas')[0].getContext('2d');

                calculateDimensions();

                image = new $window.Image();
                image.src = scope.image;
                image.onload = render;

                function calculateDimensions () {
                    availableWidth = 1425;
                    availableHeight = 605;
                    canvasWidth = 1425;
                    canvasHeight = 605;

                    scope.canvasWidth = canvasWidth;
                    scope.canvasHeight = canvasHeight;
                }

                function render () {
                    if (scope.preview) {
                        //Draw the complete image
                        context.drawImage(image, 0, 0, image.width, image.height, 0, 0, scope.canvasWidth, scope.canvasHeight);
                    } else {
                        //Draw the puzzle pieces
                    }
                }

                angular.element($window).on('resize', function () {
                    calculateDimensions();
                    render();
                });
            },
            template: '<canvas width="{{canvasWidth}}" height="{{canvasHeight}}"></canvas>'
        };
    }
})();