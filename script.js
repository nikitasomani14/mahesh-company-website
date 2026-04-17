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
        image: "https://5.imimg.com/data5/SELLER/Default/2023/1/MH/PA/LT/132924005/sonalika-thresher-machine-1000x1000.jpg",
        rating: 4.8,
        reviews: 124,
        badge: "auth",
        badgeText: "Authorized",
        inStock: true,
        description: "Heavy-duty multi-crop thresher by Sonalika. Capacity 1200kg with triple blower design. Suitable for wheat, paddy, maize, and more.",
        features: ["40 HP Power Requirement", "1200 kg Capacity", "Triple Blower Design", "Mild Steel Body", "1-Year Warranty"]
    },
    {
        id: 2,
        name: "Sonalika Maize Sheller 64\" Dehusker",
        category: "thresher",
        price: 230000,
        originalPrice: 275000,
        image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=500&q=80",
        rating: 4.7,
        reviews: 89,
        badge: "auth",
        badgeText: "Authorized",
        inStock: true,
        description: "64-inch drum maize sheller with skin dehusker. Double wheel, new model with enhanced performance.",
        features: ["64\" Drum Size", "35+ HP Required", "640 RPM Speed", "Double Wheel", "Skin Dehusker"]
    },
    {
        id: 3,
        name: "Sonalika Paddy Thresher - Tractor Op.",
        category: "thresher",
        price: 165000,
        originalPrice: 195000,
        image: "https://images.unsplash.com/photo-1589923188651-268a9765e432?w=500&q=80",
        rating: 4.6,
        reviews: 67,
        badge: "sale",
        badgeText: "15% OFF",
        inStock: true,
        description: "Tractor-operated paddy thresher with high output. Perfect for rice harvesting season.",
        features: ["Tractor Operated", "High Output Design", "Low Grain Loss", "Easy Maintenance", "All-Season Use"]
    },
    {
        id: 4,
        name: "Honda GX200 Engine 6.5 HP",
        category: "engine",
        price: 28500,
        originalPrice: 32000,
        image: "honda-engines.png",
        rating: 4.9,
        reviews: 256,
        badge: "auth",
        badgeText: "Honda Dealer",
        inStock: true,
        description: "Original Honda GX200 engine. Air-cooled, 4-stroke OHV with recoil start. Ideal for water pumps and agriculture. Available models: GX80, GX160, GX200.",
        features: ["6.5 HP Power", "Air-Cooled 4-Stroke", "3.1L Fuel Tank", "Low Oil Alert", "3-Year Warranty"]
    },
    {
        id: 5,
        name: "Honda GX390 Engine 13 HP",
        category: "engine",
        price: 45000,
        originalPrice: 52000,
        image: "honda-engines.png",
        rating: 4.8,
        reviews: 178,
        badge: "hot",
        badgeText: "Best Seller",
        inStock: true,
        description: "Powerful Honda GX390 engine for heavy-duty applications. Perfect for large water pumps and industrial equipment.",
        features: ["13 HP Power", "Horizontal Crankshaft", "OHV 4-Stroke", "Electric Start Option", "Commercial Grade"]
    },
    {
        id: 6,
        name: "Oil Bearing Engine 10 HP Diesel",
        category: "engine",
        price: 35000,
        originalPrice: 42000,
        image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=500&q=80",
        rating: 4.5,
        reviews: 92,
        badge: "sale",
        badgeText: "20% OFF",
        inStock: true,
        description: "Heavy-duty oil bearing diesel engine. Fuel efficient and long-lasting. Ideal for threshers and water pumps.",
        features: ["10 HP Diesel", "Oil Bearing Design", "Fuel Efficient", "Low Vibration", "Easy Maintenance"]
    },
    {
        id: 7,
        name: "JCB 3DX Backhoe Rental - Per Hour",
        category: "jcb",
        price: 1200,
        originalPrice: 1500,
        image: "https://i.pinimg.com/originals/a1/22/45/a12245c7c9a34052eaebf34a9e3ce1ef.jpg",
        rating: 4.7,
        reviews: 340,
        badge: "hot",
        badgeText: "Popular",
        inStock: true,
        description: "JCB 3DX backhoe loader available for rent. Expert operators provided. Minimum 4 hours booking.",
        features: ["Expert Operator Included", "Min 4 Hours Booking", "Land Leveling", "Digging & Loading", "Construction Work"]
    },
    {
        id: 8,
        name: "JCB Land Leveling - Per Bigha",
        category: "jcb",
        price: 3500,
        originalPrice: 4500,
        image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500&q=80",
        rating: 4.6,
        reviews: 156,
        badge: "sale",
        badgeText: "Special Rate",
        inStock: true,
        description: "Complete farm land leveling service using JCB. Per bigha pricing with professional operators.",
        features: ["Professional Operators", "Per Bigha Pricing", "Farm Land Leveling", "Precision Work", "Free Site Visit"]
    },
    {
        id: 9,
        name: "Cultivator Blade Set (12 Pcs)",
        category: "parts",
        price: 2800,
        originalPrice: 3200,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&q=80",
        rating: 4.4,
        reviews: 201,
        badge: "new",
        badgeText: "New Stock",
        inStock: true,
        description: "High-quality cultivator blade set. Hardened steel for long life. Compatible with all major tractor models.",
        features: ["12 Pieces Set", "Hardened Steel", "Universal Fit", "Long Lasting", "Rust Resistant"]
    },
    {
        id: 10,
        name: "Thresher V-Belt Set (Premium)",
        category: "parts",
        price: 1500,
        originalPrice: 1800,
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=500&q=80",
        rating: 4.3,
        reviews: 145,
        badge: null,
        badgeText: null,
        inStock: false,
        description: "Premium quality V-belt set for thresher machines. Long-lasting, heat resistant. Compatible with Sonalika threshers.",
        features: ["Premium Quality", "Heat Resistant", "Sonalika Compatible", "Long Life", "Set of 4 Belts"]
    },
    {
        id: 11,
        name: "Tractor Rotavator Blades (Set of 42)",
        category: "parts",
        price: 4500,
        originalPrice: 5500,
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=500&q=80",
        rating: 4.6,
        reviews: 88,
        badge: "sale",
        badgeText: "18% OFF",
        inStock: true,
        description: "Heavy-duty rotavator blades for tractor rotavators. Forged steel construction for maximum durability.",
        features: ["42 Pieces", "Forged Steel", "Universal Mount", "High Durability", "All Soil Types"]
    },
    {
        id: 12,
        name: "Bearing Set for Thresher (Full Kit)",
        category: "parts",
        price: 3200,
        originalPrice: 3800,
        image: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?w=500&q=80",
        rating: 4.5,
        reviews: 112,
        badge: null,
        badgeText: null,
        inStock: true,
        description: "Complete bearing set for thresher machines. Includes main shaft, drum, and auxiliary bearings.",
        features: ["Complete Kit", "Premium Quality", "All Major Parts", "Dust Sealed", "Easy Installation"]
    },
    {
        id: 13,
        name: "Heavy Duty Khurpi (Weeding Tool)",
        category: "tools",
        price: 350,
        originalPrice: 450,
        image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=500&q=80",
        rating: 4.2,
        reviews: 320,
        badge: null,
        badgeText: null,
        inStock: false,
        description: "Professional grade khurpi for weeding and garden work. Stainless steel blade with wooden handle.",
        features: ["Stainless Steel", "Wooden Handle", "Ergonomic Grip", "Multi-Purpose", "Light Weight"]
    },
    {
        id: 14,
        name: "Spraying Machine 16L (Battery)",
        category: "tools",
        price: 3500,
        originalPrice: 4200,
        image: "https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?w=500&q=80",
        rating: 4.7,
        reviews: 198,
        badge: "hot",
        badgeText: "Best Seller",
        inStock: true,
        description: "Battery-operated 16-litre spraying machine. Rechargeable with adjustable nozzle. Perfect for pesticide spraying.",
        features: ["16 Litre Capacity", "Battery Operated", "Adjustable Nozzle", "6-Hour Battery", "Backpack Design"]
    },
    {
        id: 15,
        name: "Garden Tool Set (8 Pieces)",
        category: "tools",
        price: 1800,
        originalPrice: 2400,
        image: "https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=500&q=80",
        rating: 4.4,
        reviews: 156,
        badge: "new",
        badgeText: "New Arrival",
        inStock: true,
        description: "Complete garden tool set with 8 essential tools. Includes trowel, cultivator, pruner, and more.",
        features: ["8 Piece Set", "Carbon Steel", "Rubber Grip", "Carrying Bag", "Gift Quality"]
    },
    {
        id: 16,
        name: "Honda Water Pump 3\" (GX200)",
        category: "pump",
        price: 32000,
        originalPrice: 38000,
        image: "honda-engines.png",
        rating: 4.8,
        reviews: 134,
        badge: "auth",
        badgeText: "Honda Dealer",
        inStock: true,
        description: "Honda-powered 3-inch water pump. 950L/min max flow rate. Cast aluminum body with cast iron impeller.",
        features: ["950L/min Flow", "25m Total Head", "GX200 Engine", "Cast Iron Impeller", "Self-Priming"]
    },
    {
        id: 17,
        name: "Submersible Pump 1.5HP",
        category: "pump",
        price: 8500,
        originalPrice: 10000,
        image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=500&q=80",
        rating: 4.5,
        reviews: 89,
        badge: "sale",
        badgeText: "15% OFF",
        inStock: true,
        description: "High-quality 1.5HP submersible pump for borewell and open well. Copper winding motor for long life.",
        features: ["1.5 HP Motor", "Copper Winding", "Borewell Compatible", "60m Head", "Thermal Protection"]
    },
    {
        id: 18,
        name: "Drip Irrigation Kit (1 Acre)",
        category: "pump",
        price: 12000,
        originalPrice: 15000,
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&q=80",
        rating: 4.6,
        reviews: 67,
        badge: "new",
        badgeText: "Eco-Friendly",
        inStock: true,
        description: "Complete drip irrigation kit for 1 acre. Saves 60% water. Easy installation with all fittings included.",
        features: ["1 Acre Coverage", "60% Water Saving", "All Fittings Included", "UV Resistant Pipes", "Easy Installation"]
    },
    {
        id: 19,
        name: "Mini Sonalika Thresher 20HP",
        category: "thresher",
        price: 95000,
        originalPrice: 115000,
        image: "https://images.unsplash.com/photo-1560693225-b8507d6f3aa9?w=500&q=80",
        rating: 4.5,
        reviews: 78,
        badge: "sale",
        badgeText: "17% OFF",
        inStock: true,
        description: "Compact mini thresher ideal for small farms. Low power requirement with efficient output.",
        features: ["20 HP Requirement", "Compact Design", "Easy Transport", "Multi-Crop", "Low Maintenance"]
    },
    {
        id: 20,
        name: "Oil Bearing Engine 5 HP Diesel",
        category: "engine",
        price: 18000,
        originalPrice: 22000,
        image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=500&q=80",
        rating: 4.4,
        reviews: 145,
        badge: null,
        badgeText: null,
        inStock: true,
        description: "Reliable 5 HP diesel engine with oil bearing technology. Perfect for small-scale farming applications.",
        features: ["5 HP Diesel", "Oil Bearing", "Compact Size", "Easy Start", "Low Fuel Consumption"]
    },
    {
        id: 21,
        name: "Sprinkler Irrigation System (Full Set)",
        category: "pump",
        price: 8500,
        originalPrice: 11000,
        image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=500&q=80",
        rating: 4.3,
        reviews: 56,
        badge: "sale",
        badgeText: "23% OFF",
        inStock: true,
        description: "Complete sprinkler system with pipes, nozzles, and connectors. Coverage up to half acre.",
        features: ["Half Acre Coverage", "Adjustable Nozzles", "All Pipes Included", "Easy Setup", "Durable Material"]
    },
    {
        id: 22,
        name: "Plough Blade Set (Heavy Duty)",
        category: "parts",
        price: 5500,
        originalPrice: 6800,
        image: "https://images.unsplash.com/photo-1586864387789-628af9feed72?w=500&q=80",
        rating: 4.5,
        reviews: 93,
        badge: null,
        badgeText: null,
        inStock: false,
        description: "Heavy-duty plough blade set for deep ploughing. High-carbon steel with protective coating.",
        features: ["High-Carbon Steel", "Deep Ploughing", "Protective Coating", "Universal Fit", "Long Life"]
    },
    {
        id: 23,
        name: "JCB Excavator Work - Per Day",
        category: "jcb",
        price: 8000,
        originalPrice: 10000,
        image: "https://i.pinimg.com/originals/a1/22/45/a12245c7c9a34052eaebf34a9e3ce1ef.jpg",
        rating: 4.8,
        reviews: 210,
        badge: "hot",
        badgeText: "Most Booked",
        inStock: true,
        description: "Full-day JCB excavator service. Expert operator included. Ideal for large-scale farm and construction work.",
        features: ["Full Day (8 Hours)", "Expert Operator", "Diesel Included", "All Types of Work", "Insurance Covered"]
    },
    {
        id: 24,
        name: "Seed Drill Machine Attachment",
        category: "tools",
        price: 28000,
        originalPrice: 34000,
        image: "https://images.unsplash.com/photo-1598512752271-33f913a5af13?w=500&q=80",
        rating: 4.6,
        reviews: 45,
        badge: "new",
        badgeText: "New Stock",
        inStock: true,
        description: "Tractor-mounted seed drill for precise sowing. Adjustable row spacing and seed rate control.",
        features: ["Tractor Mounted", "9 Row Capacity", "Adjustable Spacing", "Seed Rate Control", "All Seed Types"]
    }
];

