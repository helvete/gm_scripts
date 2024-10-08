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
            var patternJira = /^([A-Z0-9]{2,}-[0-9]+)[\n\t ]+([\s\S]*)$/g;
            var patternGithub = /^([a-zA-Z0-9'\(\)=:\/\n\r _-]+) #([0-9]+)[\s]{0,}$/g;
            var ta = textArea[0];
            ta.value = ta.value.replace(patternJira, '$1: $2').trimStart();
            ta.value = ta.value.replace(patternGithub, '$2: $1').trimStart();
        }
    }
})();

/**
 * Allow submitting 0 tracked time w/o starting timer

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
*/

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
    var patternAILinkBuilderProject = /^\[AYI(.)*$/g;
    var patternWokProject = /^\[EGD005(.)*$/g;
    var patternCasProject = /^\[TWH(.)*$/g;
    var patternMMCBProject = /^\[MCB(.)*$/g;


    var patternEonTicketCode01 = /^E24[A-Z0-9-]+: (.)*$/g;
    var patternEonTicketCode02 = /^AMM[A-Z0-9-]+: (.)*$/g;
    var patternEonTicketCode03 = /^SC[A-Z0-9-]+: (.)*$/g;
    var patternHcTicketCode01 = /^EKO-[0-9]+: (.)*$/g;
    var patternHcTicketCode02 = /^[0-9]+: (.)*$/g;
    var patternHcTicketCode03 = /^CLP-[0-9]+: (.)*$/g;
    var patternHcTicketCode04 = /^HRO-[0-9]+: (.)*$/g;
    var patternAitTicketCode = /^AIT00[0-9]{1}-[0-9]+: (.)*$/g;
    var patternDataliteTicketCode = /^EIP-[0-9]+: (.)*$/g;
    var patternRingLocalTicketCode = /^RNG[0-9]+-[0-9]+: (.)*$/g;
    var patternAgrobotTicketCode01 = /^TRS[0-9]+-[0-9]+: (.)*$/g;
    var patternAgrobotTicketCode02 = /^CIN-[0-9]+: (.)*$/g;
    var patternAgrobotTicketCode03 = /^WAP-[0-9]+: (.)*$/g;
    var patternAgrobotTicketCode04 = /^EP-[0-9]+: (.)*$/g;
    var patternMallRRTicketCode = /^RAD-[0-9]+: (.)*$/g;
    var patternAILinkBuilderTicketCode = /^AYI[0-9]+-[0-9]+: (.)*$/g;
    var patternWokTicketCode = /^WOK-[0-9]+: (.)*$/g;
    var patternCasTicketCode = /^TWH[0-9]+-[0-9]+: (.)*$/g;
    var patternMMCBTicketCode = /^MCB[0-9]+-[0-9]+: (.)*$/g;

    var rows = document.querySelectorAll('tr[id^=timesheet_day_entry_]');
    rows.forEach(function(row) {
        var projectEl = row.querySelectorAll('div.entry-project')[0];
        var project = projectEl.innerHTML;
        var msg = row.querySelectorAll('div.notes')[0].children[0].innerHTML;

        var ticketCodeMatch = false;
        [
            patternEonTicketCode01,
            patternEonTicketCode02,
            patternEonTicketCode03,
            patternHcTicketCode01,
            patternHcTicketCode02,
            patternHcTicketCode03,
            patternHcTicketCode04,
            patternAitTicketCode,
            patternDataliteTicketCode,
            patternRingLocalTicketCode,
            patternAgrobotTicketCode01,
            patternAgrobotTicketCode02,
            patternAgrobotTicketCode03,
            patternAgrobotTicketCode04,
            patternMallRRTicketCode,
            patternAILinkBuilderTicketCode,
            patternWokTicketCode,
            patternCasTicketCode,
            patternMMCBTicketCode
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
        if (msg.match(patternEonTicketCode01)
            || msg.match(patternEonTicketCode02)
            || msg.match(patternEonTicketCode03)
        ) {
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
        if (msg.match(patternAgrobotTicketCode01)
            || msg.match(patternAgrobotTicketCode02)
            || msg.match(patternAgrobotTicketCode03)
            || msg.match(patternAgrobotTicketCode04)
        ) {
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
        if (msg.match(patternAILinkBuilderTicketCode)) {
            if (project.match(patternAILinkBuilderProject)) {
                return;
            }
            projectEl.style.backgroundColor = '#f21c0a';
            return;
        }
        if (msg.match(patternWokTicketCode)) {
            if (project.match(patternWokProject)) {
                return;
            }
            projectEl.style.backgroundColor = '#f21c0a';
            return;
        }
        if (msg.match(patternCasTicketCode)) {
            if (project.match(patternCasProject)) {
                return;
            }
            projectEl.style.backgroundColor = '#f21c0a';
            return;
        }
        if (msg.match(patternMMCBTicketCode)) {
            if (project.match(patternMMCBProject)) {
                return;
            }
            projectEl.style.backgroundColor = '#f21c0a';
            return;
        }
    });
}

var xx = window.setInterval(highlightMissCat, 1000);
