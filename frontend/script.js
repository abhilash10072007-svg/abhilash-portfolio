// API Configuration
const API_URL = 'https://abhilash-portfolio-api.onrender.com/api';
// Skills Data
const skillsData = {
    languages: {
        icon: "fa-code",
        items: ["Python", "JavaScript/ES6+", "C", "C++", "Java"]
    },
    frontend: {
        icon: "fa-layer-group",
        items: ["React.js", "HTML5/CSS3", "Bootstrap", "Vite"]
    },
    backend: {
        icon: "fa-server",
        items: ["Node.js", "Express.js", "Flask", "REST APIs", "JWT Auth"]
    },
    databases: {
        icon: "fa-database",
        items: ["MongoDB Atlas", "MySQL"]
    },
    cloud: {
        icon: "fa-cloud",
        items: ["AWS (SES)", "Vercel", "Railway", "Render", "Git/GitHub"]
    },
    aiml: {
        icon: "fa-brain",
        items: ["Groq API", "LLaMA-3.3-70B", "scikit-learn", "OpenCV", "MediaPipe", "NLP"]
    }
};

// Experience Data
const experienceData = [
    {
        title: "AI Career Advisor",
        subtitle: "Full-Stack AI Platform",
        date: "2025 - Present",
        description: "Architected full-stack career mentoring platform with JWT authentication, email OTP via AWS SES, and Groq-powered AI chatbot. Achieved sub-300ms average API response time under concurrent load."
    },
    {
        title: "Smart Doubt Exchange",
        subtitle: "Community Q&A Platform",
        date: "2025 - Present",
        description: "Built automated AI answering pipeline with node-cron scheduling, developed duplicate detection using TF-IDF vectorization (90% precision), and engineered gamified reputation system that increased engagement by 3x."
    },
    {
        title: "Gesture Control System",
        subtitle: "Computer Vision Project",
        date: "2025",
        description: "Built real-time hand gesture recognition system at 30+ FPS using MediaPipe landmark detection, implementing multi-gesture recognition with exponential smoothing to reduce false positives by 60%."
    },
    {
        title: "TourAte - Luxury Travel Platform",
        subtitle: "Frontend Development",
        date: "2025 - Present",
        description: "Designed responsive modular frontend with Vite + React + Bootstrap, implementing lazy-loaded package images reducing initial page load time by 40%."
    }
];

// Certifications Data
const certificationsData = [
    {
        icon: "fab fa-ibm",
        title: "Getting Started with AI",
        issuer: "IBM SkillsBuild"
    },
    {
        icon: "fas fa-trophy",
        title: "Project Expo Vision AI 2025",
        issuer: "Engineers' Day, SKCET"
    },
    {
        icon: "fas fa-microchip",
        title: "IEEE Computational Intelligence",
        issuer: "Society Member"
    },
    {
        icon: "fas fa-award",
        title: "TEXPERIA 2026",
        issuer: "Certificate of Appreciation"
    }
];

// Projects Data (Local fallback)
const defaultProjects = [
    {
        _id: "1",
        title: "AI Career Advisor",
        description: "Full-stack career mentoring platform with AI chatbot (LLaMA-3.3-70B), JWT authentication, email OTP via AWS SES, and role-based access control. Serves 50+ beta users with sub-300ms API responses.",
        techStack: ["React", "Node.js", "MongoDB", "Groq AI", "AWS SES"],
        githubLink: "https://github.com/abhilash10072007-svg/ai-career-advisor",
        liveLink: "#"
    },
    {
        _id: "2",
        title: "Smart Doubt Exchange",
        description: "Community Q&A platform with automated AI answering pipeline using Groq LLaMA-3.1-8B, duplicate detection via TF-IDF vectorization (90% precision), and gamified reputation system (3x engagement).",
        techStack: ["React", "Node.js", "MongoDB", "Flask", "scikit-learn"],
        githubLink: "https://github.com/abhilash10072007-svg/smart-doubt-exchange",
        liveLink: "#"
    },
    {
        _id: "3",
        title: "Gesture Control System",
        description: "Real-time hand gesture recognition system achieving 30+ FPS using MediaPipe landmark detection. Features pointer control, swipe gestures, and scissor action to open apps with 60% false positive reduction.",
        techStack: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
        githubLink: "https://github.com/abhilash10072007-svg/gesture-control",
        liveLink: "#"
    },
    {
        _id: "4",
        title: "TourAte - Travel Platform",
        description: "Luxury travel booking platform with responsive modular frontend using Vite + React + Bootstrap. Features instant visa eligibility simulation and lazy-loaded images reducing load time by 40%.",
        techStack: ["React", "Vite", "Bootstrap"],
        githubLink: "https://github.com/abhilash10072007-svg/tourate",
        liveLink: "#"
    }
];

