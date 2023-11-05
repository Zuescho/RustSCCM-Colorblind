// ==UserScript==
// @name         SCCM for red/green blinds
// @namespace    https://rust.scmm.app/inventory/*
// @version      0.3
// @description  Toggle display of items based on ownership status
// @author       Zuescho (zuescho.de)
// @match        https://rust.scmm.app/inventory/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // State variable to track toggle status
    var toggleState = false;

    // Create a button in a container div and add it to the body
    var zNode = document.createElement('div');
    zNode.innerHTML = '<button id="myButton" type="button">Toggle Item Display</button>';
    zNode.setAttribute('id', 'myContainer');
    document.body.appendChild(zNode);

    // Button click action
    document.getElementById("myButton").addEventListener("click", () => {
        // Toggle the state
        toggleState = !toggleState;
        // Apply color changes based on the toggle state
        changeBackgroundColors(toggleState);
    }, false);

    // Change background colors based on specific conditions
    function changeBackgroundColors(applyChanges) {
        const elementsToChange = document.querySelectorAll('*');
        elementsToChange.forEach(el => {
            const bgColor = getComputedStyle(el).backgroundColor;
            // Toggle color changes
            if (applyChanges) {
                if (bgColor === 'rgba(183, 28, 28, 0.267)') {
                    el.style.backgroundColor = 'white';
                } else if (bgColor === 'rgba(27, 94, 32, 0.267)') {
                    el.style.backgroundColor = 'yellow';
                }
            } else {
                // Revert to original colors
                if (bgColor === 'white' || bgColor === 'yellow') {
                    el.style.backgroundColor = '';
                }
            }
        });
    }

    // Observe DOM changes and apply background color changes if the toggle is active
    const observer = new MutationObserver(() => {
        if (toggleState) {
            changeBackgroundColors(true);
        }
    });
    observer.observe(document, { childList: true, subtree: true });

    // Add custom styles
    GM_addStyle(`
        #myContainer {
            position: fixed;
            top: 50px;
            right: 20px;
            font-size: 20px;
            background: orange;
            border: 3px outset black;
            margin: 5px;
            opacity: 0.9;
            z-index: 1100;
            padding: 5px 20px;
        }
        #myButton {
            cursor: pointer;
        }
    `);
})();
