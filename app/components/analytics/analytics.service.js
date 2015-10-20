(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .service('analytics', analyticsService);

    analyticsService.$inject = ['$window', '$location'];

    function analyticsService ($window, $location) {
        return {
            "initialize": initialize,
            "trackPageview": trackPageview,
            "trackEvent": trackEvent
        };

        function initialize () {
            /* jshint ignore:start */
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
            /* jshint ignore:end */

            $window.ga('create', 'UA-38013878-1', 'auto');
        }

        function trackPageview () {
            $window.ga('send', 'pageview', {
                "page": $location.url()
            });
        }

        function trackEvent (category, action, label, value) {
            $window.ga('send', 'event', category, action, label, value);
        }
    }
})();