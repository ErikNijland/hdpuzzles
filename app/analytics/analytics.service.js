(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .service('analytics', analyticsService);

    analyticsService.$inject = ['$window'];

    function analyticsService ($window) {
        return {
            "trackPageview": trackPageview,
            "trackEvent": trackEvent
        };

        function trackPageview () {

        }

        function trackEvent (category, action, label, value) {

        }
    }
})();