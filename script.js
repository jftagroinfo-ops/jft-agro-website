/* =========================================
   1. CLIENT-SIDE INCLUDES & GLOBAL INIT
   ========================================= */

// Function to load Header and Footer dynamically
async function loadSharedComponents() {
    try {
        // Load Header
        const headerReq = await fetch('header.html');
        if (!headerReq.ok) throw new Error("Header not found");
        const headerHtml = await headerReq.text();
        document.body.insertAdjacentHTML('afterbegin', headerHtml);

        // Load Footer
        const footerReq = await fetch('footer.html');
        if (!footerReq.ok) throw new Error("Footer not found");
        const footerHtml = await footerReq.text();
        document.body.insertAdjacentHTML('beforeend', footerHtml);

        // Initialize Global Functions only after Header/Footer exist
        initGlobalFunctions();
        highlightActiveLink();

    } catch (error) {
        console.error("Error loading shared components (If using local file://, use Live Server):", error);
        // Fallback: Still run global functions so the site works without header/footer
        initGlobalFunctions(); 
    } finally {
        // FORCE REMOVE PRELOADER: This runs whether fetch succeeds or fails
        hidePreloader();
    }
}

// Separate function to hide preloader safely
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Small buffer to ensure styles are loaded
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => { 
                preloader.style.display = 'none'; 
                // Enable scrolling again just in case
                document.body.style.overflow = 'auto';
            }, 1000);
        }, 500);
    }
}

// Run includes when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    loadSharedComponents();
    
    // Page Specific Initializations
    // We add short delays to ensure DOM elements from includes might be ready if needed
    if (document.querySelector('.jft-hero-banner')) initHomePage();
    if (document.querySelector('.cat-scroll-view')) initProductsPage();
    if (document.querySelector('.process-wrapper')) initInfraPage();
    if (document.querySelector('.contact-layout')) initContactPage();
});

/* =========================================
   2. GLOBAL FUNCTIONALITY (Header, Footer, Utils)
   ========================================= */

function highlightActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-link, .f-links a');
    links.forEach(link => {
        // Handle anchor links vs page links
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
        // Duplicate for seamless scroll
        tickerContainer.innerHTML = fullNews.join('') + fullNews.join('');
    }

    // --- Scroll Date ---
    const dateSpan = document.getElementById('forex-date');
    if (dateSpan) dateSpan.innerText = "RATES AS OF " + new Date().toLocaleDateString('en-GB');

    // --- Navbar Scroll Effect ---
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
        
        // Scroll Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById('page-progress');
        if(progressBar) progressBar.style.width = scrolled + "%";
    });

    // --- Intersection Observer for Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    
    // --- Forex Ticker (Delayed start) ---
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
    // Simulated Google Translate Trigger
    // In production, this hooks into Google Translate API
    console.log("Language switched to: " + lang);
    const langMenu = document.getElementById('langMenu');
    if(langMenu) langMenu.classList.remove('show');
}

function fetchLiveForex() {
    // Simulated Live API Call
    try {
        updateForexDisplay('fx-usd', 'USD/INR', 83.50 + (Math.random() * 0.5));
        updateForexDisplay('fx-eur', 'EUR/INR', 90.20 + (Math.random() * 0.5));
        updateForexDisplay('fx-gbp', 'GBP/INR', 105.10 + (Math.random() * 0.5));
    } catch (e) {
        console.log("Forex load error");
    }
}

function updateForexDisplay(id, label, value) {
    const el = document.getElementById(id);
    if (el) {
        el.innerHTML = `${label} <span class="forex-up">${value.toFixed(2)} ▲</span>`;
    }
}

/* =========================================
   3. HOME PAGE SPECIFIC LOGIC
   ========================================= */
