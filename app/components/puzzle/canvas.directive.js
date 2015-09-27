(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .directive('hdpuzzlesCanvas', hdpuzzlesCanvasDirective);

    hdpuzzlesCanvasDirective.$inject = ['$window'];

    function hdpuzzlesCanvasDirective ($window) {
        return {
            scope: {
                pieces: '='
            },
            link: function (scope) {
                //If the pieces are in the correct order: just show the image, else draw the puzzle stuff

                angular.element($window).on('resize', function () {
                    //Stuff
                });
            },
            template: '<canvas></canvas>'
        };
    }
})();