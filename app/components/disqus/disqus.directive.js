(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .directive('disqus', disqusDirective);

    disqusDirective.$inject = ['$window'];

    function disqusDirective ($window) {
        return {
            restrict: 'EA',
            templateUrl: 'disqus/disqus.html',
            link: function () {
                var d = $window.document, s = d.createElement('script');

                s.src = '//hdpuzzles.disqus.com/embed.js';

                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
                console.log(s);

            }
        };
    }
})();