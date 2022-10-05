window.TMSHelper.historyChangeTriggerDICE = function () {
    try {
        window.TMSHelper.console("[TMSHelper.historyChangeTriggerDICE] start");
        
        if (typeof window.TMSProcessing === "object") {
            
            // set secondsToWait to 15 seconds
            var secondsToWait = 15;
            
            var intervalCounter = 1;
            intervalLoop = setInterval(function() {
                if (typeof window.TMSEvent === "undefined" || Object.keys(window.TMSEvent).length === 0) { // TMSEvent is deleted or empty
                    clearInterval(intervalLoop);
                    window.TMSHelper.console("[TMSHelper.historyChangeTriggerDICE] -> info: triggering DICE");
                    event_data = {};
                    event_data["event_eventInfo_type"] = "pageview-virtual";
                    event_data["event_processing_trigger"] = "GTM-history-change-listener";
                    // trigger DICE
                    window.TMSProcessing.dice(event_data);
                } else if (intervalCounter >= secondsToWait * 2) { // after X * 2 tries = X seconds, stop the loop
                    clearInterval(intervalLoop);
                    window.TMSHelper.console("[TMSHelper.historyChangeTriggerDICE] -> warning: waited too long, DICE not triggered");
                } else {
                    window.TMSHelper.console("[TMSHelper.historyChangeTriggerDICE] -> info: TMSEvent not ready, trying again in 0.5 seconds...");
                    intervalCounter++;
                }
            }, 500);
        } else {
            window.TMSHelper.console("[TMSHelper.historyChangeTriggerDICE] -> warning: TMSProcessing not found");
        }
        
        window.TMSHelper.console("[TMSHelper.historyChangeTriggerDICE] complete");
    } catch (err) {
        window.TMSHelper.console("[TMSHelper.historyChangeTriggerDICE] error:");
        window.TMSHelper.errorHandler(err);
    }
}
