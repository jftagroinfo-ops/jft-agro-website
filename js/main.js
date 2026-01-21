/* --- COMMON COMPONENTS (Header & Footer) --- */

const HEADER_HTML = `
    <div id="page-progress"></div>

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

    <div id="google_translate_element"></div>

    <nav class="jft-navbar" id="navbar">
        <div class="jft-wide-container nav-flex">
            <a href="index.html" class="nav-logo-link"><img src="https://jftagro.com/wp-content/uploads/2023/01/jft-final-02-scaled.png" alt="JFT Agro Overseas" class="nav-logo-img"></a>
            <div class="nav-menu" id="navMenu">
                <a href="index.html" class="nav-link" data-page="home">Home</a>
                <a href="about.html" class="nav-link" data-page="about">About</a>
                <a href="products.html" class="nav-link" data-page="products">Products</a>
                <a href="infrastructure.html" class="nav-link" data-page="infrastructure">Infra</a>
                <a href="index.html#global-reach" class="nav-link">Network</a>
                <a href="contact.html" class="nav-link" data-page="contact">Contact</a>
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

// --- INJECTION & LOGIC ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Header & Footer
    const headerRoot = document.getElementById('header-root');
    const footerRoot = document.getElementById('footer-root');
    if (headerRoot) headerRoot.innerHTML = HEADER_HTML;
    if (footerRoot) footerRoot.innerHTML = FOOTER_HTML;

    // 2. Set Active Menu Link
    const currentPage = document.body.getAttribute('data-page');
    if (currentPage) {
        const link = document.querySelector(`.nav-link[data-page="${currentPage}"]`);
        if (link) link.classList.add('active');
    }

    // 3. Initialize Common Features
    initTicker();
    fetchLiveForex();
    initScrollProgress();
    
    // 4. Preloader Removal
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => { preloader.style.display = 'none'; }, 1000);
        }
    }, 1500);

    // 5. Scroll Animations
    const observer = new IntersectionObserver((entries) => {
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
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

// --- HELPER FUNCTIONS ---

function toggleMenu() { 
    const menu = document.getElementById('navMenu'); 
    const icon = document.querySelector('.mobile-toggle i'); 
    menu.classList.toggle('active'); 
    if(menu.classList.contains('active')) { 
        icon.classList.remove('fa-bars'); 
        icon.classList.add('fa-xmark'); 
    } else { 
        icon.classList.remove('fa-xmark'); 
        icon.classList.add('fa-bars'); 
    } 
}

function toggleLang() { document.getElementById('langMenu').classList.toggle('show'); }

function changeLanguage(langCode) { 
    var selectField = document.querySelector(".goog-te-combo"); 
    if(selectField) { 
        selectField.value = langCode; 
        selectField.dispatchEvent(new Event("change")); 
    } 
    document.getElementById('langMenu').classList.remove('show'); 
}

window.onclick = function(e) { if (!e.target.closest('.lang-btn') && document.getElementById('langMenu')) document.getElementById('langMenu').classList.remove('show'); }

function initScrollProgress() {
    window.onscroll = function() {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById("page-progress");
        if(progressBar) progressBar.style.width = scrolled + "%";
        
        const nav = document.getElementById('navbar'); 
        if (nav) {
            if (window.scrollY > 50) nav.classList.add('scrolled'); 
            else nav.classList.remove('scrolled');
        }
    };
}

async function fetchLiveForex() {
    try {
        // Only run if elements exist
        if(!document.getElementById('fx-usd')) return;

        const response = await fetch('https://api.frankfurter.app/latest?from=USD&to=INR,EUR,GBP'); 
        const data = await response.json();
        if(data && data.rates) {
            const usdInr = data.rates.INR; 
            const resEur = await fetch('https://api.frankfurter.app/latest?from=EUR&to=INR'); 
            const dataEur = await resEur.json(); 
            const eurInr = dataEur.rates.INR; 
            const resGbp = await fetch('https://api.frankfurter.app/latest?from=GBP&to=INR'); 
            const dataGbp = await resGbp.json(); 
            const gbpInr = dataGbp.rates.INR;
            
            updateTickerDOM('fx-usd', 'USD/INR', usdInr); 
            updateTickerDOM('fx-eur', 'EUR/INR', eurInr); 
            if(document.getElementById('fx-gbp')) updateTickerDOM('fx-gbp', 'GBP/INR', gbpInr);
        }
    } catch (e) { 
        if(document.getElementById('fx-usd')) {
            document.getElementById('fx-usd').innerHTML = 'USD/INR <span class="forex-up">84.10 ▲</span>'; 
            document.getElementById('fx-eur').innerHTML = 'EUR/INR <span class="forex-up">90.50 ▲</span>';
        }
    }
}

function updateTickerDOM(id, label, value) { 
    const el = document.getElementById(id);
    if(el) el.innerHTML = `${label} <span class="forex-up">${value.toFixed(2)} ▲</span>`; 
}

function initTicker() {
    const tickerContainer = document.getElementById('dynamic-ticker');
    const dateSpan = document.getElementById('forex-date');
    
    if(dateSpan) dateSpan.innerText = "RATES AS OF " + new Date().toLocaleDateString('en-GB');

    if(tickerContainer) {
        const today = new Date();
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let dailyHeadline = "Global Markets Steady";
        if(today.getDay() === 1) dailyHeadline = "Market Opening: Strong Demand in Asia"; 
        else if(today.getDay() === 5) dailyHeadline = "Weekly Wrap: Rice Exports Surge 15%";
        
        const fullNews = [ 
            `<div class="t-item daily-flash"><i class="fa-solid fa-calendar-day"></i><span>${days[today.getDay()]}, ${today.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}:</span> ${dailyHeadline}</div>`, 
            `<div class="t-item"><i class="fa-solid fa-ship"></i><span>RICE:</span> Non-Basmati Export Quota Increased for ${today.getFullYear()}</div>`, 
            `<div class="t-item"><i class="fa-solid fa-leaf"></i><span>SPICES:</span> Fresh Cardamom Arrivals in Kerala Auctions</div>`, 
            `<div class="t-item"><i class="fa-solid fa-wheat"></i><span>WHEAT:</span> Global Price Index Stabilizing</div>`, 
            `<div class="t-item"><i class="fa-solid fa-cube"></i><span>SUGAR:</span> Indian Production Outlook Positive</div>`, 
            `<div class="t-item"><i class="fa-solid fa-bowl-food"></i><span>LOGISTICS:</span> Freight Rates to Red Sea Normalizing</div>` 
        ];
        tickerContainer.innerHTML = fullNews.join('') + fullNews.join(''); 
    }
}

// Google Translate Init
function googleTranslateElementInit() { 
    new google.translate.TranslateElement({
        pageLanguage: 'en', 
        includedLanguages: 'en,hi,zh-CN,es,ar', 
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element'); 
}
