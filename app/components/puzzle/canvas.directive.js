(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .directive('hdpuzzlesCanvas', hdpuzzlesCanvasDirective);

    hdpuzzlesCanvasDirective.$inject = ['$window', '$document', '$timeout'];

    function hdpuzzlesCanvasDirective ($window, $document, $timeout) {
        return {
            scope: {
                image: '@',
                difficulty: '@',
                preview: '='
            },
            //replace: true,
            link: function (scope, element) {
                var availableWidth,
                    availableHeight,
                    canvasWidth,
                    canvasHeight,
                    image,
                    canvas,
                    context;

                canvas = element.find('canvas')[0];
                context = canvas.getContext('2d');

                calculateDimensions();

                image = new $window.Image();
                image.src = scope.image;
                image.onload = render;

                function calculateDimensions () {
                    console.log(canvas.clientWidth);
                    console.log(canvas.clientHeight);
                    //console.log(angular.element($document.querySelectorAll('.puzzle__canvas')[0]).clientHeight);

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
            template: '<canvas></canvas>'
        };
    }
})();