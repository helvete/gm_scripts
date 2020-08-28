// ==UserScript==
// @name        Skip seznam change password
// @namespace   Seznam
// @include     https://login.szn.cz/*
// @version     1
// @grant       none
// ==/UserScript==

(function() {
  to = window.setInterval(forward, 500);
   
  function forward(){
      var url = window.location.href;
      url = url.toString();
      var result = url.match(/weak-password/);
      if (result.length === 0) {
        return;
      }
      if (result[0] === 'weak-password') {
        //console.log('match');
        window.clearInterval(to);
        
        window.location.href = "/continue";            
      }
   }
  
})();