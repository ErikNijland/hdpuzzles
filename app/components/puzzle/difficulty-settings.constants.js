(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .constant('difficultySettings', {
            "SMALL": {
                "NUMBER_OF_COLUMNS": 2,
                "NUMBER_OF_ROWS": 1
            },
            "MEDIUM": {
                "NUMBER_OF_COLUMNS": 8,
                "NUMBER_OF_ROWS": 6
            },
            "LARGE": {
                "NUMBER_OF_COLUMNS": 12,
                "NUMBER_OF_ROWS": 8
            },
            "HUGE": {
                "NUMBER_OF_COLUMNS": 16,
                "NUMBER_OF_ROWS": 10
            }
        });
})();