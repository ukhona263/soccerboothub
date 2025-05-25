function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartCount = document.querySelector('.cart-count');
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartDisplay() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartGrid = document.getElementById('cart-grid');
  const cartEmpty = document.getElementById('cart-empty');
  const cartTotal = document.getElementById('cart-total');

  if (cart.length === 0) {
    cartGrid.style.display = 'none';
    cartEmpty.style.display = 'block';
    cartTotal.textContent = '$0.00';
    return;
  }

  cartGrid.style.display = 'grid';
  cartEmpty.style.display = 'none';

  cartGrid.innerHTML = '';

  // Logo mapping based on product ID
  const logoMap = {
    'nike-mercurial': { src: 'nike-logo.png', brand: 'Nike' },
    'adidas-predator': { src: 'adidas-logo.png', brand: 'Adidas' },
    'puma-future': { src: 'puma-logo.png', brand: 'Puma' }
  };

  let total = 0;
  cart.forEach(item => {
    // Get logo details, default to Puma if ID not found
    const logo = logoMap[item.id] || { src: 'puma-logo.png', brand: 'Puma' };
    
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.dataset.productId = item.id;
    itemElement.innerHTML = `
      <img src="assets/images/${logo.src}" alt="${logo.brand} brand logo" class="brand-logo" loading="lazy">
      <img src="assets/images/${item.id}.jpeg" alt="${item.name} soccer boots" class="product-image" loading="lazy">
      <h3>${item.name}</h3>
      <p class="price-tag">$${item.price.toFixed(2)}</p>
      <div class="form-group">
        <label for="quantity-${item.id}" class="visually-hidden">Quantity</label>
        <input type="number" id="quantity-${item.id}" min="1" value="${item.quantity}" aria-label="Quantity for ${item.name}">
      </div>
      <button class="cta-button remove-item" data-product-id="${item.id}">Remove</button>
    `;
    cartGrid.appendChild(itemElement);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `$${total.toFixed(2)}`;

  document.querySelectorAll('.cart-item input[type="number"]').forEach(input => {
    input.addEventListener('change', (e) => {
      const productId = input.closest('.cart-item').dataset.productId;
      const newQuantity = parseInt(e.target.value);
      if (newQuantity < 1) e.target.value = 1;
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const item = cart.find(i => i.id === productId);
      if (item) {
        item.quantity = Math.max(1, newQuantity);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();
      }
    });
  });

  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart = cart.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartDisplay();
      updateCartCount();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  updateCartDisplay();

  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
  });
});