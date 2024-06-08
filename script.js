// Get the shopping cart element
const shoppingCart = document.querySelector('.shopping-cart');

// Get the delete button elements
const deleteBtns = document.querySelectorAll('.delete-btn');

// Get the like button elements
const likeBtns = document.querySelectorAll('.like-btn');

// Get the quantity input elements
const quantityInputs = document.querySelectorAll('.quantity input');

// Get the total price elements
const totalPrices = document.querySelectorAll('.total-price');

// Get the form element
const form = document.querySelector('form');

// Get the payment method radio buttons
const paymentMethods = document.querySelectorAll('input[name="payment-method"]');

// Get the submit button
const submitBtn = document.querySelector('button[type="submit"]');

// Set the initial total price
let totalPrice = 0;

// Loop through the delete buttons and add an event listener to each one
deleteBtns.forEach((deleteBtn, index) => {
  deleteBtn.addEventListener('click', () => {
    // Remove the item from the cart
    shoppingCart.removeChild(shoppingCart.children[index]);

    // Recalculate the total price
    recalculateTotalPrice();
  });
});

// Loop through the like buttons and add an event listener to each one
likeBtns.forEach((likeBtn, index) => {
  likeBtn.addEventListener('click', () => {
    // Toggle the "is-active" class on the button
    likeBtn.classList.toggle('is-active');
  });
});

// Loop through the quantity inputs and add an event listener to each one
quantityInputs.forEach((quantityInput, index) => {
  quantityInput.addEventListener('change', () => {
    // Update the quantity of the item
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(shoppingCart.children[index].querySelector('.price').innerText.replace('$', ''));
    const totalPrice = quantity * price;
    shoppingCart.children[index].querySelector('.total-price').innerText = `$${totalPrice.toFixed(2)}`;

    // Recalculate the total price
    recalculateTotalPrice();
  });
});

// Function to recalculate the total price
function recalculateTotalPrice() {
  let totalPrice = 0;
  totalPrices.forEach((totalPriceEl) => {
    totalPrice += parseFloat(totalPriceEl.innerText.replace('$', ''));
  });
  document.querySelector('.total-price-all').innerText = `$${totalPrice.toFixed(2)}`;
}

// Loop through the payment method radio buttons and add an event listener to each one
paymentMethods.forEach((paymentMethod) => {
  paymentMethod.addEventListener('change', () => {
    // Enable the submit button if a payment method is selected
    if (document.querySelector('input[name="payment-method"]:checked')) {
      submitBtn.removeAttribute('disabled');
    } else {
      submitBtn.setAttribute('disabled', 'disabled');
    }
  });
});

// Submit the form when the submit button is clicked
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get the form data
  const formData = new FormData(form);

  // Send the form data to the server
  fetch('https://example.com/checkout', {
    method: 'POST',
    body: formData
  })
  .then((response) => {
    if (response.ok) {
      // Redirect to the confirmation page
      window.location.href = 'https://example.com/confirmation';
    } else {
      // Display an error message
      alert('There was an error processing your order.');
    }
  });
});
