// ==UserScript==
// @name        Jira cloud detail
// @namespace   Atlassian
// @include     https://*.atlassian.net/browse/*
// @version     1
// @grant       none
// ==/UserScript==

(function() {
    var ticker = window.setInterval(ticketdetail, 1000);
    function ticketdetail() {
        var rightblockz = document.getElementsByClassName('zredB');
        if (rightblockz.length) {
            var rightblock = rightblockz[0];
            rightblock.style.width = '0%';
            rightblock.style.paddingRight = '0';
            window.clearInterval(ticker);
            console.log('right-pane collapsed')
        } else {
            console.log("slow render?");
        }
    }
})();
