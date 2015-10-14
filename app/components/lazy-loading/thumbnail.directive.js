(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .directive('thumbnail', thumbnailDirective);

    thumbnailDirective.$inject = ['$timeout', '$window'];

    function thumbnailDirective ($timeout, $window) {
        return {
            scope: {
                "imageSrc": '@'
            },
            templateUrl: 'lazy-loading/thumbnail.html',
            link: function (scope, element) {
                var transparantPixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

                scope.lazyLoadingSrc = transparantPixel;

                $timeout(checkImage);

                $window.addEventListener('scroll', checkImage);
                $window.addEventListener('resize', checkImage);

                function checkImage () {
                    if (element[0].getBoundingClientRect().top < getViewportHeight() && element[0].getBoundingClientRect().bottom > 0) {
                        scope.lazyLoadingSrc = scope.imageSrc;
                        scope.$digest();

                        $window.removeEventListener('scroll', checkImage);
                        $window.removeEventListener('resize', checkImage);
                    }
                }

                function getViewportHeight () {
                    return $window.document.documentElement.clientHeight;
                }
            }
        };
    }
})();