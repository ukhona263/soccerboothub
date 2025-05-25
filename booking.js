function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const cartCount = document.querySelector('.cart-count');
      cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    document.addEventListener('DOMContentLoaded', () => {
      updateCartCount();

      const hamburger = document.querySelector('.hamburger');
      const navLinks = document.querySelector('.nav-links');
      hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
      });

      const form = document.getElementById('booking-form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        if (!name.match(/^[A-Za-z\s]+$/)) {
          alert('Name must contain only letters and spaces.');
          return;
        }
        if (!email.includes('@')) {
          alert('Please enter a valid email address.');
          return;
        }
        if (!date) {
          alert('Please select a date.');
          return;
        }
        if (!time) {
          alert('Please select a time.');
          return;
        }

        alert('Appointment booked successfully!');
        form.reset();
      });
    });