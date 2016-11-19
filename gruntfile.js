module.exports = function(grunt) {
  grunt.initConfig({
    // Sass
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'dist/css/main.css': 'scss/main.scss'
        }
      }
    },

    // Autoprefix
    autoprefixer: {
      options: {
        browsers: [
          'last 2 version'
        ]
      },
      dist: {
        src: 'dist/css/main.css'
      }
    },

    // CSS minify
    cssmin: {
      dist: {
        files: {
          'dist/css/main.min.css': 'dist/css/main.css'
        }
      }
    },

    // Concat
    concat: {
      js: {
        src: ['js/**/*.js'],
        dest: 'dist/js/main.js'
      },
    },

    // Uglify
    uglify: {
      dist: {
        src: 'js/main.js',
        dest: 'dist/js/main.min.js'
      },
    },

    // Clean
    clean: {
      build: ['css', 'js', 'images']
    },

    // Notify
    notify: {
      styles: {
        options: {
          message: 'Styles task complete',
        }
      },
      scripts: {
        options: {
          message: 'Scripts task complete',
        }
      },
      images: {
        options: {
          message: 'Images task complete',
        }
      },
    },

    watch: {
      styles: {
        files: 'scss/**/*.scss',
        tasks: ['sass', 'autoprefixer', 'cssmin', 'notify:styles'],
      },
      scripts: {
        files: 'js/**/*.js',
        tasks: ['concat', 'uglify', 'notify:scripts'],
      },
      livereload: {
        options: { livereload: true },
        files: [
          'dist/css/**/*.css',
          'dist/js/**/*.js',
          'dist/images/**/*'
        ]
      }
    }
  });

  // Default task
  grunt.registerTask('default', [
    'clean',
    'concat',
    'uglify',
    'sass',
    'autoprefixer',
    'cssmin'
  ]);

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-notify');
};
