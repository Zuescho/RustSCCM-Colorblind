// ==UserScript==
// @name         SCCM Colorblind Helper (Refactored)
// @namespace    https://rust.scmm.app/
// @version      2.0
// @description  Improves item visibility on rust.scmm.app for users with red-green color blindness.
// @author       Zuescho (zuescho.de), Gemini, & Jules
// @match        https://rust.scmm.app/inventory/*
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // --- Styles ---
    // Inject all CSS rules for the UI and color overrides at once.
    GM_addStyle(`
        /* UI container for the button and legend */
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

        /* Toggle button style */
        #colorblind-toggle-button {
            cursor: pointer;
            width: 100%;
            padding: 5px;
            margin-bottom: 5px;
        }

        /* Legend style */
        #colorblind-legend span {
            font-size: 14px;
            font-weight: bold;
            color: black;
        }

        /*
         * CSS Overrides for colorblind mode.
         * These rules are applied only when the 'colorblind-mode-active' class is on the body.
         * The !important flag ensures they take precedence over the website's inline styles.
        */

        /* Unowned items (originally red) become white */
        .colorblind-mode-active [style*="background-color: rgba(183, 28, 28, 0.267)"] {
            background-color: white !important;
        }

        /* Owned items (originally green) become yellow */
        .colorblind-mode-active [style*="background-color: rgba(27, 94, 32, 0.267)"] {
            background-color: yellow !important;
        }
    `);

    // Function to create and inject the UI elements.
    function setupUI() {
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

        // --- Event Listener ---
        toggleButton.addEventListener('click', () => {
            // Toggle the active class on the body.
            const isActive = document.body.classList.toggle('colorblind-mode-active');
            // Show or hide the legend based on the mode.
            legend.style.display = isActive ? 'block' : 'none';
        });

        // --- Initial State ---
        // Start with colorblind mode active by default.
        document.body.classList.add('colorblind-mode-active');
        legend.style.display = 'block';
    }

    // --- Initialization ---
    // Wait for the window to fully load before setting up the UI.
    // This helps prevent issues where the script runs before the page is fully ready.
    if (document.readyState === 'complete') {
        setupUI();
    } else {
        window.addEventListener('load', setupUI);
    }

})();