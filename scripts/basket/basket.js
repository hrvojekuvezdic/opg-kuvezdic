const basketList = document.getElementById("basketList");
const basketTotal = document.getElementById("basketTotal");

let cart = JSON.parse(localStorage.getItem("cart") || "[]");

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
    basketList.innerHTML = "";
    basketTotal.innerHTML = "";
    
    if (!cart.length) {
        basketList.innerHTML = "<p>Košarica je prazna.</p>";
        basketTotal.innerHTML = "<p>Ukupno: 0.00 EUR</p>";
        return;
    }

    let totalAmount = 0;

    cart.forEach((item, index) => {
        totalAmount += item.total;

        const itemDiv = document.createElement("div");
        itemDiv.className = "basket-list-item";
        itemDiv.innerHTML = `
            <img src="../images/products/${item.image}" alt="${item.name}">
            <div class="basket-list-item-text">
                <h2 class="item-highlight">${item.name}</h2>
                <p>Cijena: ${item.pricePerKg.toFixed(2)} EUR / kg</p>
                <label>
                    Količina (kg):
                    <input type="number"
                            class="basket-quantity-input"
                            min="0.5"
                            step="0.5"
                            value="${item.quantity}">
                </label>
                <p>Ukupno za proizvod: <span class="item-total">${item.total.toFixed(2)}</span> EUR</p>
                <div class="basket-list-item-buttons">
                    <p class="basket-list-item-remove">Ukloni</p>
                </div>
            </div>
            `;

        const quantityInput = itemDiv.querySelector(".basket-quantity-input");
        const itemTotalSpan = itemDiv.querySelector(".item-total");

        quantityInput.addEventListener("change", () => {
            const value = quantityInput.value.trim();

            const decimalNumberRegex = /^[0-9]*\.?[0-9]+$/;
            const isDecimal = decimalNumberRegex.test(value);
            if (!isDecimal) {
                alert("Količina smije sadržavati samo brojke i točku. (npr. 0.5, 1, 1.5, 2, ...)");
                quantityInput.value = item.quantity;
                return;
            }

            const newQuantity = parseFloat(value);
            if (!newQuantity || newQuantity <= 0) {
                alert("Unesite količinu veću od 0. (npr. 0.5, 1, 1.5, 2, ...)");
                quantityInput.value = item.quantity;
                return;
            }

            const halfStepRegex = /^(?:[1-9]\d*(?:\.0|\.5)?|0\.5)$/;
            const isHalfStep = halfStepRegex.test(value);
            if (!isHalfStep) {
                alert("Količina mora biti u koracima od 0.5 (npr. 0.5, 1, 1.5, 2, ...).");
                quantityInput.value = item.quantity;
                return;
            }

            cart[index].quantity = newQuantity;
            cart[index].total = newQuantity * cart[index].pricePerKg;
            saveCart();
            renderCart();
        });
        
        const removeButton = itemDiv.querySelector(".basket-list-item-remove");
        removeButton.addEventListener("click", () => {
            cart.splice(index, 1);
            saveCart();
            renderCart();
        });
      
        basketList.appendChild(itemDiv);
    });

    basketTotal.innerHTML =
        cart
            .map(
                (item) =>
                    `<p><span class="item-highlight">${item.name}</span> (${item.quantity} kg): ${item.total.toFixed(2)} EUR</p>`
            )
            .join("") +
        `<hr><p><span class="item-highlight">Ukupno</span>: ${totalAmount.toFixed(2)} EUR</p>
        <a href="../../pages/order.html" class="order-button">Naruči</a>`;
}

renderCart();
