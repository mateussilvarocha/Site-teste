
document.addEventListener('DOMContentLoaded', function() {
    var menuBtn = document.querySelector('.menu-btn');
    var menu = document.querySelector('.menu');
    var closeBtn = document.querySelector('.close-btn');
    var openSidebarBtn = document.querySelector('.cart-button');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartItemsList = document.querySelector('.cart-items');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const cartItems = {};

    // Função para abrir a aba lateral
    openSidebarBtn.addEventListener('click', function() {
        cartSidebar.classList.add('active');
    });

    // Função para fechar a aba lateral
    closeSidebarBtn.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
    });
    closeBtn.addEventListener('click', function() {
        menu.classList.remove('active');
    });
    // Abrir ou fechar o menu ao clicar no botão
    menuBtn.addEventListener('click', function() {
        menu.classList.toggle('active');
    });

    // Fechar o menu ao clicar em um item do menu
    var menuItems = document.querySelectorAll('.menu ul li a');
    menuItems.forEach(function(item) {
        item.addEventListener('click', function() {
            menu.classList.remove('active');
        });
    });

    // Fechar o menu ao clicar em qualquer lugar fora do menu
    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
            menu.classList.remove('active');
        }
        //if(cartSidebar.classList.contains('active') && !cartSidebar.contains(event.target) && !openSidebarBtn.contains(event.target)) {
            //cartSidebar.classList.remove('active');
        //}
    });
    document.getElementById('pagar-depois').addEventListener('click', function() {
        const phoneNumber = '5521993901422'; // Número do WhatsApp do Vendedor
        let message = 'Olá, gostaria de realizar a seguinte compra:\n';

                for (const id in cartItems) {
                    const item = cartItems[id];
                    message += `- ${item.name} R$ ${item.price.toFixed(2)} x ${item.quantity} Total: R$${item.quantity * item.price.toFixed(2)}.00 \n`;
                }

        const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

        window.open(url, '_blank');
    });
    

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productElement = this.parentElement;
            const productId = productElement.getAttribute('data-id');
            const productName = productElement.getAttribute('data-name');
            const productPrice = productElement.getAttribute('data-price');

            if (cartItems[productId]) {
                cartItems[productId].quantity += 1;
            } else {
                cartItems[productId] = {
                    name: productName,
                    price: parseFloat(productPrice),
                    quantity: 1
                };
            }

        updateCartDisplay();
        });
    });

    function updateCartDisplay() {
        cartItemsList.innerHTML = '';
        if (cartItems.length === 0) {
            emptyCartMessage.style.display = 'block';
        } else {
            emptyCartMessage.style.display = 'none'
    
            for (const id in cartItems) {
                const item = cartItems[id];
                const listItem = document.createElement('li');

                // Criando os botões de mais e menos
                const minusButton = document.createElement('button');
                minusButton.textContent = '-';
                minusButton.onclick = () => updateQuantity(id, item.quantity - 1);

                const plusButton = document.createElement('button');
                plusButton.textContent = '+';
                plusButton.onclick = () => updateQuantity(id, item.quantity + 1);

                listItem.textContent = `${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity} `;
                listItem.appendChild(minusButton);
                listItem.appendChild(plusButton);

                cartItemsList.appendChild(listItem);
            }
        }

        // Função para atualizar a quantidade de um item no carrinho
        function updateQuantity(id, newQuantity) {
            if (newQuantity <= 0) {
                delete cartItems[id]; // Remove o item se a quantidade for zero ou menor
            } else {
                cartItems[id].quantity = newQuantity; // Atualiza a quantidade do item
            }
            updateCartDisplay(); // Atualiza a lista de itens no carrinho
        }

        // Exemplo de objeto cartItems
        
    }
}