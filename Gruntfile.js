module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            files: ['js/**/*.js'],
            options: {
                jshintrc: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint']);

    /*
    Task todo:
    default >> build then watch
    build
    watch

    jshint
    sass to css
    js concat + minify
    */
};