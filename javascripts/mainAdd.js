requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
    'material': '../bower_components/bootstrap-material-design/dist/js/material.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'material': ['bootstrap']
  }
});

requirejs(
  ["jquery", "hbs", "bootstrap", "material", "loadSongs"], 
  function($, Handlebars, bootstrap, material, loadSongs) {
    var selectedArtist = "", selectedAlbum = "", selectedYear = "";

    $.material.init();

    $(document).on("click", "#artists li > a", function(e){
      selectedArtist = this.innerHTML;
    });

    $(document).on("click", "#albums li > a", function(e){
      selectedAlbum = this.innerHTML;
      selectedYear = $(this).attr("year");
    });

    $("#addSong").click(function(e) {

      var newSong = {
        "name": $("#songName").val(),
        "artist": selectedArtist || $("#artistName").val(),
        "album": {
          "name": selectedAlbum || $("#albumName").val(),
          "year": selectedYear || $("#albumYear").val()
        }
      };

      console.log("newSong",newSong);

      // return false;

      $.ajax({
        url: "https://nss-demo-instructor.firebaseio.com/songs.json",
        method: "POST",
        data: JSON.stringify(newSong)
      }).done(function(addedSong) {
        selectedArtist = "";
        selectedAlbum = "";
        selectedYear = "";
        console.log("Your new song is", addedSong);
      });
    });


  }
);
