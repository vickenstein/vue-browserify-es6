module.exports = (grunt) => {

  const vueify = require('vueify')
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      browserify: {
        files: ['**/*.js'],
        tasks: ['browserify']
      },
      pug: {
        files: ['index.pug'],
        tasks: ['pug']
      },
    },
    browserify: {
      options: {
        transform: [vueify]
      },
      compile: {
        src: ['main.js'],
        dest: 'main.compiled.js'
      }
    },
    pug: {
      compile: {
        files: {
          'index.html': 'index.pug'
        }
      }
    },
    connect: {
      options: {
        port: 7000,
        livereload: 35729,
        hostname: '127.0.0.1',
        base: '.'
      },
      livereload: {
        options: {
          open: true
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-pug')

  // Default task(s).
  grunt.registerTask('default', ['pug', 'browserify', 'connect:livereload', 'watch'])

}
