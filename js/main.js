    var currentUserName = "";

    geotab.addin.driverAppPenic = function (api, state) {

      "use strict";

 

      return {

        initialize: function (api, state, callback) {

          console.log(api);

          api.getSession(function (session) {

            console.log(session);

            currentUserName = session.userName;

          });

 

          if (callback) {

            callback();

          }

        },

        focus: function (api, state) {

          api.getSession(function(session) {

            currentUserName = session.userName;
            initiateApp(currentUserName);

          });
          
          

        },

        blur: function () {

          api.getSession(function (session) {

            currentUserName = session.userName;

          });

        }

      };

    };

 

    //function setAppLink() {

    //  var url = "intent://driverapp-droid.zonedefense.cloud?zdDriverAppUserName=" + currentUserName + "#Intent;scheme=http;package=com.zd_driver.dev;end";

    //  var anchorTag = document.getElementById("paniclink");

    //  anchorTag.href = url;

    //}

 

    function initiateApp(currentUserName) {

      var url = "intent://driverapp-droid.zonedefense.cloud?zdDriverAppUserName=" +currentUserName +"#Intent;scheme=http;package=com.zd_driver;end";

      //window.open(url);
      window.open(url,"_system");

    }
