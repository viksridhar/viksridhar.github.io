geotab.addin.map = (elt, service) => {

  elt.innerHTML = `<h3>Driver Availability</h3><form id=availabilityForm><label for=userName>Driver name</label><br><input id=userName required value=Mike> <button id="a">Find!</button><br></form><ul id=results></ul>`


var getDriverAvailability = function(users) {
        // Build a multiCall containing each drivers' Get<DutyStatusAvailability>
        var calls = users.map(function (item) {
            return [ "Get", {
                "typeName": "DutyStatusAvailability",
                "search": {
                    "userSearch": { "id": item.id }
                }
            } ];
        });

        // Perform API calls
        api.multiCall(calls, function(results) {
            results.forEach(function (result, i) {
                var availabilities, ul, li;
                if (result[0]) {
                    
                    console.log(result);
                    li = document.createElement("li");
                    li.innerHTML = users[i].name;
                    resultsList.appendChild(li);

                    // Each result may have a list of DutyStatusAvailabilityDuration objects
                    availabilities = result[0].availabilities;
                    if (!availabilities) {
                        return;
                    }

                    ul = document.createElement("ul");
                    availabilities.forEach(function (availability) {
                        var li = document.createElement("li");
                        li.innerHTML = availability.type + " - Duration: " + availability.duration;
                        ul.appendChild(li);
                    });
                    resultsList.appendChild(ul);
                }
            });
        });
    },
    userNameInput = document.getElementById("userName"),
    availabiltyForm = document.getElementById("availabilityForm"),
    resultsList = document.getElementById("results");

// Add event listener of form submition
document.getElementById("a").addEventListener("click", function(e) {
    e.preventDefault();
    resultsList.innerHTML = "";

    // API call to get User results for the name entered
    api.call("Get", {
        "typeName": "User",
        search: {
            name: "%" + userNameInput.value + "%"
        }
    }, function(users) {
        if (users.length == 0) {
            console.log("No users not found!");
            return;
        }

        // Get the availability for the returned users
        getDriverAvailability(users);
    });
}, false);
/*opt nomin*/


};

  // body...

