// ==UserScript==
// @name     Cancel JIRA esc evt binding
// @include     https://argo22.atlassian.net/*
// @include     https://jiradigi.eon.cz/*
// @version  2
// @grant    none
// ==/UserScript==
document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        alert('Esc key pressed detected - aborting!');
      	return false;
    }
};