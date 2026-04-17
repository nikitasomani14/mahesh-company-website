// ============================
// Language Translations
// ============================
let currentLang = localStorage.getItem('maheshLang') || 'en';

const translations = {
    en: {
        // Navbar
        home: 'Home',
        categories: 'Categories',
        products: 'Products',
        services: 'Services',
        about: 'About',
        contact: 'Contact',
        searchPlaceholder: 'Search products...',
        
        // Hero
        heroBadge: 'Authorized Dealer',
        heroTitle1: 'Your Trusted Partner in',
        heroHighlight1: 'Agriculture',
        heroDesc1: 'Complete range of agriculture machinery, thresher machines, spare parts & JCB services. Authorized dealer of <strong>Sonalika Thresher</strong> & <strong>Honda Engines</strong>.',
        shopNow: 'Shop Now',
        contactUs: 'Contact Us',
        yearsExp: 'Years Experience',
        happyCustomers: 'Happy Customers',
        productsCount: 'Products',
        
        // Hero Slide 2
        heroBadge2: 'Premium Quality',
        heroTitle2: 'Sonalika Thresher',
        heroHighlight2: 'Authorized Dealer',
        heroDesc2: 'Get genuine Sonalika multi-crop threshers with warranty, spare parts and expert service support. Best prices guaranteed!',
        viewCollection: 'View Collection',
        getQuote: 'Get Quote',
        
        // Hero Slide 3
        heroBadge3: 'Honda Engines',
        heroTitle3: 'Powerful',
        heroHighlight3: 'Honda Engines',
        heroDesc3: 'Authorized dealer of Honda GX Series engines. Reliable, fuel-efficient engines for agriculture, water pumps, and industrial use.',
        exploreEngines: 'Explore Engines',
        ourServices: 'Our Services',
        
        // Brands Strip
        authorizedSonalika: 'Authorized Sonalika Dealer',
        hondaDealer: 'Honda Engine Dealer',
        freeDelivery: 'Free Delivery in Aspur',
        genuineParts: 'Genuine Parts Guaranteed',
        support247: '24/7 Service Support',
        
        // Categories Section
        whatWeOffer: 'What We Offer',
        ourProductCategories: 'Our Product',
        categoriesHighlight: 'Categories',
        categoriesDesc: 'Explore our wide range of agricultural machinery, parts, and services',
        thresherMachines: 'Thresher Machines',
        thresherDesc: 'Sonalika & Multi-crop threshers',
        engines: 'Engines',
        enginesDesc: 'Honda & Oil bearing engines',
        jcbServices: 'JCB Services',
        jcbDesc: 'Rental & contract services',
        agricultureParts: 'Agriculture Parts',
        partsDesc: 'Spare parts & accessories',
        farmingTools: 'Farming Tools',
        toolsDesc: 'Hand tools & implements',
        pumpsIrrigation: 'Pumps & Irrigation',
        pumpsDesc: 'Water pumps & sprinklers',
        productsText: 'Products',
        servicesText: 'Services',
        
        // Products Section
        ourCollection: 'Our Collection',
        featuredProducts: 'Featured',
        productsHighlight: 'Products',
        productsDesc: 'Quality agricultural equipment at competitive prices',
        allProducts: 'All Products',
        threshers: 'Threshers',
        jcb: 'JCB',
        parts: 'Parts',
        tools: 'Tools',
        pumps: 'Pumps',
        reviews: 'reviews',
        addToCart: 'Add to Cart',
        inCart: 'In Cart',
        
        // Offer Banner
        limitedTimeOffer: 'Limited Time Offer',
        monsoonSale: 'Monsoon Sale - Up to',
        offerHighlight: '30% OFF',
        offerDesc: 'Get the best deals on Sonalika Threshers and Honda Engines. Free delivery and installation on orders above ₹50,000!',
        shopTheSale: 'Shop the Sale',
        days: 'Days',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds',
        
        // Services Section
        whatWeDo: 'What We Do',
        ourServicesTitle: 'Our',
        servicesHighlight: 'Services',
        servicesDesc: 'Beyond products, we provide comprehensive agricultural support',
        jcbOnRent: 'JCB on Rent',
        jcbRentDesc: 'Heavy-duty JCB machines available for rent. Farm land leveling, digging, loading, and construction work.',
        startingAt: 'Starting at',
        perHour: '/hr',
        bookNow: 'Book Now',
        machineRepair: 'Machine Repair',
        repairDesc: 'Expert repair services for threshers, engines, and all agricultural machinery. On-site and workshop repairs.',
        diagnostic: 'Diagnostic',
        installation: 'Installation',
        installDesc: 'Professional installation of thresher machines, engines, and irrigation systems with warranty.',
        freeAbove: 'Free above ₹50,000',
        learnMore: 'Learn More',
        homeDelivery: 'Home Delivery',
        deliveryDesc: 'Free delivery of all products within Aspur and nearby areas. Pan-India shipping available.',
        freeInAspur: 'Free in Aspur',
        inquire: 'Inquire',
        buybackExchange: 'Buy-back & Exchange',
        buybackDesc: 'Exchange your old machinery for new. Get best value for your used equipment.',
        upToValue: 'Up to 40% Value',
        checkValue: 'Check Value',
        emiFinancing: 'EMI & Financing',
        emiDesc: 'Easy EMI options available on all major purchases. Quick loan approval with minimal documentation.',
        zeroEmi: '0% EMI Available',
        applyNow: 'Apply Now',
        
        // Testimonials
        customerLove: 'Customer Love',
        whatCustomersSay: 'What Our',
        customersHighlight: 'Customers',
        saySuffix: 'Say',
        testimonial1: 'Best agriculture shop in Aspur! Bought Sonalika thresher from here. Excellent quality and after-sales service. Highly recommended!',
        testimonial1Author: 'Ramesh Patel',
        testimonial1Role: 'Farmer, Aspur',
        testimonial2: 'JCB service is very reliable. Always on time and reasonable rates. Mahesh ji is very helpful and honest in dealings.',
        testimonial2Author: 'Suresh Kumar',
        testimonial2Role: 'Contractor, Dungarpur',
        testimonial3: 'Got Honda GX390 engine at the best price. Genuine product with proper warranty. The engine runs perfectly for my water pump.',
        testimonial3Author: 'Mohan Singh',
        testimonial3Role: 'Farmer, Sagwara',
        
        // About Section
        aboutUs: 'About Us',
        servingSince: 'Serving Farmers Since',
        sinceYear: '2001',
        aboutDesc: 'Mahesh & Company has been the most trusted name in agricultural equipment and services in Aspur, Rajasthan. Founded with a vision to empower farmers with quality machinery, we have grown from a small spare parts shop to the region\'s leading agricultural solutions provider.',
        authSonalikaDealer: 'Authorized Sonalika Thresher Dealer',
        authHondaDealer: 'Authorized Honda Engine Dealer',
        genuinePartsWarranty: 'Genuine Parts with Warranty',
        expertTechSupport: 'Expert Technical Support',
        jcbRentalContract: 'JCB Rental & Contract Services',
        easyEmiOptions: 'Easy EMI & Financing Options',
        partnerWithUs: 'Partner With Us',
        callNow: 'Call Now',
        yearsOfTrust: 'Years of Trust',
        
        // Contact Section
        getInTouch: 'Get in Touch',
        contactTitle: 'Contact',
        contactHighlight: 'Us',
        contactDesc: 'Visit our showroom or reach out for any inquiries',
        visitOurShop: 'Visit Our Shop',
        address: 'Main Market Road, Near Bus Stand,<br>Aspur, Dungarpur District,<br>Rajasthan - 314021',
        callUs: 'Call Us',
        businessHours: 'Business Hours',
        hoursText: 'Monday - Saturday: 8:00 AM - 8:00 PM<br>Sunday: 9:00 AM - 2:00 PM',
        whatsapp: 'WhatsApp',
        quickResponse: 'Quick response guaranteed!',
        sendMessage: 'Send us a Message',
        fullName: 'Full Name',
        yourName: 'Your name',
        phoneNumber: 'Phone Number',
        yourPhone: 'Your phone number',
        email: 'Email',
        yourEmail: 'Your email address',
        subject: 'Subject',
        selectSubject: 'Select a subject',
        productInquiry: 'Product Inquiry',
        jcbBooking: 'JCB Booking',
        spareParts: 'Spare Parts',
        serviceRepair: 'Service & Repair',
        emiFinance: 'EMI & Finance',
        other: 'Other',
        message: 'Message',
        howCanWeHelp: 'How can we help you?',
        sendMessageBtn: 'Send Message',
        
        // Footer
        footerDesc: 'Your trusted partner for all agricultural needs. Serving farmers with quality products and honest service since 2001.',
        quickLinks: 'Quick Links',
        productCategories: 'Product Categories',
        contactInfo: 'Contact Info',
        allRightsReserved: 'All Rights Reserved',
        trustedDealer: 'Trusted Dealer',
        isoCertified: 'ISO Certified',
        secureShopping: 'Secure Shopping',
        
        // Cart
        yourCart: 'Your Cart',
        cartEmpty: 'Your cart is empty',
        startShopping: 'Start Shopping',
        total: 'Total',
        proceedToCheckout: 'Proceed to Checkout',
        clearCart: 'Clear Cart',
        
        // Checkout
        placeYourOrder: 'Place Your Order',
        orderSummary: 'Order Summary',
        deliveryAddress: 'Delivery Address',
        fullDeliveryAddress: 'Full delivery address',
        paymentMethod: 'Payment Method',
        cod: 'Cash on Delivery',
        upiPayment: 'UPI Payment',
        bankTransfer: 'Bank Transfer',
        emi: 'EMI (for orders above ₹25,000)',
        specialInstructions: 'Special Instructions',
        anySpecialRequests: 'Any special requests?',
        placeOrder: 'Place Order',
        
        // Success Modal
        orderSuccess: 'Order Placed Successfully!',
        orderSuccessDesc: 'Thank you for your order. We will contact you shortly to confirm your order.',
        continueShopping: 'Continue Shopping',
        trackOnWhatsapp: 'Track on WhatsApp',
        
        // WhatsApp
        chatWithUs: 'Chat with us',
        
        // Language
        language: 'हिंदी',
        
        // Category names for products
        catThresher: 'Thresher Machine',
        catEngine: 'Engine',
        catJcb: 'JCB Service',
        catParts: 'Agriculture Parts',
        catTools: 'Farming Tools',
        catPump: 'Pumps & Irrigation'
    },
    hi: {
        // Navbar
        home: 'होम',
        categories: 'श्रेणियाँ',
        products: 'उत्पाद',
        services: 'सेवाएं',
        about: 'हमारे बारे में',
        contact: 'संपर्क',
        searchPlaceholder: 'उत्पाद खोजें...',
        
        // Hero
        heroBadge: 'अधिकृत डीलर',
        heroTitle1: 'में आपका विश्वसनीय साथी',
        heroHighlight1: 'कृषि',
        heroDesc1: 'कृषि मशीनरी, थ्रेशर मशीन, स्पेयर पार्ट्स और JCB सेवाओं की पूरी श्रृंखला। <strong>सोनालिका थ्रेशर</strong> और <strong>होंडा इंजन</strong> के अधिकृत डीलर।',
        shopNow: 'अभी खरीदें',
        contactUs: 'संपर्क करें',
        yearsExp: 'वर्षों का अनुभव',
        happyCustomers: 'खुश ग्राहक',
        productsCount: 'उत्पाद',
        
        // Hero Slide 2
        heroBadge2: 'प्रीमियम गुणवत्ता',
        heroTitle2: 'सोनालिका थ्रेशर',
        heroHighlight2: 'अधिकृत डीलर',
        heroDesc2: 'वारंटी, स्पेयर पार्ट्स और विशेषज्ञ सेवा सहायता के साथ असली सोनालिका मल्टी-क्रॉप थ्रेशर प्राप्त करें। सर्वोत्तम मूल्य की गारंटी!',
        viewCollection: 'संग्रह देखें',
        getQuote: 'कोटेशन लें',
        
        // Hero Slide 3
        heroBadge3: 'होंडा इंजन',
        heroTitle3: 'शक्तिशाली',
        heroHighlight3: 'होंडा इंजन',
        heroDesc3: 'होंडा GX सीरीज़ इंजन के अधिकृत डीलर। कृषि, वॉटर पंप और औद्योगिक उपयोग के लिए विश्वसनीय, ईंधन-कुशल इंजन।',
        exploreEngines: 'इंजन देखें',
        ourServices: 'हमारी सेवाएं',
        
        // Brands Strip
        authorizedSonalika: 'अधिकृत सोनालिका डीलर',
        hondaDealer: 'होंडा इंजन डीलर',
        freeDelivery: 'आसपुर में मुफ्त डिलीवरी',
        genuineParts: 'असली पार्ट्स की गारंटी',
        support247: '24/7 सेवा सहायता',
        
        // Categories Section
        whatWeOffer: 'हम क्या प्रदान करते हैं',
        ourProductCategories: 'हमारी उत्पाद',
        categoriesHighlight: 'श्रेणियाँ',
        categoriesDesc: 'कृषि मशीनरी, पार्ट्स और सेवाओं की विस्तृत श्रृंखला देखें',
        thresherMachines: 'थ्रेशर मशीन',
        thresherDesc: 'सोनालिका और मल्टी-क्रॉप थ्रेशर',
        engines: 'इंजन',
        enginesDesc: 'होंडा और ऑयल बेयरिंग इंजन',
        jcbServices: 'JCB सेवाएं',
        jcbDesc: 'किराये और ठेका सेवाएं',
        agricultureParts: 'कृषि पार्ट्स',
        partsDesc: 'स्पेयर पार्ट्स और एक्सेसरीज़',
        farmingTools: 'खेती के औजार',
        toolsDesc: 'हैंड टूल्स और उपकरण',
        pumpsIrrigation: 'पंप और सिंचाई',
        pumpsDesc: 'वॉटर पंप और स्प्रिंकलर',
        productsText: 'उत्पाद',
        servicesText: 'सेवाएं',
        
        // Products Section
        ourCollection: 'हमारा संग्रह',
        featuredProducts: 'विशेष',
        productsHighlight: 'उत्पाद',
        productsDesc: 'प्रतिस्पर्धी मूल्यों पर गुणवत्तापूर्ण कृषि उपकरण',
        allProducts: 'सभी उत्पाद',
        threshers: 'थ्रेशर',
        jcb: 'JCB',
        parts: 'पार्ट्स',
        tools: 'औजार',
        pumps: 'पंप',
        reviews: 'समीक्षाएं',
        addToCart: 'कार्ट में डालें',
        inCart: 'कार्ट में है',
        
        // Offer Banner
        limitedTimeOffer: 'सीमित समय का ऑफर',
        monsoonSale: 'मानसून सेल - अधिकतम',
        offerHighlight: '30% छूट',
        offerDesc: 'सोनालिका थ्रेशर और होंडा इंजन पर सर्वोत्तम सौदे प्राप्त करें। ₹50,000 से ऊपर के ऑर्डर पर मुफ्त डिलीवरी और इंस्टॉलेशन!',
        shopTheSale: 'सेल में खरीदें',
        days: 'दिन',
        hours: 'घंटे',
        minutes: 'मिनट',
        seconds: 'सेकंड',
        
        // Services Section
        whatWeDo: 'हम क्या करते हैं',
        ourServicesTitle: 'हमारी',
        servicesHighlight: 'सेवाएं',
        servicesDesc: 'उत्पादों के अलावा, हम व्यापक कृषि सहायता प्रदान करते हैं',
        jcbOnRent: 'JCB किराये पर',
        jcbRentDesc: 'भारी-शुल्क JCB मशीनें किराये पर उपलब्ध। खेत समतल करना, खुदाई, लोडिंग और निर्माण कार्य।',
        startingAt: 'शुरुआत',
        perHour: '/घंटा',
        bookNow: 'अभी बुक करें',
        machineRepair: 'मशीन मरम्मत',
        repairDesc: 'थ्रेशर, इंजन और सभी कृषि मशीनरी के लिए विशेषज्ञ मरम्मत सेवाएं। साइट पर और वर्कशॉप मरम्मत।',
        diagnostic: 'डायग्नोस्टिक',
        installation: 'इंस्टॉलेशन',
        installDesc: 'थ्रेशर मशीन, इंजन और सिंचाई प्रणालियों की वारंटी के साथ पेशेवर इंस्टॉलेशन।',
        freeAbove: '₹50,000 से ऊपर मुफ्त',
        learnMore: 'और जानें',
        homeDelivery: 'होम डिलीवरी',
        deliveryDesc: 'आसपुर और आसपास के क्षेत्रों में सभी उत्पादों की मुफ्त डिलीवरी। पूरे भारत में शिपिंग उपलब्ध।',
        freeInAspur: 'आसपुर में मुफ्त',
        inquire: 'पूछताछ करें',
        buybackExchange: 'बायबैक और एक्सचेंज',
        buybackDesc: 'अपनी पुरानी मशीनरी को नई से बदलें। अपने उपयोग किए गए उपकरणों का सर्वोत्तम मूल्य प्राप्त करें।',
        upToValue: '40% तक मूल्य',
        checkValue: 'मूल्य जांचें',
        emiFinancing: 'EMI और फाइनेंसिंग',
        emiDesc: 'सभी बड़ी खरीदारी पर आसान EMI विकल्प उपलब्ध। न्यूनतम दस्तावेज़ों के साथ त्वरित लोन स्वीकृति।',
        zeroEmi: '0% EMI उपलब्ध',
        applyNow: 'अभी आवेदन करें',
        
        // Testimonials
        customerLove: 'ग्राहकों का प्यार',
        whatCustomersSay: 'हमारे',
        customersHighlight: 'ग्राहक',
        saySuffix: 'क्या कहते हैं',
        testimonial1: 'आसपुर में सबसे अच्छी कृषि दुकान! यहां से सोनालिका थ्रेशर खरीदा। उत्कृष्ट गुणवत्ता और बिक्री के बाद सेवा। अत्यधिक अनुशंसित!',
        testimonial1Author: 'रमेश पटेल',
        testimonial1Role: 'किसान, आसपुर',
        testimonial2: 'JCB सेवा बहुत विश्वसनीय है। हमेशा समय पर और उचित दरें। महेश जी बहुत मददगार और ईमानदार हैं।',
        testimonial2Author: 'सुरेश कुमार',
        testimonial2Role: 'ठेकेदार, डूंगरपुर',
        testimonial3: 'होंडा GX390 इंजन सबसे अच्छी कीमत पर मिला। उचित वारंटी के साथ असली उत्पाद। इंजन मेरे वॉटर पंप के लिए बिल्कुल सही चलता है।',
        testimonial3Author: 'मोहन सिंह',
        testimonial3Role: 'किसान, सागवाड़ा',
        
        // About Section
        aboutUs: 'हमारे बारे में',
        servingSince: 'किसानों की सेवा में',
        sinceYear: '2001 से',
        aboutDesc: 'महेश एंड कंपनी आसपुर, राजस्थान में कृषि उपकरण और सेवाओं में सबसे विश्वसनीय नाम रहा है। गुणवत्तापूर्ण मशीनरी के साथ किसानों को सशक्त बनाने की दृष्टि से स्थापित, हम एक छोटी स्पेयर पार्ट्स की दुकान से क्षेत्र के अग्रणी कृषि समाधान प्रदाता बन गए हैं।',
        authSonalikaDealer: 'अधिकृत सोनालिका थ्रेशर डीलर',
        authHondaDealer: 'अधिकृत होंडा इंजन डीलर',
        genuinePartsWarranty: 'वारंटी के साथ असली पार्ट्स',
        expertTechSupport: 'विशेषज्ञ तकनीकी सहायता',
        jcbRentalContract: 'JCB किराया और ठेका सेवाएं',
        easyEmiOptions: 'आसान EMI और फाइनेंसिंग विकल्प',
        partnerWithUs: 'हमारे साथ जुड़ें',
        callNow: 'अभी कॉल करें',
        yearsOfTrust: 'वर्षों का विश्वास',
        
        // Contact Section
        getInTouch: 'संपर्क करें',
        contactTitle: 'हमसे',
        contactHighlight: 'संपर्क',
        contactDesc: 'हमारे शोरूम पर आएं या किसी भी पूछताछ के लिए संपर्क करें',
        visitOurShop: 'हमारी दुकान पर आएं',
        address: 'मुख्य बाजार रोड, बस स्टैंड के पास,<br>आसपुर, डूंगरपुर जिला,<br>राजस्थान - 314021',
        callUs: 'कॉल करें',
        businessHours: 'कार्य समय',
        hoursText: 'सोमवार - शनिवार: सुबह 8:00 - रात 8:00<br>रविवार: सुबह 9:00 - दोपहर 2:00',
        whatsapp: 'व्हाट्सएप',
        quickResponse: 'त्वरित प्रतिक्रिया की गारंटी!',
        sendMessage: 'हमें संदेश भेजें',
        fullName: 'पूरा नाम',
        yourName: 'आपका नाम',
        phoneNumber: 'फोन नंबर',
        yourPhone: 'आपका फोन नंबर',
        email: 'ईमेल',
        yourEmail: 'आपका ईमेल पता',
        subject: 'विषय',
        selectSubject: 'विषय चुनें',
        productInquiry: 'उत्पाद पूछताछ',
        jcbBooking: 'JCB बुकिंग',
        spareParts: 'स्पेयर पार्ट्स',
        serviceRepair: 'सेवा और मरम्मत',
        emiFinance: 'EMI और फाइनेंस',
        other: 'अन्य',
        message: 'संदेश',
        howCanWeHelp: 'हम आपकी कैसे मदद कर सकते हैं?',
        sendMessageBtn: 'संदेश भेजें',
        
        // Footer
        footerDesc: 'सभी कृषि जरूरतों के लिए आपका विश्वसनीय साथी। 2001 से गुणवत्तापूर्ण उत्पादों और ईमानदार सेवा के साथ किसानों की सेवा।',
        quickLinks: 'त्वरित लिंक',
        productCategories: 'उत्पाद श्रेणियाँ',
        contactInfo: 'संपर्क जानकारी',
        allRightsReserved: 'सर्वाधिकार सुरक्षित',
        trustedDealer: 'विश्वसनीय डीलर',
        isoCertified: 'ISO प्रमाणित',
        secureShopping: 'सुरक्षित खरीदारी',
        
        // Cart
        yourCart: 'आपका कार्ट',
        cartEmpty: 'आपका कार्ट खाली है',
        startShopping: 'खरीदारी शुरू करें',
        total: 'कुल',
        proceedToCheckout: 'चेकआउट करें',
        clearCart: 'कार्ट खाली करें',
        
        // Checkout
        placeYourOrder: 'अपना ऑर्डर दें',
        orderSummary: 'ऑर्डर सारांश',
        deliveryAddress: 'डिलीवरी पता',
        fullDeliveryAddress: 'पूरा डिलीवरी पता',
        paymentMethod: 'भुगतान विधि',
        cod: 'कैश ऑन डिलीवरी',
        upiPayment: 'UPI भुगतान',
        bankTransfer: 'बैंक ट्रांसफर',
        emi: 'EMI (₹25,000 से ऊपर के ऑर्डर के लिए)',
        specialInstructions: 'विशेष निर्देश',
        anySpecialRequests: 'कोई विशेष अनुरोध?',
        placeOrder: 'ऑर्डर दें',
        
        // Success Modal
        orderSuccess: 'ऑर्डर सफलतापूर्वक दिया गया!',
        orderSuccessDesc: 'आपके ऑर्डर के लिए धन्यवाद। हम जल्द ही आपके ऑर्डर की पुष्टि के लिए संपर्क करेंगे।',
        continueShopping: 'खरीदारी जारी रखें',
        trackOnWhatsapp: 'व्हाट्सएप पर ट्रैक करें',
        
        // WhatsApp
        chatWithUs: 'हमसे चैट करें',
        
        // Language
        language: 'English',
        
        // Category names for products
        catThresher: 'थ्रेशर मशीन',
        catEngine: 'इंजन',
        catJcb: 'JCB सेवा',
        catParts: 'कृषि पार्ट्स',
        catTools: 'खेती के औजार',
        catPump: 'पंप और सिंचाई'
    }
};

