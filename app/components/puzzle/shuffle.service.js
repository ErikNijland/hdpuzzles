(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .service('shuffle', shuffleService);

    function shuffleService () {
        return {
            "shuffle": shuffle
        };

        function shuffle (input) {
            var currentIndex = input.length;

            while (--currentIndex) {
                var randomIndex = Math.floor(Math.random() * (currentIndex + 1)),
                    temp;

                temp = input[currentIndex];
                //console.log(input[currentIndex]);
                input[currentIndex] = input[randomIndex];
                input[randomIndex] = temp;
            }

            return input;
        }
    }
})();