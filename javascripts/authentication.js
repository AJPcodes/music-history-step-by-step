define(function(require) {
  var Q = require("q");
  var oauth = require("oauth");

  function authentication() {
    this.uid = null;
  }

  authentication.prototype.getUid = function() {
    return this.uid;
  };

  authentication.prototype.setUid = function(newId) {
    this.uid = newId;
  };

  authentication.prototype.github = function() {
    var deferred = Q.defer();

    // Detect if the user is already logged in
    OAuth.initialize("_8s3859yzGbKnSVtK9YHxwSamjw");

    OAuth.popup('github', { cache: true })
      .done(function(result) {
        result.me()
          .done(function (response) {
            this.setUid(response.id);
            deferred.resolve(response.id);
          }.bind(this))
          .fail(function (err) {
            deferred.reject(response.id);
          }.bind(this));
      }.bind(this))
      .fail(function (err) {
        deferred.reject(err);
        this.setUid(null);
      }.bind(this));

    return deferred.promise;
  };

  return new authentication();
});