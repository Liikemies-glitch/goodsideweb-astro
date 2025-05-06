// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.nav__toggle');
    const menu = document.querySelector('.nav__menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-question-wrapper');

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const parentItem = item.closest('.faq-item');
            const toggle = item.querySelector('.faq-toggle');

            if (parentItem) {
                parentItem.classList.toggle('open');

                // Optional: Change toggle text content (+/-)
                if (parentItem.classList.contains('open')) {
                    // toggle.textContent = '-'; // Uncomment if you prefer minus sign
                } else {
                    // toggle.textContent = '+'; // Uncomment if you prefer minus sign
                }
            } 
        });
    });
});

// Smooth scroll for anchor links within the same page
document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        console.log('[SmoothScroll] Click detected. Link href:', this.getAttribute('href'));
        const hrefAttribute = this.getAttribute('href');
        
        const linkUrl = new URL(hrefAttribute, window.location.href);
        const currentPathname = window.location.pathname;

        console.log('[SmoothScroll] currentPathname:', currentPathname);
        console.log('[SmoothScroll] linkUrl (resolved):', { 
            href: linkUrl.href, 
            pathname: linkUrl.pathname, 
            hash: linkUrl.hash 
        });

        const normalizedLinkPathname = linkUrl.pathname.endsWith('/') ? linkUrl.pathname : linkUrl.pathname + '/';
        const normalizedCurrentPathname = currentPathname.endsWith('/') ? currentPathname : currentPathname + '/';

        console.log('[SmoothScroll] Normalized paths:', {
            link: normalizedLinkPathname,
            current: normalizedCurrentPathname
        });

        const isSamePageAnchor = normalizedLinkPathname === normalizedCurrentPathname && linkUrl.hash;
        console.log('[SmoothScroll] Is it a same-page anchor for scrolling?', isSamePageAnchor);

        if (isSamePageAnchor) {
            e.preventDefault();
            console.log('[SmoothScroll] Prevented default navigation.');
            try {
                const targetSelector = decodeURIComponent(linkUrl.hash);
                console.log('[SmoothScroll] Attempting to find target with selector:', targetSelector);
                const targetElement = document.querySelector(targetSelector);
                
                if (targetElement) {
                    console.log('[SmoothScroll] Target element found:', targetElement);
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    console.log('[SmoothScroll] scrollIntoView called.');
                    
                    if (window.history && window.history.pushState) {
                         history.pushState(null, null, linkUrl.pathname + linkUrl.hash);
                         console.log('[SmoothScroll] history.pushState called with:', linkUrl.pathname + linkUrl.hash);
                    }
                } else {
                    console.warn('[SmoothScroll] Target element NOT FOUND for selector:', targetSelector);
                }
            } catch (error) {
                console.error('[SmoothScroll] Error during scroll attempt:', error);
                // Fallback to default browser behavior if querySelector fails (e.g. invalid hash)
                return true; 
            }
        } else {
            console.log('[SmoothScroll] Not a same-page anchor for smooth scrolling, letting browser handle it.');
        }
    });
});

// FAQ accordion functionality
document.querySelectorAll('.faq__item').forEach(item => {
    item.addEventListener('click', () => {
        const isOpen = item.hasAttribute('open');
        // Close all other items
        document.querySelectorAll('.faq__item[open]').forEach(openItem => {
            if (openItem !== item) {
                openItem.removeAttribute('open');
            }
        });
    });
});

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Optimized Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.05
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            requestAnimationFrame(() => {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            });
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
});

// Handle form submissions (if any)
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form handling logic here
        console.log('Form submitted');
    });
});

// Add loading="lazy" to all images for better performance
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img').forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
});

// Add aria-label to interactive elements that need it
document.querySelectorAll('button:not([aria-label])').forEach(button => {
    if (!button.textContent.trim()) {
        button.setAttribute('aria-label', 'Toggle');
    }
});

// Optimized scroll-based header styling
let lastScroll = 0;
const header = document.querySelector('.header');

const handleScroll = throttle(() => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
}, 100);

window.addEventListener('scroll', handleScroll, { passive: true }); 