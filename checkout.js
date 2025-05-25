function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartCount = document.querySelector('.cart-count');
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartSummary() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  cartItems.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = '<li>Your cart is empty. <a href="catalogue.html">Shop now</a>.</li>';
    cartTotal.textContent = '$0.00';
    return;
  }

  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    const li = document.createElement('li');
    li.textContent = `${item.name} (x${item.quantity}): $${subtotal.toFixed(2)}`;
    cartItems.appendChild(li);
    total += subtotal;
  });

  cartTotal.textContent = `$${total.toFixed(2)}`;
}

function validateForm() {
  const form = document.getElementById('checkout-form');
  const fields = [
    { id: 'full-name', errorId: 'full-name-error', validate: val => val.trim().length > 0 },
    { id: 'email', errorId: 'email-error', validate: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) },
    { id: 'address', errorId: 'address-error', validate: val => val.trim().length > 0 },
    { id: 'card-number', errorId: 'card-number-error', validate: val => /^\d{16}$/.test(val.replace(/\s/g, '')) },
    { id: 'expiry', errorId: 'expiry-error', validate: val => /^\d{2}\/\d{2}$/.test(val) },
    { id: 'cvv', errorId: 'cvv-error', validate: val => /^\d{3}$/.test(val) }
  ];

  let isValid = true;

  fields.forEach(field => {
    const input = document.getElementById(field.id);
    const error = document.getElementById(field.errorId);
    const value = input.value.trim();

    if (!field.validate(value)) {
      error.style.display = 'block';
      input.setAttribute('aria-invalid', 'true');
      isValid = false;
    } else {
      error.style.display = 'none';
      input.setAttribute('aria-invalid', 'false');
    }
  });

  return isValid;
}

function handleCheckout() {
  const form = document.getElementById('checkout-form');
  const checkoutGrid = document.querySelector('.checkout-grid');
  const orderConfirmation = document.getElementById('order-confirmation');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const order = {
        id: `ORDER-${Date.now()}`,
        items: cart,
        details: {
          fullName: document.getElementById('full-name').value,
          email: document.getElementById('email').value,
          address: document.getElementById('address').value,
          timestamp: new Date().toISOString()
        }
      };

      // Store order (for demo purposes)
      localStorage.setItem('lastOrder', JSON.stringify(order));

      // Clear cart
      localStorage.setItem('cart', '[]');

      // Show confirmation
      checkoutGrid.style.display = 'none';
      orderConfirmation.style.display = 'block';
      updateCartCount();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  updateCartSummary();
  handleCheckout();

  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
  });
});