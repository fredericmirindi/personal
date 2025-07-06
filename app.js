// Application Data
const appData = {
    conferences: [
        {
            name: "AI in Finance 2025",
            date: "2025-05-15",
            location: "Montreal, Canada",
            description: "Exploring cutting-edge AI applications in finance and economics",
            website: "https://sites.events.concordia.ca/sites/concordia/en/aiinfinance2025/pages/25514",
            topics: ["AI", "Finance", "Real Estate", "Machine Learning"]
        },
        {
            name: "International Conference on Financial Innovation",
            date: "2025-07-20",
            location: "Online",
            description: "AI-driven economic forecasting and mathematical modeling",
            website: "https://www.atlantis-press.com/",
            topics: ["Economic Forecasting", "Mathematical Modeling", "AI"]
        },
        {
            name: "Behavioral Economics AI Summit",
            date: "2025-09-10",
            location: "Stanford, CA",
            description: "Intersection of behavioral economics and artificial intelligence",
            website: "https://www.gsb.stanford.edu/",
            topics: ["Behavioral Economics", "AI", "Decision Making"]
        }
    ],
    papers: [
        {
            title: "The Impact of Machine Learning on Economics",
            authors: ["Susan Athey", "Guido Imbens"],
            year: "2025",
            journal: "American Economic Review",
            abstract: "Assessment of early contributions of machine learning to economics and predictions about future contributions",
            topics: ["Machine Learning", "Economics", "Policy Analysis"],
            link: "https://www.gsb.stanford.edu/faculty-research/publications/impact-machine-learning-economics"
        },
        {
            title: "Behavioral Economics of AI: LLM Biases and Corrections",
            authors: ["Research Team"],
            year: "2025",
            journal: "SSRN",
            abstract: "Comprehensive experiments on behavioral biases in large language models and economic decisions",
            topics: ["Behavioral Economics", "AI Bias", "LLMs"],
            link: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5213130"
        },
        {
            title: "AI-Driven Economic Forecasting: Mathematical Modeling in Western Economics",
            authors: ["Yu, J.", "Zhang, H.", "Chen, Y."],
            year: "2025",
            journal: "Advances in Economics",
            abstract: "Novel AI-driven forecasting model incorporating advanced mathematical techniques",
            topics: ["Economic Forecasting", "AI", "Mathematical Modeling"],
            link: "https://www.atlantis-press.com/"
        }
    ],
    aiApplications: [
        {
            category: "Economic Forecasting",
            description: "AI models processing vast datasets to predict GDP, inflation, and market trends",
            accuracy: "280x improvement in cost efficiency since 2022",
            examples: ["LSTM networks for time series", "Random Forest models", "Ensemble methods"]
        },
        {
            category: "Behavioral Economics",
            description: "AI analyzing human decision-making patterns and cognitive biases",
            applications: ["Personalized nudging", "Bias detection", "Decision architecture design"],
            impact: "78% of organizations now use AI for behavioral insights"
        },
        {
            category: "Financial Risk Management",
            description: "Machine learning for real-time risk assessment and portfolio optimization",
            benefits: ["Real-time analysis", "Pattern recognition", "Automated adjustments"],
            adoption: "109.1 billion USD invested in AI in 2024"
        }
    ]
};

// Global state
let currentPage = 'home';
let currentChart = null;
let particleSystem = null;
let mousePosition = { x: 0, y: 0 };
let filteredData = { papers: [], conferences: [] };

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    initializeParticleSystem();
    setupMouseTracking();
    setupInteractiveElements();
    renderInitialContent();
});

function initializeApp() {
    // Set initial filtered data
    filteredData.papers = [...appData.papers];
    filteredData.conferences = [...appData.conferences];
    
    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-color-scheme', savedTheme);
    updateThemeToggle(savedTheme);
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    document.querySelectorAll('[data-page]').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
        });
    });
    
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Tab functionality
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', handleTabChange);
    });
    
    // AI simulation controls
    const gdpSlider = document.getElementById('gdpSlider');
    if (gdpSlider) {
        gdpSlider.addEventListener('input', updateGDPSimulation);
    }
    
    // Behavioral economics choices
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.addEventListener('click', handleBehavioralChoice);
    });
    
    // Footnotes system
    setupFootnotesSystem();
}

function handleNavigation(e) {
    e.preventDefault();
    const page = this.getAttribute('data-page');
    showPage(page);
}

