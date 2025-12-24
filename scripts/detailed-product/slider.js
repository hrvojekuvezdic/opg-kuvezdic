const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const previousButton = document.getElementById('previousButton');
const nextButton = document.getElementById('nextButton');

let currentIndex = 0;

function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;

    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIndex);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

previousButton.addEventListener('click', () => {
    showSlide(currentIndex - 1);
});

nextButton.addEventListener('click', () => {
    showSlide(currentIndex + 1);
});

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        showSlide(index);
    });
});

showSlide(0);