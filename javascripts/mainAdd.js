requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'lodash': '../bower_components/lodash/lodash.min',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
    'selectize': '../bower_components/selectize/dist/js/selectize.min',
    'sifter': '../bower_components/sifter/sifter.min',
    'microplugin': '../bower_components/microplugin/src/microplugin',
    'firebase': '../bower_components/firebase/firebase',
    'material': '../bower_components/bootstrap-material-design/dist/js/material.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'material': ['bootstrap'],
    'selectize': ['bootstrap', 'sifter', 'microplugin'],
    'firebase': {
        exports: 'Firebase'
    }
  }
});

requirejs(
  ["jquery", "hbs", "firebase", "bootstrap", "selectize", "material", "getTemplates", "getUnique"], 
  function($, Handlebars, _fb, bootstrap, selectize, material, templates, unique) {
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
      var uniqueArtists = unique(allSongsArray).uniqueArtists;

      // Bind the unique artists to the filteredArtists template
      $("#artistName").html(templates.formArtists({artists:uniqueArtists}));
      $('#artistName').selectize({create: true});

      // Make an array of unique album names
      var uniqueAlbums = unique(allSongsArray).uniqueAlbums;
      console.log("uniqueAlbums",uniqueAlbums);

      // Bind the unique albums to the filteredAlbums template
      $("#albumName").html(templates.formAlbums({albums:uniqueAlbums}));
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
        }
      };

      console.log("newSong",newSong);

      // return false;

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


  }
);
