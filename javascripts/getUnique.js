define(["lodash"], function(_) {
  return function(allSongsArray) {
    var uniqueArtists = _.chain(allSongsArray)
                         .uniq("artist")
                         .pluck("artist")
                         .value();
    var uniqueAlbums = _.chain(allSongsArray)
                        .uniq('album.name')
                        .pluck('album')
                        .value();
    return {
      uniqueArtists: uniqueArtists,
      uniqueAlbums: uniqueAlbums
    }
  };
});