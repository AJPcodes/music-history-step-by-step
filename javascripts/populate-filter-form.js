define(["jquery"], function($) {
  return function(dataObj) {
    console.log("Populate album list select");
    require(['hbs!../templates/artists'], function(tmpl) {
      $("#artists").append(tmpl(dataObj));
    });
    console.log("Populate artist list select");
    require(['hbs!../templates/albums'], function(tmpl) {
      $("#albums").append(tmpl(dataObj));
    });
  };
});
