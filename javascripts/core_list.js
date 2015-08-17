define(function(require) {
  var $ = require("jquery");
  var getUnique = require("es6!getUnique");
  var templates = require("es6!getTemplates");
  var eventHandlers = require("eventHandlers");

  var allSongsObject = {};
  var allSongsArray = [];
  var originalSongsArray = [];
  var unique;

  // Initialize the event handlers
  eventHandlers.init({songArray: originalSongsArray});

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

    // Get unique albums and artists from the song array
    unique = getUnique(allSongsArray);

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

    // Bind the song object to the song list template
    $("#songList").html(templates.songTpl(allSongsObject));

    // Bind the unique artists to the filteredArtists template
    $("#artists").html(templates.artistTpl({artists:unique.artists}));

    // Bind the unique albums to the filteredAlbums template
    $("#albums").html(templates.albumTpl({albums:unique.albums }));

    // Update event handlers with new data
    eventHandlers.updateSongs(originalSongsArray);

  });
});
