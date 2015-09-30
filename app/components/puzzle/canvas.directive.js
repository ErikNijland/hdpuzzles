(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .directive('hdpuzzlesCanvas', hdpuzzlesCanvasDirective);

    hdpuzzlesCanvasDirective.$inject = ['difficultySettings'];

    function hdpuzzlesCanvasDirective (difficultySettings) {
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
                    canvasOffsetX,
                    canvasOffsetY,
                    image,
                    canvas,
                    context;

                initialize();

                function initialize () {
                    canvas = element.find('canvas')[0];
                    context = canvas.getContext('2d');

                    image = new window.Image();
                    image.src = scope.image;
                    image.onload = function () {
                        calculateDimensions();
                        render();

                        angular.element(window).on('resize', function () {
                            calculateDimensions();
                            render();
                        });
                    };
                }

                function calculateDimensions () {
                    var containerDiv,
                        minimumPadding = 2,
                        imageResizeRatio;

                    containerDiv = document.querySelector('.puzzle__canvas');

                    availableWidth = containerDiv.clientWidth;
                    availableHeight = containerDiv.clientHeight;

                    imageResizeRatio = Math.max(
                        1,
                        image.width / (availableWidth - minimumPadding * 2),
                        image.height / (availableHeight - minimumPadding * 2)
                    );

                    if (scope.preview) {
                        canvasWidth = Math.floor(image.width / imageResizeRatio);
                        canvasHeight = Math.floor(image.height / imageResizeRatio);
                    } else {
                        //Todo: calculation based on number of columns and rows
                    }

                    canvasOffsetX = Math.round((availableWidth - canvasWidth) / 2);
                    canvasOffsetY = Math.round((availableHeight - canvasHeight) / 2);

                    angular.element(canvas).prop('width', canvasWidth);
                    angular.element(canvas).prop('height', canvasHeight);

                    angular.element(canvas).css('top', canvasOffsetY + 'px');
                    angular.element(canvas).css('left', canvasOffsetX + 'px');
                }

                function render () {
                    if (scope.preview) {
                        //Draw the complete image
                        context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvasWidth, canvasHeight);
                    } else {
                        //Draw the puzzle pieces
                    }
                }
            },
            templateUrl: 'puzzle/puzzle-canvas.html'
        };
    }
})();