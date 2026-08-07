// Menu Filtering & Live Search Script
document.addEventListener('DOMContentLoaded', () => {
    initMenuFilters();
    document.querySelectorAll('.btn-order-item').forEach(button => {
        button.textContent = 'Order for Pickup';
    });
});

let currentCategory = 'all';
let currentDiet = 'all';
let searchQuery = '';

function initMenuFilters() {
    const input = document.getElementById('menuSearchInput');
    if (input) {
        input.addEventListener('input', e => {
            searchQuery = e.target.value.toLowerCase().trim();
            const clearBtn = document.getElementById('clearSearchBtn');
            if (clearBtn) {
                clearBtn.classList.toggle('visible', searchQuery.length > 0);
            }
            applyAllFilters();
        });
    }
}

function clearMenuSearch() {
    const input = document.getElementById('menuSearchInput');
    const clearBtn = document.getElementById('clearSearchBtn');
    if (input) {
        input.value = '';
        searchQuery = '';
    }
    if (clearBtn) clearBtn.classList.remove('visible');
    applyAllFilters();
}

function selectCategory(category, element) {
    currentCategory = category;
    
    // Update active tab buttons
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(btn => btn.classList.remove('active'));
    if (element) element.classList.add('active');

    // Scroll to section if specific category selected
    if (category !== 'all') {
        const targetSec = document.getElementById(category);
        if (targetSec) {
            targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    applyAllFilters();
}

function applyDietFilter(filter, element) {
    currentDiet = filter;

    // Update active chip buttons
    const chips = document.querySelectorAll('.chip-btn');
    chips.forEach(btn => btn.classList.remove('active'));
    if (element) element.classList.add('active');

    applyAllFilters();
}

function applyAllFilters() {
    const sections = document.querySelectorAll('.menu-section');

    sections.forEach(section => {
        const sectionCategory = section.getAttribute('data-section');
        const cards = section.querySelectorAll('.menu-card');
        let visibleCountInSection = 0;

        // Check if section matches category filter
        const categoryMatch = (currentCategory === 'all' || currentCategory === sectionCategory);

        cards.forEach(card => {
            const nameText = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
            const descText = card.querySelector('.description') ? card.querySelector('.description').textContent.toLowerCase() : '';
            const cardDiet = card.getAttribute('data-diet') || '';
            const isBestseller = card.getAttribute('data-bestseller') === 'true';

            // Search query match
            const searchMatch = !searchQuery || nameText.includes(searchQuery) || descText.includes(searchQuery);

            // Diet filter match
            let dietMatch = true;
            if (currentDiet === 'veg') dietMatch = (cardDiet === 'veg');
            else if (currentDiet === 'nonveg') dietMatch = (cardDiet === 'nonveg');
            else if (currentDiet === 'bestseller') dietMatch = isBestseller;

            const isVisible = categoryMatch && searchMatch && dietMatch;
            card.classList.toggle('hidden', !isVisible);

            if (isVisible) visibleCountInSection++;
        });

        // Hide entire section if no cards visible in it
        section.classList.toggle('hidden', visibleCountInSection === 0);
    });
}
