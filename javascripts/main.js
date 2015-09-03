requirejs.config({
  baseUrl: "./javascripts",
  paths: {
    "jquery": "../lib/bower_components/jquery/dist/jquery.min",
    "hbs": "../lib/bower_components/require-handlebars-plugin/hbs",
    "lodash": "../lib/bower_components/lodash/lodash.min",
    "q": "../lib/bower_components/q/q",
    "bootstrap": "../lib/bower_components/bootstrap/dist/js/bootstrap.min",
    "selectize": "../lib/bower_components/selectize/dist/js/selectize.min",
    "oauth": "../lib/bower_components/oauth-js/dist/oauth.min",
    "sifter": "../lib/bower_components/sifter/sifter.min",
    "microplugin": "../lib/bower_components/microplugin/src/microplugin",
    "firebase": "../lib/bower_components/firebase/firebase",
    "material": "../lib/bower_components/bootstrap-material-design/dist/js/material.min",
    "es6": "../lib/bower_components/requirejs-babel/es6",
    "babel": "../lib/bower_components/requirejs-babel/babel-5.8.22.min",
    "angular": "../lib/bower_components/angular/angular.min",
    "angular-route": "../lib/bower_components/angular-route/angular-route.min",
    "angular-filter": "../lib/bower_components/angular-filter/dist/angular-filter.min",
    "angularfire": "../lib/bower_components/angularfire/dist/angularfire.min"
  },
  shim: {
    "angular" : {"exports" : "angular"},
    "angular-route": ["angular"],
    "angular-filter": ["angular"],
    "bootstrap": ["jquery"],
    "material": ["bootstrap"],
    "angularfire": ["angular", "firebase"],
    "selectize": ["bootstrap", "sifter", "microplugin"],
    "firebase": {
        exports: "Firebase"
    },
    priority: [
      "angular"
    ]
  }
});

requirejs(
["dependencies", "check_auth", "navigation"], 
function(deps, check_auth, nav) {

  check_auth()
    .then(function() {
      require(["core_list"], function() {});
    })
    .fail(function(error) {
      console.log("error", error);
    });

});
