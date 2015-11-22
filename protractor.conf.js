exports.config = {
    baseUrl: 'http://127.0.0.1:3000/',
    specs: ['test/e2e/**/*.js'],
    capabilities: {
        browserName: 'chrome'
    }
};