function showPage(pageId) {
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[data-page="${pageId}"]`).classList.add('active');
    
    // Show page content
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
        
        // Trigger page-specific initialization
        switch(pageId) {
            case 'papers':
                renderPapersAndConferences();
                break;
            case 'ai-economics':
                initializeAIEconomics();
                break;
            case 'research':
                // Research page is static
                break;
        }
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-color-scheme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-color-scheme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggle(newTheme);
}

function updateThemeToggle(theme) {
    const toggle = document.getElementById('themeToggle');
    const icon = toggle.querySelector('.theme-icon');
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Particle System
function initializeParticleSystem() {
    const container = document.getElementById('particles');
    const particles = [];
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (8 + Math.random() * 4) + 's';
        container.appendChild(particle);
        particles.push(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
            const index = particles.indexOf(particle);
            if (index > -1) {
                particles.splice(index, 1);
            }
        }, 12000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 500);
    
    // Initial particles
    for (let i = 0; i < 5; i++) {
        setTimeout(createParticle, i * 100);
    }
}

// Mouse tracking for interactive elements
function setupMouseTracking() {
    document.addEventListener('mousemove', function(e) {
        mousePosition.x = e.clientX;
        mousePosition.y = e.clientY;
        
        // Update hero shape rotation based on mouse position
        const heroShape = document.getElementById('heroShape');
        if (heroShape) {
            const rect = heroShape.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) / 10;
            const deltaY = (e.clientY - centerY) / 10;
            
            heroShape.style.transform = `rotateX(${deltaY}deg) rotateY(${deltaX}deg)`;
        }
    });
}

function setupInteractiveElements() {
    // Hero shape interaction
    const heroShape = document.getElementById('heroShape');
    if (heroShape) {
        heroShape.addEventListener('click', function() {
            this.style.transform = 'rotateX(360deg) rotateY(360deg) scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
            }, 1000);
        });
    }
    
    // Add hover effects to cards
    document.querySelectorAll('.highlight-card, .paper-card, .application-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function renderInitialContent() {
    renderPapersAndConferences();
    generateFilterTags();
    renderAIApplications();
}

// Papers and Conferences
function renderPapersAndConferences() {
    renderConferences();
    renderPapers();
}

function renderConferences() {
    const container = document.getElementById('conferencesList');
    if (!container) return;
    
    container.innerHTML = '';
    
    filteredData.conferences.forEach((conference, index) => {
        const conferenceElement = document.createElement('div');
        conferenceElement.className = 'timeline-item';
        
        const date = new Date(conference.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        conferenceElement.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h3 class="conference-title">${conference.name}</h3>
                <div class="conference-date">${formattedDate}</div>
                <div class="conference-location">${conference.location}</div>
                <p class="conference-description">${conference.description}</p>
                <a href="${conference.website}" target="_blank" class="conference-link">Visit Conference Website</a>
                <div class="conference-topics">
                    ${conference.topics.map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
                </div>
            </div>
        `;
        
        container.appendChild(conferenceElement);
    });
}

function renderPapers() {
    const container = document.getElementById('papersList');
    if (!container) return;
    
    container.innerHTML = '';
    
    filteredData.papers.forEach(paper => {
        const paperElement = document.createElement('div');
        paperElement.className = 'paper-card';
        
        paperElement.innerHTML = `
            <h3 class="paper-title">${paper.title}</h3>
            <div class="paper-authors">${paper.authors.join(', ')}</div>
            <div class="paper-journal">${paper.journal} (${paper.year})</div>
            <p class="paper-abstract">${paper.abstract}</p>
            <div class="conference-topics">
                ${paper.topics.map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
            </div>
            <a href="${paper.link}" target="_blank" class="paper-link">Read Paper</a>
        `;
        
        container.appendChild(paperElement);
    });
}

function generateFilterTags() {
    const container = document.getElementById('filterTags');
    if (!container) return;
    
    const allTopics = new Set();
    
    appData.papers.forEach(paper => {
        paper.topics.forEach(topic => allTopics.add(topic));
    });
    
    appData.conferences.forEach(conference => {
        conference.topics.forEach(topic => allTopics.add(topic));
    });
    
    container.innerHTML = '';
    
    Array.from(allTopics).forEach(topic => {
        const tag = document.createElement('span');
        tag.className = 'filter-tag';
        tag.textContent = topic;
        tag.addEventListener('click', () => toggleFilter(topic, tag));
        container.appendChild(tag);
    });
}

function toggleFilter(topic, tagElement) {
    tagElement.classList.toggle('active');
    
    const activeFilters = Array.from(document.querySelectorAll('.filter-tag.active'))
        .map(tag => tag.textContent);
    
    if (activeFilters.length === 0) {
        filteredData.papers = [...appData.papers];
        filteredData.conferences = [...appData.conferences];
    } else {
        filteredData.papers = appData.papers.filter(paper => 
            paper.topics.some(topic => activeFilters.includes(topic))
        );
        filteredData.conferences = appData.conferences.filter(conference => 
            conference.topics.some(topic => activeFilters.includes(topic))
        );
    }
    
    renderPapersAndConferences();
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    
    filteredData.papers = appData.papers.filter(paper => 
        paper.title.toLowerCase().includes(query) ||
        paper.authors.some(author => author.toLowerCase().includes(query)) ||
        paper.abstract.toLowerCase().includes(query)
    );
    
    filteredData.conferences = appData.conferences.filter(conference => 
        conference.name.toLowerCase().includes(query) ||
        conference.description.toLowerCase().includes(query) ||
        conference.location.toLowerCase().includes(query)
    );
    
    renderPapersAndConferences();
}

