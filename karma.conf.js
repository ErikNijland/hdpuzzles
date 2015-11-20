module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'public/lib/angular/angular.min.js',
            'public/lib/angular-route/angular-route.min.js',
            'public/lib/angular-animate/angular-animate.min.js',
            'public/lib/angular-mocks/angular-mocks.js',
            'app/**/*.js',
            'test/unit/**/*Spec.js'
        ],
        exclude: [],
        preprocessors: {
        },
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],
        port: 9876,
        colors: true,
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: true,
        concurrency: Infinity
    });
};
