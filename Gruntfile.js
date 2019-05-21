module.exports = function (grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          watch: true,
          transform: [
            ['babelify', {presets: ['@babel/preset-env'], plugins: ['@babel/plugin-transform-runtime']}],
          ]
        },
        files: {
          // if the source file has an extension of es6 then
          // we change the name of the source file accordingly.
          // The result file's extension is always .js
          './public/app.js': ['./src/js/App.js']
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          './public/app.js': ['./public/app.js'] // todo add css if such
        }
      }
    },
    watch: {
      scripts: {
        files: ['src/js/**/*.js', '*.css'],
        tasks: ['browserify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['watch']);
  // grunt.registerTask('build', ['browserify', 'uglify']);
  grunt.registerTask('build', ['browserify']);
};
