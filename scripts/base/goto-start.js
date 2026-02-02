const gotoStart = document.getElementById('gotoStart');

window.addEventListener('scroll', () => {
    if (!gotoStart) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight
        - document.documentElement.clientHeight;

    const scrolledRatio = docHeight > 0 ? scrollTop / docHeight : 0;

    if (scrolledRatio > 0.2) {
        gotoStart.style.display = 'block';
    }
    else {
        gotoStart.style.display = 'none';
    }
});