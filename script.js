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
    let productName = document.getElementById("product-title").innerText;
    let selectedExtras = Array.from(document.querySelectorAll("#extras-container input:checked")).map(input => input.value);
   
    cart.push({ name: productName, size: size, extras: selectedExtras });
    updateCartCount();
    alert("Adicionado ao carrinho!");

    // Voltar para a página inicial
    document.getElementById("product-page").classList.add("hidden"); // Esconde a página do produto
    document.querySelector(".container").classList.remove("hidden"); // Mostra a página principal (inicial)
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
