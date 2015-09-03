define(function(require) {
  var auth = require("authentication");
  var MusicHistory = require("MusicHistory");

  var $html = angular.element(document.getElementsByTagName('body')[0]);
  angular.element($html).ready(function() {
    angular.bootstrap(document, ['MusicHistoryApp']);
  });
});
