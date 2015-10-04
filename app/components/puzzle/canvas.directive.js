(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .directive('hdpuzzlesCanvas', hdpuzzlesCanvasDirective);

    hdpuzzlesCanvasDirective.$inject = ['calculateDimensions', 'game'];

    function hdpuzzlesCanvasDirective (calculateDimensionsService, gameService) {
        return {
            scope: {
                image: '@',
                difficulty: '@',
                preview: '='
            },
            link: function (scope, element) {
                var image,
                    canvasElements,
                    canvasProperties,
                    contextPreview,
                    contextPuzzle;

                initialize();

                function initialize () {
                    canvasElements = element.find('canvas');
                    contextPreview = document.querySelector('.js-canvas-preview').getContext('2d');
                    contextPuzzle =  document.querySelector('.js-canvas-puzzle').getContext('2d');

                    image = new window.Image();
                    image.src = scope.image;
                    image.onload = function () {
                        calculateDimensions();
                        renderPreview();

                        angular.element(window).on('resize', function () {
                            calculateDimensions();
                            renderPreview();
                            renderPuzzle();
                        });
                    };

                    scope.$watch('difficulty', renderPuzzle);
                }

                function calculateDimensions () {
                    var container = document.querySelector('.puzzle__canvas');

                    canvasProperties = calculateDimensionsService.getCanvasProperties(container, image, scope.difficulty);

                    angular.element(canvasElements).prop('width', canvasProperties.width);
                    angular.element(canvasElements).prop('height', canvasProperties.height);

                    angular.element(canvasElements).css('top', canvasProperties.offsetY + 'px');
                    angular.element(canvasElements).css('left', canvasProperties.offsetX + 'px');
                }

                function renderPreview () {
                    contextPreview.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvasProperties.width, canvasProperties.height);
                }

                function renderPuzzle () {
                    if (!scope.difficulty) {
                        return;
                    }

                    console.log('renderPuzzle', canvasProperties);

                    //Render all the individual pieces, use the preview as a source
                    var pieces = gameService.getPieces(),
                        i;

                    for (i = 0; i < pieces.length; i++) {
                        var sourcePosition,
                            destinationPosition;

                        //contextPuzzle.drawImage(contextPreview)
                    }
                }
            },
            templateUrl: 'puzzle/puzzle-canvas.html'
        };
    }
})();