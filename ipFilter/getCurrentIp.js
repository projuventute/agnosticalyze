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
                    // trigger GTM Event
                    try {
                        // get push function (depending on udoNname)
                        var pushFunction = window.TMSHelper.getVarFromWindowScopedObject(
                            window.TMSConfig["tmsConfig_udoName"],
                            "push"
                        );
                        // push event to GTM
                        pushFunction({
                            event: "Run TMSProcessing.TMSEventOrchestrator",
                        });
                    } catch (e) {
                        window.TMSHelper.errorHandler(e);
                    }
            }
            xmlHttp.open( "GET", "https://api.ipify.org?format=json", true ); // false for synchronous request
            xmlHttp.send( null );
        }
    } catch (err) {
        window.TMSHelper.console(err);
    };
}