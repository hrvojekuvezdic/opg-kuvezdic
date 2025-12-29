const gotoStart = document.getElementById('gotoStart');

window.addEventListener('scroll', () => {
    if (!gotoStart) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

    const scrolledRatio = docHeight > 0 ? scrollTop / docHeight : 0;

    if (scrolledRatio > 0.2) {
        gotoStart.style.display = 'block';
    }
    else {
        gotoStart.style.display = 'none';
    }
});

if (window.innerWidth <= 1024) {
    document.querySelector('main').removeAttribute('id');
    document.querySelector('.navigation-container-mobile').id = 'start';
} else {
    document.querySelector('main').id = 'start';
    document.querySelector('.navigation-container-mobile').removeAttribute('id');
}
