// ============================
// Product Data
// ============================
const products = [
    {
        id: 1,
        name: "Sonalika Multi-Crop Thresher 40HP",
        category: "thresher",
        price: 185000,
        originalPrice: 220000,
        image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&q=80",
        rating: 4.8,
        reviews: 124,
        badge: "auth",
        badgeText: "Authorized",
        description: "Heavy-duty multi-crop thresher by Sonalika. Capacity 1200kg with triple blower design. Suitable for wheat, paddy, maize, and more.",
        features: ["40 HP Power Requirement", "1200 kg Capacity", "Triple Blower Design", "Mild Steel Body", "1-Year Warranty"]
    },
    {
        id: 2,
        name: "Sonalika Maize Sheller 64\" Dehusker",
        category: "thresher",
        price: 230000,
        originalPrice: 275000,
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&q=80",
        rating: 4.7,
        reviews: 89,
        badge: "auth",
        badgeText: "Authorized",
        description: "64-inch drum maize sheller with skin dehusker. Double wheel, new model with enhanced performance.",
        features: ["64\" Drum Size", "35+ HP Required", "640 RPM Speed", "Double Wheel", "Skin Dehusker"]
    },
    {
        id: 3,
        name: "Sonalika Paddy Thresher - Tractor Op.",
        category: "thresher",
        price: 165000,
        originalPrice: 195000,
        image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&q=80",
        rating: 4.6,
        reviews: 67,
        badge: "sale",
        badgeText: "15% OFF",
        description: "Tractor-operated paddy thresher with high output. Perfect for rice harvesting season.",
        features: ["Tractor Operated", "High Output Design", "Low Grain Loss", "Easy Maintenance", "All-Season Use"]
    },
    {
        id: 4,
        name: "Honda GX200 Engine 6.5 HP",
        category: "engine",
        price: 28500,
        originalPrice: 32000,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
        rating: 4.9,
        reviews: 256,
        badge: "auth",
        badgeText: "Honda Dealer",
        description: "Original Honda GX200 engine. Air-cooled, 4-stroke OHV with recoil start. Ideal for water pumps and agriculture.",
        features: ["6.5 HP Power", "Air-Cooled 4-Stroke", "3.1L Fuel Tank", "Low Oil Alert", "3-Year Warranty"]
    },
    {
        id: 5,
        name: "Honda GX390 Engine 13 HP",
        category: "engine",
        price: 45000,
        originalPrice: 52000,
        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&q=80",
        rating: 4.8,
        reviews: 178,
        badge: "hot",
        badgeText: "Best Seller",
        description: "Powerful Honda GX390 engine for heavy-duty applications. Perfect for large water pumps and industrial equipment.",
        features: ["13 HP Power", "Horizontal Crankshaft", "OHV 4-Stroke", "Electric Start Option", "Commercial Grade"]
    },
    {
        id: 6,
        name: "Oil Bearing Engine 10 HP Diesel",
        category: "engine",
        price: 35000,
        originalPrice: 42000,
        image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&q=80",
        rating: 4.5,
        reviews: 92,
        badge: "sale",
        badgeText: "20% OFF",
        description: "Heavy-duty oil bearing diesel engine. Fuel efficient and long-lasting. Ideal for threshers and water pumps.",
        features: ["10 HP Diesel", "Oil Bearing Design", "Fuel Efficient", "Low Vibration", "Easy Maintenance"]
    },
    {
        id: 7,
        name: "JCB 3DX Backhoe Rental - Per Hour",
        category: "jcb",
        price: 1200,
        originalPrice: 1500,
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&q=80",
        rating: 4.7,
        reviews: 340,
        badge: "hot",
        badgeText: "Popular",
        description: "JCB 3DX backhoe loader available for rent. Expert operators provided. Minimum 4 hours booking.",
        features: ["Expert Operator Included", "Min 4 Hours Booking", "Land Leveling", "Digging & Loading", "Construction Work"]
    },
    {
        id: 8,
        name: "JCB Land Leveling - Per Bigha",
        category: "jcb",
        price: 3500,
        originalPrice: 4500,
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80",
        rating: 4.6,
        reviews: 156,
        badge: "sale",
        badgeText: "Special Rate",
        description: "Complete farm land leveling service using JCB. Per bigha pricing with professional operators.",
        features: ["Professional Operators", "Per Bigha Pricing", "Farm Land Leveling", "Precision Work", "Free Site Visit"]
    },
    {
        id: 9,
        name: "Cultivator Blade Set (12 Pcs)",
        category: "parts",
        price: 2800,
        originalPrice: 3200,
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80",
        rating: 4.4,
        reviews: 201,
        badge: "new",
        badgeText: "New Stock",
        description: "High-quality cultivator blade set. Hardened steel for long life. Compatible with all major tractor models.",
        features: ["12 Pieces Set", "Hardened Steel", "Universal Fit", "Long Lasting", "Rust Resistant"]
    },
    {
        id: 10,
        name: "Thresher V-Belt Set (Premium)",
        category: "parts",
        price: 1500,
        originalPrice: 1800,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
        rating: 4.3,
        reviews: 145,
        badge: null,
        badgeText: null,
        description: "Premium quality V-belt set for thresher machines. Long-lasting, heat resistant. Compatible with Sonalika threshers.",
        features: ["Premium Quality", "Heat Resistant", "Sonalika Compatible", "Long Life", "Set of 4 Belts"]
    },
    {
        id: 11,
        name: "Tractor Rotavator Blades (Set of 42)",
        category: "parts",
        price: 4500,
        originalPrice: 5500,
        image: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=500&q=80",
        rating: 4.6,
        reviews: 88,
        badge: "sale",
        badgeText: "18% OFF",
        description: "Heavy-duty rotavator blades for tractor rotavators. Forged steel construction for maximum durability.",
        features: ["42 Pieces", "Forged Steel", "Universal Mount", "High Durability", "All Soil Types"]
    },
    {
        id: 12,
        name: "Bearing Set for Thresher (Full Kit)",
        category: "parts",
        price: 3200,
        originalPrice: 3800,
        image: "https://images.unsplash.com/photo-1565608438257-fac3c27beb36?w=500&q=80",
        rating: 4.5,
        reviews: 112,
        badge: null,
        badgeText: null,
        description: "Complete bearing set for thresher machines. Includes main shaft, drum, and auxiliary bearings.",
        features: ["Complete Kit", "Premium Quality", "All Major Parts", "Dust Sealed", "Easy Installation"]
    },
    {
        id: 13,
        name: "Heavy Duty Khurpi (Weeding Tool)",
        category: "tools",
        price: 350,
        originalPrice: 450,
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80",
        rating: 4.2,
        reviews: 320,
        badge: null,
        badgeText: null,
        description: "Professional grade khurpi for weeding and garden work. Stainless steel blade with wooden handle.",
        features: ["Stainless Steel", "Wooden Handle", "Ergonomic Grip", "Multi-Purpose", "Light Weight"]
    },
    {
        id: 14,
        name: "Spraying Machine 16L (Battery)",
        category: "tools",
        price: 3500,
        originalPrice: 4200,
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&q=80",
        rating: 4.7,
        reviews: 198,
        badge: "hot",
        badgeText: "Best Seller",
        description: "Battery-operated 16-litre spraying machine. Rechargeable with adjustable nozzle. Perfect for pesticide spraying.",
        features: ["16 Litre Capacity", "Battery Operated", "Adjustable Nozzle", "6-Hour Battery", "Backpack Design"]
    },
    {
        id: 15,
        name: "Garden Tool Set (8 Pieces)",
        category: "tools",
        price: 1800,
        originalPrice: 2400,
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80",
        rating: 4.4,
        reviews: 156,
        badge: "new",
        badgeText: "New Arrival",
        description: "Complete garden tool set with 8 essential tools. Includes trowel, cultivator, pruner, and more.",
        features: ["8 Piece Set", "Carbon Steel", "Rubber Grip", "Carrying Bag", "Gift Quality"]
    },
    {
        id: 16,
        name: "Honda Water Pump 3\" (GX200)",
        category: "pump",
        price: 32000,
        originalPrice: 38000,
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80",
        rating: 4.8,
        reviews: 134,
        badge: "auth",
        badgeText: "Honda Dealer",
        description: "Honda-powered 3-inch water pump. 950L/min max flow rate. Cast aluminum body with cast iron impeller.",
        features: ["950L/min Flow", "25m Total Head", "GX200 Engine", "Cast Iron Impeller", "Self-Priming"]
    },
    {
        id: 17,
        name: "Submersible Pump 1.5HP",
        category: "pump",
        price: 8500,
        originalPrice: 10000,
        image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80",
        rating: 4.5,
        reviews: 89,
        badge: "sale",
        badgeText: "15% OFF",
        description: "High-quality 1.5HP submersible pump for borewell and open well. Copper winding motor for long life.",
        features: ["1.5 HP Motor", "Copper Winding", "Borewell Compatible", "60m Head", "Thermal Protection"]
    },
    {
        id: 18,
        name: "Drip Irrigation Kit (1 Acre)",
        category: "pump",
        price: 12000,
        originalPrice: 15000,
        image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=500&q=80",
        rating: 4.6,
        reviews: 67,
        badge: "new",
        badgeText: "Eco-Friendly",
        description: "Complete drip irrigation kit for 1 acre. Saves 60% water. Easy installation with all fittings included.",
        features: ["1 Acre Coverage", "60% Water Saving", "All Fittings Included", "UV Resistant Pipes", "Easy Installation"]
    },
    {
        id: 19,
        name: "Mini Sonalika Thresher 20HP",
        category: "thresher",
        price: 95000,
        originalPrice: 115000,
        image: "https://images.unsplash.com/photo-1591086569653-58c87c3e8fa6?w=500&q=80",
        rating: 4.5,
        reviews: 78,
        badge: "sale",
        badgeText: "17% OFF",
        description: "Compact mini thresher ideal for small farms. Low power requirement with efficient output.",
        features: ["20 HP Requirement", "Compact Design", "Easy Transport", "Multi-Crop", "Low Maintenance"]
    },
    {
        id: 20,
        name: "Oil Bearing Engine 5 HP Diesel",
        category: "engine",
        price: 18000,
        originalPrice: 22000,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
        rating: 4.4,
        reviews: 145,
        badge: null,
        badgeText: null,
        description: "Reliable 5 HP diesel engine with oil bearing technology. Perfect for small-scale farming applications.",
        features: ["5 HP Diesel", "Oil Bearing", "Compact Size", "Easy Start", "Low Fuel Consumption"]
    },
    {
        id: 21,
        name: "Sprinkler Irrigation System (Full Set)",
        category: "pump",
        price: 8500,
        originalPrice: 11000,
        image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=500&q=80",
        rating: 4.3,
        reviews: 56,
        badge: "sale",
        badgeText: "23% OFF",
        description: "Complete sprinkler system with pipes, nozzles, and connectors. Coverage up to half acre.",
        features: ["Half Acre Coverage", "Adjustable Nozzles", "All Pipes Included", "Easy Setup", "Durable Material"]
    },
    {
        id: 22,
        name: "Plough Blade Set (Heavy Duty)",
        category: "parts",
        price: 5500,
        originalPrice: 6800,
        image: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=500&q=80",
        rating: 4.5,
        reviews: 93,
        badge: null,
        badgeText: null,
        description: "Heavy-duty plough blade set for deep ploughing. High-carbon steel with protective coating.",
        features: ["High-Carbon Steel", "Deep Ploughing", "Protective Coating", "Universal Fit", "Long Life"]
    },
    {
        id: 23,
        name: "JCB Excavator Work - Per Day",
        category: "jcb",
        price: 8000,
        originalPrice: 10000,
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&q=80",
        rating: 4.8,
        reviews: 210,
        badge: "hot",
        badgeText: "Most Booked",
        description: "Full-day JCB excavator service. Expert operator included. Ideal for large-scale farm and construction work.",
        features: ["Full Day (8 Hours)", "Expert Operator", "Diesel Included", "All Types of Work", "Insurance Covered"]
    },
    {
        id: 24,
        name: "Seed Drill Machine Attachment",
        category: "tools",
        price: 28000,
        originalPrice: 34000,
        image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&q=80",
        rating: 4.6,
        reviews: 45,
        badge: "new",
        badgeText: "New Stock",
        description: "Tractor-mounted seed drill for precise sowing. Adjustable row spacing and seed rate control.",
        features: ["Tractor Mounted", "9 Row Capacity", "Adjustable Spacing", "Seed Rate Control", "All Seed Types"]
    }
];

