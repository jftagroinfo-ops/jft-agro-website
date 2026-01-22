// header.js

document.write(`
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

<div id="preloader">
    <img src="https://jftagro.com/wp-content/uploads/2023/01/jft-final-02-scaled.png" alt="JFT Loading" class="loader-logo-img">
    <div class="loader-text" id="welcome-msg">Connecting Global Markets...</div>
    <div class="loader-track"><div class="loader-fill"></div></div>
</div>

<nav class="jft-navbar" id="navbar">
    <div class="jft-wide-container nav-flex">
        <a href="index.html" class="nav-logo-link"><img src="https://jftagro.com/wp-content/uploads/2023/01/jft-final-02-scaled.png" alt="JFT Agro Overseas" class="nav-logo-img"></a>
        <div class="nav-menu" id="navMenu">
            <a href="index.html" class="nav-link">Home</a>
            <a href="about.html" class="nav-link">About</a>
            <a href="products.html" class="nav-link">Products</a>
            <a href="infrastructure.html" class="nav-link">Infra</a>
            <a href="network.html" class="nav-link">Network</a>
            <a href="contact.html" class="nav-link">Contact</a>
            <a href="contact.html" class="nav-btn-action desktop-only">Get Quote</a>
        </div>
        <div class="mobile-toggle" onclick="toggleMenu()"><i class="fa-solid fa-bars"></i></div>
    </div>
</nav>

<a href="https://wa.me/919800000000" class="whatsapp-float" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>
<div class="sticky-quote"><a href="contact.html" class="sticky-btn">Request Export Quote</a></div>
`);

// --- LOGIC & FUNCTIONALITY ---

document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Highlight Active Link based on URL
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        const linkHref = link.getAttribute('href');
        // Simple check: if href matches current page, or if it's index and we are at root
        if (linkHref === currentPage || (currentPage === "" && linkHref === "index.html")) {
            link.classList.add('active');
            // Add the underline style manually if CSS relies on specific class
            link.style.color = "var(--jft-primary)";
            const styleElem = document.createElement('style');
            styleElem.innerHTML = `.nav-link[href="${linkHref}"]::after { width: 100% !important; }`;
            document.head.appendChild(styleElem);
        }
    });

    // 2. Initialize Features
    fetchLiveForex();
    initTicker();
    
    // 3. Preloader Logic (with IP City detection similar to Index)
    const welcomeText = document.getElementById('welcome-msg');
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => { 
            if (data.city) { welcomeText.innerHTML = `Connecting with <span style="color:#eebf45;">${data.city}</span>...`; } 
            else { welcomeText.innerText = "Establishing Global Trade Links..."; } 
        })
        .catch(() => {})
        .finally(() => { 
            setTimeout(() => { 
                const preloader = document.getElementById('preloader'); 
                preloader.style.opacity = '0'; 
                setTimeout(() => { preloader.style.display = 'none'; }, 1000); 
            }, 2000); 
        });
});

// --- HELPER FUNCTIONS ---

// Mobile Menu Toggle
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

// Language Switcher Logic
function toggleLang() { document.getElementById('langMenu').classList.toggle('show'); }
function changeLanguage(langCode) { 
    var selectField = document.querySelector(".goog-te-combo"); 
    if(selectField) { 
        selectField.value = langCode; 
        selectField.dispatchEvent(new Event("change")); 
    } 
    document.getElementById('langMenu').classList.remove('show'); 
}
window.onclick = function(e) { if (!e.target.closest('.lang-btn')) document.getElementById('langMenu').classList.remove('show'); }

// Navbar Scroll Effect
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    
    const progressBar = document.getElementById("page-progress");
    if(progressBar) progressBar.style.width = scrolled + "%";
    
    const nav = document.getElementById('navbar'); 
    if(nav) {
        if (window.scrollY > 50) nav.classList.add('scrolled'); 
        else nav.classList.remove('scrolled');
    }
};

// Live Forex Logic (Replicated from Index)
async function fetchLiveForex() {
    try {
        const response = await fetch('https://api.frankfurter.app/latest?from=USD&to=INR,EUR,GBP'); 
        const data = await response.json();
        if(data && data.rates) {
            const usdInr = data.rates.INR; 
            // Need separate calls to get EUR->INR and GBP->INR accurately relative to INR
            const resEur = await fetch('https://api.frankfurter.app/latest?from=EUR&to=INR'); 
            const dataEur = await resEur.json(); 
            const eurInr = dataEur.rates.INR; 
            
            const resGbp = await fetch('https://api.frankfurter.app/latest?from=GBP&to=INR'); 
            const dataGbp = await resGbp.json(); 
            const gbpInr = dataGbp.rates.INR;
            
            updateTickerDOM('fx-usd', 'USD/INR', usdInr); 
            updateTickerDOM('fx-eur', 'EUR/INR', eurInr); 
            updateTickerDOM('fx-gbp', 'GBP/INR', gbpInr);
        }
    } catch (e) { 
        // Fallback
        if(document.getElementById('fx-usd')) document.getElementById('fx-usd').innerHTML = 'USD/INR <span class="forex-up">84.10 ▲</span>'; 
        if(document.getElementById('fx-eur')) document.getElementById('fx-eur').innerHTML = 'EUR/INR <span class="forex-up">90.50 ▲</span>';
    }
}
function updateTickerDOM(id, label, value) { 
    const el = document.getElementById(id);
    if(el) el.innerHTML = `${label} <span class="forex-up">${value.toFixed(2)} ▲</span>`; 
}

// News Ticker Logic (Replicated from Index)
function initTicker() {
    const tickerContainer = document.getElementById('dynamic-ticker');
    const dateSpan = document.getElementById('forex-date');
    const today = new Date();
    
    if(dateSpan) {
        const dateOptions = { day: 'numeric', month: 'short', year: 'numeric' }; 
        dateSpan.innerText = "RATES AS OF " + today.toLocaleDateString('en-GB', dateOptions);
    }

    if(tickerContainer) {
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

// Load Google Translate Script
function googleTranslateElementInit() { new google.translate.TranslateElement({pageLanguage: 'en', includedLanguages: 'en,hi,zh-CN,es,ar', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element'); }
(function() {
    var gtScript = document.createElement('script');
    gtScript.type = 'text/javascript';
    gtScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(gtScript);
})();
