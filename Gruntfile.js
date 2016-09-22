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
          "docs_src/assets/css/docs.css": "docs_src/scss/docs.scss"
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
    webfont: {
            icons: {
                src: 'src/img/svg/icons/*.svg',
                dest: 'dist/fonts/icons',
                destCss: 'src/scss',
                options: {
                  stylesheet: 'scss',
                  relativeFontPath: '../fonts/icons',
                  htmlDemo: true,
                  destHtml: 'docs_src/_includes',
                  engine: 'node',
                  types: 'eot,woff,ttf',
                  font: 'dev-progress-icons',
                  hashes: false,
                  template: 'src/img/svg/icons/templates/icons.css',
                  htmlDemoTemplate: 'src/img/svg/icons/templates/dp-icons.html',
                  templateOptions: {
                      baseClass: 'dp-icon',
                      classPrefix: 'dp-icon-',
                  },
                  fontHeight: 512,
                  descent: -4,
                  ascent: 512
                }
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
        command: "jekyll serve --port '4001'"
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
      },
      images: {
        files: ["docs_src/img/*.{png,jpg,gif}"],
        tasks: ["imagemin", "shell:jekyllBuild"]
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
          cwd: 'docs_src/img',                   
          src: ['**/*.{png,jpg,gif}'],   
          dest: 'docs_src/assets/img/'
        }]
      }
    }
    


  });

  require("load-grunt-tasks")(grunt);

  //grunt.registerTask("imagemin", ["imagemin"]);
  grunt.registerTask("serve", ["shell:jekyllServe"]);
  grunt.registerTask("default", ["sass", "autoprefixer", "copy", "svgstore", "shell:jekyllBuild", "watch"]);

};
