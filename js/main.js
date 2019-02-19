
geotab.addin.SupportInfo = function(api, state) {


	var driver = "",
		driverid = "",
		sessionID = "",
		server ="",
		credentials,
		databaseName="",
		mygeotab_button = document.getElementById("mygeotab_button"),
		downloadExcelButton=	 document.getElementById("downloadExcelButton");
		
		

	document.getElementById("mygeotab_button").addEventListener("click", openMyGeotabFunction);
	document.getElementById("downloadExcelButton").addEventListener("click", downloadExcelFunction);

	function openMyGeotabFunction() {
		var url = "https://"+server+"/geotab/checkmate/ui/hosLogs.html#credentials:(database:"+databaseName+",sessionId:"+sessionID+",userName:"+driver+"),dateRange:(endDate:"+(new Date().toISOString())+",startDate:"+(((new Date()).getDate()-7).toISOString())+"),driver:"+driver+",includeExemptions:!f";
		window.open(url, "_blank");

	}
	

	function downloadExcelFunction() {


		var reportArgs = {
			"reportArgument":{
				"includeModifications":false,
				"reportArgumentType":"HosLog",
				"fromUtc":(((new Date()).getDate()-7).toISOString()),
				"toUtc":(new Date().toISOString()),
				"usersFilter":{"id":driverid},
				"returnNoUserResultOnly":false,
				"devices":null
			},
			"template":{"id":"ReportTemplateAdvancedHOSLogId"},
			"name":"Advanced",
			"filter":[{"id":"GroupCompanyId"}]
		};

		var authenticate = function() {
			return new Promise((resolve, reject) => {
				resolve(credentials);
			});
		};

		var getReport = function(server, request) {
			let args = JSON.stringify(request);
			let host = "https://" + server + "/apiv1/";
			let url = host + "?" + args;
			
			return fetch(host, {
				method: "POST",
				body: args
			})
			.then(response => response.blob());
		};

		authenticate().then(credentials => {
			return getReport(server, {
				method: "GetExcel",
				params: {
					"output":"excel",
					"isWebViewApp":false,
					"args": reportArgs,
					credentials: credentials
				}
			});
		}).then(blob => {
			let link = document.createElement("a");
			link.textContent = "Get report";
			link.target = "_blank";
			link.href = URL.createObjectURL( blob );
			link.download =  'data.xlsx';

			link.dispatchEvent(new MouseEvent("click"));
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

				api.getSession(function (session) {
					driver = session.userName;
					server = session.server;
					credentials = session.credentials;
					databaseName = session.database;
					sessionID = session.id;

					api.call("Get", {
						"typeName": "User",
						"search": {
							"name":driver
						}
					}, function(result) {
						driverid = result[0].name;
					}, function(e) {
						console.error("Failed:", e);
					});
					

				}, function (error) {
					console.log( "Error while trying to load currently logged on user. " + error);
				});

						
					
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
					
					console.log(state);

					api.getSession(function (session) {
						driver = session.userName;
						server = session.server;
						credentials = session.credentials;
						databaseName = session.database;
						sessionID = session.id;
	
						api.call("Get", {
							"typeName": "User",
							"search": {
								"name":driver
							}
						}, function(result) {
							driverid = result[0].name;
						}, function(e) {
							console.error("Failed:", e);
						});
						
	
					}, function (error) {
						console.log( "Error while trying to load currently logged on user. " + error);
					});
					
					
					
					

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
 

