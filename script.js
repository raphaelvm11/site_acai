let cart = [];

function openProduct(name, price, description, image, extras, imageFile) {
    document.getElementById("product-title").innerText = name;
    document.getElementById("product-description").innerText = description;
    document.getElementById("product-image").src = imageFile; // Corrigido para exibir a imagem correta
    
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

    // Exibe a página de produto
    document.getElementById("product-page").classList.remove("hidden");
    document.querySelector(".container").classList.add("hidden");
}

function addToCart() {
    const productTitle = document.getElementById("product-title").innerText;
    const productPrice = parseFloat(document.getElementById("product-price").innerText.replace("R$ ", ""));
    let extras = [];
    let additionalExtras = [];
    let total = productPrice;

    // Complementos gratuitos (já existentes no seu código)
    const extrasContainer = document.getElementById("extras-container");
    const selectedExtras = extrasContainer.querySelectorAll("input[type='checkbox']:checked");
    selectedExtras.forEach(extra => {
        extras.push(extra.value);
    });

    // Complementos adicionais (R$ 1,00 por item)
    const additionalExtrasContainer = document.getElementById("additional-extras-container");
    const selectedAdditionalExtras = additionalExtrasContainer.querySelectorAll("input[type='checkbox']:checked");
    selectedAdditionalExtras.forEach(extra => {
        additionalExtras.push(extra.value);
        total += 1; // Adiciona R$ 1,00 por item adicional
    });

    // Adicionar item ao carrinho
    const cartItem = document.createElement("li");
    cartItem.innerText = `${productTitle} - R$ ${total.toFixed(2)} (Complementos: ${extras.join(", ")} | Adicionais: ${additionalExtras.join(", ")})`;
    document.getElementById("cart-items").appendChild(cartItem);

    // Atualizar a contagem no ícone do carrinho
    const cartCount = document.getElementById("cart-count");
    cartCount.innerText = parseInt(cartCount.innerText) + 1;

    // Voltar à página anterior (opcional, caso você tenha uma função para isso)
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
        li.innerText = `${item.name} - Tamanho: ${item.size} - Extras: ${item.extras.join(", ") || "Nenhum"}`;
        
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

    if (name.trim() !== "" && block.trim() !== "") {
        finalizeBtn.disabled = false;
    } else {
        finalizeBtn.disabled = true;
    }
}

function sendToWhatsApp() {
    const name = document.getElementById("customer-name").value;
    const block = document.getElementById("customer-block").value;

    let message = `#pedido ${name} - ${block}\n`;

    cart.forEach(item => {
        message += `\n*+${item.name}*\n- Complementos:`;

        item.extras.forEach(extra => {
            message += `\n  - ${extra}`;
        });

        message += "\n";
    });

    let whatsappUrl = `https://wa.me/86999978325?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
}

function goBack() {
    document.getElementById("product-page").classList.add("hidden");
    document.getElementById("cart-page").classList.add("hidden");
    document.querySelector(".container").classList.remove("hidden");
}
