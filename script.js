/* =========================================
   1. OFFLINE-COMPATIBLE COMPONENT INJECTION
   ========================================= */

// We store the HTML in variables so it works without a server (No CORS errors)
const HEADER_HTML = `
<div class="top-dashboard">
    <div class="td-row-1">
        <div class="td-social">
            <span>Follow Us:</span>
            <a href="#" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
            <a href="#" target="_blank"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" target="_blank"><i class="fa-brands fa-facebook"></i></a>
        </div>
        <div class="td-news-ticker">
            <div class="ticker-label"><div class="live-dot"></div> MARKET FEED</div>
            <div class="ticker-track" id="dynamic-ticker"></div>
        </div>
        <div class="td-utilities desktop-only">
            <div class="lang-dropdown">
                <button onclick="toggleLang()" class="lang-btn"><i class="fa-solid fa-globe"></i> Global (EN) <i class="fa-solid fa-caret-down"></i></button>
                <div class="lang-menu" id="langMenu">
                    <a onclick="changeLanguage('en')">English</a>
                    <a onclick="changeLanguage('hi')">हिन्दी (Hindi)</a>
                    <a onclick="changeLanguage('zh-CN')">中文 (Mandarin)</a>
                    <a onclick="changeLanguage('es')">Español (Spanish)</a>
                    <a onclick="changeLanguage('ar')">العربية (Arabic)</a>
                </div>
            </div>
        </div>
    </div>
    <div class="td-row-2">
        <div class="forex-group">
            <span id="forex-date" style="font-size:0.7rem; color:#888; text-transform:uppercase;"></span>
            <div class="forex-item" id="fx-usd">USD/INR <span>..</span></div>
            <div class="forex-item" id="fx-eur">EUR/INR <span>..</span></div>
            <div class="forex-item desktop-only" id="fx-gbp">GBP/INR <span>..</span></div>
        </div>
        <a href="contact.html" class="visit-plan"><i class="fa-solid fa-plane-departure"></i> MEET US AT GULFOOD DUBAI</a>
    </div>
</div>

<nav class="jft-navbar" id="navbar">
    <div class="jft-wide-container nav-flex">
        <a href="index.html" class="nav-logo-link">
            <img src="https://jftagro.com/wp-content/uploads/2023/01/jft-final-02-scaled.png" alt="JFT Agro Overseas" class="nav-logo-img">
        </a>
        <div class="nav-menu" id="navMenu">
            <a href="index.html" class="nav-link">Home</a>
            <a href="about.html" class="nav-link">About</a>
            <a href="products.html" class="nav-link">Products</a>
            <a href="infrastructure.html" class="nav-link">Infra</a>
            <a href="index.html#global-reach" class="nav-link">Network</a>
            <a href="contact.html" class="nav-link">Contact</a>
            <a href="contact.html" class="nav-btn-action desktop-only">Get Quote</a>
        </div>
        <div class="mobile-toggle" onclick="toggleMenu()"><i class="fa-solid fa-bars"></i></div>
    </div>
</nav>
`;

