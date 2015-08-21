define(function(require) {
  var $ = require("jquery");
  
  $(".add-song").click(function () {
    $(".song-list").addClass("hidden");
    $(".entry-form").removeClass("hidden");

    $(".list-songs").parent().removeClass("active");
    $(this).parent().addClass("active");
  });

  $(".list-songs").click(function () {
    $(".song-list").removeClass("hidden");
    $(".entry-form").addClass("hidden");

    $(".add-song").parent().removeClass("active");
    $(this).parent().addClass("active");
  });
})