function initHomePage() {
    // --- Hero Slider ---
    let currentSlide = 0;
    const slides = [
        { img: 'https://images.unsplash.com/photo-1536638423238-d9d268d80f83?q=80&w=2070', title: 'Feeding the World,<br><span>Sustainably.</span>', desc: 'India’s leading exporter of premium Basmati Rice and organic agro-commodities.', tag: 'Est. 1998' },
        { img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070', title: 'Global Logistics,<br><span>Simplified.</span>', desc: 'Seamless supply chain solutions from farm to your port. ISO 9001:2015 Certified.', tag: 'Logistics' },
        { img: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=2070', title: 'Pure Spices,<br><span>Rich Aroma.</span>', desc: 'Authentic Indian spices sourced directly from partner farms in Kerala and Andhra.', tag: 'Spices' }
    ];

    const sliderContainer = document.querySelector('.jft-hero-banner');
    // Only run if the slider container doesn't already have slides (to prevent duplication)
    if (sliderContainer && sliderContainer.querySelectorAll('.hero-slide').length === 0) {
        // Create Slides
        slides.forEach((s, i) => {
            const slideDiv = document.createElement('div');
            slideDiv.className = `hero-slide ${i === 0 ? 'active' : ''}`;
            slideDiv.style.backgroundImage = `url('${s.img}')`;
            sliderContainer.prepend(slideDiv); // Add before content
        });

        // Update Content Function
        const updateContent = (index) => {
            document.querySelectorAll('.hero-slide').forEach((s, i) => {
                s.classList.toggle('active', i === index);
            });
            document.querySelectorAll('.control-dot').forEach((d, i) => {
                d.classList.toggle('active', i === index);
            });
            
            // Text Animation
            const content = document.querySelector('.hero-content');
            if(content) {
                content.style.opacity = '0';
                content.style.transform = 'translate(-50%, -45%)';
                
                setTimeout(() => {
                    const tagEl = document.getElementById('h-tag');
                    const titleEl = document.getElementById('h-title');
                    const descEl = document.getElementById('h-desc');
                    
                    if(tagEl) tagEl.innerText = slides[index].tag;
                    if(titleEl) titleEl.innerHTML = slides[index].title;
                    if(descEl) descEl.innerText = slides[index].desc;
                    
                    content.style.opacity = '1';
                    content.style.transform = 'translate(-50%, -50%)';
                }, 500);
            }
        };

        // Controls
        window.changeSlide = (index) => {
            currentSlide = index;
            updateContent(currentSlide);
        };

        // Auto Play
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateContent(currentSlide);
        }, 6000);
    }

    // --- Network Map Generation ---
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
            
            let listHTML = "";
            if(node.countries) {
                listHTML = `<div class="country-list-reveal">`;
                node.countries.forEach(c => {
                    listHTML += `<div class="country-item">${c.name} <span>${c.type}</span></div>`;
                });
                listHTML += `</div>`;
            }

            div.innerHTML = `
                <div class="node-portal"><i class="fa-solid ${node.icon}"></i></div>
                <div class="node-info"><h3>${node.region}</h3><p>${node.desc}</p></div>
                ${listHTML}
            `;
            mapContainer.appendChild(div);
        });
    }

    // --- Counter Animation ---
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        let counted = false;
        const countObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !counted) {
                document.querySelectorAll('.stat-count').forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const inc = target / 100;
                    let c = 0;
                    const updateCount = () => {
                        c += inc;
                        if (c < target) {
                            counter.innerText = Math.ceil(c);
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
                counted = true;
            }
        });
        countObserver.observe(statsSection);
    }
    
    // --- Logistics Slider (Drag) ---
    const slider = document.querySelector('.cert-container');
    if(slider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => { isDown = false; slider.classList.remove('active'); });
        slider.addEventListener('mouseup', () => { isDown = false; slider.classList.remove('active'); });
        slider.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    }
}

/* =========================================
   4. PRODUCTS PAGE SPECIFIC LOGIC
   ========================================= */
