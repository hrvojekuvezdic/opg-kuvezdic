let isShowing = false;

const popupButtons = document.querySelectorAll(".products-content-grid-item .popup-button");

popupButtons.forEach((popupButton) => {
    const popup = popupButton.querySelector(".popup");
    const acceptButton = popup.querySelector(".popup-accept");
    const rejectButton = popup.querySelector(".popup-reject");
    const quantityInput = popup.querySelector('input[type="number"]');

    popupButton.addEventListener("click", (e) => {
        if (e.target.closest(".popup")) return;

        document.querySelectorAll(".popup.show").forEach((p) => {
            if (p !== popup) p.classList.remove("show");
        });

        isShowing = !popup.classList.contains("show");
        popup.classList.toggle("show", isShowing);
    });

    popup.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    function hidePopup(e) {
        if (e) e.stopPropagation();
        isShowing = false;
        popup.classList.remove("show");
    }

    rejectButton.addEventListener("click", hidePopup);

    acceptButton.addEventListener("click", (e) => {
        e.stopPropagation();

        const quantity = parseFloat(quantityInput.value);
        
        const decimalNumberRegex = /^[0-9]*\.?[0-9]+$/;
        const isDecimal = decimalNumberRegex.test(quantity);
        if (!isDecimal) {
            alert("Količina smije sadržavati samo brojke i točku. (npr. 0.5, 1, 1.5, 2, ...)");
            return;
        }

        if (!quantity || quantity <= 0) {
            alert("Unesite količinu veću od 0. (npr. 0.5, 1, 1.5, 2, ...)");
            return;
        }

        const halfStepRegex = /^(?:[1-9]\d*(?:\.0|\.5)?|0\.5)$/;
        const isHalfStep = halfStepRegex.test(quantity);
        if (!isHalfStep) {
            alert("Količina mora biti u koracima od 0.5 (npr. 0.5, 1, 1.5, 2, ...).");
            return;
        }

        const productCard = popupButton.closest(".products-content-grid-item");
        const name = productCard.dataset.name;
        const pricePerKg = parseFloat(productCard.dataset.price);
        const image = productCard.dataset.img;
        const totalPrice = quantity * pricePerKg;

        let cart = JSON.parse(localStorage.getItem("cart") || "[]");

        cart.push({
            name: name,
            quantity: quantity,
            pricePerKg: pricePerKg,
            total: totalPrice,
            image: image
        });

        localStorage.setItem("cart", JSON.stringify(cart));

        hidePopup(e);
    });
});
