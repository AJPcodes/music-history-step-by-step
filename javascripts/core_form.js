define(function(require) {
    // Dependencies
    var $ = require("jquery");
    var fire = require("firebase");
    var _selectize = require("selectize");
    var auth = require("authentication");
    var getUnique = require("es6!getUnique");
    var templates = require("es6!getTemplates");

    // Module variables
    var selectedArtist, selectedAlbum, selectedYear;

    // Create a reference to your Firebase database
    var myFirebaseRef = new Firebase("https://nss-demo-instructor.firebaseio.com");

    // Listen for when anything changes on the "songs" key
    myFirebaseRef.child("songs").on("value", function(snapshot) {

      // Store the entire songs key in a local variable
      var songs = snapshot.val();

      // Empty out the module-level song array
      allSongsArray = [];

      // Convert Firebase's object of objects into an array of objects
      for (var key in songs) {
        var songWithId = songs[key];
        songWithId.key = key;
        allSongsArray[allSongsArray.length] = songWithId;
      }

      console.log("allSongsArray",allSongsArray);

      // Now create my base object that will get bound to the 
      // song list Handlebar template (Handlebar templates
      // always need objects)
      allSongsObject = { songs: allSongsArray };

      /*
        Create a copy of the allSongsArray so that when
        the user clicks the "Clear Filter" button, we can 
        set it back to the original data.
       */
      originalSongsArray = allSongsArray.slice();
      // Make an array of unique artist names
      unique = getUnique(allSongsArray);

      // Bind the unique artists to the filteredArtists template
      $("#artistName").html(templates.newArtistTpl({artists:unique.artists}));
      $('#artistName').selectize({create: true});

      // Bind the unique albums to the filteredAlbums template
      $("#albumName").html(templates.newAlbumTpl({albums:unique.albums}));
      $('#albumName').selectize({create: true});
    });

    // Initialize Material design styles
    $.material.init();

    // Handle click event on the "Add Song" button
    $("#addSong").click(function(e) {

      var newSong = {
        "name": $("#songName").val(),
        "artist": $("#artistName").val(),
        "album": {
          "name": $("#albumName").val(),
          "year": parseInt($("#albumYear").val(), 10)
        },
        "uid": auth.getUid()
      };

      $.ajax({
        url: "https://nss-demo-instructor.firebaseio.com/songs.json",
        method: "POST",
        data: JSON.stringify(newSong)
      }).done(function(addedSong) {
        console.log("Your new song is", addedSong);

        $("#songName").val("");
        $("#artistName").val("");
        $("#albumName").val("");
        $("#albumYear").val("");

        $("#songName").focus();

      });
    });

});