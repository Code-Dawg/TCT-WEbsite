// Category filtering for the menu page.
function initMenuFilters() {
    const tabs = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.menu-section');

    if (!sections.length) return;

    let activeCategory = 'all';

    function applyFilters() {
        sections.forEach((section) => {
            const categoryMatches = activeCategory === 'all'
                || section.dataset.category === activeCategory;
            let visibleItems = 0;

            section.querySelectorAll('.menu-card, .menu-item').forEach((item) => {
                const shouldShow = categoryMatches;

                item.classList.toggle('hidden', !shouldShow);
                if (shouldShow) visibleItems += 1;
            });

            section.classList.toggle('hidden', visibleItems === 0);
        });
    }

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            activeCategory = tab.dataset.category || 'all';
            tabs.forEach((button) => button.classList.toggle('active', button === tab));
            applyFilters();
        });
    });

    applyFilters();
}

// This works whether the script loads before or after DOMContentLoaded.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenuFilters);
} else {
    initMenuFilters();
}
