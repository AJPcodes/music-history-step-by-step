import * as _ from "lodash";

export default function(allSongsArray) {
  let artists = _.chain(allSongsArray).uniq("artist").pluck("artist").value();
  let albums = _.chain(allSongsArray).uniq("album.name").pluck("album").value();

  return { artists, albums };
}
