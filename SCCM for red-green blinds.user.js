// ==UserScript==
// @name         SCCM Colorblind Helper (Improved)
// @namespace    https://rust.scmm.app/
// @version      1.1
// @description  Improves item visibility on rust.scmm.app for users with red-green color blindness.
// @author       Zuescho (zuescho.de) & Gemini
// @match        https://rust.scmm.app/inventory/*
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // State variable to track toggle status.
    let isColorblindMode = true;

    // --- Create Button and Legend ---
    const container = document.createElement('div');
    container.id = 'colorblind-helper-container';
    document.body.appendChild(container);

    const toggleButton = document.createElement('button');
    toggleButton.id = 'colorblind-toggle-button';
    toggleButton.textContent = 'Toggle Colors';
    container.appendChild(toggleButton);

    const legend = document.createElement('div');
    legend.id = 'colorblind-legend';
    legend.innerHTML = '<span>Yellow = You Own It</span>';
    container.appendChild(legend);

    // --- Functions ---
    function changeBackgroundColors() {
        if (!isColorblindMode) return;

        const elementsToChange = document.querySelectorAll('*[style*="background-color"]');
        elementsToChange.forEach(el => {
            const bgColor = el.style.backgroundColor;
            if (bgColor === 'rgba(183, 28, 28, 0.267)') {
                el.style.backgroundColor = 'white';
            } else if (bgColor === 'rgba(27, 94, 32, 0.267)') {
                el.style.backgroundColor = 'yellow';
            }
        });
    }

    function revertBackgroundColors() {
        const elementsToChange = document.querySelectorAll('*[style*="background-color"]');
        elementsToChange.forEach(el => {
            const bgColor = el.style.backgroundColor;
            if (bgColor === 'white') {
                el.style.backgroundColor = 'rgba(183, 28, 28, 0.267)';
            } else if (bgColor === 'yellow') {
                el.style.backgroundColor = 'rgba(27, 94, 32, 0.267)';
            }
        });
    }

    // --- Mutation Observer ---
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                changeBackgroundColors();
            }
        });
    });

    function startObserver() {
        observer.observe(document.body, { childList: true, subtree: true });
        changeBackgroundColors(); // Initial run
    }

    function stopObserver() {
        observer.disconnect();
        revertBackgroundColors();
    }


    // --- Event Listeners ---
    toggleButton.addEventListener('click', () => {
        isColorblindMode = !isColorblindMode;
        if (isColorblindMode) {
            startObserver();
            legend.style.display = 'block';
        } else {
            stopObserver();
            legend.style.display = 'none';
        }
    });

    // --- Styles ---
    GM_addStyle(`
        #colorblind-helper-container {
            position: fixed;
            top: 50px;
            right: 20px;
            z-index: 9999;
            background-color: orange;
            border: 3px outset black;
            padding: 10px;
            text-align: center;
        }
        #colorblind-toggle-button {
            cursor: pointer;
            width: 100%;
            padding: 5px;
            margin-bottom: 5px;
        }
        #colorblind-legend span {
            font-size: 14px;
            font-weight: bold;
            color: black;
        }
    `);

    // --- Initial Run ---
    startObserver();

})();