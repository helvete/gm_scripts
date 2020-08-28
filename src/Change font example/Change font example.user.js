// ==UserScript==
// @name        Change font example
// @namespace   fonts
// @include     https://www.google.com/
// @version     1
// @grant       none
// ==/UserScript==
(function() {
  document.body.style.background = "#000";
  document.getElementById('footer').style.display = 'none';
  var elementsToHide = document.getElementsByClassName('sfbg');
  for (var i=0, len=elementsToHide.length|0; i < len; i++) {
    elementsToHide[i].style.display = 'none';
  }
  /*
  var css = '\
  	@import url(http://fonts.googleapis.com/css?family=Open+Sans); \
		html, body { font-family: \'Open Sans\', sans-serif; } \
  ';
  
  var css = '\
  	@import url(https://fonts.googleapis.com/css?family=Indie+Flower); \
		html, body { font-family: \'Indie Flower\', sans-serif; } \
  ';
  

  var style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));
  document.getElementsByTagName('head')[0].appendChild(style);
  */
})();
