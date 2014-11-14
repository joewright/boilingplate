/*global module:false*/
module.exports = function(grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.config.init({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '',

        // Grunt express - our webserver
        // https://github.com/blai/grunt-express
        express: {
            all: {
                options: {
                    bases: [process.cwd() + '/output/'],
                    port: 8080,
                    hostname: "0.0.0.0",
                    livereload: true
                }
            }
        },

        // grunt-watch will monitor the projects files
        // https://github.com/gruntjs/grunt-contrib-watch
        includes: {
            files: {
                cwd: 'src/site',
                src: ['*.html', '**/*.html'], // Source files
                dest: 'output', // Destination directory
                options: {
                    includePath: 'src/partials',
                    flatten: true,
                    silent: true,
                    banner: ''
                }
            }
        },
        useminPrepare: {
            html: 'output/index.html',
            options: {
                dest: 'output'
            }
        },
        usemin: {
            html: ['output/index.html']
        },
        copy: {
            html: {
                src: 'src/index.html',
                dest: 'output/index.html'
            },
            js: {
                expand: true,
                cwd: 'src/',
                src: '**/*.js',
                dest: 'output/'
            },
            css: {
                expand: true,
                cwd: 'src/',
                src: '**/*.css',
                dest: 'output/'
            },
            others: {
                expand: true,
                cwd: 'src/',
                src: ['img/**/*', 'images/**/*'],
                dest: 'output/'
            }
        },
        jshint: {
            all: {
                src: [
                    'src/**/*.js'
                ]
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        watch: {
            js: {
                files: 'src/**/*.js',
                tasks: ['jshint', 'copy:js']
            },
            html: {
                files: 'src/**/*.html',
                tasks: ['includes', 'copy:html']
            },
            styles: {
                files: 'src/**/*.css',
                tasks: ['copy:css']
            },
            all: {
                files: [
                    'src/**/*'
                ],
                options: {
                    livereload: true
                }
            }
        },
        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        'output',
                        'src/index.html'
                    ]
                }]
            }
        },
        // grunt-open will open your browser at the project's URL
        // https://www.npmjs.org/package/grunt-open
        open: {
            all: {
                path: 'http://localhost:8080/index.html'
            }
        }
    });


    // Default task.
    grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('default', [
        'clean',
        'includes',
        'copy:html',
        'copy:js',
        'copy:css',
        'express',
        'open',
        'watch'
    ]);
    grunt.registerTask('build', [
        'clean',
        'includes',
        'copy:html',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'usemin'
    ]);
};