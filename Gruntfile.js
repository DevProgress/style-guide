/* globals module, require */

module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    uglify: {
      global: {
        files: {
          "dist/js/dp-docs.min.js": ["src/js/dp-docs.js"]
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
          "dist/css/main-unprefixed-min.css": "src/scss/main.scss"
        }
      },
      global: {
        options: {
          style: "expanded",
          loadPath: 'node_modules/bootstrap-sass/assets/stylesheets'
        },
        files: {
          "dist/css/main-unprefixed.css": "src/scss/main.scss"
        }
      },
      docs: {
        options: {
          style: "expanded"
        },
        files: {
          "docs/assets/css/docs.css": "docs_src/scss/docs.scss"
        }
      }
    },

    autoprefixer: {
      dist: {
        src: "dist/css/main-unprefixed-min.css",
        dest: "dist/css/main-min.css"
      },
      global: {
        src: "dist/css/main-unprefixed.css",
        dest: "dist/css/main.css"
      }
    },
    copy: {
      docs: {
        files: [
          {expand: true, cwd: 'dist', src: ['**'], dest: 'docs_src/assets'}
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
        files: ["docs_src/index.html", "docs_src/_layouts/*.html", "docs_src/_posts/*.md",  "docs_src/_includes/*.html"],
        tasks: ["shell:jekyllBuild"]
      },
      js: {
        files: ["js/*.js"],
        tasks: ["uglify", "shell:jekyllBuild"]
      },
      css: {
        files: ["src/scss/*.scss", "docs_src/scss/*.scss"],
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
          "docs_src/_includes/svg-defs.svg": ["src/svg/*.svg"]
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
