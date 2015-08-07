define(["get-initial-songs", "populate-filter-form"], function(initialSongs, filterForm) {

  initialSongs.querySongs(function(songObject) {
    require(['hbs!../templates/songs'], function(songTemplate) {
      $("#songList").html(songTemplate(songObject));
    });

    filterForm(songObject);
  });

});