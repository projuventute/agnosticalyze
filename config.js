(function () {

    try {
        window.TMSHelper.console("[pageview-virtual] start");
        var secondsToWait = 15;
        var intervalCounter = 1;
        intervalLoop = setInterval(function() {
            if (typeof window.TMSConfig === "Object" || Object.keys(window.TMSConfig).length > 0) {
                clearInterval(intervalLoop);
                // config starts here
                window.TMSConfig['tmsConfig_event_trackDefault'] = true;
                window.TMSConfig['tmsConfig_cookieDomain'] = 'projuventute.ch';
                // end: config
            } else if (intervalCounter >= secondsToWait * 2) { // after X * 2 tries = X seconds, stop the loop
                clearInterval(intervalLoop);
            } else {
                intervalCounter++;
            }
        }, 500);
    } catch (err) {
        window.TMSHelper.console("[pageview-virtual] error:");
        window.TMSHelper.errorHandler(err);
    }

})();