({
  baseUrl: "./javascripts",
  paths: {
    "jquery": "../lib/bower_components/jquery/dist/jquery.min",
    "lodash": "../lib/bower_components/lodash/lodash.min",
    "bootstrap": "../lib/bower_components/bootstrap/dist/js/bootstrap.min",
    "oauth": "../lib/bower_components/oauth-js/dist/oauth.min",
    "firebase": "../lib/bower_components/firebase/firebase",
    "material": "../lib/bower_components/bootstrap-material-design/dist/js/material.min",
    "q": "../lib/bower_components/q/q",
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
    "firebase": {
        exports: "Firebase"
    }
  },
  name: "main",
  out: "main-built.js"
})
