
document.addEventListener('DOMContentLoaded', function () {
    const accordionContainer = document.getElementById('myNewsAccordion');
    if (!accordionContainer) return;

    const headers = accordionContainer.querySelectorAll('.accordion-header');

    // 固定內容區域展開時的總高度 (包含內容文字及垂直 padding)
    // 例如：預期顯示約 5-6 行文字 (每行約 1.6 * 15px = 24px) => 6 * 24px = 144px
    // 加上垂直 padding (15px top + 20px bottom = 35px) => 144px + 35px = 179px
    // 實際值應根據設計調整
    const fixedMaxHeightWhenOpen = '180px';

    function openPanel(header, content) {
        header.setAttribute('aria-expanded', 'true');
        content.removeAttribute('hidden');
        content.style.maxHeight = fixedMaxHeightWhenOpen;
    }

    function closePanel(header, content) {
        header.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = '0px';
        // Optional: Re-add 'hidden' after transition for semantics, though not strictly necessary for visual hiding
        // content.addEventListener('transitionend', () => {
        //     if (header.getAttribute('aria-expanded') === 'false') {
        //         content.setAttribute('hidden', '');
        //     }
        // }, { once: true });
    }

    // Initialize accordion states based on aria-expanded
    headers.forEach(header => {
        const contentId = header.getAttribute('aria-controls');
        const content = document.getElementById(contentId);
        if (!content) return;

        if (header.getAttribute('aria-expanded') === 'true') {
            openPanel(header, content);
        } else {
            // Ensure initially closed panels have max-height 0.
            // The 'hidden' attribute should already be on these from HTML.
            content.style.maxHeight = '0px';
        }
    });

    headers.forEach(header => {
        header.addEventListener('click', function () {
            const currentContentId = this.getAttribute('aria-controls');
            const currentContent = document.getElementById(currentContentId);
            if (!currentContent) return;

            const isCurrentlyExpanded = this.getAttribute('aria-expanded') === 'true';

            if (!isCurrentlyExpanded) { // If this panel is about to open
                // Close all other panels
                headers.forEach(otherHeader => {
                    if (otherHeader !== this) {
                        const otherContentId = otherHeader.getAttribute('aria-controls');
                        const otherContent = document.getElementById(otherContentId);
                        if (otherContent && otherHeader.getAttribute('aria-expanded') === 'true') {
                            closePanel(otherHeader, otherContent);
                        }
                    }
                });
                // Open the current panel
                openPanel(this, currentContent);
            } else { // If this panel is about to close
                closePanel(this, currentContent);
            }
        });
    });
});