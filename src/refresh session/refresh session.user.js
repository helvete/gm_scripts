// ==UserScript==
// @name        refresh session
// @match       https://energie24.eon.cz/e24/*
// @grant       GM_xmlhttpRequest
// ==/UserScript==

function refresh() {
  console.log ("running!!");
  
    var xhr = new Object();

    xhr = new XMLHttpRequest();
                    
    xhr.open("GET",'https://energie24.eon.cz/e24/api/hdo/autocomplete/a/a1',true);
    xhr.responseType = "arraybuffer";
    xhr.timeout = 2000;
    xhr.onload = function (responseDetails) {
                            console.log (
                                "GM_xmlhttpRequest() response is:\n",
                                responseDetails.responseText.substring (0, 80) + '...'
                            );
      }
                    
    xhr.send();
}

window.setInterval(refresh, 2000)