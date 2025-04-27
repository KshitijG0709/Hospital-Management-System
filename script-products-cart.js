const USD_TO_INR = 82; // Conversion rate from USD to INR

const products = [
    {
        id: 1,
        name: "Digital Thermometer",
        description: "Accurate and fast temperature measurement.",
        price: 15.99,
        image: "/api/placeholder/300/200?text=Thermometer"
    },
    {
        id: 2,
        name: "Blood Pressure Monitor",
        description: "Easy-to-use digital blood pressure monitor.",
        price: 45.50,
        image: "/api/placeholder/300/200?text=BP+Monitor"
    },
    {
        id: 3,
        name: "Pulse Oximeter",
        description: "Measures oxygen saturation and pulse rate.",
        price: 25.00,
        image: "/api/placeholder/300/200?text=Oximeter"
    },
    {
        id: 4,
        name: "First Aid Kit",
        description: "Complete first aid kit for emergencies.",
        price: 30.00,
        image: "/api/placeholder/300/200?text=First+Aid+Kit"
    },
    {
        id: 5,
        name: "Medical Face Mask (50 pcs)",
        description: "Disposable protective face masks.",
        price: 20.00,
        image: "/api/placeholder/300/200?text=Face+Mask"
    }
];

let cart = [];

function renderProducts() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'service-card card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width:100%; height: 180px; object-fit: cover; border-top-left-radius: 8px; border-top-right-radius: 8px;">
            <div style="padding: 15px;">
                <h3 style="color: #005fa3;">${product.name}</h3>
                <p>${product.description}</p>
                <p style="font-weight: 700; margin-top: 10px;">₹${(product.price * USD_TO_INR).toFixed(2)}</p>
                <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const cartItem = cart.find(item => item.product.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ product, quantity: 1 });
    }
    updateCartCount();
    alert(`${product.name} added to cart.`);
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalQuantity;
}

function showCart() {
    let cartContent = '';
    if (cart.length === 0) {
        cartContent = '<p>Your cart is empty.</p>';
    } else {
        cartContent = '<ul style="list-style:none; padding:0;">';
        cart.forEach(item => {
            cartContent += `
                <li style="margin-bottom: 10px;">
                    <strong>${item.product.name}</strong> - Quantity: ${item.quantity} - Price: ₹${(item.product.price * item.quantity * USD_TO_INR).toFixed(2)}
                    <button onclick="removeFromCart(${item.product.id})" style="margin-left: 10px; background-color: #ff4757; color: white; border: none; border-radius: 4px; padding: 2px 6px; cursor: pointer;">Remove</button>
                </li>
            `;
        });
        cartContent += '</ul>';
        const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        cartContent += `<p><strong>Total: ₹${(totalPrice * USD_TO_INR).toFixed(2)}</strong></p>`;
        cartContent += `<button onclick="checkout()" class="btn btn-primary">Checkout</button>`;
    }
    const cartModal = document.getElementById('cartModal');
    if (!cartModal) {
        createCartModal(cartContent);
    } else {
        document.getElementById('cartModalContent').innerHTML = cartContent;
        cartModal.style.display = 'block';
    }
}

function createCartModal(content) {
    const modal = document.createElement('div');
    modal.id = 'cartModal';
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = 'white';
    modal.style.padding = '20px';
    modal.style.borderRadius = '8px';
    modal.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
    modal.style.zIndex = '10000';
    modal.style.width = '90%';
    modal.style.maxWidth = '400px';
    modal.style.maxHeight = '80vh';
    modal.style.overflowY = 'auto';

    modal.innerHTML = `
        <button id="closeCartBtn" style="float: right; background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
        <h2>Your Cart</h2>
        <div id="cartModalContent">${content}</div>
    `;

    document.body.appendChild(modal);

    document.getElementById('closeCartBtn').addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    updateCartCount();
    showCart();
}

function checkout() {
    alert('Thank you for your purchase! Your order has been placed.');
    cart = [];
    updateCartCount();
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();

    // Add event listeners to health package "Book Now" buttons
    const packageButtons = document.querySelectorAll('#health-packages .btn-primary[data-name][data-price]');
    packageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            addPackageToCart(name, price);
        });
    });

    // Add event listener for appointment form submission
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Validate form inputs (basic)
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const specialty = document.getElementById('specialty').value;
            const doctor = document.getElementById('doctor').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;

            if (!name || !email || !phone || !specialty || !date || !time) {
                alert('Please fill in all required fields.');
                return;
            }

            // Simulate sending appointment letter
            alert(`Thank you, ${name}! Your appointment has been booked. An appointment letter has been sent to ${email}.`);

            // Optionally, reset the form
            appointmentForm.reset();
        });
    }
});

document.getElementById('cartIcon').addEventListener('click', (e) => {
    e.preventDefault();
    showCart();
});

// Function to add health package to cart
function addPackageToCart(name, price) {
    // Check if package already in cart
    const cartItem = cart.find(item => item.product.name === name);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        // Create a product-like object for the package
        const packageProduct = {
            id: 'package-' + name.toLowerCase().replace(/\s+/g, '-'),
            name: name,
            description: '',
            price: price,
            image: '' // No image for packages currently
        };
        cart.push({ product: packageProduct, quantity: 1 });
    }
    updateCartCount();
    alert(`${name} added to cart.`);
}
