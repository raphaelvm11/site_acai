let cart = [];

function openProduct(name, price, description, image, extras) {
    document.getElementById("product-title").innerText = name;
    document.getElementById("product-description").innerText = description;
    document.getElementById("product-image").src = image;

    let extrasContainer = document.getElementById("extras-container");
    extrasContainer.innerHTML = "";

    extras.forEach(extra => {
        let label = document.createElement("label");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = extra;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(" " + extra));
        extrasContainer.appendChild(label);
    });

    document.getElementById("product-page").classList.remove("hidden");
    document.querySelector(".container").classList.add("hidden");

    // Armazenar nome e preço do produto para uso posterior
    document.getElementById("product-page").setAttribute("data-name", name);
    document.getElementById("product-page").setAttribute("data-price", price);
}

function addToCart() {
    const productTitle = document.getElementById("product-page").getAttribute("data-name");
    const productPrice = parseFloat(document.getElementById("product-page").getAttribute("data-price"));
    let extras = [];

    const extrasContainer = document.getElementById("extras-container");
    const selectedExtras = extrasContainer.querySelectorAll("input[type='checkbox']:checked");
    selectedExtras.forEach(extra => {
        extras.push(extra.value);
    });

    cart.push({
        name: productTitle,
        price: productPrice,
        extras: extras
    });

    updateCartCount();
    goBack();
}

function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.length;
}

function openCart() {
    document.getElementById("cart-page").classList.remove("hidden");
    document.getElementById("product-page").classList.add("hidden");
    document.querySelector(".container").classList.add("hidden");

    let cartList = document.getElementById("cart-items");
    cartList.innerHTML = "";

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerText = `${item.name} - R$ ${item.price.toFixed(2)} - Extras: ${item.extras.join(", ") || "Nenhum"}`;

        let removeButton = document.createElement("button");
        removeButton.innerText = "Remover";
        removeButton.onclick = () => removeFromCart(index);
        li.appendChild(removeButton);

        cartList.appendChild(li);
    });

    checkFields();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    openCart();
}

function checkFields() {
    const name = document.getElementById("customer-name").value;
    const block = document.getElementById("customer-block").value;
    const finalizeBtn = document.getElementById("finalize-btn");

    finalizeBtn.disabled = !(name.trim() !== "" && block.trim() !== "");
}

function sendToWhatsApp() {
    const name = document.getElementById("customer-name").value;
    const block = document.getElementById("customer-block").value;

    let message = `#pedido ${name} - ${block}\n`;

    cart.forEach(item => {
        message += `\n+${item.name}\n- Complementos:`;

        let complementosGratuitos = [];
        let complementosPagos = [];

        item.extras.forEach(extra => {
            if (extra.includes("(Adc R$ 1,00)")) {
                complementosPagos.push(extra);
            } else {
                complementosGratuitos.push(extra);
            }
        });

        // Adiciona os complementos gratuitos primeiro
        complementosGratuitos.forEach(extra => {
            message += `\n  - ${extra}`;
        });

        // Adiciona os complementos pagos no formato correto
        complementosPagos.forEach(extra => {
            message += `\n  - ${extra} (Adc R$ 1,00)`;
        });

        message += "\n";
    });

    let whatsappUrl = `https://wa.me/86999978325?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
}
