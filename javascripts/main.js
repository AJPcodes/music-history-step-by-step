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
    "es6": "../lib/node_modules/requirejs-babel/es6",
    "babel": "../lib/node_modules/requirejs-babel/babel-5.8.22.min"
  },
  shim: {
    "bootstrap": ["jquery"],
    "material": ["bootstrap"],
    "selectize": ["bootstrap", "sifter", "microplugin"],
    "firebase": {
        exports: "Firebase"
    }
  }
});

requirejs(["dependencies", "check_auth"], function(deps, check_auth) {

  $(".add-song").click(function () {
    $(".song-list").addClass("hidden");
    $(".entry-form").removeClass("hidden");

    $(".list-songs").parent().removeClass("active");
    $(this).parent().addClass("active");
  });

  $(".list-songs").click(function () {
    $(".song-list").removeClass("hidden");
    $(".entry-form").addClass("hidden");

    $(".add-song").parent().removeClass("active");
    $(this).parent().addClass("active");
  });

  check_auth()
    .then(function() {
      require(["core_list", "core_form"], function() {});
    })
    .fail(function(error) {
      console.log("error", error);
    });

});
