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
    
    .controller("AllCtrl", ["$firebaseArray", "$scope",
      function($firebaseArray, $scope) {
        $scope.query = "";
      }
    ])

    .controller("SongListCtrl", ["$firebaseArray", "$rootScope",
      function($firebaseArray, $rootScope) {

        // Query only songs that belong to current user
        var songsRef = new Firebase("https://nss-demo-instructor.firebaseio.com/songs")
          .orderByChild("uid")
          .equalTo(auth.getUid());

        // Add songs to scope of controller
        this.songs = $firebaseArray(songsRef);
      }
    ]);
});
