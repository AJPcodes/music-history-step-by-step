define(function(require) {
  var fb = require("firebase");
  var Q = require("q");
  var auth = require("authentication");

  return function() {
    var deferred = Q.defer();

    // Detect if the user is already logged in
    var x = OAuth.initialize('_8s3859yzGbKnSVtK9YHxwSamjw');
    console.log("OAuth",OAuth);

    OAuth.popup('github', { cache: true })
      .done(function(result) {
        result.me()
          .done(function (response) {
            console.log('response: ', response);
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


  // var user_authenticated = false;
  // var ref = new Firebase("https://nss-demo-instructor.firebaseio.com");

  // return function() {
  //   // Detect if the user is already logged in
  //   var authData = ref.getAuth();

  //   // If there is no token key on the authData object, 
  //   // authenticate with Github OAuth
  //   if (authData === null) {
  //     ref.authWithOAuthPopup("github", function(error, authData) {
  //       if (error) {
  //         console.log("Login Failed!", error);
  //       } else {
  //         console.log("Authenticated successfully with payload:", authData);
  //         auth.setUid(authData.uid);
  //         user_authenticated = true;
  //       }
  //     });

  //   // User already authenticated, store uid and show data
  //   } else {
  //     auth.setUid(authData.uid);
  //     user_authenticated = true;
  //   }

  //   return user_authenticated;
  // }


});