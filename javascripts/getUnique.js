import * as _ from "lodash";

export default function(allSongsArray) {
  let artists = _.chain(allSongsArray).uniq("artist").pluck("artist").value();
  let albums = _.chain(allSongsArray).uniq('album.name').pluck('album').value();

  return { artists, albums }
};

// define(function(require) {
//   var _ = require("lodash");

//   return function(allSongsArray) {
//     var artists = _.chain(allSongsArray).uniq("artist").pluck("artist").value();
//     var albums = _.chain(allSongsArray).uniq('album.name').pluck('album').value();

//     return { artists: artists, albums: albums }
//   };
// });