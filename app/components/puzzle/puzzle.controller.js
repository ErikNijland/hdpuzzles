(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .controller('PuzzleController', PuzzleController);

    PuzzleController.$inject = ['$scope'];

    function PuzzleController ($scope) {
        /*
        - input events (drag drop / spacebar)
        - state: not_started / playing / solved
        - check if puzzle is complete >> by calling game.service
        */
    }
})();