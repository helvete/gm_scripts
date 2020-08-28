// ==UserScript==
// @name        Slack login form Autofocus
// @namespace   Slack
// @include     https://*.slack.com/
// @version     1
// @grant       none
// ==/UserScript==
(function() {
  var to = window.setInterval(focus, 500);
   
  function focus(){
    var frm = document.getElementById('signin_form');
    frm.email.focus();
    window.clearInterval(to);
    console.log(to);
  }
})();