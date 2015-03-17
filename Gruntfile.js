'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    clean: {
      build: {
        src: ['build/']
      }
    },

    copy: {
      build: {
        expand: true,
        cwd: 'app/',
        src: '**/*.html',
        dest: 'build/',
        flatten: false,
        filter: 'isFile'
      }
    },

    watch: {
      build: {
        files: ['app/**/*'],
        tasks: ['clean', 'browserify', 'copy']
      },
      test: {
        files: ['test/*.js'],
        tasks: ['browserify']
      }
    },

    browserify: {
      dev: {
        src: ['app/js/**/*.js'],
        dest: 'build/bundle.js'
      },

      test: {
        src: ['test/client_side/*_test.js'],
        dest: 'test/client_side/test_bundle.js'
      },

      karmatest: {
        src:['test/karma_tests/*Test.js'],
        dest: 'test/karma_tests/karmaTestBundle.js'
      },

      options: {
        transform: ['reactify', 'debowerify']
      }
    },

    jshint: {
      dev: {
        options: {
          jshintrc: '.jshintrc',
        },
        src: ['app/js/*', 'test/*.js', 'routes/*', 'models/*']
      }
    },

    simplemocha: {
      all: {
        src: ['test/**/*.js']
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });
  grunt.registerTask('build', ['clean', 'browserify', 'copy']);
  grunt.registerTask('build:test', ['browserify:test']);
  grunt.registerTask('building', ['watch:build']);
  grunt.registerTask('testing', ['watch:test']);
  grunt.registerTask('goodkarma', ['browserify:karmatest', 'karma:unit']);
};