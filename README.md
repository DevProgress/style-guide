# Style Guide

Style guide for consistency across all DevProgress projects.

## Using the assets ##
Compiled assets such as css as well as images and fonts are located in the `dist` directory.

## Building and running locally ##

- `npm install` to install dependencies.
- `grunt` compiles all css and builds docs in the `docs` directory
- `grunt serve` runs local server at  `localhost:4001`

## Modifying styles ##

`src/scss/_variable-overrides.scss` overrides default Bootstrap variables found in `node_modules/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss`

Copy variables from the Bootstrap variables into the override file. Be sure to remove `!default` in the override file to ensure it overrides the Bootstrap defaults.

`src/scss/_devprogress.scss` should contain all styles for DevProgress specific components that are not part of Bootstrap. For example styles for a common DevProgress footer would go here.

`docs_src/scss/_docs.scss` contains styles specific to the style guide documentation.

## Updating the docs

The style guide docs are built with [Jekyll](http://jekyllrb.com/ "Jekyll static site generator").

The source files are located in `docs_src` and are assembled into the `docs` folder.