const FOOTER_HTML = `
<footer class="footer-section" id="contact">
    <div class="jft-wide-container">
        <div class="footer-grid">
            <div class="f-col">
                <img src="https://jftagro.com/wp-content/uploads/2023/01/jft-final-02-scaled.png" alt="JFT Agro" style="width: 180px; filter: brightness(0) invert(1); margin-bottom: 25px;">
                <p style="color: rgba(255,255,255,0.7); font-size: 0.95rem; margin-bottom: 25px; line-height: 1.6;">Government Recognized <strong>Star Export House</strong>. Bridging the gap between fertile Indian farms and global markets with integrity, quality, and trust.</p>
                <div class="td-social" style="padding: 0; background: none; justify-content: flex-start;">
                    <a href="#"><i class="fa-brands fa-linkedin"></i></a>
                    <a href="#"><i class="fa-brands fa-instagram"></i></a>
                    <a href="#"><i class="fa-brands fa-twitter"></i></a>
                </div>
            </div>

            <div class="f-col">
                <h4>Quick Links</h4>
                <ul class="f-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="products.html">Our Products</a></li>
                    <li><a href="infrastructure.html">Infrastructure</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </div>

            <div class="f-col">
                <h4>Reach Us</h4>
                <ul class="f-contact">
                    <li><i class="fa-solid fa-location-dot"></i> <span><strong>Head Office:</strong><br>123, Commodity Exchange, Sector 19, Vashi, Mumbai - 400705</span></li>
                    <li><i class="fa-solid fa-envelope"></i> <span>export@jftagro.com<br>sales@jftagro.com</span></li>
                    <li><i class="fa-solid fa-phone"></i> <span>+91 98960 55555<br>+91 22 4545 6767</span></li>
                </ul>
            </div>

            <div class="f-col">
                <h4>Export Inquiry</h4>
                <p style="color: rgba(255,255,255,0.6); font-size: 0.85rem; margin-bottom: 15px;">Get our latest product catalogue and export price list directly to your inbox.</p>
                <form class="f-newsletter" onsubmit="event.preventDefault(); alert('Thank you! Our export manager will contact you shortly.');">
                    <input type="email" class="f-input" placeholder="Enter Official Email ID" required>
                    <button type="submit" class="f-btn-full">Request Price List</button>
                </form>
            </div>
        </div>

        <div class="footer-bottom">
            <span>&copy; <script>document.write(new Date().getFullYear())</script> JFT Agro Overseas LLP. All Rights Reserved. | <a href="#" style="color: var(--jft-gold);">Privacy Policy</a> | <a href="#" style="color: var(--jft-gold);">Terms of Trade</a></span>
        </div>
    </div>
</footer>
`;

// Run Includes
document.addEventListener("DOMContentLoaded", () => {
    try {
        // Inject Header
        document.body.insertAdjacentHTML('afterbegin', HEADER_HTML);
        // Inject Footer
        document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

        // Run Logic
        initGlobalFunctions();
        highlightActiveLink();
        
        // Page Specific Inits
        if (document.querySelector('.jft-hero-banner')) initHomePage();
        if (document.querySelector('.cat-scroll-view')) initProductsPage();
        if (document.querySelector('.process-wrapper')) initInfraPage();
        if (document.querySelector('.contact-layout')) initContactPage();

    } catch (error) {
        console.error("Script Error:", error);
    } finally {
        // FORCE REMOVE PRELOADER (The Fix)
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => { preloader.style.display = 'none'; document.body.style.overflow = 'auto'; }, 500);
        }
    }
});

/* =========================================
   2. GLOBAL FUNCTIONALITY
   ========================================= */

function highlightActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-link, .f-links a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (href === 'index.html' && currentPath === '')) {
            link.classList.add('active');
        }
    });
}

function initGlobalFunctions() {
    // --- News Ticker ---
    const tickerContainer = document.getElementById('dynamic-ticker');
    if (tickerContainer) {
        const fullNews = [
            `<div class="t-item"><i class="fa-solid fa-ship"></i><span>UPDATE:</span> Exports to West Africa Operating Normally</div>`,
            `<div class="t-item"><i class="fa-solid fa-leaf"></i><span>SPICES:</span> New Turmeric Harvest Arriving</div>`,
            `<div class="t-item"><i class="fa-solid fa-wheat"></i><span>GRAINS:</span> Wheat Export Quota Open</div>`
        ];
        tickerContainer.innerHTML = fullNews.join('') + fullNews.join('');
    }

    // --- Scroll Date ---
    const dateSpan = document.getElementById('forex-date');
    if (dateSpan) dateSpan.innerText = "RATES AS OF " + new Date().toLocaleDateString('en-GB');

    // --- Navbar Scroll Effect ---
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
        
        const progressBar = document.getElementById('page-progress');
        if(progressBar) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            progressBar.style.width = ((winScroll / height) * 100) + "%";
        }
    });

    // --- Intersection Observer ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    
    setTimeout(fetchLiveForex, 1000);
}

// --- Menu Toggles ---
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) navMenu.classList.toggle('active');
}

function toggleLang() {
    const langMenu = document.getElementById('langMenu');
    if (langMenu) langMenu.classList.toggle('show');
}

function changeLanguage(lang) {
    toggleLang();
}

function fetchLiveForex() {
    try {
        updateForexDisplay('fx-usd', 'USD/INR', 83.50 + (Math.random() * 0.5));
        updateForexDisplay('fx-eur', 'EUR/INR', 90.20 + (Math.random() * 0.5));
        updateForexDisplay('fx-gbp', 'GBP/INR', 105.10 + (Math.random() * 0.5));
    } catch (e) {}
}

