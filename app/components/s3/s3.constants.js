(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .constant('s3', {
            "IMAGE_LOCATION": "https://hdpuzzles.s3.eu-central-1.amazonaws.com/puzzles/",
            "THUMBNAIL_LOCATION": "https://hdpuzzles.s3.eu-central-1.amazonaws.com/thumbnails/"
        });
})();