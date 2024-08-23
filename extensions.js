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
	
})();

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

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 0401 TMSEvent: copy from UDO
// Issued by: Agnosticalyze
// version: 1.3, 2021-03-13
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// Populate TMSEvent object if available
try {
    window.TMSHelper.console("[TMSEvent.copy] start");
   
    window.TMSEvent = window.TMSEvent || {};
 
    if (typeof window.TMSConfig['tmsConfig_udoName'] === "string") {
        // get information from UDO
        window.TMSEvent = window.TMSHelper.copyVarsFromObjectToObject({
              sourceObject: window[TMSConfig['tmsConfig_udoName']]
            , mergeObject: window.TMSEvent
            , targetPrefix: ""
            , overwrite: true
            , harmonize: false // TMSConfig.tmsConfig_dataLayerHarmonizationLookup is not available at this point in time
            , includeFromSource: false
            , excludeFromSource: false
            , includeFromMerge: false
            , excludeFromMerge: false
            , flatten: true
        });
 
        window.TMSHelper.console("[TMSEvent.copy] -> info: information copied from " + window.TMSConfig['tmsConfig_udoName'] + " to TMSEvent");
    } else {
        // no DEV defined object identified => warning
        window.TMSHelper.console("[TMSEvent.copy] -> warning: no UDO identified");
    }
   
    window.TMSHelper.console("[TMSEvent.copy] complete");
} catch (err) {
    // error handler
    window.TMSHelper.console("[TMSEvent.copy] error:");
    window.TMSHelper.errorHandler(err);
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1001 TMSConfig.tmsConfig_processing_dataLayerHarmonizationLookup
// Issued by: Agnosticalyze
// version: 1.2, 2021-03-11
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// Set list of dataLayerHarmonizationLookup variables
try {
    // window.TMSHelper.console("[TMSConfig.tmsConfig_processing_dataLayerHarmonizationLookup] start");
   
    if (typeof window.TMSConfig === "object") {
        if (typeof window.TMSConfig['tmsConfig_processing_dataLayerHarmonizationLookup'] === "undefined" || window.TMSConfig['tmsConfig_processing_dataLayerHarmonizationLookup'] === null) {
            window.TMSConfig['tmsConfig_processing_dataLayerHarmonizationLookup'] = {
                // page url variables
                "page_url_canonical_url" : ["page_attributes_canonicalURL"]
                , "page_url_canonical_hostname" : ["page_attributes_canonicalURLhostname"]
                , "page_url_canonical_path" : ["page_attributes_canonicalURLpath"]
                , "page_url_canonical_queryString" : ["page_attributes_canonicalURLqueryString"]
                , "page_url_canonical_fragmentIdentifier" : ["page_attributes_canonicalURLfragmentIdentifier"]
                , "page_url_window_url" : ["page_attributes_URL"]
                , "page_url_window_hostname" : ["page_attributes_URLhostname", "page_url_hostname", "url_hostname"]
                , "page_url_window_path" : ["page_attributes_URLpath", "page_url_path"]
                , "page_url_window_queryString" : ["page_attributes_URLqueryString", "page_url_query"]
                , "page_url_window_fragmentIdentifier" : ["page_attributes_URLfragmentIdentifier"]
                // event variables
                , "element_elementInfo_location" : ["event_attributes_loc"]
                , "event_element_tgtUrl_url" : ["event_attributes_tgtURL"]
                , "event_element_tgtUrl_hostname" : ["event_attributes_tgtURLhostname"]
                , "event_element_tgtUrl_path" : ["event_attributes_tgtURLpath"]
            };
        } else {
            // Already found a list => warning
            window.TMSHelper.console("[TMSConfig.tmsConfig_processing_dataLayerHarmonizationLookup] -> warning: List of harmonization variables already identified - value not overwritten");
        }
    }
   
    // window.TMSHelper.console("[TMSConfig.tmsConfig_processing_dataLayerHarmonizationLookup] complete");
} catch (err) {
    // error handler
    window.TMSHelper.console("[TMSConfig.tmsConfig_processing_dataLayerHarmonizationLookup] error:");
    window.TMSHelper.errorHandler(err);
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1011 TMSConfig.tmsConfig_processing_interdependentVars
// Issued by: Agnosticalyze
// version: 1.2, 2021-05-26
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
// Set list of interdependent variables
try {
    // window.TMSHelper.console("[TMSConfig.tmsConfig_processing_interdependentVars] start");
    
    if (typeof window.TMSConfig === "object") {
        if (typeof window.TMSConfig['tmsConfig_processing_interdependentVars'] === "undefined" || window.TMSConfig['tmsConfig_processing_interdependentVars'] === null) {
            window.TMSConfig['tmsConfig_processing_interdependentVars'] = {
                // page url alternate
                  "page_url_alternate_url" : "page_url_canonical_url"
                , "page_url_alternate_protocol" : "page_url_alternate_url"
                , "page_url_alternate_hostname" : "page_url_alternate_url"
                , "page_url_alternate_path" : "page_url_alternate_url"
                , "page_url_alternate_queryString" : "page_url_alternate_url"
                , "page_url_alternate_fragmentIdentifier" : "page_url_alternate_url"
                , "page_url_alternate_hostnameAndPath" : "page_url_alternate_url"
                // page url canonical
                , "page_url_canonical_url" : "page_url_canonical_url"
                , "page_url_canonical_protocol" : "page_url_canonical_url"
                , "page_url_canonical_hostname" : "page_url_canonical_url"
                , "page_url_canonical_path" : "page_url_canonical_url"
                , "page_url_canonical_queryString" : "page_url_canonical_url"
                , "page_url_canonical_fragmentIdentifier" : "page_url_canonical_url"
                , "page_url_canonical_hostnameAndPath" : "page_url_canonical_url"
                // page url window
                , "page_url_window_url" : "page_url_window_url"
                , "page_url_window_protocol" : "page_url_window_url"
                , "page_url_window_hostname" : "page_url_window_url"
                , "page_url_window_path" : "page_url_window_url"
                , "page_url_window_queryString" : "page_url_window_url"
                , "page_url_window_fragmentIdentifier" : "page_url_window_url"
                , "page_url_window_hostnameAndPath" : "page_url_window_url"
                // page category
                , "page_category_primaryCategory" : "page_category_primaryCategory"
                , "page_category_subCategory1" : "page_category_primaryCategory"
                , "page_category_subCategory2" : "page_category_primaryCategory"
                , "page_category_subCategory3" : "page_category_primaryCategory"
                , "page_category_subCategory4" : "page_category_primaryCategory"
                , "page_category_subCategory5" : "page_category_primaryCategory"
                , "page_category_subCategory6" : "page_category_primaryCategory"
                , "page_category_subCategory7" : "page_category_primaryCategory"
            };
        } else {
            // Already found a list => warning
            window.TMSHelper.console("[TMSConfig.tmsConfig_processing_interdependentVars] -> warning: List of interdependent variables already identified - value not overwritten");
        }
    }
    
    // window.TMSHelper.console("[TMSConfig.tmsConfig_processing_interdependentVars] complete");
} catch (err) {
    // error handler
    window.TMSHelper.console("[TMSConfig.tmsConfig_processing_interdependentVars] error:");
    window.TMSHelper.errorHandler(err);
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1021 TMSConfig.tmsConfig_processing_persistingConfigVars
// Issued by: Agnosticalyze
// version: 1.4, 2022-02-25
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Define variables of which the value should be persisted in TMSConfig
try {
	if (typeof window.TMSConfig === "object") {
		if (typeof window.TMSConfig['tmsConfig_processing_persistingConfigVars'] === "undefined") {
			window.TMSConfig['tmsConfig_processing_persistingConfigVars'] = [
				// variables
				  'P:privacy_consentCategory_'
				, 'P:tmsConfig_'

			];
		} else {
			window.TMSHelper.console("[TMSConfig.tmsConfig_processing_persistingConfigVars] -> warning: Did not overwrite pre-existing TMSConfig[tmsConfig_processing_persistingConfigVars]");
		}
	}
} catch (err) {
	window.TMSHelper.console("[TMSConfig.tmsConfig_processing_persistingConfigVars] error:");
	window.TMSHelper.errorHandler(err);
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1022 TMSConfig.tmsConfig_processing_persistingCacheVars
// Issued by: Agnosticalyze
// version: 1.3, 2021-05-26
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
// Define variables of which the value should be persisted in TMSCache on events/VPVs
try {
    if (typeof window.TMSConfig === "object") {
        if (typeof window.TMSConfig['tmsConfig_processing_persistingCacheVars'] === "undefined") {
            window.TMSConfig['tmsConfig_processing_persistingCacheVars'] = [
                // content attributes
                 'P:content_attributes_'
                , 'P:content_contentInfo_'
                // embed information
                , 'embed_embedInfo_embedType'
                // page attributes
                , 'P:page_url_'
                , 'P:page_category_'
                , 'P:page_pageInfo_'
                // platform information
                , 'P:platform_platformInfo_'
                // touchpoint
                , 'P:touchpoint_point_first_'
                , 'P:touchpoint_point_latest_'
                , 'P:touchpoint_path_intermediate_'
                , 'P:touchpoint_path_full_'
                // user
                , 'P:user_profile_profileInfo_'
            ];
        } else {
            window.tmsHelper.console("[TMSConfig.tmsConfig_processing_persistingCacheVars] -> warning: Did not overwrite pre-existing TMSConfig[tmsConfig_processing_persistingCacheVars]");
        }
    }
} catch (err) {
    window.tmsHelper.console("[TMSConfig.tmsConfig_processing_persistingCacheVars] error:");
    window.tmsHelper.errorHandler(err);
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1023 TMSConfig.tmsConfig_processing_persistingEventVars
// Issued by: Agnosticalyze
// version: 1.1, 2022-02-25
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// Define variables of which the value should be persisted in TMSCache on events/VPVs
try {
  if (typeof window.TMSConfig === "object") {
      if (typeof window.TMSConfig['tmsConfig_processing_persistingEventVars'] === "undefined") {
          window.TMSConfig['tmsConfig_processing_persistingEventVars'] = [
              // content attributes
               'P:content_attributes_'
              , 'P:content_contentInfo_'
              // platform information
              , 'P:platform_platformInfo_'
              // touchpoint
              , 'P:touchpoint_point_first_'
              , 'P:touchpoint_point_latest_'
              , 'P:touchpoint_path_intermediate_'
              , 'P:touchpoint_path_full_'
              // user
              , 'P:user_profile_profileInfo_'
          ];
      } else {
          window.TMSHelper.console("[TMSConfig.tmsConfig_processing_persistingEventVars] -> warning: Did not overwrite pre-existing TMSConfig[tmsConfig_processing_persistingEventVars]");
      }
  }
} catch (err) {
  window.TMSHelper.console("[TMSConfig.tmsConfig_processing_persistingEventVars] error:");
  window.TMSHelper.errorHandler(err);
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1031 TMSConfig.tmsConfig_processing_touchpointAttributes
// Issued by: Agnosticalyze
// version: 1.2, 2022-02-25
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Define the attributes that will be scanned to (eventually) find the current touchpoint in
try {
    if (typeof window.TMSConfig === "object") {
        if (typeof window.TMSConfig['tmsConfig_processing_touchpointAttributes'] === "undefined") {
            window.TMSConfig['tmsConfig_processing_touchpointAttributes'] = [
                  'page_url_window_queryString'
                , 'page_url_input_url'
                , 'page_url_marketing_url'
            ];
        } else {
            window.TMSHelper.console("[TMSConfig.tmsConfig_processing_touchpointAttributes] -> warning: Did not overwrite pre-existing TMSConfig[tmsConfig_processing_touchpointAttributes]");
        }
    }
} catch (err) {
    window.TMSHelper.console("[TMSConfig.tmsConfig_processing_touchpointAttributes] error:");
    window.TMSHelper.errorHandler(err);
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1032 TMSConfig.tmsConfig_processing_touchpointParameters
// Issued by: Agnosticalyze
// version: 1.2, 2022-02-25
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Define the query string parameters that will be scanned for to (eventually) find the current touchpoint in
try {
    if (typeof window.TMSConfig === "object") {
        if (typeof window.TMSConfig['tmsConfig_processing_touchpointParameters'] === "undefined") {
            window.TMSConfig['tmsConfig_processing_touchpointParameters'] = [
                  "sourceid"
                , "WT.mc_id"
                , "gclid"
                , "utm_id"
                , "utm_source"
                , "utm_medium"
                , "utm_campaign"
                , "utm_term"
                , "utm_content"
            ];
        } else {
            window.TMSHelper.console("[TMSConfig.tmsConfig_processing_touchpointParameters] -> warning: Did not overwrite pre-existing TMSConfig[tmsConfig_processing_touchpointParameters]");
        }
    }
} catch (err) {
    window.TMSHelper.console("[TMSConfig.tmsConfig_processing_touchpointParameters] error:");
    window.TMSHelper.errorHandler(err);
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1033 TMSConfig.tmsConfig_processing_touchpointDelimiters
// Issued by: Agnosticalyze
// version: 1.0, 2022-02-25
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// Define the delimiters that will be used for processing
try {
    if (typeof window.TMSConfig === "object") {
        if (typeof window.TMSConfig['tmsConfig_processing_touchpointDelimiters'] === "undefined") {
            window.TMSConfig['tmsConfig_processing_touchpointDelimiters'] = {
                      "prefix" : "::"
                    , "component" : ";;"
                    , "value" : "~"
                }
        } else {
            window.TMSHelper.console("[TMSConfig.tmsConfig_processing_touchpointDelimiters] -> warning: Did not overwrite pre-existing TMSConfig[tmsConfig_processing_touchpointDelimiters]");
        }
    }
} catch (err) {
    window.TMSHelper.console("[TMSConfig.tmsConfig_processing_touchpointDelimiters] error:");
    window.TMSHelper.errorHandler(err);
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1034 TMSConfig.tmsConfig_processing_touchpointComponents
// Issued by: Agnosticalyze
// version: 1.0, 2022-02-25
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// Define the components that will be scanned
try {
    if (typeof window.TMSConfig === "object") {
        if (typeof window.TMSConfig['tmsConfig_processing_touchpointComponents'] === "undefined") {
            window.TMSConfig['tmsConfig_processing_touchpointComponents'] = {
                      "rqs" : "touchpoint_point_current_touchpointInfo_requester"
                    , "lng" : "touchpoint_point_current_touchpointInfo_language"
                    , "chn" : "touchpoint_point_current_marketingActivity_channelName"
                    , "mdl" : "touchpoint_point_current_marketingActivity_pricingModel"
                    , "man" : "touchpoint_point_current_marketingActivity_primaryTitle"
                    , "prt" : "touchpoint_point_current_marketingActivity_promotionType"
                    , "aud" : "touchpoint_point_current_marketingActivity_targetAudience"
                    , "ptn" : "touchpoint_point_current_referrer_partner"
                    , "pbl" : "touchpoint_point_current_referrer_publisher"
                }
        } else {
            window.TMSHelper.console("[TMSConfig.tmsConfig_processing_touchpointComponents] -> warning: Did not overwrite pre-existing TMSConfig[tmsConfig_processing_touchpointComponents]");
        }
    }
} catch (err) {
    window.TMSHelper.console("[TMSConfig.tmsConfig_processing_touchpointComponents] error:");
    window.TMSHelper.errorHandler(err);
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1041 TMSConfig.tmsConfig_tmsList
// Issued by: Agnosticalyze
// version: 1.1, 2021-02-15
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// Define relevant TMS and provide tool-specific regex to match script source URLs against
try {
    if (typeof window.TMSConfig === "object") {
        if (typeof window.TMSConfig['tmsConfig_tmsList'] === "undefined") {
            window.TMSConfig['tmsConfig_tmsList'] = {
                // Adobe DTM
                'DTM': ".*assets\.adobedtm\.com.*satelliteLib-.*\.js",
                // Google GTM
                'GTM': ".*googletagmanager\.com.*gtm\.js",
                // Tealium TiQ
                'TiQ': ".*tags\.tiqcdn\.com\/utag.*utag.*\.js"
            };
        } else {
            window.TMSHelper.console("[TMSConfig.tmsConfig_tmsList] -> warning: Did not overwrite pre-existing TMSConfig[tmsConfig_tmsList]");
        }
    }
} catch (err) {
    window.TMSHelper.console("[TMSConfig.tmsConfig_tmsList] error:");
    window.TMSHelper.errorHandler(err);
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1042 TMSConfig.identifyTMS
// Issued by: Agnosticalyze
// version: 1.1.1, 2021-05-25
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
// Function to determine tool-specific variables for tool and environment identification, store it to declared variables
try {
    window.TMSHelper.console("[TMSConfig.identifyTMS] start");
    if (typeof window.TMSConfig === "object") {
        if (typeof window.TMSConfig['tmsConfig_tmsList'] === "object" && Object.keys(window.TMSConfig['tmsConfig_tmsList']).length > 0) {
            if (document.querySelectorAll('script').length > 0) {
                var scriptsOnPage = document.querySelectorAll('script');
                var TMSCount = Object.keys(window.TMSConfig['tmsConfig_tmsList']).length;
                var TMSFound = 0;
          
                window.TMSHelper.console("[TMSConfig.identifyTMS] -> info: identifying TMS...");
          
                loopScripts: for (var i = 0; i < scriptsOnPage.length; i++) {
                    // window.TMSHelper.console("[TMSConfig.identifyTMS] -> i = " + i);
                                 
                    var src = scriptsOnPage[i].src;
                    // window.TMSHelper.console("[TMSConfig.identifyTMS] -> script source = " + src);
          
                    loopTMS: for (var j = 0; j < TMSCount; j++) {
                        // window.TMSHelper.console("[TMSConfig.identifyTMS] -> j = " + j);
                                     
                        var key = Object.keys(window.TMSConfig['tmsConfig_tmsList'])[j];
                        // window.TMSHelper.console("[TMSConfig.identifyTMS] -> key = " + key);
                                     
                        if (typeof window.TMSConfig['tmsConfig_tool_' + key + '_flag'] === "undefined" || window.TMSConfig['tmsConfig_tool_' + key + '_flag'] === false) {
                            // only continue if TMS wasnt already identified earlier
          
                            var regex = new RegExp(window.TMSConfig['tmsConfig_tmsList'][key], "g");
                            // window.TMSHelper.console("[TMSConfig.identifyTMS] -> regex = " + regex);
                                         
                            if (regex.test(src)) {
                                window.TMSHelper.console("[TMSConfig.identifyTMS] -> info: found TMS: " + key);
                                              
                                // Set flag for found script
                                // This was already checked earlier => redundant to verify existence again
                                window.TMSConfig['tmsConfig_tool_' + key + '_flag'] = true;
         
                                // Set source URL for found script
                                if (typeof window.TMSConfig['tmsConfig_tool_' + key + '_src_url'] === "undefined" || window.TMSConfig['tmsConfig_tool_' + key + '_src_url'] === "") {
                                    window.TMSConfig['tmsConfig_tool_' + key + '_src_url'] = src;
                                } else {
                                    window.TMSHelper.console("[TMSConfig.identifyTMS] -> warning: TMSConfig[tmsConfig_tool_" + key + "_src_url] already defined");
                                }
          
                                // Identify environment
                                if (typeof window.TMSConfig['tmsConfig_tool_' + key + '_src_environment'] === "undefined" || window.TMSConfig['tmsConfig_tool_' + key + '_src_environment'] === "") {
                                    if (key === "TiQ") {
                                        // Check if Tealium ut.env is set (can be manipulated to be different from source code during debugging) and use value
                                        // (usually not available at this point in time but checked to ensure that script is not interfering with product core),
                                        // Otherwise use value found in configuration path of source code
                                        if (typeof utag.data['ut.env'] !== "undefined") {
                                            window.TMSConfig['tmsConfig_tool_' + key + '_src_environment'] = utag.data['ut.env'];
                                        } else if (typeof src === "string" && src !== "") {
                                            window.TMSConfig['tmsConfig_tool_' + key + '_src_environment'] = src.split('/')[6];
                                        } else {
                                            window.TMSConfig['tmsConfig_tool_' + key + '_src_environment'] = "prod"
                                        }
                                    } else if (key === "GTM" && document.querySelectorAll('iframe').length > 0) {
                                        // Is GTMs preview mode active and can its iframe be detected?
                                        // Note: GTMs integrated variable "Debug Mode" cant be used here since it is not accessible from JS, only within GTM
                                        var iframesOnPage = document.querySelectorAll('iframe');
                                        loopIframes: for (var k = 0; k < iframesOnPage.length; k++) {
                                            if (typeof iframesOnPage[k].contentDocument !== "undefined" && iframesOnPage[k].contentDocument !== null) {
                                                if (typeof iframesOnPage[k].contentDocument.documentElement !== "undefined" && iframesOnPage[k].contentDocument.documentElement !== null) {
                                                    if (typeof iframesOnPage[k].contentDocument.documentElement.querySelector('gtm-component') !== "undefined" && iframesOnPage[k].contentDocument.documentElement.querySelector('gtm-component') !== null) {
                                                        window.TMSConfig['tmsConfig_tool_' + key + '_src_environment'] = "dev";
                                                        break loopIframes;
                                                    } else {
                                                        window.TMSConfig['tmsConfig_tool_' + key + '_src_environment'] = "prod";
                                                        continue loopIframes;
                                                    }
                                                } else {
                                                    window.TMSConfig['tmsConfig_tool_' + key + '_src_environment'] = "prod";
                                                    continue loopIframes;
                                                }
                                            } else {
                                                window.TMSConfig['tmsConfig_tool_' + key + '_src_environment'] = "prod";
                                                continue loopIframes;
                                            }
                                        }
                                    } else {
                                        window.TMSConfig['tmsConfig_tool_' + key + '_src_environment'] = "prod"
                                    }
                                } else {
                                    window.TMSHelper.console("[TMSConfig.identifyTMS] -> warning: TMSConfig[tmsConfig_tool_" + key + "_src_environment] already defined");
                                }
          
                                // Check where/if loop should continue
                                TMSFound++;
                                if (TMSFound < TMSCount) {
                                    // window.TMSHelper.console("[TMSConfig.identifyTMS] -> info: break (inner) loopTMS");
                                    break loopTMS;
                                } else {
                                    // window.TMSHelper.console("[TMSConfig.identifyTMS] -> info: break (outer) loopScripts");
                                    break loopScripts;
                                }
                            } else {
                                window.TMSConfig['tmsConfig_tool_' + key + '_flag'] = false;
                                window.TMSConfig['tmsConfig_tool_' + key + '_src_environment'] = "";
                            }
                        } else {
                            // window.TMSHelper.console("[TMSConfig.identifyTMS] -> info: " + key + " was already identified earlier");
                            continue loopTMS;
                        }
                    }
                }
          
                window.TMSHelper.console("[TMSConfig.identifyTMS] -> info: identified " + TMSFound + " TMS");
            } else {
                window.TMSHelper.console("[TMSConfig.identifyTMS] -> warning: no scripts found on page");
            }
        } else {
            window.TMSHelper.console("[TMSConfig.identifyTMS] -> warning: TMSConfig[tmsConfig_tmsList] not defined");
        }
    } else {
        window.TMSHelper.console("[TMSConfig.identifyTMS] -> warning: TMSConfig is not defined");
    }
    window.TMSHelper.console("[TMSConfig.identifyTMS] complete");
} catch (err) {
    window.TMSHelper.console("[TMSConfig.identifyTMS] error:");
    window.TMSHelper.errorHandler(err);
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1043 TMSConfig.tmsConfig_processing_processingObjectName
// Issued by: Agnosticalyze
// version: 1.1, 2022-06-25
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
   
// Function determines the name of the (vendor specific) processing object
try {
    window.TMSHelper.console("[TMSConfig.tmsConfig_processing_processingObjectName] start");
    if (typeof window.TMSConfig === "object") {
        if (window.TMSConfig['tmsConfig_tool_TiQ_flag']) {
            window.TMSConfig['tmsConfig_processing_processingObjectName'] = "b";
        } else {
            window.TMSConfig['tmsConfig_processing_processingObjectName'] = "TMSEvent";
        }
    } else {
        window.TMSHelper.console("[TMSConfig.tmsConfig_processing_processingObjectName] -> warning: TMSConfig is not defined");
    }
    window.TMSHelper.console("[TMSConfig.tmsConfig_processing_processingObjectName] complete");
} catch (err) {
    window.TMSHelper.console("[TMSConfig.tmsConfig_processing_processingObjectName] error:");
    window.TMSHelper.errorHandler(err);
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1051 TMSConfig.tmsConfig_event_collectContentHierarchy
// Issued by: Agnosticalyze
// version: 1.2, 2022-02-25
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Define variables of which the value should be persisted in TMSCache on events/VPVs
try {
    if (typeof window.TMSConfig === "object") {
        if (typeof window.TMSConfig['tmsConfig_event_collectContentHierarchy'] === "undefined") {
            window.TMSConfig['tmsConfig_event_collectContentHierarchy'] = true;
        } else {
            window.TMSHelper.console("[TMSConfig.tmsConfig_event_collectContentHierarchy] -> warning: Did not overwrite pre-existing TMSConfig[tmsConfig_event_collectContentHierarchy]");
        }
    }
} catch (err) {
    window.TMSHelper.console("[TMSConfig.tmsConfig_event_collectContentHierarchy] error:");
    window.TMSHelper.errorHandler(err);
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1061 TMSConfig.tmsConfig_cookieDomain
// Issued by: Agnosticalyze
// version: 1.1, 2021-02-15
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// Define cookie domain to be used
try {
    if (typeof window.TMSConfig === "object") {
        if (typeof window.TMSConfig['tmsConfig_cookieDomain'] === "undefined") {
            window.TMSConfig['tmsConfig_cookieDomain'] = window.location.hostname;
        } else {
            window.TMSHelper.console("[TMSConfig.tmsConfig_cookieDomain] -> warning: Did not overwrite pre-existing TMSConfig[tmsConfig_tmsList]");
        }
    }
} catch (err) {
    window.TMSHelper.console("[TMSConfig.tmsConfig_cookieDomain] error:");
    window.TMSHelper.errorHandler(err);
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1071 TMSConfig.tmsConfig_prodDomains
// Issued by: Agnosticalyze
// version: 1.1, 2021-02-15
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// List all possible PROD hosts
try {
    // window.TMSHelper.console("[TMSConfig.tmsConfig_prodDomains] start");
 
     if (typeof window.TMSConfig === "object") {
        if (typeof window.TMSConfig['tmsConfig_prodDomains'] !== "object" || Object.keys(window.TMSConfig['tmsConfig_prodDomains']).length === 0) {
            window.TMSConfig['tmsConfig_prodDomains'] = ["kompass.projuventute.ch", "elternbriefe.projuventute.ch", "www.chesaspuondas.ch", "www.projuventute.ch", "www.147.ch"];
            // window.TMSHelper.console("[TMSConfig.tmsConfig_prodDomains] -> info: TMSConfig[tmsConfig_prodDomains] defined");
        } else {
            window.TMSHelper.console("[TMSConfig.tmsConfig_prodDomains] -> warning: Did not overwrite pre-existing TMSConfig[tmsConfig_prodDomains]");
        }
     } else {
        window.TMSHelper.console("[TMSConfig.tmsConfig_prodDomains] -> warning: TMSConfig is not defined");
     }
 
     // window.TMSHelper.console("[TMSConfig.tmsConfig_prodDomains] complete");
} catch (err) {
    window.TMSHelper.console("[TMSConfig.tmsConfig_prodDomains] error:");
    window.TMSHelper.errorHandler(err);
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1081 TMSConfig.tmsConfig_event_track...
// Issued by: Agnosticalyze
// version: 1.1, 2022-01-28
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
// Define default for event tracking flags
try {
    window.TMSHelper.console("[TMSConfig.tmsConfig_event_track...] start");
    if (typeof window.TMSConfig === "object") {
        // this function solves the issue where the intended value for the variable would be false
        var value_or_default = function value_or_default(val, default_val) {
          if (val === null || val === undefined || val === "") return default_val;
          return val;
        }
        window.TMSConfig['tmsConfig_event_trackDefault'] = value_or_default(window.TMSConfig['tmsConfig_event_trackDefault'], false);
        window.TMSConfig['tmsConfig_event_trackLinkOffsite'] = value_or_default(window.TMSConfig['tmsConfig_event_trackLinkOffsite'], true);
        window.TMSConfig['tmsConfig_event_trackLinkOnsite'] = value_or_default(window.TMSConfig['tmsConfig_event_trackLinkOnsite'], false);
        window.TMSConfig['tmsConfig_event_trackLinkDownload'] = value_or_default(window.TMSConfig['tmsConfig_event_trackLinkDownload'], true);
        window.TMSConfig['tmsConfig_event_trackLinkMailto'] = value_or_default(window.TMSConfig['tmsConfig_event_trackLinkMailto'], true);
        window.TMSConfig['tmsConfig_event_trackLinkPhone'] = value_or_default(window.TMSConfig['tmsConfig_event_trackLinkPhone'], true);
    } else {
        window.TMSHelper.console("[TMSConfig.tmsConfig_event_track...] -> warning: TMSConfig is not defined");
    }
    window.TMSHelper.console("[TMSConfig.tmsConfig_event_track...] complete");
} catch (err) {
    window.TMSHelper.console("[TMSConfig.tmsConfig_event_track...] error:");
    window.TMSHelper.errorHandler(err);
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1082 TMSConfig.TMSConfig.tmsConfig_embed_...
// Issued by: Agnosticalyze
// version: 1.1, 2022-06-10
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
try {
    // window.TMSHelper.console("[TMSConfig.TMSConfig.tmsConfig_embed_...] start");
  
    if (typeof window.TMSConfig === "object") {
        var value_or_default = function value_or_default(val, default_val) {
          if (val === null || val === undefined || val === "") return default_val;
          return val;
        }
        window.TMSConfig['tmsConfig_embed_sendToParentWindow']      = value_or_default(window.TMSConfig['tmsConfig_embed_sendToParentWindow'], false);
        window.TMSConfig['tmsConfig_embed_receiveFromChildWindow']  = value_or_default(window.TMSConfig['tmsConfig_embed_receiveFromChildWindow'], false);
        window.TMSConfig['tmsConfig_embed_trackIfChildWindow']      = value_or_default(window.TMSConfig['tmsConfig_embed_trackIfChildWindow'], false);
    } else {
        window.TMSHelper.console("[TMSConfig.tmsConfig_embed_...] -> warning: TMSConfig is not defined");
    }
  
     // window.TMSHelper.console("[TMSConfig.TMSConfig.tmsConfig_embed_...] complete");
} catch (err) {
    window.TMSHelper.console("[TMSConfig.TMSConfig.tmsConfig_embed_...] error:");
    window.TMSHelper.errorHandler(err);
}; 

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1091 TMSConfig.tmsConfig_processing_obfuscate_varsToScan
// Issued by: Agnosticalyze
// version: 1.2, 2022-06-03
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Set list of tmsConfig_processing_obfuscate_varsToScan variables
try {
	// window.TMSHelper.console("[TMSConfig.tmsConfig_processing_obfuscate_varsToScan] start");
  
	if (typeof window.TMSConfig === "object") {
		if (typeof window.TMSConfig['tmsConfig_processing_obfuscate_varsToScan'] === "undefined" || window.TMSConfig['tmsConfig_processing_obfuscate_varsToScan'] === null) {
			window.TMSConfig['tmsConfig_processing_obfuscate_varsToScan'] = [
					  'error_errorInfo_sourceURL'
					, 'page_url_canonical_url'
					, 'page_url_canonical_queryString'
					, 'page_url_window_url'
					, 'page_url_window_fragmentIdentifier'
					, 'page_url_window_queryString'
					, 'page_url_input_url'
			];
		} else {
			// Already found a list => warning
			window.TMSHelper.console("[TMSConfig.tmsConfig_processing_obfuscate_varsToScan] -> warning: List of variables potentially containing email addresses already identified - value not overwritten");
		}
	}
  
	// window.TMSHelper.console("[TMSConfig.tmsConfig_processing_obfuscate_varsToScan] complete");
} catch (err) {
	// error handler
	window.TMSHelper.console("[TMSConfig.tmsConfig_processing_obfuscate_varsToScan] error:");
	window.TMSHelper.errorHandler(err);
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1092 TMSConfig.tmsConfig_processing_obfuscate_parametersToPreserve 
// Issued by: Agnosticalyze
// version: 1.0, 2022-06-03
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Set list of tmsConfig_processing_obfuscate_varsToScan variables
try {
	// window.TMSHelper.console("[TMSConfig.tmsConfig_processing_obfuscate_parametersToPreserve] start");
  
	if (typeof window.TMSConfig === "object") {
		if (typeof window.TMSConfig['tmsConfig_processing_obfuscate_parametersToPreserve'] === "undefined" || window.TMSConfig['tmsConfig_processing_obfuscate_parametersToPreserve'] === null) {
			window.TMSConfig['tmsConfig_processing_obfuscate_parametersToPreserve'] = [
                  "console"
                , "sourceid"
                , "WT.mc_id"
                , "gclid"
                , "utm_id"
                , "utm_source"
                , "utm_medium"
                , "utm_campaign"
                , "utm_term"
                , "utm_content"
			];
		} else {
			// Already found a list => warning
			window.TMSHelper.console("[TMSConfig.tmsConfig_processing_obfuscate_parametersToPreserve] -> warning: List of variables for which information should be preserved already identified - value not overwritten");
		}
	}
  
	// window.TMSHelper.console("[TMSConfig.tmsConfig_processing_obfuscate_parametersToPreserve] complete");
} catch (err) {
	// error handler
	window.TMSHelper.console("[TMSConfig.tmsConfig_processing_obfuscate_parametersToPreserve] error:");
	window.TMSHelper.errorHandler(err);
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1093 TMSConfig.tmsConfig_processing_obfuscate_mask...
// Issued by: Agnosticalyze
// version: 1.0, 2022-06-08
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Set flags of tmsConfig_processing_obfuscate_mask... variables
try {
	// window.TMSHelper.console("[TMSConfig.tmsConfig_processing_obfuscate_mask...] start");
  
	if (typeof window.TMSConfig === "object") {
		window.TMSConfig['tmsConfig_processing_obfuscate_maskEmail'] 				= window.TMSConfig['tmsConfig_processing_obfuscate_maskEmail'] 				|| true;
		window.TMSConfig['tmsConfig_processing_obfuscate_maskUnknownParameters'] 	= window.TMSConfig['tmsConfig_processing_obfuscate_maskUnknownParameters'] 	|| false;
	}
  
	// window.TMSHelper.console("[TMSConfig.tmsConfig_processing_obfuscate_mask...] complete");
} catch (err) {
	// error handler
	window.TMSHelper.console("[TMSConfig.tmsConfig_processing_obfuscate_mask...] error:");
	window.TMSHelper.errorHandler(err);
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1100 TMSProcessing Create
// Issued by: Agnosticalyze
// version: 1.0, 2022-06-14
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Creates TMSConfig object if not yet available
window.TMSProcessing = window.TMSProcessing || [];

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1101 TMSProcessing.getPageURLWindow
// Issued by: Agnosticalyze
// version: 2.3, 2021-05-15
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
// Get window URL
window.TMSProcessing = window.TMSProcessing || {}; // remove this line if function is included inside a collection wrapper
window.TMSProcessing.getPageURLWindow = function () { // remove this line for including function inside a collection wrapper
// function getPageURLWindow() {  // uncomment this line for including function inside a collection wrapper
    try {
        window.TMSHelper.console("[TMSProcessing.getPageURLWindow] start");
          
        // set processing flag
        var processingFlag = false;
              
        if(typeof window.TMSEvent === "object") {
            if (typeof window.TMSEvent['page_url_window_url'] === "string" && window.TMSEvent['page_url_window_url'] !== "") {
                // 1 page URL is already defined in TMSEvent
                window.TMSHelper.console("[TMSProcessing.getPageURLWindow] -> info: Page URL found in TMSEvent");
              
                // 1.1 check if URL is valid and complete
                var startWithProtocol = new RegExp("^[a-zA-Z]*:");
                if (startWithProtocol.test(window.TMSEvent['page_url_window_url'])) {
                    // 1.1.1 slash TMSEvent Full Page URL into temporary Page URL variables for further processing
                    var slashedUrl = window.TMSHelper.URLslasher(window.TMSEvent['page_url_window_url']);
          
                    // 1.1.2 copy to TMSEvent
                    window.TMSEvent = window.TMSHelper.copyVarsFromObjectToObject({
                              sourceObject: slashedUrl
                            , mergeObject: window.TMSEvent
                            , targetPrefix: "page_url_window_"
                            , overwrite: true
                            , harmonize: false
                            , includeFromSource: {}
                            , excludeFromSource: {}
                            , includeFromMerge: {}
                            , excludeFromMerge: {}
                            , flatten: false
                        });
          
                    // 1.1.3 set processing flag
                    processingFlag = true;
                } else {
                    window.TMSHelper.console("[TMSProcessing.getPageURLWindow] -> warning: TMSEvent[page_url_window_url] does not seem to be a valid absolute URL, checking for URL parts in TMSEvent next");
                          
                    // do not set processing flag
                    processingFlag = false;
                }
            } else {
                window.TMSHelper.console("[TMSProcessing.getPageURLWindow] -> info: TMSEvent[page_url_window_url] not found, checking for URL parts in TMSEvent next");
                      
                // do not set processing flag
                processingFlag = false;
            }
          
            if (!processingFlag) {
                if ( 
                           (typeof window.TMSEvent['page_url_window_protocol'] === "string"             && window.TMSEvent['page_url_window_protocol'] !== "")
                        || (typeof window.TMSEvent['page_url_window_hostname'] === "string"             && window.TMSEvent['page_url_window_hostname'] != "")
                        || (typeof window.TMSEvent['page_url_window_path'] === "string"                 && window.TMSEvent['page_url_window_path'] !== "")
                        || (typeof window.TMSEvent['page_url_window_queryString'] === "string"          && window.TMSEvent['page_url_window_queryString'] !== "")
                        || (typeof window.TMSEvent['page_url_window_fragmentIdentifier'] === "string"   && window.TMSEvent['page_url_window_fragmentIdentifier'] !== "")
                        ) {
                    // 2 page URL parts are already defined in TMSEvent
                    window.TMSHelper.console("[TMSProcessing.getPageURLWindow] -> info: (at least one) Page URL Part found in TMSEvent");
                    var reverseOrderedAttributes = ["fragmentIdentifier", "queryString", "path", "hostname", "protocol"];
          
                    // 2.1 get URL to merge with, either from TMSCache or window.location
                    if (
                           (typeof window.TMSCache['page_url_window_protocol'] === "string"             && window.TMSCache['page_url_window_protocol'] !== "")
                        || (typeof window.TMSCache['page_url_window_hostname'] === "string"             && window.TMSCache['page_url_window_hostname'] != "")
                        || (typeof window.TMSCache['page_url_window_path'] === "string"                 && window.TMSCache['page_url_window_path'] !== "")
                        || (typeof window.TMSCache['page_url_window_queryString'] === "string"          && window.TMSCache['page_url_window_queryString'] !== "")
                        || (typeof window.TMSCache['page_url_window_fragmentIdentifier'] === "string"   && window.TMSCache['page_url_window_fragmentIdentifier'] !== "")
                        ) {
                        // 2.1.1 use vars from TMSCache as reference
                        var mergeObject = [];
                        mergeObject['protocol'] = window.TMSCache['page_url_window_protocol'] || "";
                        mergeObject['hostname'] = window.TMSCache['page_url_window_hostname'] || "";
                        mergeObject['path'] = window.TMSCache['page_url_window_path'] || "";
                        mergeObject['queryString'] = window.TMSCache['page_url_window_queryString'] || "";
                        mergeObject['fragmentIdentifier'] = window.TMSCache['page_url_window_fragmentIdentifier'] || "";
          
                        window.TMSHelper.console("[TMSProcessing.getPageURLWindow] -> info: TMSCache URL parts applied as reference");
                    } else {
                        // 2.1.2 use vars from window.location as reference
                        var mergeObject = window.TMSHelper.URLslasher(window.location.href);
          
                        window.TMSHelper.console("[TMSProcessing.getPageURLWindow] -> info: window.location URL parts applied as reference");
                    }
          
                    var pageUrlConstructed = "";
          
                    // 2.2 loop through url parts
                    for (i = 0; i < reverseOrderedAttributes.length; i++) {
                        if (typeof window.TMSEvent['page_url_window_' + reverseOrderedAttributes[i]] === "string" && window.TMSEvent['page_url_window_' + reverseOrderedAttributes[i]] !== "") {
                            if (reverseOrderedAttributes[i] === "protocol") {
                                pageUrlConstructed = window.TMSEvent['page_url_window_' + reverseOrderedAttributes[i]] + "//" + pageUrlConstructed;
                            } else if (reverseOrderedAttributes[i] === "queryString") {
                                pageUrlConstructed = "?" + window.TMSEvent['page_url_window_' + reverseOrderedAttributes[i]] + pageUrlConstructed;
                            } else if (reverseOrderedAttributes[i] === "fragmentIdentifier") {
                                pageUrlConstructed = "#" + window.TMSEvent['page_url_window_' + reverseOrderedAttributes[i]] + pageUrlConstructed;
                            } else {
                                pageUrlConstructed = window.TMSEvent['page_url_window_' + reverseOrderedAttributes[i]] + pageUrlConstructed;
                            }
                        } else {
                            if (typeof mergeObject[reverseOrderedAttributes[i]] === "string" && mergeObject[reverseOrderedAttributes[i]] !== "") {
                                if (reverseOrderedAttributes[i] === "protocol") {
                                    pageUrlConstructed = mergeObject[reverseOrderedAttributes[i]] + "//" + pageUrlConstructed;
                                } else if (reverseOrderedAttributes[i] === "queryString") {
                                    pageUrlConstructed = "?" + mergeObject[reverseOrderedAttributes[i]] + pageUrlConstructed;
                                } else if (reverseOrderedAttributes[i] === "fragmentIdentifier") {
                                    pageUrlConstructed = "#" + mergeObject[reverseOrderedAttributes[i]] + pageUrlConstructed;
                                } else {
                                    pageUrlConstructed = mergeObject[reverseOrderedAttributes[i]] + pageUrlConstructed;
                                }
                            }
                        }
                    }
          
                    // 2.3 slash consctructed page URL
                    var pageUrlConstructedSlashed = window.TMSHelper.URLslasher(pageUrlConstructed);
                  
                    // 2.4 copy to TMSEvent
                    window.TMSEvent = window.TMSHelper.copyVarsFromObjectToObject({
                              sourceObject: pageUrlConstructedSlashed
                            , mergeObject: window.TMSEvent
                            , targetPrefix: "page_url_window_"
                            , overwrite: true
                            , harmonize: false
                            , includeFromSource: {}
                            , excludeFromSource: {}
                            , includeFromMerge: {}
                            , excludeFromMerge: {}
                            , flatten: false
                        });
          
                    // 2.5 set processing flag
                    processingFlag = true;
          
                } else {
                    window.TMSHelper.console("[TMSProcessing.getPageURLWindow] -> info: TMSEvent does not contain URL parts, checking for TMSCache next");
                          
                    // do not set processing flag
                    processingFlag = false;
                }
            }
     
            if (!processingFlag) {
                if (typeof window.TMSCache === "object") {
                    // 3 nothing found in TMSEvent so far, check TMSCache
                    if (
                           (typeof window.TMSCache['page_url_window_url'] === "string"                  && window.TMSCache['page_url_window_url'] !== "")
                        || (typeof window.TMSCache['page_url_window_protocol'] === "string"             && window.TMSCache['page_url_window_protocol'] !== "")
                        || (typeof window.TMSCache['page_url_window_hostname'] === "string"             && window.TMSCache['page_url_window_hostname'] != "")
                        || (typeof window.TMSCache['page_url_window_path'] === "string"                 && window.TMSCache['page_url_window_path'] !== "")
                        || (typeof window.TMSCache['page_url_window_queryString'] === "string"          && window.TMSCache['page_url_window_queryString'] !== "")
                        || (typeof window.TMSCache['page_url_window_fragmentIdentifier'] === "string"   && window.TMSCache['page_url_window_fragmentIdentifier'] !== "")
                        ) {
                        // 3.1 URL found in TMSCache
                        window.TMSEvent['page_url_window_url']                = window.TMSCache['page_url_window_url'] || "";
                        window.TMSEvent['page_url_window_protocol']           = window.TMSCache['page_url_window_protocol'] || "";
                        window.TMSEvent['page_url_window_hostname']           = window.TMSCache['page_url_window_hostname'] || "";
                        window.TMSEvent['page_url_window_path']               = window.TMSCache['page_url_window_path'] || "";
                        window.TMSEvent['page_url_window_queryString']        = window.TMSCache['page_url_window_queryString'] || "";
                        window.TMSEvent['page_url_window_fragmentIdentifier'] = window.TMSCache['page_url_window_fragmentIdentifier'] || "";
                  
                        window.TMSHelper.console("[TMSProcessing.getPageURLWindow] -> info: TMSCache contains URL parts, copied to TMSEvent");
                    } else {
                            window.TMSHelper.console("[TMSProcessing.getPageURLWindow] -> info: TMSCache does not contain URL parts, fallback on window.location next");
                                  
                            // do not set processing flag
                            processingFlag = false;
                    }
                } else {
                    window.TMSHelper.console("[TMSProcessing.getPageURLWindow] -> warning: TMSCache is not defined");
                } // end if TMSCache
            } // end if processingFlag
     
            if (!processingFlag) {
                // 4 Nothing found anywhere, use window.location as fallback
                window.TMSHelper.console("[TMSProcessing.getPageURLWindow] -> info: window.location used as fallback");
 
                // 4.1 retrieve and slash window.location into temporary variables for further processing
                var windowLocationSlashed = window.TMSHelper.URLslasher(window.location.href);
                      
                // 4.2 copy to TMSEvent
                window.TMSEvent = window.TMSHelper.copyVarsFromObjectToObject({
                              sourceObject: windowLocationSlashed
                            , mergeObject: window.TMSEvent
                            , targetPrefix: "page_url_window_"
                            , overwrite: true
                            , harmonize: false
                            , includeFromSource: {}
                            , excludeFromSource: {}
                            , includeFromMerge: {}
                            , excludeFromMerge: {}
                            , flatten: false
                        });
              
                window.TMSHelper.console("[TMSProcessing.getPageURLWindow] -> info: window.location slashed and copied to TMSEvent");
            } // end if
 
            // concat hostname and path
            if (typeof window.TMSEvent['page_url_window_hostname'] === "string" && typeof window.TMSEvent['page_url_window_path'] === "string") {
                if (window.TMSEvent['page_url_window_path'].startsWith("/")) {
                    window.TMSEvent['page_url_window_hostnameAndPath'] = window.TMSEvent['page_url_window_hostname'].concat(window.TMSEvent['page_url_window_path']);
                } else {
                    window.TMSEvent['page_url_window_hostnameAndPath'] = window.TMSEvent['page_url_window_hostname'].concat("/");
                    window.TMSEvent['page_url_window_hostnameAndPath'] = window.TMSEvent['page_url_window_hostnameAndPath'].concat(window.TMSEvent['page_url_window_path']);
                }
            }
          
        } else {
            window.TMSHelper.console("[TMSProcessing.getPageURLWindow] warning -> TMSEvent is not defined");
        } // end if TMSEvent
     
        window.TMSHelper.console("[TMSProcessing.getPageURLWindow] complete");
    } catch (err) {
        window.TMSHelper.console("[TMSProcessing.getPageURLWindow] error:");
        window.TMSHelper.errorHandler(err);
    };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1102 TMSProcessing.getPageURLCanonical
// Issued by: Agnosticalyze
// version: 2.3, 2021-05-15
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
// Get canonical URL
window.TMSProcessing = window.TMSProcessing || {}; // remove this line if function is included inside a collection wrapper
window.TMSProcessing.getPageURLCanonical = function () { // remove this line for including function inside a collection wrapper
// function getPageURLCanonical() {  // uncomment this line for including function inside a collection wrapper
    try {
        window.TMSHelper.console("[TMSProcessing.getPageURLCanonical] start");
              
        if(typeof window.TMSEvent === "object") {
            // create processing flag
            var processingFlag = false;
          
            if (typeof window.TMSEvent['page_url_canonical_url'] === "string" && window.TMSEvent['page_url_canonical_url'] !== "") {
                // 1 canonical URL is already defined in TMSEvent
                window.TMSHelper.console("[TMSProcessing.getPageURLCanonical] -> info: Canonical URL found in TMSEvent");
              
                // 1.1 check if URL is valid and complete
                var startWithProtocol = new RegExp("^[a-zA-Z]*:");
                if (startWithProtocol.test(window.TMSEvent['page_url_canonical_url'])) {
                    // 1.1.1 slash TMSEvent full URL into temporary URL variables
                    var slashedUrl = window.TMSHelper.URLslasher(window.TMSEvent['page_url_canonical_url']);
          
                    // 1.1.2 copy to TMSEvent
                    window.TMSEvent = window.TMSHelper.copyVarsFromObjectToObject({
                              sourceObject: slashedUrl
                            , mergeObject: window.TMSEvent
                            , targetPrefix: "page_url_canonical_"
                            , overwrite: true
                            , harmonize: false
                            , includeFromSource: {}
                            , excludeFromSource: {}
                            , includeFromMerge: {}
                            , excludeFromMerge: {}
                            , flatten: false
                        });
          
                    // 1.1.3 set processing flag
                    processingFlag = true;
                } else {         
                    window.TMSHelper.console("[TMSProcessing.getPageURLCanonical] -> warning: TMSEvent[page_url_canonical_url] does not seem to be a valid absolute URL, checking for URL parts in TMSEvent next");
                          
                    // do not set processing flag
                    processingFlag = false;
                }
            } else {
                window.TMSHelper.console("[TMSProcessing.getPageURLCanonical] -> info: TMSEvent[page_url_canonical_url] not found, checking for URL parts in TMSEvent next");
                      
                // do not set processing flag
                processingFlag = false;
            }
          
            if (!processingFlag) {
                if (
                       (typeof window.TMSEvent['page_url_canonical_protocol'] === "string"             && window.TMSEvent['page_url_canonical_protocol'] !== "")
                    || (typeof window.TMSEvent['page_url_canonical_hostname'] === "string"             && window.TMSEvent['page_url_canonical_hostname'] != "")
                    || (typeof window.TMSEvent['page_url_canonical_path'] === "string"                 && window.TMSEvent['page_url_canonical_path'] !== "")
                    || (typeof window.TMSEvent['page_url_canonical_queryString'] === "string"          && window.TMSEvent['page_url_canonical_queryString'] !== "")
                    || (typeof window.TMSEvent['page_url_canonical_fragmentIdentifier'] === "string"   && window.TMSEvent['page_url_canonical_fragmentIdentifier'] !== "")
                    ) {
                    // get URL of canonical tag
                    var canonicalTagUrl = window.TMSHelper.getURLFromHtmlElement("canonical", null);
          
                    // 2 canonical URL parts are already defined in TMSEvent
                    window.TMSHelper.console("[TMSProcessing.getPageURLCanonical] -> info: (at least one) Canonical URL Part found in TMSEvent");
                    var reverseOrderedAttributes = ["fragmentIdentifier", "queryString", "path", "hostname", "protocol"];
          
                    // 2.1 get URL to merge with, either from TMSCache, canonicla tag or TMSEvent
                    if ( typeof window.TMSCache !== 'undefined' && (
                               (typeof window.TMSCache['page_url_canonical_protocol'] === "string"             && window.TMSCache['page_url_canonical_protocol'] !== "")
                            || (typeof window.TMSCache['page_url_canonical_hostname'] === "string"             && window.TMSCache['page_url_canonical_hostname'] != "")
                            || (typeof window.TMSCache['page_url_canonical_path'] === "string"                 && window.TMSCache['page_url_canonical_path'] !== "")
                            || (typeof window.TMSCache['page_url_canonical_queryString'] === "string"          && window.TMSCache['page_url_canonical_queryString'] !== "")
                            || (typeof window.TMSCache['page_url_canonical_fragmentIdentifier'] === "string"   && window.TMSCache['page_url_canonical_fragmentIdentifier'] !== "")
                            )
                        ) {
                        // 2.1.1 use vars from TMSCache as reference
                        var mergeObject = [];
                        mergeObject['protocol'] = window.TMSCache['page_url_canonical_protocol'] || "";
                        mergeObject['hostname'] = window.TMSCache['page_url_canonical_hostname'] || "";
                        mergeObject['path'] = window.TMSCache['page_url_canonical_path'] || "";
                        mergeObject['queryString'] = window.TMSCache['page_url_canonical_queryString'] || "";
                        mergeObject['fragmentIdentifier'] = window.TMSCache['page_url_canonical_fragmentIdentifier'] || "";
          
                        window.TMSHelper.console("[TMSProcessing.getPageURLCanonical] -> info: TMSCache URL parts applied as reference");
                    } else if (canonicalTagUrl !== "") {
                        // 2.1.2 use vars from canonical tag as reference
                        var mergeObject = window.TMSHelper.URLslasher(canonicalTagUrl);
          
                        window.TMSHelper.console("[TMSProcessing.getPageURLCanonical] -> info: Canonical Tag URL parts applied as reference");
                    } else if (
                           (typeof window.TMSEvent['page_url_window_protocol'] === "string"             && window.TMSEvent['page_url_window_protocol'] !== "")
                        || (typeof window.TMSEvent['page_url_window_hostname'] === "string"             && window.TMSEvent['page_url_window_hostname'] != "")
                        || (typeof window.TMSEvent['page_url_window_path'] === "string"                 && window.TMSEvent['page_url_window_path'] !== "")
                        || (typeof window.TMSEvent['page_url_window_queryString'] === "string"          && window.TMSEvent['page_url_window_queryString'] !== "")
                        || (typeof window.TMSEvent['page_url_window_fragmentIdentifier'] === "string"   && window.TMSEvent['page_url_window_fragmentIdentifier'] !== "")
                        ) {
                        // 2.1.3 use vars from window URL as reference
                        var mergeObject = [];
                        mergeObject['protocol'] = window.TMSEvent['page_url_window_protocol'] || "";
                        mergeObject['hostname'] = window.TMSEvent['page_url_window_hostname'] || "";
                        mergeObject['path'] = window.TMSEvent['page_url_window_path'] || "";
                        mergeObject['queryString'] = window.TMSEvent['page_url_window_queryString'] || "";
                        mergeObject['fragmentIdentifier'] = window.TMSEvent['page_url_window_fragmentIdentifier'] || "";
          
                        window.TMSHelper.console("[TMSProcessing.getPageURLCanonical] -> info: Window URL parts from TMSEvent applied as reference");
                    } else {
                        var mergeObject = [];
          
                        window.TMSHelper.console("[TMSProcessing.getPageURLCanonical] -> warning: No reference to apply on URL parts found");
                    }
          
                    var canonicalUrlConstructed = "";
          
                    // 2.2 loop through canonical URL parts
                    for (i = 0; i < reverseOrderedAttributes.length; i++) {
                        if (typeof window.TMSEvent['page_url_canonical_' + reverseOrderedAttributes[i]] === "string" && window.TMSEvent['page_url_canonical_' + reverseOrderedAttributes[i]] !== "") {
                            if (reverseOrderedAttributes[i] === "protocol") {
                                canonicalUrlConstructed = window.TMSEvent['page_url_canonical_' + reverseOrderedAttributes[i]] + "//" + canonicalUrlConstructed;
                            } else if (reverseOrderedAttributes[i] === "queryString") {
                                canonicalUrlConstructed = "?" + window.TMSEvent['page_url_canonical_' + reverseOrderedAttributes[i]] + canonicalUrlConstructed;
                            } else if (reverseOrderedAttributes[i] === "fragmentIdentifier") {
                                canonicalUrlConstructed = "#" + window.TMSEvent['page_url_canonical_' + reverseOrderedAttributes[i]] + canonicalUrlConstructed;
                            } else {
                                canonicalUrlConstructed = window.TMSEvent['page_url_canonical_' + reverseOrderedAttributes[i]] + canonicalUrlConstructed;
                            }
                        } else {                      
                            if (typeof mergeObject[reverseOrderedAttributes[i]] === "string" && mergeObject[reverseOrderedAttributes[i]] !== "") {
                                if (reverseOrderedAttributes[i] === "protocol") {
                                    canonicalUrlConstructed = mergeObject[reverseOrderedAttributes[i]] + "//" + canonicalUrlConstructed;
                                } else if (reverseOrderedAttributes[i] === "queryString") {
                                    canonicalUrlConstructed = "?" + mergeObject[reverseOrderedAttributes[i]] + canonicalUrlConstructed;
                                } else if (reverseOrderedAttributes[i] === "fragmentIdentifier") {
                                    canonicalUrlConstructed = "#" + mergeObject[reverseOrderedAttributes[i]] + canonicalUrlConstructed;
                                } else {
                                    canonicalUrlConstructed = mergeObject[reverseOrderedAttributes[i]] + canonicalUrlConstructed;
                                }
                            }
                        }
                    }
          
                    // 2.3 slash consctructed canonical URL
                    var canonicalUrlConstructedSlashed = window.TMSHelper.URLslasher(canonicalUrlConstructed);
              
                    // 2.4 copy to TMSEvent
                    window.TMSEvent = window.TMSHelper.copyVarsFromObjectToObject({
                              sourceObject: canonicalUrlConstructedSlashed
                            , mergeObject: window.TMSEvent
                            , targetPrefix: "page_url_canonical_"
                            , overwrite: true
                            , harmonize: false
                            , includeFromSource: {}
                            , excludeFromSource: {}
                            , includeFromMerge: {}
                            , excludeFromMerge: {}
                            , flatten: false
                        });
          
                    // 2.5 set processing flag
                    processingFlag = true;
                } else {
                    window.TMSHelper.console("[TMSProcessing.getPageURLCanonical] -> info: TMSEvent does not contain URL parts, checking for TMSCache next");
                          
                    // do not set processing flag
                    processingFlag = false;
                }
            } // end if
     
            if (!processingFlag && typeof TMSCache === "object") {
                // 3 nothing found in TMSEvent so far, check TMSCache
                if (
                       (typeof window.TMSCache['page_url_canonical_url'] === "string"                  && window.TMSCache['page_url_canonical_url'] !== "")
                    || (typeof window.TMSCache['page_url_canonical_protocol'] === "string"             && window.TMSCache['page_url_canonical_protocol'] !== "")
                    || (typeof window.TMSCache['page_url_canonical_hostname'] === "string"             && window.TMSCache['page_url_canonical_hostname'] != "")
                    || (typeof window.TMSCache['page_url_canonical_path'] === "string"                 && window.TMSCache['page_url_canonical_path'] !== "")
                    || (typeof window.TMSCache['page_url_canonical_queryString'] === "string"          && window.TMSCache['page_url_canonical_queryString'] !== "")
                    || (typeof window.TMSCache['page_url_canonical_fragmentIdentifier'] === "string"   && window.TMSCache['page_url_canonical_fragmentIdentifier'] !== "")
                    ) {
                    // 3.1 URL found in TMSCache
                    window.TMSEvent['page_url_canonical_url']                = window.TMSCache['page_url_canonical_url'] || "";
                    window.TMSEvent['page_url_canonical_protocol']           = window.TMSCache['page_url_canonical_protocol'] || "";
                    window.TMSEvent['page_url_canonical_hostname']           = window.TMSCache['page_url_canonical_hostname'] || "";
                    window.TMSEvent['page_url_canonical_path']               = window.TMSCache['page_url_canonical_path'] || "";
                    window.TMSEvent['page_url_canonical_queryString']        = window.TMSCache['page_url_canonical_queryString'] || "";
                    window.TMSEvent['page_url_canonical_fragmentIdentifier'] = window.TMSCache['page_url_canonical_fragmentIdentifier'] || "";
              
                    window.TMSHelper.console("[TMSProcessing.getPageURLCanonical] -> info: TMSCache contains URL parts, copied to TMSEvent");
              
                    // 3.2 set processing flag
                    processingFlag = true;
                } else {
                    window.TMSHelper.console("[TMSProcessing.getPageURLCanonical] -> info: TMSCache not contain URL parts, checking for Canonical Tag next");
                              
                    // do not set processing flag
                    processingFlag = false;
                }
            } else {
                window.TMSHelper.console("[TMSProcessing.getPageURLCanonical] warning -> TMSCache is not defined");
            } // end if TMSCache
              
            if (!processingFlag) {
                // 4 nothing found in TMSEvent or TMSCache, check Canonical Tag
                var canonicalTagUrl = window.TMSHelper.getURLFromHtmlElement("canonical", null);
              
                if (canonicalTagUrl !== "") {
                    // 4.1 slash
                    var canonicalTagUrlSlashed = window.TMSHelper.URLslasher(window.TMSHelper.URLconstructor(canonicalTagUrl));
              
                    // 4.2 copy to TMSEvent
                    window.TMSEvent = window.TMSHelper.copyVarsFromObjectToObject({
                              sourceObject: canonicalTagUrlSlashed
                            , mergeObject: window.TMSEvent
                            , targetPrefix: "page_url_canonical_"
                            , overwrite: true
                            , harmonize: false
                            , includeFromSource: {}
                            , excludeFromSource: {}
                            , includeFromMerge: {}
                            , excludeFromMerge: {}
                            , flatten: false
                        });
              
                    window.TMSHelper.console("[TMSProcessing.getPageURLCanonical] -> info: Canonical Tag found, copied to TMSEvent");
                } else {
                    // 5 use window URL from TMSEvent as fallback
                    window.TMSEvent['page_url_canonical_url']                = window.TMSEvent['page_url_window_url'] || "";
                    window.TMSEvent['page_url_canonical_protocol']           = window.TMSEvent['page_url_window_protocol'] || "";
                    window.TMSEvent['page_url_canonical_hostname']           = window.TMSEvent['page_url_window_hostname'] || "";
                    window.TMSEvent['page_url_canonical_path']               = window.TMSEvent['page_url_window_path'] || "";
                    window.TMSEvent['page_url_canonical_queryString']        = window.TMSEvent['page_url_window_queryString'] || "";
                    window.TMSEvent['page_url_canonical_fragmentIdentifier'] = window.TMSEvent['page_url_window_fragmentIdentifier'] || "";
              
                    window.TMSHelper.console("[TMSProcessing.getPageURLCanonical] -> info: No Canonical information found, copied Window URL from TMSEvent");
                }
            } // end if
 
            // concat hostname and path
            if (typeof window.TMSEvent['page_url_canonical_hostname'] === "string" && typeof window.TMSEvent['page_url_canonical_path'] === "string") {
                if (window.TMSEvent['page_url_canonical_path'].startsWith("/")) {
                    window.TMSEvent['page_url_canonical_hostnameAndPath'] = window.TMSEvent['page_url_canonical_hostname'].concat(window.TMSEvent['page_url_canonical_path']);
                } else {
                    window.TMSEvent['page_url_canonical_hostnameAndPath'] = window.TMSEvent['page_url_canonical_hostname'].concat("/");
                    window.TMSEvent['page_url_canonical_hostnameAndPath'] = window.TMSEvent['page_url_canonical_hostnameAndPath'].concat(window.TMSEvent['page_url_canonical_path']);
                }
            }
          
        } else {
            window.TMSHelper.console("[TMSProcessing.getPageURLCanonical] warning -> TMSEvent is not defined");
        } // end if TMSEvent
          
        window.TMSHelper.console("[TMSProcessing.getPageURLCanonical] complete");
    } catch (err) {
        window.TMSHelper.console("[TMSProcessing.getPageURLCanonical] error:");
        window.TMSHelper.errorHandler(err);
    };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1103 TMSProcessing.getPageURLAlternate
// Issued by: Agnosticalyze
// version: 1.3.1, 2021-12-17
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
   
// Get alternate URL
window.TMSProcessing = window.TMSProcessing || {}; // remove this line if function is included inside a collection wrapper
window.TMSProcessing.getPageURLAlternate = function () { // remove this line for including function inside a collection wrapper
// function getPageURLAlternate() {  // uncomment this line for including function inside a collection wrapper
    try {
		window.TMSHelper.console("[TMSProcessing.getPageURLAlternate] start");
   
		if (typeof window.TMSEvent === "object") {
			// create processing flag
			var processingFlag = false;
   
			if (typeof window.TMSEvent['page_url_alternate_url'] === "string" && window.TMSEvent['page_url_alternate_url'] !== "") {
				// 1 alternate URL is already defined in TMSEvent
				window.TMSHelper.console("[TMSProcessing.getPageURLAlternate] -> info: alternate URL found in TMSEvent");
   
				// 1.1 check if URL is valid and complete
				var startWithProtocol = new RegExp("^[a-zA-Z]*:");
				if (startWithProtocol.test(window.TMSEvent['page_url_alternate_url'])) {
					// 1.1.1 slash TMSEvent full URL into temporary URL variables
					var slashedUrl = window.TMSHelper.URLslasher(window.TMSEvent['page_url_alternate_url']);
   
					// 1.1.2 copy to TMSEvent
					window.TMSEvent = window.TMSHelper.copyVarsFromObjectToObject({
							  sourceObject: slashedUrl
							, mergeObject: window.TMSEvent
							, targetPrefix: "page_url_alternate_"
							, overwrite: true
							, harmonize: false
							, includeFromSource: {}
							, excludeFromSource: {}
							, includeFromMerge: {}	
							, excludeFromMerge: {}
							, flatten: false
						});
   
					// 1.1.3 set processing flag
					processingFlag = true;
				} else {
					window.TMSHelper.console("[TMSProcessing.getPageURLAlternate] -> warning: TMSEvent[page_url_alternate_url] does not seem to be a valid absolute URL, checking for URL parts in TMSEvent next");
   
					// do not set processing flag
					processingFlag = false;
				}
			} else {
				window.TMSHelper.console("[TMSProcessing.getPageURLAlternate] -> info: TMSEvent[page_url_alternate_url] not found, checking for URL parts in TMSEvent next");
   
				// do not set processing flag
				processingFlag = false;
			}
   
			if (!processingFlag) {
				// get URL of alternate tag
				var alternateTagUrlObject = window.TMSHelper.getURLFromHtmlElement("alternate", null);
				if (typeof alternateTagUrlObject === "object") {
					var alternateTagUrl = alternateTagUrlObject['url'] || "";
					var alternateTagLang = alternateTagUrlObject['lang'] || "";
				} else {
					var alternateTagUrl = "";
					var alternateTagLang = "";
				}
   
				if (typeof window.TMSEvent['page_url_alternate_language'] === "string" && window.TMSEvent['page_url_alternate_language'] !== "" && (
					   (typeof window.TMSEvent['page_url_alternate_protocol'] === "string" && window.TMSEvent['page_url_alternate_protocol'] !== "")
					|| (typeof window.TMSEvent['page_url_alternate_hostname'] === "string" && window.TMSEvent['page_url_alternate_hostname'] != "")
					|| (typeof window.TMSEvent['page_url_alternate_path'] === "string" && window.TMSEvent['page_url_alternate_path'] !== "")
					|| (typeof window.TMSEvent['page_url_alternate_queryString'] === "string" && window.TMSEvent['page_url_alternate_queryString'] !== "")
					|| (typeof window.TMSEvent['page_url_alternate_fragmentIdentifier'] === "string" && window.TMSEvent['page_url_alternate_fragmentIdentifier'] !== "")
				)) {
					// 2 alternate URL parts are already defined in TMSEvent
					window.TMSHelper.console("[TMSProcessing.getPageURLAlternate] -> info: (at least one) alternate URL Part found in TMSEvent");
					var reverseOrderedAttributes = ["fragmentIdentifier", "queryString", "path", "hostname", "protocol"];
   
					// 2.1 get URL to merge with, either from TMSCache, alternate tag or TMSEvent
					if (window.TMSEvent['page_url_alternate_language'] === window.TMSCache['page_url_alternate_language'] && (
						   (typeof window.TMSCache['page_url_alternate_protocol'] === "string" && window.TMSCache['page_url_alternate_protocol'] !== "")
						|| (typeof window.TMSCache['page_url_alternate_hostname'] === "string" && window.TMSCache['page_url_alternate_hostname'] != "")
						|| (typeof window.TMSCache['page_url_alternate_path'] === "string" && window.TMSCache['page_url_alternate_path'] !== "")
						|| (typeof window.TMSCache['page_url_alternate_queryString'] === "string" && window.TMSCache['page_url_alternate_queryString'] !== "")
						|| (typeof window.TMSCache['page_url_alternate_fragmentIdentifier'] === "string" && window.TMSCache['page_url_alternate_fragmentIdentifier'] !== "")
					)) {
						// 2.1.1 use vars from TMSCache as reference
						var mergeObject = [];
						mergeObject['protocol'] = window.TMSCache['page_url_alternate_protocol'] || "";
						mergeObject['hostname'] = window.TMSCache['page_url_alternate_hostname'] || "";
						mergeObject['path'] = window.TMSCache['page_url_alternate_path'] || "";
						mergeObject['queryString'] = window.TMSCache['page_url_alternate_queryString'] || "";
						mergeObject['fragmentIdentifier'] = window.TMSCache['page_url_alternate_fragmentIdentifier'] || "";
   
						window.TMSHelper.console("[TMSProcessing.getPageURLAlternate] -> info: TMSCache URL parts applied as reference");
					} else if (alternateTagUrl !== "" && window.TMSEvent['page_url_alternate_language'] === alternateTagLang) {
						// 2.1.2 use vars from alternate tag as reference
						var mergeObject = window.TMSHelper.URLslasher(alternateTagUrl);
   
						window.TMSHelper.console("[TMSProcessing.getPageURLAlternate] -> info: alternate Tag URL parts applied as reference");
					} else {
						var mergeObject = [];
   
						window.TMSHelper.console("[TMSProcessing.getPageURLAlternate] -> warning: No reference to apply on URL parts found");
					}
   
					var alternateUrlConstructed = "";
   
					// 2.2 loop through alternate URL parts
					for (i = 0; i < reverseOrderedAttributes.length; i++) {
						if (typeof window.TMSEvent['page_url_alternate_' + reverseOrderedAttributes[i]] === "string" && window.TMSEvent['page_url_alternate_' + reverseOrderedAttributes[i]] !== "") {
							if (reverseOrderedAttributes[i] === "protocol") {
								alternateUrlConstructed = window.TMSEvent['page_url_alternate_' + reverseOrderedAttributes[i]] + "//" + alternateUrlConstructed;
							} else if (reverseOrderedAttributes[i] === "queryString") {
								alternateUrlConstructed = "?" + window.TMSEvent['page_url_alternate_' + reverseOrderedAttributes[i]] + alternateUrlConstructed;
							} else if (reverseOrderedAttributes[i] === "fragmentIdentifier") {
								alternateUrlConstructed = "#" + window.TMSEvent['page_url_alternate_' + reverseOrderedAttributes[i]] + alternateUrlConstructed;
							} else {
								alternateUrlConstructed = window.TMSEvent['page_url_alternate_' + reverseOrderedAttributes[i]] + alternateUrlConstructed;
							}
						} else {
							if (typeof mergeObject[reverseOrderedAttributes[i]] === "string" && mergeObject[reverseOrderedAttributes[i]] !== "") {
								if (reverseOrderedAttributes[i] === "protocol") {
									alternateUrlConstructed = mergeObject[reverseOrderedAttributes[i]] + "//" + alternateUrlConstructed;
								} else if (reverseOrderedAttributes[i] === "queryString") {
									alternateUrlConstructed = "?" + mergeObject[reverseOrderedAttributes[i]] + alternateUrlConstructed;
								} else if (reverseOrderedAttributes[i] === "fragmentIdentifier") {
									alternateUrlConstructed = "#" + mergeObject[reverseOrderedAttributes[i]] + alternateUrlConstructed;
								} else {
									alternateUrlConstructed = mergeObject[reverseOrderedAttributes[i]] + alternateUrlConstructed;
								}
							}
						}
					}
   
					// 2.3 slash consctructed alternate URL
					var alternateUrlConstructedSlashed = window.TMSHelper.URLslasher(alternateUrlConstructed);
   
					// 2.4 copy to TMSEvent
					window.TMSEvent = window.TMSHelper.copyVarsFromObjectToObject({
							  sourceObject: alternateUrlConstructedSlashed
							, mergeObject: window.TMSEvent
							, targetPrefix: "page_url_alternate_"
							, overwrite: true
							, harmonize: false
							, includeFromSource: {}
							, excludeFromSource: {}
							, includeFromMerge: {}
							, excludeFromMerge: {}
							, flatten: false
						});
   
					// 2.5 set processing flag
					processingFlag = true;
				} else {
					window.TMSHelper.console("[TMSProcessing.getPageURLAlternate] -> info: TMSEvent does not contain URL parts/language, checking for TMSCache next");
   
					// do not set processing flag
					processingFlag = false;
				}
			}
   
			if (!processingFlag && typeof TMSCache === "object") {
				// 3 nothing found in TMSEvent so far, check TMSCache
				if (typeof window.TMSCache['page_url_alternate_language'] === "string" && window.TMSCache['page_url_alternate_language'] !== "" && (
					   (typeof window.TMSCache['page_url_alternate_url'] === "string" && window.TMSCache['page_url_alternate_url'] !== "")
					|| (typeof window.TMSCache['page_url_alternate_protocol'] === "string" && window.TMSCache['page_url_alternate_protocol'] !== "")
					|| (typeof window.TMSCache['page_url_alternate_hostname'] === "string" && window.TMSCache['page_url_alternate_hostname'] != "")
					|| (typeof window.TMSCache['page_url_alternate_path'] === "string" && window.TMSCache['page_url_alternate_path'] !== "")
					|| (typeof window.TMSCache['page_url_alternate_queryString'] === "string" && window.TMSCache['page_url_alternate_queryString'] !== "")
					|| (typeof window.TMSCache['page_url_alternate_fragmentIdentifier'] === "string" && window.TMSCache['page_url_alternate_fragmentIdentifier'] !== "")
				)) {
					// 3.1 URL found in TMSCache
					window.TMSEvent['page_url_alternate_language'] = window.TMSCache['page_url_alternate_language'] || "";
					window.TMSEvent['page_url_alternate_url'] = window.TMSCache['page_url_alternate_url'] || "";
					window.TMSEvent['page_url_alternate_protocol'] = window.TMSCache['page_url_alternate_protocol'] || "";
					window.TMSEvent['page_url_alternate_hostname'] = window.TMSCache['page_url_alternate_hostname'] || "";
					window.TMSEvent['page_url_alternate_path'] = window.TMSCache['page_url_alternate_path'] || "";
					window.TMSEvent['page_url_alternate_queryString'] = window.TMSCache['page_url_alternate_queryString'] || "";
					window.TMSEvent['page_url_alternate_fragmentIdentifier'] = window.TMSCache['page_url_alternate_fragmentIdentifier'] || "";
   
					window.TMSHelper.console("[TMSProcessing.getPageURLAlternate] -> info: TMSCache contains URL parts, copied to TMSEvent");
   
					// 3.2 set processing flag
					processingFlag = true;
				} else {
					window.TMSHelper.console("[TMSProcessing.getPageURLAlternate] -> info: TMSCache not contain URL parts, checking for alternate Tag next");
   
					// do not set processing flag
					processingFlag = false;
				}
			} // end if TMSCache
   
			if (!processingFlag) {
				// 4 nothing found in TMSEvent or TMSCache, check alternate Tag
				var alternateTagUrlObject = window.TMSHelper.getURLFromHtmlElement("alternate", null);
				if (typeof alternateTagUrlObject === "object") {
					var alternateTagUrl = alternateTagUrlObject['url'] || "";
					var alternateTagLang = alternateTagUrlObject['lang'] || "";
				} else {
					var alternateTagUrl = "";
					var alternateTagLang = "";
				}
   
				if (alternateTagUrl !== "") {
					// 4.1 slash
					var alternateTagUrlSlashed = window.TMSHelper.URLslasher(window.TMSHelper.URLconstructor(alternateTagUrl));
   
					// 4.2 copy to TMSEvent
					window.TMSEvent = window.TMSHelper.copyVarsFromObjectToObject({
							  sourceObject: alternateTagUrlSlashed
							, mergeObject: window.TMSEvent
							, targetPrefix: "page_url_alternate_"
							, overwrite: true
							, harmonize: false
							, includeFromSource: {}
							, excludeFromSource: {}
							, includeFromMerge: {}
							, excludeFromMerge: {}
							, flatten: false
						});
					window.TMSEvent['page_url_alternate_language'] = alternateTagLang;
   
					window.TMSHelper.console("[TMSProcessing.getPageURLAlternate] -> info: alternate Tag found, copied to TMSEvent");
				} else {
					// 5 leave empty if no information was found anywhere
					window.TMSEvent['page_url_alternate_language'] = "";
					window.TMSEvent['page_url_alternate_url'] = "";
					window.TMSEvent['page_url_alternate_protocol'] = "";
					window.TMSEvent['page_url_alternate_hostname'] = "";
					window.TMSEvent['page_url_alternate_path'] = "";
					window.TMSEvent['page_url_alternate_queryString'] = "";
					window.TMSEvent['page_url_alternate_fragmentIdentifier'] = "";
   
					window.TMSHelper.console("[TMSProcessing.getPageURLAlternate] -> info: No alternate information found, Alternate URL left empty in TMSEvent");
				}
			} // end if
 
			// concat hostname and path
			if (typeof window.TMSEvent['page_url_alternate_hostname'] === "string" && typeof window.TMSEvent['page_url_alternate_path'] === "string") {
				if (window.TMSEvent['page_url_alternate_hostname'] !== "") {
					// alternate hostname is populated
					if (window.TMSEvent['page_url_alternate_path'].startsWith("/")) {
						// alternate path is populated and starts with slash/
						window.TMSEvent['page_url_alternate_hostnameAndPath'] = window.TMSEvent['page_url_alternate_hostname'].concat(window.TMSEvent['page_url_alternate_path']);
					} else {
						// alternate path is either empty or populated and doesnt start with slash
						window.TMSEvent['page_url_alternate_hostnameAndPath'] = window.TMSEvent['page_url_alternate_hostname'].concat("/");
						window.TMSEvent['page_url_alternate_hostnameAndPath'] = window.TMSEvent['page_url_alternate_hostnameAndPath'].concat(window.TMSEvent['page_url_alternate_path']);
					}
				} else {
					// alternate hostname is not populated
					window.TMSEvent['page_url_alternate_hostnameAndPath'] = "";
				}
			}
 
		} else {
			window.TMSHelper.console("[TMSProcessing.getPageURLAlternate] warning -> TMSEvent is not defined");
		} // end if TMSEvent
   
		window.TMSHelper.console("[TMSProcessing.getPageURLAlternate] complete");
	} catch (err) {
		window.TMSHelper.console("[TMSProcessing.getPageURLAlternate] error:");
		window.TMSHelper.errorHandler(err);
	};
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1104 TMSProcessing.getPageURLInput
// Issued by: Agnosticalyze
// version: 1.4.1, 2021-02-19
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
// Get input URL
window.TMSProcessing = window.TMSProcessing || {}; // remove this line if function is included inside a collection wrapper
window.TMSProcessing.getPageURLInput = function () { // remove this line for including function inside a collection wrapper
// function getPageURLInput() {  // uncomment this line for including function inside a collection wrapper
    try {
        window.TMSHelper.console("[TMSProcessing.getPageURLInput] start");
              
        if(typeof window.TMSEvent === "object") {
            // create processing flag
            var processingFlag = false;
 
            if (typeof window.TMSEvent['page_url_input_url'] === "string" && window.TMSEvent['page_url_input_url'] !== "") {
                // 1 input URL is already defined in TMSEvent
                window.TMSHelper.console("[TMSProcessing.getPageURLInput] -> info: Input URL found in TMSEvent: " + window.TMSEvent['page_url_input_url']);
 
                // set processing flag
                processingFlag = true;
            } else {
                window.TMSHelper.console("[TMSProcessing.getPageURLInput] -> info: Input URL not found in TMSEvent, checking window query string next");
 
                // do not set processing flag
                processingFlag = false;
            }
 
            if (!processingFlag && typeof window.TMSEvent['page_url_window_queryString'] === "string" && window.TMSEvent['page_url_window_queryString'] !== "") {
                var inputUrl = window.TMSHelper.getVarFromString(window.TMSEvent['page_url_window_queryString'], "page_url_input_url", "url");
                if (typeof inputUrl === "string" && inputUrl !== "") {
                    // 2 input URL found in window query string
                    window.TMSEvent['page_url_input_url'] = inputUrl;
                    window.TMSHelper.console("[TMSProcessing.getPageURLInput] -> info: Input URL found in window query string in TMSEvent: " + inputUrl);
 
                    // set processing flag
                    processingFlag = true;
                } else {
                    window.TMSHelper.console("[TMSProcessing.getPageURLInput] -> info: Input URL not found in window query string in TMSEvent, checking TMSCache next");
 
                    // do not set processing flag
                    processingFlag = false;
                }
            } else {
                window.TMSHelper.console("[TMSProcessing.getPageURLInput] -> info: window query string not found in TMSEvent, checking TMSCache next");
 
                // do not set processing flag
                processingFlag = false;
            }
 
            if (!processingFlag && typeof TMSCache === "object") {
                if (typeof window.TMSCache['page_url_input_url'] === "string" && window.TMSCache['page_url_input_url'] !== "") {
                    // 3 input URL found in TMSCache
                    window.TMSEvent['page_url_input_url'] = window.TMSCache['page_url_input_url'];
                    window.TMSHelper.console("[TMSProcessing.getPageURLInput] -> info: Input URL found in TMSCache: " + window.TMSCache['page_url_input_url']);
 
                    // set processing flag
                    processingFlag = true;
                } else {
                    window.TMSHelper.console("[TMSProcessing.getPageURLInput] -> info: Input URL not found in TMSCache, trying to set to Window URL in TMSEvent next");
 
                    // do not set processing flag
                    processingFlag = false;
                }
            } else {
                window.TMSHelper.console("[TMSProcessing.getPageURLInput] warning -> TMSCache is not defined");
            }
 
            if (!processingFlag && typeof window.TMSEvent['page_url_window_url'] === "string" && window.TMSEvent['page_url_window_url'] !== "") {
                // 4 input URL not found => set to window URL
                window.TMSEvent['page_url_input_url'] = window.TMSEvent['page_url_window_url'];
                window.TMSHelper.console("[TMSProcessing.getPageURLInput] -> info: Input URL not found, set Input URL to Window URL: " + window.TMSEvent['page_url_window_url']);
 
                // set processing flag
                processingFlag = true;
            } else {
                window.TMSHelper.console("[TMSProcessing.getPageURLInput] -> warning: Window URL not found in TMSEvent");
 
                // do not set processing flag
                processingFlag = false;
            }
 
            if (!processingFlag) {
                window.TMSEvent['page_url_input_url'] = undefined;
                window.TMSEvent['page_url_input_differentFromWindow'] = undefined;
 
                window.TMSHelper.console("[TMSProcessing.getPageURLInput] -> info: Input and Window URL not found, Input URL remains undefined");
            } else {
                // set flag variable to easily identify Input URLs that differ from Window URLs
                if (typeof window.TMSEvent['page_url_input_url'] === "string" && window.TMSEvent['page_url_input_url'] !== "" && typeof window.TMSEvent['page_url_window_url'] === "string" && window.TMSEvent['page_url_window_url'] !== "") {
                    if (window.TMSEvent['page_url_input_url'] === window.TMSEvent['page_url_window_url']) {
                        window.TMSEvent['page_url_input_differentFromWindow'] = false;
                        window.TMSHelper.console("[TMSProcessing.getPageURLInput] -> info: Input and Window URL are equal");
                    } else {
                        window.TMSEvent['page_url_input_differentFromWindow'] = true;
                        window.TMSHelper.console("[TMSProcessing.getPageURLInput] -> info: Input and Window URL are different");
                    }
                } else {
                    window.TMSEvent['page_url_input_differentFromWindow'] = undefined;
                }
            }
  
        } else {
            window.TMSHelper.console("[TMSProcessing.getPageURLInput] warning -> TMSEvent is not defined");
        }
              
        window.TMSHelper.console("[TMSProcessing.getPageURLInput] complete");
    } catch (err) {
        window.TMSHelper.console("[TMSProcessing.getPageURLInput] error:");
        window.TMSHelper.errorHandler(err);
    };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1105 TMSProcessing.getCurrentPageName
// Issued by: Agnosticalyze
// version: 1.0, 2021-09-15
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
   
window.TMSProcessing = window.TMSProcessing || {}; // remove this line if function is included inside a collection wrapper
window.TMSProcessing.getCurrentPageName = function () { // remove this line for including function inside a collection wrapper
// function getCurrentPageName() { // uncomment this line for including function inside a collection wrapper
  try {
    if (!window.TMSEvent['page_pageInfo_pageName']) window.TMSEvent['page_pageInfo_pageName'] =  document.title;
  } catch (err) {
    window.TMSHelper.console("[TMSProcessing.getCurrentPageName] error:");
    window.TMSHelper.errorHandler(err);
    return '';
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1111 TMSProcessing.getCurrentTouchpoint
// Issued by: Agnosticalyze
// version: 1.11, 2022-03-04
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
   
// Get current touchpoint from URL query parameter on physical pageview
window.TMSProcessing = window.TMSProcessing || {}; // remove this line if function is included inside a collection wrapper
window.TMSProcessing.getCurrentTouchpoint = function () { // remove this line for including function inside a collection wrapper
// function getCurrentTouchpoint() { // uncomment this line for including function inside a collection wrapper
    try {
        window.TMSHelper.console("[TMSProcessing.getCurrentTouchpoint] start");
  
        var config = window.TMSConfig['tmsConfig_processing_touchpointDelimiters'];
        if (config == undefined) {
            config = {
                prefix: "::",
                component: ";;",
                value: '~'
            }
        }
        var pv_delim = config.prefix;
        var c_delim = config.component;
        var v_delim = config.value;
                 
        if (typeof window.TMSEvent === "object" && typeof window.TMSConfig === "object") {
            if (typeof window.TMSEvent['touchpoint_point_current_touchpointInfo_id'] !== "undefined" && window.TMSEvent['touchpoint_point_current_touchpointInfo_id'] !== "") {
                window.TMSHelper.console("[TMSProcessing.getCurrentTouchpoint] -> warning: current touchpoint is already defined, but it should not be");
            } else if (typeof window.TMSConfig['tmsConfig_processing_touchpointAttributes'] === "object" && typeof window.TMSConfig['tmsConfig_processing_touchpointParameters'] === "object" && typeof window.TMSConfig['tmsConfig_processing_touchpointDelimiters'] === "object") {
                loopAttributes: for (var i = 0; i < window.TMSConfig['tmsConfig_processing_touchpointAttributes'].length; i++) {
                    if (typeof window.TMSEvent[window.TMSConfig['tmsConfig_processing_touchpointAttributes'][i]] === "string" && window.TMSEvent[window.TMSConfig['tmsConfig_processing_touchpointAttributes'][i]] !== "") {
                        var currAttributeValue = window.TMSEvent[window.TMSConfig['tmsConfig_processing_touchpointAttributes'][i]];
                        // remove other attributes (and therefore their parameters) from current attribute to ensure hierarchy
                        // note: assumes other attributes might be in decoded or encoded variant
                        window.TMSHelper.console("[TMSProcessing.getCurrentTouchpoint] -> info: cleaning attribute " + window.TMSConfig['tmsConfig_processing_touchpointAttributes'][i] + " from nested attributes for touchpoint scanning");
                        loopCleanAttributes: for (var j = 0; j < window.TMSConfig['tmsConfig_processing_touchpointAttributes'].length; j++) {
                            var regex = new RegExp(window.TMSConfig['tmsConfig_processing_touchpointAttributes'][j], "gi");
                            if (regex.test(currAttributeValue)) {
                                window.TMSHelper.console("[TMSProcessing.getCurrentTouchpoint] -> info: attribute " + window.TMSConfig['tmsConfig_processing_touchpointAttributes'][j] + " found nested inside attribute " + window.TMSConfig['tmsConfig_processing_touchpointAttributes'][i] + " -> removing for touchpoint scanning");
                                if (window.TMSConfig['tmsConfig_processing_touchpointAttributes'][i] === window.TMSConfig['tmsConfig_processing_touchpointAttributes'][j]) {
                                    // attributes should not be self-contained. However, remove anyway with warning
                                    window.TMSHelper.console("[TMSProcessing.getCurrentTouchpoint] -> warning: nested identical attributes should not happen, please verify this is supposed to happen!");
                                }
                                var regexDecoded = new RegExp(window.TMSConfig['tmsConfig_processing_touchpointAttributes'][j] + "=", "gi")
                                if (regexDecoded.test(currAttributeValue)) {
                                    window.TMSHelper.console("[TMSProcessing.getCurrentTouchpoint] -> warning: attribute " + window.TMSConfig['tmsConfig_processing_touchpointAttributes'][j] + " is nested in decoded form -> removing everything behind its first occurence");
                                    var matchPos = currAttributeValue.indexOf(window.TMSConfig['tmsConfig_processing_touchpointAttributes'][j] + "=");
                                    currAttributeValue = currAttributeValue.substr(0, matchPos) + "placeholderAttribute=placeholderValue" + currAttributeValue.substr(matchPos + (window.TMSConfig['tmsConfig_processing_touchpointAttributes'][j] + "=").length)
                                } else {
                                    window.TMSHelper.console("[TMSProcessing.getCurrentTouchpoint] -> info: attribute " + window.TMSConfig['tmsConfig_processing_touchpointAttributes'][j] + " is nested in encoded form");
                                    var replaceValue = window.TMSHelper.getVarFromString(currAttributeValue, window.TMSConfig['tmsConfig_processing_touchpointAttributes'][j], "url");
                                    currAttributeValue = currAttributeValue.replace(window.TMSConfig['tmsConfig_processing_touchpointAttributes'][j] + "%3D" + replaceValue, "placeholderAttribute%3DplaceholderValue");
                                }
                            } else {
                                window.TMSHelper.console("[TMSProcessing.getCurrentTouchpoint] -> info: attribute " + window.TMSConfig['tmsConfig_processing_touchpointAttributes'][j] + " not found nested inside attribute " + window.TMSConfig['tmsConfig_processing_touchpointAttributes'][i]);
                            }
                        }
                               
                        // scan current attribute for relevant parameter value
                        window.TMSHelper.console("[TMSProcessing.getCurrentTouchpoint] -> info: cleaned attribute " + window.TMSConfig['tmsConfig_processing_touchpointAttributes'][i] + " to be scanned: " + currAttributeValue);
                        var otherParamValues = [];
                        loopParameters: for (var j = 0; j < window.TMSConfig['tmsConfig_processing_touchpointParameters'].length; j++) {
                            var parameter = window.TMSConfig['tmsConfig_processing_touchpointParameters'][j];
                            var currValue = window.TMSHelper.getVarFromString(currAttributeValue, parameter);
                            if (typeof currValue === "string" && currValue !== "") {
                                if (parameter === "sourceid") {
                                    window.TMSHelper.console("[TMSProcessing.getCurrentTouchpoint] -> info: parameter (sourceid) found in " + window.TMSConfig['tmsConfig_processing_touchpointAttributes'][i]);
                                    var startWithPrefix = new RegExp("^srcid" + pv_delim + ".*");
                                    if (!startWithPrefix.test(currValue)) {
                                        // expected prefix not found -> add prefix
                                        currValue = "srcid" + pv_delim + currValue;
                                    }
                                    // terminal case, stop scanning
                                    break loopParameters;
                                } else if (parameter === "WT.mc_id") {
                                    window.TMSHelper.console("[TMSProcessing.getCurrentTouchpoint] -> info: parameter (WT.mc_id) found in " + window.TMSConfig['tmsConfig_processing_touchpointAttributes'][i]);
                                    var startWithPrefix = new RegExp("^wtmcid" + pv_delim + ".*");
                                    if (!startWithPrefix.test(currValue)) {
                                        // expected prefix not found -> add prefix
                                        currValue = "wtmcid" + pv_delim + currValue;
                                    }
                                    // terminal case, stop scanning
                                    break loopParameters;
                                } else if (parameter === "gclid" || parameter.indexOf("utm_") === 0) {
                                    // any UTM Parameter found -> concatenate all 5
                                    window.TMSHelper.console("[TMSProcessing.getCurrentTouchpoint] -> info: parameter (UTM) found in " + window.TMSConfig['tmsConfig_processing_touchpointAttributes'][i]);
                                    var startWithPrefix = new RegExp("^utmid" + pv_delim + ".*");
                                    if (!startWithPrefix.test(currValue)) {
                                        // expected prefix not found in first parameter -> add prefix
                                        var concatValue = "utmid" + pv_delim;
                                    } else {
                                        var concatValue = "";
                                    }
  
                                    // get the list of valid utm params(including ga specific gclid) configured in tmsConfig_processing_touchpointParameters
                                    var utm_params = [];
                                    for (var p = 0; p < window.TMSConfig['tmsConfig_processing_touchpointParameters'].length; p++) {
                                      var pp = window.TMSConfig['tmsConfig_processing_touchpointParameters'][p];
                                      if (pp === "gclid" || pp.indexOf("utm_") === 0) utm_params.push(pp);
                                    }
                                    for (var k = 0; k < utm_params.length; k++) {
                                        utm_params[k] = utm_params[k] + v_delim + (window.TMSHelper.getVarFromString(currAttributeValue, window.TMSConfig['tmsConfig_processing_touchpointParameters'][k]) || "not-set");
                                    }
                                    utm_params = utm_params.sort();
                                    concatValue = utm_params.join(c_delim);
                                    currValue = "gglid" + pv_delim + concatValue;
                                      
                                    // terminal case, stop scanning
                                    break loopParameters;
                                } else {
                                    window.TMSHelper.console("[TMSProcessing.getCurrentTouchpoint] -> Falling back to default parameter logic");
                                    otherParamValues.push(parameter + "~" + currValue)
                                }
                                // Non-terminal case, we want to grab all parameters if no terminal cases hit
                            } // end if
                        } // end loopParameters
                        if (typeof currValue === "string" && currValue.trim() === "" && otherParamValues.length > 0) {
                            currValue = "other" + pv_delim + otherParamValues.join(c_delim);
                        }
                    } // end if
                    // was a parameter found in the current attribute?
                    if (typeof currValue === "string" && currValue !== "") {
                        // parameter found, stop scanning
                        break loopAttributes;
                    }
                } // end loopAttributes
                               
                if (typeof currValue === "string" && currValue !== "") {
                    window.TMSEvent['touchpoint_point_current_touchpointInfo_id'] = currValue;
                    window.TMSHelper.console("[TMSProcessing.getCurrentTouchpoint] -> info: current touchpoint set to: " + window.TMSEvent['touchpoint_point_current_touchpointInfo_id']);
                } else {
                    window.TMSHelper.console("[TMSProcessing.getCurrentTouchpoint] -> info: no parameter found in any checked attribute, current touchpoint remains undefined");
                }
            } else {
                window.TMSHelper.console("[TMSProcessing.getCurrentTouchpoint] -> warning: TMSConfig[tmsConfig_processing_touchpointAttributes] and/or TMSConfig[tmsConfig_processing_touchpointParameters] and/or TMSConfig[tmsConfig_processing_touchpointDelimiters] not defined");
            }
        } else {
            window.TMSHelper.console("[TMSProcessing.getCurrentTouchpoint] -> warning: TMSEvent and/or TMSConfig not defined");
        }
                       
        window.TMSHelper.console("[TMSProcessing.getCurrentTouchpoint] complete");
    } catch (err) {
        window.TMSHelper.console("[TMSProcessing.getCurrentTouchpoint] error:");
        window.TMSHelper.errorHandler(err);
    };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1112 TMSProcessing.touchpointHandler
// Issued by: Agnosticalyze
// version: 1.7.1, 2022-01-11
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// touchpointHandler: adds the current touchpoint to the stack of touchpoints
window.TMSProcessing = window.TMSProcessing || {}; // remove this line if function is included inside a collection wrapper
window.TMSProcessing.touchpointHandler = function () { // remove this line for including function inside a collection wrapper
    if (typeof window.TMSEvent !== "undefined" && typeof window.TMSEvent['touchpoint_point_current_touchpointInfo_id'] === "string") {
        var current = window.TMSEvent['touchpoint_point_current_touchpointInfo_id'];

        // read previous values unless all values have been provided already
        if (typeof window.TMSEvent['touchpoint_point_first_touchpointInfo_id'] === "string" && typeof window.TMSEvent['touchpoint_path_intermediate_touchpointInfo_id'] === "string" && typeof window.TMSEvent['touchpoint_path_full_touchpointInfo_id'] === "string" && typeof window.TMSEvent['touchpoint_point_latest_touchpointInfo_id'] === "string") {
            window.TMSHelper.console("[TMSProcessing.touchpointHandler] -> info: touchpoint stack already defined in TMSEvent");
        } else {
            // read values from storage
            var cookieValueOld = window.TMSHelper.readValue("TMSTouchpoints");
            var allTouchpointsArr       = [];
            if (typeof cookieValueOld == "string") {
                allTouchpointsArr = cookieValueOld.split("|");
            }
            
            // add current touchpoint as last one
            allTouchpointsArr.push(current);

            var allTouchpoints          = allTouchpointsArr.join("|");
            var firstTouchpoint         = allTouchpointsArr[0];
            var lastTouchpoint          = allTouchpointsArr[allTouchpointsArr.length - 1];
            var intermedaiteTouchpoints = allTouchpointsArr.slice(1, allTouchpointsArr.length - 1).join("|");
  
            window.TMSEvent['touchpoint_point_first_touchpointInfo_id'] = firstTouchpoint;
            window.TMSEvent['touchpoint_path_intermediate_touchpointInfo_id'] = intermedaiteTouchpoints;
            window.TMSEvent['touchpoint_path_full_touchpointInfo_id'] = allTouchpoints;
            window.TMSEvent['touchpoint_point_latest_touchpointInfo_id'] = lastTouchpoint;

            // save new touchpoint history in storage
            window.TMSHelper.storeValue("TMSTouchpoints", allTouchpoints, 28);
  
            window.TMSHelper.console("[TMSProcessing.touchpointHandler] -> info: touchpoint stack updated");
        }
    }
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1113 TMSProcessing.mapCurrentTouchpointValues
// Issued by: Agnosticalyze
// version: 2.2, 2022-06-21
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
window.TMSProcessing = window.TMSProcessing || {}; // remove this line if function is included inside a collection wrapper
window.TMSProcessing.mapCurrentTouchpointValues = function () {
    // remove this line for including function inside a collection wrapper
    // function mapCurrentTouchpointValues() { // uncomment this line for including function inside a collection wrapper
    try {
        window.TMSHelper.console(
            "[TMSProcessing.mapCurrentTouchpointValues] start"
        );
        var config = window.TMSConfig["tmsConfig_processing_touchpointDelimiters"];
        if (config == undefined) {
            config = {
                prefix: "::",
                component: ";;",
                value: "~",
            };
        }
        var pv_delim = config.prefix;
        var c_delim = config.component;
        var v_delim = config.value;
 
        if (
            typeof window.TMSEvent === "object" &&
            typeof window.TMSConfig === "object"
        ) {
            if (
                typeof window.TMSEvent["touchpoint_point_current_touchpointInfo_id"] ===
                    "string" &&
                window.TMSEvent["touchpoint_point_current_touchpointInfo_id"] !== "" &&
                typeof window.TMSConfig["tmsConfig_processing_touchpointDelimiters"] ===
                    "object" &&
                typeof window.TMSConfig["tmsConfig_processing_touchpointComponents"] ===
                    "object"
            ) {
                try {
                    // check if any considered prefix is present
                    var startWithPrefix = new RegExp(
                        "^((src|wtmc|utm|ggl)id|other)" + pv_delim + ".*"
                    );
                    if (
                        startWithPrefix.test(
                            window.TMSEvent["touchpoint_point_current_touchpointInfo_id"]
                        )
                    ) {
                        var startWithSrcid = new RegExp("^srcid" + pv_delim + ".*", "gi");
                        var startWithWtmcid = new RegExp("^wtmcid" + pv_delim + ".*", "gi");
 
                        if (
                            startWithSrcid.test(
                                window.TMSEvent["touchpoint_point_current_touchpointInfo_id"]
                            )
                        ) {
                            window.TMSHelper.console(
                                "[TMSProcessing.mapCurrentTouchpointValues] -> info: touchpoint prefix srcid found -> generic mapping"
                            );
                            // remove prefix from touchpoint
                            var touchpoint =
                                window.TMSEvent[
                                    "touchpoint_point_current_touchpointInfo_id"
                                ].split(pv_delim)[1];
                            if (touchpoint.includes(v_delim)) {
                                window.TMSHelper.console(
                                    "[TMSProcessing.mapCurrentTouchpointValues] -> info: touchpoint contains key-value-separators -> continue generic mapping"
                                );
                                // split touchpoint components
                                var touchpointComponentsString = touchpoint
                                    .split(c_delim)
                                    .filter(Boolean); // remove empty items
                                // convert touchpoint components into key-value-pairs
                                var touchpointComponentsFound = touchpointComponentsString
                                    .map(function (v) {
                                        return v.split(v_delim);
                                    })
                                    .reduce(function (acc, cur) {
                                        return (acc[cur[0]] = cur[1]), acc;
                                    }, {}); // cf. https://stackoverflow.com/questions/57688073/make-array-of-string-as-key-value-pair
 
                                // generic mapping per component
 
                                var touchpointComponents = {};
                                // var touchpointComponentsLeftovers = touchpointComponentsFound.slice();
 
                                loopComponentsConsidered: for (var i in window.TMSConfig[
                                    "tmsConfig_processing_touchpointComponents"
                                ]) {
                                    if (touchpointComponentsFound.hasOwnProperty(i)) {
                                        if (!touchpointComponents.hasOwnProperty(i)) {
                                            touchpointComponents[i] = touchpointComponentsFound[i];
                                        } // else: component was already added before -> would only happen if the same component appeared twice in TMSConfig.tmsConfig_processing_touchpointComponents
                                    } else {
                                        touchpointComponents[i] = "unspecified";
                                    }
                                }
 
                                loopComponentsFound: for (var i in touchpointComponentsFound) {
                                    if (!touchpointComponents.hasOwnProperty(i)) {
                                        touchpointComponents[i] = touchpointComponentsFound[i];
                                        // touchpointComponentsLeftovers[i] = undefined;
                                    } // else: component was already added before
                                }
 
                                // add the left over components as string to the end of the array of components
                                // touchpointComponents['other'] = touchpointComponentsLeftovers.filter(Boolean).join("_");
 
                                loopComponents: for (var i in touchpointComponents) {
                                    // map component to TMSEvent
                                    if (
                                        window.TMSEvent.hasOwnProperty(
                                            window.TMSConfig[
                                                "tmsConfig_processing_touchpointComponents"
                                            ][i]
                                        )
                                    ) {
                                        window.TMSHelper.console(
                                            "[TMSProcessing.mapCurrentTouchpointValues] -> warning: TMSEvent already contains a value for " +
                                                window.TMSConfig[
                                                    "tmsConfig_processing_touchpointComponents"
                                                ][i] +
                                                " -> not overwritten"
                                        );
                                    } else if (
                                        typeof window.TMSConfig[
                                            "tmsConfig_processing_touchpointComponents"
                                        ][i] !== "undefined"
                                    ) {
                                        window.TMSEvent[
                                            window.TMSConfig[
                                                "tmsConfig_processing_touchpointComponents"
                                            ][i]
                                        ] = touchpointComponents[i];
                                    }
                                    // add to TMSEvent.touchpoint_point_current_touchpointInfo_idProcessed
                                    if (
                                        typeof window.TMSEvent[
                                            "touchpoint_point_current_touchpointInfo_idProcessed"
                                        ] === "undefined"
                                    ) {
                                        window.TMSEvent[
                                            "touchpoint_point_current_touchpointInfo_idProcessed"
                                        ] =
                                            "srcid" +
                                            pv_delim +
                                            i +
                                            v_delim +
                                            touchpointComponents[i];
                                    } else {
                                        window.TMSEvent[
                                            "touchpoint_point_current_touchpointInfo_idProcessed"
                                        ] =
                                            TMSEvent[
                                                "touchpoint_point_current_touchpointInfo_idProcessed"
                                            ] +
                                            c_delim +
                                            i +
                                            v_delim +
                                            touchpointComponents[i];
                                    }
                                }
                            } else {
                                window.TMSHelper.console(
                                    "[TMSProcessing.mapCurrentTouchpointValues] -> warning: touchpoint does not contain key-value-separators -> no mapping"
                                );
                                window.TMSEvent[
                                    "touchpoint_point_current_touchpointInfo_idProcessed"
                                ] =
                                    window.TMSEvent["touchpoint_point_current_touchpointInfo_id"];
                                window.TMSEvent["touchpoint_point_current_error"] =
                                    "generic mapping - missing key-value-separators";
                            }
                        } else if (
                            startWithWtmcid.test(
                                window.TMSEvent["touchpoint_point_current_touchpointInfo_id"]
                            )
                        ) {
                            window.TMSHelper.console(
                                "[TMSProcessing.mapCurrentTouchpointValues] -> info: touchpoint prefix wtmcid found -> legacy mapping"
                            );
                            // remove prefix from touchpoint
                            var touchpoint =
                                window.TMSEvent[
                                    "touchpoint_point_current_touchpointInfo_id"
                                ].split(pv_delim)[1];
                            // split touchpoint components
                            var touchpointComponentsFound = touchpoint
                                .split("_") // in legacy touchpoints, underscores were fixed separators
                                .filter(Boolean); // remove empty items
                            if (touchpointComponentsFound.length > 5) {
                                var onlyNumbers = new RegExp("^[0-9]*$", "gi");
                                var allowedChannels = new RegExp(
                                    "aff|com|dsp|eml|mob|murl|ons|qrc|sem|soc|n-a",
                                    "gi"
                                );
                                if (
                                    typeof touchpointComponentsFound[0] === "string" &&
                                    touchpointComponentsFound[0] === "z" &&
                                    !isNaN(+touchpointComponentsFound[4]) &&
                                    !isNaN(+touchpointComponentsFound[5])
                                ) {
                                    window.TMSHelper.console(
                                        "[TMSProcessing.mapCurrentTouchpointValues] -> info: UM standard detected"
                                    );
 
                                    var touchpointComponents = {};
                                    var touchpointComponentsLeftovers =
                                        touchpointComponentsFound.slice();
 
                                    loopComponentsConsidered: for (var i in window.TMSConfig[
                                        "tmsConfig_processing_touchpointComponents"
                                    ]) {
                                        if (
                                            window.TMSConfig[
                                                "tmsConfig_processing_touchpointComponents"
                                            ][i] ===
                                            "touchpoint_point_current_touchpointInfo_requester"
                                        ) {
                                            touchpointComponents[i] = touchpointComponentsFound[2];
                                            touchpointComponentsLeftovers[2] = undefined;
                                        } else if (
                                            window.TMSConfig[
                                                "tmsConfig_processing_touchpointComponents"
                                            ][i] ===
                                            "touchpoint_point_current_marketingActivity_channelName"
                                        ) {
                                            touchpointComponents[i] = touchpointComponentsFound[3];
                                            touchpointComponentsLeftovers[3] = undefined;
                                        } else if (
                                            window.TMSConfig[
                                                "tmsConfig_processing_touchpointComponents"
                                            ][i] ===
                                            "touchpoint_point_current_marketingActivity_primaryTitle"
                                        ) {
                                            touchpointComponents[i] = touchpointComponentsFound[1];
                                            touchpointComponentsLeftovers[1] = undefined;
                                        } else {
                                            touchpointComponents[i] = "unspecified";
                                        }
                                    }
 
                                    // add the left over components as string to the end of the array of components
                                    touchpointComponents["other"] = touchpointComponentsLeftovers
                                        .filter(Boolean)
                                        .join("_");
 
                                    loopComponents: for (var i in touchpointComponents) {
                                        // map component to TMSEvent
                                        if (
                                            window.TMSEvent.hasOwnProperty(
                                                window.TMSConfig[
                                                    "tmsConfig_processing_touchpointComponents"
                                                ][i]
                                            )
                                        ) {
                                            window.TMSHelper.console(
                                                "[TMSProcessing.mapCurrentTouchpointValues] -> warning: TMSEvent already contains a value for " +
                                                    window.TMSConfig[
                                                        "tmsConfig_processing_touchpointComponents"
                                                    ][i] +
                                                    " -> not overwritten"
                                            );
                                        } else if (
                                            typeof window.TMSConfig[
                                                "tmsConfig_processing_touchpointComponents"
                                            ][i] !== "undefined"
                                        ) {
                                            window.TMSEvent[
                                                window.TMSConfig[
                                                    "tmsConfig_processing_touchpointComponents"
                                                ][i]
                                            ] = touchpointComponents[i];
                                        }
                                        // add to TMSEvent.touchpoint_point_current_touchpointInfo_idProcessed
                                        if (
                                            typeof window.TMSEvent[
                                                "touchpoint_point_current_touchpointInfo_idProcessed"
                                            ] === "undefined"
                                        ) {
                                            window.TMSEvent[
                                                "touchpoint_point_current_touchpointInfo_idProcessed"
                                            ] =
                                                "wtmcid" +
                                                pv_delim +
                                                i +
                                                v_delim +
                                                touchpointComponents[i];
                                        } else {
                                            window.TMSEvent[
                                                "touchpoint_point_current_touchpointInfo_idProcessed"
                                            ] =
                                                TMSEvent[
                                                    "touchpoint_point_current_touchpointInfo_idProcessed"
                                                ] +
                                                c_delim +
                                                i +
                                                v_delim +
                                                touchpointComponents[i];
                                        }
                                    }
                                } else if (
                                    typeof touchpointComponentsFound[0] === "string" &&
                                    touchpointComponentsFound[0] === "z" &&
                                    allowedChannels.test(touchpointComponentsFound[3]) &&
                                    touchpointComponentsFound.length >= 9 &&
                                    touchpointComponentsFound.length <= 10
                                ) {
                                    window.TMSHelper.console(
                                        "[TMSProcessing.mapCurrentTouchpointValues] -> info: 2018 standard detected"
                                    );
 
                                    var touchpointComponents = {};
                                    var touchpointComponentsLeftovers =
                                        touchpointComponentsFound.slice();
                                    loopComponentsConsidered: for (var i in window.TMSConfig[
                                        "tmsConfig_processing_touchpointComponents"
                                    ]) {
                                        if (
                                            window.TMSConfig[
                                                "tmsConfig_processing_touchpointComponents"
                                            ][i] ===
                                            "touchpoint_point_current_touchpointInfo_requester"
                                        ) {
                                            touchpointComponents[i] = touchpointComponentsFound[1];
                                            touchpointComponentsLeftovers[1] = undefined;
                                        } else if (
                                            window.TMSConfig[
                                                "tmsConfig_processing_touchpointComponents"
                                            ][i] ===
                                            "touchpoint_point_current_marketingActivity_targetAudience"
                                        ) {
                                            touchpointComponents[i] = touchpointComponentsFound[2];
                                            touchpointComponentsLeftovers[2] = undefined;
                                        } else if (
                                            window.TMSConfig[
                                                "tmsConfig_processing_touchpointComponents"
                                            ][i] ===
                                            "touchpoint_point_current_marketingActivity_channelName"
                                        ) {
                                            touchpointComponents[i] = touchpointComponentsFound[3];
                                            touchpointComponentsLeftovers[3] = undefined;
                                        } else if (
                                            window.TMSConfig[
                                                "tmsConfig_processing_touchpointComponents"
                                            ][i] === "touchpoint_point_current_referrer_partner"
                                        ) {
                                            touchpointComponents[i] = touchpointComponentsFound[4];
                                            touchpointComponentsLeftovers[4] = undefined;
                                        } else if (
                                            window.TMSConfig[
                                                "tmsConfig_processing_touchpointComponents"
                                            ][i] ===
                                            "touchpoint_point_current_marketingActivity_pricingModel"
                                        ) {
                                            touchpointComponents[i] = touchpointComponentsFound[5];
                                            touchpointComponentsLeftovers[5] = undefined;
                                        } else if (
                                            window.TMSConfig[
                                                "tmsConfig_processing_touchpointComponents"
                                            ][i] ===
                                            "touchpoint_point_current_marketingActivity_primaryTitle"
                                        ) {
                                            touchpointComponents[i] = touchpointComponentsFound[6];
                                            touchpointComponentsLeftovers[6] = undefined;
                                        } else if (
                                            window.TMSConfig[
                                                "tmsConfig_processing_touchpointComponents"
                                            ][i] ===
                                            "touchpoint_point_current_touchpointInfo_language"
                                        ) {
                                            touchpointComponents[i] = touchpointComponentsFound[8];
                                            touchpointComponentsLeftovers[8] = undefined;
                                        } else {
                                            touchpointComponents[i] = "unspecified";
                                        }
                                    }
 
                                    // add the left over components as string to the end of the array of components
                                    touchpointComponents["other"] = touchpointComponentsLeftovers
                                        .filter(Boolean)
                                        .join("_");
 
                                    loopComponents: for (var i in touchpointComponents) {
                                        // map component to TMSEvent
                                        if (
                                            window.TMSEvent.hasOwnProperty(
                                                window.TMSConfig[
                                                    "tmsConfig_processing_touchpointComponents"
                                                ][i]
                                            )
                                        ) {
                                            window.TMSHelper.console(
                                                "[TMSProcessing.mapCurrentTouchpointValues] -> warning: TMSEvent already contains a value for " +
                                                    window.TMSConfig[
                                                        "tmsConfig_processing_touchpointComponents"
                                                    ][i] +
                                                    " -> not overwritten"
                                            );
                                        } else if (
                                            typeof window.TMSConfig[
                                                "tmsConfig_processing_touchpointComponents"
                                            ][i] !== "undefined"
                                        ) {
                                            window.TMSEvent[
                                                window.TMSConfig[
                                                    "tmsConfig_processing_touchpointComponents"
                                                ][i]
                                            ] = touchpointComponents[i];
                                        }
                                        // add to TMSEvent.touchpoint_point_current_touchpointInfo_idProcessed
                                        if (
                                            typeof window.TMSEvent[
                                                "touchpoint_point_current_touchpointInfo_idProcessed"
                                            ] === "undefined"
                                        ) {
                                            window.TMSEvent[
                                                "touchpoint_point_current_touchpointInfo_idProcessed"
                                            ] =
                                                "wtmcid" +
                                                pv_delim +
                                                i +
                                                v_delim +
                                                touchpointComponents[i];
                                        } else {
                                            window.TMSEvent[
                                                "touchpoint_point_current_touchpointInfo_idProcessed"
                                            ] =
                                                TMSEvent[
                                                    "touchpoint_point_current_touchpointInfo_idProcessed"
                                                ] +
                                                c_delim +
                                                i +
                                                v_delim +
                                                touchpointComponents[i];
                                        }
                                    }
                                } else {
                                    window.TMSHelper.console(
                                        "[TMSProcessing.mapCurrentTouchpointValues] -> info: no legacy case detected -> no mapping"
                                    );
                                    window.TMSEvent[
                                        "touchpoint_point_current_touchpointInfo_idProcessed"
                                    ] =
                                        window.TMSEvent[
                                            "touchpoint_point_current_touchpointInfo_id"
                                        ];
                                }
                            } else {
                                window.TMSHelper.console(
                                    "[TMSProcessing.mapCurrentTouchpointValues] -> warning: too few touchpoint components found -> no mapping"
                                );
                                window.TMSEvent[
                                    "touchpoint_point_current_touchpointInfo_idProcessed"
                                ] =
                                    window.TMSEvent["touchpoint_point_current_touchpointInfo_id"];
                                window.TMSEvent["touchpoint_point_current_error"] =
                                    "legacy mapping - number of components";
                            }
                        } else {
                            window.TMSHelper.console(
                                "[TMSProcessing.mapCurrentTouchpointValues] -> info: neither srcid nor wtmcid prefix found -> no mapping"
                            );
                            window.TMSEvent[
                                "touchpoint_point_current_touchpointInfo_idProcessed"
                            ] = window.TMSEvent["touchpoint_point_current_touchpointInfo_id"];
                        }
                    } else {
                        window.TMSHelper.console(
                            "[TMSProcessing.mapCurrentTouchpointValues] -> warning: no valid touchpoint prefix found -> no mapping"
                        );
                        window.TMSEvent[
                            "touchpoint_point_current_touchpointInfo_idProcessed"
                        ] = window.TMSEvent["touchpoint_point_current_touchpointInfo_id"];
                        window.TMSEvent["touchpoint_point_current_error"] =
                            "missing touchpoint prefix";
                    }
                } catch (error) {
                    window.TMSEvent["touchpoint_point_current_error"] = error;
                }
            } else {
                window.TMSHelper.console(
                    "[TMSProcessing.mapCurrentTouchpointValues] -> info: no current touchpoint found or missing configuration"
                );
            }
        } else {
            window.TMSHelper.console(
                "[TMSProcessing.mapCurrentTouchpointValues] -> warning: TMSEvent or TMSConfig not defined"
            );
        }
 
        window.TMSHelper.console(
            "[TMSProcessing.mapCurrentTouchpointValues] complete"
        );
    } catch (error) {
        TMSHelper.console("[TMSProcessing.mapCurrentTouchpointValues] error:");
        TMSHelper.errorHandler(error);
    }
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1121 TMSProcessing.getPlatformEnvironment
// Issued by: Agnosticalyze
// version: 1.2, 2021-02-15
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// Sets the TMSEvent variable identifying the platform environment for later use in other functions.
window.TMSProcessing = window.TMSProcessing || {}; // remove this line if function is included inside a collection wrapper
window.TMSProcessing.getPlatformEnvironment = function () { // remove this line for including function inside a collection wrapper
// function getPlatformEnvironment() { // uncomment this line for including function inside a collection wrapper   
    try {
        window.TMSHelper.console("[TMSProcessing.getPlatformEnvironment] start");
      
        if (typeof window.TMSEvent === "object" && typeof window.TMSConfig === "object") {
            if (typeof window.TMSEvent['platform_platformInfo_environment'] === "undefined" || window.TMSEvent['platform_platformInfo_environment'] === null || window.TMSEvent['platform_platformInfo_environment'] === "") {
                // environment was not identified before
                if (typeof window.TMSConfig['tmsConfig_prodDomains'] === "object" && Object.keys(window.TMSConfig['tmsConfig_prodDomains']).length > 0) {
                    // check against predefined prod domains
                    if (typeof window.TMSEvent['page_url_canonical_hostname'] === "string" && window.TMSEvent['page_url_canonical_hostname'] !== "") {
                        if (window.TMSConfig['tmsConfig_prodDomains'].includes(window.TMSEvent['page_url_canonical_hostname'])) {
                            window.TMSEvent['platform_platformInfo_environment'] = "prod";
                            window.TMSHelper.console("[TMSProcessing.getPlatformEnvironment] -> info: based on Canonical Hostname in TMSEvent, TMSEvent[platform_platformInfo_environment] set to: " + window.TMSEvent['platform_platformInfo_environment']);
                        } else {
                            window.TMSEvent['platform_platformInfo_environment'] = "dev";
                            window.TMSHelper.console("[TMSProcessing.getPlatformEnvironment] -> info: based on Canonical Hostname in TMSEvent, TMSEvent[platform_platformInfo_environment] set to: " + window.TMSEvent['platform_platformInfo_environment']);
                        }
                    } else if (typeof window.TMSEvent['page_url_window_hostname'] === "string" && window.TMSEvent['page_url_window_hostname'] !== "") {
                        if (window.TMSConfig['tmsConfig_prodDomains'].includes(window.TMSEvent['page_url_window_hostname'])) {
                            window.TMSEvent['platform_platformInfo_environment'] = "prod";
                            window.TMSHelper.console("[TMSProcessing.getPlatformEnvironment] -> info: based on Window Hostname in TMSEvent, TMSEvent[platform_platformInfo_environment] set to: " + window.TMSEvent['platform_platformInfo_environment']);
                        } else {
                            window.TMSEvent['platform_platformInfo_environment'] = "dev";
                            window.TMSHelper.console("[TMSProcessing.getPlatformEnvironment] -> info: based on Window Hostname in TMSEvent, TMSEvent[platform_platformInfo_environment] set to: " + window.TMSEvent['platform_platformInfo_environment']);
                        }
                    } else {
                        if (window.TMSConfig['tmsConfig_prodDomains'].includes(window.location.hostname)) {
                            window.TMSEvent['platform_platformInfo_environment'] = "prod";
                            window.TMSHelper.console("[TMSProcessing.getPlatformEnvironment] -> info: based on window.location.hostname, TMSEvent[platform_platformInfo_environment] set to: " + window.TMSEvent['platform_platformInfo_environment']);
                        } else {
                            window.TMSEvent['platform_platformInfo_environment'] = "dev";
                            window.TMSHelper.console("[TMSProcessing.getPlatformEnvironment] -> info: based on window.location.hostname, TMSEvent[platform_platformInfo_environment] set to: " + window.TMSEvent['platform_platformInfo_environment']);
                        }
                    }
                } else {
                    // default: set to dev
                    window.TMSEvent['platform_platformInfo_environment'] = "dev";
                    window.TMSHelper.console("[TMSProcessing.getPlatformEnvironment] -> info: by default, TMSEvent[platform_platformInfo_environment] set to: " + window.TMSEvent['platform_platformInfo_environment']);
                }
            } else {
                // environment was identified or defined (by DEV) before
                window.TMSHelper.console("[TMSProcessing.getPlatformEnvironment] -> warning: Did not overwrite pre-existing TMSEvent[platform_platformInfo_environment]: " + window.TMSEvent['platform_platformInfo_environment']);
            }
        } else {
            window.TMSHelper.console("[TMSProcessing.getPlatformEnvironment] -> warning: TMSEvent and/or TMSConfig not defined");
        }
      
        window.TMSHelper.console("[TMSProcessing.getPlatformEnvironment] complete");
    } catch (err) {
        window.TMSHelper.console("[TMSProcessing.getPlatformEnvironment] error:");
        window.TMSHelper.errorHandler(err);
  
    }
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1122 TMSProcessing.getEmbedInfo
// Issued by: Agnosticalyze
// version: 1.0, 2021-03-13
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
window.TMSProcessing = window.TMSProcessing || {}; // remove this line if function is included inside a collection wrapper
window.TMSProcessing.getEmbedInfo = function () { // remove this line for including function inside a collection wrapper
// function getEmbedInfo() {  // uncomment this line for including function inside a collection wrapper
    try {
        window.TMSHelper.console("[TMSProcessing.getEmbedInfo] start");
              
        if (typeof TMSEvent === "object") {
            if (window.top !== window) {
                window.TMSHelper.console("[TMSProcessing.getEmbedInfo] -> info: the current page is embedded");
                TMSEvent['embed_embedInfo_embedType'] = "iframe";
            } else {
                window.TMSHelper.console("[TMSProcessing.getEmbedInfo] -> info: the current page is not embedded");
            }
        } else {
            window.TMSHelper.console("[TMSProcessing.getEmbedInfo] -> info: TMSEvent not defined");
        }
         
      
        window.TMSHelper.console("[TMSProcessing.getEmbedInfo] complete");
    } catch (err) {
        window.TMSHelper.console("[TMSProcessing.getEmbedInfo] error:");
        window.TMSHelper.errorHandler(err);
    }
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1131 TMSProcessing.getStandardElementAttributes
// Issued by: Agnosticalyze
// version: 1.3.2, 2022-06-02
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
window.TMSProcessing = window.TMSProcessing || {}; // remove this line if function is included inside a collection wrapper
window.TMSProcessing.getStandardElementAttributes = function (thisElement) { // remove this line for including function inside a collection wrapper
// function getStandardElementAttributes(thisElement) {  // uncomment this line for including function inside a collection wrapper
    try {
        window.TMSHelper.console("[TMSProcessing.getStandardElementAttributes] start");
  
        var output = {};
          
        if (typeof thisElement === "object") {
              
            // target URL
            if (typeof window.TMSHelper.getURLFromHtmlElement === "function") {
                tgtUrl = window.TMSHelper.getURLFromHtmlElement("target", thisElement);
                output['event_element_tgtUrl_url'] = tgtUrl;
                window.TMSHelper.console("[TMSProcessing.getStandardElementAttributes] -> info: event_element_tgtUrl_url set: " + output['event_element_tgtUrl_url']);
            } else {
                window.TMSHelper.console("[TMSProcessing.getStandardElementAttributes] -> warning: TMSHelper.getURLFromHtmlElement not defined");
            }
         
            // className
            if (typeof thisElement.className !== "undefined" && thisElement.className.trim() !== "") {
                output['event_element_elementClassName'] = thisElement.className.trim();
                window.TMSHelper.console("[TMSProcessing.getStandardElementAttributes] -> info: event_element_elementClassName set: " + output['event_element_elementClassName']);
            } else {
                window.TMSHelper.console("[TMSProcessing.getStandardElementAttributes] -> info: no className found");
            }
  
            // id
            if (typeof thisElement.id !== "undefined" && thisElement.id.trim() !== "") {
                output['event_element_elementID'] = thisElement.id.trim();
                window.TMSHelper.console("[TMSProcessing.getStandardElementAttributes] -> info: event_element_elementID set: " + output['event_element_elementID']);
            } else {
                window.TMSHelper.console("[TMSProcessing.getStandardElementAttributes] -> info: no ID found");
            }
         
            // innerText
            if (typeof thisElement.innerText !== "undefined" && thisElement.innerText.trim() !== "") {
                output['event_element_elementInnerText'] = thisElement.innerText.trim();
                window.TMSHelper.console("[TMSProcessing.getStandardElementAttributes] -> info: event_element_elementInnerText set: " + output['event_element_elementInnerText']);
            } else {
                window.TMSHelper.console("[TMSProcessing.getStandardElementAttributes] -> info: no innerText found");
            }
         
            // name
            if (typeof thisElement.name !== "undefined" && thisElement.name.trim() !== "") {
                output['event_element_elementName'] = thisElement.name.trim();
                window.TMSHelper.console("[TMSProcessing.getStandardElementAttributes] -> info: event_element_elementName set: " + output['event_element_elementName']);
            } else {
                window.TMSHelper.console("[TMSProcessing.getStandardElementAttributes] -> info: no name found");
            }
  
            // tagName
            if (typeof thisElement.tagName !== "undefined" && thisElement.tagName.trim() !== "") {
                output['event_element_elementTagName'] = thisElement.tagName.trim();
                window.TMSHelper.console("[TMSProcessing.getStandardElementAttributes] -> info: event_element_elementTagName set: " + output['event_element_elementTagName']);
            } else {
                window.TMSHelper.console("[TMSProcessing.getStandardElementAttributes] -> info: no tagName found");
            }
  
            // title
            if (typeof thisElement.title !== "undefined" && thisElement.title.trim() !== "") {
                output['event_element_elementTitle'] = thisElement.title.trim();
                window.TMSHelper.console("[TMSProcessing.getStandardElementAttributes] -> info: event_element_elementTitle set: " + output['event_element_elementTitle']);
            } else {
                window.TMSHelper.console("[TMSProcessing.getStandardElementAttributes] -> info: no title found");
            }
         
            // value
            if (typeof thisElement.value !== "undefined" && thisElement.value.trim() !== "") {
                output['event_element_elementValue'] = thisElement.value.trim();
                window.TMSHelper.console("[TMSProcessing.getStandardElementAttributes] -> info: event_element_elementValue set: " + output['event_element_elementValue']);
            } else {
                window.TMSHelper.console("[TMSProcessing.getStandardElementAttributes] -> info: no value found");
            }
  
        } else {
            window.TMSHelper.console("[TMSProcessing.getStandardElementAttributes] -> warning: No valid interacted element 'this' passed to this function");          
        }
  
        window.TMSHelper.console("[TMSProcessing.getStandardElementAttributes] complete");
        return output;
    } catch (err) {
        window.TMSHelper.console("[TMSProcessing.getStandardElementAttributes] error:");
        window.TMSHelper.errorHandler(err);
        return {};
    }
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1132 TMSProcessing.getMarkupElementContent
// Issued by: Agnosticalyze
// version: 1.3, 2021-05-21
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
window.TMSProcessing = window.TMSProcessing || {}; // remove this line if function is included inside a collection wrapper
window.TMSProcessing.getMarkupElementContent = function (thisElement) { // remove this line for including function inside a collection wrapper
// function getMarkupElementContent(thisElement) {  // uncomment this line for including function inside a collection wrapper
    try {
        window.TMSHelper.console("[TMSProcessing.getMarkupElementContent] start");
                
        var output = {};
        
        if (typeof thisElement === "object") {
            if (thisElement.hasAttribute("data-track-prevent")) {
                output['event_element_elementContentTrackPreventFound'] = true;
            } else if (thisElement.hasAttribute("data-track-elementcontent")) {
                try {
                    output = JSON.parse(thisElement.getAttribute("data-track-elementcontent"));
                    output['event_element_elementContentFound'] = true;
                } catch (e) {
                    if (e.message.indexOf('Unexpected token &') !== -1) {
                        window.TMSHelper.console("[TMSProcessing.getMarkupElementContent] Possible double encoding found, trying to handle that");
                        try {
                            output = JSON.parse(thisElement.getAttribute("data-track-elementcontent").replace(new RegExp('&' + 'quot;', 'g'), '"'));
                            output['event_element_elementContentFound'] = true;
                            window.TMSHelper.console("[TMSProcessing.getMarkupElementContent] Double encoding resolved, continuing");
                        } catch (err) {
                            window.TMSHelper.console("[TMSProcessing.getMarkupElementContent] Couldn't parse data-track-elementcontent as JSON with possible double encoding");
                            window.TMSHelper.errorHandler(e);
                        }
                    } else {
                        window.TMSHelper.console("[TMSProcessing.getMarkupElementContent] Couldn't parse data-track-elementcontent as JSON");
                        window.TMSHelper.errorHandler(e);
                    }
                }
            } else {
                window.TMSHelper.console("[TMSProcessing.getMarkupElementContent] -> info: No data-track-elementcontent or data-track-prevent attribute found on element");
            }
               
        } else {
            window.TMSHelper.console("[TMSProcessing.getMarkupElementContent] -> warning: No valid interacted element 'this' passed to this function");
        }
    
        window.TMSHelper.console("[TMSProcessing.getMarkupElementContent] complete");
        return output;
    } catch (err) {
        window.TMSHelper.console("[TMSProcessing.getMarkupElementContent] error:");
        window.TMSHelper.errorHandler(err);
        return {};
    }
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1133 TMSProcessing.getMarkupLevelContent
// Issued by: Agnosticalyze
// version: 1.3, 2022-07-25
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
window.TMSProcessing = window.TMSProcessing || {}; // remove this line if function is included inside a collection wrapper
window.TMSProcessing.getMarkupLevelContent = function (thisElement) { // remove this line for including function inside a collection wrapper
// function getMarkupLevelContent(thisElement) {  // uncomment this line for including function inside a collection wrapper
    try {
        window.TMSHelper.console("[TMSProcessing.getMarkupLevelContent] start");
              
        var output = {};
      
        if (typeof thisElement === "object") {
  
            // determine, whether content hierarchy should be collected at all
            // => either there is levelContent on the page or the collection is explicitly enforced by TMSConfig
            if ((document.querySelectorAll('[data-track-levelcontent]').length > 0) || (typeof window.TMSConfig === "object" && window.TMSConfig['tmsConfig_event_collectContentHierarchy'])) {
                // determined: content hierarchy shall be collected
                  
                if (document.querySelectorAll('[data-track-levelcontent]').length > 0) {
                    // determined: there are data-track-levelcontent elements anywhere on the page
  
                    // ------------------------------------------------------------------------ //
                    // TBA:                                                                     //
                    //                                                                          //
                    // if data-track-levelnumber (in addition to levelcontent) elements are     //
                    //   anywhere on the page, use them...                                      //
                    // else, only use data-track-levelcontent without levelnumbers              //
                    // ------------------------------------------------------------------------ //
  
                    // get all parents of thisElement
                    var parentNodes = window.TMSHelper.getParentHtmlElementsOfHtmlElement(thisElement);
                                  
                    // check each node for level content
                    // => walk through nodes backwards: from top level (e.g. the <body>) to the last parent of the clicked element
                    loopNodes: for (var i = parentNodes.length - 1; i >= 0; i--) {
                        if (parentNodes[i].nodeName !== '#document-fragment') { // exclude document-fragments from loop
                        	if (parentNodes[i].hasAttribute("data-track-prevent")) {
	                            output['event_element_levelContentTrackPreventFound'] = true;
	                            break loopNodes; // if prevent flag was found, further collection is pointless anyway
	                        } else if (parentNodes[i].hasAttribute("data-track-levelcontent")) {
	                            // get level content
	                            var currentNodeContentInitial = {};
	                            try {
	                                currentNodeContentInitial = JSON.parse(parentNodes[i].getAttribute("data-track-levelcontent"));
	                            } catch (e) {
	                                if (e.message.indexOf('Unexpected token &') !== -1) {
	                                    window.TMSHelper.console("[TMSProcessing.getMarkupLevelContent] Possible double encoding found, trying to handle that");
	                                    try {
	                                        currentNodeContentInitial = JSON.parse(parentNodes[i].getAttribute("data-track-levelcontent").replace(new RegExp('&' + 'quot;', 'g'), '"'));
	                                        window.TMSHelper.console("[TMSProcessing.getMarkupLevelContent] Double encoding resolved, continuing");
	                                    } catch (err) {
	                                        window.TMSHelper.console("[TMSProcessing.getMarkupLevelContent] Couldn't parse data-track-levelcontent as JSON with possible double encoding");
	                                        window.TMSHelper.errorHandler(e);
	                                    }
	                                } else {
	                                    window.TMSHelper.console("[TMSProcessing.getMarkupLevelContent] Couldn't parse data-track-levelcontent as JSON");
	                                    window.TMSHelper.errorHandler(e);
	                                }
	                            }
	              
	                            var currentNodeContentArray = Object.keys(currentNodeContentInitial)
	              
	                            loopParameters: for (var j = 0; j < currentNodeContentArray.length; j++) {
	                                var paramName = currentNodeContentArray[j]
	                                var paramValue = currentNodeContentInitial[paramName];
	  
	                                if (paramName !== "" && paramValue !== "") {
	                                      
	                                    if (paramName === "element_elementInfo_elementName") {
	                                        // concat event_element_parentLevelNames
	                                        if (typeof output['event_element_parentLevelNames'] === "string" && output['event_element_parentLevelNames'] !== "") {
	                                            // append current level name
	                                            output['event_element_parentLevelNames'] = output['event_element_parentLevelNames'] + "::" + paramValue;
	                                        } else {
	                                            output['event_element_parentLevelNames'] = paramValue;
	                                        }
	                                    } // end if
	                  
	                                    // (over-)write current parameter into output -> no concatenation of all other values, lowest value wins
	                                    output[paramName] = paramValue;
	                                } // end if
	                            } // end loopParameters
	 
	                            output['event_element_levelContentFound'] = true;
	                        } //end if: hasAttribute
                        } // end if: nodeName                        
                    } // end loopNodes
  
                    // clear the output if necessary
                    if (output['event_element_levelContentTrackPreventFound']) {
                        output = {};
                        output['event_element_levelContentTrackPreventFound'] = true;
                    }                   
                } else {
                    // no levelcontent on page, use element IDs instead
        
                    // get all parents of thisElement
                    var parentNodes = window.TMSHelper.getParentHtmlElementsOfHtmlElement(thisElement);
                     
                    // check each node for its id
                    loopNodes: for (var i = parentNodes.length - 1; i >= 0; i--) {
                        if (parentNodes[i].nodeName !== '#document-fragment') { // exclude document-fragments from loop
                        	if (parentNodes[i].hasAttribute("data-track-prevent")) {
	                            output['event_element_levelContentTrackPreventFound'] = true;
	                            break loopNodes; // if prevent flag was found, further collection is pointless anyway
	                        } else if (parentNodes[i].hasAttribute("id")) {
	                            // get level content
	                            var currentNodeId = parentNodes[i].getAttribute("id");
	                                
	                            if (currentNodeId !== "") {
	                                // concat event_element_parentLevelNames
	                                if (typeof output['event_element_parentLevelNames'] === "string" && output['event_element_parentLevelNames'] !== "") {
	                                    // append current level name
	                                    output['event_element_parentLevelNames'] = output['event_element_parentLevelNames'] + "::" + currentNodeId;
	                                } else {
	                                    output['event_element_parentLevelNames'] = currentNodeId;
	                                }
	                            } // end if
	                        } //end if: hasAttribute
	                    } // end if: document-fragment
                    } // end loopNodes
 
                    // clear the output if necessary
                    if (output['event_element_levelContentTrackPreventFound']) {
                        output = {};
                        output['event_element_levelContentTrackPreventFound'] = true;
                    }
                } // end if
            } else {
                 window.TMSHelper.console("[TMSProcessing.getMarkupLevelContent] -> info: No data-track-levelcontent found on page or collection not explicitly activated by TMSConfig[tmsConfig_event_collectContentHierarchy]");
            } // end if
  
        } else {
            window.TMSHelper.console("[TMSProcessing.getMarkupLevelContent] -> warning: No valid interacted element 'this' passed to this function");
        }
      
        window.TMSHelper.console("[TMSProcessing.getMarkupLevelContent] complete");
        return output;
    } catch (err) {
        window.TMSHelper.console("[TMSProcessing.getMarkupLevelContent] error:");
        window.TMSHelper.errorHandler(err);
        return {};
    }
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1139 TMSProcessing.runEventCollectionOrchestrator
// Issued by: Agnosticalyze
// version: 1.5, 2021-07-30
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
   
// Run Event Collection Orchestrator
window.TMSProcessing = window.TMSProcessing || {}; // remove this line if function is included inside a collection wrapper
window.TMSProcessing.runEventCollectionOrchestrator = function (thisElement, initEventData) { // remove this line for including function inside a collection wrapper
// function runEventCollectionOrchestrator(thisElement) {  // uncomment this line for including function inside a collection wrapper
    try {
        window.TMSHelper.console("[TMSProcessing.runEventCollectionOrchestrator] start");
        var eventData = initEventData || {};
       
        if (typeof thisElement === "object") {
       
            // 1 collect information
            // 1.1 collect standard data, like target URL
            if (typeof window.TMSProcessing.getStandardElementAttributes === "function") {
                var standardData = window.TMSProcessing.getStandardElementAttributes(thisElement);
            } else {
                var standardData = {};
            }
     
            // 1.2 collect element enrichment from "data-track-elementcontent" attribute
            if (typeof window.TMSProcessing.getMarkupElementContent === "function") {
                var elementData = window.TMSProcessing.getMarkupElementContent(thisElement);
            } else {
                var elementData = {};
            }
       
            // 1.3 collect content hierarchy enrichment
            if (typeof window.TMSProcessing.getMarkupLevelContent === "function") {
                var contentHierarchyData = window.TMSProcessing.getMarkupLevelContent(thisElement);
            } else {
                var contentHierarchyData = {};
            }
   
            
            // 3 merge
            eventData = window.TMSHelper.copyVarsFromObjectToObject({
                sourceObject: elementData
                , mergeObject: eventData
                , targetPrefix: ""
                , overwrite: false
                , harmonize: true
                , includeFromSource: {}
                , excludeFromSource: {}
                , includeFromMerge: {}
                , excludeFromMerge: {}
                , flatten: false
            });
            eventData = window.TMSHelper.copyVarsFromObjectToObject({
                sourceObject: contentHierarchyData
                , mergeObject: eventData
                , targetPrefix: ""
                , overwrite: false
                , harmonize: true
                , includeFromSource: {}
                , excludeFromSource: {}
                , includeFromMerge: {}
                , excludeFromMerge: {}
                , flatten: false
            });
            eventData = window.TMSHelper.copyVarsFromObjectToObject({
                sourceObject: standardData
                , mergeObject: eventData
                , targetPrefix: ""
                , overwrite: false
                , harmonize: false
                , includeFromSource: {}
                , excludeFromSource: {}
                , includeFromMerge: {}
                , excludeFromMerge: {}
                , flatten: false
            });
                 
        } else {
            window.TMSHelper.console("[TMSProcessing.runEventCollectionOrchestrator] -> warning: No valid interacted element 'this' identified");
        }

        return eventData;
       
        window.TMSHelper.console("[TMSProcessing.runEventCollectionOrchestrator] complete");
    } catch (err) {
        window.TMSHelper.console("[TMSProcessing.runEventCollectionOrchestrator] error:");
        window.TMSHelper.errorHandler(err);
    }
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1141 TMSProcessing.identifyStandardEventCase
// Issued by: Agnosticalyze
// version: 1.3, 2021-09-22
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
 // set event variables according to standard cases (if not already set, e.g. by collectors)
window.TMSProcessing = window.TMSProcessing || {}; // remove this line if function is included inside a collection wrapper
window.TMSProcessing.identifyStandardEventCase = function (input) { // remove this line for including function inside a collection wrapper
// function identifyStandardEventCase(input) {  // uncomment this line for including function inside a collection wrapper
    try {
        window.TMSHelper.console("[TMSProcessing.identifyStandardEventCase] start");
    
        if (typeof input === "object") {
            if (typeof input['event_element_tgtUrl_url'] !== "undefined" && input['event_element_tgtUrl_url'] !== "") {
                var output = input;
        
                // set flag for 'Anchor' case
                if (typeof window.TMSHelper.isAnchorToSamePage === "function") {
                    output['event_attributes_isAnchor'] = window.TMSHelper.isAnchorToSamePage(input['event_element_tgtUrl_url']);
                    window.TMSHelper.console("[TMSProcessing.identifyStandardEventCase] -> info: Set Anchor Link flag to = " + output['event_attributes_isAnchor'].toString());
                } else {
                    window.TMSHelper.console("[TMSProcessing.identifyStandardEventCase] -> warning: TMSHelper.isAnchorToSamePage not defined");
                }
        
                // set flag for 'Download' case
                if (typeof window.TMSHelper.isDownloadLink === "function") {
                    output['event_attributes_isDownload'] = window.TMSHelper.isDownloadLink(input['event_element_tgtUrl_url']);
                    window.TMSHelper.console("[TMSProcessing.identifyStandardEventCase] -> info: Set Download Link flag to = " + output['event_attributes_isDownload'].toString());
                } else {
                    window.TMSHelper.console("[TMSProcessing.identifyStandardEventCase] -> warning: TMSHelper.isDownloadLink not defined");
                }
                
                // set flag for 'Social Share' case
                if (typeof window.TMSHelper.isShareLink === "function") {
                    output['event_attributes_isSharelink'] = window.TMSHelper.isShareLink(input['event_element_tgtUrl_url']);
                    window.TMSHelper.console("[TMSProcessing.identifyStandardEventCase] -> info: Set Share Link flag to = " + output['event_attributes_isSharelink'].toString());
                } else {
                    window.TMSHelper.console("[TMSProcessing.identifyStandardEventCase] -> warning: TMSHelper.isShareLink not defined");
                }
        
                // set flag for 'Mailto' case
                if (typeof window.TMSHelper.isEmailLink === "function") {
                    output['event_attributes_isMailto'] = window.TMSHelper.isEmailLink(input['event_element_tgtUrl_url']);
                    window.TMSHelper.console("[TMSProcessing.identifyStandardEventCase] -> info: Set Mailto Link flag to = " + output['event_attributes_isMailto'].toString());
                } else {
                    window.TMSHelper.console("[TMSProcessing.identifyStandardEventCase] -> warning: TMSHelper.isEmailLink not defined");
                }
        
                // set flag for 'OnSite' case
                if (typeof window.TMSHelper.isOnsiteLink === "function") {
                    output['event_attributes_isOnsite'] = window.TMSHelper.isOnsiteLink(input['event_element_tgtUrl_url']);
                    window.TMSHelper.console("[TMSProcessing.identifyStandardEventCase] -> info: Set Onsite Event flag to = " + output['event_attributes_isOnsite'].toString());
                } else {
                    window.TMSHelper.console("[TMSProcessing.identifyStandardEventCase] -> warning: TMSHelper.isOnsiteLink not defined");
                }
        
                // set flag for 'Phone' case
                if (typeof window.TMSHelper.isPhoneLink === "function") {
                    output['event_attributes_isPhone'] = window.TMSHelper.isPhoneLink(input['event_element_tgtUrl_url']);
                    window.TMSHelper.console("[TMSProcessing.identifyStandardEventCase] -> info: Set Phone Link flag to = " + output['event_attributes_isPhone'].toString());
                } else {
                    window.TMSHelper.console("[TMSProcessing.identifyStandardEventCase] -> warning: TMSHelper.isPhoneLink not defined");
                }
        
                window.TMSHelper.console("[TMSProcessing.identifyStandardEventCase] complete");
                return output;
            } else {
                window.TMSHelper.console("[TMSProcessing.identifyStandardEventCase] -> warning: No target URL defined, no standard flags set");
                window.TMSHelper.console("[TMSProcessing.identifyStandardEventCase] complete");
                return input;
            }
        } else {
            window.TMSHelper.console("[TMSProcessing.identifyStandardEventCase] -> warning: invalid call of function");
            window.TMSHelper.console("[TMSProcessing.identifyStandardEventCase] complete");
            return {};
        }
    } catch (err) {
        window.TMSHelper.console("[TMSProcessing.identifyStandardEventCase] error:");
        window.TMSHelper.errorHandler(err);
        return input;
    }
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1142 TMSProcessing.setEventTriggerFlag
// Issued by: Agnosticalyze
// version: 1.2, 2021-08-20
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
// Run Event Collection Orchestrator
window.TMSProcessing = window.TMSProcessing || {}; // remove this line if function is included inside a collection wrapper
window.TMSProcessing.setEventTriggerFlag = function (input) { // remove this line for including function inside a collection wrapper
// function setEventTriggerFlag(input) {  // uncomment this line for including function inside a collection wrapper
    try {
        window.TMSHelper.console("[TMSProcessing.setEventTriggerFlag] start");
 
        var output = input;
        
        if (typeof input === "object" && Object.keys(input).length > 0 && typeof window.TMSConfig === "object") {
            output['event_processing_sendRequest'] = false;
            if (input['event_element_elementContentTrackPreventFound'] || input['event_element_levelContentTrackPreventFound']) {
                output['event_processing_sendRequest'] = false;
                window.TMSHelper.console("[TMSProcessing.setEventTriggerFlag] -> info: tracking prevention flag found, event_processing_sendRequest set to FALSE");
            } else if (window.TMSConfig['tmsConfig_event_trackDefault']) {
                output['event_processing_sendRequest'] = true;
                window.TMSHelper.console("[TMSProcessing.setEventTriggerFlag] -> info: element content found, event_processing_sendRequest set to: " + output['event_processing_sendRequest']);
            } else if (input['event_element_elementContentFound']) {
                output['event_processing_sendRequest'] = true;
                window.TMSHelper.console("[TMSProcessing.setEventTriggerFlag] -> info: element content found, event_processing_sendRequest set to: " + output['event_processing_sendRequest']);
              } else if (window.TMSConfig['tmsConfig_event_trackLinkOnsite'] && (input['event_attributes_isOnsite'] && input['event_attributes_isAnchor'])) {
                output['event_processing_sendRequest'] = true;
                window.TMSHelper.console("[TMSProcessing.setEventTriggerFlag] -> info: onsite links shall be tracked, event_processing_sendRequest set to: " + output['event_processing_sendRequest']);
              } else if (window.TMSConfig['tmsConfig_event_trackLinkDownload'] && input['event_attributes_isDownload']) {
                output['event_processing_sendRequest'] = true;
                window.TMSHelper.console("[TMSProcessing.setEventTriggerFlag] -> info: download links shall be tracked, event_processing_sendRequest set to: " + output['event_processing_sendRequest']);
              } else if (window.TMSConfig['tmsConfig_event_trackLinkMailto'] && input['event_attributes_isMailto']) {
                output['event_processing_sendRequest'] = true;
                window.TMSHelper.console("[TMSProcessing.setEventTriggerFlag] -> info: mailto links shall be tracked, event_processing_sendRequest set to: " + output['event_processing_sendRequest']);
              } else if (window.TMSConfig['tmsConfig_event_trackLinkPhone'] && input['event_attributes_isPhone']) {
                output['event_processing_sendRequest'] = true;
                window.TMSHelper.console("[TMSProcessing.setEventTriggerFlag] -> info: phone links shall be tracked, event_processing_sendRequest set to: " + output['event_processing_sendRequest']);
              } else if (window.TMSConfig['tmsConfig_event_trackLinkOffsite'] && input['event_attributes_isOnsite'] === false) {
                  output['event_processing_sendRequest'] = true;
                  window.TMSHelper.console("[TMSProcessing.setEventTriggerFlag] -> info: offsite links shall be tracked, event_processing_sendRequest set to: " + output['event_processing_sendRequest']);
              }
        } else {
            window.TMSHelper.console("[TMSProcessing.setEventTriggerFlag] -> warning: invalid input");
        }
 
        window.TMSHelper.console("[TMSProcessing.setEventTriggerFlag] complete");
        return output;
    } catch (err) {
        window.TMSHelper.console("[TMSProcessing.setEventTriggerFlag] error:");
        window.TMSHelper.errorHandler(err);
        return input;
    }
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1151 TMSProcessing.setStandardEventVars (VAST)
// Issued by: Agnosticalyze
// version: 2.13, 2022-06-01
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
     
// set event variables according to standard cases (if not already set, e.g. by collectors)
window.TMSProcessing = window.TMSProcessing || {}; // remove this line if function is included inside a collection wrapper
window.TMSProcessing.setStandardEventVars = function (input) { // remove this line for including function inside a collection wrapper
// function setStandardEventVars(input) {  // uncomment this line for including function inside a collection wrapper
    try {
        window.TMSHelper.console("[TMSProcessing.setStandardEventVars] start");
        
        if (typeof input === "object") {
            var output = {};
               
            // 0 Target URL handling
            if (typeof input['event_element_tgtUrl_url'] === "string" && typeof window.TMSHelper.URLslasher === "function") {
                var slashedTgtURL = window.TMSHelper.URLslasher(input['event_element_tgtUrl_url']);
                output = window.TMSHelper.copyVarsFromObjectToObject({
                    sourceObject: slashedTgtURL
                    , mergeObject: output
                    , targetPrefix: "event_element_tgtUrl_"
                    , overwrite: false
                    , harmonize: false
                    , flatten: false
                });
                window.TMSHelper.copyVarsFromObjectToObject({
                    sourceObject: output
                    , mergeObject: input
                    , overwrite: false
                    , includeFromSource: ["P:event_element_tgtUrl_"]
                    , inplace: true
                });
                window.TMSHelper.console("[TMSProcessing.setStandardEventVars] -> info: event_element_tgtUrl_url set: " + output['event_element_tgtUrl_url']);
            } else {
                 window.TMSHelper.console("[TMSProcessing.setStandardEventVars] -> warning: event_element_tgtUrl_url or TMSHelper.URLslasher not defined");
            }
               
            // 1.1 Set default values for unknown (without any details) interactions (will be overwritten during further processing)
            output['event_category_primaryCategory'] = "not-set";
            output['event_eventInfo_cause'] = "not-set";
            output['event_eventInfo_effect'] = "not-set";
           
            // 1.2 set default values for event variables
            if (typeof input['event_element_tgtUrl_url'] === "string") {
                output['event_category_primaryCategory'] = "navigation";
                output['event_eventInfo_cause'] = "click";
                output['event_eventInfo_effect'] = "go-to";
            }
               
            // 1.3 set event label
            if (typeof input['event_eventInfo_label'] === "string" && input['event_eventInfo_label'] !== "") {
                output['event_eventInfo_label'] = input['event_eventInfo_label'];
            } else if (typeof input['event_element_elementInnerText'] === "string" && input['event_element_elementInnerText'] !== "") {
                output['event_eventInfo_label'] = input['event_element_elementInnerText'];
            } else if (typeof input['event_element_elementValue'] === "string" && input['event_element_elementValue'] !== "") {
                output['event_eventInfo_label'] = input['event_element_elementValue'];
            } else if (typeof input['event_element_elementTitle'] === "string" && input['event_element_elementTitle'] !== "") {
                output['event_eventInfo_label'] = input['event_element_elementTitle'];
            } else if (typeof input['event_element_elementName'] === "string" && input['event_element_elementName'] !== "") {
                output['event_eventInfo_label'] = input['event_element_elementName'];
            } else if (typeof input['event_element_elementTagName'] === "string" && input['event_element_elementTagName'] !== "") {
                output['event_eventInfo_label'] = input['event_element_elementTagName'];
            } else if (typeof input['event_element_elementID'] === "string" && input['event_element_elementID'] !== "") {
                output['event_eventInfo_label'] = input['event_element_elementID'];
            } else if (typeof input['event_element_elementClassName'] === "string" && input['event_element_elementClassName'] !== "") {
                output['event_eventInfo_label'] = input['event_element_elementClassName'];
            } else if (typeof input['event_element_tgtUrl_url'] === "string" && input['event_element_tgtUrl_url'] !== "") {
                output['event_eventInfo_label'] = input['event_element_tgtUrl_url'];
            } else {
                output['event_eventInfo_label'] = "not-set";
            }
               
            // 2.0 get event flags
            if (window.TMSProcessing.identifyStandardEventCase && typeof output['event_element_tgtUrl_url'] === "string" && output['event_element_tgtUrl_url'] !== "") {
                output = window.TMSProcessing.identifyStandardEventCase(output);
                // merge flags from output into input
                window.TMSHelper.copyVarsFromObjectToObject({
                    sourceObject: output,
                    mergeObject: input,
                    overwrite: false,
                    includeFromSource: ["P:event_attributes_is"],
                    inplace: true
                });
            }
         
            // 2.1 set variables for "Anchor" case
            if (typeof input['event_attributes_isAnchor'] === "boolean" && input['event_attributes_isAnchor']) {
                output['event_category_primaryCategory'] = "content";
            }
         
            // 2.2 set variables for "Offsite" case
            if (typeof input['event_attributes_isOnsite'] === "boolean" && !input['event_attributes_isOnsite']) {
                output['event_category_primaryCategory'] = "site-transition";
                if (typeof input['event_element_tgtUrl_hostnameAndPath'] === "string" && input['event_element_tgtUrl_hostnameAndPath'] !== "") {
                    output['event_eventInfo_label'] = input['event_element_tgtUrl_hostnameAndPath'];
                } else if (typeof input['event_element_tgtUrl_url'] === "string" && input['event_element_tgtUrl_url'] !== "") {
                    output['event_eventInfo_label'] = input['event_element_tgtUrl_url'];
                } else {
                    output['event_eventInfo_label'] = "offsite";
                }
            }
         
            // 2.3 set variables for "Download" case
            if (typeof input['event_attributes_isDownload'] === "boolean" && input['event_attributes_isDownload']) {
                output['event_category_primaryCategory'] = "file";
                output['event_eventInfo_effect'] = "download";
                if (typeof input['event_element_tgtUrl_hostnameAndPath'] === "string" && input['event_element_tgtUrl_hostnameAndPath'] !== "") {
                    output['event_eventInfo_label'] = input['event_element_tgtUrl_hostnameAndPath'];
                } else if (typeof input['event_element_tgtUrl_url'] === "string" && input['event_element_tgtUrl_url'] !== "") {
                    output['event_eventInfo_label'] = input['event_element_tgtUrl_url'];
                } else {
                    output['event_eventInfo_label'] = "download";
                }
            }
         
            // 2.4 set variables for "Mailto" case
            if (typeof input['event_attributes_isMailto'] === "boolean" && input['event_attributes_isMailto'] && (typeof input['event_attributes_isSharelink'] === "boolean" && !input['event_attributes_isSharelink'])) {
                output['event_category_primaryCategory'] = "email";
                output['event_eventInfo_effect'] = "start";
                if (typeof input['event_element_tgtUrl_hostname'] === "string" && input['event_element_tgtUrl_hostname'] !== "") {
                    output['event_eventInfo_label'] = input['event_element_tgtUrl_hostname'];
                } else if (typeof input['event_element_tgtUrl_url'] === "string" && input['event_element_tgtUrl_url'] !== "") {
                    output['event_eventInfo_label'] = input['event_element_tgtUrl_url'];
                } else {
                    output['event_eventInfo_label'] = "email";
                }
            }
         
            // 2.5 set variables for "Phone" case
            if (typeof input['event_attributes_isPhone'] === "boolean" && input['event_attributes_isPhone']) {
                output['event_category_primaryCategory'] = "phone";
                output['event_eventInfo_effect'] = "start";
                if (typeof input['event_element_tgtUrl_hostname'] === "string" && input['event_element_tgtUrl_hostname'] !== "") {
                    output['event_eventInfo_label'] = input['event_element_tgtUrl_hostname'];
                } else if (typeof input['event_element_tgtUrl_url'] === "string" && input['event_element_tgtUrl_url'] !== "") {
                    output['event_eventInfo_label'] = input['event_element_tgtUrl_url'];
                } else {
                    output['event_eventInfo_label'] = "phone";
                }
            }
   
            // 2.6 set variables for "Share Link" case
            if (typeof input['event_attributes_isSharelink'] === "boolean" && input['event_attributes_isSharelink']) {
                output['event_category_primaryCategory'] = "share";
                output['event_eventInfo_effect'] = "go-to";
                var portal = window.TMSHelper.identifySocialProvider(input['event_element_tgtUrl_url']);
                if (portal === "email") {
                    output['event_eventInfo_effect'] = "start";
                }
                output['event_eventInfo_label'] = "share-" + portal;
            }
               
            window.TMSHelper.console("[TMSProcessing.setStandardEventVars] complete");
            return output;
        } else {
            window.TMSHelper.console("[TMSProcessing.setStandardEventVars] -> warning: invalid call of function");
            window.TMSHelper.console("[TMSProcessing.setStandardEventVars] complete");
            return {};
        }
    } catch (err) {
        window.TMSHelper.console("[TMSProcessing.setStandardEventVars] error:");
        window.TMSHelper.errorHandler(err);
        return {};
    }
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1152 TMSProcessing.mapElementElementInfoToEventElementVars
// Issued by: Agnosticalyze
// version: 1.0, 2021-07-30
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++


 // variable mapping: If element_elementInfo_... was found in elementContent or levelContent collection, map to event_element_...
 window.TMSProcessing = window.TMSProcessing || {}; // remove this line if function is included inside a collection wrapper
 window.TMSProcessing.mapElementElementInfoToEventElementVars = function (event) { // remove this line for including function inside a collection wrapper
 // function mapElementElementInfoToEventElementVars(event) {  // uncomment this line for including function inside a collection wrapper
  var prefix = new RegExp("element_elementInfo_", "g");
  for (var oldAttrName in event) {
      if (oldAttrName.match(prefix)) {
          newAttrName = oldAttrName.replace(prefix, "event_element_");
          if (typeof event[newAttrName] === "undefined" || (event[newAttrName] === "" && event[oldAttrName] !== "")) {
              // set event_element_... variable
              event[newAttrName] = event[oldAttrName];
              // remove element_elementInfo_... variable
              delete event[oldAttrName];
          } else if (typeof event[newAttrName] !== "undefined" && event[newAttrName] !== "") {
              // just remove element_elementInfo_... variable, a corresponding event_element_... variable already exists
              delete event[oldAttrName];
          }
      }
  }
  return event;
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1153 TMSProcessing.setEventElementLocationFromParentLevelNames
// Issued by: Agnosticalyze
// version: 1.0, 2021-07-30
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++


 // set event_element_location from event_element_parentLevelNames if not already populated
 window.TMSProcessing = window.TMSProcessing || {}; // remove this line if function is included inside a collection wrapper
 window.TMSProcessing.setEventElementLocationFromParentLevelNames = function (event) { // remove this line for including function inside a collection wrapper
 // function setEventElementLocationFromParentLevelNames(event) {  // uncomment this line for including function inside a collection wrapper
  if ((typeof event['event_element_location'] !== "string" || event['event_element_location'] === "") && typeof event['event_element_parentLevelNames'] === "string" && event['event_element_parentLevelNames'] !== "") {
    event['event_element_location'] = event['event_element_parentLevelNames'];
  }
  return event;
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1155 TMSProcessing.setMediaEventVars
// Issued by: Feld M
// version: 1.0, 2022-01-18
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
TMSProcessing = TMSProcessing || {}; // remove this line if function is included inside a collection wrapper


/**
 * Sets or transforms UDO variables of media tracking to comply with specification
 */
TMSProcessing.setMediaEventVars = function (input) { // remove this line for including function inside a collection wrapper
   // function setMediaEventVars(input) {  // uncomment this line for including function inside a collection wrapper
   try {
      TMSHelper.console("[TMSProcessing.setMediaEventVars] start");

      var output = {};

      // Set/Transform complementary variables for "Media" tracking
      if (input['event_category_primaryCategory'] === "media") {
         output['event_eventInfo_label'] = input['content_media_fileTitle'] || input['content_media_fileName'];

         //Format media length if needed
         if (output['content_media_length'] && !TMSHelper.isHMSFormat(input['content_media_length'])) {
            output['content_media_length'] = TMSHelper.convertSecToHMS(input['content_media_length']);
         }

         //Format media position if needed
         if (!TMSHelper.isHMSFormat(input['event_media_position'])) {
            output['event_media_position'] = TMSHelper.convertSecToHMS(input['event_media_position']);

         }
         //Calculate media progress
         if (input['content_media_length'] && input['event_media_position'] && !input['event_media_progress']) {
            output['event_media_progress'] = TMSHelper.calculateProgress(input['event_media_position'], input['content_media_length']);
         }
      }
      TMSHelper.console("[TMSProcessing.setMediaEventVars] complete");
      return output;

   } catch (err) {
      TMSHelper.console("[TMSProcessing.setMediaEventVars] error:");
      TMSHelper.errorHandler(err);
      return output;
   }
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1161 TMSProcessing.dice (trigger TMS event request)
// Issued by: Agnosticalyze
// version: 1.14, 2022-06-17
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
// send data to TMS for further processing
window.TMSProcessing = window.TMSProcessing || {}; // remove this line if function is included inside a collection wrapper
window.dice = window.TMSProcessing.dice = function (eventRequestObject) {
  // remove this line for including function inside a collection wrapper
  // function dice(eventRequestObject) {  // uncomment this line for including function inside a collection wrapper
  try {
    window.TMSHelper.console("[TMSProcessing.dice] start");
  
    if (
      typeof eventRequestObject === "object"
    ) {
        if (typeof eventRequestObject["event_eventInfo_type"] !== "string" || eventRequestObject["event_eventInfo_type"] === "") {
            window.TMSHelper.console("[TMSProcessing.dice] -> info: event_eventInfo_type not set, defaulting to 'not-set'");
            eventRequestObject["event_eventInfo_type"] = "not-set";
        }
 
        if (typeof eventRequestObject["event_processing_trigger"] !== "string" || eventRequestObject["event_processing_trigger"] === "") {
            window.TMSHelper.console("[TMSProcessing.dice] -> info: event_processing_trigger not set, defaulting to 'dice'");
            eventRequestObject["event_processing_trigger"] = "dice";
        }
 
        if (eventRequestObject["event_eventInfo_type"] === "datalayer-update") {
            window.TMSHelper.console("[TMSProcessing.dice] -> info: datalayer-update detected");
            window.TMSEvent = window.TMSHelper.copyVarsFromObjectToObject({
                  sourceObject: eventRequestObject
                , mergeObject: {}
                , overwrite: true
                , harmonize: false
            });;
            window.TMSProcessing.TMSEventOrchestrator();
        } else if (eventRequestObject["event_eventInfo_type"] === "pageview-physical" || eventRequestObject["event_eventInfo_type"] === "pageview-virtual") {
            window.TMSHelper.console("[TMSProcessing.dice] -> info: pageview-physical or pageview-virtual detected");
 
            // DTM specific request
            if (window.TMSConfig["tmsConfig_tool_DTM_flag"]) {
                window.TMSHelper.console("[TMSProcessing.dice] -> info: sending request to DTM");
                window.TMSHelper.console("[TMSProcessing.dice] -> warning: DTM CASE NOT BUILT, YET");
                // TBA
            }
 
            // GTM specific request
            if (window.TMSConfig["tmsConfig_tool_GTM_flag"]) {
                window.TMSHelper.console("[TMSProcessing.dice] -> info: GTM detected -> create TMSEvent and trigger GTM Extension 1201");
                // create TMSEvent
                window.TMSEvent = window.TMSHelper.copyVarsFromObjectToObject({
                      sourceObject: eventRequestObject
                    , mergeObject: {}
                    , overwrite: true
                    , harmonize: false
                });
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
                    window.TMSHelper.console("[TMSProcessing.dice] error:");
                    window.TMSHelper.errorHandler(e);
                }
            }
 
            // TiQ specific request
            if (window.TMSConfig["tmsConfig_tool_TiQ_flag"]) {
                window.TMSHelper.console("[TMSProcessing.dice] -> info: sending request to TiQ");
                if (typeof window.utag.view === "function") {
                    try {
                        window.utag.view(eventRequestObject);
                    } catch (e) {
                        window.TMSHelper.console("[TMSProcessing.dice] error:");
                        window.TMSHelper.errorHandler(e);
                    }
                } else {
                    window.TMSHelper.console("[TMSProcessing.dice] -> warning: invalid definition of push function, nothing sent to TiQ");
                }
            }
        } else {
            window.TMSHelper.console("[TMSProcessing.dice] -> info: event detected");
 
            // DTM specific request
            if (window.TMSConfig["tmsConfig_tool_DTM_flag"]) {
                window.TMSHelper.console("[TMSProcessing.dice] -> info: sending request to DTM");
                window.TMSHelper.console("[TMSProcessing.dice] -> warning: DTM CASE NOT BUILT, YET");
                // TBA
            }
 
            // GTM specific request
            if (window.TMSConfig["tmsConfig_tool_GTM_flag"]) {
                window.TMSHelper.console("[TMSProcessing.dice] -> info: GTM detected -> create TMSEvent and trigger GTM Extension 1201");
                // create TMSEvent
                window.TMSEvent = window.TMSHelper.copyVarsFromObjectToObject({
                      sourceObject: eventRequestObject
                    , mergeObject: {}
                    , overwrite: true
                    , harmonize: false
                });
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
                    window.TMSHelper.console("[TMSProcessing.dice] error:");
                    window.TMSHelper.errorHandler(e);
                }
            }
 
            // TiQ specific request
            if (window.TMSConfig["tmsConfig_tool_TiQ_flag"]) {
                window.TMSHelper.console("[TMSProcessing.dice] -> info: sending request to TiQ");
                if (typeof window.utag.link === "function") {
                    try {
                        window.utag.link(eventRequestObject);
                    } catch (e) {
                        window.TMSHelper.console("[TMSProcessing.dice] error:");
                        window.TMSHelper.errorHandler(e);
                    }
                } else {
                    window.TMSHelper.console("[TMSProcessing.dice] -> warning: invalid definition of push function, nothing sent to TiQ");
                }
            }
        }
    } else {
        window.TMSHelper.console("[TMSProcessing.dice] -> warning: event_eventInfo_type not defined");
    }
  
    window.TMSHelper.console("[TMSProcessing.dice] complete");
  } catch (err) {
    window.TMSHelper.console("[TMSProcessing.dice] error:");
    window.TMSHelper.errorHandler(err);
  }
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1162 TMSProcessing.sendToParentWindow
// Issued by: Agnosticalyze
// version: 2.1, 2022-06-03
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
   
window.TMSProcessing = window.TMSProcessing || {}; // remove this line if function is included inside a collection wrapper
window.TMSProcessing.sendToParentWindow= function (eventRequestObject) { // remove this line for including function inside a collection wrapper
// function sendToParentWindow(eventRequestObject) {  // uncomment this line for including function inside a collection wrapper
    try {
        window.TMSHelper.console("[TMSProcessing.sendToParentWindow] start");
  
        if (typeof eventRequestObject === "object" 
                && Object.keys(eventRequestObject).length > 0 
                && window.top !== window 
                && window.TMSConfig['tmsConfig_embed_sendToParentWindow']) {
            // send the stringified object to the top-level parent
            window.top.postMessage(JSON.stringify(eventRequestObject), '*');
            window.TMSHelper.console("[TMSProcessing.sendToParentWindow] -> info: event data sent to window.top");
        } else {
            window.TMSHelper.console("[TMSProcessing.sendToParentWindow] -> warning: eventRequestObject is invalid or empty");
        }
  
        window.TMSHelper.console("[TMSProcessing.sendToParentWindow] complete");
    } catch (err) {
        window.TMSHelper.console("[TMSProcessing.sendToParentWindow] error:");
        window.TMSHelper.errorHandler(err);
    }
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1163 TMSProcessing.TMSEventOrchestrator
// Issued by: Agnosticalyze
// version: 1.5, 2022-06-17
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// TBA
window.TMSProcessing = window.TMSProcessing || {}; // remove this line if function is included inside a collection wrapper
window.TMSProcessing.TMSEventOrchestrator = function () { // remove this line for including function inside a collection wrapper
// function TMSEventOrchestrator() {  // uncomment this line for including function inside a collection wrapper
    try {
        window.TMSHelper.console("[TMSProcessing.TMSEventOrchestrator] start");
        if (window.TMSEvent['event_processing_trigger'] && window.TMSEvent['event_processing_trigger'].endsWith("_receivedfromchildwindow")) {
            window.TMSHelper.console("[TMSProcessing.TMSEventOrchestrator] running on iframe data. event orchestration is not needed. skipping");
            return;
        }
 
        // 1 Preparation: Copy information
         
        if (typeof window.TMSEvent === "object" && Object.keys(window.TMSEvent).length > 0) {
            // 1.1 Harmonize variables in TMSEvent
            //     => previously extension 1201
            window.TMSHelper.console("[TMSProcessing.TMSEventOrchestrator] -> info: TMSEvent is not empty -> harmonize");
            // harmonize variables and overwrite pre-existing information in TMSEvent
            window.TMSEvent = window.TMSHelper.copyVarsFromObjectToObject({
                  sourceObject: window.TMSEvent
                , mergeObject: {}
                , overwrite: false
                , harmonize: true
            });
            window.TMSHelper.console("[TMSProcessing.TMSEventOrchestrator] -> info: variables in TMSEvent harmonized");
        } else {
            window.TMSHelper.console("[TMSProcessing.TMSEventOrchestrator] -> info: TMSEvent is empty -> copy from VSPO");
            // 1.2 Copy from vendor-specific processing object to TMSEvent
            if (window.TMSConfig['tmsConfig_tool_TiQ_flag'] && typeof b === "object") { // TBA: replace b with variable configured in TMSConfig
                // harmonize variables and overwrite pre-existing information in TMSEvent
                window.TMSEvent = window.TMSHelper.copyVarsFromObjectToObject({
                      sourceObject: b // TBA: replace b with variable configured in TMSConfig
                    , mergeObject: {}
                    , overwrite: true
                    , harmonize: true
                    , excludeFromSource: window.TMSConfig['tmsConfig_processing_toolTealiumVars']
                });
            }
        }
 
        // 1.3 Copy from TMSEvent to TMSConfig
        //     note: by now, TMSEvent is certainly populated
        //     => Previously extension 1202
        if (typeof window.TMSConfig === "object" && typeof window.TMSEvent['event_eventInfo_type'] === "string" && window.TMSEvent['event_eventInfo_type'] !== "datalayer-update") {
            window.TMSConfig = window.TMSHelper.copyVarsFromObjectToObject({
                  sourceObject: window.TMSEvent
                , mergeObject: window.TMSConfig
                , overwrite: true
                , harmonize: false
                , includeFromSource: window.TMSConfig['tmsConfig_processing_persistingConfigVars']
            });
        }
 
        // 2 Set default values for event_eventInfo_type and event_processing_trigger
        if (typeof window.TMSEvent['event_eventInfo_type'] === "string" && window.TMSEvent['event_eventInfo_type'] !== "") {
            window.TMSHelper.console("[TMSProcessing.TMSEventOrchestrator] -> info: TMSEvent.event_eventInfo_type is already defined and not overwritten by a default value");
        } else {
            if (typeof window.TMSCache === "object" && Object.keys(window.TMSCache).length > 0) {
                if (typeof window.TMSEvent['page_attributes_virtualPageView'] === "string" && window.TMSEvent['page_attributes_virtualPageView'] === "1") {
                    window.TMSEvent['event_eventInfo_type'] = "pageview-virtual"
                    window.TMSHelper.console("[TMSProcessing.TMSEventOrchestrator] -> info: TMSEvent.event_eventInfo_type set to 'pageview-virtual'");
                } else {
                    window.TMSEvent['event_eventInfo_type'] = "not-set"
                    window.TMSHelper.console("[TMSProcessing.TMSEventOrchestrator] -> info: TMSEvent.event_eventInfo_type set to 'not-set'");
                }
            } else {
                window.TMSEvent['event_eventInfo_type'] = "pageview-physical"
                window.TMSHelper.console("[TMSProcessing.TMSEventOrchestrator] -> info: TMSEvent.event_eventInfo_type set to 'pageview-physical'");
            }
        }
        if (typeof window.TMSEvent['event_processing_trigger'] === "string" && window.TMSEvent['event_processing_trigger'] !== "") {
            window.TMSHelper.console("[TMSProcessing.TMSEventOrchestrator] -> info: TMSEvent.event_processing_trigger is already defined and not overwritten by a default value");
        } else {
            window.TMSEvent['event_processing_trigger'] = "not-set"
            window.TMSHelper.console("[TMSProcessing.TMSEventOrchestrator] -> info: TMSEvent.event_processing_trigger set to 'not-set'");
        }
 
        // 3 Event Orchestration
        if (window.TMSEvent['event_eventInfo_type'] === "pageview-physical") {
            window.TMSHelper.console("[TMSProcessing.TMSEventOrchestrator] -> info: pageview-physical detected");
            // URL Handling
            if (window.TMSProcessing.getPageURLWindow)              window.TMSProcessing.getPageURLWindow();            else window.TMSHelper.console("[TMSEvent Orchestrator] -> warning: getPageURLWindow function not defined");
            if (window.TMSProcessing.getPageURLCanonical)           window.TMSProcessing.getPageURLCanonical();         else window.TMSHelper.console("[TMSEvent Orchestrator] -> warning: getPageURLCanonical function not defined");
            if (window.TMSProcessing.getPageURLAlternate)           window.TMSProcessing.getPageURLAlternate();         else window.TMSHelper.console("[TMSEvent Orchestrator] -> warning: getPageURLAlternate function not defined");
            if (window.TMSProcessing.getPageURLInput)               window.TMSProcessing.getPageURLInput();             else window.TMSHelper.console("[TMSEvent Orchestrator] -> warning: getPageURLInput function not defined");
            // get page name
            if (window.TMSProcessing.getCurrentPageName)            window.TMSProcessing.getCurrentPageName();          else window.TMSHelper.console("[TMSEvent Orchestrator] -> warning: getCurrentPageName function not defined");
            // Touchpoint Handling
            if (window.TMSProcessing.getCurrentTouchpoint)          window.TMSProcessing.getCurrentTouchpoint();        else window.TMSHelper.console("[TMSEvent Orchestrator] -> warning: getCurrentTouchpoint function not defined");
            if (window.TMSProcessing.touchpointHandler)             window.TMSProcessing.touchpointHandler();           else window.TMSHelper.console("[TMSEvent Orchestrator] -> warning: touchpointHandler function not defined");
            if (window.TMSProcessing.mapCurrentTouchpointValues)    window.TMSProcessing.mapCurrentTouchpointValues();  else window.TMSHelper.console("[TMSEvent Orchestrator] -> warning: mapCurrentTouchpointValues function not defined");
            // determine Platform Environment
            if (window.TMSProcessing.getPlatformEnvironment)        window.TMSProcessing.getPlatformEnvironment();      else window.TMSHelper.console("[TMSEvent Orchestrator] -> warning: getPlatformEnvironment function not defined");
            // determine, whether the current page is embedded inside another page
            if (window.TMSProcessing.getEmbedInfo)                  window.TMSProcessing.getEmbedInfo();                else window.TMSHelper.console("[TMSEvent Orchestrator] -> warning: getEmbedInfo function not defined");
        } else if (window.TMSEvent['event_eventInfo_type'] === "pageview-virtual") {
            window.TMSHelper.console("[TMSProcessing.TMSEventOrchestrator] -> info: pageview-virtual detected");
            // URL Handling
            if (window.TMSProcessing.getPageURLWindow)              window.TMSProcessing.getPageURLWindow();            else window.TMSHelper.console("[TMSEvent Orchestrator] -> warning: getPageURLWindow function not defined");
            // get page name
            if (window.TMSProcessing.getCurrentPageName)            window.TMSProcessing.getCurrentPageName();          else window.TMSHelper.console("[TMSEvent Orchestrator] -> warning: getCurrentPageName function not defined");
            // Touchpoint Handling
            if (window.TMSProcessing.getCurrentTouchpoint)          window.TMSProcessing.getCurrentTouchpoint();        else window.TMSHelper.console("[TMSEvent Orchestrator] -> warning: getCurrentTouchpoint function not defined");
            if (window.TMSProcessing.touchpointHandler)             window.TMSProcessing.touchpointHandler();           else window.TMSHelper.console("[TMSEvent Orchestrator] -> warning: touchpointHandler function not defined");
            if (window.TMSProcessing.mapCurrentTouchpointValues)    window.TMSProcessing.mapCurrentTouchpointValues();  else window.TMSHelper.console("[TMSEvent Orchestrator] -> warning: mapCurrentTouchpointValues function not defined");
        } else if (window.TMSEvent['event_eventInfo_type'] === "datalayer-update") {
            window.TMSHelper.console("[TMSProcessing.TMSEventOrchestrator] -> info: datalayer-update detected");
            // TBD
        } else {
            window.TMSHelper.console("[TMSProcessing.TMSEventOrchestrator] -> info: general event detected");
            if (window.TMSProcessing.mapElementElementInfoToEventElementVars)       window.TMSProcessing.mapElementElementInfoToEventElementVars(window.TMSEvent);       else window.TMSHelper.console("[TMSEvent Orchestrator] -> warning: mapElementElementInfoToEventElementVars function not defined");
            if (window.TMSProcessing.setEventElementLocationFromParentLevelNames)   window.TMSProcessing.setEventElementLocationFromParentLevelNames(window.TMSEvent);   else window.TMSHelper.console("[TMSEvent Orchestrator] -> warning: setEventElementLocationFromParentLevelNames function not defined");
            // VAST: set standard event vars
            if (window.TMSProcessing.setStandardEventVars)                          window.TMSEvent = window.TMSHelper.copyVarsFromObjectToObject({
                sourceObject: window.TMSProcessing.setStandardEventVars(window.TMSEvent),
                mergeObject: window.TMSEvent,
                overwrite: false
                });
                else window.TMSHelper.console("[TMSProcessing.TMSEventOrchestrator] -> warning: setStandardEventVars function not defined");
            // Set complementary media UDO vars
            if (window.TMSProcessing.setMediaEventVars && TMSEvent['event_category_primaryCategory'] === 'media')   window.TMSEvent = window.TMSHelper.copyVarsFromObjectToObject({
                        sourceObject: window.TMSProcessing.setMediaEventVars(window.TMSEvent),
                        mergeObject: window.TMSEvent,
                        overwrite: true
                });
                else window.TMSHelper.console("[TMSProcessing.TMSEventOrchestrator] -> warning: setMediaEventVars function not defined");
        }
 
        // 4 Finishing up: Copy information
        // 4.1 Copy from TMSCache to TMSEvent (currently it's the other way around to account for interdependentVars)
        //     => Previously extension 1221
        if (typeof window.TMSCache === "object" && Object.keys(window.TMSCache).length > 0) {
            window.TMSEvent = window.TMSHelper.copyVarsFromObjectToObject({
                  sourceObject: window.TMSEvent
                , mergeObject: window.TMSCache
                , overwrite: true
                , harmonize: false
            });
        } else {
            window.TMSHelper.console("[TMSProcessing.TMSEventOrchestrator] -> info: TMSCache not found");
        }
 
        if (window.TMSEvent['event_eventInfo_type'] !== "datalayer-update") {
            // 4.2 Copy from TMSConfig to processing object
            //   => Previously extension 1223
            if (window.TMSConfig['tmsConfig_tool_TiQ_flag'] === true && typeof b === "object") { // TBD: replace with variable configured in TMSConfig
                window.TMSHelper.copyVarsFromObjectToObject({
                      sourceObject: window.TMSConfig
                    , mergeObject: b
                    , overwrite: true
                    , harmonize: false
                    , excludeFromSource: ['P:tmsConfig_processing']
                    , flatten: false
                    , inplace: true
                });
                window.TMSHelper.console("[TMSProcessing.TMSEventOrchestrator] -> info: variables copied from TMSConfig to vendor-specific processing object");
            } else {
                window.TMSEvent = window.TMSHelper.copyVarsFromObjectToObject({
                      sourceObject: window.TMSConfig
                    , mergeObject: window.TMSEvent
                    , overwrite: true
                    , harmonize: false
                    , excludeFromSource: ['P:tmsConfig_processing']
                    , flatten: false
                });
                window.TMSHelper.console("[TMSProcessing.TMSEventOrchestrator] -> info: variables copied from TMSConfig to TMSEvent");
            }
 
            // 4.3 Copy from TMSEvent to processing object
            //   => Previously extension 1222
            if (window.TMSConfig['tmsConfig_tool_TiQ_flag'] === true && typeof b === "object") { // TBD: replace with variable configured in TMSConfig
                window.TMSHelper.copyVarsFromObjectToObject({
                      sourceObject: window.TMSEvent
                    , mergeObject: b
                    , overwrite: true
                    , harmonize: false
                    , inplace: true
                });
                window.TMSHelper.console("[TMSProcessing.TMSEventOrchestrator] -> info: variables copied from vendor-specific processing object to TMSEvent");
            } else {
                window.TMSHelper.console("[TMSProcessing.TMSEventOrchestrator] -> info: TMSEvent ist the processing object, nothing copied");
            }            
        } else {
            // 4.4 Call TMSProcessing.dataLayerSynchronizationOrchestrator in case of dalalayer-update
            window.TMSProcessing.dataLayerSynchronizationOrchestrator();
        }
      
        window.TMSHelper.console("[TMSProcessing.TMSEventOrchestrator] complete");
    } catch (err) {
        window.TMSHelper.console("[TMSProcessing.TMSEventOrchestrator] error:");
        window.TMSHelper.errorHandler(err);
    }
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1164 TMSProcessing.dataLayerSynchronizationOrchestrator
// Issued by: Agnosticalyze
// version: 2.4, 2022-06-02
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
// Copies variables as defined in TMSConfig from processing object to TMSConfig and TMSCache depending on recognized case
window.TMSProcessing = window.TMSProcessing || {}; // remove this line if function is included inside a collection wrapper
window.TMSProcessing.dataLayerSynchronizationOrchestrator = function () { // remove this line for including function inside a collection wrapper
// function DataLayerSynchronizationOrchestrator() {  // uncomment this line for including function inside a collection wrapper
    try {
        window.TMSHelper.console("[TMSProcessing.dataLayerSynchronizationOrchestrator] start");
    
        if (typeof window.TMSEvent === "object" && typeof window.TMSConfig === "object") {
                if (typeof window.TMSEvent['event_processing_trigger'] === "string" && window.TMSEvent.event_processing_trigger.endsWith("_receivedfromchildwindow")) {
                    window.TMSHelper.console("[TMSProcessing.dataLayerSynchronizationOrchestrator] -> info: trigger suffix 'receivedfromchildwindow' detected, no synchronization performed");
                } else {
                    window.TMSHelper.console("[TMSProcessing.dataLayerSynchronizationOrchestrator] -> info: other trigger than 'receivedfromchildwindow' detected");
    
                    // Copy from processing object to TMSConfig (All cases)
                    // previously extension 4992
                    window.TMSConfig = window.TMSHelper.copyVarsFromObjectToObject({
                          sourceObject: window.TMSEvent
                        , mergeObject: window.TMSConfig
                        , targetPrefix: ""
                        , overwrite: true
                        , harmonize: false
                        , includeFromSource: window.TMSConfig['tmsConfig_processing_persistingConfigVars']
                    });
    
                    // Copy from processing object to TMSCache (case-specific)
                    // previously extension 4991
                    // case: PV-P and datalayer-update
                    if (window.TMSEvent['event_eventInfo_type'] == "pageview-physical" || window.TMSEvent['event_eventInfo_type'] == "datalayer-update") {
                        window.TMSCache = window.TMSHelper.copyVarsFromObjectToObject({
                              sourceObject: window.TMSEvent
                            , mergeObject: window.TMSCache
                            , targetPrefix: ""
                            , overwrite: true
                            , harmonize: false
                            , includeFromSource: window.TMSConfig['tmsConfig_processing_persistingCacheVars']
                        });
                    }
                    // case: PV-V
                    else if (window.TMSEvent['event_eventInfo_type'] == "pageview-virtual") {
                        window.TMSCache = window.TMSHelper.copyVarsFromObjectToObject({
                              sourceObject: window.TMSEvent
                            , mergeObject: window.TMSCache
                            , targetPrefix: ""
                            , overwrite: true
                            , harmonize: false
                            , includeFromSource: window.TMSConfig['tmsConfig_processing_persistingCacheVars']
                        });
                    }
                    // case: all other (= "events")
                    else {
                        window.TMSCache = window.TMSHelper.copyVarsFromObjectToObject({
                              sourceObject: window.TMSEvent
                            , mergeObject: window.TMSCache
                            , targetPrefix: ""
                            , overwrite: true
                            , harmonize: false
                            , includeFromSource: window.TMSConfig['tmsConfig_processing_persistingEventVars']
                        });
                    }
                }
    
            window.TMSEvent = {};
    
        } else {
            window.TMSHelper.console("[TMSProcessing.dataLayerSynchronizationOrchestrator] -> warning: TMSEvent or TMSConfig is not defined");
        }
    
        window.TMSHelper.console("[TMSProcessing.dataLayerSynchronizationOrchestrator] complete");
    } catch (err) {
        window.TMSHelper.console("[TMSProcessing.dataLayerSynchronizationOrchestrator] error:");
        window.TMSHelper.errorHandler(err);
    }
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1171 TMSProcessing.obfuscateParameters
// Issued by: Agnosticalyze
// version: 1.5, 2022-06-21
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// replaces email addresses found in predefined variables with generic value
window.TMSProcessing = window.TMSProcessing || {}; // remove this line if function is included inside a collection wrapper
window.TMSProcessing.obfuscateParameters = function (inputObject) {
    // remove this line for including function inside a collection wrapper
    // function obfuscateParameters(inputObject) {  // uncomment this line for including function inside a collection wrapper
    try {
        window.TMSHelper.console("[TMSProcessing.obfuscateParameters] start");
 
        if (typeof inputObject === "object") {
            if (
                (window.TMSConfig.tmsConfig_processing_obfuscate_maskEmail ||
                    window.TMSConfig
                        .tmsConfig_processing_obfuscate_maskUnknownParameters) &&
                typeof window.TMSConfig.tmsConfig_processing_obfuscate_varsToScan ===
                    "object" &&
                window.TMSConfig.tmsConfig_processing_obfuscate_varsToScan.length > 0
            ) {
                for (var v in window.TMSConfig
                    .tmsConfig_processing_obfuscate_varsToScan) {
                    v = window.TMSConfig.tmsConfig_processing_obfuscate_varsToScan[v];
                    if (typeof inputObject[v] === "undefined") {
                        // variable not present in inputObject
                        window.TMSHelper.console(
                            "[TMSProcessing.obfuscateParameters] info -> inputObject." +
                                v +
                                " is not defined"
                        );
                    } else {
                        window.TMSHelper.console(
                            "[TMSProcessing.obfuscateParameters] info -> masking inputObject." +
                                v
                        );
                        var varToMask = window.TMSHelper.decodeURI(inputObject[v]);
                        if (window.TMSConfig.tmsConfig_processing_obfuscate_maskEmail) {
                            inputObject[v] = window.TMSHelper.maskEmails(varToMask);
                        }
                        if (
                            window.TMSConfig
                                .tmsConfig_processing_obfuscate_maskUnknownParameters &&
                            !window.TMSConfig
                                .tmsConfig_processing_obfuscate_removeUnknownParameters
                        ) {
                            inputObject[v] =
                                window.TMSHelper.maskUnknownParameters(varToMask);
                        } else if (
                            window.TMSConfig
                                .tmsConfig_processing_obfuscate_removeUnknownParameters
                        ) {
                            inputObject[v] =
                                window.TMSHelper.removeUnknownParameters(varToMask);
                        }
                    }
                }
            } else {
                window.TMSHelper.console(
                    "[TMSProcessing.obfuscateParameters] warning -> TMSConfig.tmsConfig_processing_obfuscate_varsToScan is not defined or neither mask-flag set"
                );
            }
        } else {
            window.TMSHelper.console(
                "[TMSProcessing.obfuscateParameters] warning -> inputObject invalid"
            );
        }
 
        window.TMSHelper.console("[TMSProcessing.obfuscateParameters] complete");
    } catch (error) {
        TMSHelper.console("[TMSProcessing.obfuscateParameters] error: ");
        TMSHelper.errorHandler(error);
    }
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1201 Run TMSProcessing.TMSEventOrchestrator
// Issued by: Agnosticalyze
// version: 1.0, 2022-04-01
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

/*
window.TMSProcessing.runOrchestrator = function () {
    try {
        window.TMSHelper.console("[Run TMSProcessing.TMSEventOrchestrator] start");
            
        if (typeof window.TMSProcessing === "object") {
            if (typeof window.TMSProcessing.TMSEventOrchestrator === "function") {
                window.TMSProcessing.TMSEventOrchestrator();
            } else {
                window.TMSHelper.console("[Run TMSProcessing.TMSEventOrchestrator] -> warning: TMSProcessing.TMSEventOrchestrator not defined");
            }
        } else {
            window.TMSHelper.console("[Run TMSProcessing.TMSEventOrchestrator] -> warning: TMSProcessing not defined");
        }
            
        window.TMSHelper.console("[Run TMSProcessing.TMSEventOrchestrator] complete");
    } catch (err) {
        window.TMSHelper.console("[Run TMSProcessing.TMSEventOrchestrator] error:");
        window.TMSHelper.errorHandler(err);
    }
};
*/

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 4993 GTM trigger after processing
// Issued by: Agnosticalyze
// version: 1.0, 2021-03-13
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
   
window.TMSProcessing.gtmTriggerAfterProcessing = function () {
    try {
        window.TMSHelper.console("[GTM trigger after processing] start"); 
    
        if (typeof window.TMSEvent === "object" && typeof window.TMSEvent['event_eventInfo_type'] === "string" && window.TMSEvent['event_eventInfo_type'] !== "") {
     
                // GTM specific request
                if (window.TMSConfig['tmsConfig_tool_GTM_flag']) {
                 
                    // define pushFunction based on GTMs data layer name
                    var pushFunction = window.TMSHelper.getVarFromWindowScopedObject(window.TMSConfig['tmsConfig_udoName'], "push")
                     
                    if (typeof pushFunction === "function" && typeof window.google_tag_manager === "object") {
                        window.TMSHelper.console("[GTM trigger after processing] -> info: sending request to GTM");
                
                        try {
                            // push event to GTM
                            pushFunction({'event': window.TMSEvent['event_eventInfo_type']});
        
                            // flush GTM data layer to avoid persistence
                            // note: the function "reset" is always defined in the object "dataLayer" within the object "google_tag_manager[...]", regardless of the data layer name
                            // window.google_tag_manager[window.TMSHelper.getVarFromString(window.TMSConfig['tmsConfig_tool_GTM_src'], "id")].dataLayer.reset();
                        } catch (e) {
                            window.TMSHelper.console("[GTM trigger after processing] error:");
                            window.TMSHelper.errorHandler(e);
                        }
                    } else {
                        window.TMSHelper.console("[GTM trigger after processing] -> warning: invalid configuration of GTM");
                    }
                }
     
        } else {
            window.TMSHelper.console("[GTM trigger after processing] -> warning: event_eventInfo_type not defined");
        }
     
        window.TMSHelper.console("[GTM trigger after processing] complete");
    } catch (err) {
        window.TMSHelper.console("[GTM trigger after processing] error:");
        window.TMSHelper.errorHandler(err);
    }
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 4994 Run TMSProcessing.sendToParentWindow
// Issued by: Agnosticalyze
// version: 1.0, 2022-04-22
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

window.TMSProcessing.runSendToParentWindow = function () {
    try {
        window.TMSHelper.console("[Run TMSProcessing.sendToParentWindow] start");
            
        if (typeof window.TMSProcessing === "object") {
            if (typeof window.TMSProcessing.sendToParentWindow=== "function") {
                window.TMSProcessing.sendToParentWindow(window.TMSEvent);
            } else {
                window.TMSHelper.console("[Run TMSProcessing.sendToParentWindow] -> warning: TMSProcessing.sendToParentWindow not defined");
            }
        } else {
            window.TMSHelper.console("[Run TMSProcessing.sendToParentWindow] -> warning: TMSProcessing not defined");
        }
            
        window.TMSHelper.console("[Run TMSProcessing.sendToParentWindow] complete");
    } catch (err) {
        window.TMSHelper.console("[Run TMSProcessing.sendToParentWindow] error:");
        window.TMSHelper.errorHandler(err);
    }
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 4999 Run TMSProcessing.dataLayerSynchronizationOrchestrator
// Issued by: Agnosticalyze
// version: 1.0, 2022-04-01
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

window.TMSProcessing.runDataLayerSync = function () {
    try {
        window.TMSHelper.console("[Run TMSProcessing.dataLayerSynchronizationOrchestrator] start");
            
        if (typeof window.TMSProcessing === "object") {
            if (typeof window.TMSProcessing.dataLayerSynchronizationOrchestrator === "function") {
                window.TMSProcessing.dataLayerSynchronizationOrchestrator();
            } else {
                window.TMSHelper.console("[Run TMSProcessing.dataLayerSynchronizationOrchestrator] -> warning: TMSProcessing.dataLayerSynchronizationOrchestrator not defined");
            }
        } else {
            window.TMSHelper.console("[Run TMSProcessing.dataLayerSynchronizationOrchestrator] -> warning: TMSProcessing not defined");
        }
            
        window.TMSHelper.console("[Run TMSProcessing.dataLayerSynchronizationOrchestrator] complete");
    } catch (err) {
        window.TMSHelper.console("[Run TMSProcessing.dataLayerSynchronizationOrchestrator] error:");
        window.TMSHelper.errorHandler(err);
    }
};
