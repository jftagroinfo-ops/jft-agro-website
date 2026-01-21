// js/main.js

// 1. Run the App Immediately (No waiting for events)
initApp();

function initApp() {
    console.log("Initializing App...");

    // --- Hide Preloader (Forcefully) ---
    // We try to hide it immediately to ensure the user sees the site
    const preloader = document.getElementById('preloader');
    if(preloader) {
        // Wait just a split second for images to settle, then fade out
        setTimeout(() => { 
            preloader.style.opacity = '0'; 
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        }, 800);
    }

    // --- Active Link Highlighter ---
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop(); 
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === pageName || 
           (linkHref === 'index.html' && (currentPath === '/' || currentPath.endsWith('/')))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // --- Navigation Toggle ---
    window.toggleMenu = function() { 
        const menu = document.getElementById('navMenu'); 
        const icon = document.querySelector('.mobile-toggle i'); 
        if (menu && icon) {
            menu.classList.toggle('active'); 
            if(menu.classList.contains('active')) { 
                icon.classList.remove('fa-bars'); 
                icon.classList.add('fa-xmark'); 
            } else { 
                icon.classList.remove('fa-xmark'); 
                icon.classList.add('fa-bars'); 
            } 
        }
    }
    
    window.toggleLang = function() { 
        const langMenu = document.getElementById('langMenu');
        if (langMenu) langMenu.classList.toggle('show'); 
    }
    
    // Close language menu if clicking outside
    window.onclick = function(e) { 
        if (!e.target.closest('.lang-btn') && document.getElementById('langMenu')) {
            document.getElementById('langMenu').classList.remove('show'); 
        }
    }

    // --- Scroll Progress & Sticky Navbar ---
    window.onscroll = function() {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        
        const progBar = document.getElementById("page-progress");
        if(progBar) progBar.style.width = scrolled + "%";
        
        const nav = document.getElementById('navbar'); 
        if(nav) {
            if (window.scrollY > 50) nav.classList.add('scrolled'); 
            else nav.classList.remove('scrolled');
        }
    };

    // --- Live Forex ---
    fetchLiveForex();

    // --- Hero Slider (Only runs if slider exists) ---
    if(document.querySelectorAll('.hero-slide').length > 0) {
        startHeroSlider();
    }

    // --- Scroll Animations (Reveal) ---
    const revealObserver = new IntersectionObserver((entries) => { 
        entries.forEach(entry => { 
            if (entry.isIntersecting) { 
                entry.target.classList.add('active'); 
                if (entry.target.classList.contains('timeline-wrapper')) { 
                    const line = document.getElementById('progressLine');
                    if(line) line.style.width = '100%'; 
                } 
            } 
        }); 
    }, { threshold: 0.15 }); 
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // --- Network Map (Index Only) ---
    initNetworkMap();
    
    // --- Cert Slider (If exists) ---
    initCertSlider();
    
    // --- Stats Counter (If exists) ---
    initStats();
}

// --- Helper Functions ---

async function fetchLiveForex() {
    try {
        const response = await fetch('https://api.frankfurter.app/latest?from=USD&to=INR,EUR,GBP'); 
        const data = await response.json();
        if(data && data.rates) {
            updateTickerDOM('fx-usd', 'USD/INR', data.rates.INR); 
            // Mocking other rates relative to USD for display if needed or fetching separately
            const eurRate = 90.50; // Fallback or extra fetch
            const gbpRate = 105.20;
            updateTickerDOM('fx-eur', 'EUR/INR', eurRate); 
            updateTickerDOM('fx-gbp', 'GBP/INR', gbpRate);
        }
    } catch (e) { 
        const usd = document.getElementById('fx-usd');
        if(usd) usd.innerHTML = 'USD/INR <span class="forex-up">84.10 ▲</span>'; 
    }
    
    // Date & Ticker Text
    const dateSpan = document.getElementById('forex-date'); 
    if(dateSpan) dateSpan.innerText = "RATES AS OF " + new Date().toLocaleDateString('en-GB');
    
    const tickerContainer = document.getElementById('dynamic-ticker');
    if(tickerContainer && tickerContainer.innerHTML === "") {
        const fullNews = [ 
            `<div class="t-item daily-flash">MARKET UPDATE: Global Rice Demand up by 5%</div>`, 
            `<div class="t-item"><i class="fa-solid fa-ship"></i> SHIPPING: Red Sea Route Stabilizing</div>`,
            `<div class="t-item"><i class="fa-solid fa-leaf"></i> SPICES: Turmeric Harvest Begins in South India</div>` 
        ];
        tickerContainer.innerHTML = fullNews.join('') + fullNews.join(''); 
    }
}

