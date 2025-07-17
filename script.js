document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const cartCount = document.getElementById('cart-count');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.getElementById('close-cart');
    const cartItems = document.getElementById('cart-items');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckout = document.getElementById('close-checkout');
    const checkoutForm = document.getElementById('checkout-form');
    const searchBar = document.getElementById('search-bar');
    const categoryFilter = document.getElementById('category-filter');

    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Load cart from localStorage

    const products = [
        { id: 1, name: 'Smartphone', category: 'electronics', price: 299.99, image: 'images/product1.jpg' },
        { id: 2, name: 'Headphones', category: 'electronics', price: 99.99, image: 'images/product2.jpg' },
        { id: 3, name: 'T-shirt', category: 'clothing', price: 19.99, image: 'images/product3.jpg' },
        { id: 4, name: 'Backpack', category: 'accessories', price: 49.99, image: 'images/product4.jpg' }
    ];

    // Display products in the DOM
    function displayProducts(productsToDisplay) {
        productList.innerHTML = ''; // Clear current products
        productsToDisplay.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn">Add to Cart</button>
            `;
            productList.appendChild(productDiv);

            // Attach event listener to add-to-cart button
            const addToCartBtn = productDiv.querySelector('.add-to-cart-btn');
            addToCartBtn.addEventListener('click', () => addToCart(product.id));
        });
    }

    // Add product to the cart
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        cart.push(product);
        updateCartCount();
        saveCart();
    }

    // Update cart count display
    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    // Show the cart modal
    function showCart() {
        cartItems.innerHTML = ''; // Clear previous cart items
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.name} - $${item.price.toFixed(2)}</p>
                <button class="remove-from-cart-btn">Remove</button>
            `;
            cartItems.appendChild(cartItem);

            // Attach event listener to remove button
            const removeFromCartBtn = cartItem.querySelector('.remove-from-cart-btn');
            removeFromCartBtn.addEventListener('click', () => removeFromCart(index));
        });
        cartModal.style.display = 'block';
    }

    // Remove product from the cart
    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartCount();
        saveCart();
        showCart();
    }

    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Show cart modal
    document.querySelector('.cart-icon').addEventListener('click', showCart);

    // Close cart modal
    closeCart.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == cartModal) {
            cartModal.style.display = 'none';
        } else if (event.target == checkoutModal) {
            checkoutModal.style.display = 'none';
        }
    }

    // Show checkout modal
    document.getElementById('checkout-btn').addEventListener('click', () => {
        checkoutModal.style.display = 'block';
    });

    // Close checkout modal
    closeCheckout.addEventListener('click', () => {
        checkoutModal.style.display = 'none';
    });

    // Handle checkout form submission
    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Purchase completed!');
        cart = []; // Clear cart
        updateCartCount();
        saveCart();
        checkoutModal.style.display = 'none';
    });

    // Product search functionality
    searchBar.addEventListener('input', (event) => {
        const searchQuery = event.target.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery)
        );
        displayProducts(filteredProducts);
    });

    // Product filtering by category
    categoryFilter.addEventListener('change', (event) => {
        const selectedCategory = event.target.value;
        if (selectedCategory === 'all') {
            displayProducts(products);
        } else {
            const filteredProducts = products.filter(product => product.category === selectedCategory);
            displayProducts(filteredProducts);
        }
    });

    // Initialize the page with all products displayed
    displayProducts(products);
    updateCartCount();
});