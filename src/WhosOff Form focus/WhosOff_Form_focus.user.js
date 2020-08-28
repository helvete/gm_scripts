// ==UserScript==
// @name        WhosOff Form focus
// @namespace   Whosoff
// @include     https://staff.whosoff.com/login/*
// @version     1
// @grant       none
// ==/UserScript==
(function() {
    var form = document.getElementById('form1');
    form.emlContact.focus();
})();