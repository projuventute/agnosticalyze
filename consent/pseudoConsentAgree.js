try {
    window.TMSHelper.console("[pseudoConsent] start"); 
      
      window.TMSConfig['privacy_consentCategory_statistics'] = true;
    
                // GTM specific request
                if (window.TMSConfig['tmsConfig_tool_GTM_flag']) {
                 
                    // define pushFunction based on GTMs data layer name
                    var pushFunction = window.TMSHelper.getVarFromWindowScopedObject(window.TMSConfig['tmsConfig_udoName'], "push")
                     
                    if (typeof pushFunction === "function" && typeof window.google_tag_manager === "object") {
                        window.TMSHelper.console("[pseudoConsent] -> info: sending request to GTM");
                
                        try {
                            // push event to GTM
                            pushFunction({'event': 'consent-agree'});
    
                            // flush GTM data layer to avoid persistence
                            // note: the function "reset" is always defined in the object "dataLayer" within the object "google_tag_manager[...]", regardless of the data layer name
                            // window.google_tag_manager[window.TMSHelper.getVarFromString(window.TMSConfig['tmsConfig_tool_GTM_src'], "id")].dataLayer.reset();
                        } catch (e) {
                            window.TMSHelper.console("[pseudoConsent] error:");
                            window.TMSHelper.errorHandler(e);
                        }
                    } else {
                        window.TMSHelper.console("[pseudoConsent] -> warning: invalid configuration of GTM");
                    }
                }
     
        window.TMSHelper.console("[pseudoConsent] complete");
    } catch (err) {
        window.TMSHelper.console("[pseudoConsent] error:");
        window.TMSHelper.errorHandler(err);
    }