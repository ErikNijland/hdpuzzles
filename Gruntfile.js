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
        ngtemplates: {
            hdpuzzles: {
                options: {
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                },
                cwd: 'components',
                src: '**/*.html',
                dest: 'temp/templates.js'
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
                    'temp/templates.js',
                    'components/**/*.js'
                ],
                dest: 'public/app.js'
            }
        },
        watch: {
            sass: {
                files: ['sass/**/*.scss'],
                tasks: ['build-css']
            },
            js: {
                files: ['app.js', 'components/**/*.js', 'components/**/*.html'],
                tasks: ['build-javascript']
            }
        },
        clean: {
            temp: ['temp'],
            css: ['public/*.css', 'public/*.css.map'],
            js: ['public/*.js', 'public/*.js.map']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['build', 'watch']);

    grunt.registerTask('build', ['build-css', 'build-javascript']);
    grunt.registerTask('build-css', ['clean:css', 'sass']);
    grunt.registerTask('build-javascript', ['jshint', 'clean:js', 'ngtemplates', 'concat', 'clean:temp'])
};