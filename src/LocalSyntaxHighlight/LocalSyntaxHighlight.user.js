// ==UserScript==
// @name        LocalSyntaxHighlight
// @namespace   global
// @include     https://argo22.slack.com/messages/*
// @version     1
// @grant       none
// @require     https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js
// ==/UserScript==

(function() {                                                                   
    var to = window.setInterval(run, 500);                                          
    function run() {                                                               
        var preEl = document.getElementsByClassName('c-mrkdwn__pre');              
        if (preEl.length) {
            for (var el in preEl) {
                var current = preEl[el];
                if (!current.classList.contains('prettyprint')) {
                    current.classList.add('prettyprint');
                    //prettyPrint();
                }
            }

        }                                                                          
                                                   
    }                                                                              
})();

/*
https://gist.github.com/jolij/ee34649c8f0265feceb3
*/