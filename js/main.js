
geotab.addin.SupportInfo = function(api, state) {


 var companyName = document.getElementById("companyName"),
	companyPhone = document.getElementById("companyPhone"),
	companyEmail = document.getElementById("companyEmail"),
	tempEmail="",
	tempPhone="",
	newDate="",
	driver = "",
	buton1 = document.getElementById("button1"),
	button2=	 document.getElementById("button2"),
	button3=	document.getElementById("button3"),
	button4=	document.getElementById("button4"),
	button5=	document.getElementById("button5");
	
	
		var char="";

	var formatPhone = function(obj) {
		var numbers = obj.replace(/\D/g, ''),
			//char = {1:'(',4:') ',7:' - '};
		obj = '';
		for (var i = 0; i < numbers.length; i++) {
			obj += (char[i]||'') + numbers[i];
			
		}
		
		companyPhone.innerHTML = obj;
	}

	
		var newId = "aeHu9SSwUtU6DFUDvvS2Kqw";
		//var newId = result[0].id;
			api.call("Get",
			{
			  "typeName": "AddInData",
			  "search": {
				"addInId": newId,
				"selectClause": "customer"
			  }
			},function(results){
				
		    console.log(results);
		    console.log(results.length);
		    if (results[0].hasOwnProperty('data')){
			console.log("Yes info is saved")
			}else{
				results= [];
			}
			
			
		    if(results.length === 0){
		        console.log("Yes");
		    api.call("Get", {
            "typeName": "SystemSettings"
            
            }, function(result) {
           
           
           tempEmail =result[0].resellerInfo.contactEmail
		   companyEmail.innerHTML = tempEmail;
		   
		   tempPhone =  result[0].resellerInfo.telephoneNumber;
            
			if(result[0].resellerInfo.name =="Descartes Systems Group"){
				companyPhone.innerHTML = "";
				}else{
                
           var phone = new String(tempPhone);
			if(phone.length>10&& phone.length<=18){
			//phone.push(1)
			char = {1:'(',4:') ',7:' - '};
			formatPhone(tempPhone);
			}else if(phone.length>18){
				char = result[0].resellerInfo.telephoneNumber;
				if(result[0].resellerInfo.name =="Descartes Systems Group"){
				companyPhone.innerHTML = "";
				}else{
				companyPhone.innerHTML = result[0].resellerInfo.telephoneNumber;
			}
			}			
			else{
				char = {0:'(',3:') ',6:' - '};
				formatPhone(tempPhone);
			}	
			  
			}
			
                
            },function(error){
               console.log(error) 
            });
		        
		        
		        
		    }else{
		   //alert("Test");
			var myData = JSON.parse(results[0].data);
			
			
			tempEmail = myData.email
		   companyEmail.innerHTML = tempEmail;
		   
		   tempPhone =  myData.phoneNumber;
                
                
           var phone = new String(tempPhone);
			if(phone.length>10){
			//phone.push(1)
			char = {1:'(',4:') ',7:' - '};

			}else{
			char = {0:'(',3:') ',6:' - '};
			}  
			
			formatPhone(tempPhone);
			}
			});
	
	
var date= new Date()
	newDate = date.toLocaleString();
	
	//email function
	


//phone function
document.getElementById("call").addEventListener("click", myFunction2);

function myFunction2() {
	window.open('tel:'+tempPhone, '_system');
}

document.getElementById("email").addEventListener("click", myFunction);

	function myFunction() {
	window.open('mailto:'+tempEmail+'?subject=Inquiry&body=Hello this is driver '+driver + ' Incident happened on '+ newDate +' I require assistance please call or email me back at:', '_system');
	}	
		
	function getOS() {
		var userAgent = window.navigator.userAgent,
			platform = window.navigator.platform,
			macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
			windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
			iosPlatforms = ['iPhone', 'iPad', 'iPod'],
			os;
	  
		if (macosPlatforms.indexOf(platform) !== -1) {
		  //os = 'Mac OS';
		} else if (iosPlatforms.indexOf(platform) !== -1 && api.mobile.exists() && api.mobile.getVersion() !== "4.1.0" ) {
			  document.getElementById("button1").innerHTML = "Coming Soon";
			  button1.disabled = true;
			  button1.style.backgroundColor="grey";
			  button1.style.borderColor="grey";
			  document.getElementById("button2").innerHTML = "Coming Soon";
			  button2.disabled = true;
			  button2.style.backgroundColor="grey";
			  button2.style.borderColor="grey";
			  document.getElementById("button3").innerHTML = "Coming Soon";
			  button3.disabled = true;
			  button3.style.backgroundColor="grey";
			  button3.style.borderColor="grey";
			  document.getElementById("button4").innerHTML = "Coming Soon";
			  button4.disabled = true;
			  button4.style.backgroundColor="grey";
			  button4.style.borderColor="grey";
			  document.getElementById("button5").innerHTML = "Coming Soon";
			  button5.disabled = true; 
			  button5.style.backgroundColor="grey";
			  button5.style.borderColor="grey";			 
	  
		   
		  alert('Update Geotab Drive App to 4.1 to get all content');
	  
		 } else if (windowsPlatforms.indexOf(platform) !== -1) {
			 
	  
		  //os = 'Windows';
		} 
		else if (/Android/.test(userAgent)) {
		  //os = 'Android'; 
		} 
		else if (!os && /Linux/.test(platform)) {
		  //os = 'Other';
		} 
		return
	   
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
				var currentUser = session.userName;
				api.call("Get", {
					"typeName" : "User",
					"search" : {
						"name" : currentUser
					}
				}, function (result) {
					if (result.length === 0) {
						alert( "Unable to find currently logged on user.");
					}
				driver = result[0].firstName + " " + result[0].lastName;	
				addInReady();

				}, function (error) {
					console.log( "Error while trying to load currently logged on user. " + error);
				});
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
					getOS();
				
					
					
					
					

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
 

