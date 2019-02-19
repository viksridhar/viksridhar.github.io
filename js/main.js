geotab.addin.downloadHOSLogs = function(api, state) {

/* var server = currentCredentials.server;
database = currentCredentials.credentials.database;
username = currentCredentials.credentials.username;
credentials = currentCredentials.credentials;
sessionid = currentCredentials.credentials.sessionId; */

var server, database,username,credentials,sessionid, driverid;



return {
		/**
		* initialize() is called only once when the Add-In is first loaded. Use this function to initialize the
		* Add-In's state such as default values or make API requests (MyGeotab or external) to ensure interface
		* is ready for the user.
		* @param {object} api - The GeotabApi object for making calls to MyGeotab.
		* @param {object} state - The page state object allows access to URL, page navigation and global group filter.
		* @param {function} addInReady - Call this when your initialize route is complete. Since your initialize routine
		*        might be doing asynchronous operations, you must call this method when the Add-In is ready
		*        for display to the user.
		*/
		initialize: function(api, state, addInReady) {

			api.getSession(function (session) {
				var currentUser = session.userName;

			});
			
			api.getCurrentCredentials(function (currentCredentials) {
				server = currentCredentials.server;
				database = currentCredentials.credentials.database;
				username = currentCredentials.credentials.username;
				credentials = currentCredentials.credentials;
				sessionid = currentCredentials.credentials.sessionId;

				api.call("Get", {
					"typeName" : "User",
					"search" : {
						"name" : username
					}
				}, function (result) {
					if (result.length === 0) {
						alert( "Unable to find currently logged on user.");
					}
					driverid = result[0].id;
					addInReady();	

				}, function (error) {
					console.log( "Error while trying to load currently logged on user. " + error);
				});
			})
			
		},

		/**
		* focus() is called whenever the Add-In receives focus.
		*
		* The first time the user clicks on the Add-In menu, initialize() will be called and when completed, focus().
		* focus() will be called again when the Add-In is revisited. Note that focus() will also be called whenever
		* the global state of the MyGeotab application changes, for example, if the user changes the global group
		* filter in the UI.
		*
		* @param {object} api - The GeotabApi object for making calls to MyGeotab.
		* @param {object} state - The page state object allows access to URL, page navigation and global group filter.
		*/
		focus: function(api, state) {

			api.getSession(function (session) {
				var currentUser = session.userName;

			});
			
			api.getCurrentCredentials(function (currentCredentials) {
				server = currentCredentials.server;
				database = currentCredentials.credentials.database;
				username = currentCredentials.credentials.username;
				credentials = currentCredentials.credentials;
				sessionid = currentCredentials.credentials.sessionId;

				api.call("Get", {
					"typeName" : "User",
					"search" : {
						"name" : username
					}
				}, function (result) {
					if (result.length === 0) {
						alert( "Unable to find currently logged on user.");
					}
					driverid = result[0].id;	

				}, function (error) {
					console.log( "Error while trying to load currently logged on user. " + error);
				});
			})
			

		},
		/**
		* blur() is called whenever the user navigates away from the Add-In.
		*
		* Use this function to save the page state or commit changes to a data store or release memory.
		*
		* @param {object} api - The GeotabApi object for making calls to MyGeotab.
		* @param {object} state - The page state object allows access to URL, page navigation and global group filter.
		*/
		blur: function(api, state) {


		}
	};
};