function updateTickerDOM(id, label, value) { 
    const el = document.getElementById(id);
    if(el && value) el.innerHTML = `${label} <span class="forex-up">${Number(value).toFixed(2)} ▲</span>`; 
}

function startHeroSlider() {
    let slideIndex = 0; 
    window.setSlide = function(n) { slideIndex = n; updateSlider(); resetTimer(); } 
    
    function nextSlide() { 
        const slides = document.querySelectorAll('.hero-slide'); 
        if(slides.length > 0) { 
            slideIndex = (slideIndex + 1) % slides.length; 
            updateSlider(); 
        } 
    } 
    
    function updateSlider() { 
        const slides = document.querySelectorAll('.hero-slide'); 
        const dots = document.querySelectorAll('.control-dot'); 
        if(slides.length === 0) return; 
        slides.forEach(s => s.classList.remove('active')); 
        dots.forEach(d => d.classList.remove('active')); 
        slides[slideIndex].classList.add('active'); 
        dots[slideIndex].classList.add('active'); 
    } 
    
    let slideTimer = setInterval(nextSlide, 5000); 
    function resetTimer() { clearInterval(slideTimer); slideTimer = setInterval(nextSlide, 5000); }
}

function initCertSlider() {
    const track = document.getElementById('certTrack'); 
    const container = document.getElementById('certSlider');
    if(track && container) {
        Array.from(track.children).forEach(item => { const clone = item.cloneNode(true); track.appendChild(clone); });
        let position = 0;
        function animate() { 
            position -= 0.5; 
            if (Math.abs(position) >= (track.scrollWidth / 2)) { position = 0; } 
            track.style.transform = `translateX(${position}px)`; 
            requestAnimationFrame(animate); 
        }
        animate();
    }
}

function initStats() {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => { 
            if(entry.isIntersecting) { 
                const counter = entry.target.querySelector('h3');
                if(counter && !counter.classList.contains('counted')) {
                    const target = +entry.target.getAttribute('data-count'); 
                    let count = 0;
                    const inc = Math.ceil(target / 100);
                    const updateCount = () => { 
                        count += inc; 
                        if (count < target) { 
                            counter.innerText = count; 
                            requestAnimationFrame(updateCount); 
                        } else { 
                            counter.innerText = target + "+"; 
                        } 
                    };
                    updateCount(); 
                    counter.classList.add('counted');
                }
            } 
        });
    }, { threshold: 0.5 });
    
    setTimeout(() => { 
        document.querySelectorAll('.stat-item').forEach(el => statsObserver.observe(el)); 
    }, 500);
}

function initNetworkMap() {
    const netContainer = document.getElementById('jft_nodes_container'); 
    const svgLayer = document.getElementById('jft_svg_lines'); 
    
    if(netContainer && svgLayer) { 
        const networkNodes = [ 
            { region: "Africa", icon: "fa-ship", desc: "Key Market", top: "75%", left: "5%" }, 
            { region: "Europe", icon: "fa-euro-sign", desc: "Organic Spices", top: "5%", left: "5%" }, 
            { region: "Middle East", icon: "fa-mosque", desc: "Basmati Rice", top: "40%", left: "0%" }, 
            { region: "SE Asia", icon: "fa-map-location-dot", desc: "Rice & Grains", top: "75%", right: "5%" },
            { region: "Americas", icon: "fa-globe-americas", desc: "Processed Food", top: "5%", right: "5%" },
            { region: "Australia", icon: "fa-kangaroo", desc: "Lentils", top: "40%", right: "0%" }
        ];
        
        // Clear previous to avoid duplicates
        netContainer.innerHTML = '';
        
        networkNodes.forEach((node, index) => { 
            const div = document.createElement('div'); 
            div.className = `export-node reveal`; 
            
            // Positioning logic for desktop
            if(window.innerWidth > 1024) {
                if(node.left) div.style.left = node.left;
                if(node.right) { div.style.right = node.right; div.style.flexDirection = 'row-reverse'; div.style.textAlign = 'right'; }
                div.style.top = node.top;
            }

            div.innerHTML = `<div class="node-portal"><i class="fa-solid ${node.icon}"></i></div><div class="node-info"><h3>${node.region}</h3><p>${node.desc}</p></div>`; 
            netContainer.appendChild(div); 
        }); 
    }
}
