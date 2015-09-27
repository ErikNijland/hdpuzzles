(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .controller('PuzzleController', PuzzleController);

    PuzzleController.$inject = ['$scope'];

    function PuzzleController ($scope) {
        /*
        Todo: define what goes where

        components/puzzle
        - statistics.service
        - canvas.directive

        components/analytics
        - google-analytics.service




        state: not_started / playing / solved
        statistics: # of moves / time passed / previews used

        input events (drag drop / spacebar)
        order of the pieces

        drawing the puzzle + resize browser / orientationchange

        swapping pieces
        check if puzzle is complete

        starting a new game

        google analytics tracking
        */
    }
})();