function handleTabChange(e) {
    const tabName = e.target.getAttribute('data-tab');
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const targetContent = document.getElementById(tabName === 'conferences' ? 'conferences' : 'papers-content');
    if (targetContent) {
        targetContent.classList.add('active');
    }
}

// AI Economics Page
function initializeAIEconomics() {
    renderAIApplications();
    initializeForecastChart();
    setupBehavioralSimulation();
}

function renderAIApplications() {
    const container = document.getElementById('applicationsGrid');
    if (!container) return;
    
    container.innerHTML = '';
    
    appData.aiApplications.forEach(app => {
        const appElement = document.createElement('div');
        appElement.className = 'application-card';
        
        let contentHTML = `
            <h3 class="application-title">${app.category}</h3>
            <p class="application-description">${app.description}</p>
        `;
        
        if (app.examples) {
            contentHTML += `
                <ul class="application-list">
                    ${app.examples.map(example => `<li>${example}</li>`).join('')}
                </ul>
            `;
        }
        
        if (app.applications) {
            contentHTML += `
                <ul class="application-list">
                    ${app.applications.map(application => `<li>${application}</li>`).join('')}
                </ul>
            `;
        }
        
        if (app.benefits) {
            contentHTML += `
                <ul class="application-list">
                    ${app.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                </ul>
            `;
        }
        
        if (app.accuracy) {
            contentHTML += `<div class="application-stat">${app.accuracy}</div>`;
        }
        
        if (app.impact) {
            contentHTML += `<div class="application-stat">${app.impact}</div>`;
        }
        
        if (app.adoption) {
            contentHTML += `<div class="application-stat">${app.adoption}</div>`;
        }
        
        appElement.innerHTML = contentHTML;
        container.appendChild(appElement);
    });
}

