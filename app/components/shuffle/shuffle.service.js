(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .service('shuffle', shuffleService);

    function shuffleService () {
        return {
            "shuffle": shuffle
        };

        //https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
        function shuffle (input) {
            //return [input[1], input[2], input[3], input[0]];

            var currentIndex = input.length;

            while (--currentIndex) {
                var randomIndex = Math.floor(Math.random() * (currentIndex + 1)),
                    temp;

                temp = input[currentIndex];

                input[currentIndex] = input[randomIndex];
                input[randomIndex] = temp;
            }

            return input;
        }
    }
})();