function updateForexDisplay(id, label, value) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = `${label} <span class="forex-up">${value.toFixed(2)} ▲</span>`;
}

/* =========================================
   3. HOME PAGE LOGIC
   ========================================= */
function initHomePage() {
    let currentSlide = 0;
    const slides = [
        { img: 'https://images.unsplash.com/photo-1536638423238-d9d268d80f83?q=80&w=2070', title: 'Feeding the World,<br><span>Sustainably.</span>', desc: 'India’s leading exporter of premium Basmati Rice and organic agro-commodities.', tag: 'Est. 1998' },
        { img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070', title: 'Global Logistics,<br><span>Simplified.</span>', desc: 'Seamless supply chain solutions from farm to your port. ISO 9001:2015 Certified.', tag: 'Logistics' },
        { img: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=2070', title: 'Pure Spices,<br><span>Rich Aroma.</span>', desc: 'Authentic Indian spices sourced directly from partner farms in Kerala and Andhra.', tag: 'Spices' }
    ];

    const sliderContainer = document.querySelector('.jft-hero-banner');
    if (sliderContainer && sliderContainer.querySelectorAll('.hero-slide').length === 0) {
        slides.forEach((s, i) => {
            const slideDiv = document.createElement('div');
            slideDiv.className = `hero-slide ${i === 0 ? 'active' : ''}`;
            slideDiv.style.backgroundImage = `url('${s.img}')`;
            sliderContainer.prepend(slideDiv);
        });

        const updateContent = (index) => {
            document.querySelectorAll('.hero-slide').forEach((s, i) => s.classList.toggle('active', i === index));
            document.querySelectorAll('.control-dot').forEach((d, i) => d.classList.toggle('active', i === index));
            
            const content = document.querySelector('.hero-content');
            if(content) {
                content.style.opacity = '0';
                content.style.transform = 'translate(-50%, -45%)';
                setTimeout(() => {
                    const ids = {tag:'h-tag', title:'h-title', desc:'h-desc'};
                    if(document.getElementById(ids.tag)) document.getElementById(ids.tag).innerText = slides[index].tag;
                    if(document.getElementById(ids.title)) document.getElementById(ids.title).innerHTML = slides[index].title;
                    if(document.getElementById(ids.desc)) document.getElementById(ids.desc).innerText = slides[index].desc;
                    content.style.opacity = '1';
                    content.style.transform = 'translate(-50%, -50%)';
                }, 500);
            }
        };

        window.changeSlide = (index) => { currentSlide = index; updateContent(currentSlide); };
        setInterval(() => { currentSlide = (currentSlide + 1) % slides.length; updateContent(currentSlide); }, 6000);
    }

    // Map & Stats logic
    const mapContainer = document.querySelector('.network-visual');
    if (mapContainer && window.innerWidth > 1024 && mapContainer.querySelectorAll('.export-node').length === 0) {
         const networkNodes = [
            { id: 0, region: "North America", desc: "USA, Canada", icon: "fa-earth-americas", countries: [{name:"USA", type:"Rice"}, {name:"Canada", type:"Spices"}] },
            { id: 1, region: "Europe", desc: "UK, Germany, France", icon: "fa-earth-europe", countries: [{name:"UK", type:"Rice"}, {name:"Germany", type:"Grains"}] },
            { id: 2, region: "Middle East", desc: "UAE, Saudi, Oman", icon: "fa-mosque", countries: [{name:"UAE", type:"Rice/Sugar"}, {name:"Saudi", type:"Spices"}] },
            { id: 3, region: "Africa", desc: "Nigeria, Benin, Togo", icon: "fa-earth-africa", countries: [{name:"Benin", type:"Parboiled"}, {name:"Togo", type:"Rice"}] },
            { id: 4, region: "SE Asia", desc: "Vietnam, Philippines", icon: "fa-bowl-rice", countries: [{name:"Vietnam", type:"Corn"}, {name:"Philippines", type:"Wheat"}] },
            { id: 5, region: "Australia", desc: "Sydney, Melbourne", icon: "fa-earth-oceania", countries: [{name:"Sydney", type:"Spices"}, {name:"Perth", type:"Lentils"}] }
        ];
        networkNodes.forEach((node, index) => {
            const div = document.createElement('div');
            div.className = `export-node node-${index} reveal`;
            let listHTML = node.countries ? `<div class="country-list-reveal">${node.countries.map(c => `<div class="country-item">${c.name} <span>${c.type}</span></div>`).join('')}</div>` : '';
            div.innerHTML = `<div class="node-portal"><i class="fa-solid ${node.icon}"></i></div><div class="node-info"><h3>${node.region}</h3><p>${node.desc}</p></div>${listHTML}`;
            mapContainer.appendChild(div);
        });
    }

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        let counted = false;
        new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !counted) {
                document.querySelectorAll('.stat-count').forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const inc = target / 100;
                    let c = 0;
                    const updateCount = () => { c += inc; if (c < target) { counter.innerText = Math.ceil(c); requestAnimationFrame(updateCount); } else { counter.innerText = target; } };
                    updateCount();
                });
                counted = true;
            }
        }).observe(statsSection);
    }
}