function initializeForecastChart() {
    const canvas = document.getElementById('forecastChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Simple chart implementation
    function drawChart(gdpRate) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw axes
        ctx.strokeStyle = '#32b8c6';
        ctx.lineWidth = 2;
        
        // X-axis
        ctx.beginPath();
        ctx.moveTo(40, canvas.height - 40);
        ctx.lineTo(canvas.width - 20, canvas.height - 40);
        ctx.stroke();
        
        // Y-axis
        ctx.beginPath();
        ctx.moveTo(40, canvas.height - 40);
        ctx.lineTo(40, 20);
        ctx.stroke();
        
        // Draw data line
        ctx.strokeStyle = '#1FB8CD';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        const points = [];
        for (let i = 0; i < 12; i++) {
            const x = 40 + (i * (canvas.width - 60) / 11);
            const baseY = canvas.height - 40 - (gdpRate * 10);
            const noise = (Math.random() - 0.5) * 20;
            const y = baseY + noise;
            points.push({ x, y });
        }
        
        points.forEach((point, index) => {
            if (index === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        });
        
        ctx.stroke();
        
        // Draw points
        ctx.fillStyle = '#32b8c6';
        points.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
        
        // Labels
        ctx.fillStyle = '#626c71';
        ctx.font = '12px Inter';
        ctx.fillText('GDP Growth Rate: ' + gdpRate + '%', 50, 30);
        ctx.fillText('Months', canvas.width / 2 - 20, canvas.height - 10);
        
        // Y-axis labels
        ctx.save();
        ctx.translate(15, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Growth %', 0, 0);
        ctx.restore();
    }
    
    drawChart(2.5);
    
    // Store reference for updates
    window.chartDrawFunction = drawChart;
}

function updateGDPSimulation(e) {
    const value = parseFloat(e.target.value);
    document.getElementById('gdpValue').textContent = value + '%';
    
    if (window.chartDrawFunction) {
        window.chartDrawFunction(value);
    }
}

function setupBehavioralSimulation() {
    // Initialize with default prediction
    const predictionElement = document.getElementById('aiPrediction');
    if (predictionElement) {
        predictionElement.innerHTML = `
            <strong>AI Prediction:</strong> Based on behavioral patterns, 68% of users typically choose the safe investment option due to loss aversion bias.
        `;
    }
}

function handleBehavioralChoice(e) {
    const choice = e.target.getAttribute('data-choice');
    
    // Update button states
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    e.target.classList.add('selected');
    
    // Update AI prediction
    const predictionElement = document.getElementById('aiPrediction');
    if (predictionElement) {
        let prediction = '';
        
        if (choice === 'safe') {
            prediction = `
                <strong>AI Analysis:</strong> You chose the safe investment. This aligns with loss aversion bias, where people prefer avoiding losses over acquiring gains. The AI model predicted this choice with 68% confidence based on behavioral patterns.
            `;
        } else {
            prediction = `
                <strong>AI Analysis:</strong> You chose the risky investment. This suggests risk-seeking behavior, which is less common (32% of users). The AI model identifies this as potentially influenced by optimism bias and overconfidence.
            `;
        }
        
        predictionElement.innerHTML = prediction;
    }
}

// Footnotes System
function setupFootnotesSystem() {
    const footnotesPanel = document.getElementById('footnotesPanel');
    const footnotesClose = document.getElementById('footnotesClose');
    const footnotePopup = document.getElementById('footnotePopup');
    
    // Footnote triggers
    document.querySelectorAll('.footnote-trigger').forEach(trigger => {
        trigger.addEventListener('click', function() {
            const footnoteId = this.getAttribute('data-footnote');
            showFootnote(footnoteId);
        });
        
        trigger.addEventListener('mouseenter', function(e) {
            const footnoteId = this.getAttribute('data-footnote');
            showFootnotePopup(e, footnoteId);
        });
        
        trigger.addEventListener('mouseleave', function() {
            hideFootnotePopup();
        });
    });
    
    // Close footnotes panel
    if (footnotesClose) {
        footnotesClose.addEventListener('click', function() {
            footnotesPanel.classList.remove('open');
        });
    }
    
    function showFootnote(footnoteId) {
        // Hide all footnote items
        document.querySelectorAll('.footnote-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Show specific footnote
        const footnoteItem = document.getElementById(footnoteId);
        if (footnoteItem) {
            footnoteItem.classList.add('active');
            footnotesPanel.classList.add('open');
        }
    }
    
    function showFootnotePopup(e, footnoteId) {
        const footnoteItem = document.getElementById(footnoteId);
        if (!footnoteItem || !footnotePopup) return;
        
        const content = footnoteItem.querySelector('p').textContent;
        footnotePopup.querySelector('.popup-content').textContent = content;
        
        footnotePopup.style.left = e.pageX + 'px';
        footnotePopup.style.top = (e.pageY - 10) + 'px';
        footnotePopup.classList.add('show');
    }
    
    function hideFootnotePopup() {
        if (footnotePopup) {
            footnotePopup.classList.remove('show');
        }
    }
}

// Enhanced animations and effects
function addEnhancedAnimations() {
    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.highlight-card, .paper-card, .application-card, .method-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Voice navigation (experimental)
function initializeVoiceNavigation() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onresult = function(event) {
            const command = event.results[0][0].transcript.toLowerCase();
            
            if (command.includes('home')) {
                showPage('home');
            } else if (command.includes('papers') || command.includes('research')) {
                showPage('papers');
            } else if (command.includes('ai') || command.includes('economics')) {
                showPage('ai-economics');
            } else if (command.includes('about')) {
                showPage('research');
            }
        };
        
        // Add voice activation button
        const voiceBtn = document.createElement('button');
        voiceBtn.innerHTML = '🎤';
        voiceBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: var(--color-primary);
            color: white;
            border: none;
            font-size: 24px;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        `;
        
        voiceBtn.addEventListener('click', () => {
            recognition.start();
        });
        
        document.body.appendChild(voiceBtn);
    }
}

// Performance optimizations
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Throttle resize events
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Handle resize
            if (currentChart) {
                currentChart.resize();
            }
        }, 250);
    });
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        addEnhancedAnimations();
        initializeVoiceNavigation();
        optimizePerformance();
    }, 1000);
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.altKey) {
        switch(e.key) {
            case '1':
                showPage('home');
                break;
            case '2':
                showPage('papers');
                break;
            case '3':
                showPage('ai-economics');
                break;
            case '4':
                showPage('research');
                break;
            case 't':
                toggleTheme();
                break;
        }
    }
});

// Touch gestures for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Swipe gestures
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
            // Swipe right - previous page
            navigatePages(-1);
        } else {
            // Swipe left - next page
            navigatePages(1);
        }
    }
});

function navigatePages(direction) {
    const pages = ['home', 'papers', 'ai-economics', 'research'];
    const currentIndex = pages.indexOf(currentPage);
    let newIndex = currentIndex + direction;
    
    if (newIndex < 0) newIndex = pages.length - 1;
    if (newIndex >= pages.length) newIndex = 0;
    
    showPage(pages[newIndex]);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    // You could show a user-friendly error message here
});

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Export for global access
window.AIEconomicsApp = {
    showPage,
    toggleTheme,
    currentPage: () => currentPage,
    filteredData: () => filteredData
};