// Enhanced 4D Global State
let currentPage = 'home';
let isDarkMode = false;
let animationObserver;
let particleSystem;
let temporalEffects = {};
let mouse = { x: 0, y: 0 };

// 4D Initialization
document.addEventListener('DOMContentLoaded', function() {
  initializeTheme();
  initializeNavigation();
  initializeAnimations();
  initialize4DEffects();
  initializeParticleSystem();
  initializeTemporalInteractions();
  initializeCharts();
  initializeForms();
  initializeFootnotes();
  showPage('home');
});

// 4D Effects Initialization
function initialize4DEffects() {
  initializeMouseTracking();
  initializeScrollParallax();
  initializeMorphingText();
  initializeDepthInteractions();
  initializeTemporalNavigation();
}

// Mouse Tracking for 4D Effects
function initializeMouseTracking() {
  document.addEventListener('mousemove', function(e) {
    mouse.x = (e.clientX / window.innerWidth) * 100;
    mouse.y = (e.clientY / window.innerHeight) * 100;
    
    // Update CSS custom properties for reactive effects
    document.documentElement.style.setProperty('--mouse-x', `${mouse.x}%`);
    document.documentElement.style.setProperty('--mouse-y', `${mouse.y}%`);
    
    // Update parallax layers
    updateParallaxLayers(mouse.x, mouse.y);
  });
}

