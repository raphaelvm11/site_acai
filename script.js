let cart = [];

        // Função para abrir a página do produto
        function openProduct(name, price, description, image, extras, imageFile) {
            document.getElementById("product-title").innerText = name;
            document.getElementById("product-description").innerText = description;
            document.getElementById("product-image").src = imageFile; // Exibe a imagem do produto
            
            let extrasContainer = document.getElementById("extras-container");
            extrasContainer.innerHTML = ""; // Limpa os extras anteriores
            
            extras.forEach(extra => {
                let label = document.createElement("label");
                let checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.value = extra;
                label.appendChild(checkbox);
                label.appendChild(document.createTextNode(" " + extra));
                extrasContainer.appendChild(label);
                extrasContainer.appendChild(document.createElement("br"));
            });

            // Exibe a página de produto
            document.getElementById("product-page").classList.remove("hidden");
            document.querySelector(".container").classList.add("hidden");
        }

        // Função para adicionar o produto ao carrinho
        function addToCart() {
            let productName = document.getElementById("product-title").innerText;
            let selectedExtras = Array.from(document.querySelectorAll("#extras-container input:checked")).map(input => input.value);

            // Adiciona o item ao carrinho
            cart.push({ name: productName, extras: selectedExtras });
            updateCartCount(); // Atualiza a contagem de itens no carrinho
            alert("Adicionado ao carrinho!");

            // Volta para a página principal
            document.getElementById("product-page").classList.add("hidden");
            document.querySelector(".container").classList.remove("hidden");
        }

        // Função para atualizar a contagem de itens no carrinho
        function updateCartCount() {
            document.getElementById("cart-count").innerText = cart.length;
        }

        // Função para abrir o carrinho
        function openCart() {
            document.getElementById("cart-page").classList.remove("hidden");
            document.getElementById("product-page").classList.add("hidden");
            document.querySelector(".container").classList.add("hidden");

            let cartList = document.getElementById("cart-items");
            cartList.innerHTML = "";  // Limpa os itens anteriores

            // Exibe os itens do carrinho
            cart.forEach((item, index) => {
                let li = document.createElement("li");
                li.innerText = `${item.name} - Extras: ${item.extras.join(", ") || "Nenhum"}`;

                // Botão para remover o item do carrinho
                let removeButton = document.createElement("button");
                removeButton.innerText = "Remover";
                removeButton.onclick = () => removeFromCart(index);
                li.appendChild(removeButton);

                cartList.appendChild(li);
            });

            checkFields(); // Verifica se os campos foram preenchidos
        }

        // Função para remover item do carrinho
        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCartCount(); // Atualiza a contagem de itens
            openCart(); // Reabre o carrinho
        }

        // Função para verificar campos do cliente antes de finalizar compra
        function checkFields() {
            const name = document.getElementById("customer-name") ? document.getElementById("customer-name").value : '';
            const block = document.getElementById("customer-block") ? document.getElementById("customer-block").value : '';
            const finalizeBtn = document.getElementById("finalize-btn");

            if (name.trim() !== "" && block.trim() !== "") {
                finalizeBtn.disabled = false;
            } else {
                finalizeBtn.disabled = true;
            }
        }

        // Função para enviar o pedido pelo WhatsApp
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

        // Função para voltar para a página principal
        function goBack() {
            document.getElementById("product-page").classList.add("hidden");
            document.getElementById("cart-page").classList.add("hidden");
            document.querySelector(".container").classList.remove("hidden");
        }
