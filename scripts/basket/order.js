const modal = document.getElementById("modal");
const openBtn = document.getElementById("open-modal");
const closeBtn = document.getElementById("close-modal");
const forms = document.querySelectorAll('#modal .order-container');

openBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
        if (!form.checkValidity()) {
            e.preventDefault();
            form.reportValidity();
            return;
        }

        e.preventDefault();

        if (form.id === "order-form") {
            alert("Hvala na narudžbi! Kontaktirat ćemo vas uskoro.");
            cart = [];
            saveCart();
            renderCart();
        } else if (form.id === "question-form") {
            alert("Hvala na upitu! Javimo vam se u najkraćem roku.");
            form.reset();
        }

        modal.style.display = "none";
    });
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
