// ==UserScript==
// @name        Jira cloud detail
// @namespace   Atlassian
// @include     https://*.atlassian.net/browse/*
// @version     1
// @grant       none
// ==/UserScript==

(function() {
    function getRightColEl() {
        var stor;
        document.querySelectorAll('[data-test-id]').forEach(function (el) {
            if (el.dataset.testId == 'issue.views.issue-details.issue-layout.right-most-column') {
                stor = el.parentNode;
            }
        });
        if (stor) {
            return stor;
        }
        document.querySelectorAll('[data-testid]').forEach(function (el) {
            if (el.dataset.testid == 'issue.views.issue-details.issue-layout.right-most-column') {
                stor = el.parentNode;
            }
        });
        return stor;
    }

    var ticker = window.setInterval(ticketdetail, 1000);
    function ticketdetail(){
        var rightblock = getRightColEl();
        if (rightblock != null) {
            rightblock.style.width = '0%';
            rightblock.style.paddingRight = '0';
            rightblock.style.flex = 'unset';
            window.clearInterval(ticker);
            console.log('right-pane collapsed')
        } else {
            console.log("slow render?");
        }
    }
})();