// ============================
// State
// ============================
let cart = JSON.parse(localStorage.getItem('maheshCart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('maheshWishlist') || '[]');
let recentlyViewed = JSON.parse(localStorage.getItem('maheshRecent') || '[]')
    .filter(id => products.some(p => p.id === id))
    .slice(0, 6);
localStorage.setItem('maheshRecent', JSON.stringify(recentlyViewed));
let currentSlide = 0;
let slideInterval;
let currentFilter = 'all';

// ============================
// Initialize
// ============================
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initMobileBarClass();
    window.addEventListener('resize', initMobileBarClass);
    initSeasonalBanner();
    renderProductsWithSkeleton();
    updateCartUI();
    updateWishlistUI();
    renderRecentlyViewed();
    if (typeof renderFaq === 'function') renderFaq();
    startSlideShow();
    startCountdown();
    animateStats();
    setupScrollEffects();
    setupRevealAnimations();
});

function initMobileBarClass() {
    const mobile = window.matchMedia('(max-width: 640px)').matches;
    document.body.classList.toggle('has-mobile-bar', mobile);
}

// ============================
// Dark mode
// ============================
function initDarkMode() {
    const saved = localStorage.getItem('maheshTheme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
    setMetaThemeColor(theme);
}

function toggleDarkMode() {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('maheshTheme', next);
    updateThemeIcon(next);
    setMetaThemeColor(next);
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('themeIcon');
    if (!icon) return;
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function setMetaThemeColor(theme) {
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'theme-color';
        document.head.appendChild(meta);
    }
    meta.content = theme === 'dark' ? '#1a2332' : '#2d6a4f';
}

// ============================
// Seasonal banner
// ============================
function initSeasonalBanner() {
    if (localStorage.getItem('maheshSeasonalDismissed') === '1') return;
    const banner = document.getElementById('seasonalBanner');
    const textEl = document.getElementById('seasonalBannerText');
    if (!banner || !textEl) return;

    const month = new Date().getMonth() + 1;
    let msg = '';
    let cls = '';

    if (month >= 10 && month <= 11) {
        msg = typeof t === 'function' ? t('season_banner_diwali') : 'Festive Season Sale!';
        cls = 'seasonal-theme-diwali';
    } else if (month >= 6 && month <= 9) {
        msg = typeof t === 'function' ? t('season_banner_monsoon') : 'Monsoon Farming Season - Best Deals!';
        cls = 'seasonal-theme-monsoon';
    } else if (month >= 3 && month <= 4) {
        msg = typeof t === 'function' ? t('season_banner_harvest') : 'Harvest Season Special!';
        cls = 'seasonal-theme-harvest';
    } else if (month === 12 || month === 1) {
        msg = typeof t === 'function' ? t('season_banner_winter') : 'Winter Sale!';
        cls = 'seasonal-theme-winter';
    }

    if (!msg) return;
    banner.classList.add(cls);
    textEl.textContent = msg;
    banner.hidden = false;
}

function dismissSeasonalBanner() {
    const banner = document.getElementById('seasonalBanner');
    if (banner) banner.hidden = true;
    localStorage.setItem('maheshSeasonalDismissed', '1');
}

function refreshSeasonalBanner() {
    const banner = document.getElementById('seasonalBanner');
    const textEl = document.getElementById('seasonalBannerText');
    if (!banner || !textEl || banner.hidden || localStorage.getItem('maheshSeasonalDismissed') === '1') return;
    const month = new Date().getMonth() + 1;
    let msg = '';
    if (month >= 10 && month <= 11) msg = t('season_banner_diwali');
    else if (month >= 6 && month <= 9) msg = t('season_banner_monsoon');
    else if (month >= 3 && month <= 4) msg = t('season_banner_harvest');
    else if (month === 12 || month === 1) msg = t('season_banner_winter');
    if (msg) textEl.textContent = msg;
}

function t(key) {
    if (typeof translations === 'undefined' || typeof currentLanguage === 'undefined') return '';
    const lang = translations[currentLanguage];
    return lang && lang[key] ? lang[key] : key;
}

// ============================
// Skeleton + Product Rendering
// ============================
function buildSkeletonCards(count) {
    let html = '';
    for (let i = 0; i < count; i++) {
        html += `
            <div class="product-card product-skeleton-card">
                <div class="skeleton-shimmer skeleton-img"></div>
                <div class="skeleton-pad">
                    <div class="skeleton-shimmer skeleton-line short"></div>
                    <div class="skeleton-shimmer skeleton-line"></div>
                    <div class="skeleton-shimmer skeleton-line mid"></div>
                    <div class="skeleton-shimmer skeleton-btn"></div>
                </div>
            </div>`;
    }
    return html;
}

function renderProductsWithSkeleton() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    grid.classList.add('is-loading');
    grid.innerHTML = buildSkeletonCards(8);

    requestAnimationFrame(() => {
        setTimeout(() => {
            grid.classList.remove('is-loading');
            renderProducts(currentFilter);
        }, 450);
    });
}

