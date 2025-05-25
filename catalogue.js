const products = {
    1: [
      { id: 'nike-mercurial', name: 'Nike Mercurial Vapor 14', price: 249.99, description: 'Lightweight speed for explosive play.', image: 'nike-mercurial.jpeg' },
      { id: 'nike-tiempo', name: 'Nike Tiempo Legend 9', price: 229.99, description: 'Premium leather for touch and control.', image: 'nike-tiempo.jpeg' },
      { id: 'nike-phantom', name: 'Nike Phantom GT2', price: 239.99, description: 'Precision and power for attacking play.', image: 'nike-phantom.jpeg' },
      { id: 'nike-superfly', name: 'Nike Zoom Superfly', price: 269.99, description: 'Elite speed with dynamic fit.', image: 'nike-superfly.jpeg' }
    ],
    2: [
      { id: 'adidas-predator', name: 'Adidas Predator Edge', price: 219.99, description: 'Control and swerve with Demonskin.', image: 'adidas-predator.jpeg' },
      { id: 'adidas-speedflow', name: 'Adidas X Speedflow', price: 199.99, description: 'Built for rapid acceleration.', image: 'adidas-speedflow.jpg' },
      { id: 'adidas-copa', name: 'Adidas Copa Sense', price: 209.99, description: 'Classic leather with modern tech.', image: 'adidas-copa.jpeg' },
      { id: 'adidas-nemeziz', name: 'Adidas Nemeziz', price: 189.99, description: 'Agility and lockdown for quick cuts.', image: 'adidas-nemeziz.jpeg' }
    ],
    3: [
      { id: 'puma-future', name: 'Puma Future Z', price: 199.99, description: 'Adaptive fit for creative playmakers.', image: 'puma-future.jpeg' },
      { id: 'puma-ultra', name: 'Puma Ultra', price: 179.99, description: 'Ultra-light for blazing speed.', image: 'puma-ultra.jpeg' },
      { id: 'puma-king', name: 'Puma King Platinum', price: 189.99, description: 'Timeless comfort and control.', image: 'puma-king.jpeg' },
      { id: 'puma-evospeed', name: 'Puma EvoSpeed', price: 169.99, description: 'Minimalist design for pure speed.', image: 'puma-evospeed.jpeg' }
    ]
  };
  
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }
  
  function displayProducts(page) {
    const productGrid = document.getElementById('product-grid');
    const pageButtons = document.querySelectorAll('.page-button');
    productGrid.innerHTML = '';
    productGrid.classList.remove('animate-page');
  
    const items = products[page] || [];
    items.forEach(item => {
      const productElement = document.createElement('div');
      productElement.className = 'product animate-glow';
      productElement.dataset.productId = item.id;
      productElement.innerHTML = `
        <img src="assets/images/${item.image}" alt="${item.name} soccer boots" loading="lazy">
        <h3>${item.name}</h3>
        <p class="price-tag">$${item.price.toFixed(2)}</p>
        <p>${item.description}</p>
        <button class="cta-button add-to-cart" data-product-id="${item.id}" aria-label="Add ${item.name} to cart">Add to Cart</button>
      `;
      productGrid.appendChild(productElement);
    });
  
    // Trigger fade-in animation
    setTimeout(() => productGrid.classList.add('animate-page'), 10);
  
    // Update active button
    pageButtons.forEach(button => {
      button.classList.toggle('active', button.dataset.page === page);
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    displayProducts('1'); // Default to Nike page
  
    // Pagination button listeners
    document.querySelectorAll('.page-button').forEach(button => {
      button.addEventListener('click', () => {
        const page = button.dataset.page;
        displayProducts(page);
      });
    });
  
    // Add to cart listeners
    document.getElementById('product-grid').addEventListener('click', (e) => {
      if (e.target.classList.contains('add-to-cart')) {
        const productId = e.target.dataset.productId;
        const page = document.querySelector('.page-button.active').dataset.page;
        const product = products[page].find(p => p.id === productId);
        if (!product) return;
  
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${product.name} added to cart!`);
      }
    });
  
    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('active');
    });
  });