/* --- UNIVERSAL INITIALIZATION --- */
window.addEventListener('load', () => {
    // Hide Preloader
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => { preloader.style.display = 'none'; }, 1000);
        }
    }, 1500);

    // Initialize Components
    fetchLiveForex();
    initTicker();
    initScrollReveal();
    updateFooterYear();
    
    // Page Specific Inits
    if (document.getElementById('product-grid')) initProductPage(); // Only on Product Page
    if (document.getElementById('gmap')) initContactPage(); // Only on Contact Page
});

/* --- NAVBAR & SCROLL LOGIC --- */
window.addEventListener('scroll', () => {
    // Navbar Scroll Effect
    const nav = document.getElementById('navbar');
    if (nav) {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    }
    
    // Scroll Progress Bar
    const progressBar = document.getElementById("page-progress");
    if (progressBar) {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    }
});

function toggleMenu() {
    const menu = document.getElementById('navMenu');
    const icon = document.querySelector('.mobile-toggle i');
    if (menu) {
        menu.classList.toggle('active');
        if (menu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    }
}

/* --- LANGUAGE SWITCHER --- */
function toggleLang() {
    const menu = document.getElementById('langMenu');
    if (menu) menu.classList.toggle('show');
}

function changeLanguage(langCode) {
    var selectField = document.querySelector(".goog-te-combo");
    if (selectField) {
        selectField.value = langCode;
        selectField.dispatchEvent(new Event("change"));
    }
    document.getElementById('langMenu').classList.remove('show');
}

window.onclick = function(e) {
    if (!e.target.closest('.lang-btn')) {
        const menu = document.getElementById('langMenu');
        if (menu) menu.classList.remove('show');
    }
}

/* --- FOREX & TICKER --- */
async function fetchLiveForex() {
    try {
        const response = await fetch('https://api.frankfurter.app/latest?from=USD&to=INR,EUR,GBP');
        const data = await response.json();
        if (data && data.rates) {
            updateTickerDOM('fx-usd', 'USD/INR', data.rates.INR);
            
            // EUR rates
            const resEur = await fetch('https://api.frankfurter.app/latest?from=EUR&to=INR');
            const dataEur = await resEur.json();
            updateTickerDOM('fx-eur', 'EUR/INR', dataEur.rates.INR);

            // GBP rates
            const resGbp = await fetch('https://api.frankfurter.app/latest?from=GBP&to=INR');
            const dataGbp = await resGbp.json();
            updateTickerDOM('fx-gbp', 'GBP/INR', dataGbp.rates.INR);
        }
    } catch (e) {
        // Fallback
        const elUsd = document.getElementById('fx-usd');
        if(elUsd) elUsd.innerHTML = 'USD/INR <span class="forex-up">83.50 ▲</span>';
    }
}

function updateTickerDOM(id, label, value) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = `${label} <span class="forex-up">${value.toFixed(2)} ▲</span>`;
}

function initTicker() {
    const dateSpan = document.getElementById('forex-date');
    if (dateSpan) dateSpan.innerText = "RATES AS OF " + new Date().toLocaleDateString('en-GB');

    const tickerContainer = document.getElementById('dynamic-ticker');
    if (tickerContainer) {
        const fullNews = [
            `<div class="t-item"><i class="fa-solid fa-ship"></i><span>UPDATE:</span> Exports to West Africa Operating Normally</div>`,
            `<div class="t-item"><i class="fa-solid fa-leaf"></i><span>SPICES:</span> New Turmeric Harvest Arriving</div>`,
            `<div class="t-item"><i class="fa-solid fa-wheat"></i><span>GRAINS:</span> Wheat Export Quota Open</div>`,
            `<div class="t-item"><i class="fa-solid fa-cube"></i><span>SUGAR:</span> Indian Production Outlook Positive</div>`
        ];
        tickerContainer.innerHTML = fullNews.join('') + fullNews.join('');
    }
}

/* --- ANIMATIONS --- */
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Stats Counter
                if(entry.target.classList.contains('stat-item') || entry.target.querySelector('.stat-item')) {
                    const counter = entry.target.querySelector('h3');
                    if(counter && !counter.classList.contains('counted')) {
                        const target = +entry.target.getAttribute('data-count'); 
                        const inc = target / 100; 
                        let count = 0;
                        const updateCount = () => { 
                            count += inc; 
                            if (count < target) { 
                                counter.innerText = Math.ceil(count); 
                                requestAnimationFrame(updateCount); 
                            } else { 
                                counter.innerText = target + "+"; 
                            } 
                        };
                        updateCount(); 
                        counter.classList.add('counted');
                    }
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    // Observer for stats specifically if needed
    document.querySelectorAll('.stat-item').forEach(el => observer.observe(el));
}

function updateFooterYear() {
    // Often handled inline in HTML, but good to have a fallback
}

/* --- CONTACT PAGE SPECIFIC --- */
function initContactPage() {
    // Timezone Clocks
    setInterval(() => {
        const now = new Date();
        const options = { hour: '2-digit', minute: '2-digit', hour12: false };
        const elIn = document.getElementById('time-in');
        const elAe = document.getElementById('time-ae');
        const elUk = document.getElementById('time-uk');
        
        if(elIn) elIn.innerText = now.toLocaleTimeString('en-US', { ...options, timeZone: 'Asia/Kolkata' });
        if(elAe) elAe.innerText = now.toLocaleTimeString('en-US', { ...options, timeZone: 'Asia/Dubai' });
        if(elUk) elUk.innerText = now.toLocaleTimeString('en-US', { ...options, timeZone: 'Europe/London' });
    }, 1000);

    // Map Switcher
    window.changeMap = function(loc) {
        const iframe = document.getElementById('gmap');
        const btns = document.querySelectorAll('.map-btn');
        btns.forEach(b => b.classList.remove('active'));
        event.target.classList.add('active');

        if(loc === 'vashi') iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.826227978252!2d72.99676531490104!3d19.07137498709051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c14a796e6259%3A0xc30a7d775670f032!2sAPMC%20Market%2C%20Vashi%2C%20Navi%20Mumbai!5e0!3m2!1sen!2sin"; // Dummy URL
        else if(loc === 'kandla') iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117763.5516245365!2d70.00334285820312!3d23.006322999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3950b8eb4776882f%3A0x6273062335f63908!2sDeendayal%20Port%20Trust%20(Kandla%20Port)!5e0!3m2!1sen!2sin";
        else if(loc === 'karnal') iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110860.17066986673!2d76.92135645!3d29.68026775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e6c46c072c479%3A0x269222622c83226!2sKarnal%2C%20Haryana!5e0!3m2!1sen!2sin";
    };

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(item => {
        item.addEventListener('click', event => {
            const parent = item.parentElement;
            parent.classList.toggle('active');
            const answer = parent.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');
            if (parent.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
                if(icon) icon.style.transform = "rotate(45deg)";
            } else {
                answer.style.maxHeight = "0";
                if(icon) icon.style.transform = "rotate(0deg)";
            }
        });
    });
}

/* --- PRODUCT PAGE SPECIFIC (Simplified) --- */
function initProductPage() {
    // Modal Close Logic
    const modal = document.getElementById('product-modal');
    if(modal) {
        window.closeModal = function() {
            modal.classList.remove('open');
            setTimeout(() => modal.style.display = "none", 300);
        }
        modal.addEventListener('click', (e) => {
            if(e.target === modal) window.closeModal();
        });
    }

    // Scroll Tabs
    window.scrollTabs = function(amount) {
        const container = document.getElementById('tab-container');
        if(container) container.scrollBy({ left: amount, behavior: 'smooth' });
    }
}
