/*global module:false*/
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '',
    // Task configuration.
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
      dist: {
        src: ['output/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
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
      html: {
        files: 'src/**/*.html',
        tasks: ['includes']
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

  // These plugins provide necessary tasks.
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-express');

  // Default task.
  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('default', [
    'includes',
    'express',
    // 'concat',
    // 'uglify',
    'open',
    'watch'
  ]);

};