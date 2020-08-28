// ==UserScript==
// @name        Fix atlassian-crap-appz
// @namespace   Atlassian
// @include     https://argo22.atlassian.net/login*
// @version     1
// @grant       none
// ==/UserScript==
(function() {
  var to = window.setTimeout(focus, 500);
   
  function focus(){
    var err400 = document.getElementsByClassName(/*'aid-error aid-error-400'*/'aui-page-focused aui-page-focused-xsmall aui-page-size-xsmall aid-page-minimal');
    if (err400.length) {
    		window.history.back();
    }
    window.clearInterval(to);
    console.log(to);
  }
})();