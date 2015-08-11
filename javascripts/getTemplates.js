define(["hbs",
        "hbs!../templates/songs",
        "hbs!../templates/filteredArtists",
        "hbs!../templates/formArtists",
        "hbs!../templates/formAlbums",
        "hbs!../templates/filteredAlbums"], 
function(Handlebars, songTemplate, artistTemplate, formArtistTemplate, formAlbumTemplate, albumTemplate) {

  var templates = {};
  templates.songs = songTemplate;
  templates.artists = artistTemplate;
  templates.formArtists = formArtistTemplate;
  templates.formAlbums = formAlbumTemplate;
  templates.albums = albumTemplate;

  return templates;
});