document.write(`
<div id="preloader">
    <img src="https://jftagro.com/wp-content/uploads/2023/01/jft-final-02-scaled.png" alt="JFT Loading" class="loader-logo-img">
    <div class="loader-text">Loading...</div>
    <div class="loader-track"><div class="loader-fill"></div></div>
</div>

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
`);

// --- Universal Header Logic ---
// 1. Highlight Active Link
document.addEventListener("DOMContentLoaded", function() {
    let currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "") currentPage = "index.html"; 
    
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // 2. Ticker & Forex Logic
    fetchLiveForex();
    initTicker();
    
    // 3. Preloader Fadeout
    setTimeout(() => { 
        const pre = document.getElementById('preloader'); 
        if(pre) { pre.style.opacity = '0'; setTimeout(() => pre.style.display='none', 1000); }
    }, 1200);
});

// Helper Functions
function toggleMenu() { 
    const menu = document.getElementById('navMenu'); 
    const icon = document.querySelector('.mobile-toggle i'); 
    menu.classList.toggle('active'); 
    if(menu.classList.contains('active')) { icon.classList.remove('fa-bars'); icon.classList.add('fa-xmark'); } 
    else { icon.classList.remove('fa-xmark'); icon.classList.add('fa-bars'); } 
}

function toggleLang() { document.getElementById('langMenu').classList.toggle('show'); }

function changeLanguage(langCode) { 
    var selectField = document.querySelector(".goog-te-combo"); 
    if(selectField) { selectField.value = langCode; selectField.dispatchEvent(new Event("change")); } 
    document.getElementById('langMenu').classList.remove('show'); 
}

window.onclick = function(e) { if (!e.target.closest('.lang-btn')) { const m = document.getElementById('langMenu'); if(m) m.classList.remove('show'); } }

window.addEventListener('scroll', () => { 
    const nav = document.getElementById('navbar'); 
    if(nav) nav.classList.toggle('scrolled', window.scrollY > 50); 
});

async function fetchLiveForex() {
    try {
        const response = await fetch('https://api.frankfurter.app/latest?from=USD&to=INR,EUR,GBP'); 
        const data = await response.json();
        if(data && data.rates) {
            const usdInr = data.rates.INR; 
            if(document.getElementById('fx-usd')) document.getElementById('fx-usd').innerHTML = `USD/INR <span class="forex-up">${usdInr.toFixed(2)} ▲</span>`;
            // Add other currency calls here if needed or keep simple
        }
    } catch (e) { 
        if(document.getElementById('fx-usd')) document.getElementById('fx-usd').innerHTML = 'USD/INR <span class="forex-up">84.10 ▲</span>'; 
    }
}

function initTicker() {
    const tickerContainer = document.getElementById('dynamic-ticker');
    if(tickerContainer) {
        const today = new Date();
        const dateOptions = { day: 'numeric', month: 'short' };
        const fullNews = [ 
            `<div class="t-item"><i class="fa-solid fa-calendar-day"></i><span>${today.toLocaleDateString('en-GB', dateOptions)}:</span> Global Markets Steady</div>`, 
            `<div class="t-item"><i class="fa-solid fa-ship"></i><span>UPDATE:</span> Exports to West Africa Operating Normally</div>`, 
            `<div class="t-item"><i class="fa-solid fa-leaf"></i><span>SPICES:</span> New Turmeric Harvest Arriving</div>` 
        ];
        tickerContainer.innerHTML = fullNews.join('') + fullNews.join(''); 
        
        const dateSpan = document.getElementById('forex-date'); 
        if(dateSpan) dateSpan.innerText = "RATES AS OF " + today.toLocaleDateString('en-GB');
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