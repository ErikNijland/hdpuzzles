module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            files: ['app/**/*.js'],
            options: {
                jshintrc: true
            }
        },
        sass: {
            options: {
                sourceMap: true,
                outputStyle: 'compressed'
            },
            dist: {
                files: {
                    'public/app.min.css': 'sass/app.scss'
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
                cwd: 'app/components',
                src: '**/*.html',
                dest: 'temp/templates.js'
            }
        },
        concat: {
            options: {
                sourceMap: false
            },
            dist: {
                src: [
                    'bower_components/angular/angular.js',
                    'bower_components/angular-route/angular-route.js',
                    'app/**/*.js',
                    'temp/templates.js'
                ],
                dest: 'temp/app.js'
            }
        },
        uglify: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'public/app.min.js': ['temp/app.js']
                }
            }
        },
        watch: {
            sass: {
                files: ['sass/**/*.scss'],
                tasks: ['build-css']
            },
            js: {
                files: ['./app/**/*.js', './app/**/*.html'],
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
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['build', 'watch']);

    grunt.registerTask('build', ['build-css', 'build-javascript']);
    grunt.registerTask('build-css', ['clean:css', 'sass']);
    grunt.registerTask('build-javascript', ['jshint', 'clean:js', 'ngtemplates', 'concat', 'uglify', 'clean:temp'])
};