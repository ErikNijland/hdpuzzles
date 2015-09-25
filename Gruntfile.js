module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            files: ['js/**/*.js'],
            options: {
                jshintrc: true
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'public/app.css': 'sass/app.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint']);

    /*
    Task todo:
    default >> build then watch
    build
    watch

    sass to css
    js concat + minify
    */
};