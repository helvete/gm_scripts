// ==UserScript==
// @name            Skip Slack dialogues
// @version         1
// @namespace       global
// @include         https://argo22.slack.com/ssb/redirect*
// @include         https://app.slack.com/client/*
// @grant           none
// ==/UserScript==
(function() {
    var to = window.setInterval(run, 500);
    function run() {
        var linkContainers = document.getElementsByClassName('p-ssb_redirect__loading_messages');
        if (linkContainers.length) {
            var link = linkContainers[0].getElementsByClassName('c-link');
            location.href = link[0].getAttribute("href") + 'messages';
            window.clearInterval(to);
        }
    }
    var kokoti = window.setInterval(dumbSlack, 500);
    function dumbSlack() {
        var links = document.getElementsByClassName('p-download_modal__close-icon');
        if (links.length) {
            links[0].click();
            window.clearInterval(kokoti);
        }
    }
})();
