define(function(require) {
  var $ = require("jquery");
  
  $(".add-song").click(function () {
    $(".list-songs").parent().removeClass("active");
    $(this).parent().addClass("active");
  });

  $(".list-songs").click(function () {
    $(".add-song").parent().removeClass("active");
    $(this).parent().addClass("active");
  });
  
});