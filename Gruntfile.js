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
                src: ['src/*.html'], // Source files
                dest: 'output', // Destination directory
                flatten: true,
                cwd: '.',
                options: {
                    silent: true,
                    banner: ''
                }
            }
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            css: {
                src: 'src/css/**/*.css',
                dest: 'temp/combined.css'
            },
            js: {
                src: 'src/js/**/*.js',
                dest: 'temp/combined.js'
            }
        },
        cssmin: {
          css: {
              src: 'temp/combined.css',
              dest: 'output/css/styles.css'
          }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            js: {
                src: 'temp/combined.js',
                dest: 'output/js/js.min.js'
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
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            // lib_test: {
            //   files: '<%= jshint.lib_test.src %>',
            //   tasks: ['jshint:lib_test', 'qunit']
            // },
            js: {
                files: 'src/js/**/*.js',
                tasks: ['jshint']
            },
            html: {
                files: 'src/**/*.html',
                tasks: ['includes']
            },
            styles: {
                files: 'src/css/**/*.css'
            },
            all: {
                files: 'output/**/*',
                options: {
                    livereload: true
                }
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
        'concat',
        'cssmin',
        'uglify',
        'open',
        'watch'
    ]);

};