/**
 * --------------------------------------------------------------------------
 *  PERSONAL LINK CARD - CONFIGURATION
 * --------------------------------------------------------------------------
 *  Edit the data below to customize your page.
 */

const pageData = {
    // 1. PROFILE INFO
    profile: {
        name: "KR Hasni Zihar",
        role: "Civil Engineering Student | Designer",
        bio: "Designing structures and digital experiences. Minimalist enthusiast.",
        image: "my-profile-img.jpg" // Put your image in assets/images/
    },

    // 2. LINK GROUPS
    linkGroups: [
        {
            title: "Projects",
            links: [
                { label: "HzGPD Gallery", url: "https://hasnizihar.github.io/hzgpd/", icon: "fa-solid fa-palette" },
                { label: "Useful Tools Dashboard", url: "https://hasnizihar.github.io/List-of-links/", icon: "fa-solid fa-link" },
                { label: "Presonal portfolio", url: "https://hasnizihar.github.io/", icon: "fa-solid fa-laptop" }
            ]
        }
    ],

    // 3. SOCIALS
    socials: [
        { icon: "fa-brands fa-instagram", url: "https://instagram.com/ziharhasni" },
        { icon: "fa-brands fa-linkedin", url: "https://linkedin.com/in/kr-hasni-zihar" },
        { icon: "fa-brands fa-github", url: "https://github.com/hasnizihar" },
        { icon: "fa-brands fa-behance", url: "https://www.behance.net/hasnizihar" }
    ]
};

/**
 * --------------------------------------------------------------------------
 *  RENDERING LOGIC (Do not edit unless you know JS)
 * --------------------------------------------------------------------------
 */

document.addEventListener('DOMContentLoaded', () => {
    renderProfile();
    renderSocials(); // Render before links now
    renderLinks();
    setCopyrightYear();
});

function renderProfile() {
    const profileSection = document.getElementById('profile-section');
    const { name, role, bio, image } = pageData.profile;

    profileSection.innerHTML = `
        <div class="profile-img-container" style="
            width: 100px; 
            height: 100px; 
            margin: 0 auto 1rem; 
            border-radius: 50%; 
            border: 2px solid rgba(255,255,255,0.3); 
            overflow: hidden;">
            <img src="${image}" alt="${name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.parentNode.style.backgroundColor='rgba(255,255,255,0.2)'">
        </div>
        <h1 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.25rem;">${name}</h1>
        <p style="font-size: 0.9rem; opacity: 0.9; margin-bottom: 0.5rem; font-weight: 400;">${role}</p>
        <p style="font-size: 0.85rem; opacity: 0.7; max-width: 400px; margin: 0 auto; line-height: 1.4;">${bio}</p>
    `;
}

function renderLinks() {
    const linksSection = document.getElementById('links-section');
    linksSection.innerHTML = ''; // Clear

    pageData.linkGroups.forEach(group => {
        // Create Group Container (Glass panel per group? Or just Title + Buttons?)
        // Design Decision: Clean Title + Floating Glass Buttons for cleaner mobile look

        const groupWrapper = document.createElement('div');
        groupWrapper.className = 'link-group';

        const title = document.createElement('h3');
        title.className = 'link-group-title';
        title.textContent = group.title;
        groupWrapper.appendChild(title);

        group.links.forEach(link => {
            const btn = document.createElement('a');
            btn.href = link.url;
            btn.className = 'glass-panel link-btn';
            btn.target = "_blank"; // Open in new tab
            btn.rel = "noopener noreferrer";

            btn.innerHTML = `
                <span class="link-label" style="font-weight: 500;">
                    ${link.icon ? `<i class="${link.icon}" style="margin-right: 10px; width: 20px; text-align: center;"></i>` : ''} 
                    ${link.label}
                </span>
                <i class="fa-solid fa-chevron-right" style="font-size: 0.8rem; opacity: 0.6;"></i>
            `;

            groupWrapper.appendChild(btn);
        });

        linksSection.appendChild(groupWrapper);
    });
}

function renderSocials() {
    const socialsSection = document.getElementById('socials-section');
    socialsSection.innerHTML = ''; // Clear existing

    // Create a container for icons to center them or style them
    const iconContainer = document.createElement('div');
    iconContainer.className = 'glass-panel socials-card';
    // Re-using glass-panel but maybe with less padding/different style in CSS

    pageData.socials.forEach(social => {
        const link = document.createElement('a');
        link.href = social.url;
        link.className = 'social-icon';
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.innerHTML = `<i class="${social.icon}"></i>`;
        iconContainer.appendChild(link);
    });

    socialsSection.appendChild(iconContainer);
}

function setCopyrightYear() {
    document.getElementById('year').textContent = new Date().getFullYear();
}
