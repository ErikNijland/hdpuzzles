(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .directive('hdpuzzlesCanvas', hdpuzzlesCanvasDirective);

    hdpuzzlesCanvasDirective.$inject = ['calculateDimensions', 'game'];

    function hdpuzzlesCanvasDirective (calculateDimensionsService, game) {
        return {
            scope: {
                image: '@',
                difficulty: '@',
                preview: '='
            },
            link: function (scope, element) {
                var image,
                    canvas,
                    context,
                    canvasProperties;

                initialize();

                function initialize () {
                    canvas = element.find('canvas');
                    //context = canvas.getContext('2d');

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
                    var container = document.querySelector('.puzzle__canvas'),
                        numberOfColumns,
                        numberOfRows;

                    canvasProperties = calculateDimensionsService.calculate(container, image, scope.difficulty);
                    console.log(canvas);
                    angular.element(canvas).prop('width', canvasProperties.width);
                    angular.element(canvas).prop('height', canvasProperties.height);

                    angular.element(canvas).css('top', canvasProperties.offsetY + 'px');
                    angular.element(canvas).css('left', canvasProperties.offsetX + 'px');
                }

                function renderPreview () {
                    var canvasPreview = document.querySelector('.js-canvas-preview');
                }

                function renderGame () {

                }

                function render () {

                }
                /*
                function render () {
                    var canvasPreview,
                        canvasGame;

                    canvasGame = document.querySelector('.js-canvas-puzzle');

                    if (scope.preview) {
                        //Draw the complete image
                        context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvasWidth, canvasHeight);
                    } else {
                        //Todo: draw the puzzle pieces
                        var sourceCanvas,
                            sourceContext,
                            pieces = gameService.getPieces(),
                            i;

                        for (i = 0; i < pieces.length; i++) {

                        }


                        console.log(pieces);

                    }
                }
                */
                function getPiecePosition (index) {

                }
            },
            templateUrl: 'puzzle/puzzle-canvas.html'
        };
    }
})();