// ============================
// Language Toggle Function
// ============================
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'hi' : 'en';
    localStorage.setItem('maheshLang', currentLang);
    applyTranslations();
    updateLangButton();
}

function updateLangButton() {
    const langBtn = document.getElementById('langToggle');
    if (langBtn) {
        langBtn.innerHTML = `<i class="fas fa-globe"></i> ${translations[currentLang].language}`;
    }
}

function applyTranslations() {
    const t = translations[currentLang];
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (t[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = t[key];
            } else {
                el.innerHTML = t[key];
            }
        }
    });
    
    // Update search placeholder
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.placeholder = t.searchPlaceholder;
    }
    
    // Re-render products with correct language
    renderProducts(currentFilter);
}

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
        image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=500&q=80",
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
        image: "https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=500&q=80",
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
        image: "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=500&q=80",
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
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500&q=80",
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
        image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=500&q=80",
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
        image: "https://images.unsplash.com/photo-1580901368919-7738efb0f228?w=500&q=80",
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
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500&q=80",
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
        image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&q=80",
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
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&q=80",
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
        image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c8b8b?w=500&q=80",
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
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500&q=80",
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
        image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=500&q=80",
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
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80",
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
        image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=500&q=80",
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
        image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=500&q=80",
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
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&q=80",
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
        image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=500&q=80",
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
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500&q=80",
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
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&q=80",
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
        image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=500&q=80",
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
    updateLangButton();
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
                        <span>(${product.reviews} ${translations[currentLang].reviews})</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">${formatPrice(product.price)}</span>
                        <span class="original-price">${formatPrice(product.originalPrice)}</span>
                    </div>
                    <button class="product-cart-btn ${inCart ? 'added' : ''}" onclick="addToCart(${product.id})">
                        <i class="fas ${inCart ? 'fa-check' : 'fa-shopping-cart'}"></i>
                        ${inCart ? `${translations[currentLang].inCart} (${inCart.qty})` : translations[currentLang].addToCart}
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
    const t = translations[currentLang];
    const names = {
        thresher: t.catThresher,
        engine: t.catEngine,
        jcb: t.catJcb,
        parts: t.catParts,
        tools: t.catTools,
        pump: t.catPump
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
    const address = document.getElementById('orderAddress').value;
    const payment = document.getElementById('orderPayment').value;
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const orderNumber = 'MC' + Date.now().toString().slice(-8);

    closeCheckout();

    const details = document.getElementById('orderDetails');
    details.innerHTML = `
        <p><strong>Order ID:</strong> ${orderNumber}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Total:</strong> ${formatPrice(totalPrice)}</p>
        <p><strong>Payment:</strong> ${payment === 'cod' ? 'Cash on Delivery' : payment === 'upi' ? 'UPI Payment' : payment === 'bank' ? 'Bank Transfer' : 'EMI'}</p>
        <p><strong>Delivery:</strong> ${address}</p>
    `;

    document.getElementById('successModal').classList.add('active');
    document.body.style.overflow = 'hidden';

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
