// ==UserScript==
// @name        Support Jira Eon
// @version     1
// @namespace   global
// @include     https://jiradigi.eon.cz/browse/M24S-*
// @grant    none
// ==/UserScript==

(function() {
    var to = window.setInterval(run, 1000);
    function run() {
        var textarea = document.getElementsByClassName('wiki-textfield mentionable wiki-editor-initialised');              
      	console.log('running');
        if (textarea.length) {
            for (var el in textarea) {
                var current = textarea[el];
                current.value = 'Zpracovanim tohoto ticketu jsme se prave zacali zabyvat.'; 
                window.clearInterval(to);
            }

        }
    }                                                                              
})();