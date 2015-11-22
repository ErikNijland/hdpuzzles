exports.config = {
    baseUrl: 'http://127.0.0.1:8000/public/',
    specs: ['test/e2e/**/*.js'],
    capabilities: {
        browserName: 'phantomjs',
        'phantomjs.binary.path': './node_modules/phantomjs/bin/phantomjs'
    }
};