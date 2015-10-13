(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .service('statistics', statisticsService);

    function statisticsService () {
        var numberOfMoves = 0,
            numberOfSeconds,
            startTime;

        return {
            "startTimer": startTimer,
            "stopTimer": stopTimer,
            "incrementMoves": incrementMoves
        };

        function startTimer () {
            numberOfMoves = 0;
            startTime = new Date().getTime();
        }

        function stopTimer () {
            numberOfSeconds = Math.round((new Date().getTime() - startTime) / 1000);
        }

        function incrementMoves () {
            return ++numberOfMoves;
        }
    }
})();