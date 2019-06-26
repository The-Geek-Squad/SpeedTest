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
    for (i = 0; i <= Math.floor(Math.random() * 100) + 1; i++) {
        updateUploadText(i);
    }
}

//TODO - Get client to test download speed
//Test the download speed of client
function testDownload() {
    for (i = 0; i <= Math.floor(Math.random() * 100) + 1; i++) {
        updateDownloadText(i);
    }
}

//TODO - Get client to test ping
//Test the ping of the client to server
function testPing() {
    updatePingText(Math.floor(Math.random() * 100) + 1);
}

//TODO - Get client to test jitter
//Test the jitter to the server
function testJitter() {
    updateJitterText(Math.floor(Math.random() * 100) + 1);
}

//Executes the test
function startTest() {
    testPing();
    testJitter();
    updateBars();
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