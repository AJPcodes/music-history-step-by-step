requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../lib/bower_components/jquery/dist/jquery.min',
    'firebase': '../lib/bower_components/firebase/firebase',
    'lodash': '../lib/bower_components/lodash/lodash.min',
    'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
    'q': '../lib/bower_components/q/q',
    'material': '../lib/bower_components/bootstrap-material-design/dist/js/material.min',
    'es6': "../lib/node_modules/requirejs-babel/es6",
    'babel': "../lib/node_modules/requirejs-babel/babel-5.8.22.min"
  },
  shim: {
    'bootstrap': ['jquery'],
    'material': ['bootstrap'],
    'firebase': {
        exports: 'Firebase'
    }
  }
});

requirejs(
  ["dependencies", "core_list"],
  function(dependencies, core_list) {

  }
);
