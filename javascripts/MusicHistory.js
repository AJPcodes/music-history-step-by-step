define(function(require) {
  var angular = require("angular");
  var route = require("angular-route");
  var list = require("views/song-list");
  var form = require("views/song-form");
  var filter = require("angular-filter");

  return angular
    .module(
      "MusicHistoryApp",
      [
        "ngRoute", 
        "firebase", 
        "angular.filter",
        "MusicHistoryApp.songList",
        "MusicHistoryApp.songForm"
      ]
    )
    .config(["$routeProvider", function($routeProvider) {
      $routeProvider.otherwise({ redirectTo: "/" });
    }]);
});
