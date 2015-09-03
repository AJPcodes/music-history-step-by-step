define([
  "angular",
  "angular-route",
  "angularfire"
], function(angular, angularRoute, angularFire) {

  angular
    .module("MusicHistoryApp.songForm", ["ngRoute"])
    .config(["$routeProvider", function($routeProvider) {
      $routeProvider.when("/songs/add", {
        templateUrl: "partials/song-form.html",
        controller: "SongFormCtrl",
        controllerAs: "songForm"
      });
    }])
    .controller("SongFormCtrl", ["$firebaseArray",
      function($firebaseArray) {
        var ref = new Firebase("https://nss-demo-instructor.firebaseio.com/songs");
        this.songs = $firebaseArray(ref);
        this.newSong = {};

        this.addSong = function() {
          this.songs.$add({
            artist: this.newSong.artist,
            name: this.newSong.name,
            album: {
              name: this.newSong.albumName,
              year: this.newSong.albumYear
            }
          });
        }.bind(this);
      }
    ]);
});