function renderProducts(filter = 'all', searchTerm = '') {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

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

    updateProductBreadcrumb(filter);

    grid.innerHTML = filtered.map(product => {
        const discount = Math.round((1 - product.price / product.originalPrice) * 100);
        const inCart = cart.find(c => c.id === product.id);
        const inWish = wishlist.includes(product.id);
        const stock = product.inStock !== false;

        return `
            <div class="product-card" data-category="${product.category}">
                <button type="button" class="product-wishlist-btn ${inWish ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist(${product.id})" aria-label="Wishlist" title="Wishlist">
                    <i class="fas fa-heart"></i>
                </button>
                <div class="product-badges">
                    ${!stock ? `<span class="product-badge badge-oos">${typeof t === 'function' ? t('out_of_stock') : 'Out of Stock'}</span>` : ''}
                    ${product.badge ? `<span class="product-badge badge-${product.badge}">${product.badgeText}</span>` : ''}
                    ${discount >= 10 ? `<span class="product-badge badge-sale">${discount}% OFF</span>` : ''}
                </div>
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <div class="product-actions-overlay">
                        <button type="button" class="action-btn" onclick="quickView(${product.id})" title="Quick View">
                            <i class="fas fa-eye"></i>
                        </button>
                        ${stock ? `<button type="button" class="action-btn" onclick="addToCart(${product.id})" title="Add to Cart">
                            <i class="fas fa-cart-plus"></i>
                        </button>` : ''}
                        <button type="button" class="action-btn" onclick="shareProduct(${product.id})" title="Share on WhatsApp">
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
                    ${stock ? `
                    <button type="button" class="product-cart-btn ${inCart ? 'added' : ''}" onclick="addToCart(${product.id})">
                        <i class="fas ${inCart ? 'fa-check' : 'fa-shopping-cart'}"></i>
                        ${inCart ? `In Cart (${inCart.qty})` : (typeof t === 'function' ? t('add_to_cart') : 'Add to Cart')}
                    </button>` : `
                    <button type="button" class="product-cart-btn notify-btn" onclick="notifyStockWhatsApp(${product.id})">
                        <i class="fab fa-whatsapp"></i> ${typeof t === 'function' ? t('notify_me') : 'Notify Me'}
                    </button>`}
                </div>
            </div>
        `;
    }).join('');

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="product-empty-state">
                <i class="fas fa-search"></i>
                <p>No products found. Try a different search or category.</p>
            </div>
        `;
    }

    setupProductCardReveal(grid);
}

function updateProductBreadcrumb(filter) {
    const nav = document.getElementById('productBreadcrumb');
    const catSpan = document.getElementById('breadcrumbCategory');
    if (!nav || !catSpan) return;
    if (filter === 'all') {
        nav.hidden = true;
        return;
    }
    nav.hidden = false;
    catSpan.textContent = getCategoryName(filter);
}

function setupProductCardReveal(grid) {
    const cards = grid.querySelectorAll('.product-card');
    cards.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 40 + index * 40);
    });
}

function getCategoryName(cat) {
    const key = 'category_' + cat;
    if (typeof translations !== 'undefined' && typeof currentLanguage !== 'undefined') {
        const tr = translations[currentLanguage] && translations[currentLanguage][key];
        if (tr) return tr;
    }
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
    return '₹' + price.toLocaleString('en-IN') + '*';
}

// ============================
// Category Filter
// ============================
function filterByCategory(category) {
    currentFilter = category;
    document.getElementById('searchInput').value = '';
    renderProductsWithSkeleton();

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === category);
    });

    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function filterProducts() {
    const term = document.getElementById('searchInput').value;
    renderProducts(currentFilter, term);
}

// ============================
// Wishlist
// ============================
function toggleWishlist(productId) {
    const i = wishlist.indexOf(productId);
    if (i >= 0) wishlist.splice(i, 1);
    else wishlist.push(productId);
    localStorage.setItem('maheshWishlist', JSON.stringify(wishlist));
    updateWishlistUI();
    renderProducts(currentFilter, document.getElementById('searchInput').value);
    renderWishlistSidebar();
}

function updateWishlistUI() {
    const countEl = document.getElementById('wishlistCount');
    if (countEl) countEl.textContent = wishlist.length;
}

function renderWishlistSidebar() {
    const el = document.getElementById('wishlistItems');
    if (!el) return;
    if (wishlist.length === 0) {
        el.innerHTML = `<div class="wishlist-empty"><i class="far fa-heart" style="font-size:2.5rem;opacity:.3;"></i><p>${typeof t === 'function' ? t('wishlist_empty') : 'Your wishlist is empty'}</p></div>`;
        return;
    }
    el.innerHTML = wishlist.map(id => {
        const p = products.find(x => x.id === id);
        if (!p) return '';
        return `
            <div class="wishlist-item">
                <img src="${p.image}" alt="">
                <div class="wishlist-item-info">
                    <div class="wishlist-item-name">${p.name}</div>
                    <div class="wishlist-item-price">${formatPrice(p.price)}</div>
                </div>
                <button type="button" class="btn btn-sm" onclick="quickView(${p.id}); toggleWishlistSidebar();">View</button>
            </div>`;
    }).join('');
}

function toggleWishlistSidebar() {
    const side = document.getElementById('wishlistSidebar');
    const ov = document.getElementById('wishlistOverlay');
    if (!side || !ov) return;
    side.classList.toggle('active');
    ov.classList.toggle('active');
    document.body.style.overflow = side.classList.contains('active') ? 'hidden' : '';
    renderWishlistSidebar();
}

// ============================
// Recently viewed
// ============================
function addRecentlyViewed(productId) {
    recentlyViewed = recentlyViewed.filter(id => id !== productId);
    recentlyViewed.unshift(productId);
    recentlyViewed = recentlyViewed.slice(0, 6);
    localStorage.setItem('maheshRecent', JSON.stringify(recentlyViewed));
    renderRecentlyViewed();
}

function renderRecentlyViewed() {
    const wrap = document.getElementById('recentlyViewedWrap');
    const row = document.getElementById('recentlyViewedRow');
    if (!wrap || !row) return;
    const ids = recentlyViewed.filter(id => products.some(p => p.id === id));
    if (ids.length === 0) {
        wrap.hidden = true;
        return;
    }
    wrap.hidden = false;
    row.innerHTML = ids.map(id => {
        const p = products.find(x => x.id === id);
        return `
            <div class="recent-item" onclick="quickView(${p.id})">
                <img src="${p.image}" alt="">
                <div class="recent-item-info">${p.name}</div>
            </div>`;
    }).join('');
}

// ============================
// EMI
// ============================
function openEmiModal(price) {
    const modal = document.getElementById('emiModal');
    const input = document.getElementById('emiPrice');
    if (input && price != null && !isNaN(price)) input.value = price;
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    const res = document.getElementById('emiResult');
    if (res) res.textContent = '';
}

function closeEmiModal() {
    const modal = document.getElementById('emiModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

function calculateEmi() {
    const p = parseFloat(document.getElementById('emiPrice').value) || 0;
    const n = parseInt(document.getElementById('emiTenure').value, 10) || 12;
    const annual = parseFloat(document.getElementById('emiRate').value) || 0;
    const resEl = document.getElementById('emiResult');
    if (!resEl) return;

    let emi;
    if (annual === 0) {
        emi = p / n;
    } else {
        const r = annual / 12 / 100;
        emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    }
    const label = typeof t === 'function' ? t('emi_monthly') : 'Monthly EMI';
    resEl.textContent = `${label}: ${formatPrice(Math.round(emi))}`;
}

// ============================
// Delivery estimator
// ============================
function estimateDeliveryFromInput(inputId, resultId) {
    const input = document.getElementById(inputId);
    const out = document.getElementById(resultId);
    if (!input || !out) return;
    const pin = (input.value || '').replace(/\D/g, '');
    out.textContent = getDeliveryEstimateText(pin);
}

function getDeliveryEstimateText(pin) {
    if (pin.length !== 6) {
        return typeof t === 'function' ? t('pin_invalid') : 'Enter a valid 6-digit PIN code';
    }
    if (pin.startsWith('314')) {
        return typeof t === 'function' ? t('pin_314') : 'Free delivery — estimated 1–2 days';
    }
    if (/^3\d{5}$/.test(pin)) {
        return typeof t === 'function' ? t('pin_3xx') : 'Delivery ₹500 — estimated 3–5 days';
    }
    return typeof t === 'function' ? t('pin_other') : 'Delivery ₹1,000 — estimated 5–7 days';
}

// ============================
// Share website
// ============================
function shareWebsite() {
    const url = window.location.href.split('#')[0];
    const base = typeof t === 'function' ? t('share_site_msg') : 'Check out Mahesh & Company Aspur — agriculture equipment & JCB services: ';
    const text = base + url;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
}

// ============================
// Stock notification
// ============================
function notifyStockWhatsApp(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const msg = typeof t === 'function'
        ? t('notify_msg').replace('{name}', product.name)
        : `Hello Mahesh & Company, please notify me when this product is back in stock: ${product.name}`;
    window.open(`https://wa.me/917297047681?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
}

