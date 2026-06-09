// فایل price-calculator.js
class SoftwareServicePricer {
    constructor() {
        this.basePrices = {
            'اپلیکیشن موبایل': { min: 500000, max: 3000000 },
            'نرم‌افزار سفارشی': { min: 1000000, max: 5000000 }
        };
    }

    getRandomPrice(serviceName) {
        const priceRange = this.basePrices[serviceName];
        if (!priceRange) {
            return 'سرویس پیدا نشد';
        }
        
        const randomPrice = Math.floor(Math.random() * (priceRange.max - priceRange.min + 1)) + priceRange.min;
        return this.formatPrice(randomPrice);
    }

    formatPrice(price) {
        return price.toLocaleString('fa-IR') + ' تومان';
    }

    getAllPrices() {
        const prices = {};
        for (const service in this.basePrices) {
            prices[service] = this.getRandomPrice(service);
        }
        return prices;
    }

    generateQuote() {
        const services = Object.keys(this.basePrices);
        const selectedServices = [];
        const numServices = Math.floor(Math.random() * 2) + 1; // 1-2 services
        
        for (let i = 0; i < numServices; i++) {
            const randomService = services[Math.floor(Math.random() * services.length)];
            if (!selectedServices.includes(randomService)) {
                selectedServices.push(randomService);
            }
        }
        
        let totalPrice = 0;
        const quote = selectedServices.map(service => {
            const priceRange = this.basePrices[service];
            const price = Math.floor(Math.random() * (priceRange.max - priceRange.min + 1)) + priceRange.min;
            totalPrice += price;
            return `${service}: ${this.formatPrice(price)}`;
        });
        
        return {
            services: quote,
            total: this.formatPrice(totalPrice),
            discount: this.calculateDiscount(totalPrice)
        };
    }

    calculateDiscount(price) {
        if (price > 5000000) return '20% تخفیف ویژه';
        if (price > 3000000) return '15% تخفیف';
        if (price > 1000000) return '10% تخفیف';
        return 'بدون تخفیف';
    }
}

// استفاده از کلاس
const pricer = new SoftwareServicePricer();

// نمایش قیمت تصادفی
console.log(pricer.getRandomPrice('اپلیکیشن موبایل'));
console.log(pricer.getAllPrices());
console.log(pricer.generateQuote());