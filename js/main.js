document.addEventListener("DOMContentLoaded", function() {

    // 1. FAQ ACCORDION
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach((question) => {
        question.addEventListener("click", function() {
            const item = this.parentElement;
            const answer = item.querySelector(".faq-answer");
            const icon = this.querySelector(".faq-icon");
            const isActive = item.classList.contains("active");

            // Tutup semua FAQ lain yang terbuka
            document.querySelectorAll(".faq-item").forEach((otherItem) => {
                otherItem.classList.remove("active");
                const otherAnswer = otherItem.querySelector(".faq-answer");
                if (otherAnswer) otherAnswer.style.maxHeight = null;
                
                const otherIcon = otherItem.querySelector(".faq-icon");
                if (otherIcon) {
                    otherIcon.textContent = "+";
                }
            });

            // Buka item yang diklik jika sebelumnya tertutup
            if (!isActive) {
                item.classList.add("active");
                if (answer) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
                if (icon) {
                    icon.textContent = "−";
                }
            }
        });
    });

    // 2. HAMBURGER MENU MOBILE (Sinkron class 'active' & icon switch)
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", function() {
            navLinks.classList.toggle("active");
            
            // Toggle icon bars <-> times
            const icon = hamburger.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-times");
            }
        });

        // Tutup menu saat salah satu link navigasi diklik
        document.querySelectorAll(".nav-links a").forEach((link) => {
            link.addEventListener("click", () => {
                if (navLinks.classList.contains("active")) {
                    navLinks.classList.remove("active");
                    const icon = hamburger.querySelector("i");
                    if (icon) {
                        icon.classList.add("fa-bars");
                        icon.classList.remove("fa-times");
                    }
                }
            });
        });
    }

    // 3. SLIDER TRIPADVISOR & READ MORE TOGGLE
    const taSlider = document.getElementById('taReviewsSlider');
    const taPrevBtn = document.getElementById('taPrevBtn');
    const taNextBtn = document.getElementById('taNextBtn');

    if (taSlider && taPrevBtn && taNextBtn) {
        taNextBtn.addEventListener('click', () => {
            taSlider.scrollBy({ left: 300, behavior: 'smooth' });
        });

        taPrevBtn.addEventListener('click', () => {
            taSlider.scrollBy({ left: -300, behavior: 'smooth' });
        });
    }

    const readMoreBtns = document.querySelectorAll('.ta-read-link');
    readMoreBtns.forEach((btn) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.ta-review-card');
            if (card) {
                card.classList.toggle('expanded');
                if (card.classList.contains('expanded')) {
                    this.innerHTML = 'Show less <i class="fas fa-chevron-up"></i>';
                } else {
                    this.innerHTML = 'Read more <i class="fas fa-chevron-down"></i>';
                }
            }
        });
    });

    // 4. AUTO SLIDE FITUR PADA TAMPILAN HP
    const featureSlider = document.querySelector(".features-grid");
    if (featureSlider) {
        let autoSlideInterval;
        
        function startAutoSlide() {
            if (window.innerWidth <= 768) {
                autoSlideInterval = setInterval(() => {
                    const firstCard = featureSlider.querySelector(".feature-card");
                    const cardWidth = firstCard ? (firstCard.offsetWidth + 15) : 250;
                    const maxScroll = featureSlider.scrollWidth - featureSlider.clientWidth;
                    
                    if (featureSlider.scrollLeft >= maxScroll - 10) {
                        featureSlider.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        featureSlider.scrollBy({ left: cardWidth, behavior: 'smooth' });
                    }
                }, 3500);
            }
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        startAutoSlide();
        featureSlider.addEventListener("touchstart", stopAutoSlide, { passive: true });
        featureSlider.addEventListener("touchend", () => {
            setTimeout(startAutoSlide, 2000);
        }, { passive: true });
    }

    // 5. GOOGLE ANALYTICS EVENT TRACKING
    if (typeof gtag === 'function') {
        // WhatsApp Tracking
        document.querySelectorAll('a[href*="wa.me"]').forEach((btn) => {
            btn.addEventListener("click", function() {
                gtag('event', 'click_whatsapp', {
                    'event_category': 'Contact',
                    'event_label': 'WhatsApp Chat Initiated'
                });
            });
        });

        // Paket Trekking Tracking
        document.querySelectorAll('.package-card .btn').forEach((btn) => {
            btn.addEventListener("click", function() {
                const card = this.closest('.package-card');
                const title = card ? (card.querySelector('h3') ? card.querySelector('h3').innerText : 'Package') : 'Package';
                gtag('event', 'select_content', {
                    'content_type': 'Trekking Package',
                    'item_name': title
                });
            });
        });

        // Contact Form Tracking
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener("submit", function() {
                const selectVal = this.querySelector('select') ? this.querySelector('select').value : '';
                gtag('event', 'generate_lead', {
                    'event_category': 'Form',
                    'event_label': 'Contact Form Submission',
                    'package_interest': selectVal
                });
            });
        }
    }

});