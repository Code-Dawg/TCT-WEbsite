// Global JS for The Cutting Tea Website
document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initBackToTop();
    initDefaultDates();
});

// Sticky Header elevation on scroll
function initHeaderScroll() {
    const header = document.getElementById('mainHeader');
    if (!header) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile Nav Toggle
function toggleMobileNav() {
    const drawer = document.getElementById('mobileNavDrawer');
    const overlay = document.getElementById('mobileNavOverlay');
    const btn = document.getElementById('mobileNavToggle');
    if (drawer && overlay) {
        drawer.classList.toggle('open');
        overlay.classList.toggle('open');
        if (btn) btn.classList.toggle('active');
    }
}

// Pickup order modal functions
function openOrderModal(e, dishName = '') {
    if (e && e.preventDefault) e.preventDefault();
    const modal = document.getElementById('reservationModal');
    if (!modal) return;
    
    const notesInput = document.getElementById('resNotes');
    if (dishName && notesInput) {
        notesInput.value = dishName;
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
    const modal = document.getElementById('reservationModal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function handleOrderSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('resName').value;
    const phone = document.getElementById('resPhone').value;
    const branch = document.getElementById('resBranch').value;
    const quantity = document.getElementById('resQuantity').value;
    const date = document.getElementById('resDate').value;
    const time = document.getElementById('resTime').value;
    const order = document.getElementById('resNotes').value;

    const message = [
        'Hello The Cutting Tea! I would like to place a pickup order.',
        '',
        `Name: ${name}`,
        `Phone / WhatsApp: ${phone}`,
        `Outlet: ${branch}`,
        `Pickup: ${date} at ${time}`,
        `Quantity: ${quantity}`,
        `Order: ${order}`,
    ].join('\n');

    window.open(`https://wa.me/9779819120024?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    closeOrderModal();
    showToast(`Thanks ${name}! Your pickup order is ready to send on WhatsApp.`, 'success');
}

// Kept as aliases so any existing menu buttons continue to work.
function openReservationModal(e, dishName = '') { openOrderModal(e, dishName); }
function closeReservationModal() { closeOrderModal(); }
function handleReservationSubmit(e) { handleOrderSubmit(e); }

// Newsletter Submit
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const input = e.target.querySelector('input');
    if (input && input.value) {
        showToast(`☕ Thank you for subscribing! Secret menu perks are heading to ${input.value}.`, 'success');
        input.value = '';
    }
}

// Toast Notifications
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">${message}</div>
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// Back to top scroll
function initBackToTop() {
    const btn = document.getElementById('backToTopBtn');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Default Date helper
function initDefaultDates() {
    const dateInput = document.getElementById('resDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
        dateInput.min = today;
    }
}
