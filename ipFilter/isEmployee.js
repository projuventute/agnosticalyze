window.TMSHelper.isEmployee = function () {
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