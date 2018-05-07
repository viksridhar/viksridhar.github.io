geotab.addin.enterOdometer = function(api, state) {

	var updateOdoButton = document.getElementById("shs-switcherButton"),
		odometerValue = document.getElementById("odometerValue"),
		deviceObject,
		currentDevice = document.getElementById("current"),
		originalColor = document.getElementById("current").style.color,
		originalMiles,
		htmlEscape = function (str) {
		return String(str || "")
			.replace(/&/g, "&amp;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#39;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;");
	},
		getDeviceAndUpdate = function(){
			var enteredOdometer  = document.getElementById("odometerValue").value;

			if(isNaN(enteredOdometer))
			{
				document.getElementById("current").innerHTML = "You must enter a number!";
				document.getElementById("current").style.color = "red";
			}
			else if(enteredOdometer==""){
				document.getElementById("current").innerHTML = "You must enter a number!";
				document.getElementById("current").style.color = "red";	
			}
			else{

				var enteredOdometerInMeters = (enteredOdometer*1609.344).toString();

				api.call("Add", {
					"typeName": "StatusData",
					"entity": {
						"diagnostic": {
							"id": "DiagnosticOdometerAdjustmentId"
						},
						"device": {
							"id": deviceObject.id
						},
						"dateTime": new Date().toISOString(),
						"data": enteredOdometerInMeters

					}
				}, function(result) {

					var auditComment = 'Device: '+ deviceObject.name + ' (ID: '+deviceObject.id+'), Odometer updated to: '+enteredOdometer+'mi from '+originalMiles+'mi'

					api.call("Add", {
						"typeName": "Audit",
						"entity": {
						  "name": "DeviceSet",
						  "comment": auditComment

						}
					}, function(result) {
						console.log("Done: ", result);
					}, function(e) {
						console.error("Failed:", e);
					});
					document.getElementById("current").innerHTML = "Success! Updated odometer reading: "+enteredOdometer+" miles";
					document.getElementById("odometerValue").value="";
					document.getElementById("current").style.color = "green";
					updateOdoButton.disabled = true;
					setTimeout(function(){updateOdoButton.disabled = false;}, 6000);
				}, function(e) {
					if(e.data.type =="NetworkError"){
						document.getElementById("current").innerHTML = "You need to be online in order to update your odometer reading!";
						document.getElementById("current").style.color = "red";								
					}
					else{
						alert("Failed:", e);
					}

				});
			}
		},

		//callbackFunc
		getActiveUserOffline = function() {
			api.getSession(function(credentials, server) {
				if (activeUser === null ||activeUser.name !== credentials.userName) {
					api.call("Get", {
						typeName: "User",
						search: {
							name: credentials.userName
						}
					}, function(result) {
						if (!result || !result.length) {
							var msg = "Could not find user: " + credentials.userName;
							consoleErr(msg);
							api.mobile.notify(msg, "Error");
						}
						activeUser = result[0];
						console.log(activeUser);

					}, function(error) {
						consoleErr(error);
						api.mobile.notify(error, "Error");
					});
				}
			});
		}



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
			// MUST call addInReady when done any setup
			addInReady();
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
			var deviceId = state.device.id;
			console.log("DeviceId: ", deviceId);
			api.call("Get", {
				"typeName": "Device",
				"search": {
					"id":deviceId
				}
			}, function(result) {
				deviceObject=result[0];


				api.call("Get", {
					"typeName": "StatusData",
					"search": {

					  "deviceSearch": {
						"id": deviceId
					  },
					  "diagnosticSearch": {
						"id": "DiagnosticOdometerAdjustmentId"
					  },
					  "fromDate": new Date().toISOString(),
					  "toDate": new Date().toISOString()

					}
				}, function(result) {
					originalMiles=parseInt((parseInt(result[0].data))/1609.344);
					document.getElementById("current").innerHTML = "Current Vehicle: "+htmlEscape(deviceObject.name)+", Current odometer reading: "+originalMiles+" miles";
					

				}, function(e) {

					if(e.data.type =="NetworkError"){
						document.getElementById("current").innerHTML = "You need to be online in order to update your odometer reading!";
						document.getElementById("current").style.color = "red";								
					}
					else{
						alert("Failed:", e);
					}


				});


			}, function(e) {
				if(e.data.type =="NetworkError"){
					document.getElementById("current").innerHTML = "You need to be online in order to update your odometer reading!";
					document.getElementById("current").style.color = "red";								
				}
				else{
					alert("Failed:", e);
				}
			});
			
			updateOdoButton.addEventListener("click", getDeviceAndUpdate);

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

			updateOdoButton.removeEventListener("click", getDeviceAndUpdate);
			document.getElementById("current").style.color=originalColor;
			document.getElementById("odometerValue").value="";

		}
	};
};