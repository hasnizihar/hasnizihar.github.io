// Link Hub Data
const linkHubData = [
    {
        category: "Useful tools by HzGPD",
        icon: "fa-solid fa-wrench",
        links: [
            { name: "PDF to PPTX", url: "https://hasnizihar.github.io/Useful_tools/pdf-to-pptx/", desc: "Convert PDF files to editable PowerPoint presentations.", icon: "fa-solid fa-file-powerpoint" },
            { name: "QR Code Generator", url: "https://hasnizihar.github.io/Useful_tools/QR-code-generator/", desc: "Create custom QR codes with premium design.", icon: "fa-solid fa-qrcode" },
            { name: "Unicode to Bamini", url: "https://hasnizihar.github.io/Useful_tools/Unicode-to-bamini/", desc: "Convert Unicode Tamil text to Bamini format.", icon: "fa-solid fa-language" },
            { name: "SkAi", url: "https://hasnizihar.github.io/Useful_tools/SkAi/", desc: "modern AI-powered weather dashboard.", icon: "fa-solid fa-cloud-sun" },
            { name: "MathGen", url: "https://hasnizihar.github.io/Useful_tools/MathGen/", desc: "Generate custom math practice questions instantly.", icon: "fa-solid fa-calculator" },
            { name: "Chatter", url: "https://hasnizihar.github.io/Useful_tools/HzChat/frontend/index.html", desc: "Chat with AI", icon: "fa-solid fa-robot" }
        ]
    },
    // {
    //     category: "Study Resources",
    //     icon: "fa-solid fa-book-open",
    //     links: [
    //         { name: "Coursera", url: "https://www.coursera.org", desc: "Online courses from top universities.", icon: "fa-solid fa-graduation-cap" },
    //         { name: "Khan Academy", url: "https://www.khanacademy.org", desc: "Free online courses and lessons.", icon: "fa-solid fa-school" },
    //         { name: "MDN Web Docs", url: "https://developer.mozilla.org", desc: "Resources for developers by developers.", icon: "fa-brands fa-firefox-browser" }
    //     ]
    // },
    // {
    //     category: "Design Resources",
    //     icon: "fa-solid fa-palette",
    //     links: [
    //         { name: "Figma", url: "https://www.figma.com", desc: "Collaborative interface design tool.", icon: "fa-brands fa-figma" },
    //         { name: "Unsplash", url: "https://unsplash.com", desc: "Beautiful, free images and photos.", icon: "fa-solid fa-image" },
    //         { name: "Dribbble", url: "https://dribbble.com", desc: "Show and tell for designers.", icon: "fa-brands fa-dribbble" }
    //     ]
    // },
    // {
    //     category: "Developer Tools",
    //     icon: "fa-solid fa-code",
    //     links: [
    //         { name: "GitHub", url: "https://github.com", desc: "Where the world builds software.", icon: "fa-brands fa-github" },
    //         { name: "Stack Overflow", url: "https://stackoverflow.com", desc: "Public platform for developers.", icon: "fa-brands fa-stack-overflow" },
    //         { name: "Can I Use", url: "https://caniuse.com", desc: "Browser support tables for modern web.", icon: "fa-solid fa-check-double" }
    //     ]
    // },
    // {
    //     category: "Software Links",
    //     icon: "fa-solid fa-laptop-code",
    //     links: [
    //         { name: "VS Code", url: "https://code.visualstudio.com", desc: "Code editing. Redefined.", icon: "fa-solid fa-code-merge" },
    //         { name: "Postman", url: "https://www.postman.com", desc: "API platform for building and using APIs.", icon: "fa-solid fa-rocket" }
    //     ]
    // }
];

// DOM Elements
const linksContainer = document.getElementById('links-container');
const searchInput = document.getElementById('search-input');

// Initialize
function init() {
    renderLinks(linkHubData);

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterLinks(searchTerm);
    });
}

// Render Links
function renderLinks(data) {
    if (data.length === 0) {
        linksContainer.innerHTML = `
            <div class="no-results">
                <i class="fa-solid fa-circle-exclamation fa-3x" style="margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>No matches found for your search.</p>
            </div>
        `;
        return;
    }

    linksContainer.innerHTML = '';

    data.forEach(category => {
        const section = document.createElement('section');
        section.className = 'category-section';

        section.innerHTML = `
            <h2 class="category-title">
                <i class="${category.icon}"></i>
                ${category.category}
            </h2>
            <div class="links-grid">
                ${category.links.map(link => `
                    <a href="${link.url}" class="link-button" target="_blank" rel="noopener noreferrer">
                        <div class="link-icon">
                            <i class="${link.icon || 'fa-solid fa-link'}"></i>
                        </div>
                        <div class="link-info">
                            <span class="link-name">${link.name}</span>
                            <span class="link-desc">${link.desc}</span>
                        </div>
                    </a>
                `).join('')}
            </div>
        `;

        linksContainer.appendChild(section);
    });
}

// Filter Links
function filterLinks(term) {
    const filteredData = linkHubData.map(category => {
        // Filter links in this category
        const filteredLinks = category.links.filter(link =>
            link.name.toLowerCase().includes(term) ||
            link.desc.toLowerCase().includes(term) ||
            category.category.toLowerCase().includes(term)
        );

        // Return a copy of the category with only filtered links
        return { ...category, links: filteredLinks };
    }).filter(category => category.links.length > 0); // Only keep categories with matching links

    renderLinks(filteredData);
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
