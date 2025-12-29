function myFunction() {
    var pages = document.getElementById("pages");
    pages.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', function() {
    var hamburger = document.querySelector('.hamburger');
    hamburger.addEventListener('click', myFunction);
});