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
        timer = window.setInterval(() => showSlide(activeIndex + 1), 5500);
    };

    window.moveSlide = (step) => {
        showSlide(activeIndex + step);
        restartTimer();
    };

    window.currentSlide = (index) => {
        showSlide(index);
        restartTimer();
    };

    showSlide(0);
    restartTimer();
})();
