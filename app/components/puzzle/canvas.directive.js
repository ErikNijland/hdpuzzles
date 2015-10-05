(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .directive('hdpuzzlesCanvas', hdpuzzlesCanvasDirective);

    hdpuzzlesCanvasDirective.$inject = ['$window', '$document', 'calculateDimensions', 'game'];

    function hdpuzzlesCanvasDirective ($window, $document, calculateDimensionsService, gameService) {
        return {
            require: '^puzzle',
            scope: {
                image: '@',
                difficulty: '@',
                state: '@',
                showPreview: '='
            },
            templateUrl: 'puzzle/puzzle-canvas.html',
            link: function (scope, element, attrs, PuzzleController) {
                var image,
                    canvasElements,
                    canvasProperties,
                    canvasPreview,
                    canvasPuzzle,
                    contextPreview,
                    contextPuzzle;

                initialize();

                function initialize () {
                    canvasElements = element.find('canvas');
                    canvasPreview = $document[0].querySelector('.js-canvas-preview');
                    canvasPuzzle = $document[0].querySelector('.js-canvas-puzzle');
                    contextPreview = canvasPreview.getContext('2d');
                    contextPuzzle =  canvasPuzzle.getContext('2d');

                    image = new $window.Image();
                    image.src = scope.image;
                    image.onload = function () {
                        setDimensions();
                        renderPreview();

                        angular.element($window).on('resize', setupCanvas);
                    };

                    angular.element(canvasPuzzle).on('mousedown', PuzzleController.drag);
                    angular.element(canvasPuzzle).on('mouseup', PuzzleController.drop);
                    angular.element(canvasPuzzle).on('mousemove', PuzzleController.move);

                    scope.$watch('state', function (newState) {
                        if (newState === 'PLAYING') {
                            setupCanvas();
                        }
                    });
                }

                function setupCanvas () {
                    setDimensions();
                    renderPreview();
                    renderPuzzle();
                }

                function setDimensions () {
                    var container = $document[0].querySelector('.puzzle__canvas');

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
                    var pieces,
                        i;

                    if (!scope.difficulty) {
                        return;
                    }

                    pieces = gameService.getPieces();

                    //Render all the individual pieces, use the preview as the image source
                    for (i = 0; i < pieces.length; i++) {
                        var sourcePosition,
                            destinationPosition;

                        sourcePosition = calculateDimensionsService.getPiecePosition(pieces[i], scope.difficulty);
                        destinationPosition = calculateDimensionsService.getPiecePosition(i, scope.difficulty);

                        contextPuzzle.drawImage(
                            canvasPreview,
                            sourcePosition.column * canvasProperties.pieceWidth,
                            sourcePosition.row * canvasProperties.pieceHeight,
                            canvasProperties.pieceWidth,
                            canvasProperties.pieceHeight,
                            destinationPosition.column * canvasProperties.pieceWidth,
                            destinationPosition.row * canvasProperties.pieceHeight,
                            canvasProperties.pieceWidth,
                            canvasProperties.pieceHeight
                        );
                    }

                    /*
                     * Render black lines between non-matching puzzle pieces. The pieces aren't
                     * necessarily on the correct position.
                     */
                    contextPuzzle.lineWidth = 2;

                    var piecePosition;

                    for (i = 0; i < pieces.length; i++) {
                        piecePosition = calculateDimensionsService.getPiecePosition(i, scope.difficulty);

                        if (!gameService.hasMatchingPiece(i, 'right')) {
                            contextPuzzle.beginPath();

                            contextPuzzle.moveTo((piecePosition.column + 1) * canvasProperties.pieceWidth - 1, piecePosition.row * canvasProperties.pieceHeight);
                            contextPuzzle.lineTo((piecePosition.column + 1) * canvasProperties.pieceWidth - 1, (piecePosition.row + 1) * canvasProperties.pieceHeight);

                            contextPuzzle.stroke();
                        }

                        if (!gameService.hasMatchingPiece(i, 'bottom')) {
                            contextPuzzle.beginPath();
                            contextPuzzle.moveTo(piecePosition.column * canvasProperties.pieceWidth, (piecePosition.row + 1) * canvasProperties.pieceHeight - 1);
                            contextPuzzle.lineTo((piecePosition.column + 1) * canvasProperties.pieceWidth, (piecePosition.row + 1) * canvasProperties.pieceHeight - 1);

                            contextPuzzle.stroke();
                        }
                    }
                }
            }
        };
    }
})();