// Scroll Parallax System
function initializeScrollParallax() {
  const parallaxLayers = document.querySelectorAll('.parallax-layer');
  
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    parallaxLayers.forEach((layer, index) => {
      const speed = layer.dataset.speed || 0.5;
      const yPos = scrolled * speed;
      layer.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// Morphing Text System
function initializeMorphingText() {
  const morphingElements = document.querySelectorAll('.word-morph');
  
  morphingElements.forEach(element => {
    const words = element.dataset.words.split(',');
    let currentWordIndex = 0;
    
    setInterval(() => {
      currentWordIndex = (currentWordIndex + 1) % words.length;
      element.textContent = words[currentWordIndex];
    }, 3000);
  });
}

// Depth Interactions
function initializeDepthInteractions() {
  const depthElements = document.querySelectorAll('[data-tilt]');
  
  depthElements.forEach(element => {
    element.addEventListener('mousemove', function(e) {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / centerY * 10;
      const rotateY = (centerX - x) / centerX * 10;
      
      element.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        translateZ(20px)
      `;
    });
    
    element.addEventListener('mouseleave', function() {
      element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
}

// Temporal Navigation
function initializeTemporalNavigation() {
  const navLinks = document.querySelectorAll('.nav-depth');
  
  navLinks.forEach(link => {
    const depth = parseInt(link.dataset.depth) || 0;
    
    link.addEventListener('mouseenter', function() {
      this.style.transform = `translateZ(${depth * 5 + 10}px) rotateX(5deg)`;
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateZ(0) rotateX(0)';
    });
  });
}

// Particle System
function initializeParticleSystem() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const particles = [];
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 2 + 1;
      this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(33, 128, 141, ${this.opacity})`;
      ctx.fill();
    }
  }
  
  // Create particles
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Resize handler
  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Temporal Interactions
function initializeTemporalInteractions() {
  // Time-based color transitions
  setInterval(() => {
    const time = Date.now() * 0.001;
    const hue = (Math.sin(time * 0.1) * 30 + 180) % 360;
    
    document.documentElement.style.setProperty(
      '--color-temporal', 
      `hsl(${hue}, 70%, 50%)`
    );
  }, 100);
  
  // Breathing animation for status indicators
  const statusElements = document.querySelectorAll('.status-pulsing');
  statusElements.forEach(element => {
    let phase = 0;
    setInterval(() => {
      phase += 0.1;
      const scale = 1 + Math.sin(phase) * 0.05;
      const opacity = 0.8 + Math.sin(phase) * 0.2;
      element.style.transform = `scale(${scale})`;
      element.style.opacity = opacity;
    }, 50);
  });
}

// Enhanced AI Tools with 4D Features
function initializeAITools() {
  // 4D Economic Forecasting
  const forecast4DBtn = document.getElementById('run-forecast');
  if (forecast4DBtn && !forecast4DBtn.hasAttribute('data-initialized')) {
    forecast4DBtn.setAttribute('data-initialized', 'true');
    forecast4DBtn.addEventListener('click', function() {
      const indicator = document.getElementById('indicator-select').value;
      const period = document.getElementById('forecast-period').value;
      const resultDiv = document.querySelector('.forecast-result');
      
      // Add 4D loading animation
      this.classList.add('btn-loading');
      this.innerHTML = `
        <span class="btn-text">Generating 4D Forecast...</span>
        <div class="loading-particles"></div>
      `;
      
      setTimeout(() => {
        resultDiv.style.display = 'block';
        resultDiv.classList.add('result-appearing');
        
        // Generate 4D forecast visualization
        const canvas = document.getElementById('forecast-4d-chart');
        if (canvas) {
          generate4DForecastChart(canvas, indicator, period);
        }
        
        // Update floating metrics
        updateFloatingMetrics(resultDiv, {
          confidence: (Math.random() * 20 + 75).toFixed(1),
          accuracy: (Math.random() * 15 + 80).toFixed(1),
          volatility: (Math.random() * 10 + 5).toFixed(1)
        });
        
        // Reset button
        this.classList.remove('btn-loading');
        this.innerHTML = `
          <span class="btn-text">Generate 4D Forecast</span>
          <div class="btn-particles"></div>
        `;
      }, 2000);
    });
  }
  
  // 4D Policy Simulator
  const simulateBtn = document.getElementById('simulate-policy');
  if (simulateBtn && !simulateBtn.hasAttribute('data-initialized')) {
    simulateBtn.setAttribute('data-initialized', 'true');
    simulateBtn.addEventListener('click', function() {
      const policyType = document.getElementById('policy-type').value;
      const magnitude = document.getElementById('impact-magnitude').value;
      const resultsDiv = document.querySelector('.simulation-results');
      
      this.classList.add('btn-loading');
      this.innerHTML = `
        <span class="btn-text">Running 4D Simulation...</span>
        <div class="loading-particles"></div>
      `;
      
      setTimeout(() => {
        generate4DPolicyResults(resultsDiv, policyType, magnitude);
        
        this.classList.remove('btn-loading');
        this.innerHTML = `
          <span class="btn-text">Run 4D Simulation</span>
          <div class="btn-particles"></div>
        `;
      }, 2500);
    });
  }
}

// Generate 4D Forecast Chart
function generate4DForecastChart(canvas, indicator, period) {
  const ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 200;
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Generate multi-dimensional data
  const data = [];
  const confidence = [];
  const volatility = [];
  
  for (let i = 0; i < period; i++) {
    const base = 100 + Math.sin(i * 0.3) * 20;
    const noise = (Math.random() - 0.5) * 10;
    data.push(base + noise);
    confidence.push(85 + Math.random() * 10);
    volatility.push(5 + Math.random() * 5);
  }
  
  // Draw temporal layers
  ctx.strokeStyle = 'rgba(33, 128, 141, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  
  data.forEach((value, index) => {
    const x = (index / (period - 1)) * canvas.width;
    const y = canvas.height - (value / 150) * canvas.height;
    
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  
  ctx.stroke();
  
  // Add confidence bands
  ctx.fillStyle = 'rgba(33, 128, 141, 0.1)';
  ctx.beginPath();
  
  data.forEach((value, index) => {
    const x = (index / (period - 1)) * canvas.width;
    const y1 = canvas.height - ((value + volatility[index]) / 150) * canvas.height;
    const y2 = canvas.height - ((value - volatility[index]) / 150) * canvas.height;
    
    if (index === 0) {
      ctx.moveTo(x, y1);
    } else {
      ctx.lineTo(x, y1);
    }
  });
  
  for (let i = data.length - 1; i >= 0; i--) {
    const x = (i / (period - 1)) * canvas.width;
    const y = canvas.height - ((data[i] - volatility[i]) / 150) * canvas.height;
    ctx.lineTo(x, y);
  }
  
  ctx.closePath();
  ctx.fill();
}

// Update Floating Metrics
function updateFloatingMetrics(container, metrics) {
  const metricCube = container.querySelector('.metric-cube');
  if (metricCube) {
    const faces = metricCube.querySelectorAll('.metric-face span');
    faces[0].textContent = `${metrics.confidence}%`;
    faces[1].textContent = `${metrics.accuracy}%`;
    faces[2].textContent = `${metrics.volatility}%`;
    
    // Add pulsing animation
    metricCube.style.animation = 'cube-pulse 1s ease-in-out';
    setTimeout(() => {
      metricCube.style.animation = '';
    }, 1000);
  }
}

// Generate 4D Policy Results
function generate4DPolicyResults(container, policyType, magnitude) {
  const shortTermChart = container.querySelector('.result-card:first-child .impact-chart');
  const longTermChart = container.querySelector('.result-card:last-child .impact-chart');
  
  if (shortTermChart && longTermChart) {
    generateMiniChart(shortTermChart, 'short-term', magnitude);
    generateMiniChart(longTermChart, 'long-term', magnitude);
  }
  
  // Add temporal animation
  container.classList.add('results-materializing');
  setTimeout(() => {
    container.classList.remove('results-materializing');
  }, 1000);
}

// Generate Mini Charts
function generateMiniChart(container, type, magnitude) {
  const canvas = document.createElement('canvas');
  canvas.width = 150;
  canvas.height = 80;
  container.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  const data = [];
  
  // Generate data based on type and magnitude
  const periods = type === 'short-term' ? 6 : 24;
  const baseEffect = parseFloat(magnitude);
  
  for (let i = 0; i < periods; i++) {
    let effect = baseEffect;
    if (type === 'short-term') {
      effect *= Math.exp(-i * 0.2); // Decay for short-term
    } else {
      effect *= (1 - Math.exp(-i * 0.1)); // Growth for long-term
    }
    effect += (Math.random() - 0.5) * 0.5; // Add noise
    data.push(effect);
  }
  
  // Draw chart
  ctx.strokeStyle = type === 'short-term' ? '#e74c3c' : '#2ecc71';
  ctx.lineWidth = 2;
  ctx.beginPath();
  
  data.forEach((value, index) => {
    const x = (index / (periods - 1)) * canvas.width;
    const y = canvas.height / 2 - (value / Math.max(...data.map(Math.abs))) * (canvas.height / 3);
    
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  
  ctx.stroke();
  
  // Draw zero line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();
}

// Enhanced Page Transitions with 4D Effects
function showPage(pageId) {
  // Hide all pages with 4D transition
  pages.forEach(page => {
    page.classList.add('page-exiting');
    setTimeout(() => {
      page.classList.remove('active', 'page-exiting');
    }, 300);
  });
  
  // Show selected page with 4D entrance
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    setTimeout(() => {
      targetPage.classList.add('active', 'page-entering');
      currentPage = pageId;
      
      // Initialize page-specific 4D effects
      if (pageId === 'ai-implementation') {
        initializeAITools();
        initializeNeuralNetworkBackground();
      }
      
      setTimeout(() => {
        targetPage.classList.remove('page-entering');
      }, 600);
    }, 300);
  }
  
  // Update navigation with depth effects
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-page') === pageId) {
      link.classList.add('active');
    }
  });
  
  // Smooth scroll to top with easing
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Neural Network Background for AI Page
function initializeNeuralNetworkBackground() {
  const canvas = document.getElementById('neural-network-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const nodes = [];
  const connections = [];
  
  // Create neural network nodes
  for (let i = 0; i < 50; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      activity: Math.random()
    });
  }
  
  // Create connections
  nodes.forEach((node, i) => {
    nodes.forEach((otherNode, j) => {
      if (i !== j && Math.random() < 0.1) {
        connections.push({ from: i, to: j, strength: Math.random() });
      }
    });
  });
  
  function animateNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update nodes
    nodes.forEach(node => {
      node.x += node.vx;
      node.y += node.vy;
      node.activity = (node.activity + Math.random() * 0.1) % 1;
      
      // Bounce off edges
      if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
    });
    
    // Draw connections
    connections.forEach(conn => {
      const fromNode = nodes[conn.from];
      const toNode = nodes[conn.to];
      
      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      ctx.strokeStyle = `rgba(33, 128, 141, ${conn.strength * 0.3})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    });
    
    // Draw nodes
    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 3 + node.activity * 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(33, 128, 141, ${0.5 + node.activity * 0.5})`;
      ctx.fill();
    });
    
    requestAnimationFrame(animateNetwork);
  }
  
  animateNetwork();
}

// Export functions for global access
window.showPage = showPage;
window.toggleTheme = toggleTheme;
window.initializeAITools = initializeAITools;
