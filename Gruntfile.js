/* globals module, require */

module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    uglify: {
      global: {
        files: {
          "dist/js/site.min.js": ["src/js/site.js"]
        }
      }
    },

    sass: {
      
      dist: {
        options: {
          style: "compressed",
          loadPath: 'node_modules/bootstrap-sass/assets/stylesheets'
        },
        files: {
          "dist/css/global-unprefixed-min.css": "src/scss/global.scss"
        }
      },
      global: {
        options: {
          style: "expanded",
          loadPath: 'node_modules/bootstrap-sass/assets/stylesheets'
        },
        files: {
          "dist/css/global-unprefixed.css": "src/scss/global.scss"
        }
      },
      docs: {
        options: {
          style: "expanded"
        },
        files: {
          "docs/assets/css/docs.css": "docs/scss/docs.scss"
        }
      }
    },

    autoprefixer: {
      dist: {
        src: "dist/css/global-unprefixed-min.css",
        dest: "dist/css/main-min.css"
      },
      global: {
        src: "dist/css/global-unprefixed.css",
        dest: "dist/css/main.css"
      }
    },
    copy: {
      docs: {
        files: [
          {expand: true, cwd: 'dist', src: ['**'], dest: 'docs/assets'}
        ],
      },

    },
    shell: {
      jekyllServe: {
        command: "jekyll serve --baseurl '' --port '4001'"
      },
      jekyllBuild: {
        command: "jekyll build --config _config.yml"
      }
    },

    watch: {
      options: {
        livereload: false
      },
      site: {
        files: ["docs/index.html", "docs/_layouts/*.html", "docs/_posts/*.md",  "docs/_includes/*.html"],
        tasks: ["shell:jekyllBuild"]
      },
      js: {
        files: ["js/*.js"],
        tasks: ["uglify", "shell:jekyllBuild"]
      },
      css: {
        files: ["src/scss/*.scss", "docs/scss/*.scss"],
        tasks: ["sass", "autoprefixer", "shell:jekyllBuild"]
      },
      svgIcons: {
        files: ["svg/*.svg"],
        tasks: ["svgstore", "shell:jekyllBuild"]
      }
    },

    svgstore: {
      options: {
        prefix : "shape-",
        cleanup: false,
        svg: {
          style: "display: none;"
        }
      },
      default: {
        files: {
          "docs/_includes/svg-defs.svg": ["src/svg/*.svg"]
        }
      }
    },

    imagemin: {                           
      dynamic: {
        options: {
          optimizationLevel: 5
        },                         
        files: [{
          expand: true,                  
          cwd: 'img/uncompressed',                   
          src: ['**/*.{png,jpg,gif}'],   
          dest: 'img/'
        }]
      }
    }
    


  });

  require("load-grunt-tasks")(grunt);

  //grunt.registerTask("imagemin", ["imagemin"]);
  grunt.registerTask("serve", ["shell:jekyllServe"]);
  grunt.registerTask("default", ["sass", "copy", "autoprefixer", "svgstore", "shell:jekyllBuild", "watch"]);

};
