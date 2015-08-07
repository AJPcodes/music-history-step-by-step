define(function() {
  return {
    querySongs: function(fnRefFromMainJS) {
      $.ajax({
        url: "https://nss-demo-instructor.firebaseio.com/.json"
      }).done(
        // Send a callback to jQuery to execute when it's done
        function(data) {
          // Execute the callback function that was sent to me
          console.log("songs array from Firebase: ", data);
          fnRefFromMainJS.call(this, data);
        }
      );

    }
  };
});