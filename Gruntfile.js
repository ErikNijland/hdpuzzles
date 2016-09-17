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
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        connect: {
            server: {
                base: 'public'
            }
        },
        protractor: {
            options: {
                configFile: 'protractor.conf.js'
            },
            all: {}
        },
        watch: {
            sass: {
                files: ['sass/**/*.scss'],
                tasks: ['build-css']
            },
            js: {
                files: ['./app/**/*.js', './app/**/*.html', 'test/**/*.js'],
                tasks: ['build-javascript']
            }
        },
        clean: {
            temp: ['temp'],
            css: ['public/*.css', 'public/*.css.map'],
            js: ['public/*.js', 'public/*.js.map'],
            coverage: ['coverage']
        }
    });

    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('default', ['build', 'watch']);

    grunt.registerTask('build', ['build-css', 'build-javascript']);
    grunt.registerTask('build-css', ['clean:css', 'sass']);
    grunt.registerTask('build-javascript', ['clean:js', 'ngtemplates', 'concat', 'uglify', 'clean:temp'])

    grunt.registerTask('test', ['jshint', 'test-unit']);
    grunt.registerTask('test-unit', ['clean:coverage', 'karma:unit']);
    grunt.registerTask('test-e2e', ['connect:server', 'protractor']);
};