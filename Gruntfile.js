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
                    bases: [process.cwd() + '/src/'],
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
                src: ['*.html', 'pages/*.html'], // Source files
                dest: 'src', // Destination directory
                options: {
                    includePath: 'src/partials',
                    flatten: true,
                    silent: true,
                    banner: ''
                }
            }
        },
        useminPrepare: {
            html: 'src/index.html',
            options: {
                dest: 'output'
            }
        },
        usemin: {
            html: ['output/index.html']
        },
        copy: {
            html: {
                src: 'src/index.html', dest: 'output/index.html'
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {}
            },
//            all: {
//                src: [
//                    'output/js/**/*.js'
//                ]
//            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib_test: {
                src: ['lib/**/*.js', 'test/**/*.js']
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        watch: {
            js: {
                files: 'src/js/**/*.js',
                tasks: ['jshint']
            },
            html: {
                files: 'src/site/**/*.html',
                tasks: ['includes']
            },
            styles: {
                files: 'src/css/**/*.css'
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
        'includes',
        'express',
        'open',
        'watch'
    ]);
    grunt.registerTask('build', [
        'includes',
        'copy:html',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'usemin'
    ]);
};