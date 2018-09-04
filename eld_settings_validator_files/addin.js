geotab.addin.eldSettingsValidator = function(api, state) {
        var userList = [],
            vehicleList = [],
            servers = "",
            database = "",
            refresh = document.getElementById("refresh"),
            userReport = document.getElementById("userReport"),
            vehicleReport = document.getElementById("vehicleReport"),
            button = document.getElementById("toolTipHelp");

        var vehicle = function() {
            api.call("Get", {
                "typeName": "Device"
            }, function(results) {
                for (var i = 0; i < results.length; i++) {
					var ratePlan = "No Plan";
					var licensePlateInfo = "Yes";
					var vinInfo = "Yes";
					var autoHOS = "Unknown";
					var nameVehicle = "none";
					
                    if (results[i].serialNumber !== "000-000-0000") {
                        if (results[i].vehicleIdentificationNumber === undefined || results[i].vehicleIdentificationNumber === null || results[i].vehicleIdentificationNumber === "") {
                            vinInfo = "No";
                        }
                        if (results[i].licenseState === undefined || results[i].licenseState === null || results[i].licenseState === "" || results[i].licensePlate === undefined || results[i].licensePlate === null || results[i].licensePlate === "") {
                            licensePlateInfo = "No";
                        }
                        if (results[i].devicePlans !== undefined) {
                            ratePlan = results[i].devicePlans[0];
                        }
                        else {
                            ratePlan = "Unknown";
                        }
                        if (results[i].customFeatures !== undefined) {
                            if (results[i].customFeatures.autoHos == true) {
                                autoHOS = "ON";
                            } else {
                                autoHOS = "OFF"
                            }
                        }
                        if (results[i].customFeatures == undefined) {
                            autoHOS = "Automatic"
                        }
                        if (vinInfo == "No" || licensePlateInfo == "No" || ratePlan=="Base" || ratePlan == "Unknown" || autoHOS !== "ON") {
                            nameVehicle = results[i].name;
                            vehicleList.push({ 0: nameVehicle, 1: vinInfo, 2: licensePlateInfo, 3: ratePlan, 4: autoHOS, 5: results[i].id });
                            vinInfo = "Yes";
                            ratePlan = "No Plan";
                            licensePlateInfo = "Yes";
                            autoHOS = "Unknown"
                            nameVehicle = "none";
                        } else {
                            vinInfo = "Yes";
                            ratePlan = "No Plan";
                            licensePlateInfo = "Yes";
                            autoHOS = "Unknown"
                            nameVehicle = "none";	
                        }
                    } else {
                        console.log("This Device is historical " + results[i].name);
                        vinInfo = "Yes";
                        ratePlan = "No Plan";
                        licensePlateInfo = "Yes";
                        autoHOS = "Unknown"
                        nameVehicle = "none";
                    }
                }

                var table2 = document.getElementById("myTable2");

                for (row = 0; row < vehicleList.length; row++) {
                    //var tbody = document.createElement('tbody');
                    tr = document.createElement('tr');
                    tr = table2.insertRow(1);
                    //tr.className = "row"
                    td = document.createElement('td');
                    div2 = document.createElement('div');
                    div2.className = "g-row checkmateListBuilderRow";
                    for (cell = 0; cell < 6; cell++) {
                        if (cell != 5) {
                            a = document.createElement('a');
                            //td = tr.insertCell(cell);
                            a.className = "g-main xs-col activeElement sm-part-9 md-part-10";
                            div1 = document.createElement('div');
                            div1.className = "g-name";

                            a.appendChild(div1);

                            div1.textContent = vehicleList[row][cell];
                            div2.appendChild(a);
                        } else {
                            var createClickHandler = function(arg) {
                                return function() {
                                    window.location.href = "https://" + servers + "/" + database + "/#device,id:" + arg;
                                };
                            }
                            var id = vehicleList[row][cell];

                            var span = document.createElement('span');
                            span.className = "geotabButtonIcons info-circled";

                            var button = document.createElement('button');
                            button.className = "geotabButton emptyButton infoButton";
                            button.onclick = createClickHandler(id);

                            var div3 = document.createElement('div');
                            div3.className = "g-ctrl";

                            button.appendChild(span);
                            div3.appendChild(button);
                            div2.appendChild(div3);
                        }
                    }
                    //div2.appendChild(a);
                    td.appendChild(div2);
                    tr.appendChild(td);
                }
                //table2.appendChild(tr);
                refresh.disabled = false;
            }, function(e) {
                console.error("Failed:", e);
            });
        }

        var run = function() {

            api.call("Get", {
                "typeName": "User"
            }, function(result) {
                for (var i = 0; i < result.length; i++) {
					var authorityInfo = "Yes";
					var companyInfo = "Yes";

					var licenseInfo = "Yes";
					var nameInfo = "Yes";
					var carrierInfo = "Yes";
					var userNameInfo = "Yes"

					var name = "none";

                    if (result[i].isDriver === true) {
                        if (result[i].activeTo == "2050-01-01") {
                            if (result[i].authorityName === "" || result[i].authorityAddress === "") {
                                authorityInfo = "No";
                            }
                            if (result[i].companyName === "" || result[i].companyAddress === "") {
                                companyInfo = "No";
                            }
                            if (result[i].carrierNumber === "") {
                                carrierInfo = "No";
                            }
                            if (result[i].licenseProvince === null || result[i].licenseProvince === undefined || result[i].licenseNumber === "" || result[i].licenseProvince === "") {
                                licenseInfo = "No";
                            }
                            if (result[i].firstName.length <= 1 || result[i].lastName.length <= 1) {
                                nameInfo = "No";
                            }
                            if (result[i].name.length < 4) {
                                userNameInfo = "No";
                            }
                            if (result[i].licenseProvince !== null && result[i].licenseProvince !== undefined && result[i].licenseProvince.length > 2) {
                                licenseInfo = "No (" + result[i].licenseProvince + ")";
                            }

                            if (nameInfo === "No" || userNameInfo == "No" || authorityInfo === "No" || companyInfo === "No" || carrierInfo === "No" || licenseInfo === "No") {
                                name = result[i].name;
                                userList.push({ 0: name, 1: nameInfo, 2: userNameInfo, 3: authorityInfo, 4: companyInfo, 5: carrierInfo, 6: licenseInfo, 7: result[i].id });
                                authorityInfo = "Yes";
                                userNameInfo = "Yes"
                                licenseInfo = "Yes";
                                nameInfo = "Yes";
                                carrierInfo = "Yes";
                                companyInfo = "Yes"
                                name = "none";
                            }
                        } else {
                            authorityInfo = "Yes";
                            userNameInfo = "Yes"
                            licenseInfo = "Yes";
                            nameInfo = "Yes";
                            carrierInfo = "Yes";
                            companyInfo = "Yes"
                            name = "none";
                        }
                    }
                }

                var table1 = document.getElementById("myTable");

                for (row = 0; row < userList.length; row++) {
                    
                    tr = document.createElement('tr');
                    tr = table1.insertRow(1);
                    
                    td = document.createElement('td');
                    div2 = document.createElement('div');
                    div2.className = "g-row checkmateListBuilderRow";
                    
                    for (cell = 0; cell < 8; cell++) {
                        if (cell != 7) {
                            a = document.createElement('a');
                            a.className = "g-main xs-col activeElement sm-part-9 md-part-10";
                            div1 = document.createElement('div');
                            div1.className = "g-name";

                            a.appendChild(div1);
                            div1.textContent = userList[row][cell];
                            div2.appendChild(a);
                        } else {
                            var createClickHandler = function(arg) {
                                return function() {
                                    window.location.href = "https://" + servers + "/" + database + "/#user,id:" + arg;
                                };
                            }

                            var id = userList[row][cell];

                            var span = document.createElement('span');
                            span.className = "geotabButtonIcons info-circled";

                            var button = document.createElement('button');
                            button.className = "geotabButton emptyButton infoButton";
                            button.onclick = createClickHandler(id);

                            var div3 = document.createElement('div');
                            div3.className = "g-ctrl";

                            button.appendChild(span);
                            div3.appendChild(button);
                            div2.appendChild(div3);
                        }
                    }
                    td.appendChild(div2);
                    tr.appendChild(td);
                }
            }, function(e) {
                console.error("Failed:", e);
            });

            vehicle();
        }

        var empty = function() {
            //var table1 = document.getElementById("myTable");


            var mytbl = document.getElementById("myTable");
            mytbl.getElementsByTagName("tbody")[0].innerHTML = mytbl.rows[0].innerHTML;

            var mytbl1 = document.getElementById("myTable2");
            mytbl1.getElementsByTagName("tbody")[0].innerHTML = mytbl1.rows[0].innerHTML;

        }

        var divList = ["myDIV1", "myDIV2", "myDIV3", "myDIV4", "myDIV5", "myDIV6", "myDIV7", "myDIV8", "myDIV9", "myDIV10"];
        var function2 = function() {
            for (var i = 0; i < divList.length; i++) {
                var x = document.getElementById(divList[i]);
                $(x).toggle();
            }
        }
        button.addEventListener("click", function() {
            function2();
        }, false);

        refresh.addEventListener("click", function() {
            userList = [];
            vehicleList = [];
            var mytbl = document.getElementById("myTable");
            mytbl.getElementsByTagName("tbody")[0].innerHTML = mytbl.rows[0].innerHTML;

            var mytbl1 = document.getElementById("myTable2");
            mytbl1.getElementsByTagName("tbody")[0].innerHTML = mytbl1.rows[0].innerHTML;
            run();
            refresh.disabled = true;
        }, false);

        userReport.addEventListener("click", function() {
        var dict = {};
        var colArr = ["First Name","Last Name", "User Name", "Authority Name","Authority Address", "Home Terminal Name","Home Terminal Address","DOT Number","License Province","License Number","Hos Rule Set"];
                var JSONToCSVConvertor = function(JSONData, ReportTitle, ShowLabel) {
                    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
                    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

                    var CSV = '';
                    //Set Report title in first row or line

                    CSV += ReportTitle + '\r\n\n';

                    //This condition will generate the Label/Header
                    if (ShowLabel) {
                        var row = "";


                        for (var index = 0; index < colArr.length; index++) {
                            row += colArr[index] + ',';
                        }
                        row = row.slice(0, -1);
                        CSV += row + '\r\n';
                    }

                    //1st loop is to extract each row
                    for (var i = 0; i < arrData.length; i++) {
                        var row = "";
                        //2nd loop will extract each column and convert it in string comma-seprated
                        /* 			  	var colArr = ["dateTime", "serialNumber", "name","category"];
                         */
                        row += '"' + arrData[i].firstName + '",';
                        row += '"' + arrData[i].lastName + '",';
                        row += '"' + arrData[i].UserName + '",';
                        row += '"' + arrData[i].authorityName + '",';
                        row += '"' + arrData[i].authorityAddress + '",';
                        row += '"' + arrData[i].companyName + '",';
                        row += '"' + arrData[i].companyAddress + '",';
                        row += '"' + arrData[i].DOT_Number + '",';
                        row += '"' + arrData[i].licenseProvince + '",';
                        row += '"' + arrData[i].licenseNumber + '",';
                        row += '"' + arrData[i].hosRuleSet + '",';
                        row.slice(0, 1);
                        CSV += row + '\r\n';
                    }


                    if (CSV === '') {
                        console.log("Invalid data");
                        return;
                    }

                    //Generate a file name
                    var fileName = "User_List";
                    //this will remove the blank-spaces from the title and replace it with an underscore
                    fileName += ReportTitle.replace(/ /g, "_");

                    //Initialize file format you want csv or xls
                    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

                    // Now the little tricky part.
                    // you can use either>> window.open(uri);
                    // but this will not work in some browsers
                    // or you will not get the correct file extension    

                    //this trick will generate a temp <a /> tag
                    var link = document.createElement("a");
                    link.href = uri;

                    //set the visibility hidden so it will not effect on your web-layout
                    link.style = "visibility:hidden";
                    link.download = fileName + ".csv";

                    //this part will append the anchor tag and remove it after automatic click
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                };

                    var userIdList = [];
                    for (var i = 0; i < userList.length; i++) {
                        userIdList.push(["Get", { typeName: "User", search: { "id": userList[i][7] } }]);
                    }

                     api.multiCall(userIdList, function(result) {
                        var usersList = [];

                        if (result !== undefined && result.length > 0) {
                                for (var i = 0; i < result.length; i++) {
                                    if (result.length == 1) {
                                        usersList.push({firstName:result[i].firstName,lastName:result[i].lastName,UserName:result[i].name,authorityName:result[i].authorityName,authorityAddress:result[i].authorityAddress,
                                        companyName:result[i].companyName,companyAddress:result[i].companyAddress,DOT_Number:result[i].carrierNumber,licenseNumber:result[i].licenseNumber,licenseProvince:result[i].licenseProvince,hosRuleSet:result[i].hosRuleSet})							
                                    } else {	
                                        usersList.push({firstName:result[i][0].firstName,lastName:result[i][0].lastName,UserName:result[i][0].name,authorityName:result[i][0].authorityName,authorityAddress:result[i][0].authorityAddress,
                                        companyName:result[i][0].companyName,companyAddress:result[i][0].companyAddress,DOT_Number:result[i][0].carrierNumber,licenseNumber:result[i][0].licenseNumber,licenseProvince:result[i][0].licenseProvince,hosRuleSet:result[i][0].hosRuleSet})	
                                    }
                                }

                            JSONToCSVConvertor(usersList, "User List", true);
                        }
                    }, function(error) {
                        console.log(error);
                    }); 
        }, false);

    vehicleReport.addEventListener("click", function() {
        var dict2 = {};
        var colArr2 = ["Vehicle Name","VIN", "License Plate", "Rate Plan","Automatic HOS Settings"];
        var JSONToCSVConvertor2 = function(JSONData, ReportTitle, ShowLabel) {
            //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
            var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

            var CSV = '';
            //Set Report title in first row or line

            CSV += ReportTitle + '\r\n\n';

            //This condition will generate the Label/Header
            if (ShowLabel) {
                var row = "";

                for (var index = 0; index < colArr2.length; index++) {
                    row += colArr2[index] + ',';
                }
                row = row.slice(0, -1);
                CSV += row + '\r\n';
            }

            //1st loop is to extract each row
            for (var i = 0; i < arrData.length; i++) {
                var row = "";
                row += '"' + arrData[i].name + '",';
                row += '"' + arrData[i].vin + '",';
                row += '"' + arrData[i].licensePlate + '",';
                row += '"' + arrData[i].ratePlan + '",';
                row += '"' + arrData[i].automaticSetting + '",';

                row.slice(0, 1);
                CSV += row + '\r\n';
            }

            if (CSV === '') {
                console.log("Invalid data");
                return;
            }

            //Generate a file name
            var fileName = "User_List";
            //this will remove the blank-spaces from the title and replace it with an underscore
            fileName += ReportTitle.replace(/ /g, "_");

            //Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

            // Now the little tricky part.
            // you can use either>> window.open(uri);
            // but this will not work in some browsers
            // or you will not get the correct file extension    

            //this trick will generate a temp <a /> tag
            var link = document.createElement("a");
            link.href = uri;

            //set the visibility hidden so it will not effect on your web-layout
            link.style = "visibility:hidden";
            link.download = fileName + ".csv";

            //this part will append the anchor tag and remove it after automatic click
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
            var vehicleIdList = [];

            for (var i = 0; i < vehicleList.length; i++) {
                vehicleIdList.push(["Get", { typeName: "Device", search: { "id": vehicleList[i][5] } }]);
            }

            api.multiCall(vehicleIdList, function(result) {
                var vehicleList = [];

                if (result !== undefined && result.length > 0) {
                        for (var i = 0; i < result.length; i++) {
                            if (result.length == 1) {
                                vehicleList.push({
                                    name:result[i].name,
                                    vin:result[i].vehicleIdentificationNumber,
                                    licensePlate:result[i].licenseState+" "+ result[i].licensePlate,
                                    ratePlan:result[i].devicePlans[0],
                                    automaticSetting:result[i].customFeatures ? result[i].customFeatures.autoHos : false
                                });	
                            } else {
                                vehicleList.push({
                                    name:result[i][0].name,
                                    vin:result[i][0].vehicleIdentificationNumber,
                                    licensePlate:result[i][0].licenseState+" "+ result[i][0].licensePlate,
                                    ratePlan:result[i][0].devicePlans[0],
                                    automaticSetting:result[i][0].customFeatures ? result[i][0].customFeatures.autoHos : false
                                });
                            }
                        }

                    JSONToCSVConvertor2(vehicleList, "Vehicle List", true);
                }
            }, function(error) {
                console.log(error);
            });
        }, false);

    return {
        initialize: function(api, state, initializeCallback) {
            api.getSession(function(session, server) {
                servers = server;
                database = session.database;
                var currentUser = session.userName;
                api.call("Get", {
                    "typeName": "User",
                    "search": {
                        "name": currentUser
                    }
                }, function(result) {
                    if (result.length === 0) {
                        throw "Unable to find currently logged on user."
                    }
                    initializeCallback();
                    refresh.disabled = true;
                    run();
                }, function(error) {
                    throw "Error while trying to load currently logged on user. " + error;
                });
            });
        },
        focus: function(api, state) {
            
        },
        blur: function(api, state) {
            userList = [];
            vehicleList = [];
            empty();
            button.removeEventListener("click", function() {
                function2();
            });
        }
    };
    };