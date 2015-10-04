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
                        renderPuzzle();

                        angular.element(window).on('resize', function () {
                            calculateDimensions();
                            renderPreview();
                            renderPuzzle();
                        });
                    };
                }

                function calculateDimensions () {
                    var container = document.querySelector('.puzzle__canvas');

                    canvasProperties = calculateDimensionsService.calculate(container, image, scope.difficulty);

                    angular.element(canvasElements).prop('width', canvasProperties.width);
                    angular.element(canvasElements).prop('height', canvasProperties.height);

                    angular.element(canvasElements).css('top', canvasProperties.offsetY + 'px');
                    angular.element(canvasElements).css('left', canvasProperties.offsetX + 'px');
                }

                function renderPreview () {
                    contextPreview.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvasProperties.width, canvasProperties.height);
                }

                function renderPuzzle () {
                    //Render all the pieces, use the preview as a source

                }

                function getPiecePosition (index) {

                }
            },
            templateUrl: 'puzzle/puzzle-canvas.html'
        };
    }
})();