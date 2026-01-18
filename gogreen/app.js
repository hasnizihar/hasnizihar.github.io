/**
 * Go Green Movement - Core App Logic
 */

const App = {
    state: {
        currentLang: localStorage.getItem('lang') || 'en',
        currentPage: location.hash.replace('#', '') || 'home'
    },

    init() {
        console.log('App Initializing...');
        this.bindEvents();
        this.render();
    },

    bindEvents() {
        window.addEventListener('hashchange', () => {
            this.state.currentPage = location.hash.replace('#', '') || 'home';
            this.render();
        });

        window.addEventListener('scroll', () => {
            const header = document.getElementById('main-header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    },

    setLanguage(lang) {
        this.state.currentLang = lang;
        localStorage.setItem('lang', lang);
        this.render();
    },

    render() {
        this.renderHeader();
        this.renderPage();
        this.renderFooter();
    },

    renderHeader() {
        const navItems = siteData.common[this.state.currentLang].nav;
        const header = document.getElementById('main-header');

        let navHtml = `
            <div class="container" style="display: flex; justify-content: space-between; width: 100%;">
                <div class="logo" style="font-weight: 700; font-size: 1.2rem;">GO GREEN</div>
                <nav class="desktop-nav">
                    <ul style="display: flex; list-style: none; gap: 20px;">
                        ${Object.entries(navItems).map(([key, label]) => `
                            <li><a href="#${key}" style="color: white; text-decoration: none; font-size: 0.9rem; font-weight: 500;">${label}</a></li>
                        `).join('')}
                    </ul>
                </nav>
                <div class="lang-switcher" style="display: flex; gap: 10px;">
                    <button onclick="App.setLanguage('en')" class="lang-btn ${this.state.currentLang === 'en' ? 'active' : ''}">EN</button>
                    <button onclick="App.setLanguage('ta')" class="lang-btn ${this.state.currentLang === 'ta' ? 'active' : ''}">TA</button>
                    <button onclick="App.setLanguage('si')" class="lang-btn ${this.state.currentLang === 'si' ? 'active' : ''}">SI</button>
                </div>
            </div>
        `;
        header.innerHTML = navHtml;
    },

    renderPage() {
        const content = document.getElementById('content');
        const pageData = siteData.pages[this.state.currentPage] || siteData.pages.home;
        const langData = pageData[this.state.currentLang];

        if (this.state.currentPage === 'home') {
            content.innerHTML = `
                ${this.components.hero(langData.hero)}
                ${this.components.stats(langData.stats)}
                ${this.components.services(langData.services)}
                ${this.components.newsHighlights(this.state.currentLang)}
                ${this.components.galleryPreview()}
            `;
        } else if (this.state.currentPage === 'about') {
            content.innerHTML = this.components.aboutPage(langData);
        } else if (this.state.currentPage === 'contact') {
            content.innerHTML = this.components.contactPage(langData);
        } else {
            content.innerHTML = `<div class="container fade-in" style="padding-top: 100px;"><h2>${this.state.currentPage.charAt(0).toUpperCase() + this.state.currentPage.slice(1)} Page Coming Soon</h2></div>`;
        }
        window.scrollTo(0, 0);
    },

    renderFooter() {
        const footer = document.getElementById('main-footer');
        footer.innerHTML = `
            <div class="container" style="padding: 40px 0; border-top: 1px solid var(--border-glass); margin-top: 60px;">
                <p>&copy; 2023 ${siteData.config.siteName}. All rights reserved.</p>
            </div>
        `;
    },

    components: {
        hero(data) {
            return `
                <section class="hero fade-in" style="padding: 140px 0 60px; text-align: center;">
                    <div class="container">
                        <h1 class="text-gradient" style="font-size: clamp(2.5rem, 8vw, 4rem); margin-bottom: 20px;">${data.title}</h1>
                        <p style="font-size: 1.2rem; margin-bottom: 40px; color: var(--text-secondary); max-width: 700px; margin-left: auto; margin-right: auto;">${data.subtitle}</p>
                        <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
                            <a href="#getInvolved" class="glass-btn primary">${data.ctaPrimary}</a>
                            <a href="#about" class="glass-btn">${data.ctaSecondary}</a>
                        </div>
                    </div>
                </section>
            `;
        },

        stats(data) {
            return `
                <section class="stats fade-in">
                    <div class="container">
                        <div class="grid" style="grid-template-columns: repeat(2, 1fr) !important; @media (min-width: 768px) { grid-template-columns: repeat(4, 1fr) !important; }">
                            ${data.map(item => `
                                <div class="glass stats-card">
                                    <span class="stats-number">${item.number}</span>
                                    <span class="stats-label">${item.label}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>
            `;
        },

        services(data) {
            return `
                <section class="services fade-in">
                    <div class="container">
                        <h2>${data.title}</h2>
                        <div class="grid">
                            ${data.items.map(item => `
                                <div class="glass service-card">
                                    <span class="service-icon">${item.icon}</span>
                                    <h3>${item.title}</h3>
                                    <p style="color: var(--text-secondary);">${item.desc}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>
            `;
        },

        newsHighlights(lang) {
            const newsItems = siteData.collections.news.slice(0, 3);
            const title = { en: "Latest News", ta: "சமீපத்திய செய்திகள்", si: "නවතම පුවත්" }[lang];

            return `
                <section class="news-highlights fade-in">
                    <div class="container">
                        <h2>${title}</h2>
                        <div class="grid">
                            ${newsItems.map(item => `
                                <div class="glass news-card" style="padding: 0;">
                                    <img src="${item.image}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 20px 20px 0 0;">
                                    <div style="padding: var(--spacing-sm);">
                                        <small style="color: var(--primary);">${item.date}</small>
                                        <h3 style="margin: 10px 0;">${item[lang].title}</h3>
                                        <p style="color: var(--text-secondary); font-size: 0.9rem;">${item[lang].excerpt}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>
            `;
        },

        galleryPreview() {
            const galleryItems = siteData.collections.gallery.slice(0, 3);
            const titles = { en: "Gallery", ta: "புகைப்படங்கள்", si: "ඡායාරූප" };
            const title = titles[App.state.currentLang];

            return `
                <section class="gallery-preview fade-in">
                    <div class="container">
                        <h2>${title}</h2>
                        <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
                            ${galleryItems.map(item => `
                                <div class="glass" style="padding: 0; line-height: 0;">
                                    <img src="${item.url}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 20px;">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>
            `;
        },

        aboutPage(data) {
            return `
                <section class="about-header fade-in" style="padding: 140px 0 60px;">
                    <div class="container" style="max-width: 800px; text-align: center;">
                        <h1 class="text-gradient">${data.header.title}</h1>
                        <p style="font-size: 1.1rem; color: var(--text-secondary); line-height: 1.8;">${data.header.intro}</p>
                    </div>
                </section>

                <section class="about-vision-mission fade-in">
                    <div class="container">
                        <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));">
                            <div class="glass" style="padding: var(--spacing-lg);">
                                <h3 style="color: var(--primary);">${data.vision.title}</h3>
                                <p style="color: var(--text-secondary);">${data.vision.content}</p>
                            </div>
                            <div class="glass" style="padding: var(--spacing-lg);">
                                <h3 style="color: var(--primary);">${data.mission.title}</h3>
                                <p style="color: var(--text-secondary);">${data.mission.content}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="about-objectives fade-in">
                    <div class="container">
                        <h2 class="text-gradient">${data.objectives.title}</h2>
                        <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
                            ${data.objectives.items.map(item => `
                                <div class="glass" style="padding: var(--spacing-md); display: flex; align-items: flex-start; gap: 15px;">
                                    <span style="font-size: 1.2rem; margin-top: 4px;">🎯</span>
                                    <p style="font-size: 0.95rem;">${item}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>

                <section class="about-story fade-in">
                    <div class="container" style="max-width: 800px;">
                        <div class="glass" style="padding: var(--spacing-lg);">
                            <h2 style="text-align: left; margin-bottom: 20px;">${data.story.title}</h2>
                            <p style="color: var(--text-secondary); line-height: 1.8;">${data.story.content}</p>
                        </div>
                    </div>
                </section>

                <section class="about-values fade-in">
                    <div class="container">
                        <h2 class="text-gradient">${data.values.title}</h2>
                        <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
                            ${data.values.items.map((item, idx) => {
                const icons = ['👥', '💎', '🤝', '🛠️'];
                return `
                                    <div class="glass" style="padding: var(--spacing-md); text-align: center;">
                                        <div style="font-size: 2rem; margin-bottom: 10px;">${icons[idx] || '✨'}</div>
                                        <h4 style="font-weight: 600;">${item}</h4>
                                    </div>
                                `;
            }).join('')}
                        </div>
                    </div>
                </section>

                <section class="about-cta fade-in">
                    <div class="container" style="text-align: center;">
                        <div class="glass" style="padding: var(--spacing-xl); background: linear-gradient(rgba(46, 204, 113, 0.1), rgba(46, 204, 113, 0.05));">
                            <h2 style="margin-bottom: 20px;">${data.cta.text}</h2>
                            <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
                                <a href="#getInvolved" class="glass-btn primary">${data.cta.primary}</a>
                                <a href="#volunteer" class="glass-btn">${data.cta.secondary}</a>
                            </div>
                        </div>
                    </div>
                </section>
            `;
        },

        contactPage(data) {
            return `
                <section class="contact-page fade-in" style="padding-top: 140px;">
                    <div class="container">
                        <div style="text-align: center; margin-bottom: 60px;">
                            <h2 class="text-gradient">${data.title}</h2>
                            <p style="color: var(--text-secondary); max-width: 600px; margin: 0 auto;">${data.subtitle}</p>
                        </div>
                        
                        <div class="grid" style="grid-template-columns: 1fr 1fr;">
                            <div class="glass" style="padding: var(--spacing-lg);">
                                <h3>Send a Message</h3>
                                <form id="contact-form" style="display: flex; flex-direction: column; gap: 20px; margin-top: 20px;">
                                    <input type="text" placeholder="${data.form.name}" class="glass-input">
                                    <input type="email" placeholder="${data.form.email}" class="glass-input">
                                    <textarea placeholder="${data.form.message}" class="glass-input" style="min-height: 150px;"></textarea>
                                    <button type="submit" class="glass-btn primary">${data.form.submit}</button>
                                </form>
                            </div>
                            
                            <div class="glass" style="padding: var(--spacing-lg);">
                                <h3>Contact Information</h3>
                                <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 30px;">
                                    <div style="display: flex; gap: 15px; align-items: flex-start;">
                                        <span style="font-size: 1.5rem;">📍</span>
                                        <div>
                                            <h4 style="margin-bottom: 5px;">Our Office</h4>
                                            <p style="color: var(--text-secondary);">${data.info.address}</p>
                                        </div>
                                    </div>
                                    <div style="display: flex; gap: 15px; align-items: flex-start;">
                                        <span style="font-size: 1.5rem;">📞</span>
                                        <div>
                                            <h4 style="margin-bottom: 5px;">Phone</h4>
                                            <p style="color: var(--text-secondary);">${data.info.phone}</p>
                                        </div>
                                    </div>
                                    <div style="display: flex; gap: 15px; align-items: flex-start;">
                                        <span style="font-size: 1.5rem;">✉️</span>
                                        <div>
                                            <h4 style="margin-bottom: 5px;">Email</h4>
                                            <p style="color: var(--text-secondary);">${data.info.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            `;
        }
    }
};

window.onload = () => App.init();
