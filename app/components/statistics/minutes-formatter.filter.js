(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .filter('minutesFormatter', minutesFormatterFilter);

    function minutesFormatterFilter () {
        return function (input) {
            var minutes = Math.floor(input / 60),
                seconds = input % 60,
                output;

            output = minutes + ':';

            if (seconds < 10) {
                output += '0';
            }

            output += seconds;

            return output;
        };
    }
})();