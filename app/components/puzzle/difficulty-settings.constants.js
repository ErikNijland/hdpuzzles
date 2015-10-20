(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .constant('difficultySettings', {
            "DEBUG": {
                "NUMBER_OF_COLUMNS": 2,
                "NUMBER_OF_ROWS": 2
            },
            "EASY": {
                "NUMBER_OF_COLUMNS": 6,
                "NUMBER_OF_ROWS": 4
            },
            "MEDIUM": {
                "NUMBER_OF_COLUMNS": 9,
                "NUMBER_OF_ROWS": 6
            },
            "HARD": {
                "NUMBER_OF_COLUMNS": 12,
                "NUMBER_OF_ROWS": 8
            }
        });
})();