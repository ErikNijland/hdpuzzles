(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .directive('hdpuzzlesCanvas', hdpuzzlesCanvasDirective);

    hdpuzzlesCanvasDirective.$inject = ['$window', '$document', 'calculateDimensions', 'game', 'difficultySettings'];

    function hdpuzzlesCanvasDirective ($window, $document, calculateDimensionsService, gameService, difficultySettings) {
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
                var body,
                    image,
                    canvasElements,
                    canvasProperties,
                    canvasPreview,
                    canvasPuzzle,
                    contextPreview,
                    contextPuzzle,
                    selectedPiece,
                    cursorPosition;

                initialize();

                function initialize () {
                    body = $document[0].querySelector('body');
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

                    angular.element(canvasPuzzle).on('mousedown', drag);
                    angular.element(body).on('mousemove', move);
                    angular.element(body).on('mouseup', drop);

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
                        sourcePosition,
                        destinationPosition,
                        i;

                    if (!scope.difficulty) {
                        return;
                    }

                    //Start with a clear canvas
                    contextPuzzle.clearRect(0, 0, canvasProperties.width, canvasProperties.height);

                    pieces = gameService.getPieces();

                    //Render all the individual pieces, use the preview as the image source
                    for (i = 0; i < pieces.length; i++) {
                        sourcePosition = calculateDimensionsService.getPiecePosition(pieces[i], scope.difficulty);
                        destinationPosition = calculateDimensionsService.getPiecePosition(i, scope.difficulty);

                        //Make the piece grayed out on it's former position when it's being dragged around
                        contextPuzzle.globalAlpha = i === selectedPiece ? 0.25 : 1;

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

                    contextPuzzle.globalAlpha = 1;

                    /*
                     * Render black lines between non-matching puzzle pieces. Matching pieces aren't
                     * necessarily on the correct position.
                     */
                    contextPuzzle.lineWidth = 2;

                    var piecePosition;

                    for (i = 0; i < pieces.length; i++) {
                        piecePosition = calculateDimensionsService.getPiecePosition(i, scope.difficulty);

                        if (!gameService.hasMatchingPiece(i, 'right')) {
                            contextPuzzle.beginPath();

                            contextPuzzle.moveTo((piecePosition.column + 1) * canvasProperties.pieceWidth, piecePosition.row * canvasProperties.pieceHeight);
                            contextPuzzle.lineTo((piecePosition.column + 1) * canvasProperties.pieceWidth, (piecePosition.row + 1) * canvasProperties.pieceHeight);

                            contextPuzzle.stroke();
                        }

                        if (!gameService.hasMatchingPiece(i, 'bottom')) {
                            contextPuzzle.beginPath();
                            contextPuzzle.moveTo(piecePosition.column * canvasProperties.pieceWidth, (piecePosition.row + 1) * canvasProperties.pieceHeight);
                            contextPuzzle.lineTo((piecePosition.column + 1) * canvasProperties.pieceWidth, (piecePosition.row + 1) * canvasProperties.pieceHeight);

                            contextPuzzle.stroke();
                        }
                    }

                    /*
                     * Render the piece that is currently being dragged twice
                     */
                    if (angular.isNumber(selectedPiece)) {
                        var startPosition,
                            dragPositionX,
                            dragPositionY,
                            targetPositionX,
                            targetPositionY;

                        startPosition = calculateDimensionsService.getPiecePosition(selectedPiece, scope.difficulty);
                        sourcePosition = calculateDimensionsService.getPiecePosition(gameService.getPieceByIndex(selectedPiece), scope.difficulty);

                        /*
                         * Render the piece at it's target location, except when it's equal to the start location
                         */
                        if (startPosition.column !== cursorPosition.column || startPosition.row !== cursorPosition.row) {
                            targetPositionX = cursorPosition.column * canvasProperties.pieceWidth;
                            targetPositionY = cursorPosition.row * canvasProperties.pieceHeight;

                            contextPuzzle.drawImage(
                                canvasPreview,
                                sourcePosition.column * canvasProperties.pieceWidth,
                                sourcePosition.row * canvasProperties.pieceHeight,
                                canvasProperties.pieceWidth,
                                canvasProperties.pieceHeight,
                                targetPositionX,
                                targetPositionY,
                                canvasProperties.pieceWidth,
                                canvasProperties.pieceHeight
                            );

                            //Add a black border around the target location
                            contextPuzzle.strokeRect(targetPositionX, targetPositionY, canvasProperties.pieceWidth, canvasProperties.pieceHeight);
                        }

                        /*
                         * Render the dragged piece at the cursor location, the piece is centered around the cursor.
                         */
                        dragPositionX = cursorPosition.x - canvasProperties.pieceWidth / 2;
                        dragPositionY = cursorPosition.y - canvasProperties.pieceHeight / 2;

                        contextPuzzle.drawImage(
                            canvasPreview,
                            sourcePosition.column * canvasProperties.pieceWidth,
                            sourcePosition.row * canvasProperties.pieceHeight,
                            canvasProperties.pieceWidth,
                            canvasProperties.pieceHeight,
                            dragPositionX,
                            dragPositionY,
                            canvasProperties.pieceWidth,
                            canvasProperties.pieceHeight
                        );

                        //Add a black border around the dragged piece
                        contextPuzzle.strokeRect(dragPositionX, dragPositionY, canvasProperties.pieceWidth, canvasProperties.pieceHeight);
                    }
                }

                function drag (event) {
                    if (scope.state !== 'PLAYING') {
                        return;
                    }

                    scope.isDragging = true;
                    scope.$digest();

                    selectedPiece = getPieceIndex(event);

                    cursorPosition = getCursorPosition(event);
                    renderPuzzle();
                }

                function move (event) {
                    if (!angular.isNumber(selectedPiece)) {
                        return;
                    }

                    cursorPosition = getCursorPosition(event);

                    renderPuzzle();
                }

                function drop (event) {
                    if (!angular.isNumber(selectedPiece)) {
                        return;
                    }

                    scope.isDragging = false;
                    scope.$digest();

                    if (event.toElement === canvasPuzzle) {
                        PuzzleController.swapPieces(selectedPiece, getPieceIndex(event));
                    }

                    selectedPiece = null;
                    renderPuzzle();
                }

                function getCursorPosition (mouseEvent) {
                    var positionX,
                        positionY;

                    positionX = mouseEvent.pageX - mouseEvent.target.getBoundingClientRect().left;
                    positionY = mouseEvent.pageY - mouseEvent.target.getBoundingClientRect().top;

                    return {
                        "x": positionX,
                        "y": positionY,
                        "column": Math.floor(positionX / canvasProperties.pieceWidth),
                        "row": Math.floor(positionY / canvasProperties.pieceHeight)
                    };
                }

                function getPieceIndex (mouseEvent) {
                    var position;

                    position = getCursorPosition(mouseEvent);

                    return position.row * difficultySettings[scope.difficulty].NUMBER_OF_COLUMNS + position.column;
                }
            }
        };
    }
})();