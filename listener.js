// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// DOMR01 Master Event Recognition Collection Initiator (MERCI)
// Issued by: Agnosticalyze
// version: 3.4.4, 2022-06-17
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
try {
    window.TMSHelper.console("[MERCI setup] start");
        
    if (!window.TMSConfig || window.TMSConfig['tmsConfig_event_listenerPreventFlag'] !== true) {
             
        window.TMSHelper.console("[MERCI setup] -> info: starting listener");
             
        var eventType = 'mousedown';
        var relevantElements = 'a,button,input.button,[data-track-elementcontent]'; // TBA: List of elements in TMSConfig
        document.addEventListener(eventType, function (event) {
          var path = event.composedPath();
          for (var i = 0; i < path.length; i++) {
            var that = path[i];
            if (that.matches && that.matches(relevantElements)) {
              if (typeof that === "object") {
                // 'that' must exist, because the listener is only activated by clicks on links and buttons
     
                window.TMSHelper.console("[MERCI] start");
     
                if (that.hasAttribute("data-track-prevent")) {
                  window.TMSHelper.console(
                    "[MERCI] -> info: tracking prevention flag found on element, TMS Event Tracking not triggered"
                  );
                } else if (
                  typeof window.TMSProcessing === "object" &&
                  typeof window.TMSProcessing.runEventCollectionOrchestrator ===
                    "function"
                ) {
                  window.TMSHelper.console(
                    "[MERCI] -> info: triggering TMS Event Tracking"
                  );
                  event_data = {};
                  event_data["event_eventInfo_type"] = "user-interaction";
                  event_data["event_processing_trigger"] = "merci";
                  event_data = window.TMSProcessing.runEventCollectionOrchestrator(
                    that,
                    event_data
                  );
   
                  // Overall tracking prevention
                  if (event_data['event_element_elementContentTrackPreventFound'] || event_data['event_element_levelContentTrackPreventFound']) {
                    window.TMSHelper.console("[MERCI] -> info: tracking prevention flag found, do not continue with processing of the event");
                    return;
                  }
                   
                  // identify standard event cases
                  event_data = window.TMSHelper.copyVarsFromObjectToObject({
                    sourceObject:
                      window.TMSProcessing.identifyStandardEventCase(event_data),
                    mergeObject: event_data,
                    targetPrefix: "",
                    overwrite: false,
                    harmonize: false,
                    includeFromSource: {},
                    excludeFromSource: {},
                    includeFromMerge: {},
                    excludeFromMerge: {},
                    flatten: false,
                  });
   
                  // identify whether TMS request should be triggered
                  if (typeof window.TMSProcessing.setEventTriggerFlag === "function") {
                    event_data =
                      window.TMSProcessing.setEventTriggerFlag(event_data);
                  }
   
                  // trigger TMS (event tracking) request
                  if (typeof event_data["event_processing_sendRequest"] === "boolean" && event_data["event_processing_sendRequest"]) {
                    window.TMSHelper.console(
                      "[MERCI] -> info: tracking conditionally approved, DICE triggered"
                    );
                    window.TMSProcessing.dice(event_data);
                  } else {
                    window.TMSHelper.console(
                      "[MERCI] -> info: tracking conditionally prevented, DICE not triggered"
                    );
                  }
                } else {
                  window.TMSHelper.console(
                    "[MERCI] -> warning: TMSProcessing.runEventCollectionOrchestrator not found"
                  );
                }
     
                window.TMSHelper.console("[MERCI] complete");
              } else {
                window.TMSHelper.console(
                  "[MERCI] -> warning: No valid interacted element 'that' identified"
                );
              } // end: if 'that' exists
            }
          }
        });
        window.TMSHelper.console("[MERCI setup] -> info: listener started");
    } else {
        window.TMSHelper.console("[MERCI setup] -> info: listener prevention flag found in TMSConfig, listener not started");
    }
       
    window.TMSHelper.console("[MERCI setup] complete");
  } catch (err) {
    window.TMSHelper.console("[MERCI setup] error:");
    window.TMSHelper.errorHandler(err);
  };

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// DOMR02 ReceiveFromChildWindow
// Issued by: Agnosticalyze
// version: 1.5, 2022-06-03
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
try {
    window.TMSHelper.console("[ReceiveFromChildWindow setup] start");
          
    if (typeof window.TMSProcessing === "object" 
            && typeof window.TMSProcessing.dice === "function" 
            && typeof window.TMSConfig === "object"
            && window.TMSConfig['tmsConfig_event_receiveFromChildWindow']) {
        // Allow window to listen for a postMessage
        window.addEventListener("message", function(event) {
            window.TMSHelper.console("[ReceiveFromChildWindow] start");
    
            window.TMSHelper.console("[ReceiveFromChildWindow] -> info: message received from: " + event.origin);
            // Decode possible representation of object as string
            var decoded_object = {};
            try {
                decoded_object = JSON.parse(event.data)
            } catch (e) {/* intentionaly left blank */}
              
            if (typeof window.TMSConfig['ALLOWED_DOMAINS'] === "string") {
                if (event.origin.includes(window.TMSConfig['ALLOWED_DOMAINS'])) {
                    window.TMSHelper.console("[ReceiveFromChildWindow] -> info: good hostname, trigger DICE");
                    if (typeof decoded_object['event_processing_trigger'] === "string" && decoded_object['event_processing_trigger'] !== "") {
                        decoded_object['event_processing_trigger'] = decoded_object['event_processing_trigger'] + "_receivedfromchildwindow";
                        window.TMSProcessing.dice(decoded_object);
                    } else {
                        window.TMSHelper.console("[ReceiveFromChildWindow] -> warning: no event_processing_trigger defined -> DICE not triggered");
                    }
                } else {
                  window.TMSHelper.console("[ReceiveFromChildWindow] -> warning: message received from a bad hostname, DICE not triggered");
                }
            } else if (typeof window.TMSConfig['ALLOWED_DOMAINS'] === "object") {
                var notSentYet = true;
    
                loopHostnames: for (var i = 0; i < window.TMSConfig['ALLOWED_DOMAINS'].length; i++) {
                    if (event.origin.includes(window.TMSConfig['ALLOWED_DOMAINS'][i]) && notSentYet) {
                        window.TMSHelper.console("[ReceiveFromChildWindow] -> info: good hostname, trigger DICE");
                        if (typeof decoded_object['event_processing_trigger'] === "string" && decoded_object['event_processing_trigger'] !== "") {
                            decoded_object['event_processing_trigger'] = decoded_object['event_processing_trigger'] + "_receivedfromchildwindow";
                            window.TMSProcessing.dice(decoded_object);
                        } else {
                            window.TMSHelper.console("[ReceiveFromChildWindow] -> warning: no event_processing_trigger defined, DICE not triggered");
                        }
                        notSentYet = false;
                        break loopHostnames;
                    }
                } // end loopHostnames
    
                if (notSentYet) {
                    window.TMSHelper.console("[ReceiveFromChildWindow] -> warning: message received from a bad hostname, DICE not triggered");
                }
            } else if (typeof window.TMSConfig['ALLOWED_DOMAINS'] === "undefined") {
                window.TMSHelper.console("[ReceiveFromChildWindow] -> info: allowed domains not defined, trigger DICE");
                if (typeof decoded_object['event_processing_trigger'] === "string" && decoded_object['event_processing_trigger'] !== "") {
                    decoded_object['event_processing_trigger'] = decoded_object['event_processing_trigger'] + "_receivedfromchildwindow";
                    window.TMSProcessing.dice(decoded_object);
                } else {
                    window.TMSHelper.console("[ReceiveFromChildWindow] -> warning: no event_processing_trigger defined -> DICE not triggered");
                }
            } else {
                window.TMSHelper.console("[ReceiveFromChildWindow setup] -> warning: TMSConfig[ALLOWED_DOMAINS] invalid");
            }
    
            window.TMSHelper.console("[ReceiveFromChildWindow] complete");
        });
    } else {
        window.TMSHelper.console("[ReceiveFromChildWindow setup] -> warning: TMSProcessing.dice  or TMSConfig not defined");
    }
         
    window.TMSHelper.console("[ReceiveFromChildWindow setup] complete");
  } catch (err) {
    window.TMSHelper.console("[ReceiveFromChildWindow setup] error:");
    window.TMSHelper.errorHandler(err);
  };