var testbutton = document.getElementById("testButton");         //Button to Start the Test
var clearbutton = document.getElementById("clearButton");       //Button to clear results
var uploadBar = document.getElementById("upload");              //Upload Status
var downloadBar = document.getElementById("download");          //Download Status
var pingBar = document.getElementById("ping");                  //Ping Status
var jitterBar = document.getElementById("jitter");              //Jitter Status
var uploadText = document.getElementById("uploadValue");        //Upload Number
var downloadText = document.getElementById("downloadValue");    //Download Number
var pingText = document.getElementById("pingValue");            //Ping Number
var jitterText = document.getElementById("jitterValue");        //Jitter Number
var ipaddr = document.getElementById("ipaddress");              //IP Address
var isTesting = false;                                          //Check if the test is being run

//Change the status bar of the Upload Element
function updateUploadBar(status) {
    uploadBar.style.visibility = status;
}

//Change the status of the Upload Element
function updateUploadText(value) {
    uploadText.textContent = value;
}

//Change the status bar of the Download Element
function updateDownloadBar(status) {
    downloadBar.style.visibility = status;
}

//Change the status of the Download Element
function updateDownloadText(value) {
    downloadText.textContent = value;
}

//Change the status bar of the Ping Element
function updatePingBar(status) {
    pingBar.style.visibility = status;
}

//Change the status of the Ping Element
function updatePingText(value) {
    pingText.textContent = value;
}

//Change the status bar of the Jitter Element;
function updateJitterBar(status) {
    jitterBar.style.visibility = status;
}

//Change the status of the Jitter Element
function updateJitterText(value) {
    jitterText.textContent = value;
}

//Change Text on Test Button
function updateTestButton(status) {
    testbutton.textContent = status;
}

//Change clear button visibility
function updateClearButton(status) {
    clearbutton.style.display = status;
}

//Change the ip address
function updateIP(address) {
    ipaddr.textContent = address;
}

//Hids the Progress Bars
function hideBars() {
    updateUploadBar("hidden");
    updateDownloadBar("hidden");
    updatePingBar("hidden");
    updateJitterBar("hidden");
    updateTestButton("Start Test");
}

//Shows the Progress Bars
function showBars() {
    updateUploadBar("visible");
    updateDownloadBar("visible");
    updatePingBar("visible");
    updateJitterBar("visible");
    updateTestButton("Stop Test");
}

//Shows bars if testing is happening otherwise hides them
function updateBars() {
    if (isTesting == true) {
        showBars();
    } else {
        hideBars();
    }
}

//Sets all text to 0
function clearStatus() {
    updateDownloadText(0);
    updateUploadText(0);
    updatePingText(0);
    updateJitterText(0);
}

//TODO - Get client to test upload speed
//Test the upload speed of client
function testUpload() {
}

//TODO - Get client to test download speed
//Test the download speed of client
function testDownload() {
}

//TODO - Get client to test ping
//Test the ping of the client to server
async function testPing() {
    var startTime, endTime;
    var result1 = 0;
    var result2 = 0;
    var result3 = 0;
    var result4 = 0;
    var result5 = 0;
    var ping;
    
    startTime = (new Date()).getTime();
    await doPing();
    endTime = (new Date()).getTime();
    result1 = (endTime - startTime);
    startTime = (new Date()).getTime();
    await doPing();
    endTime = (new Date()).getTime();
    result2 = (endTime - startTime);

    startTime = (new Date()).getTime();
    await doPing();
    endTime = (new Date()).getTime();
    result3 = (endTime - startTime);

    startTime = (new Date()).getTime();
    await doPing();
    endTime = (new Date()).getTime();
    result4 = (endTime - startTime);

    startTime = (new Date()).getTime();
    await doPing();
    endTime = (new Date()).getTime();
    result5 = (endTime - startTime);


    var ping = (result1 + result2 + result3 + result4 + result5) / 5;
    updatePingText(Math.round(ping) + " MS");
    checkJitter(result1, result2, result3, result4, result5);

}

function checkJitter(result1, result2, result3, result4, result5) {
    var j1 = difference(result1, result2);
    var j2 = difference(result3, result2);
    var j3 = difference(result3, result4);
    var j4 = difference(result4, result5);

    var jitter = (j1 + j2 + j3 + j4) / 4;

    updateJitterText(Math.round(jitter) + " MS")

}

function difference (a, b) {
    return Math.abs(a - b);
}

//Function that test ping
function doPing() {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://192.168.86.175:8080/ping");
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror - function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    })
}

//Executes the test
function startTest() {
    updateBars();
    getIP();
    testPing();
    testUpload();
    testDownload();

}

//Stops a executing test
function stopTest() {
    updateBars();
    clearStatus();
    clearTimeout(uptime);
    Dcount = 0;
}

//Stops or starts a test depending on user click
testbutton.onclick = function () {
    if (isTesting == false) {
        isTesting = true;
        startTest();
        isTesting = false;
        updateBars();
        updateClearButton("inline-flex");
    } else {
        isTesting = false;
        stopTest();
    }

};

//Clear the results when clicked
clearbutton.onclick = function () {
    clearStatus();
    updateClearButton("none")
}

function getIP() {
    var Http = new XMLHttpRequest();
    const url = "http://192.168.86.175:8080/ip";
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange=function() {
        if(this.readyState==4 && this.status==200) {
            updateIP("IP: " + Http.responseText)
        }
    }
}