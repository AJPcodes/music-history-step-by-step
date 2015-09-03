define(function(require) {
  var angular = require("angular");
  var angularRoute = require("angular-route");
  var angularfire = require("angularfire");
  var auth = require("authentication");

  angular
    .module("MusicHistoryApp.songList", ["ngRoute"])
    .config(["$routeProvider", function($routeProvider) {
      $routeProvider.when("/", {
        templateUrl: "partials/song-list.html",
        controller: "SongListCtrl",
        controllerAs: "songList"
      });
    }])
    .controller("SongListCtrl", ["$firebaseArray",
      function($firebaseArray) {
        var songsRef = new Firebase("https://nss-demo-instructor.firebaseio.com/songs")
          .orderByChild("uid")
          .equalTo(auth.getUid());

        this.songs = $firebaseArray(songsRef);
      }
    ]);
});
