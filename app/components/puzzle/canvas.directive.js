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
                showPreview: '='
            },
            link: function (scope, element) {
                var image,
                    canvasElements,
                    canvasProperties,
                    canvasPreview,
                    contextPreview,
                    contextPuzzle;

                initialize();

                function initialize () {
                    canvasElements = element.find('canvas');
                    canvasPreview = document.querySelector('.js-canvas-preview');
                    contextPreview = canvasPreview.getContext('2d');
                    contextPuzzle =  document.querySelector('.js-canvas-puzzle').getContext('2d');

                    image = new window.Image();
                    image.src = scope.image;
                    image.onload = function () {
                        setDimensions();
                        renderPreview();

                        angular.element(window).on('resize', function () {
                            setDimensions();
                            renderPreview();
                            renderPuzzle();
                        });
                    };

                    scope.$watch('difficulty', function () {
                        setDimensions();
                        renderPreview();
                        renderPuzzle();
                    });
                }

                function setDimensions () {
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
                     * necessarily on the right position.
                     */
                    var piecePosition;

                    for (i = 0; i < pieces.length; i++) {
                        if (!gameService.hasMatchingPiece(i, 'right')) {
                            //Draw line to the right of this piece
                            console.log('draw right side');
                            piecePosition = calculateDimensionsService.getPiecePosition(i, scope.difficulty);

                            contextPuzzle.lineWidth = 2;
                            contextPuzzle.beginPath();
                            contextPuzzle.moveTo((piecePosition.column + 1) * canvasProperties.pieceWidth - 1, piecePosition.row * canvasProperties.pieceHeight);
                            contextPuzzle.lineTo((piecePosition.column + 1) * canvasProperties.pieceWidth - 1, (piecePosition.row + 1) * canvasProperties.pieceHeight);

                            console.log((piecePosition.column + 1) * canvasProperties.pieceWidth - 1, piecePosition.row * canvasProperties.pieceHeight);
                            console.log((piecePosition.column + 1) * canvasProperties.pieceWidth - 1, (piecePosition.row + 1) * canvasProperties.pieceHeight);
                            console.log('---');

                            contextPuzzle.stroke();
                        }

                        if (gameService.hasMatchingPiece(i, 'bottom')) {
                            //Draw line to the bottom of this piece
                        }
                    }
                }
            },
            templateUrl: 'puzzle/puzzle-canvas.html'
        };
    }
})();