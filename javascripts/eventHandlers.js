define(["jquery", "lodash", "getTemplates", "getUnique"], function($, _, templates, unique) {

  var config = {
    originalSongsArray: []
  };

  var eventHandlers = function() {

  };

  eventHandlers.prototype.updateSongs = function(songArray) {
    config.originalSongsArray = songArray;
  };

  eventHandlers.prototype.init = function(options) {
    // Handle the user click on the "Clear Filter" button
    $("#clearFilter").click(function(e) {

      // Here's where I reset the filtered array back to 
      // the value of the copy I created above
      allSongsArray = config.originalSongsArray;

      $("#songList").html(templates.songs({songs: allSongsArray}));

      // Create unique artists again before binding to template
      var uniqueArtists = unique(allSongsArray).uniqueArtists;
      $("#artists").html(templates.artists({artists:uniqueArtists}));

      // Create unique albums again
      var uniqueAlbums = unique(allSongsArray).uniqueAlbums;
      $("#albums").html(templates.albums({albums:uniqueAlbums}));

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
      $("#albums").html(templates.albums({albums:matchingAlbums}));

      allSongsArray = _.filter(config.originalSongsArray, function(song) {
        return song.artist === selectedArtist;
      });
      $("#songList").html(templates.songs({songs:allSongsArray}));

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
      $("#artists").html(templates.artists({artists:matchingArtists}));

      allSongsArray = _.filter(config.originalSongsArray, function(song) {
        return song.album.name === selectedAlbum;
      });
      $("#songList").html(templates.songs({songs:allSongsArray}));
    });
  };

  return new eventHandlers;

});