function initProductsPage() {
    // --- Tabs & Filter ---
    window.filterProducts = (category, btn) => {
        // Active Button
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        if(btn) btn.classList.add('active');
        
        // Show/Hide Rice Sub-filters
        const riceSubs = document.getElementById('rice-sub-filters');
        if(riceSubs) {
            riceSubs.style.display = (category === 'rice') ? 'flex' : 'none';
        }

        // Filter Items
        const items = document.querySelectorAll('.p-item');
        items.forEach(item => {
            if(category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'flex';
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            } else {
                item.style.display = 'none';
            }
        });
    };

    window.scrollTabs = (direction) => {
        const container = document.querySelector('.cat-scroll-view');
        if(container) {
            const scrollAmount = 200;
            container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
        }
    };

    // --- Search ---
    const searchInput = document.getElementById('productSearch');
    if(searchInput) {
        searchInput.addEventListener('keyup', function() {
            const val = this.value.toLowerCase();
            const items = document.querySelectorAll('.p-item');
            items.forEach(item => {
                const title = item.querySelector('.p-title').innerText.toLowerCase();
                const cat = item.querySelector('.p-cat').innerText.toLowerCase();
                if(title.includes(val) || cat.includes(val)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // --- Accordion for Specs ---
    window.toggleSpecs = (btn) => {
        const specs = btn.parentElement.parentElement.querySelector('.p-specs-scrollable');
        const overlay = btn.parentElement;
        specs.classList.toggle('expanded');
        btn.classList.toggle('rotated');
        if (specs.classList.contains('expanded')) {
            overlay.style.background = 'none';
        } else {
            overlay.style.background = 'linear-gradient(to top, #fff 40%, rgba(255,255,255,0.8))';
        }
    };

    // --- Modal Logic ---
    window.openProductModal = (title) => {
        const modal = document.getElementById('product-modal');
        if(modal) {
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('open'), 10);
            const titleEl = document.getElementById('m-title');
            if(titleEl) titleEl.innerText = title;
            document.body.style.overflow = 'hidden';
            
            // Re-render chart (if Chart.js is present)
            if(typeof Chart !== 'undefined') {
                renderPriceChart();
            }
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

    // Background Close for Modal
    const modal = document.getElementById('product-modal');
    if(modal) {
        modal.addEventListener('click', (e) => {
            if(e.target === modal) closeModal();
        });
    }
}

function renderPriceChart() {
    const ctx = document.getElementById('priceChart');
    if(ctx) {
        // We use a try-catch because Chart.js might destroy instances differently depending on version
        try {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Export Price (USD/MT)',
                        data: [950, 980, 960, 1050, 1100, 1080],
                        borderColor: '#4e8c3e',
                        backgroundColor: 'rgba(78, 140, 62, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: false } }
                }
            });
        } catch(e) { console.log("Chart render error", e); }
    }
}

/* =========================================
   5. INFRASTRUCTURE PAGE LOGIC
   ========================================= */
function initInfraPage() {
    // Timeline animation
    const processWrapper = document.querySelector('.process-wrapper');
    if(processWrapper) {
        const observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                const prog = document.getElementById('process-progress');
                if(prog) prog.style.width = '100%';
            }
        });
        observer.observe(processWrapper);
    }
}

/* =========================================
   6. CONTACT PAGE LOGIC
   ========================================= */
function initContactPage() {
    // Map Switcher
    window.switchMap = (loc, btn) => {
        document.querySelectorAll('.map-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mapFrame = document.getElementById('gmap-frame');
        if(mapFrame) {
            mapFrame.style.opacity = '0';
            setTimeout(() => {
                if(loc === 'head') mapFrame.src = "https://www.google.com/maps/embed?pb=..."; // Placeholder
                if(loc === 'branch') mapFrame.src = "https://www.google.com/maps/embed?pb=..."; // Placeholder
                mapFrame.style.opacity = '1';
            }, 300);
        }
    };

    // FAQ Accordion
    window.toggleFaq = (el) => {
        el.parentElement.classList.toggle('active');
    };
}
