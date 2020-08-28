// ==UserScript==
// @name        BitBucket login form Autofocus
// @namespace   Bitbucket
// @include     https://bitbucket.org/account/signin/*
// @version     1
// @grant       none
// ==/UserScript==
(function() {
  var to = window.setInterval(focus, 500);
   
  function focus(){
    var login = document.getElementById('js-email-field');
    login.focus();
    window.clearInterval(to);
    console.log(to);
  }
})();