// ============================
// State
// ============================
let cart = JSON.parse(localStorage.getItem('maheshCart') || '[]');
let currentSlide = 0;
let slideInterval;
let currentFilter = 'all';

// ============================
// Initialize
// ============================
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
    startSlideShow();
    startCountdown();
    animateStats();
    setupScrollEffects();
    setupRevealAnimations();
});

// ============================
// Product Rendering
// ============================
function renderProducts(filter = 'all', searchTerm = '') {
    const grid = document.getElementById('productsGrid');
    let filtered = products;

    if (filter !== 'all') {
        filtered = filtered.filter(p => p.category === filter);
    }

    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term)
        );
    }

    grid.innerHTML = filtered.map(product => {
        const discount = Math.round((1 - product.price / product.originalPrice) * 100);
        const inCart = cart.find(c => c.id === product.id);

        return `
            <div class="product-card" data-category="${product.category}">
                <div class="product-badges">
                    ${product.badge ? `<span class="product-badge badge-${product.badge}">${product.badgeText}</span>` : ''}
                    ${discount >= 10 ? `<span class="product-badge badge-sale">${discount}% OFF</span>` : ''}
                </div>
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <div class="product-actions-overlay">
                        <button class="action-btn" onclick="quickView(${product.id})" title="Quick View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn" onclick="addToCart(${product.id})" title="Add to Cart">
                            <i class="fas fa-cart-plus"></i>
                        </button>
                        <button class="action-btn" onclick="shareProduct(${product.id})" title="Share on WhatsApp">
                            <i class="fab fa-whatsapp"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-category-tag">${getCategoryName(product.category)}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-rating">
                        ${generateStars(product.rating)}
                        <span>(${product.reviews} reviews)</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">${formatPrice(product.price)}</span>
                        <span class="original-price">${formatPrice(product.originalPrice)}</span>
                    </div>
                    <button class="product-cart-btn ${inCart ? 'added' : ''}" onclick="addToCart(${product.id})">
                        <i class="fas ${inCart ? 'fa-check' : 'fa-shopping-cart'}"></i>
                        ${inCart ? `In Cart (${inCart.qty})` : 'Add to Cart'}
                    </button>
                </div>
            </div>
        `;
    }).join('');

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-light);">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 16px; color: var(--border);"></i>
                <p style="font-size: 1.1rem;">No products found. Try a different search or category.</p>
            </div>
        `;
    }
}

function getCategoryName(cat) {
    const names = {
        thresher: 'Thresher Machine',
        engine: 'Engine',
        jcb: 'JCB Service',
        parts: 'Agriculture Parts',
        tools: 'Farming Tools',
        pump: 'Pumps & Irrigation'
    };
    return names[cat] || cat;
}

function generateStars(rating) {
    let stars = '';
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.3;
    for (let i = 0; i < full; i++) stars += '<i class="fas fa-star"></i>';
    if (half) stars += '<i class="fas fa-star-half-alt"></i>';
    const empty = 5 - full - (half ? 1 : 0);
    for (let i = 0; i < empty; i++) stars += '<i class="far fa-star"></i>';
    return stars;
}

function formatPrice(price) {
    return '₹' + price.toLocaleString('en-IN');
}

// ============================
// Category Filter
// ============================
function filterByCategory(category) {
    currentFilter = category;
    renderProducts(category);

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(category) ||
            (category === 'all' && btn.textContent === 'All Products')) {
            btn.classList.add('active');
        }
    });

    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function filterProducts() {
    const term = document.getElementById('searchInput').value;
    renderProducts(currentFilter, term);
}

// ============================
// Cart Functions
// ============================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(c => c.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            qty: 1
        });
    }

    saveCart();
    updateCartUI();
    renderProducts(currentFilter);
    showToast(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(c => c.id !== productId);
    saveCart();
    updateCartUI();
    renderProducts(currentFilter);
}

function updateQuantity(productId, change) {
    const item = cart.find(c => c.id === productId);
    if (!item) return;

    item.qty += change;
    if (item.qty <= 0) {
        removeFromCart(productId);
        return;
    }

    saveCart();
    updateCartUI();
    renderProducts(currentFilter);
}

function clearCart() {
    if (cart.length === 0) return;
    cart = [];
    saveCart();
    updateCartUI();
    renderProducts(currentFilter);
    showToast('Cart cleared!');
}

function saveCart() {
    localStorage.setItem('maheshCart', JSON.stringify(cart));
}

function updateCartUI() {
    const countEl = document.getElementById('cartCount');
    const itemsEl = document.getElementById('cartItems');
    const footerEl = document.getElementById('cartFooter');
    const totalEl = document.getElementById('cartTotal');

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    countEl.textContent = totalItems;

    if (cart.length === 0) {
        itemsEl.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-basket"></i>
                <p>Your cart is empty</p>
                <a href="#products" class="btn btn-sm" onclick="toggleCart()">Start Shopping</a>
            </div>
        `;
        footerEl.style.display = 'none';
    } else {
        itemsEl.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                        <span class="qty-value">${item.qty}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `).join('');
        footerEl.style.display = 'block';
        totalEl.textContent = formatPrice(totalPrice);
    }
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
}

// ============================
// Checkout
// ============================
function showCheckout() {
    toggleCart();
    const modal = document.getElementById('checkoutModal');
    const summary = document.getElementById('orderSummary');

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    summary.innerHTML = `
        <h4 style="margin-bottom: 12px; color: var(--primary);">Order Summary</h4>
        ${cart.map(item => `
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.9rem;">
                <span>${item.name} × ${item.qty}</span>
                <strong>${formatPrice(item.price * item.qty)}</strong>
            </div>
        `).join('')}
        <hr style="margin: 12px 0; border-color: var(--border);">
        <div style="display: flex; justify-content: space-between; font-size: 1.1rem; font-weight: 800;">
            <span>Total</span>
            <span style="color: var(--primary);">${formatPrice(totalPrice)}</span>
        </div>
        <hr style="margin: 12px 0; border-color: var(--border);">
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
    document.body.style.overflow = '';
}

