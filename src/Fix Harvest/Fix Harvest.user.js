// ==UserScript==
// @name        Fix Harvest
// @version     1
// @namespace   global
// @include     https://argo22.harvestapp.com/*
// @grant    none
// ==/UserScript==

/**
 * Reformat record detail to ^<ticket-code>: <ticket-message>$
 * Allow simple copy paste from jira/github ticket detail
 */
(function() {
    var to = window.setInterval(run, 1000);
    function run() {
        var preEl = document.getElementsByClassName('pds-dialog-open');
        if (preEl.length) {
            var textArea = document.getElementsByClassName('pds-input entry-notes');
            var patternJira = /([A-Z0-9]{2,}-[0-9]+)[\n\t ]+([\s\S]*)$/g;
            var patternGithub = /^([a-zA-Z0-9'\(\)=:\/\n\r _-]+) #([0-9]+)[\s]{0,}$/g;
            for (var el in textArea) {
                var current = textArea[el];
                // reconvert payload to be inline in a format like `TICKET-1234: yada yada` (copy&paste from JIRA board/ticket detail)
                current.value = current.value.replace(patternJira, '$1: $2').trimStart();
                // reconvert payload to `1234: yada yada` from smth like `yada yada #1234` (copy&paste from Github)
                current.value = current.value.replace(patternGithub, '$2: $1').trimStart();
            }
        }
    }
})();

/**
 * Allow submitting 0 tracked time w/o starting timer
 */
var tt = window.setInterval(
    function() {
        var runningButt = document.getElementsByClassName('pds-button-running');
        if (runningButt.length) {
            for (var rb in runningButt) {
                var it = runningButt[rb];
                it.click();
                break;
            }
        }
    },
    30
);

/**
 * Highligh tracking records with discrepancies:
 *  - missing ticket code (WARNING)
 *  - ticket code present, but tracked under wrong project (CRITICAL)
 * Also whitelist Argo projects not to warn about missing ticket codes
 */
function highlightMissCat() {
    var patternEonProject = /^\[EON(.)*$/g;
    var patternHcProject = /^\[HCI(.)*$/g;
    var patternArgoProject = /^\[ARG(.)*$/g;
    var patternAitProject = /^\[AIT(.)*$/g;
    var patternDataliteProject = /^\[DTL(.)*$/g;
    var patternAgrobotProject = /^\[TRS(.)*$/g;
    var patternRingLocalProject = /^\[RNG(.)*$/g;
    var patternMallRRProject = /^\[MGR(.)*$/g;

    var patternEonTicketCode = /^E24S[A-Z0-9-]+: (.)*$/g;
    var patternHcTicketCode01 = /^EKO-[0-9]+: (.)*$/g;
    var patternHcTicketCode02 = /^[0-9]+: (.)*$/g;
    var patternHcTicketCode03 = /^CLP-[0-9]+: (.)*$/g;
    var patternHcTicketCode04 = /^HRO-[0-9]+: (.)*$/g;
    var patternAitTicketCode = /^AIT00[0-9]{1}-[0-9]+: (.)*$/g;
    var patternDataliteTicketCode = /^EIP-[0-9]+: (.)*$/g;
    var patternRingLocalTicketCode = /^RNG[0-9]+-[0-9]+: (.)*$/g;
    var patternAgrobotTicketCode = /^TRS[0-9]+-[0-9]+: (.)*$/g;
    var patternMallRRTicketCode = /^RAD-[0-9]+: (.)*$/g;

    var rows = document.querySelectorAll('tr[id^=timesheet_day_entry_]');
    rows.forEach(function(row) {
        var projectEl = row.querySelectorAll('div.entry-project')[0];
        var project = projectEl.innerHTML;
        var msg = row.querySelectorAll('div.notes')[0].children[0].innerHTML;

        var ticketCodeMatch = false;
        [
            patternEonTicketCode,
            patternHcTicketCode01,
            patternHcTicketCode02,
            patternHcTicketCode03,
            patternHcTicketCode04,
            patternAitTicketCode,
            patternDataliteTicketCode,
            patternRingLocalTicketCode,
            patternAgrobotTicketCode,
            patternMallRRTicketCode
        ].forEach(function(pattern) {
            if (msg.match(pattern)) {
                ticketCodeMatch = true;
                return;
            }
        });

        if (!ticketCodeMatch) {
            if (!project.match(patternArgoProject)) {
                projectEl.style.backgroundColor = '#b8e1ef';
            }
            return;
        }
        if (msg.match(patternEonTicketCode)) {
            if (project.match(patternEonProject)) {
                return;
            }
            projectEl.style.backgroundColor = '#f21c0a';
            return;
        }
        if (msg.match(patternHcTicketCode01)
            || msg.match(patternHcTicketCode02)
            || msg.match(patternHcTicketCode03)
            || msg.match(patternHcTicketCode04)
        ) {
            if (project.match(patternHcProject)) {
                return;
            }
            projectEl.style.backgroundColor = '#f21c0a';
            return;
        }
        if (msg.match(patternAitTicketCode)) {
            if (project.match(patternAitProject)) {
                return;
            }
            projectEl.style.backgroundColor = '#f21c0a';
            return;
        }
        if (msg.match(patternDataliteTicketCode)) {
            if (project.match(patternDataliteProject)) {
                return;
            }
            projectEl.style.backgroundColor = '#f21c0a';
            return;
        }
        if (msg.match(patternAgrobotTicketCode)) {
            if (project.match(patternAgrobotProject)) {
                return;
            }
            projectEl.style.backgroundColor = '#f21c0a';
            return;
        }
        if (msg.match(patternRingLocalTicketCode)) {
            if (project.match(patternRingLocalProject)) {
                return;
            }
            projectEl.style.backgroundColor = '#f21c0a';
            return;
        }
        if (msg.match(patternMallRRTicketCode)) {
            if (project.match(patternMallRRProject)) {
                return;
            }
            projectEl.style.backgroundColor = '#f21c0a';
            return;
        }
    });
}

var xx = window.setInterval(highlightMissCat, 1000);
