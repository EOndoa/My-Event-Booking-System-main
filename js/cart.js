document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const cartSummary = document.getElementById('cartSummary');
    const cartSummaryList = document.getElementById('cart-summary-list');
    const totalItemsSpan = document.getElementById('totalItems');
    const totalPriceSpan = document.getElementById('totalPrice');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const clearCartBtn = document.getElementById('clearCartBtn');

    let cart = [];

    // --- Sync cart to PHP session ---
    function syncCartToServer() {
        fetch('http://localhost/Orchid-Event-Booking-System-main/api/sync_cart.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(cart)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Cart synced to server:', data);
        })
        .catch(error => {
            console.error('Error syncing cart:', error);
        });
    }

    // --- Save cart to localStorage and sync ---
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        if (typeof updateCartCount === 'function') {
            updateCartCount();
        }
        syncCartToServer();
    }

    // --- Load cart from localStorage ---
    function loadCart() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
        }
        renderCart();
    }

    // --- Render cart UI ---
    function renderCart() {
        cartItemsContainer.innerHTML = '';
        cartSummaryList.innerHTML = '';

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            cartSummary.style.display = 'none';
            checkoutBtn.disabled = true;
            clearCartBtn.disabled = true;
            totalItemsSpan.textContent = '0';
            totalPriceSpan.textContent = '0.00';
            return;
        }

        emptyCartMessage.style.display = 'none';
        cartSummary.style.display = 'block';
        checkoutBtn.disabled = false;
        clearCartBtn.disabled = false;

        let totalItems = 0;
        let totalPrice = 0;

        cart.forEach(item => {
            const imageUrl = item.image_url || 'https://via.placeholder.com/100x100?text=No+Image';
            const itemSubtotal = parseFloat(item.price) * item.quantity;

            const itemCard = document.createElement('div');
            itemCard.className = 'card mb-3 shadow-sm cart-item-card';
            itemCard.innerHTML = `
                <div class="row g-0 align-items-center">
                    <div class="col-md-3">
                        <img src="${imageUrl}" class="img-fluid rounded-start cart-item-img" alt="${item.name}">
                    </div>
                    <div class="col-md-9">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text text-muted small">${item.date || ''} at ${item.location || ''}</p>
                            <p class="card-text mb-2"><strong>Price: NGN ${parseFloat(item.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></p>
                            <div class="d-flex align-items-center mb-2">
                                <label for="quantity-${item.id}" class="form-label mb-0 me-2">Quantity:</label>
                                <input type="number" id="quantity-${item.id}" class="form-control quantity-input"
                                       value="${item.quantity}" min="1" data-item-id="${item.id}" style="width: 70px;">
                            </div>
                            <button class="btn btn-danger btn-sm remove-item-btn" data-item-id="${item.id}">
                                <i class="fas fa-trash-alt me-1"></i> Remove
                            </button>
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(itemCard);

            const summaryListItem = document.createElement('li');
            summaryListItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            summaryListItem.innerHTML = `
                <span>${item.name} (${item.quantity}x)</span>
                <span>NGN ${itemSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            `;
            cartSummaryList.appendChild(summaryListItem);

            totalItems += item.quantity;
            totalPrice += it
