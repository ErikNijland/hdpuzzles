(function () {
    'use strict';

    angular
        .module('hdpuzzles')
        .run(runBlock);

    runBlock.$inject = ['$rootScope', 'analytics'];

    function runBlock ($rootScope, analytics) {
        analytics.initialize();

        $rootScope.$on('$routeChangeStart', function() {
            analytics.trackPageview();
        });
    }
})();