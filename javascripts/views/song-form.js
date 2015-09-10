define(function(require) {
  var angular = require("angular");
  var angularRoute = require("angular-route");
  var angularfire = require("angularfire");
  var auth = require("authentication");

  angular
    .module("MusicHistoryApp.songForm", ["ngRoute"])
    .config(["$routeProvider", function($routeProvider) {
      $routeProvider.when("/songs/add", {
        templateUrl: "partials/song-form.html",
        controller: "SongFormCtrl",
        controllerAs: "songForm"
      });
    }])
    
    // Controller for the song form view
    .controller("SongFormCtrl", ["$firebaseArray",
      function($firebaseArray) {
        var ref = new Firebase("https://nss-demo-instructor.firebaseio.com/songs");
        this.songs = $firebaseArray(ref);
        this.newSong = {};

        // Handle "Add Song" button click
        this.addSong = function() {
          this.songs.$add({
            artist: this.newSong.artist,
            name: this.newSong.name,
            album: {
              name: this.newSong.albumName,
              year: this.newSong.albumYear
            },
            uid: auth.getUid()
          });

          this.newSong = {};

        }.bind(this);
      }
    ]);
});
