geotab.addin.launchAddIn = function(api, state) {

	var launchAddInButton = document.getElementById("shs-switcherButton");

	var launchIntent = function(){
	
		launchAddInButton.addEventListener("click", function() {
			window.open("intent://com.tmw.d2link","_system");
			history.go(-1);
		}, false);
		
	};


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
			window.open("intent://com.tmw.d2link","_system");
			history.go(-1);
			launchIntent();

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
