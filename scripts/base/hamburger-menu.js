var pages = document.getElementById("pages");

function toggleHamburger() {
    pages.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', function() {
    var hamburger = document.querySelector('.hamburger');
    hamburger.addEventListener('click', toggleHamburger);
});