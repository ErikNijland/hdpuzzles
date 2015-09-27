(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .directive('hdpuzzlesCanvas', hdpuzzlesCanvasDirective);

    function hdpuzzlesCanvasDirective () {
        return {
            scope: {
                pieces: '='
            },
            link: function (scope) {
                //If the pieces are in the correct order: just show the image, else draw the puzzle stuff
            },
            template: '<canvas></canvas>'
        };
    }
})();