  // Update cart count
      function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
          cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        }
      }
    
      // Handle hamburger menu
      const hamburger = document.querySelector('.hamburger');
      const navLinks = document.querySelector('.nav-links');
      if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
          const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
          hamburger.setAttribute('aria-expanded', !isExpanded);
          navLinks.classList.toggle('active');
        });
      }
    
      updateCartCount();
    });