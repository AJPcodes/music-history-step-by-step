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
  ["firebase", "dependencies"],
  function(fb, dependencies) {

    var ref = new Firebase("https://nss-demo-instructor.firebaseio.com/");
    ref.authWithOAuthPopup("github", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        require(["core_list"], function() {});
        console.log("Authenticated successfully with payload:", authData);
      }
    });

  }
);







