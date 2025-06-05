document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');

    function switchTab(selectedTab) {
        tabs.forEach(tab => {
            const isSelected = tab === selectedTab;
            tab.classList.toggle('active', isSelected);
            tab.setAttribute('aria-selected', isSelected);

            const controlsPanelId = tab.getAttribute('aria-controls');
            const controlledPanel = document.getElementById(controlsPanelId);
            if (controlledPanel) {
                controlledPanel.classList.toggle('hidden', !isSelected);
            }
        });

        // Optional: URL Sync (Example using hash)
        // window.location.hash = selectedTab.id.replace('-tab', '');
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab);
        });

        tab.addEventListener('keydown', (event) => {
            let currentTab = event.target;
            let newTab;

            if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                newTab = currentTab.nextElementSibling || tabs[0];
                event.preventDefault(); // Prevent page scrolling
            } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                newTab = currentTab.previousElementSibling || tabs[tabs.length - 1];
                event.preventDefault(); // Prevent page scrolling
            } else if (event.key === 'Enter' || event.key === ' ') {
                switchTab(currentTab);
                event.preventDefault();
            }

            if (newTab) {
                newTab.focus();
                // Optionally switch tab on arrow key navigation immediately
                // switchTab(newTab);
            }
        });
    });

    // Ensure the initially active tab's panel is visible
    const initiallyActiveTab = document.querySelector('.tab-button.active');
    if (initiallyActiveTab) {
        switchTab(initiallyActiveTab);
    } else if (tabs.length > 0) {
        switchTab(tabs[0]); // Default to the first tab if none are marked active
    }
});