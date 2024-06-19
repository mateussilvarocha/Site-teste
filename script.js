document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.menu a');
    const sections = document.querySelectorAll('main section');
    const cartSidebar = document.getElementById('cart-sidebar');
    const openCartBtn = document.getElementById('open-cart');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItemsList = document.querySelector('.cart-items');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    let cartItems = [];

    // Event listener for opening the cart sidebar
    openCartBtn.addEventListener('click', function(event) {
        event.preventDefault();
        cartSidebar.classList.add('open');
        updateCartDisplay();

    });

    // Event listener for closing the cart sidebar
    closeCartBtn.addEventListener('click', function() {
        cartSidebar.classList.remove('open');
    });

    // Event listeners for menu links
    menuLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetID = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetID);

            sections.forEach(section => {
                if (section.id === targetID) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            });
        });
    });

    // Event listeners for add-to-cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productElement = this.parentElement;
            const productId = productElement.getAttribute('data-id');
            const productName = productElement.getAttribute('data-name');
            const productPrice = productElement.getAttribute('data-price');

            const product = {
                id: productId,
                name: productName,
                price: productPrice
            };

            cartItems.push(product);
            updateCartDisplay();
        });
    });as

    // Function to update the cart display
    function updateCartDisplay() {
        cartItemsList.innerHTML = '';

        if (cartItems.length === 0) {
            emptyCartMessage.style.display = 'block';
        } else {
            emptyCartMessage.style.display = 'none';

            cartItems.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = `${item.name} - R$${item.price}`;
                cartItemsList.appendChild(listItem);
            });
        }
    }
});