// ============================
// Cart Functions
// ============================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || product.inStock === false) return;

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
    renderProducts(currentFilter, document.getElementById('searchInput').value);
    showToast(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(c => c.id !== productId);
    saveCart();
    updateCartUI();
    renderProducts(currentFilter, document.getElementById('searchInput').value);
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
    renderProducts(currentFilter, document.getElementById('searchInput').value);
}

function clearCart() {
    if (cart.length === 0) return;
    cart = [];
    saveCart();
    updateCartUI();
    renderProducts(currentFilter, document.getElementById('searchInput').value);
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
                        <button type="button" class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                        <span class="qty-value">${item.qty}</span>
                        <button type="button" class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button type="button" class="cart-item-remove" onclick="removeFromCart(${item.id})">
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

    const paymentText = {
        'cod': 'Cash on Delivery',
        'upi': 'UPI Payment',
        'bank': 'Bank Transfer',
        'emi': 'EMI'
    }[payment] || payment;

    const itemsList = cart.map(item =>
        `• ${item.name} × ${item.qty} = ${formatPrice(item.price * item.qty)}`
    ).join('\n');

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

    const trackBtn = document.querySelector('#successModal .btn-outline');
    if (trackBtn) {
        trackBtn.href = whatsappURL;
    }

    document.getElementById('successModal').classList.add('active');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    }, 1500);

    cart = [];
    saveCart();
    updateCartUI();
    renderProducts(currentFilter, document.getElementById('searchInput').value);
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

    addRecentlyViewed(productId);

    const discount = Math.round((1 - product.price / product.originalPrice) * 100);
    const content = document.getElementById('quickViewContent');
    const stock = product.inStock !== false;

    content.innerHTML = `
        <div class="quickview-image quickview-image-zoom-wrap">
            <img src="${product.image}" alt="${product.name}" draggable="false">
            <span class="quickview-zoom-hint">${typeof t === 'function' ? t('zoom_hint') : 'Hover to zoom · Pinch on mobile'}</span>
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
            <div class="delivery-estimator quickview-delivery">
                <label class="delivery-est-desc" for="qvPin">${typeof t === 'function' ? t('delivery_est_short') : 'PIN code'}</label>
                <div class="delivery-est-row">
                    <input type="text" id="qvPin" maxlength="6" placeholder="314021" inputmode="numeric">
                    <button type="button" class="btn btn-sm btn-primary" onclick="estimateDeliveryFromInput('qvPin','qvPinResult')">${typeof t === 'function' ? t('delivery_est_btn') : 'Check'}</button>
                </div>
                <p class="delivery-est-result" id="qvPinResult"></p>
            </div>
            ${stock ? `
            <button type="button" class="btn btn-primary btn-full" onclick="addToCart(${product.id}); closeQuickView();">
                <i class="fas fa-cart-plus"></i> ${typeof t === 'function' ? t('add_to_cart') : 'Add to Cart'}
            </button>` : `
            <button type="button" class="btn btn-primary btn-full notify-btn" onclick="notifyStockWhatsApp(${product.id}); closeQuickView();">
                <i class="fab fa-whatsapp"></i> ${typeof t === 'function' ? t('notify_me') : 'Notify Me'}
            </button>`}
            <button type="button" class="btn btn-outline btn-full" style="margin-top:10px;border-color:var(--primary);color:var(--primary);" onclick="openEmiModal(${product.price})">
                <i class="fas fa-calculator"></i> ${typeof t === 'function' ? t('emi_calc_link') : 'EMI Calculator'}
            </button>
            <div style="margin-top: 12px; text-align: center;">
                <a href="https://wa.me/917297047681?text=${encodeURIComponent(`Hi! I'm interested in ${product.name} (${formatPrice(product.price)})`)}" 
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
// Reveal Animations (static sections)
// ============================
function setupRevealAnimations() {
    const reveals = document.querySelectorAll(
        '.category-card, .service-card, .testimonial-card, .contact-card'
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

// FAQ render — uses translations
function renderFaq() {
    const container = document.getElementById('faqAccordion');
    if (!container || typeof translations === 'undefined') return;

    const lang = translations[currentLanguage];
    const keys = [1, 2, 3, 4, 5, 6, 7, 8];
    container.innerHTML = keys.map(i => `
        <div class="faq-item" data-faq="${i}">
            <button type="button" class="faq-question" aria-expanded="false" onclick="toggleFaqItem(this)">
                <span>${lang['faq_q' + i] || ''}</span>
                <span class="faq-toggle-icon"><i class="fas fa-plus"></i></span>
            </button>
            <div class="faq-answer">
                <div class="faq-answer-inner">${lang['faq_a' + i] || ''}</div>
            </div>
        </div>
    `).join('');
}

function toggleFaqItem(btn) {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const icon = btn.querySelector('.faq-toggle-icon i');
    const expanded = item.classList.contains('open');

    document.querySelectorAll('.faq-item.open').forEach(other => {
        if (other !== item) {
            other.classList.remove('open');
            other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            const ans = other.querySelector('.faq-answer');
            ans.style.maxHeight = null;
            const ic = other.querySelector('.faq-toggle-icon i');
            ic.className = 'fas fa-plus';
        }
    });

    if (expanded) {
        item.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
        icon.className = 'fas fa-plus';
    } else {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.className = 'fas fa-minus';
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCheckout();
        closeSuccessModal();
        closeQuickView();
        closeEmiModal();
        if (document.getElementById('cartSidebar').classList.contains('active')) {
            toggleCart();
        }
        if (document.getElementById('wishlistSidebar').classList.contains('active')) {
            toggleWishlistSidebar();
        }
    }
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('active');
    });
});
