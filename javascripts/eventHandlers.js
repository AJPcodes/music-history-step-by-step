define(function(require) {
  var $ = require("jquery");
  var _ = require("lodash");
  var templates = require("es6!getTemplates");
  var getUnique = require("es6!getUnique");

  var config = {
    originalSongsArray: []
  };

  var eventHandlers = function() { };

  eventHandlers.prototype.updateSongs = function(songArray) {
    config.originalSongsArray = songArray;
  };

  eventHandlers.prototype.init = function(options) {

    // Handle deleting songs
    $(document).on("click", "a[id^='delete#']", function() {
      $.ajax({
        url: "https://nss-demo-instructor.firebaseio.com/songs/" + this.id.split("#")[1] + ".json",
        method: "DELETE",
        contentType: "application/json"
      }).done(function(song){
        console.log("Successfully deleted song");
      });
    });

    // Handle the user click on the "Clear Filter" button
    $("#clearFilter").click(function(e) {

      // Here's where I reset the filtered array back to 
      // the value of the copy I created above
      allSongsArray = config.originalSongsArray;
      var unique = getUnique(config.originalSongsArray);

      $("#songList").html(templates.songTpl({songs: config.originalSongsArray}));

      // Create unique artists again before binding to template
      $("#artists").html(templates.artistTpl({artists:unique.artists}));

      // Create unique albums again
      $("#albums").html(templates.albumTpl({albums:unique.albums}));

    });

    /*
      When user selects an artist, filter the album select element
      and the song list accordingly
     */
    $(document).on("click", "#artists li > a", function(e){
      var selectedArtist = this.innerHTML;
      var matchingAlbums = _.chain(config.originalSongsArray)
                            .filter(function(song) {
                              return song.artist === selectedArtist;
                            })
                            .uniq('album.name')
                            .pluck('album')
                            .value();
      $("#albums").html(templates.albumTpl({albums:matchingAlbums}));

      allSongsArray = _.filter(config.originalSongsArray, function(song) {
        return song.artist === selectedArtist;
      });
      $("#songList").html(templates.songTpl({songs:allSongsArray}));

    });

    /*
      When the user selects an album, filter the artist select element
      and the song list accordingly
     */
    $(document).on("click", "#albums li > a", function(e){
      var selectedYear = $(this).attr("year");
      var selectedAlbum = this.innerHTML;

      var matchingArtists = _.chain(config.originalSongsArray)
                            .filter(function(song) {
                              return song.album.name === selectedAlbum;
                            })
                            .uniq('artist')
                            .pluck('artist')
                            .value();
      $("#artists").html(templates.artistTpl({artists:matchingArtists}));

      allSongsArray = _.filter(config.originalSongsArray, function(song) {
        return song.album.name === selectedAlbum;
      });
      $("#songList").html(templates.songTpl({songs:allSongsArray}));
    });
  };

  return new eventHandlers();

});