/* =========================================
   4. PRODUCTS PAGE LOGIC
   ========================================= */
function initProductsPage() {
    window.filterProducts = (category, btn) => {
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        if(btn) btn.classList.add('active');
        const riceSubs = document.getElementById('rice-sub-filters');
        if(riceSubs) riceSubs.style.display = (category === 'rice') ? 'flex' : 'none';

        document.querySelectorAll('.p-item').forEach(item => {
            if(category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'flex';
                item.style.opacity = '0';
                setTimeout(() => item.style.opacity = '1', 50);
            } else {
                item.style.display = 'none';
            }
        });
    };

    window.scrollTabs = (direction) => {
        const container = document.querySelector('.cat-scroll-view');
        if(container) container.scrollBy({ left: direction * 200, behavior: 'smooth' });
    };

    const searchInput = document.getElementById('productSearch');
    if(searchInput) {
        searchInput.addEventListener('keyup', function() {
            const val = this.value.toLowerCase();
            document.querySelectorAll('.p-item').forEach(item => {
                const title = item.querySelector('.p-title').innerText.toLowerCase();
                const cat = item.querySelector('.p-cat').innerText.toLowerCase();
                item.style.display = (title.includes(val) || cat.includes(val)) ? 'flex' : 'none';
            });
        });
    }

    window.toggleSpecs = (btn) => {
        const specs = btn.parentElement.parentElement.querySelector('.p-specs-scrollable');
        specs.classList.toggle('expanded');
        btn.classList.toggle('rotated');
    };

    window.openProductModal = (title) => {
        const modal = document.getElementById('product-modal');
        if(modal) {
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('open'), 10);
            const titleEl = document.getElementById('m-title');
            if(titleEl) titleEl.innerText = title;
            document.body.style.overflow = 'hidden';
            if(typeof Chart !== 'undefined') renderPriceChart();
        }
    };

    window.closeModal = () => {
        const modal = document.getElementById('product-modal');
        if(modal) {
            modal.classList.remove('open');
            setTimeout(() => modal.style.display = 'none', 300);
            document.body.style.overflow = 'auto';
        }
    };
    
    const modal = document.getElementById('product-modal');
    if(modal) modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });
}

function renderPriceChart() {
    const ctx = document.getElementById('priceChart');
    if(ctx) {
        try {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{ label: 'Export Price (USD/MT)', data: [950, 980, 960, 1050, 1100, 1080], borderColor: '#4e8c3e', backgroundColor: 'rgba(78, 140, 62, 0.1)', tension: 0.4, fill: true }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: false } } }
            });
        } catch(e) {}
    }
}

/* =========================================
   5. INFRA & CONTACT LOGIC
   ========================================= */
function initInfraPage() {
    const processWrapper = document.querySelector('.process-wrapper');
    if(processWrapper) {
        new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                const prog = document.getElementById('process-progress');
                if(prog) prog.style.width = '100%';
            }
        }).observe(processWrapper);
    }
}

function initContactPage() {
    window.switchMap = (loc, btn) => {
        document.querySelectorAll('.map-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mapFrame = document.getElementById('gmap-frame');
        if(mapFrame) {
            mapFrame.style.opacity = '0';
            setTimeout(() => { mapFrame.style.opacity = '1'; }, 300);
        }
    };
    window.toggleFaq = (el) => el.parentElement.classList.toggle('active');
}
