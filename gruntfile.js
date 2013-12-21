module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      src: ['gruntfile.js', 'app/src/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          require: true,
          define: true,
          requirejs: true,
          describe: true,
          expect: true,
          it: true
        }
      }
    },
    watch: {
      files: '<%= jshint.src %>',
      tasks: ['jshint']
    },
    concat: {
      options: {
        separator: '\n'
      },
      dist: {
        src: ['app/src/intro.js', 'app/src/audio.js', 'app/src/background.js',
              'app/src/badguy.js', 'app/src/bullet.js', 'app/src/collision.js', 
              'app/src/controls.js', 'app/src/explosion.js', 'app/src/goodguy.js', 
              'app/src/level.js', 'app/src/math.js', 'app/src/scenes.js', 
              'app/src/game.js', 'app/src/outro.js'],
        dest: 'build/src/<%= pkg.name %>.js'
      }
    }
  });

  // Load JSHint task
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task.
  grunt.registerTask('default', 'jshint', 'concat');

};