define(function(require) {
  var Q = require("q");
  var auth = require("authentication");

  return function() {
    var deferred = Q.defer();

    // Detect if the user is already logged in
    OAuth.initialize("_8s3859yzGbKnSVtK9YHxwSamjw");

    OAuth.popup('github', { cache: true })
      .done(function(result) {
        result.me()
          .done(function (response) {
            auth.setUid(response.id);
            deferred.resolve(response.id);
          })
          .fail(function (err) {
            deferred.reject(response.id);
          });
      })
      .fail(function (err) {
        deferred.reject(err);
        auth.setUid(null);
      });

    return deferred.promise;
  };
});
