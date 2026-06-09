document.addEventListener('DOMContentLoaded', function() {
    const pricer = new SoftwareServicePricer();
    
    // مدیریت دکمه‌های محاسبه قیمت هر سرویس
    document.querySelectorAll('.calculate-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.service-card');
            const serviceName = card.dataset.service;
            const priceDiv = card.querySelector('.price');
            
            // انیمیشن لودینگ
            priceDiv.textContent = 'در حال محاسبه...';
            
            setTimeout(() => {
                priceDiv.textContent = pricer.getRandomPrice(serviceName);
                
                // انیمیشن موفقیت
                card.style.animation = 'pulse 0.5s';
                setTimeout(() => {
                    card.style.animation = '';
                }, 500);
            }, 500);
        });
    });
    
    // مدیریت دکمه پیش‌فاکتور
    document.getElementById('generate-quote').addEventListener('click', function() {
        const quoteDiv = document.getElementById('quote-result');
        quoteDiv.innerHTML = 'در حال آماده‌سازی پیش‌فاکتور...';
        
        setTimeout(() => {
            const quote = pricer.generateQuote();
            
            let html = '<h3>📋 پیش‌فاکتور شما</h3>';
            html += '<div class="quote-items">';
            quote.services.forEach(service => {
                html += `<div>• ${service}</div>`;
            });
            html += '</div>';
            html += `<div class="quote-total"><strong>مجموع: ${quote.total}</strong></div>`;
            html += `<div class="quote-discount">${quote.discount}</div>`;
            
            quoteDiv.innerHTML = html;
        }, 800);
    });
    
    // ثبت Service Worker برای PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    }
});

// انیمیشن CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);