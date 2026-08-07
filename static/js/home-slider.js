// Home Slider Script
(() => {
    const slides = Array.from(document.querySelectorAll('#slider .slide'));
    const dots = Array.from(document.querySelectorAll('.slider-dots .dot'));
    let activeIndex = 0;
    let timer;

    if (!slides.length) return;

    const showSlide = (index) => {
        activeIndex = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle('active', slideIndex === activeIndex);
        });
        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('active', dotIndex === activeIndex);
            dot.setAttribute('aria-current', dotIndex === activeIndex ? 'true' : 'false');
        });
    };

    const restartTimer = () => {
        window.clearInterval(timer);
        timer = window.setInterval(() => showSlide(activeIndex + 1), 6000);
    };

    window.moveSlide = (step) => {
        showSlide(activeIndex + step);
        restartTimer();
    };

    window.currentSlide = (index) => {
        showSlide(index);
        restartTimer();
    };

    // Touch Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;
    const sliderContainer = document.querySelector('.slider-container');
    
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        sliderContainer.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        if (touchEndX < touchStartX - 40) window.moveSlide(1);
        if (touchEndX > touchStartX + 40) window.moveSlide(-1);
    }

    showSlide(0);
    restartTimer();
})();