function placeOrder(e) {
    e.preventDefault();

    const name = document.getElementById('orderName').value;
    const phone = document.getElementById('orderPhone').value;
    const email = document.getElementById('orderEmail').value || 'Not provided';
    const address = document.getElementById('orderAddress').value;
    const payment = document.getElementById('orderPayment').value;
    const notes = document.getElementById('orderNotes').value || 'None';
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const orderNumber = 'MC' + Date.now().toString().slice(-8);
    const orderDate = new Date().toLocaleString('en-IN', { 
        dateStyle: 'medium', 
        timeStyle: 'short' 
    });

    // Payment method text
    const paymentText = {
        'cod': 'Cash on Delivery',
        'upi': 'UPI Payment',
        'bank': 'Bank Transfer',
        'emi': 'EMI'
    }[payment] || payment;

    // Build order items list
    const itemsList = cart.map(item => 
        `• ${item.name} × ${item.qty} = ${formatPrice(item.price * item.qty)}`
    ).join('\n');

    // Build WhatsApp message
    const whatsappMessage = `🛒 *NEW ORDER - MAHESH & COMPANY*

📋 *Order ID:* ${orderNumber}
📅 *Date:* ${orderDate}

👤 *Customer Details:*
• Name: ${name}
• Phone: ${phone}
• Email: ${email}

📍 *Delivery Address:*
${address}

🛍️ *Order Items:*
${itemsList}

💰 *Total Amount:* ${formatPrice(totalPrice)}
💳 *Payment Method:* ${paymentText}

📝 *Special Instructions:*
${notes}

---
_Order received via Mahesh & Company Website_`;

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/917297047681?text=${encodedMessage}`;

    closeCheckout();

    const details = document.getElementById('orderDetails');
    details.innerHTML = `
        <p><strong>Order ID:</strong> ${orderNumber}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Total:</strong> ${formatPrice(totalPrice)}</p>
        <p><strong>Payment:</strong> ${paymentText}</p>
        <p><strong>Delivery:</strong> ${address}</p>
    `;

    // Update success modal WhatsApp button to include order details
    const trackBtn = document.querySelector('#successModal .btn-outline');
    if (trackBtn) {
        trackBtn.href = whatsappURL;
    }

    document.getElementById('successModal').classList.add('active');
    document.body.style.overflow = 'hidden';

    // Automatically open WhatsApp to send order to shop owner
    setTimeout(() => {
        window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    }, 1500);

    cart = [];
    saveCart();
    updateCartUI();
    renderProducts(currentFilter);
    document.getElementById('checkoutForm').reset();
}

function closeSuccessModal() {
    document.getElementById('successModal').classList.remove('active');
    document.body.style.overflow = '';
}

// ============================
// Quick View
// ============================
function quickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const discount = Math.round((1 - product.price / product.originalPrice) * 100);
    const content = document.getElementById('quickViewContent');

    content.innerHTML = `
        <div class="quickview-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="quickview-details">
            <div class="product-category-tag">${getCategoryName(product.category)}</div>
            <h2>${product.name}</h2>
            <div class="product-rating">
                ${generateStars(product.rating)}
                <span>(${product.reviews} reviews)</span>
            </div>
            <div class="product-price">
                <span class="current-price">${formatPrice(product.price)}</span>
                <span class="original-price">${formatPrice(product.originalPrice)}</span>
                <span class="discount-percent">${discount}% OFF</span>
            </div>
            <p class="quickview-description">${product.description}</p>
            <ul class="quickview-features">
                ${product.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')}
            </ul>
            <button class="btn btn-primary btn-full" onclick="addToCart(${product.id}); closeQuickView();">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
            <div style="margin-top: 12px; text-align: center;">
                <a href="https://wa.me/919876543210?text=Hi! I'm interested in ${encodeURIComponent(product.name)} (${formatPrice(product.price)})" 
                   class="btn btn-outline" style="border-color: #25d366; color: #25d366;" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-whatsapp"></i> Enquire on WhatsApp
                </a>
            </div>
        </div>
    `;

    document.getElementById('quickViewModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    document.getElementById('quickViewModal').classList.remove('active');
    document.body.style.overflow = '';
}

// ============================
// Share Product
// ============================
function shareProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const text = `Check out ${product.name} at ${formatPrice(product.price)} from Mahesh & Company Aspur! Great deals on agriculture equipment.`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
}

// ============================
// Hero Slider
// ============================
function startSlideShow() {
    slideInterval = setInterval(() => changeSlide(1), 5000);
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');

    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = (currentSlide + direction + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');

    clearInterval(slideInterval);
    slideInterval = setInterval(() => changeSlide(1), 5000);
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');

    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = index;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');

    clearInterval(slideInterval);
    slideInterval = setInterval(() => changeSlide(1), 5000);
}

// ============================
// Countdown Timer
// ============================
function startCountdown() {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 15);

    function update() {
        const now = new Date();
        const diff = endDate - now;

        if (diff <= 0) return;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}

// ============================
// Stats Counter
// ============================
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                animateValue(el, 0, target, 2000);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

function animateValue(el, start, end, duration) {
    let current = start;
    const range = end - start;
    const startTime = performance.now();

    function step(timestamp) {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        current = Math.floor(start + range * eased);
        el.textContent = current.toLocaleString('en-IN');
        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

// ============================
// Scroll Effects
// ============================
function setupScrollEffects() {
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            backToTop.classList.add('visible');
        } else {
            navbar.classList.remove('scrolled');
            backToTop.classList.remove('visible');
        }

        updateActiveNav();
    });
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);

        if (link) {
            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================
// Mobile Menu
// ============================
function toggleMobileMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

// ============================
// Reveal Animations
// ============================
function setupRevealAnimations() {
    const reveals = document.querySelectorAll(
        '.category-card, .product-card, .service-card, .testimonial-card, .contact-card'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });
}

// ============================
// Toast Notification
// ============================
function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMessage').textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================
// Contact Form
// ============================
function handleContactSubmit(e) {
    e.preventDefault();
    showToast('Message sent successfully! We will contact you soon.');
    e.target.reset();
}

// Close modals on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCheckout();
        closeSuccessModal();
        closeQuickView();
        if (document.getElementById('cartSidebar').classList.contains('active')) {
            toggleCart();
        }
    }
});

// Close mobile menu on nav link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('active');
    });
});
