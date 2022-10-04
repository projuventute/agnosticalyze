try {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            var currentIp = JSON.parse(xmlHttp.responseText).ip;
            // console.log("current IP: " + currentIp);
            window.userIp = currentIp;
    }
    xmlHttp.open( "GET", "https://api.ipify.org?format=json", true ); // false for synchronous request
    xmlHttp.send( null );        
} catch (err) {
    console.error(err);
};