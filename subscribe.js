document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('email');
  const nameInput = document.getElementById('name');
  const emailError = document.getElementById('email-error');
  const subscriptionMessage = document.getElementById('subscription-message');

  if (!form || !emailInput || !nameInput || !emailError || !subscriptionMessage) {
    console.error('Newsletter form elements not found.');
    return;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const name = nameInput.value.trim();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailError.style.display = 'block';
      emailInput.focus();
      return;
    } else {
      emailError.style.display = 'none';
    }

    // Store subscription in localStorage
    const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
    if (subscriptions.includes(email)) {
      subscriptionMessage.textContent = 'You are already subscribed!';
    } else {
      subscriptions.push(email);
      localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
      subscriptionMessage.textContent = `Thank you${name ? ' ' + name : ''} for subscribing!`;
    }

    subscriptionMessage.style.display = 'block';
    form.reset();

    // Hide message after 3 seconds
    setTimeout(() => {
      subscriptionMessage.style.display = 'none';
    }, 3000);
  });
});