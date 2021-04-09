// ==UserScript==
// @name        Google background, footer and focus.
// @namespace   fonts
// @include     https://www.google.com/
// @version     1
// @grant       none
// ==/UserScript==
(function() {
    document.body.style.background = "#000";
    document.getElementsByClassName('uU7dJb')[0].style.display = 'none';
    document.getElementsByClassName('KxwPGc')[0].style.display = 'none';
    document.getElementsByClassName('gLFyf')[0].focus();
})();
