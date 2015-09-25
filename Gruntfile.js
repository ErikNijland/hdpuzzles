module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            files: ['app.js', 'components/**/*.js'],
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
        },
        concat: {
            options: {
                sourceMap: true
            },
            dist: {
                src: [
                    'bower_components/angular/angular.js',
                    'bower_components/angular-resource/angular-resource.js',
                    'app.js',
                    'components/**/*.js'
                ],
                dest: 'public/app.js'
            }
        },
        watch: {
            sass: {
                files: ['sass/**/*.scss'],
                tasks: ['sass']
            },
            js: {
                files: ['app.js', 'components/**/*.js'],
                tasks: ['jshint', 'concat']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['sass', 'jshint', 'concat']);
    grunt.registerTask('default', ['build', 'watch']);
};