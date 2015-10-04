(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .service('calculateDimensions', calculateDimensionsService);

    function calculateDimensionsService () {
        return {
            "calculate": calculate
        };

        function calculate (containerElement, image) {
            var availableWidth,
                availableHeight,
                minimumPadding = 2,
                imageResizeRatio,
                numberOfColumns,
                numberOfRows,
                output = {};

            availableWidth = containerElement.clientWidth;
            availableHeight = containerElement.clientHeight;

            imageResizeRatio = Math.max(
                1,
                image.width / (availableWidth - minimumPadding * 2),
                image.height / (availableHeight - minimumPadding * 2)
            );

            output.width = Math.floor(image.width / imageResizeRatio);
            output.height = Math.floor(image.height / imageResizeRatio);

            if (scope.difficulty) {
                //Making sure that each puzzle piece has the same dimensions
                numberOfColumns = difficultySettings[scope.difficulty].NUMBER_OF_COLUMNS;
                numberOfRows = difficultySettings[scope.difficulty].NUMBER_OF_ROWS;

                output.pieceWidth = Math.floor(output.width / numberOfColumns);
                output.pieceHeight = Math.floor(output.height / numberOfRows);

                output.width = pieceWidth * numberOfColumns;
                output.height = pieceHeight * numberOfRows;
            }

            output.offsetX = Math.round((availableWidth - output.width) / 2);
            output.offsetY = Math.round((availableHeight - output.height) / 2);

            return output;
        }
    }
})();