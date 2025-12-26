const modal = document.getElementById("modal");
const openBtn = document.getElementById("open-modal");
const closeBtn = document.getElementById("close-modal");
const form = document.querySelector('#modal .order-container');

openBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

form.addEventListener("submit", (e) => {
    if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
        return;
    }

    e.preventDefault();

    alert("Hvala na narudžbi! Kontaktirat ćemo vas uskoro.");
    cart = [];
    saveCart();
    renderCart();
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});