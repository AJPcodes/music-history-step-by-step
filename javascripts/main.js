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
    // var moreSongsLoaded = false;

    $.material.init();


    // console.log("adding a click event handle for the more songs button");
    // $(document).on("click", "#loadMoreSongs", function(e) {
      
    //   if (!moreSongsLoaded) {
    //     moreSongsLoaded = true;

    //     moreSongs.querySongs(function(songObject) {
    //       console.log("songs array sent back from moreSongs module: ", songObject);

    //       console.log("Now binding the song array to the Handlebar template");
    //       require(['hbs!../templates/songs'], function(songTemplate) {
    //         $("#songList").append(songTemplate(songObject));
    //       });

    //       filterForm(songObject);
    //     });  
    //   } else {
    //     $('#alreadyLoaded').modal();
    //   }

    // });
  }
);
