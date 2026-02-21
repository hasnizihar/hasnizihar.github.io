// ===================================
// Projects Data
// ===================================

const projectsData = [
    {
        id: 'mora-sports-complex',
        title: 'Mora Sports Complex',
        category: 'Conseptual Design',
        tag: 'Conseptual Design',
        description: 'Comprehensive conceptual design and analysis of a multi-purpose sports complex including gymnasium, swimming pool, and outdoor facilities. Utilized ETABS for structural modeling and AutoCAD for detailed drawings.',
        coverImage: 'bio/project/mora-sports-complex/image/Cover-img.png',
        technologies: ['AutoCAD', 'Revit'],
        link: 'bio/project/mora-sports-complex/'
    },
    {
        id: 'community-green-space',
        title: 'Community Green Space Design',
        category: 'Design Project',
        tag: 'Design Project',
        description: 'Comprehensive conceptual design and analysis of a community green space including park, playground, and outdoor facilities. Utilized ETABS for structural modeling and AutoCAD for detailed drawings.',
        coverImage: 'bio/project/Community Green Space Design/image/Cover-img.png',
        technologies: ['Sweet Home 3D'],
        link: 'bio/project/Community Green Space Design/'
    }
];

// ===================================
// Render Projects Function
// ===================================

function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');

    if (!projectsGrid) {
        console.error('Projects grid container not found');
        return;
    }

    // Clear existing content
    projectsGrid.innerHTML = '';

    // Generate project cards
    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'glass project-card';

        // Build technologies HTML
        const techTags = project.technologies
            .map(tech => `<span class="tech-tag">${tech}</span>`)
            .join('');

        projectCard.innerHTML = `
            <div class="project-cover">
                <img src="${project.coverImage}" alt="${project.title}">
            </div>
            <div class="project-header">
                <h3 class="project-title">${project.title}</h3>
                <span class="project-tag">${project.tag}</span>
            </div>
            <p class="project-description">
                ${project.description}
            </p>
            <div class="project-tech">
                ${techTags}
            </div>
        `;

        // Add click event to navigate to project details
        if (project.link) {
            projectCard.style.cursor = 'pointer';
            projectCard.addEventListener('click', () => {
                window.location.href = project.link;
            });
        }

        projectsGrid.appendChild(projectCard);
    });
}

// ===================================
// Initialize on DOM Load
// ===================================

document.addEventListener('DOMContentLoaded', renderProjects);

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { projectsData, renderProjects };
}
