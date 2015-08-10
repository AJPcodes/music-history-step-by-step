define(["hbs",
        "hbs!../templates/songs",
        "hbs!../templates/filteredArtists",
        "hbs!../templates/filteredAlbums"], 
function(Handlebars, songTemplate, artistTemplate, albumTemplate) {

  var templates = {};
  templates.songs = songTemplate;
  templates.artists = artistTemplate;
  templates.albums = albumTemplate;

  return templates;
});