// Fetch projects from API
async function fetchProjects() {
    try {
        const response = await fetch(`${API_URL}/projects`);
        if (response.ok) {
            const data = await response.json();
            return data.projects;
        }
        return defaultProjects;
    } catch (error) {
        console.log('Using default projects data');
        return defaultProjects;
    }
}

// Render Skills
function renderSkills() {
    const container = document.getElementById('skillsContainer');
    if (!container) return;

    const skillCategories = [
        { key: 'languages', title: 'Languages' },
        { key: 'frontend', title: 'Frontend' },
        { key: 'backend', title: 'Backend' },
        { key: 'databases', title: 'Databases' },
        { key: 'cloud', title: 'Cloud & DevOps' },
        { key: 'aiml', title: 'AI & ML' }
    ];

    container.innerHTML = skillCategories.map(cat => `
        <div class="skill-category">
            <h3><i class="fas ${skillsData[cat.key].icon}"></i> ${cat.title}</h3>
            <div class="skill-items">
                ${skillsData[cat.key].items.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// Render Experience
function renderExperience() {
    const container = document.getElementById('timeline');
    if (!container) return;

    container.innerHTML = experienceData.map(exp => `
        <div class="timeline-item">
            <div class="timeline-title">${exp.title}</div>
            <div class="timeline-subtitle">${exp.subtitle}</div>
            <div class="timeline-date"><i class="far fa-calendar-alt"></i> ${exp.date}</div>
            <div class="timeline-description">${exp.description}</div>
        </div>
    `).join('');
}

// Render Certifications
function renderCertifications() {
    const container = document.getElementById('certsGrid');
    if (!container) return;

    container.innerHTML = certificationsData.map(cert => `
        <div class="cert-card">
            <div class="cert-icon"><i class="${cert.icon}"></i></div>
            <div class="cert-title">${cert.title}</div>
            <div class="cert-issuer">${cert.issuer}</div>
        </div>
    `).join('');
}

// Render Projects
async function renderProjects() {
    const container = document.getElementById('projectsGrid');
    if (!container) return;

    const projects = await fetchProjects();

    container.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="tech-stack">
                    ${project.techStack.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.githubLink}" target="_blank"><i class="fab fa-github"></i> GitHub</a>
                    ${project.liveLink && project.liveLink !== '#' ? `<a href="${project.liveLink}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Animate stats counting
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.dataset.count);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// Typing animation
function typingAnimation() {
    const roles = ["AI Engineer", "Full-Stack Developer", "Computer Vision Enthusiast", "Problem Solver"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingText = document.querySelector('.typing-text');
    
    if (!typingText) return;

    function type() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }

    type();
}

// Contact form handler
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;
        const statusDiv = document.getElementById('formStatus');
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });
            
            const data = await response.json();
            
            if (data.success) {
                statusDiv.innerHTML = '<div class="status-success"><i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.</div>';
                form.reset();
                setTimeout(() => {
                    statusDiv.innerHTML = '';
                }, 5000);
            } else {
                statusDiv.innerHTML = '<div class="status-error"><i class="fas fa-exclamation-circle"></i> Failed to send message. Please try again.</div>';
            }
        } catch (error) {
            statusDiv.innerHTML = '<div class="status-error"><i class="fas fa-exclamation-circle"></i> Network error. Please try again.</div>';
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Navbar scroll effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Smooth scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.stat-card, .skill-category, .project-card, .timeline-item, .cert-card, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Initialize everything
async function init() {
    // Hide loading screen
    const loading = document.getElementById('loading');
    const mainContent = document.getElementById('mainContent');
    
    // Render all sections
    renderSkills();
    renderExperience();
    renderCertifications();
    await renderProjects();
    
    // Initialize features
    typingAnimation();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
    initScrollAnimations();
    
    // Animate stats after a short delay
    setTimeout(animateStats, 500);
    
    // Hide loading and show content
    setTimeout(() => {
        loading.style.display = 'none';
        mainContent.style.display = 'block';
    }, 1000);
}

// Start the application
init();