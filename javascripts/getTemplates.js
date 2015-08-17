import * as songTpl from "hbs!../templates/songs";
import * as artistTpl from "hbs!../templates/filteredArtists";
import * as albumTpl from "hbs!../templates/filteredAlbums";
import * as newArtistTpl from "hbs!../templates/formArtists";
import * as newAlbumTpl from "hbs!../templates/formAlbums";

export default {
  songTpl,
  artistTpl,
  albumTpl,
  newArtistTpl,
  newAlbumTpl
}

// define(function(require) {
//   return {
//     songTpl: require("hbs!../templates/songs"),
//     artistTpl: require("hbs!../templates/filteredArtists"),
//     albumTpl: require("hbs!../templates/filteredAlbums"),
//     newArtistTpl: require("hbs!../templates/formArtists"),
//     newAlbumTpl: require("hbs!../templates/formAlbums")
//   };
// });
