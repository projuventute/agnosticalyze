window.TMSHelper.getCurrentIp = function () {
    try {
        var userIpFromLocalStorage = window.TMSHelper.readValue('userIp', false);
        if (typeof userIpFromLocalStorage !== 'string' || userIpFromLocalStorage !== '') {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() { 
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                    var currentIp = JSON.parse(xmlHttp.responseText).ip;
                    // console.log("current IP: " + currentIp);
                    // window.userIp = currentIp;
                    window.TMSHelper.storeValue('userIp', currentIp, 1);
                    // run TMSProcessing.TMSEventOrchestrator after IP is stored
                    window.TMSProcessing.runOrchestrator();
            }
            xmlHttp.open( "GET", "https://api.ipify.org?format=json", true ); // false for synchronous request
            xmlHttp.send( null );
        }
    } catch (err) {
        window.TMSHelper.console(err);
    };
}