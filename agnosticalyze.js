// Extension (wrapper function to not leak variables)
(function () {
	
	window.TMSHelper = {
	  console: 								console // console(msg)
	, errorHandler: 						errorHandler // errorHandler(msg)
	, getParentHtmlElementsOfHtmlElement: 	getParentHtmlElementsOfHtmlElement // getParentHtmlElementsOfHtmlElement(node)
	, getURLFromHtmlElement: 				getURLFromHtmlElement // getURLFromHtmlElement(type, input)
	, convertURLStringToLink: 				convertURLStringToLink // convertURLStringToLink(url)
	, getVarFromWindowScopedObject: 		getVarFromWindowScopedObject // getVarFromWindowScopedObject(objectName, attributeName)
	, getVarFromString: 					getVarFromString // getVarFromString(sourceString, attributeName, type)
	, getParentHtmlElement: 				getParentHtmlElement // getParentHtmlElement(input, type)
	, URLconstructor: 						URLconstructor // URLconstructor(url)
	, URLslasher: 							URLslasher // URLslasher(url)
	, isURIEncoded: 						isURIEncoded // isURIEncoded(uri)
	, decodeURI: 							decodeURI // decodeURI(uri)
	, cookieRead: 							cookieRead // cookieRead(name)
	, cookieCreate: 						cookieCreate // cookieCreate(name,value,days)
	, cookieErase: 							cookieErase // cookieErase(name)
	, readValue: 							readValue // readValue(name, raw)
	, storeValue: 							storeValue // storeValue(name, value, exdays)
	, clearValue: 							clearValue // clearValue(name)
	, isAnchorToSamePage: 					isAnchorToSamePage // isAnchorToSamePage(url)
	, isDownloadLink: 						isDownloadLink // isDownloadLink(url)
	, isEmailLink: 							isEmailLink // isEmailLink(url)
	, isOnsiteLink: 						isOnsiteLink // isOnsiteLink(url)
	, isPhoneLink: 							isPhoneLink // isPhoneLink(url)
	, identifySocialProvider: 				identifySocialProvider // identifySocialProvider(url)
    , copyVarsFromObjectToObject: 			copyVarsFromObjectToObject // copyVarsFromObjectToObject(sourceObject, mergeObject, targetPrefix, overwrite, harmonize, includeFromSource, excludeFromSource, includeFromMerge, excludeFromMerge, sourcePrefix, flatten)
    , flattenObject:                        flattenObject // flattenObject(input)
    , harmonize: 							harmonize // harmonize(config, obj)
    , lowercaseValues: 						lowercaseValues // lowercaseValues(obj, skip_keys)
    , maskEmails: 							maskEmails // maskEmails (str)
    , maskUnknownParameters:                maskUnknownParameters // maskUnknownParameters(str)
    , removeUnknownParameters:              removeUnknownParameters // removeUnknownParameters(str)
	, formatDateString: 					formatDateString // formatDateString(inputDate, inputFormat, outputFormat)
	, formatTimeString: 					formatTimeString // formatTimeString(time)
	, isHMSFormat: 							isHMSFormat // isHMSFormat(time)
	, convertHMSToSec: 						convertHMSToSec // convertHMSToSec(hms)
	, convertSecToHMS: 						convertSecToHMS // convertSecToHMS(seconds)
	, calculateProgress: 					calculateProgress // calculateProgress(currentPosition, totalDuration)
	}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0101 TMSHelper.console
// Issued by: Agnosticalyze
// version: 2.1.2, 2021-07-05
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

// console: uses the window.console.log function to log messages to
function console(msg) {
    try {
        if (typeof msg === "string") {
            if (typeof window.TMSConfig === "object" && typeof window.TMSConfig['tmsConfig_isConsoleEnabled'] === "boolean" && window.TMSConfig['tmsConfig_isConsoleEnabled']) {
                if (window.TMSConfig['tmsConfig_isConsoleEnabled']) {
                    window.console.log(msg);
                }
            }
        } else {
            window.TMSHelper.console("[TMSHelper.console] -> warning: input variable is not a string");
        }     
    } catch (err) {
        window.console.log("[TMSHelper.console] error:")
        window.console.error(err);
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0102 TMSHelper.errorHandler
// Issued by: Agnosticalyze
// version: 2.1, 2021-03-05
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

// errorHandler: uses the window.console.error function to log errors to if the error log is not disabled
function errorHandler(msg) {
    try {
        if (typeof window.TMSConfig === "object") {
            if (typeof window.TMSConfig['tmsConfig_isErrorLogEnabled'] === "undefined" || window.TMSConfig['tmsConfig_isErrorLogEnabled']) {
                window.console.error(msg);
            }
        }
    } catch (err) {
        window.console.log("[TMSHelper.errorHandler] error:")
        window.console.error(err);
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0121 TMSHelper.getParentHtmlElementsOfHtmlElement
// Issued by: Agnosticalyze
// version: 2.0, 2021-03-05
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// getParentHtmlElementsOfHtmlElement: identify all parent nodes of a passed HTML element
function getParentHtmlElementsOfHtmlElement(node) {
    try {
        window.TMSHelper.console("[TMSHelper.getParentHtmlElementsOfHtmlElement] start");
         
        if (typeof node === "object") {
            var current = node;
            var list = [];
             
            while(current.parentNode != null && current.parentNode != document.documentElement) {
                list.push(current.parentNode);
                current = current.parentNode;
            }
             
            window.TMSHelper.console("[TMSHelper.getParentHtmlElementsOfHtmlElement] complete");
            return list;
        } else {
            window.TMSHelper.console("[TMSHelper.getParentHtmlElementsOfHtmlElement] -> warning: invalid element passed to this function");
            window.TMSHelper.console("[TMSHelper.getParentHtmlElementsOfHtmlElement] complete");
            return undefined;
        }
    } catch(err) {
        window.TMSHelper.console("[TMSHelper.getParentHtmlElementsOfHtmlElement] error:");
        window.TMSHelper.errorHandler(err);
        return undefined;
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0122 TMSHelper.getURLFromHtmlElement
// Issued by: Agnosticalyze
// version: 2.5, 2022-06-18
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// getURLFromHtmlElement: retrieves a URL from interacted elements or the document, as selected by the input variable "type".
function getURLFromHtmlElement(type, input) {
    try {
        window.TMSHelper.console("[TMSHelper.getURLFromHtmlElement] start");
                   
        if (type === "target") {
            // 1 Target URL Case
            if (typeof input !== "undefined") {
                var parentFormElement = window.TMSHelper.getParentHtmlElement(input, "form")
                if (typeof input.href !== "undefined" && input.href !== "") {
                    // 1.1 if the clicked element has a target URL in href
                    window.TMSHelper.console("[TMSHelper.getURLFromHtmlElement] -> info: clicked element has href attribute: " + input.href);
                    window.TMSHelper.console("[TMSHelper.getURLFromHtmlElement] complete");
                    return input.href;
                } else if (input.tagName.toLowerCase() === "button" && typeof parentFormElement !== "undefined" && typeof parentFormElement.getAttribute("action") !== "undefined" && parentFormElement.getAttribute("action") !== "") {
                    // 1.2 for (form) buttons, get the href from the parent form
                    window.TMSHelper.console("[TMSHelper.getURLFromHtmlElement] -> info: clicked element has a parent form: " + parentFormElement.getAttribute("action"));
                    window.TMSHelper.console("[TMSHelper.getURLFromHtmlElement] complete");
                    return parentFormElement.getAttribute("action");
                } else if (input.tagName.toLowerCase() === "input" && typeof parentFormElement !== "undefined" && typeof parentFormElement.getAttribute("action") !== "undefined" && parentFormElement.getAttribute("action") !== "") {
                    // 1.3 for form input fields, get the action of the parent form
                    window.TMSHelper.console("[TMSHelper.getURLFromHtmlElement] -> info: clicked element has a parent form: " + parentFormElement.getAttribute("action"));
                    window.TMSHelper.console("[TMSHelper.getURLFromHtmlElement] complete");
                    return parentFormElement.getAttribute("action");
                } else {
                    // 1.4 neither of the above
                    window.TMSHelper.console("[TMSHelper.getURLFromHtmlElement] -> warning: target URL not found in clicked element");
                    window.TMSHelper.console("[TMSHelper.getURLFromHtmlElement] complete");
                    return "";
                }
            } else {
                window.TMSHelper.console("[TMSHelper.getURLFromHtmlElement] -> warning: no clicked element transmitted to function");
                window.TMSHelper.console("[TMSHelper.getURLFromHtmlElement] complete");
                return "";
            }
        } else if (type === "canonical") {
            // 2 get Canonical URL from Canonical Tag
            if (document.querySelector("link[rel='canonical']")) {
                window.TMSHelper.console("[TMSHelper.getURLFromHtmlElement] -> info: found Canonical in link[rel] attribute");
                return document.querySelector("link[rel='canonical']").getAttribute("href");
            } else {
                window.TMSHelper.console("[TMSHelper.getURLFromHtmlElement] -> info: no Canonical Tag found")
                window.TMSHelper.console("[TMSHelper.getURLFromHtmlElement] complete");
                return "";
            }
        } else if (type === "alternate") {
            // 3 get Alternate URL from Alternate Tag
            var allTagsOnPage = document.querySelectorAll("link[rel='alternate']");
               
            if (allTagsOnPage.length > 0) {
                window.TMSHelper.console("[TMSHelper.getURLFromHtmlElement] -> info: found Alternate in link[rel] attribute");
   
                // find the (first) matching tag
                var notMatchedYet = true;
                   
                var returnObject = {};
                returnObject['url'] = allTagsOnPage[0].getAttribute("href");
                returnObject['lang'] = allTagsOnPage[0].getAttribute("hreflang")
   
                // is language hierarchy defined?
                if (typeof window.TMSConfig['tmsConfig_alternateLanguageHierarchy'] === "object" && window.TMSConfig['tmsConfig_alternateLanguageHierarchy'].length > 0) {
                    // try all languages defined in the hierarchy
                    loopLang: for (var li in window.TMSConfig['tmsConfig_alternateLanguageHierarchy']) {
                        var l = window.TMSConfig['tmsConfig_alternateLanguageHierarchy'][li];
                        for (var ti in allTagsOnPage) {
                            var t = allTagsOnPage[ti];
                            // 3.1 get the first tag matching the language perfectly
                            if (t.getAttribute("hreflang") === l && notMatchedYet) {
                                returnObject['url'] = t.getAttribute("href");
                                returnObject['lang'] = l;
                                notMatchedYet = false;
                                break loopLang;
                            }
   
                            // 3.2 get the first tag starting with the language
                            if (t.getAttribute("hreflang").startsWith(l) && notMatchedYet) {
                                returnObject['url'] = t.getAttribute("href");
                                returnObject['lang'] = t.getAttribute("hreflang");
                                notMatchedYet = false;
                                break loopLang;
                            }
                        }
                    }
                } else if (typeof window.TMSConfig['tmsConfig_alternateLanguageHierarchy'] === "string") {
                    var l = window.TMSConfig['tmsConfig_alternateLanguageHierarchy']
                    loopTag: for (var ti in allTagsOnPage) {
                        var t = allTagsOnPage[ti];
                        // 3.1 get the first tag matching the language perfectly
                        if (t.getAttribute("hreflang") === l && notMatchedYet) {
                            returnObject['url'] = t.getAttribute("href");
                            returnObject['lang'] = l;
                            notMatchedYet = false;
                            break loopTag;
                        }
   
                        // 3.2 get the first tag starting with the language
                        if (t.getAttribute("hreflang").startsWith(l) && notMatchedYet) {
                            returnObject['url'] = t.getAttribute("href");
                            returnObject['lang'] = t.getAttribute("hreflang") || "";
                            notMatchedYet = false;
                            break loopTag;
                        }
                    }
                } else {
                    window.TMSHelper.console("[TMSHelper.getURLFromHtmlElement] -> warning: alternate language hierarchy in TMSConfig is invalid")
                }
                 
                window.TMSHelper.console("[TMSHelper.getURLFromHtmlElement] complete");
                return returnObject;
            } else {
                window.TMSHelper.console("[TMSHelper.getURLFromHtmlElement] -> info: no Alternate Tag found")
                window.TMSHelper.console("[TMSHelper.getURLFromHtmlElement] complete");
                return undefined;
            }
        } else {
            window.TMSHelper.console("[TMSHelper.getURLFromHtmlElement] -> warning: no valid type of URL specified")
            window.TMSHelper.console("[TMSHelper.getURLFromHtmlElement] complete");
            return undefined;
        }
    }  catch (err) {
        window.TMSHelper.console("[TMSHelper.getURLFromHtmlElement] error:");
        window.TMSHelper.errorHandler(err);
        return undefined;
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0123 TMSHelper.convertURLStringToLink
// Issued by: Agnosticalyze
// version: 2.0, 2020-09-25
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// convertURLStringToLink: turns a URL string into an anchor ("a") object.
function convertURLStringToLink(url) {
    try {
        window.TMSHelper.console("[TMSHelper.convertURLStringToLink] start");
        if (typeof url === "string" && url !== "")  {
            var link = document.createElement("a");
            link.href = url;
            window.TMSHelper.console("[TMSHelper.convertURLStringToLink] complete");
            return link;
        } else {
            window.TMSHelper.console("[TMSHelper.convertURLStringToLink] -> URL is not a valid string");
            return undefined;
        }
    } catch(err) {
        window.TMSHelper.console("[TMSHelper.convertURLStringToLink] error:");
        window.TMSHelper.errorHandler(err);
        return undefined;
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0124 TMSHelper.getVarFromWindowScopedObject
// Issued by: Agnosticalyze
// version: 1.0, 2020-11-26
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// getVarFromWindowScopedObject: gets a value of a named attribute from a named object that is window-scoped (global), e.g. UDO or TMS objects
// Notes:
// - Does not work for local objects!
// - Uses two strings as input:
//   1. name of the object to find the attribute in
//   2. name of the attribute to get the value from
// - nested object names can be either in dot- or bracket-notation
function getVarFromWindowScopedObject(objectName, attributeName) {
    try {
        window.TMSHelper.console("[TMSHelper.getVarFromObject] start");
   
        if (typeof objectName === "string" && typeof attributeName === "string") {
              
            // remove leading window. if found
            objectName = objectName.replace(/^window(\.|\['|\[")/g, "");
  
            if ((new RegExp("\\\.\|\\\]", "g")).test(objectName)) {
                // objectName appears to be nested
                // -> convert objectName to dot-notation and use eval-function
                objectName = objectName.replace(/\./g, "||");
                objectName = objectName.replace(/^\[('|")/g, "");
                objectName = objectName.replace(/\[('|")/g, "||");
                objectName = objectName.replace(/('|")\]/g, "");
                objectName = objectName.replace(/\|\|/g, ".");
   
                if (typeof eval("window." + objectName) === "object") {
                    if (typeof eval("window." + objectName + "[\'" + attributeName + "\']") !== "undefined") {
                        window.TMSHelper.console("[TMSHelper.getVarFromObject] -> get value of: window." + objectName + "[\'" + attributeName + "\']");
                        window.TMSHelper.console("[TMSHelper.getVarFromObject] complete");
                        return eval("window." + objectName + "[\'" + attributeName + "\']");
                    } else {
                        window.TMSHelper.console("[TMSHelper.getVarFromObject] -> warning: window." + objectName + "[\'" + attributeName + "\'] not found -> returning NULL");
                        window.TMSHelper.console("[TMSHelper.getVarFromObject] complete");
                        return null;
                    }
                } else {
                    window.TMSHelper.console("[TMSHelper.getVarFromObject] -> warning: window." + objectName + " of type " + typeof eval("window." + objectName) + " is invalid -> returning NULL");
                    window.TMSHelper.console("[TMSHelper.getVarFromObject] complete");
                    return null;
                }
            } else {
                // objectName is not nested
                // -> convert objectName to bracket-notation, use of eval-function is not necessary
                if (typeof window[objectName] === "object") {
                    if (typeof window[objectName][attributeName] !== "undefined") {
                        window.TMSHelper.console("[TMSHelper.getVarFromObject] -> get value of: window[\'" + objectName + "\'][\'" + attributeName + "\']");
                        window.TMSHelper.console("[TMSHelper.getVarFromObject] complete");
                        return window[objectName][attributeName];
                    } else {
                        window.TMSHelper.console("[TMSHelper.getVarFromObject] -> warning: window[\'" + objectName + "\'][\'" + attributeName + "\'] not found -> returning NULL");
                        window.TMSHelper.console("[TMSHelper.getVarFromObject] complete");
                        return null;
                    }
                } else {
                    window.TMSHelper.console("[TMSHelper.getVarFromObject] -> warning: window[\'" + objectName + "\'] of type " + typeof window[objectName] + " is invalid -> returning NULL");
                    window.TMSHelper.console("[TMSHelper.getVarFromObject] complete");
                    return null;
                }
            }
        } else {
            window.TMSHelper.console("[TMSHelper.getVarFromObject] -> warning: input objectName and/or attributeName is not a string -> returning NULL");
            window.TMSHelper.console("[TMSHelper.getVarFromObject] complete");
            return null;
        }
           
    } catch (err) {
        // error handler
        window.TMSHelper.console("[TMSHelper.getVarFromObject] error:");
        window.TMSHelper.errorHandler(err);
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0125 TMSHelper.getVarFromString
// Issued by: Agnosticalyze
// version: 2.3, 2021-06-08
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
// getVarFromString : gets a value of a named attribute from the source string
function getVarFromString(sourceString, attributeName, type) {
  try {
    window.TMSHelper.console("[TMSHelper.getVarFromString] start");
    var output;
    if (typeof sourceString === "string" && typeof attributeName === "string") {
      sourceString = sourceString.toLowerCase();
      attributeName = attributeName.toLowerCase();
      // If sourceString contains a ?, remove everything until the ?
      if (sourceString.indexOf("?") > -1) { // TBA: Add checking for type=url here
        sourceString = sourceString.slice(sourceString.indexOf("?") + 1);
      }
  
      // If sourceString contains attributeName
      if (sourceString.indexOf(attributeName) !== -1) {
        window.TMSHelper.console("[TMSHelper.getVarFromString] -> info: attribute '" + attributeName + "' found in sourceString -> looking for decoded match");
        // 1 look for decoded value
        // in the decoded varion, we ignore:
        //   - leading "?" or "&" at start of string
        //   - trailing "&" or "#" at end of string
        // we assume that attribute name and value is separated with = sign as in url query params
          
        if (type !== 'url') {
          // ignore # part
          var hashIdx = sourceString.indexOf('#');
          if ( hashIdx !== -1) {
            sourceString = sourceString.slice(0, hashIdx);
          }
        }
  
        // split between attribute names
        var split_vars = sourceString.split('&');
        for (var i = 0; i < split_vars.length; i++) {
          // split at attribute name and aatribute value
          var attribute_data = split_vars[i].split('=');
          if (attribute_data.length < 2) continue; // invalid attribute, skip it
  
          if (attribute_data[0] === attributeName) {
            // if we have ? in value get all values left
            // 1. join the 2nd and forward attribute_data elements with =
            var attribute_val = attribute_data.slice(1).join('=')
            output = attribute_val;
            // 2. if type url: join result from step1 and the rest of attributes with &
            if (type === 'url') {
              var rest = split_vars.slice(i);
              rest[0] = attribute_val;
              output = rest.join('&');
            }
            window.TMSHelper.console("[TMSHelper.getVarFromString] -> info: found: '" + attributeName + "' -> returning: " + output);
            break; // we found it break;
          }
  
          // if there's no outbut but we found attribute name in extracted attribute value then extract it
          if ((typeof output === "undefined" || output === "") && attribute_data[1].indexOf(attributeName) !== -1) {
            var sub_attribute_data = split_vars[i].split('?')[1].split('=');
            if (sub_attribute_data.length < 2) continue; // invalid attribute, skip it
  
            if (sub_attribute_data[0] === attributeName) {
              var attribute_val = sub_attribute_data.slice(1).join('=')
              output = attribute_val;
              window.TMSHelper.console("[TMSHelper.getVarFromString] -> info: found: '" + attributeName + "' -> returning: " + output);
              break; // we found it break;
            }
          }
        }
  
      } else {
        window.TMSHelper.console("[TMSHelper.getVarFromString] -> warning: attribute '" + attributeName + "' not found in sourceString -> returning UNDEFINED");
        return undefined;
      }
            
        // 2 look for encoded value
        if (typeof output === "undefined" || output === "") {
          window.TMSHelper.console("[TMSHelper.getVarFromString] -> info: output is still UNDEFINED or BLANK -> looking for encoded match");
          // decode uri and try again
          output = getVarFromString(decodeUriComponent(sourceString), attributeName, type)
          if (typeof output === 'undefined' || output === '') {
            window.TMSHelper.console("[TMSHelper.getVarFromString] -> info: no match with the encoded string: '" + sourceString + "'");
          } else {
            window.TMSHelper.console("[TMSHelper.getVarFromString] -> info: match with the encoded string in string: '" + sourceString + "' -> returning: " + output);
          }
        }
    
        // 3 return output
        window.TMSHelper.console("[TMSHelper.getVarFromString] complete");
        return output;
    } else {
      window.TMSHelper.console("[TMSHelper.getVarFromString] -> warning: input sourceString and/or attributeName is not a string -> returning UNDEFINED");
      window.TMSHelper.console("[TMSHelper.getVarFromString] complete");
      return undefined;
    }
  } catch (err) {
    // error handler
    window.TMSHelper.console("[TMSHelper.getVarFromString] error:");
    window.TMSHelper.errorHandler(err);
    return undefined;
  }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0126 TMSHelper.getParentHtmlElement
// Issued by: Agnosticalyze
// version: 1.0, 2021-03-05
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// getParentHtmlElement : gets an HTML elements parent HTML element of a specified type
//   source: queryParent.js v1.2.2--ES5 by ryanpcmcquen https://github.com/ryanpcmcquen/queryparent/blob/master/index-es5.js
function getParentHtmlElement(input, type) {
    try {
        window.TMSHelper.console("[TMSHelper.getParentHtmlElement] start");
         
        var allElementsOfType = Array.prototype.slice.call(document.querySelectorAll(type));
         
        if (typeof input === 'string') {
           input = document.querySelector(input);
        };
         
        return allElementsOfType.filter(function (n) {
            return (n.contains(input)) ? n : false;
        }).pop();
    } catch (err) {
        // error handler
        window.TMSHelper.console("[TMSHelper.getParentHtmlElement] error:");
        window.TMSHelper.errorHandler(err);
        return undefined;
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0131 TMSHelper.URLconstructor
// Issued by: Agnosticalyze
// version: 2.1, 2021-02-19
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
// URLconstructor: checks for the completeness of the URL according to web standards and if not complete, constructs it into a complete URL via best effort
function URLconstructor(url) {
    try {
        window.TMSHelper.console("[TMSHelper.URLconstructor] start");
   
        if (typeof url !== "string" || url === null || url === "") {
            // invalid data type, returning empty object
            window.TMSHelper.console("[TMSHelper.URLconstructor] -> warning: input URL is not a string or blank, returning UNDEFINED");
            window.TMSHelper.console("[TMSHelper.URLconstructor] complete");
            return (undefined);
        } else {
            // create RegEx to check against
            var startWithProtocol = new RegExp("^[a-zA-Z]*:");
   
            if (startWithProtocol.test(url)) {
                // 1 absolute URL (based on protocol available)
                window.TMSHelper.console("[TMSHelper.URLconstructor] -> info: input URL appears to be a valid absolute URL, returning original URL");
                window.TMSHelper.console("[TMSHelper.URLconstructor] complete");
                return (url);
            } else if (typeof window.TMSEvent === "object" && typeof window.TMSEvent['page_url_window_url'] === "string" && typeof window.TMSEvent['page_url_window_protocol'] === "string" && typeof window.TMSEvent['page_url_window_hostname'] === "string" && typeof window.TMSEvent['page_url_window_path'] === "string" && typeof window.TMSEvent['page_url_window_queryString'] === "string") {
                window.TMSHelper.console("[TMSHelper.URLconstructor] -> info: combining with URL information in TMSEvent");
 
                // 2 no absolute URL
   
                // create RegEx to check against
                var startWithHash = new RegExp("^#");
                var startWithDot = new RegExp("^\.(\.?)\/");
                var startWithSlash = new RegExp("^\/");
   
                if (startWithHash.test(url)) {
                    // 2.1 anchor: starting with #
                    //     -> add protocol, hostname, path and query
                    window.TMSHelper.console("[TMSHelper.URLconstructor] -> info: leading hash detected");
                    if (typeof window.TMSEvent['page_url_window_protocol'] === "string" && typeof window.TMSEvent['page_url_window_hostname'] === "string" && typeof window.TMSEvent['page_url_window_path'] === "string" && typeof window.TMSEvent['page_url_window_queryString'] === "string") {
                        window.TMSHelper.console("[TMSHelper.URLconstructor] complete");
                        return (window.TMSEvent['page_url_window_protocol'] + window.TMSEvent['page_url_window_hostname'] + window.TMSEvent['page_url_window_path'] + window.TMSEvent['page_url_window_queryString'] + url);
                    } else {
                        window.TMSHelper.console("[TMSHelper.URLconstructor] -> warning: relevant URL parts in TMSEvent not found, returning UNDEFINED");
                        window.TMSHelper.console("[TMSHelper.URLconstructor] complete");
                        return (undefined);
                    }
                } else if (startWithDot.test(url)) {
                    // 2.2.1 relative link with leading dots
                    //       -> walk through folders to construct URL
                    window.TMSHelper.console("[TMSHelper.URLconstructor] -> info: leading dot(s) detected");
                    if (typeof window.TMSEvent['page_url_window_url'] === "string" && window.TMSEvent['page_url_window_url'] !== "") {
                           
                        var splitURL = url.split("/");
   
                        // get folder of current page
                        // WARNING: if the current URL is the current folder without trailing slash, this step should be omitted!
                        var splitCurrentPageFolder = window.TMSEvent['page_url_window_url'].split("/");
                        splitCurrentPageFolder.pop();
                                                   
                        for (var i = 0; i < splitURL.length; i++) {
                            if (splitURL[i] == ".") {
                                continue;
                            } else if (splitURL[i] == "..") {
                                splitCurrentPageFolder.pop();
                            } else {
                                splitCurrentPageFolder.push(splitURL[i]);
                            }
                        }
   
                        window.TMSHelper.console("[TMSHelper.URLconstructor] complete");
                        return (splitCurrentPageFolder.join("/"));
                    } else {
                        window.TMSHelper.console("[TMSHelper.URLconstructor] -> warning: TMSEvent[page_url_window_url] not found or invalid, returning UNDEFINED");
                        window.TMSHelper.console("[TMSHelper.URLconstructor] complete");
                        return (undefined);
                    }
                } else if (startWithSlash.test(url)) {
                    // 2.2.2 relative link with leading slash
                    //       -> add protocol and hostname
                    window.TMSHelper.console("[TMSHelper.URLconstructor] -> info: leading slash detected");
                    if (typeof window.TMSEvent['page_url_window_protocol'] === "string" && typeof window.TMSEvent['page_url_window_hostname'] === "string") {
                        window.TMSHelper.console("[TMSHelper.URLconstructor] complete");
                        return (window.TMSEvent['page_url_window_protocol'] + window.TMSEvent['page_url_window_hostname'] + url);
                    } else {
                        window.TMSHelper.console("[TMSHelper.URLconstructor] -> warning: relevant URL parts in TMSEvent not found, returning UNDEFINED");
                        window.TMSHelper.console("[TMSHelper.URLconstructor] complete");
                        return (undefined);
                    }
                } else {
                    // 2.2.3 all other relative URLs to files in the current folder
                    window.TMSHelper.console("[TMSHelper.URLconstructor] -> info: relative link to current folder presumed");
                    if (typeof window.TMSEvent['page_url_window_url'] === "string" && window.TMSEvent['page_url_window_url'] !== "") {
  
                        // get folder of current page
                        // WARNING: if the current URL is the current folder without trailing slash, this step should be omitted!
                        var splitCurrentPageFolder = window.TMSEvent['page_url_window_url'].split("/");
                        splitCurrentPageFolder.pop();
      
                        window.TMSHelper.console("[TMSHelper.URLconstructor] complete");
                        return (splitCurrentPageFolder.join("/") + "/" + url);
                    } else {
                        window.TMSHelper.console("[TMSHelper.URLconstructor] -> warning: TMSEvent[page_url_window_url] not found or invalid, returning UNDEFINED");
                        window.TMSHelper.console("[TMSHelper.URLconstructor] complete");
                        return (undefined);
                    }
                }
            } else if (typeof window.TMSCache === "object") {
                window.TMSHelper.console("[TMSHelper.URLconstructor] -> info: combining with URL information in TMSCache");
                // 3 no absolute URL
   
                // create RegEx to check against
                var startWithHash = new RegExp("^#");
                var startWithDot = new RegExp("^\.(\.?)\/");
                var startWithSlash = new RegExp("^\/");
   
                if (startWithHash.test(url)) {
                    // 3.1 anchor: starting with #
                    //     -> add protocol, hostname, path and query
                    window.TMSHelper.console("[TMSHelper.URLconstructor] -> info: leading hash detected");
                    if (typeof window.TMSCache['page_url_window_protocol'] === "string" && typeof window.TMSCache['page_url_window_hostname'] === "string" && typeof window.TMSCache['page_url_window_path'] === "string" && typeof window.TMSCache['page_url_window_queryString'] === "string") {
                        window.TMSHelper.console("[TMSHelper.URLconstructor] complete");
                        return (window.TMSCache['page_url_window_protocol'] + window.TMSCache['page_url_window_hostname'] + window.TMSCache['page_url_window_path'] + window.TMSCache['page_url_window_queryString'] + url);
                    } else {
                        window.TMSHelper.console("[TMSHelper.URLconstructor] -> warning: relevant URL parts in TMSCache not found, returning UNDEFINED");
                        window.TMSHelper.console("[TMSHelper.URLconstructor] complete");
                        return (undefined);
                    }
                } else if (startWithDot.test(url)) {
                    // 3.2.1 relative link with leading dots
                    //       -> walk through folders to construct URL
                    window.TMSHelper.console("[TMSHelper.URLconstructor] -> info: leading dot(s) detected");
                    if (typeof window.TMSCache['page_url_window_url'] === "string" && window.TMSCache['page_url_window_url'] !== "") {
                           
                        var splitURL = url.split("/");
   
                        // get folder of current page
                        // WARNING: if the current URL is the current folder without trailing slash, this step should be omitted!
                        var splitCurrentPageFolder = window.TMSCache['page_url_window_url'].split("/");
                        splitCurrentPageFolder.pop();
                                                   
                        for (var i = 0; i < splitURL.length; i++) {
                            if (splitURL[i] == ".") {
                                continue;
                            } else if (splitURL[i] == "..") {
                                splitCurrentPageFolder.pop();
                            } else {
                                splitCurrentPageFolder.push(splitURL[i]);
                            }
                        }
   
                        window.TMSHelper.console("[TMSHelper.URLconstructor] complete");
                        return (splitCurrentPageFolder.join("/"));
                    } else {
                        window.TMSHelper.console("[TMSHelper.URLconstructor] -> warning: TMSCache[page_url_window_url] not found or invalid, returning UNDEFINED");
                        window.TMSHelper.console("[TMSHelper.URLconstructor] complete");
                        return (undefined);
                    }
                } else if (startWithSlash.test(url)) {
                    // 3.2.2 relative link with leading slash
                    //       -> add protocol and hostname
                    window.TMSHelper.console("[TMSHelper.URLconstructor] -> info: leading slash detected");
                    if (typeof window.TMSCache['page_url_window_protocol'] === "string" && typeof window.TMSCache['page_url_window_hostname'] === "string") {
                        window.TMSHelper.console("[TMSHelper.URLconstructor] complete");
                        return (window.TMSCache['page_url_window_protocol'] + window.TMSCache['page_url_window_hostname'] + url);
                    } else {
                        window.TMSHelper.console("[TMSHelper.URLconstructor] -> warning: relevant URL parts in TMSCache not found, returning UNDEFINED");
                        window.TMSHelper.console("[TMSHelper.URLconstructor] complete");
                        return (undefined);
                    }
                } else {
                    // 3.2.3 all other relative URLs to files in the current folder
                    window.TMSHelper.console("[TMSHelper.URLconstructor] -> info: relative link to current folder presumed");
                    if (typeof window.TMSCache['page_url_window_url'] === "string" && window.TMSCache['page_url_window_url'] !== "") {
  
                        // get folder of current page
                        // WARNING: if the current URL is the current folder without trailing slash, this step should be omitted!
                        var splitCurrentPageFolder = window.TMSCache['page_url_window_url'].split("/");
                        splitCurrentPageFolder.pop();
      
                        window.TMSHelper.console("[TMSHelper.URLconstructor] complete");
                        return (splitCurrentPageFolder.join("/") + "/" + url);
                    } else {
                        window.TMSHelper.console("[TMSHelper.URLconstructor] -> warning: TMSCache[page_url_window_url] not found or invalid, returning UNDEFINED");
                        window.TMSHelper.console("[TMSHelper.URLconstructor] complete");
                        return (undefined);
                    }
                }
            } else {
                window.TMSHelper.console("[TMSHelper.URLconstructor] -> warning: neither TMSEvent nor TMSCache found, returning UNDEFINED");
                window.TMSHelper.console("[TMSHelper.URLconstructor] complete");
                return (undefined);
            }
        }
    } catch(err) {
        window.TMSHelper.console("[TMSHelper.URLconstructor] error:");
        window.TMSHelper.errorHandler(err);
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0132 TMSHelper.URLslasher
// Issued by: Agnosticalyze
// version: 2.1, 2020-11-08
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

// URLslasher: splits a URL into all necessary parts
function URLslasher(url) {
    try {
        window.TMSHelper.console("[TMSHelper.URLslasher] start");
        
        // initialise empty object to work with later on
        var slashedURLObject = {};

        if (typeof url === "string") {
            if (url !== "") {
                // create RegEx to check against
                // var startWithJavascript = new RegExp("^javascript:"); /* REFINEMENT: This is no longer used */
                var startWithProtocol = new RegExp("^[a-zA-Z]*:.*");

                /* REFINEMENT: Remove javascript processing as it is unnecessary */
                // if (startWithJavascript.test(url)) {
                //  // 1 If original starts with javascript:, only return full URL (in according variable)
                //  window.TMSHelper.console("[TMSHelper.URLslasher] -> input URL starts with javascript, returning original URL only");
                //  slashedURLObject['url'] = url;
                // } else {
                /* REFINEMENT: End of refinement */
                // 2 If original URL does not start with a protocol, the constructor will be run -> Constructor will always deliver a full, absolute URL
                if (!startWithProtocol.test(url)) {
                    url = window.TMSHelper.URLconstructor(url);
                }

                // 3 Create a link from URL
                var parser = window.TMSHelper.convertURLStringToLink(url);
                    
                // 4 Slash link and populate returnable object
                slashedURLObject['url'] = url.toString();
                slashedURLObject['protocol'] = parser.protocol;
                slashedURLObject['hostname'] = parser.hostname;
                // for http(s) protocols, add a leading slash to the path
                var startWithHttp = new RegExp("^http(s)?:.*", "gi");
                if (startWithHttp.test(parser.protocol)) {
                    slashedURLObject['path'] = (parser.pathname.charAt(0) !== '/' ? '/' : '') + parser.pathname;
                } else {
                    slashedURLObject['path'] = parser.pathname;
                }
                slashedURLObject['hostnameAndPath'] = slashedURLObject['hostname'] + slashedURLObject['path'];
                slashedURLObject['queryString'] = parser.search.replace('?', '');
                slashedURLObject['fragmentIdentifier'] = parser.hash.replace('#', '');
                // } /* REFINEMENT: Just remove no longer necessary } */
            } else {
                // invalid empty URL, returning all variables with empty values
                window.TMSHelper.console("[TMSHelper.URLslasher] -> warning: input URL is empty, returning empty variables");
                slashedURLObject['url'] = "";
                slashedURLObject['protocol'] = "";
                slashedURLObject['hostname'] = "";
                slashedURLObject['path'] = "";
                slashedURLObject['queryString'] = "";
                slashedURLObject['fragmentIdentifier'] = "";
            }
        } else {
            // invalid data type, returning empty object
            window.TMSHelper.console("[TMSHelper.URLslasher] -> warning: input URL is not a string, returning empty object");
        }

        window.TMSHelper.console("[TMSHelper.URLslasher] complete");
        return slashedURLObject;
    } catch(err) {
        window.TMSHelper.console("[TMSHelper.URLslasher] error:");
        window.TMSHelper.errorHandler(err);
    } 
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0179 TMSHelper.isURIEncoded
// Issued by: Agnosticalyze
// version: 1.1, 2021-12-22
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

// isURIEncoded: checks if a provided URI is HTML encoded or not
function isURIEncoded (uri) {
	try {
		// window.TMSHelper.console("[TMSHelper.isURIEncoded] start");
		if (typeof uri === "string") {
			if (uri !== "") {
				// window.TMSHelper.console("[TMSHelper.isURIEncoded] complete");
				return uri !== decodeURIComponent(uri);
			} else {
				window.TMSHelper.console("[TMSHelper.isURIEncoded] -> info: empty input");
				// window.TMSHelper.console("[TMSHelper.isURIEncoded] complete");
				return FALSE;
			}
		} else {
			window.TMSHelper.console("[TMSHelper.isURIEncoded] -> warning: invalid input");
			// window.TMSHelper.console("[TMSHelper.isURIEncoded] complete");
			return FALSE;
		}
	} catch(err) {
		window.TMSHelper.console("[TMSHelper.isURIEncoded] error:");
		window.TMSHelper.errorHandler(err);
	}
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0180 TMSHelper.decodeURI
// Issued by: Agnosticalyze
// version: 1.1, 2021-12-22
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

// decodeURI: returns a fully URI-decoded version of the provided string
function decodeURI (uri) {
	try {
		window.TMSHelper.console("[TMSHelper.decodeURI] start");
		if (typeof uri === "string") {
			if (uri !== "") {
				var counter = 10;
			    while (window.TMSHelper.isURIEncoded(uri) && counter > 0) {
			        uri = decodeURIComponent(uri);
			        counter--;
			    }
			} else {
				window.TMSHelper.console("[TMSHelper.decodeURI] -> info: empty input");
			}
		} else {
			window.TMSHelper.console("[TMSHelper.decodeURI] -> warning: invalid input");
		}
		window.TMSHelper.console("[TMSHelper.decodeURI] complete");
		return uri;
	} catch(err) {
		window.TMSHelper.console("[TMSHelper.decodeURI] error:");
		window.TMSHelper.errorHandler(err);
	}
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0142 TMSHelper.cookieRead
// Issued by: Agnosticalyze
// version: 2.1, 2021-06-02
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// cookieRead: read cookies
function cookieRead(name) {
    try {
        window.TMSHelper.console("[TMSHelper.cookieRead] start");
        if (typeof name === "undefined" ) {
            window.TMSHelper.console("[TMSHelper.cookieRead] Required parameter name has not been provided");
            return undefined;
        }
        var nameEQ = name + "=";
        // get array of all cookies
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        // search array for cookie name
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) {
                window.TMSHelper.console("[TMSHelper.cookieRead] -> returning: " + c.substring(nameEQ.length,c.length));
                window.TMSHelper.console("[TMSHelper.cookieRead] complete");
                return c.substring(nameEQ.length,c.length);
            }
        }
        window.TMSHelper.console("[TMSHelper.cookieRead] -> returning: null, cookie not found");
        window.TMSHelper.console("[TMSHelper.cookieRead] complete");
        return undefined;
    } catch(err) {
        window.TMSHelper.console("[TMSHelper.cookieRead] error:");
        window.TMSHelper.errorHandler(err);
        return undefined;
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0141 TMSHelper.cookieCreate
// Issued by: Agnosticalyze
// version: 2.2, 2021-06-02
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// cookieCreate: writes a cookie
// Value for "days" must be a number
function cookieCreate(name,value,days,domain) {
    try {
        window.TMSHelper.console("[TMSHelper.cookieCreate] start");
        if (typeof name === "undefined" || typeof value === "undefined") {
            window.TMSHelper.console("[TMSHelper.cookieCreate] Required parameter(s): name, or value has not been provided");
            return
        }
        domain = domain || ""; // defaul value of empty string
        // check if the "days" variable is a number
        if (typeof days === "number") {
            // set cookie expiration to today + value of "days"
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        } else {
            // expires end of session
            var expires = "";
        }
        // value for domain parameter should be the intended one if TMSConfig['tmsConfig_cookieDomain'] is also defined
        if (domain === "" && typeof window.TMSConfig !== "undefined" && typeof window.TMSConfig['tmsConfig_cookieDomain'] === "string") {
          domain = window.TMSConfig['tmsConfig_cookieDomain'];
        }
 
        if (domain !== "") {
            domain = '; domain='+domain + ';';
        }
        // write cookie
        document.cookie = name+"="+value+expires+"; path=/" + domain;
           
        window.TMSHelper.console("[TMSHelper.cookieCreate] complete");
    } catch(err) {
        window.TMSHelper.console("[TMSHelper.cookieCreate] error:");
        window.TMSHelper.errorHandler(err);
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0143 TMSHelper.cookieErase
// Issued by: Agnosticalyze
// version: 2.0, 2020-11-27
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// cookieErase: erases a cookie
function cookieErase(name) {
    try {
        window.TMSHelper.console("[TMSHelper.cookieErase] start");
        window.TMSHelper.cookieCreate(name,"",-1);
        window.TMSHelper.console("[TMSHelper.cookieErase] complete");
    } catch(err) {
        window.TMSHelper.console("[TMSHelper.cookieErase] error:");
        window.TMSHelper.errorHandler(err);
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0161 TMSHelper.copyVarsFromObjectToObject
// Issued by: Agnosticalyze
// version: 2.7.1, 2022-01-28
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
     
// copyVarsFromObjectToObject: copies variables from one object to another
function copyVarsFromObjectToObject(
  sourceObject,
  mergeObject,
  targetPrefix,
  overwrite,
  harmonize,
  includeFromSource,
  excludeFromSource,
  includeFromMerge,
  excludeFromMerge,
  flatten,
  inplace,
  lowercase
) {
try {
  window.TMSHelper.console("[TMSHelper.copyVarsFromObjectToObject] start");
  // stores original reference to merge (output) object for "inplace" changes
  // see end of the function for explanation
  var originalMergeObject = mergeObject;
  
  // in case the copyVars function was simply called passing one object: read all other information (options and objects) from inside this object
  if (
    typeof sourceObject === "object" &&
    typeof mergeObject === "undefined"
  ) {
    window.TMSHelper.console(
      "[TMSHelper.copyVarsFromObjectToObject] -> info: only one object provided, using it as an options object"
    );
    var options = Object.assign({}, sourceObject);
    if (!options["sourceObject"] && !options["mergeObject"]) {
      throw new Error(
        "[TMSHelper.copyVarsFromObjectToObject] -> error: did not provide sourceObject or mergeObject"
      );
    }
    originalMergeObject = options['mergeObject'];
    var sourceObject = Object.assign({}, options["sourceObject"]);
    var mergeObject = Object.assign({}, options["mergeObject"]);
    var possibleOptions = [
      "targetPrefix",
      "overwrite",
      "harmonize",
      "includeFromSource",
      "excludeFromSource",
      "includeFromMerge",
      "excludeFromMerge",
      "sourcePrefix",
      "flatten",
      "inplace",
      "lowercase"
    ];
    for (var i = 0; i < possibleOptions.length; i++) {
      var option = possibleOptions[i];
      switch (option) {
        case "targetPrefix":
          targetPrefix = options["targetPrefix"];
          break;
        case "overwrite":
          overwrite = options["overwrite"];
          break;
        case "harmonize":
          harmonize = options["harmonize"];
          break;
        case "includeFromSource":
          includeFromSource = options["includeFromSource"];
          break;
        case "excludeFromSource":
          excludeFromSource = options["excludeFromSource"];
          break;
        case "includeFromMerge":
          includeFromMerge = options["includeFromMerge"];
          break;
        case "excludeFromMerge":
          excludeFromMerge = options["excludeFromMerge"];
          break;
        case "flatten":
          flatten = options["flatten"];
          break;
        case "inplace":
          inplace = options["inplace"];
          break;
        case "lowercase":
          lowercase = options["lowercase"];
        break;
      }
    }
  }
  
  // if the source is a string, not an object, check if there is an object around with that name
  if (typeof sourceObject === "string") {
    window.TMSHelper.console(
      "[TMSHelper.copyVarsFromObjectToObject] -> info: sourceObject is a string -> evaluating..."
    );
    if (typeof eval(sourceObject) === "object") {
      if (Object.keys(eval(sourceObject)).length > 0) {
        sourceObject = Object.assign({}, eval(sourceObject));
      } else {
        window.TMSHelper.console(
          "[TMSHelper.copyVarsFromObjectToObject] -> warning: sourceObject refers to an empty object -> not evaluated"
        );
      }
    } else {
      window.TMSHelper.console(
        "[TMSHelper.copyVarsFromObjectToObject] -> warning: sourceObject does not refer to an object -> not evaluated"
      );
    }
  } else {
    sourceObject = Object.assign({}, sourceObject);
  }
  
  if (flatten && window.TMSHelper.flattenObject) {
    window.TMSHelper.console(
      "[TMSHelper.copyVarsFromObjectToObject] -> info: requested a flattening of the output object"
    );
    window.TMSHelper.flattenObject(sourceObject, sourceObject);
    window.TMSHelper.flattenObject(mergeObject, mergeObject);
  }

  if (lowercase && window.TMSHelper.lowercaseValues) {
    window.TMSHelper.lowercaseValues(sourceObject);
    window.TMSHelper.lowercaseValues(mergeObject);
  }
  
  // if the target is not an object, presume there is no object the source should be merget into, but rather return a processed version of the source instead
  if (typeof mergeObject !== "object") {
    // if a non-object was passed, create a new empty object that will eventually be returned
    mergeObject = {};
  } else {
    mergeObject = Object.assign({}, mergeObject);
  }
  
  if (typeof sourceObject === "object") {
    // set parameter defaults in case they are omitted or set to invalid values
    if (typeof targetPrefix !== "string") {
      // set default to avoid errors
      targetPrefix = "";
    }
    if (typeof overwrite !== "boolean") {
      if (overwrite === "true") {
        // just for convenience: if overwrite matches the defined string, it is considered to be true, too
        overwrite = true;
      } else {
        // set default to avoid errors
        overwrite = false;
      }
    }
    if (typeof harmonize !== "boolean") {
      if (harmonize === "true") {
        // just for convenience: if overwrite matches the defined string, it is considered to be true, too
        harmonize = true;
      } else {
        // set default to avoid errors
        harmonize = false;
      }
    }
    if (typeof includeFromSource !== "object") {
      includeFromSource = [];
    }
    if (typeof excludeFromSource !== "object") {
      excludeFromSource = [];
    }
    if (typeof includeFromMerge !== "object") {
      includeFromMerge = [];
    }
    if (typeof excludeFromMerge !== "object") {
      excludeFromMerge = [];
    }
  
    // if variable names should be harmonized, rename the variables in sourceObject accordingly
    if (harmonize) {
      window.TMSHelper.harmonize(window.TMSConfig['tmsConfig_processing_dataLayerHarmonizationLookup'], sourceObject);
      window.TMSHelper.harmonize(window.TMSConfig['tmsConfig_processing_dataLayerHarmonizationLookup'], mergeObject);
    } else {
      window.TMSHelper.console(
        "[TMSHelper.copyVarsFromObjectToObject] -> info: variable harmonization not performed"
      );
    }
  
    var prefixIndicator = "P:";
    var includeFromSourcePrefixes = [];
    var excludeFromSourcePrefixes = [];
    var includeFromMergePrefixes = [];
    var excludeFromMergePrefixes = [];
  
    var startsWith = function (item, prefix) {
      return item.indexOf(prefix) === 0;
    };
  
    // flattens an array of arrays (JSON) by one level
    //   side effect: if it contains an array with 0 items, it will be skipped
    //   i.e. concatArrayItems( [ [] ] ) === []
    var concatArrayItems = function (arr) {
      var out = [];
      for (var i = 0; i < arr.length; i++) {
        var entry = arr[i];
        if (entry instanceof Array) {
          out = out.concat(entry);
        } else {
          out.push(entry);
        }
      }
      return out;
    };
  
    // check all items of the inputArray for the prefix
    //   return identified prefixes in sub-array "prefixes"
    //   return all non-prefix items in the sub-array "filteredArray"
    var generatePrefixes = function (inputArray, prefixIndicator) {
      var prefixes = [];
      inputArray = concatArrayItems(inputArray);
      for (var i = 0; i < inputArray.length; i++) {
        var entry = inputArray[i];
        if (startsWith(entry, prefixIndicator)) {
          prefixes.push(entry.slice(prefixIndicator.length));
  
          // remove the prefix entry
          inputArray = [].concat(
            inputArray.slice(0, i),
            inputArray.slice(i + 1)
          );
          // since we removed the current item, move back the current index
          i--;
        }
      }
      return {
        prefixes: prefixes,
        filteredArray: inputArray,
      };
    };
  
    // create/overwrite include- and exclude-filters
    var prefixes = generatePrefixes(includeFromSource, prefixIndicator);
    includeFromSourcePrefixes = prefixes.prefixes;
    includeFromSourceFiltered = prefixes.filteredArray;
  
    prefixes = generatePrefixes(excludeFromSource, prefixIndicator);
    excludeFromSourcePrefixes = prefixes.prefixes;
    excludeFromSourceFiltered = prefixes.filteredArray;
  
    prefixes = generatePrefixes(includeFromMerge, prefixIndicator);
    includeFromMergePrefixes = prefixes.prefixes;
    includeFromMergeFiltered = prefixes.filteredArray;
  
    prefixes = generatePrefixes(excludeFromMerge, prefixIndicator);
    excludeFromMergePrefixes = prefixes.prefixes;
    excludeFromMergeFiltered = prefixes.filteredArray;
  
    // check if a variable starts with a prefix
    var matchesPrefix = function (key, prefixes) {
      if (prefixes.length === 0) return false;
      for (var i = 0; i < prefixes.length; i++) {
        var prefix = prefixes[i];
        if (startsWith(key, prefix)) return true;
      }
      return false;
    };
  
    // filter relevant items in an object according to the 4 previously created arrays
    var processObject = function(
        inputObject,
        includeAttributes,
        includePrefixes,
        excludeAttributes,
        excludePrefixes
    ) {
        // is there anything to filter on?
        if (
            includeAttributes.length === 0 &&
            includePrefixes.length === 0 &&
            excludeAttributes.length === 0 &&
            excludePrefixes.length === 0
        ) {
            return inputObject;
        } else {
            var filteredInputObject = Object.assign({}, inputObject);
            var outputObject = {};
            var keys = Object.keys(inputObject);

            // for each key in the inputObject, check whether it should be kept or removed
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var keyExcluded = false;

                // if the current attribute is found on either exclude filter (array or prefix), remove it from the inputObject
                if (excludeAttributes.length > 0 || excludePrefixes.length > 0) {
                    if (excludeAttributes.indexOf(key) > -1 || matchesPrefix(key, excludePrefixes)) {
                        delete filteredInputObject[key];
                        keyExcluded = true;
                    } // else: current attribute shall not be excluded
                } // else: no exclude filter to apply => filteredInputObject remains unmodified

                // if the current attribute is found on either include filter (array or prefix), add it to the outputObject
                if (includeAttributes.length > 0 || includePrefixes.length > 0) {
                    if (includeAttributes.indexOf(key) > -1 || matchesPrefix(key, includePrefixes)) {
                        outputObject[key] = filteredInputObject[key];
                    } // else: current attribute shall not be included
                } else if (!keyExcluded) {
                    // no include filters to apply => all keys from filteredInputObject copied to outputObject
                    outputObject[key] = filteredInputObject[key];
                }
            }
            return outputObject;
        }
    };
  
    // filter sourceObject and mergeObject to ensure persistence
    sourceObject = processObject(
      sourceObject,
      includeFromSourceFiltered,
      includeFromSourcePrefixes,
      excludeFromSourceFiltered,
      excludeFromSourcePrefixes
    );
    mergeObject = processObject(
      mergeObject,
      includeFromMergeFiltered,
      includeFromMergePrefixes,
      excludeFromMergeFiltered,
      excludeFromMergePrefixes
    );
  
    // clear interdependent variables from target if a (any!) corresponding interdependent variable is found in the source
    if (
      typeof window.TMSConfig["tmsConfig_processing_interdependentVars"] === "object" &&
      Object.keys(window.TMSConfig["tmsConfig_processing_interdependentVars"]).length > 0
    ) {
      // does mergeObject have any keys/values, yet?
      if (Object.keys(mergeObject).length > 0) {
        // check each variable in sourceObject
        for (var attrName in sourceObject) {
          // is the current variable interdependent?
          if (attrName in window.TMSConfig["tmsConfig_processing_interdependentVars"]) {
            // check each interdependent variable
            for (var interdependentAttrName in window.TMSConfig[
              "tmsConfig_processing_interdependentVars"
            ]) {
              // is the current interdependent variable master equal to the current sourceObject variable master?
              if (
                window.TMSConfig["tmsConfig_processing_interdependentVars"][
                  interdependentAttrName
                ] ===
                  window.TMSConfig["tmsConfig_processing_interdependentVars"][
                    attrName
                  ] &&
                attrName in mergeObject
              ) {
                // clear the current interdependent variable from mergeObject (whether it previously existed or not)
                delete mergeObject[interdependentAttrName];
              }
            }
          }
        }
      } else {
        window.TMSHelper.console(
          "[TMSHelper.copyVarsFromObjectToObject] -> info: mergeObject is empty -> clearing interdependent variables not necessary"
        );
      }
      window.TMSHelper.console(
        "[TMSHelper.copyVarsFromObjectToObject] -> info: clearing interdependent variables done"
      );
    } else {
      window.TMSHelper.console(
        "[TMSHelper.copyVarsFromObjectToObject] -> warning: TMSConfig.tmsConfig_processing_interdependentVars not defined"
      );
    }
  
    // copy each attribute (one by one) from source to target
    if (overwrite) {
      // if attributes of target object should be overwritten, loop through source object
      for (var attrName in sourceObject) {
        if (
          sourceObject[attrName] !== "" &&
          typeof sourceObject[attrName] !== "object" &&
          typeof sourceObject[attrName] !== "function"
        ) {
          mergeObject[targetPrefix + attrName] = sourceObject[attrName];
        }
      }
    } else {
      // if attributes of target object should not be overwritten, loop through source object and check that attribute in target object does not exist yet
      for (var attrName in sourceObject) {
        if (typeof targetPrefix !== "string" || targetPrefix === "") {
          if (
            typeof mergeObject[attrName] === "undefined" ||
            (mergeObject[attrName] === "" &&
              typeof sourceObject[attrName] !== "object" &&
              typeof sourceObject[attrName] !== "function")
          ) {
            mergeObject[attrName] = sourceObject[attrName];
          }
        } else if (targetPrefix.charAt(targetPrefix.length - 1) === "_") {
          var targetName = targetPrefix + attrName;
          if (
            typeof mergeObject[targetName] === "undefined" ||
            (mergeObject[targetName] === "" &&
              typeof sourceObject[attrName] !== "object" &&
              typeof sourceObject[attrName] !== "function")
          ) {
            mergeObject[targetName] = sourceObject[attrName];
          }
        } else {
          var targetName =
            targetPrefix +
            attrName.charAt(0).toUpperCase() +
            attrName.slice(1);
          if (
            typeof mergeObject[targetName] === "undefined" ||
            (mergeObject[targetName] === "" &&
              typeof sourceObject[attrName] !== "object" &&
              typeof sourceObject[attrName] !== "function")
          ) {
            mergeObject[targetName] = sourceObject[attrName];
          }
        }
      }
    }
  } else {
    window.TMSHelper.console(
      "[TMSHelper.copyVarsFromObjectToObject] -> warning: sourceObject is not an object -> nothing copied"
    );
  }
  
  // for tealium it is required that current data layerobject (b) is modified on existing object
  // if we would do b = copyVars...(...) inside extension
  // then this assignment will only be visible to that extension,
  // we need to additionally change it "inplace" (changing exact object tealium knows of)
  // so the changes done by the merge process are correctly visible to other extensions and tags
  if (inplace) {
    window.TMSHelper.console("[TMSHelper.copyVarsFromObjectToObject] changing mergeObject inplace");
    // clear original merge object because we might heve removed some properties
    for (var i in originalMergeObject) {
      if (originalMergeObject.hasOwnProperty(i)) delete originalMergeObject[i];
    }
    // reassign all properties back to originalMergeObject
    Object.assign(originalMergeObject, mergeObject)
    window.TMSHelper.console("[TMSHelper.copyVarsFromObjectToObject] inplace changing complete");
  }
  window.TMSHelper.console("[TMSHelper.copyVarsFromObjectToObject] complete");
  return mergeObject;
    } catch (err) {
      // error handler
      window.TMSHelper.console("[TMSHelper.copyVarsFromObjectToObject] error:");
      window.TMSHelper.errorHandler(err);
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0177 TMSHelper.readValue
// Issued by: FELDM
// version: 1.0, 2021-11-20
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

function readValue(name, raw) {
  if (!raw && typeof name !== 'string' && name.length === 0) {
    TMSHelper.console("[TMSHelper.readValue] Provided name was empty. Value has not been read.");
    return undefined;
  }
  var value = TMSHelper.cookieRead("tms_datastore");
  if (typeof value === "undefined") {
    if (window.localStorage) {
      try {
        value = localStorage.getItem('tms_datastore');
      } catch (e) {
        TMSHelper.console("[TMSHelper.readValue] Could not read the value from local storage.");
        TMSHelper.errorHandler(e)
      }
    }
  }
  if (value === undefined || value === null) {
    return undefined
  }

  try {
    value = atob(value)
    value = JSON.parse(value);
  } catch (e) {
    TMSHelper.console("[TMSHelper.readValue] Could not deserialize value.");
    TMSHelper.errorHandler(e)
  }

  if (typeof value !== 'object') {
    return undefined
  }

  if (raw) {
    return value;
  }

  if (value[name + '_expiry'] && Date.now() > value[name + '_expiry']) {
    delete value[name];
    delete value[name + '_expiry'];
    TMSHelper.clearValue(name)
  }

  return value[name];
} 

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0176 TMSHelper.storeValue
// Issued by: FELDM
// version: 1.0, 2021-11-20
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

function storeValue(name, value, exdays) {
  if (typeof name !== 'string' && name.length === 0) {
    TMSHelper.console("[TMSHelper.storeValue] Provided name was empty. Value has not been stored.");
    return;
  }
  var data = TMSHelper.readValue(undefined, true) || {};
  data[name] = value;
  if (exdays) {
    var expiry = Number(exdays) * 24*60*60*1000 + Date.now();
    if (!isNaN(expiry)) {
      data[name + '_expiry'] = expiry;
    } else {
      TMSHelper.console("[TMSHelper.storeValue] Invalid expiry dates value. Value not set.");
      return;
    }
  }
  try {
    data = JSON.stringify(data);
  } catch (e) {
    TMSHelper.console("[TMSHelper.storeValue] Value could not be serialized.");
    TMSHelper.errorHandler(e);
  }
  data = btoa(data);
  if (window.localStorage) {
    localStorage.setItem("tms_datastore", data)
  } else {
    TMSHelper.cookieCreate("tms_datastore", data, 365)
  }
} 

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0178 TMSHelper.clearValue
// Issued by: FELDM
// version: 1.0, 2021-11-20
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

function clearValue(name) {
  TMSHelper.storeValue(name, undefined);
  TMSHelper.storeValue(name + '_expiry', undefined);
} 

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0151 TMSHelper.isAnchorToSamePage
// Issued by: Agnosticalyze
// version: 2.1, 2021-03-05
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// isAnchorToSamePage: checks if a link goes to an anchor on the same page
function isAnchorToSamePage(url) {
    try {
        window.TMSHelper.console("[TMSHelper.isAnchorToSamePage] start");
        if (typeof url === "string" && url !== "") {
            var splitURL = url.split("#");
            if (typeof splitURL[1] !== "undefined" && splitURL[1] !== "") {
                // Only proceed if url contains information behind a #
                if (typeof window.TMSCache === "object") {
                    var constructedURL = window.TMSHelper.URLconstructor(url);
                    var slashedURL = window.TMSHelper.URLslasher(constructedURL);
      
                    var output = false;
 
                    // 1 Current pages URL is already processed in TMSCache
                    if (typeof window.TMSCache['page_url_window_hostname'] === "string" && typeof window.TMSCache['page_url_window_path'] === "string") {
                        if (slashedURL['hostname'].toLowerCase() === window.TMSCache['page_url_window_hostname'].toLowerCase() && slashedURL['path'].toLowerCase() === window.TMSCache['page_url_window_path'].toLowerCase()) {
                            window.TMSHelper.console("[TMSHelper.isAnchorToSamePage] -> info: anchor to same page (window) identified");
                            output = true;
                        } else {
                            window.TMSHelper.console("[TMSHelper.isAnchorToSamePage] -> info: based on page (window) URL in TMSCache: not an anchor to same page");
                        }
                    }
          
                    // 2 Canonical URL is already processed in TMSCache
                    if (typeof window.TMSCache['page_url_canonical_hostname'] === "string" && typeof window.TMSCache['page_url_canonical_path'] === "string") {
                        if (slashedURL['hostname'].toLowerCase() === window.TMSCache['page_url_canonical_hostname'].toLowerCase() && slashedURL['path'].toLowerCase() === window.TMSCache['page_url_canonical_path'].toLowerCase()) {
                            window.TMSHelper.console("[TMSHelper.isAnchorToSamePage] -> info: anchor to same page (canonical) identified");
                            output = true;
                        } else {
                            window.TMSHelper.console("[TMSHelper.isAnchorToSamePage] -> info: based on canonical URL in TMSCache: not an anchor to same page");
                        }
                    }
 
                    window.TMSHelper.console("[TMSHelper.isAnchorToSamePage] complete");
                    return output;
                } else {
                    window.TMSHelper.console("[TMSHelper.isAnchorToSamePage] -> warning: TMSCache not found");
                    window.TMSHelper.console("[TMSHelper.isAnchorToSamePage] complete");
                    return false;
                }
            } else {
                // Nothing was found in url behind the # or no # was found
                window.TMSHelper.console("[TMSHelper.isAnchorToSamePage] -> info: no fragment identifier found");
                window.TMSHelper.console("[TMSHelper.isAnchorToSamePage] complete");
                return false;
            }
        } else {
            window.TMSHelper.console("[TMSHelper.isAnchorToSamePage] -> warning: invalid input URL");
            window.TMSHelper.console("[TMSHelper.isAnchorToSamePage] complete");
            return false;
        }
    } catch (err) {
        window.TMSHelper.console("[TMSHelper.isAnchorToSamePage] error:");
        window.TMSHelper.errorHandler(err);
        return false;
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0152 TMSHelper.isDownloadLink
// Issued by: Agnosticalyze
// version: 2.1, 2022-06-18
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

// isDownloadLink: checks if a link matches a predefined set of filetypes to be counted as a download
// returns true or false
function isDownloadLink(url) {
    try {
        window.TMSHelper.console("[TMSHelper.isDownloadLink] start");

        if (typeof url === "string" && url !== "") {
            // 1 set filetype RegEx to test against
            // assumption: single slash precedes filetype to avoid matching any domain part
            if (typeof window.TMSConfig['tmsConfig_event_downloadFileType'] !== "undefined" && window.TMSConfig['tmsConfig_event_downloadFileType'] !== "") {
                // 1.1 retrieve list of filetypes set by TMS/DEV
                var fileTypeString = new RegExp("[^\\/]\\/[^\\/].*\\.(?:" + window.TMSConfig['tmsConfig_event_downloadFileType'] + ")");
            } else {
                // 1.2 if not available, use generic list of filetypes (catchall)
                var fileTypeString = new RegExp(
                    "[^\\/]\\/[^\\/].*\\.(?:avi|css|csv|doc|docx|eps|exe|feed|gif|ics|jpg|js|m4v|mov|mp3|pdf|png|ppt|pptx|rar|tab|txt|vsd|vxd|wav|wma|wmv|xls|xlsx|xml|zip)"
                );
            }

            // 2 get simple URL without queries to avoid matching file types in parametrization of URL
            var strippedURL = url.match(new RegExp(".*?(\\?|\\#|\\=|$)"))[0]

            // 3 test simple URL against filetype RegEx defined in 1
            window.TMSHelper.console("[TMSHelper.isDownloadLink] complete");
            return fileTypeString.test(strippedURL);
        } else {
            window.TMSHelper.console("[TMSHelper.isDownloadLink] -> warning: invalid input UR");
            window.TMSHelper.console("[TMSHelper.isDownloadLink] complete");
        }
        
    } catch (err) {
        window.TMSHelper.console("[TMSHelper.isDownloadLink] error:");
        window.TMSHelper.errorHandler(err);
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0153 TMSHelper.isEmailLink
// Issued by: Agnosticalyze
// version: 2.0, 2020-11-26
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// isEmailLink: checks if a url contains a mailto: prefix
// returns true or false
function isEmailLink(url) {
    try {
        window.TMSHelper.console("[TMSHelper.isEmailLink] start");
        if (typeof url === "string" && url.search(/^mailto:/) !== -1) {
            window.TMSHelper.console("[TMSHelper.isEmailLink] complete");
            return true;
        } else {
            window.TMSHelper.console("[TMSHelper.isEmailLink] -> url is not an email link");
            window.TMSHelper.console("[TMSHelper.isEmailLink] complete");
            return false;
        }
    } catch(err) {
        window.TMSHelper.console("[TMSHelper.isEmailLink] error:");
        window.TMSHelper.errorHandler(err);
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0154 TMSHelper.isOnsiteLink
// Issued by: Agnosticalyze
// version: 2.1, 2021-08-20
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

// isOnsiteLink: checks if a link matches a predefined set of URL parts to be considered as onsite navigation
// returns true or false
function isOnsiteLink(url) {
  try {
      window.TMSHelper.console("[TMSHelper.isOnsiteLink] start");
      if ( typeof url !== "string" || !url ){
          // 1 check url for empty url: this is onsite and therefore return true.
          window.TMSHelper.console("[TMSHelper.isOnsiteLink] -> warning: input url is empty -> treat as onsite link");
          window.TMSHelper.console("[TMSHelper.isOnsiteLink] complete");
          return true;
      } else if (typeof window.TMSConfig === "object" && typeof window.TMSCache === "object") {
          // 2 Target URL handling
          // 2.1 complete Target URL (use case: incomplete event target URL was provided by DEV in event request)
          var constructed_url = window.TMSHelper.URLconstructor(url);
          // 2.2 slash Target URL
          var slashed_url = window.TMSHelper.URLslasher(constructed_url);

          // 3 Check if the url is a javascript url which we consider as onsite
          if (slashed_url.protocol === 'javascript:' || slashed_url.protocol === 'mailto:' || slashed_url.protocol === 'tel:') {
              return true;
          }
          // 4 set onsitedomain RegEx and test against slashed-url hostname and path
          if (typeof window.TMSConfig['tmsConfig_event_onsiteURL'] === "string" && window.TMSConfig['tmsConfig_event_onsiteURL'] !== "") {
              // 4.1 retrieve list of onsite URLs set by TMS/DEV
              var regexOnsite = new RegExp(window.TMSConfig['tmsConfig_event_onsiteURL'], "gi");
              window.TMSHelper.console("[TMSHelper.isOnsiteLink] -> info: window.TMSConfig['tmsConfig_event_onsiteURL'] is defined");
          } else {
              // 4.2 if not available, use current window domain, canonical domain and alternate domain as fallback
              var onsiteUrlList = "";
              if (typeof window.TMSCache['page_url_window_hostname'] === "string" && window.TMSCache['page_url_window_hostname'] !== "") {
                  onsiteUrlList = window.TMSCache['page_url_window_hostname'];
              }
              if (typeof window.TMSCache['page_url_canonical_hostname'] === "string" && window.TMSCache['page_url_canonical_hostname'] !== "") {
                  onsiteUrlList = onsiteUrlList + "|" + window.TMSCache['page_url_canonical_hostname'];
              }
              if (typeof window.TMSCache['page_url_alternate_hostname'] === "string" && window.TMSCache['page_url_alternate_hostname'] !== "") {
                  onsiteUrlList = onsiteUrlList + "|" + window.TMSCache['page_url_alternate_hostname'];
              }
            
              var regexOnsite = new RegExp(onsiteUrlList, "gi");
              window.TMSHelper.console("[TMSHelper.isOnsiteLink] -> info: window.TMSConfig[tmsConfig_event_onsiteURL] not defined, use page_url variables instead");
          }

          // 5 compare slashed-url hostname and path against onsite URL RegEx defined in previous step(s)
          window.TMSHelper.console("[TMSHelper.isOnsiteLink] complete");
          return regexOnsite.test(slashed_url['hostname'] + "/" + slashed_url['path']);
      } else {
          window.TMSHelper.console("[TMSHelper.isOnsiteLink] -> warning: TMSConfig and/or TMSCache not defined");
          window.TMSHelper.console("[TMSHelper.isOnsiteLink] complete");
          return true;
      }
  } catch (err) {
      window.TMSHelper.console("[TMSHelper.isOnsiteLink] error:");
      window.TMSHelper.errorHandler(err);
      return true;
  }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0155 TMSHelper.isPhoneLink
// Issued by: Agnosticalyze
// version: 2.0, 2020-11-26
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// isPhoneLink: checks if a url contains a tel: prefix
// returns true or false
function isPhoneLink(url) {
    try {
        window.TMSHelper.console("[TMSHelper.isPhoneLink] start");
        if (typeof url === "string" && url.search(/^tel:/) !== -1) {
            window.TMSHelper.console("[TMSHelper.isPhoneLink] complete");
            return true;
        } else {
            window.TMSHelper.console("[TMSHelper.isPhoneLink] -> url is not a phone link");
            window.TMSHelper.console("[TMSHelper.isPhoneLink] complete");
            return false;
        }
    } catch(err) {
        window.TMSHelper.console("[TMSHelper.isPhoneLink] error:");
        window.TMSHelper.errorHandler(err);
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0156 TMSHelper.isShareLink
// Issued by: Agnosticalyze
// version: 1.1, 2022-01-28
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// isShareLink: checks if a url contains a share link
// returns true or false
function isShareLink(url) {
    try {
        window.TMSHelper.console("[TMSHelper.isShareLink] start");
        if (window.TMSHelper.identifySocialProvider(url)) {
        	window.TMSHelper.console("[TMSHelper.isShareLink] complete");
        	window.TMSHelper.console("[TMSHelper.isShareLink] -> info: link is a share link");
			return true;
        }
        window.TMSHelper.console("[TMSHelper.isShareLink] -> info: link is not a share link");
        window.TMSHelper.console("[TMSHelper.isShareLink] complete");
        return false;
    } catch(err) {
        window.TMSHelper.console("[TMSHelper.isShareLink] error:");
        window.TMSHelper.errorHandler(err);
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0157 TMSHelper.identifySocialProvider
// Issued by: Agnosticalyze
// version: 1.3, 2022-06-07
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

function identifySocialProvider(url) {
    try {
        window.TMSHelper.console("[TMSHelper.identifySocialProvider] start");
        var social_providers = {
            'email': /^mailto:\?.*/,
            'facebook': /(www\.|\/\/)facebook\.com\/sharer.*\.php*/,
            'linkedin': /(www\.|\/\/)linkedin\.com\/(sharing|shareArticle)/,
            'pinterest': /(www\.|\/\/)pinterest\.com\/pin\/create\/button*/,
            'telegram': /tg\:\/\/msg_url*/,
            'tumblr': /(www\.|\/\/)tumblr\.com\/share\/link*/,
            'twitter': /(www\.|\/\/)twitter\.com\/(share*|intent*)/,
            'whatsapp': /(api\.whatsapp\.com\/send)|(wa\.me\/\?)/,
            'workplace': /(work|zurich)\.workplace\.com\/sharer\.php/,
            'xing': /(www\.|\/\/)xing\.com\/social_plugins\/share*/,
        }

        var providers = Object.keys(social_providers);
        for (var i = 0; i < providers.length; i++) {
            var provider = providers[i];
            var regex = social_providers[provider];
            if (regex.test(url)) {
                window.TMSHelper.console("[TMSHelper.identifySocialProvider] -> info: identified social provider: '" + provider + "'.");
                window.TMSHelper.console("[TMSHelper.identifySocialProvider] complete");
                return provider;
            }
        }

        window.TMSHelper.console("[TMSHelper.identifySocialProvider] -> info: didn't identify social provider");
        window.TMSHelper.console("[TMSHelper.identifySocialProvider] complete");
        return;
    } catch (err) {
        window.TMSHelper.console("[TMSHelper.identifySocialProvider] error:");
        window.TMSHelper.errorHandler(err);
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0162 TMSHelper.flattenObject
// Issued by: Agnosticalyze
// version: 2.0.1, 2021-03-11
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
function flattenObject(input) {
    try {
        window.TMSHelper.console("[TMSHelper.flattenObject] start");
 
        // Ignore keys in the data layer that start with the following text
            // Expecting an Object of strings
            /*
            ignore_keys = {
                "user" : 1,
                "util" : 1
            };
            */
        var ignore_keys = window.TMSConfig["tmsConfig_processing_flattener_ignoreKeys"] || {};
 
        // Specify a prefix to be added to all (nested) elements
            // prefix = "dl_";
        var prefix = window.TMSConfig["tmsConfig_processing_flattener_prefix"] || "";
 
        // Keys to be removed from the new flattened key name
            // For a flattened key, you have digitalData.page.pageInfo.pageName and you want digitalData.page.pi.pageName
            /*
            replace_keys = {
                "pageInfo":"pi"
            };
            */
              
            // For a flattened key, you have digitalData.page.pageInfo.pageName and you want digitalData.page.pageName
            /*
            replace_keys = {
                "pageInfo":""
            };
            */
              
            // For a flattened key, you have digitalData.page.pageInfo.pageName and you want digitalData.pageName
            /*
            replace_keys = {
                "page":"",
                "pageInfo":""
            };
            */
        var replace_keys = window.TMSConfig["tmsConfig_processing_flattener_replaceKeys"] || {};
 
        // In cases of a nested Object, what should join the parent key and child key
        var nested_delimiter = window.TMSConfig["tmsConfig_processing_flattener_delimiter"] || "_";
 
         
        // create list of regexes
        var replace_keys_list = Object.keys(replace_keys);
        var replace_keys_regex = replace_keys_regex || {};
 
        // Make a start of string and end of string regex
        replace_keys_regex.startOfString = new RegExp(
            "^[" + nested_delimiter + "]"
        );
        replace_keys_regex.endOfString = new RegExp(
            "[" + nested_delimiter + "]$"
        );
        replace_keys_list.forEach(function (name) {
            // Store a copy of the regex in the replace_keys_regex Object so that the regexs are only built once
            replace_keys_regex[name] = new RegExp(
                "[" +
                nested_delimiter +
                "]?" +
                name +
                "[" +
                nested_delimiter +
                "]?",
                "g"
            );
        });
  
        ignoreKey = function (key, re) {
            var should_ignore_key = 0;
            // Build a new array to avoid running through Object.keys multiple times
            if (typeof ignore_keys_list === "undefined") {
                ignore_keys_list = Object.keys(ignore_keys);
                ignore_keys_list.forEach(function (name) {
                    // Store a copy of the regex in the Object
                    ignore_keys[name] = new RegExp("^" + name);
                    if (key.match(ignore_keys[name])) {
                        should_ignore_key = 1;
                    }
                });
            } else {
                // Loop through the ignore_keys Object to see if we should ignore this key
                ignore_keys_list.forEach(function (name) {
                    if (key.match(ignore_keys[name])) {
                        should_ignore_key = 1;
                    }
                });
            }
            return should_ignore_key;
        };
 
        getKeyName = function (key, re) {
            // Loop through the replace_keys Object to see what we should be replacing
            replace_keys_list.forEach(function (name) {
                key = keyReplace(key, name, replace_keys_regex[name]);
            });
            return key;
        };
 
        keyReplace = function (key, name, re) {
            // Check to see if we are replacing the key name with a new value or if we are removing the key altogether
            if (replace_keys[name] === "") {
                // The key needs to be removed completely
                key = key.replace(re, nested_delimiter);
                // Check to see if the key starts with the nested delimiter and if so, remove it
                if (key.indexOf(nested_delimiter) === 0) {
                    var cleanRegEx = new RegExp("^[" + nested_delimiter + "]");
                    key = key.replace(cleanRegEx, "");
                }
            } else {
                // Make a copy of the original key to see how we need to update the key name
                var origKey = key;
                // Replace the key name
                key = key.replace(
                    re,
                    nested_delimiter + replace_keys[name] + nested_delimiter
                );
                // Check for the start of the origKey to see of the nested delimiter is there
                if (!origKey.match(replace_keys_regex.startOfString)) {
                    // Remove the nested delimiter from the start of the string
                    var cleanRegEx = new RegExp("^[" + nested_delimiter + "]");
                    key = key.replace(cleanRegEx, "");
                }
                // Check for the end of the origKey to see of the nested delimiter is there
                if (!origKey.match(replace_keys_regex.endOfString)) {
                    // Add the nested delimiter to the end of the string
                    var cleanRegEx = new RegExp("[" + nested_delimiter + "]$");
                    key = key.replace(cleanRegEx, "");
                }
            }
            return key;
        };
 
        processDataObject = function (input, output, parent_key, create_array) {
            var create_array = create_array || false;
            if (typeof parent_key === "undefined") {
                // This Object isn't nested in another Object
                parent_key = "";
            } else {
                // Add the nested_delimiter to the parent key if the delimiter isn't already at the end
                var nested_delimiter_regex = new RegExp("[" + nested_delimiter + "]$");
                if (!parent_key.match(nested_delimiter_regex)) {
                    parent_key += "" + nested_delimiter;
                }
            }
            Object.keys(input).forEach(function (key) {
                var nested_key_name = parent_key + key;
                // Format the new key name and take out any whitespace
                var new_key_name = getKeyName(
                    (prefix + parent_key + key).replace(/\s/g, "")
                );
                // Set the key_type to limit the number of typeof checks
                var key_type = typeOf(input[key]);
                if (key_type !== "undefined" && key_type != null) {
                    if (
                        key_type.match(/boolean|string|number|date/) &&
                        !ignoreKey(key)
                    ) {
                        // If input[key] is a date, convert to ISOString
                        if (typeOf(input[key]) === "date") {
                            input[key] = input[key].toISOString();
                        }
                        // Check to see if we need to create an array for this data point
                        if (create_array) {
                            // First check to see if this key exists
                            if (typeOf(output[new_key_name]) !== "array") {
                                // Make the key an array
                                output[new_key_name] = [];
                            }
                            // output[new_key_name].push("" + input[key]); // Force value to be a string
                            output[new_key_name].push(input[key]); // Do not force value to be a string
                        } else {
                            // If the value of the key is a boolean or a string or a number and
                            // the key shouldn't be ignored add to the data layer
                            // output[new_key_name] = "" + input[key]; // Force value to be a string
                            output[new_key_name] = input[key]; // Do not force value to be a string
                        }
                    } else if (key_type === "object" && !ignoreKey(key)) {
                        // Process this piece of the data layer and merge it
                        processDataObject(
                            input[key],
                            output,
                            nested_key_name,
                            create_array
                        );
                    } else if (key_type === "array") {
                        processDataArray(input[key], output, nested_key_name);
                    }
                }
            });
        };
 
        processDataArray = function (input, output, parent_key) {
            var inputLength = input.length;
            if (typeof parent_key === "undefined") {
                // This Object isn't nested in another Object
                parent_key = "";
            } else if (
                inputLength > 0 &&
                typeOf(input[0]).match(/boolean|string|number|date/)
            ) {
                // This is a normal array that doesn't need a nested delimiter
            } else {
                // Add the nested_delimiter to the parent key
                parent_key += "" + nested_delimiter;
            }
            // Format the new key name and take out any whitespace
            var new_key_name = getKeyName(
                (prefix + parent_key).replace(/\s/g, "")
            );
            for (var n = 0; n < inputLength; n++) {
                var key_type = typeOf(input[n]);
                if (key_type.match(/boolean|string|number|date/)) {
                    // If input[n] is a date, convert to ISOString
                    if (key_type === "date") {
                        input[n] = input[n].toISOString();
                    }
                    // First check to see if this key exists
                    if (typeOf(output[new_key_name]) !== "array") {
                        // Make the key an array
                        output[new_key_name] = [];
                    }
                    // If the value of the key is a boolean or a string or a number and
                    // the key shouldn't be ignored add to the data layer
                    // output[new_key_name].push("" + input[n]); // Force value to be a string
                    output[new_key_name].push(input[n]); // Do not force value to be a string
                } else if (key_type === "Object") {
                    processDataObject(input[n], output, new_key_name, 1);
                }
            }
        };
 
        typeOf = function (e) {
            return {}.toString
                .call(e)
                .match(/\s([a-zA-Z]+)/)[1]
                .toLowerCase();
        };
 
        // Make sure Object exists
        if (typeof input === "undefined") {
            return false;
        }
         
        // Make sure new Object exists
        output = {};
         
        // Check to see if this Object is an array
        if (typeOf(input) === "array") {
            // Store a safe copy of this Object
            var temp_array = JSON.parse(JSON.stringify(input));
            var temp_array_length = temp_array.length;
            // Clean up the Object
            input = {};
            for (var i = 0; i < temp_array_length; i++) {
                processDataObject(temp_array[i], output);
            }
        } else {
            processDataObject(input, output);
        }
          
        window.TMSHelper.console("[TMSHelper.flattenObject] complete");
        return output;
    } catch (err) {
        // error handler
        window.TMSHelper.console("[TMSHelper.flattenObject] error:");
        window.TMSHelper.errorHandler(err);
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0174 TMSHelper.harmonize
// Issued by: Agnosticalyze
// version: 1.0.1, 2021-05-15
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

function harmonize(config, obj) {
    try {
        window.TMSHelper.console("[TMSHelper.harmonize] start");
        // if variable names should be harmonized, rename the variables in obj accordingly
        if (typeof config ==="object" && Object.keys(config).length > 0) {
            // check each variable listed in the harmonization lookup
            for (var attrNameCurrent in config) {
                if (typeof config[attrNameCurrent] === "string") {
                    // only one legacy name found
                    if (attrNameCurrent in obj) {
                        // CURRENT variable is conained in obj
                        if (config[attrNameCurrent] in obj) {
                            // CURRENT variable and LEGACY variable are conained in obj
                            // => delete the legacy variable from obj
                            delete obj[config[attrNameCurrent]];
                            // => set flag
                            obj["event_processing_dataLayerHarmonizationPerformed"] = true;
                            // } else {
                            // only CURRENT variable is conained in obj
                            // => do nothing
                        }
                    } else if (config[attrNameCurrent] in obj) {
                        // only LEGACY variable is contained in obj
                        // => rename
                        obj[attrNameCurrent] = obj[config[attrNameCurrent]];
                        // => delete the legacy variable from obj
                        delete obj[config[attrNameCurrent]];
                        // => set flag
                        obj["event_processing_dataLayerHarmonizationPerformed"] = true;
                        // } else {
                        // neither CURRENT nor LEGACY variable are conained in obj
                        // => do nothing
                    }
                } else if (typeof config[attrNameCurrent] === "object") {
                    // potentially multiple legacy names found
                    if (attrNameCurrent in obj) {
                        // CURRENT variable is conained in obj
                        for (var idx in config[attrNameCurrent]) {
                            var attrNameOld = config[attrNameCurrent][idx];
                            if (attrNameOld in obj) {
                                // CURRENT variable and LEGACY variable are conained in obj
                                // => delete the legacy variable from obj
                                delete obj[attrNameOld];
                                // => set flag
                                obj["event_processing_dataLayerHarmonizationPerformed"] = true;
                                // } else {
                                // only CURRENT variable is conained in obj
                                // => do nothing
                            }
                        }
                    } else {
                        // check each legacy name if it is contained in obj
                        loopCheckOldNames: for (var idx in config[attrNameCurrent]) {
                            var attrNameOld = config[attrNameCurrent][idx];
                            if (attrNameOld in obj) {
                                // only LEGACY variable is contained in obj
                                // => rename if CURRENT variable was not created with an earlier iteration of this loop
                                if (typeof obj[attrNameCurrent] === "undefined") {
                                    obj[attrNameCurrent] = obj[attrNameOld];
                                }
                                // => delete the legacy variable from obj
                                delete obj[attrNameOld];
                                // => set flag
                                obj["event_processing_dataLayerHarmonizationPerformed"] = true;
                                // } else {
                                // only CURRENT variable is conained in obj
                                // => do nothing
                            }
                        }
                    }
                } else {
                    window.TMSHelper.console("[TMSHelper.harmonize] -> warning: config is invalid");
                }
            }
        } else {
            window.TMSHelper.console("[TMSHelper.harmonize] -> warning: config is invalid");
        }
        window.TMSHelper.console("[TMSHelper.harmonize] complete");
    } catch (err) {
        // error handler
        window.TMSHelper.console("[TMSHelper.harmonize] error:");
        window.TMSHelper.errorHandler(err);
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0175 TMSHelper.lowercaseValues
// Issued by: Agnosticalyze
// version: 1.0.1, 2021-06-09
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

function lowercaseValues(obj, skip_keys) {
  skip_keys = skip_keys || [];
  var keys = Object.keys(obj)
  for (var c in keys) {
    var k = keys[c];
    if (! (obj.hasOwnProperty(k))) continue;
    if (skip_keys.indexOf(k) !== -1) continue;
    try {
        if (obj[k] instanceof Array || obj[k] instanceof Object || typeof obj[k] === 'boolean') continue;
        obj[k] = obj[k].toString().toLowerCase();
    } catch (e) {
      console('[TMSHelper.lowercaseValues] lowercasing failed')
      errorHandler(e);
    }
  }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0171 TMSHelper.maskEmails
// Issued by: Agnosticalyze
// version: 2.0, 2022-06-22
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
function maskEmails(url) {
    var slashed = window.TMSHelper.URLslasher(url);
    var regex = new RegExp(
        "[A-Z0-9=!#/%&'~\\-\\.\\+\\*\\?\\$\\{\\}\\|\\^]+@[A-Z0-9-]+\\.[A-Z0-9-]+(?:\\.[A-Z0-9-]+)*",
        "gi"
    );
    if (slashed.queryString) {
        var items = slashed.queryString.split("&").map(function (item) {
      var eq = item.indexOf("=");
      if (eq === -1) {
        return [item];
      }
            return [item.substring(0, eq), item.substring(eq + 1)];
        });
        for (var i in items) {
            var item = items[i];
            if (item.length < 2) continue;
 
            if (regex.test(item[1])) {
                // mask a query parameter value that is an email address
                item[1] = "******@***.**";
            }
        }
        slashed.queryString = items
            .map(function (item) {
                return item.join("=");
            })
            .join("&");
        var newUrl = [
            slashed.protocol,
            "//",
            slashed.hostnameAndPath,
      '?',
            slashed.queryString,
        ];
        if (slashed.fragmentIdentifier) {
            newUrl.push("#");
            newUrl.push(slashed.fragmentIdentifier);
        }
        return newUrl.join("");
    }
    return url;
}
  
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0172 TMSHelper.maskUnknownParameters
// Issued by: Agnosticalyze
// version: 1.1, 2022-06-22
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
function maskUnknownParameters(str) {
    var slashed = window.TMSHelper.URLslasher(str);
    if (slashed.queryString) {
        var items = slashed.queryString.split("&").map(function (item) {
            return item.split("=");
        });
        for (var i in items) {
            var item = items[i];
            if (item.length < 2) continue;
            if (
                window.TMSConfig.tmsConfig_processing_obfuscate_parametersToPreserve &&
                window.TMSConfig.tmsConfig_processing_obfuscate_parametersToPreserve.includes(
                    item[0]
                )
            ) {
                // skip parameter that should be preserved
                continue;
            }
            // mask a query parameter value that haven't been preserved
            item[1] = "******";
        }
        slashed.queryString = items
            .map(function (item) {
                return item.join("=");
            })
            .join("&");
        var newUrl = [
            slashed.protocol,
            "//",
            slashed.hostnameAndPath,
            "?",
            slashed.queryString,
        ];
        if (slashed.fragmentIdentifier) {
            newUrl.push("#");
            newUrl.push(slashed.fragmentIdentifier);
        }
        return newUrl.join("");
    }
    return str;
}
  
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0173 TMSHelper.removeUnknownParameters
// Issued by: Agnosticalyze
// version: 1.1, 2022-06-22
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
function removeUnknownParameters(str) {
    var slashed = window.TMSHelper.URLslasher(str);
    if (slashed.queryString) {
        var items = slashed.queryString.split("&").map(function (item) {
            return item.split("=");
        });
        var new_items = [];
        for (var i in items) {
            var item = items[i];
            if (item.length < 2) continue;
            // check if current parameter is on the list to be preserved
            if (
                window.TMSConfig.tmsConfig_processing_obfuscate_parametersToPreserve &&
                window.TMSConfig.tmsConfig_processing_obfuscate_parametersToPreserve.includes(
                    item[0]
                )
            ) {
                // add parameter to new items array
                new_items.push(item);
                continue;
            }
            // otherwise do not add parameter to new items array to remove them
        }
        slashed.queryString = new_items
            .map(function (item) {
                return item.join("=");
            })
            .join("&");
        var newUrl = [
            slashed.protocol,
            "//",
            slashed.hostnameAndPath,
            "/",
            slashed.queryString,
        ];
        if (slashed.fragmentIdentifier) {
            newUrl.push("#");
            newUrl.push(slashed.fragmentIdentifier);
        }
        return newUrl.join("");
    }
    return str;
}
  
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0171 TMSHelper.formatDateString
// Issued by: Agnosticalyze
// version: 2.0, 2020-11-26
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// formatDateString: convert strings to other valid date formats as desired
function formatDateString(inputDate, inputFormat, outputFormat) {
    try {
        window.TMSHelper.console("[TMSHelper.formatDateString] start");
        // configuration
        var placeholder = ['MM', 'DD', 'YYYY']; // allowed placeholder for month, day, year
        var delimiterPattern = ['\\.', '-', '/', '_', '\\\\', "\\'", '\\"']; // used to regex check format
        var posY, posM, posD, inputDelimiter, pattern, format, input, output;
        // check the inputDate is filled before doing anything
        if (inputDate === "" || inputDate === undefined || inputFormat === "" || inputFormat === undefined) {
            window.TMSHelper.console("[TMSHelper.formatDateString] inputDate or inputFormat not defined - date conversion aborted");
            return false;
        }
        // match parameters to array
        var ymdPattern = placeholder.join('|'); // pattern to check input/outpuFormat
        var limiterPattern = delimiterPattern.join('|')
        var formatPattern = new RegExp('^(' + ymdPattern + ')(' + limiterPattern + ')(' + ymdPattern + ')(' + limiterPattern + ')(' + ymdPattern + ')$');
        var inputPattern = new RegExp('^(\\d{2,4})(' + limiterPattern + ')(\\d{2,4})(' + limiterPattern + ')(\\d{2,4})$');
        format = inputFormat.match(formatPattern) || [];
        input = inputDate.match(inputPattern) || [];
        output = outputFormat.match(formatPattern) || [];
        // simple error checking, length has always to be 10
        if (inputFormat.length !== 10 || inputDate.length !== 10 || outputFormat.length !== 10) {
            window.TMSHelper.console("[TMSHelper.formatDateString] no correct date length detected - date conversion aborted");
            return false;
        } else if (format.length !== 6 || input.length !== 6 || output.length !== 6) {
            window.TMSHelper.console("[TMSHelper.formatDateString] no correct date matching detected - date conversion aborted");
            return false;
        } else if (format[2] !== input[2]) {
            window.TMSHelper.console("[TMSHelper.formatDateString] first delimiter not matching - date conversion aborted");
            return false;
        } else if (format[4] !== input[4]) {
            window.TMSHelper.console("[TMSHelper.formatDateString] second delimiter not matching - date conversion aborted");
            return false;
        } else if (format.indexOf(placeholder[2]) === -1 || format.indexOf(placeholder[0]) === -1 || format.indexOf(placeholder[1]) === -1 || output.indexOf(placeholder[2]) === -1 || output.indexOf(placeholder[0]) === -1 || output.indexOf(placeholder[1]) === -1) {
            window.TMSHelper.console("[TMSHelper.formatDateString] day month or year in input/outputFormat missing - date conversion aborted");
            return false;
        } else if (input[format.indexOf('MM')] > 12 || input[format.indexOf('MM')].length !== 2) {
            window.TMSHelper.console("[TMSHelper.formatDateString] inputDate month > 12 or not 2 digits - date conversion aborted");
            return false;
        } else if (input[format.indexOf('DD')] > 31 || input[format.indexOf('DD')].length !== 2) {
            window.TMSHelper.console("[TMSHelper.formatDateString] inputDate day > 31 or not 2 digits - date conversion aborted");
            return false;
        } else if (input[format.indexOf('YYYY')].length !== 4) {
            window.TMSHelper.console("[TMSHelper.formatDateString] inputDate YYYY is not 4 digits - date conversion aborted");
            return false;
        }
        // re-sort placeholder after checking and before output
        placeholder = [output[1], output[3], output[5]];
        window.TMSHelper.console("[TMSHelper.formatDateString] complete");
        return input[format.indexOf(placeholder[0])] + output[2] + input[format.indexOf(placeholder[1])] + output[4] + input[format.indexOf(placeholder[2])];
    } catch (err) {
        window.TMSHelper.console("[TMSHelper.formatDateString] error:");
        window.TMSHelper.errorHandler(err);
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0172 TMSHelper.formatTimeString
// Issued by: Agnosticalyze
// version: 2.0, 2020-11-26
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// formatTimeString: returns time in format hh:mmm:ss
function formatTimeString(time) {
    try {
        window.TMSHelper.console("[TMSHelper.formatTimeString] start");
        if (typeof parseInt(time) === "number") {
            var timeInt = parseInt(time);
            var hours = parseInt(timeInt / 3600) % 24;
            var minutes = parseInt(timeInt / 60) % 60;
            var seconds = parseInt(timeInt) % 60;
            var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
            window.TMSHelper.console("[TMSHelper.formatTimeString] complete");
            return result;
        } else {
            window.TMSHelper.console("[TMSHelper.formatTimeString] -> time is not a number - cannot format");
            return time;
        }
    } catch(err) {
        window.TMSHelper.console("[TMSHelper.formatTimeString] error:");
        window.TMSHelper.errorHandler(err);
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0182
// Issued by: Feld M
// version: 1.0, 2022-01-10
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * Checks if provided value adheres to time string format hh:mm:ss
 * @param {String} HMS Time string in format hh:mm:ss 
 * @returns {Boolean} Whether if time string is of format hh:mm:ss
 */

function isHMSFormat(time) {
    var regex = /(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/;
    return regex.test(time.toString())
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0183
// Issued by: Feld M
// version: 1.0, 2022-01-10
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * Converts a string of hh:mm:ss to total in seconds
 * @param {String} hms Time String in format hh:mm:ss
 * @returns {Number} Total in seconds 
 */

function convertHMSToSec(hms) {
    try {
        if (!this.isHMSFormat(hms)) {
            throw new TypeError('Expected string of format hh:mm:ss for argument hms. Instead found ' + JSON.stringify(hms));
        }
        var arr = hms.split(':');
        var hours = arr[0],
            minutes = arr[1],
            seconds = arr[2];
    
        return (+hours) * 60 * 60 + (+minutes) * 60 + (+seconds);        
    } catch (error) {
        window.TMSHelper.console("[TMSHelper.convertHMSToSec] error:");
        window.TMSHelper.errorHandler(err);
        return undefined;
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0184
// Issued by: Feld M
// version: 1.0, 2022-01-10
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * Converts a time delta in seconds to date format hh:mm:ss
 * @param {Number} seconds Time delta in seconds from media start
 * @returns {String} Date string of format hh:mm:ss 
 */

function convertSecToHMS(seconds) {
    try {
        if (typeof seconds !== 'number') {
            throw new TypeError('Expected argument seconds delta as number. Instead found ' + JSON.stringify(seconds));
        }
        return new Date(seconds * 1000).toISOString().substring(11, 19);
    } catch (error) {
        window.TMSHelper.console("[TMSHelper.convertSecToHMS] error:");
        window.TMSHelper.errorHandler(err);
        return undefined;
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0185
// Issued by: Feld M
// version: 1.0, 2022-01-18
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * Calculates the the current position in a media file relative to a duration total
 * @param {String | Number} currentPosition The current position in format hh:mm:ss or seconds delta
 * @param {String | Number} totalDuration The total runtime of the media asset interacted with in format hh:mm:ss or seconds delta
 * @returns {String} The current position as a fraction
 */

function calculateProgress(currentPosition, totalDuration) {
    try {
        var position = currentPosition;
        var duration = totalDuration;

        if (this.isHMSFormat(currentPosition)) {
            position = this.convertHMSToSec(currentPosition)
        }
        if (this.isHMSFormat(totalDuration)) {
            duration = this.convertHMSToSec(totalDuration)
        }

        if (typeof position === 'number' && typeof duration === 'number') {
            return (position / duration).toFixed(2);
        }
        else throw new TypeError(
            'Expected arguments of type \'number\' or \'string\' hh:mm:ss. ' +
            ' Instead saw position: ' + JSON.stringify(position) + ' of type \'' + typeof position + 
            '\' and duration: ' + JSON.stringify(duration) + ' of type \'' + typeof duration + '\''
        );

    } catch (err) {
        this.log('[TMSHelper.calculateProgress] error:');
        this.errorHandler(err);
        return undefined;
    }
}
	
})()

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0201 TMSConfig Create
// Issued by: Agnosticalyze
// version: 1.0, 2021-03-11
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Creates TMSConfig object if not yet available
window.TMSConfig = window.TMSConfig || [];

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0211 TMSConfig.tmsConfig_isConsoleEnabled
// Issued by: Agnosticalyze
// version: 2.0, 2021-02-15
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Init function to enable console
try {
    if (typeof window.TMSConfig !== "undefined") {
        if (typeof window.TMSHelper.getVarFromString(window.location.search, "console") !== "undefined" && window.TMSHelper.getVarFromString(window.location.search, "console") !== null) {
            // Read query parameter value => Master Switch
            if (decodeURIComponent(window.TMSHelper.getVarFromString(window.location.search, "console")) === "true" || decodeURIComponent(window.TMSHelper.getVarFromString(window.location.search, "console")) === "1" || decodeURIComponent(window.TMSHelper.getVarFromString(window.location.search, "console")) === "on") {
                window.TMSConfig['tmsConfig_isConsoleEnabled'] = true;
                window.TMSHelper.cookieCreate("TMSActivateConsole", "true", 1);
                window.TMSHelper.console("[TMSConfig.tmsConfig_isConsoleEnabled] -> info: console enabled via query string, cookie set");
            } else {
                window.TMSConfig['tmsConfig_isConsoleEnabled'] = false;
                window.TMSHelper.cookieCreate("TMSActivateConsole", "false", 1);
                // window.TMSHelper.console("[TMSConfig.tmsConfig_isConsoleEnabled] -> info: console disabled, cookie set");
            }
        } else if (typeof window.TMSConfig['tmsConfig_isConsoleEnabled'] !== "undefined" && window.TMSConfig['tmsConfig_isConsoleEnabled'] !== null) {
            // JS Variable is already defined (via TMS or DEV)
            if (window.TMSConfig['tmsConfig_isConsoleEnabled'] === true || window.TMSConfig['tmsConfig_isConsoleEnabled'] === 1 || window.TMSConfig['tmsConfig_isConsoleEnabled'] === "on") {
                window.TMSConfig['tmsConfig_isConsoleEnabled'] = true;
                window.TMSHelper.console("[TMSConfig.tmsConfig_isConsoleEnabled] -> info: console enabled via JS variable");
            } else {
                window.TMSConfig['tmsConfig_isConsoleEnabled'] = false;
                // window.TMSHelper.console("[TMSConfig.tmsConfig_isConsoleEnabled] -> info: console disabled");
            }
        } else if (window.TMSHelper.cookieRead('TMSActivateConsole') !== null) {
            // Read cookie value
            if (window.TMSHelper.cookieRead('TMSActivateConsole') === "true" || window.TMSHelper.cookieRead('TMSActivateConsole') === "1" || window.TMSHelper.cookieRead('TMSActivateConsole') === "on") {
                window.TMSConfig['tmsConfig_isConsoleEnabled'] = true;
                window.TMSHelper.cookieCreate("TMSActivateConsole", "true", 1);
                window.TMSHelper.console("[TMSConfig.tmsConfig_isConsoleEnabled] -> info: console enabled via cookie, cookie updated");
            } else {
                window.TMSConfig['tmsConfig_isConsoleEnabled'] = false;
                // window.TMSHelper.console("[TMSConfig.tmsConfig_isConsoleEnabled] -> info: console disabled");
            }
        } else {
            window.TMSConfig['tmsConfig_isConsoleEnabled'] = false;
        }
    }
} catch (err) {
    window.console.error(err);
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0212 TMSConfig.isErrorLogEnabled
// Issued by: Agnosticalyze
// version: 1.0.2, 2021-07-05
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// Init function to enable error log
try {
    window.TMSHelper.console("[TMSConfig.tmsConfig_isErrorLogEnabled] start");
  
    if (typeof window.TMSConfig !== "undefined") {
        if (typeof window.TMSConfig['tmsConfig_isErrorLogEnabled'] !== "undefined") {
            // JS Variable is already defined (via TMS or DEV)
            if (window.TMSConfig['tmsConfig_isErrorLogEnabled'] === false || window.TMSConfig['tmsConfig_isErrorLogEnabled'] === 0 || window.TMSConfig['tmsConfig_isErrorLogEnabled'] === "off") {
                window.TMSConfig['tmsConfig_isErrorLogEnabled'] = false;
                window.TMSHelper.console("[TMSConfig.tmsConfig_isErrorLogEnabled] -> info: error log disabled via JS variable");
            } else {
                window.TMSConfig['tmsConfig_isErrorLogEnabled'] = true;
                window.TMSHelper.console("[TMSConfig.tmsConfig_isErrorLogEnabled] -> info: error log enabled");
            }
        } else {
            window.TMSConfig['tmsConfig_isErrorLogEnabled'] = true;
            window.TMSHelper.console("[TMSConfig.tmsConfig_isErrorLogEnabled] -> info: error log enabled (no value configured)");
        }
    }
  
    window.TMSHelper.console("[TMSConfig.tmsConfig_isErrorLogEnabled] complete");
} catch (err) {
    window.console.error(err);
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0221 TMSConfig.tmsConfig_udoName
// Issued by: Agnosticalyze
// version: 1.1, 2022-05-16
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
// Set name of identified UDO in TMSConfig if (typeof window.TMSConfig !== "undefined") {
if (typeof window.TMSConfig['tmsConfig_udoName'] === "undefined" || window.TMSConfig['tmsConfig_udoName'] === null || window.TMSConfig['tmsConfig_udoName'] === "") {
    if (typeof window.digitalData === "object") {
        window.TMSConfig['tmsConfig_udoName'] = "digitalData";
    } else if (typeof window.utag_data === "object") {
        window.TMSConfig['tmsConfig_udoName'] = "utag_data";
    } else if (typeof window.dataLayer === "object") {
        window.TMSConfig['tmsConfig_udoName'] = "dataLayer";
    }
};

