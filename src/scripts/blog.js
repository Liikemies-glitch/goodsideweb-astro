// Theme handling
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.dataset.theme = savedTheme;
    } else if (prefersDarkScheme.matches) {
        document.documentElement.dataset.theme = 'dark';
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.dataset.theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
}

// Add null check for themeToggle
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}
prefersDarkScheme.addEventListener('change', initTheme);
initTheme();

// Blog functionality
class BlogManager {
    constructor() {
        this.page = 1;
        this.loading = false;
        this.hasMore = true;
        this.currentCategory = 'all';
        this.searchQuery = '';
        this.articles = [];
        
        // DOM elements
        this.grid = document.getElementById('blog-grid');
        this.spinner = document.getElementById('loading-spinner');
        this.searchInput = document.getElementById('blog-search'); // Might be null
        this.filterTags = document.getElementById('filter-tags'); // Might be null
        this.template = document.getElementById('article-template');
        
        // Check if essential elements exist
        if (!this.grid || !this.spinner || !this.template) {
            console.error('Essential blog elements (grid, spinner, or template) not found!');
            return; // Stop initialization if essential parts are missing
        }

        // Bind events
        this.bindEvents();
        
        // Initial load
        this.loadArticles();
    }
    
    bindEvents() {
        // Optimized infinite scroll with throttling
        const handleScroll = throttle(() => {
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1000) {
                this.loadMore();
            }
        }, 200);

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Add null check for searchInput
        if (this.searchInput) {
            // Optimized search with debouncing
            let searchTimeout;
            this.searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.searchQuery = e.target.value;
                    this.resetAndReload();
                }, 300);
            });
        }
        
        // Add null check for filterTags
        if (this.filterTags) {
            // Category filtering
            this.filterTags.addEventListener('click', (e) => {
                if (e.target.classList.contains('filter-tag')) {
                    this.filterTags.querySelector('.active').classList.remove('active');
                    e.target.classList.add('active');
                    this.currentCategory = e.target.dataset.category;
                    this.resetAndReload();
                }
            });
        }
    }
    
    async loadArticles() {
        if (this.loading || !this.hasMore) return;
        
        this.loading = true;
        this.spinner.classList.add('visible');
        
        try {
            // Simulate API call - replace with actual API endpoint
            const response = await this.fetchArticles();
            
            if (response.articles.length === 0) {
                this.hasMore = false;
            } else {
                this.articles = [...this.articles, ...response.articles];
                this.renderArticles(response.articles);
                this.page++;
            }
        } catch (error) {
            console.error('Error loading articles:', error);
        } finally {
            this.loading = false;
            this.spinner.classList.remove('visible');
        }
    }
    
    async fetchArticles() {
        // Simulate API response - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Example data structure
        return {
            articles: [
                {
                    id: 1,
                    title: 'SaaS-mittarit, joita jokaisen kasvuyrityksen tulisi seurata',
                    excerpt: 'Oikeiden mittareiden seuraaminen on kriittistä SaaS-liiketoiminnan kasvattamisessa. Tässä artikkelissa käymme läpi tärkeimmät mittarit.',
                    image: '/images/blog/saas-metrics.jpg',
                    category: 'growth',
                    date: '2024-03-15',
                    readTime: '5 min'
                },
                {
                    id: 2,
                    title: 'Design system: Miksi ja miten rakentaa skaalautuva muotokieli',
                    excerpt: 'Design system on keskeinen työkalu modernissa tuotekehityksessä. Se nopeuttaa kehitystä ja varmistaa yhtenäisen käyttökokemuksen.',
                    image: '/images/blog/design-system.jpg',
                    category: 'ux',
                    date: '2024-03-10',
                    readTime: '7 min'
                },
                {
                    id: 3,
                    title: 'Tekoäly tuotesuunnittelussa: Mahdollisuudet ja haasteet',
                    excerpt: 'Tekoälyn hyödyntäminen tuotesuunnittelussa avaa uusia mahdollisuuksia. Tutustumme käytännön esimerkkeihin ja parhaisiin käytäntöihin.',
                    image: '/images/blog/ai-design.jpg',
                    category: 'ai',
                    date: '2024-03-05',
                    readTime: '6 min'
                },
                {
                    id: 4,
                    title: 'Konversio-optimointi SaaS-liiketoiminnassa',
                    excerpt: 'Konversio-optimointi on keskeinen osa SaaS-liiketoiminnan kasvattamista. Käymme läpi tehokkaimmat tekniikat ja työkalut.',
                    image: '/images/blog/conversion.jpg',
                    category: 'growth',
                    date: '2024-03-01',
                    readTime: '8 min'
                },
                {
                    id: 5,
                    title: 'Käyttäjätutkimus tuotekehityksen tukena',
                    excerpt: 'Käyttäjätutkimus on avain onnistuneeseen tuotekehitykseen. Opas käyttäjätutkimuksen suunnitteluun ja toteutukseen.',
                    image: '/images/blog/user-research.jpg',
                    category: 'ux',
                    date: '2024-02-25',
                    readTime: '7 min'
                },
                {
                    id: 6,
                    title: 'Product-Market Fit: Miten löytää ja validoida',
                    excerpt: 'Product-Market Fit on startup-maailman pyhä graali. Käymme läpi konkreettiset askeleet sen löytämiseen ja validointiin.',
                    image: '/images/blog/product-market.jpg',
                    category: 'product',
                    date: '2024-02-20',
                    readTime: '9 min'
                }
            ]
        };
    }
    
    renderArticles(articles) {
        articles.forEach(article => {
            const element = this.template.content.cloneNode(true);
            
            // Fill in the template
            const link = element.querySelector('.blog-card__link');
            const img = element.querySelector('img');
            const category = element.querySelector('.blog-card__category');
            const title = element.querySelector('.blog-card__title');
            const excerpt = element.querySelector('.blog-card__excerpt');
            const time = element.querySelector('time');
            const readTime = element.querySelector('.blog-card__read-time');
            
            link.href = `/blog/${article.id}`;
            img.src = article.image;
            img.alt = article.title;
            category.textContent = this.getCategoryName(article.category);
            title.textContent = article.title;
            excerpt.textContent = article.excerpt;
            time.textContent = this.formatDate(article.date);
            time.datetime = article.date;
            readTime.textContent = article.readTime;
            
            this.grid.appendChild(element);
        });
    }
    
    getCategoryName(category) {
        const categories = {
            'ux': 'Käyttäjäkokemus',
            'product': 'Tuotekehitys',
            'growth': 'Kasvu',
            'ai': 'Tekoäly'
        };
        return categories[category] || category;
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('fi-FI', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
    
    resetAndReload() {
        this.page = 1;
        this.hasMore = true;
        this.articles = [];
        this.grid.innerHTML = '';
        this.loadArticles();
    }
    
    loadMore() {
        if (!this.loading && this.hasMore) {
            this.loadArticles();
        }
    }
}

// Initialize blog
const blog = new BlogManager();

// Throttle function
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
