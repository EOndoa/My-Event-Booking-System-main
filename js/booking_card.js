document.addEventListener('DOMContentLoaded', function () {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const events = [
    { id: 1, title: 'Gospel Praise Night', date: '2025-07-10', location: 'Yaoundé', price: 5000 },
    { id: 2, title: 'Tech Conference 2025', date: '2025-08-15', location: 'Douala', price: 10000 },
    { id: 3, title: 'Bible Study Retreat', date: '2025-09-01', location: 'Bamenda', price: 3500 }
  ];

  const cartItemsContainer = document.getElementById('cartItems');
  cartItemsContainer.innerHTML = '';

  events.forEach(event => {
    const card = document.createElement('div');
    card.className = 'card mb-3';
    card.innerHTML = `
      <div class="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 class="card-title">${event.title}</h5>
          <p class="card-text">Date: ${event.date}</p>
          <p class="card-text">Location: ${event.location}</p>
          <p class="card-text">Price:XFA ${event.price.toLocaleString()}</p>
        </div>
        <button class="btn btn-success add-to-cart-btn" 
                data-id="${event.id}" 
                data-title="${event.title}" 
                data-price="${event.price}">
          <i class="fas fa-cart-plus"></i> Add to My Cart
        </button>
      </div>
    `;
    cartItemsContainer.appendChild(card);
  });

  function updateCartCount() {
    document.getElementById('cart-count-badge').textContent = cart.length;
  }

  cartItemsContainer.addEventListener('click', function (e) {
    if (e.target.closest('.add-to-cart-btn')) {
      const btn = e.target.closest('.add-to-cart-btn');
      const id = btn.getAttribute('data-id');
      const title = btn.getAttribute('data-title');
      const price = parseFloat(btn.getAttribute('data-price'));

      // Check for duplicates
      const exists = cart.some(item => item.id === id);
      if (exists) {
        alert(`"${title}" is already in your cart.`);
        return;
      }

      cart.push({ id, title, price });
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();

      alert(`"${title}" added to your cart.`);
    }
  });

  updateCartCount();
});
