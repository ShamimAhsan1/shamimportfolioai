/**
 * SHAMIM AHSAN | AI SOLUTIONS ARCHITECT PORTFOLIO
 * Interactive Motion Engine, Canvas Neural Field & Contract Generator
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Neural Network Particle Canvas
  initNeuralCanvas();

  // 2. Initialize Typewriter Text Effect
  initTypewriter();

  // 3. Initialize Sticky Nav & Scroll Spy
  initNavigation();

  // 4. Initialize Animated Number Counters
  initNumberCounters();

  // 5. Initialize AI Services Filtering & Detail Modals
  initServicesSection();

  // 6. Initialize Pricing Toggle & Matrix Accordion
  initPricingSection();

  // 7. Initialize Real-Time Fillable Contract System
  initContractSystem();
});

/* ==========================================================================
   1. NEURAL NETWORK CANVAS ANIMATION
   ========================================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById('neuralCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
  const maxDistance = 140;

  const mouse = {
    x: null,
    y: null,
    radius: 160
  };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.5 ? '#00f5d4' : '#9d4edd';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse repulsion/interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2.5;
          this.y -= (dy / dist) * force * 2.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Connect particles with neural synapse lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const alpha = 1 - distance / maxDistance;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 245, 212, ${alpha * 0.18})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Connect particles to mouse
    if (mouse.x !== null && mouse.y !== null) {
      for (let i = 0; i < particles.length; i++) {
        const dx = mouse.x - particles[i].x;
        const dy = mouse.y - particles[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.4;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(particles[i].x, particles[i].y);
          ctx.strokeStyle = `rgba(157, 78, 221, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const element = document.getElementById('typewriter');
  if (!element) return;

  const words = [
    'AI Video Generation (4K & Avatars)',
    'AI Photo Synthesis & Custom LoRA',
    'AI Article Writing & SEO Engine',
    'AI Software & Multi-Agent RAG',
    'AI Web Systems (Next.js & React)'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 75;
  const deleteSpeed = 35;
  const pauseTime = 1800;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      element.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, pauseTime);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 350);
    } else {
      setTimeout(type, isDeleting ? deleteSpeed : typingSpeed);
    }
  }

  type();
}

/* ==========================================================================
   3. NAVIGATION & SCROLL SPY
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  // Sticky header background
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy
    let currentSection = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile drawer controls
  if (mobileToggle && mobileDrawer && drawerClose) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    const closeDrawer = () => {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    };

    drawerClose.addEventListener('click', closeDrawer);

    drawerLinks.forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });

    document.addEventListener('click', (e) => {
      if (
        mobileDrawer.classList.contains('open') &&
        !mobileDrawer.contains(e.target) &&
        !mobileToggle.contains(e.target)
      ) {
        closeDrawer();
      }
    });
  }
}

/* ==========================================================================
   4. NUMBER COUNTERS ANIMATION
   ========================================================================== */
function initNumberCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          statNumbers.forEach((counter) => {
            const target = +counter.getAttribute('data-target');
            const duration = 1600;
            const stepTime = 25;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
              } else {
                counter.textContent = Math.floor(current);
              }
            }, stepTime);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  const heroStats = document.querySelector('.hero-stats-grid');
  if (heroStats) observer.observe(heroStats);
}

/* ==========================================================================
   5. AI SERVICES SECTION (FILTERING & MODALS)
   ========================================================================== */
function initServicesSection() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  // Filter functionality
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Service Details Data dictionary
  const serviceSpecs = {
    video: {
      title: 'AI Video Generation',
      icon: 'fa-video',
      tag: 'Neural Video Production',
      body: `
        <p>Harness the bleeding edge of AI generative cinematography. We produce commercial-ready 4K video content without physical film sets or camera crews.</p>
        <h4>Technical Toolchains & Frameworks</h4>
        <ul class="modal-spec-list">
          <li><i class="fa-solid fa-check"></i> Sora, Runway Gen-3 Alpha, Kling 1.5, Luma Dream Machine</li>
          <li><i class="fa-solid fa-check"></i> HeyGen & ElevenLabs photorealistic digital human avatars</li>
          <li><i class="fa-solid fa-check"></i> Topaz Video AI 4K/60fps frame interpolation and neural upscaling</li>
          <li><i class="fa-solid fa-check"></i> Premiere Pro & DaVinci Resolve color grading & sound synthesis</li>
        </ul>
        <h4>Guaranteed 30-Day Sprint Deliverables</h4>
        <ul class="modal-spec-list">
          <li><i class="fa-solid fa-circle-check"></i> Complete storyboard creation & prompt engineering documentation</li>
          <li><i class="fa-solid fa-circle-check"></i> Full master files in ProRes 422 and WebM formats</li>
          <li><i class="fa-solid fa-circle-check"></i> Complete commercial broadcast usage rights</li>
        </ul>
      `
    },
    photo: {
      title: 'AI Photo Generation',
      icon: 'fa-camera-retro',
      tag: 'Generative Visual Synthesis',
      body: `
        <p>From hyper-realistic commercial models to bespoke fantasy concept art. We develop custom visual pipelines and fine-tuned LoRA models to guarantee pixel perfection.</p>
        <h4>Technical Toolchains & Frameworks</h4>
        <ul class="modal-spec-list">
          <li><i class="fa-solid fa-check"></i> Midjourney v6.1, Flux.1 Schnell & Dev, Stable Diffusion 3.5</li>
          <li><i class="fa-solid fa-check"></i> ComfyUI custom node graphs & ControlNet pose/depth steering</li>
          <li><i class="fa-solid fa-check"></i> Custom Kohya_ss LoRA character and product training</li>
          <li><i class="fa-solid fa-check"></i> 8K High-resolution magnification with lossless detail retention</li>
        </ul>
        <h4>Guaranteed 30-Day Sprint Deliverables</h4>
        <ul class="modal-spec-list">
          <li><i class="fa-solid fa-circle-check"></i> Curated gallery of high-res master assets</li>
          <li><i class="fa-solid fa-circle-check"></i> Reusable Prompt & Seed ledger for identical future generation</li>
          <li><i class="fa-solid fa-circle-check"></i> Full IP assignment and commercial copyright clearance</li>
        </ul>
      `
    },
    writing: {
      title: 'AI Article Writing & Neural Copy',
      icon: 'fa-pen-nib',
      tag: 'Strategic Content Engines',
      body: `
        <p>Data-grounded, SEO-optimized thought leadership content engineered to rank #1 on search engines and convert readers into loyal clients.</p>
        <h4>Technical Toolchains & Frameworks</h4>
        <ul class="modal-spec-list">
          <li><i class="fa-solid fa-check"></i> Custom Claude 3.5 Sonnet & OpenAI GPT-4o calibrated system prompts</li>
          <li><i class="fa-solid fa-check"></i> Perplexity & Semantic Scholar deep academic source verification</li>
          <li><i class="fa-solid fa-check"></i> SurferSEO & Clearscope semantic keyword integration</li>
          <li><i class="fa-solid fa-check"></i> AI detector bypass with 100% humanized cadence & voice matching</li>
        </ul>
        <h4>Guaranteed 30-Day Sprint Deliverables</h4>
        <ul class="modal-spec-list">
          <li><i class="fa-solid fa-circle-check"></i> Complete content calendars & target keyword research</li>
          <li><i class="fa-solid fa-circle-check"></i> Formatted Markdown / CMS-ready drafts with royalty-free visuals</li>
          <li><i class="fa-solid fa-circle-check"></i> Turnaround within 48 hours for rapid review</li>
        </ul>
      `
    },
    software: {
      title: 'AI Software Development',
      icon: 'fa-code',
      tag: 'Intelligent Systems Engineering',
      body: `
        <p>Architect robust, autonomous AI pipelines, private enterprise RAG document search engines, and multi-agent coordination frameworks.</p>
        <h4>Technical Toolchains & Frameworks</h4>
        <ul class="modal-spec-list">
          <li><i class="fa-solid fa-check"></i> Python 3.12, FastAPI, LangChain, LangGraph, LlamaIndex</li>
          <li><i class="fa-solid fa-check"></i> Vector Databases: Pinecone, Qdrant, ChromaDB, pgvector</li>
          <li><i class="fa-solid fa-check"></i> Multi-agent orchestration with autonomous tooling</li>
          <li><i class="fa-solid fa-check"></i> Dockerized container deployment with cloud GPU scaling</li>
        </ul>
        <h4>Guaranteed 30-Day Sprint Deliverables</h4>
        <ul class="modal-spec-list">
          <li><i class="fa-solid fa-circle-check"></i> Production-tested GitHub repository with CI/CD actions</li>
          <li><i class="fa-solid fa-circle-check"></i> Interactive API documentation (Swagger/OpenAPI)</li>
          <li><i class="fa-solid fa-circle-check"></i> 30 days of post-deployment active monitoring & support</li>
        </ul>
      `
    },
    web: {
      title: 'AI Website Development',
      icon: 'fa-globe',
      tag: 'Full-Stack Modern Web',
      body: `
        <p>High-conversion responsive web applications engineered with Next.js, React, and embedded artificial intelligence tools.</p>
        <h4>Technical Toolchains & Frameworks</h4>
        <ul class="modal-spec-list">
          <li><i class="fa-solid fa-check"></i> Next.js 14/15 App Router, React 19, TypeScript, Tailwind CSS</li>
          <li><i class="fa-solid fa-check"></i> Vercel AI SDK real-time streaming UI integration</li>
          <li><i class="fa-solid fa-check"></i> Framer Motion & CSS hardware-accelerated animations</li>
          <li><i class="fa-solid fa-check"></i> 99+ Google Lighthouse performance, accessibility & SEO scores</li>
        </ul>
        <h4>Guaranteed 30-Day Sprint Deliverables</h4>
        <ul class="modal-spec-list">
          <li><i class="fa-solid fa-circle-check"></i> Full responsive source code deployed to Vercel/Netlify</li>
          <li><i class="fa-solid fa-circle-check"></i> Custom interactive UI widgets & embedded AI assistant</li>
          <li><i class="fa-solid fa-circle-check"></i> CMS handover documentation & admin access</li>
        </ul>
      `
    }
  };

  // Modal elements
  const modal = document.getElementById('serviceModal');
  const modalTitle = document.getElementById('modalServiceTitle');
  const modalTag = document.getElementById('modalServiceTag');
  const modalIcon = document.getElementById('modalServiceIcon');
  const modalBody = document.getElementById('modalServiceBody');
  const closeBtn = document.getElementById('closeServiceModal');
  const cancelBtn = document.getElementById('modalCancelBtn');
  const selectContractBtn = document.getElementById('modalSelectContractBtn');

  let activeServiceName = 'AI Video Generation';

  // Open modal buttons
  document.querySelectorAll('.open-modal-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const serviceKey = btn.getAttribute('data-service');
      const data = serviceSpecs[serviceKey];
      if (!data) return;

      activeServiceName = data.title;
      modalTitle.textContent = data.title;
      modalTag.textContent = data.tag;
      modalIcon.innerHTML = `<i class="fa-solid ${data.icon}"></i>`;
      modalBody.innerHTML = data.body;

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Add from modal to contract
  if (selectContractBtn) {
    selectContractBtn.addEventListener('click', () => {
      closeModal();
      selectServiceInContract(activeServiceName);
    });
  }

  // Quick "Add to Contract" buttons on cards
  document.querySelectorAll('.select-service-contract').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sName = btn.getAttribute('data-service');
      selectServiceInContract(sName);
    });
  });
}

function selectServiceInContract(serviceName) {
  // Check the checkbox in contract form
  const checkboxes = document.querySelectorAll('input[name="desiredServices"]');
  checkboxes.forEach((cb) => {
    if (cb.value === serviceName) {
      cb.checked = true;
    }
  });

  // Scroll to contract section
  const contractSec = document.getElementById('contract');
  if (contractSec) {
    contractSec.scrollIntoView({ behavior: 'smooth' });
  }

  // Trigger preview update
  updateLiveContractDoc();

  // Show Toast
  showToast(`Added "${serviceName}" to contract draft!`);
}

/* ==========================================================================
   6. PRICING SECTION (TOGGLE & COMPARISON MATRIX)
   ========================================================================== */
function initPricingSection() {
  const billingToggle = document.getElementById('billingCycleToggle');
  const priceVals = document.querySelectorAll('.price-val');
  const toggleCmpBtn = document.getElementById('toggleComparisonBtn');
  const cmpWrapper = document.getElementById('comparisonWrapper');
  const cmpText = document.getElementById('cmpText');
  const cmpIcon = document.getElementById('cmpIcon');

  // Toggle Comparison Accordion
  if (toggleCmpBtn && cmpWrapper) {
    toggleCmpBtn.addEventListener('click', () => {
      const isHidden = cmpWrapper.style.display === 'none';
      if (isHidden) {
        cmpWrapper.style.display = 'block';
        cmpText.textContent = 'Hide Matrix';
        cmpIcon.className = 'fa-solid fa-chevron-up';
      } else {
        cmpWrapper.style.display = 'none';
        cmpText.textContent = 'Show Full Matrix';
        cmpIcon.className = 'fa-solid fa-chevron-down';
      }
    });
  }

  // Billing cycle switcher
  if (billingToggle) {
    billingToggle.addEventListener('change', () => {
      const isSprint = billingToggle.checked;
      priceVals.forEach((val) => {
        const base = parseInt(val.getAttribute('data-base'), 10);
        // Base is $300, $550, $50
        val.textContent = base;
      });

      const periodLabels = document.querySelectorAll('.pkg-price-box .period');
      periodLabels.forEach((label) => {
        label.textContent = isSprint ? '/ 30-Day Sprint' : '/ 30 Days';
      });

      showToast(
        isSprint
          ? 'Switched to Fixed 30-Day Sprint SOW'
          : 'Switched to Monthly Dedicated Service'
      );
    });
  }

  // Package select buttons
  document.querySelectorAll('.select-package-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const pkgName = btn.getAttribute('data-package');
      const pkgPrice = btn.getAttribute('data-price');

      // Check corresponding radio
      const radio = document.querySelector(
        `input[name="selectedPackage"][value="${pkgName}"]`
      );
      if (radio) {
        radio.checked = true;
      }

      // Scroll to contract
      const contractSec = document.getElementById('contract');
      if (contractSec) {
        contractSec.scrollIntoView({ behavior: 'smooth' });
      }

      updateLiveContractDoc();
      showToast(`Selected ${pkgName} ($${pkgPrice} USD) for contract!`);
    });
  });
}

/* ==========================================================================
   7. FILLABLE CONTRACT SYSTEM & LIVE SOW GENERATOR
   ========================================================================== */
function initContractSystem() {
  const form = document.getElementById('contractForm');
  const clientNameInput = document.getElementById('clientName');
  const clientEmailInput = document.getElementById('clientEmail');
  const clientCompanyInput = document.getElementById('clientCompany');
  const projectBriefInput = document.getElementById('projectBrief');
  const digitalSigInput = document.getElementById('digitalSignature');
  const packageRadios = document.querySelectorAll('input[name="selectedPackage"]');
  const serviceCheckboxes = document.querySelectorAll('input[name="desiredServices"]');
  const printDraftBtn = document.getElementById('btnPrintDraft');

  // Attach live event listeners to input fields
  const inputs = [
    clientNameInput,
    clientEmailInput,
    clientCompanyInput,
    projectBriefInput,
    digitalSigInput
  ];

  inputs.forEach((input) => {
    if (input) {
      input.addEventListener('input', updateLiveContractDoc);
    }
  });

  packageRadios.forEach((radio) => {
    radio.addEventListener('change', updateLiveContractDoc);
  });

  serviceCheckboxes.forEach((cb) => {
    cb.addEventListener('change', updateLiveContractDoc);
  });

  // Print draft preview
  if (printDraftBtn) {
    printDraftBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Form submission handler
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateContractForm()) {
        executeContractSuccess();
      }
    });
  }

  // Date setup
  const startDateInput = document.getElementById('startDate');
  if (startDateInput) {
    const today = new Date().toISOString().split('T')[0];
    startDateInput.value = today;
  }

  // Initial update
  updateLiveContractDoc();

  // Success Modal buttons
  const successModal = document.getElementById('successModal');
  const closeSuccessBtn = document.getElementById('btnCloseSuccessModal');
  const printFinalBtn = document.getElementById('btnPrintFinalDoc');

  if (closeSuccessBtn && successModal) {
    closeSuccessBtn.addEventListener('click', () => {
      successModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (printFinalBtn) {
    printFinalBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

function updateLiveContractDoc() {
  const nameVal = document.getElementById('clientName')?.value.trim();
  const emailVal = document.getElementById('clientEmail')?.value.trim();
  const companyVal = document.getElementById('clientCompany')?.value.trim();
  const briefVal = document.getElementById('projectBrief')?.value.trim();
  const sigVal = document.getElementById('digitalSignature')?.value.trim();

  // Preview elements
  const prevClientName = document.getElementById('prevClientName');
  const prevClientEmail = document.getElementById('prevClientEmail');
  const prevClientCompany = document.getElementById('prevClientCompany');
  const prevScopeText = document.getElementById('prevScopeText');
  const prevSigVal = document.getElementById('prevSigVal');
  const prevPkgName = document.getElementById('prevPkgName');
  const prevPkgCost = document.getElementById('prevPkgCost');
  const prevServicesList = document.getElementById('prevServicesList');
  const prevSigDate = document.getElementById('prevSigDate');

  if (prevClientName) prevClientName.textContent = nameVal || '[Client Name]';
  if (prevClientEmail) prevClientEmail.textContent = emailVal || '[Client Email]';
  if (prevClientCompany)
    prevClientCompany.textContent = companyVal || 'Independent / Startup';
  if (prevScopeText)
    prevScopeText.textContent =
      briefVal ||
      'Awaiting project brief input. Deliverables will adhere strictly to the 30-day timeline with milestone reviews.';
  if (prevSigVal) prevSigVal.textContent = sigVal || '[Unsigned]';

  // Date
  if (prevSigDate) {
    const now = new Date();
    prevSigDate.textContent = `Date: ${now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })}`;
  }

  // Selected Package
  const selectedRadio = document.querySelector('input[name="selectedPackage"]:checked');
  if (selectedRadio) {
    const pkg = selectedRadio.value;
    const cost = selectedRadio.getAttribute('data-cost');
    if (prevPkgName) prevPkgName.textContent = pkg;
    if (prevPkgCost) prevPkgCost.textContent = `$${cost} USD`;
  }

  // Selected Services
  const checkedBoxes = document.querySelectorAll(
    'input[name="desiredServices"]:checked'
  );
  if (prevServicesList) {
    prevServicesList.innerHTML = '';
    if (checkedBoxes.length === 0) {
      prevServicesList.innerHTML = `<li class="text-muted"><i class="fa-solid fa-circle-exclamation text-yellow"></i> No services selected yet</li>`;
    } else {
      checkedBoxes.forEach((cb) => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fa-solid fa-check text-cyan"></i> ${cb.value}`;
        prevServicesList.appendChild(li);
      });
    }
  }
}

function validateContractForm() {
  let isValid = true;

  const name = document.getElementById('clientName');
  const email = document.getElementById('clientEmail');
  const brief = document.getElementById('projectBrief');
  const sig = document.getElementById('digitalSignature');
  const terms = document.getElementById('agreeTerms');
  const services = document.querySelectorAll('input[name="desiredServices"]:checked');

  // Reset errors
  document.querySelectorAll('.field-error').forEach((el) => (el.style.display = 'none'));
  document.querySelectorAll('.form-group').forEach((g) => g.classList.remove('has-error'));

  if (!name.value.trim()) {
    showFieldError('errName', name);
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
    showFieldError('errEmail', email);
    isValid = false;
  }

  if (services.length === 0) {
    const errServ = document.getElementById('errServices');
    if (errServ) errServ.style.display = 'block';
    isValid = false;
  }

  if (!brief.value.trim() || brief.value.trim().length < 10) {
    showFieldError('errBrief', brief);
    isValid = false;
  }

  if (!sig.value.trim()) {
    showFieldError('errSignature', sig);
    isValid = false;
  }

  if (!terms.checked) {
    const errTerms = document.getElementById('errTerms');
    if (errTerms) errTerms.style.display = 'block';
    isValid = false;
  }

  return isValid;
}

function showFieldError(errorId, inputElement) {
  const errEl = document.getElementById(errorId);
  if (errEl) errEl.style.display = 'block';
  if (inputElement && inputElement.parentElement) {
    inputElement.parentElement.classList.add('has-error');
  }
}

function executeContractSuccess() {
  const successModal = document.getElementById('successModal');
  const summaryBox = document.getElementById('successSummaryBox');

  const nameVal = document.getElementById('clientName').value.trim();
  const emailVal = document.getElementById('clientEmail').value.trim();
  const selectedRadio = document.querySelector('input[name="selectedPackage"]:checked');
  const pkgName = selectedRadio ? selectedRadio.value : 'Standard Package';
  const pkgCost = selectedRadio ? selectedRadio.getAttribute('data-cost') : '300';
  const checkedBoxes = Array.from(
    document.querySelectorAll('input[name="desiredServices"]:checked')
  ).map((cb) => cb.value);

  const refCode = `SA-2026-OCT-${Math.floor(1000 + Math.random() * 9000)}`;

  if (summaryBox) {
    summaryBox.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:8px;">
        <span style="color:#94a3b8;">Contract ID:</span>
        <strong style="color:#00f5d4; font-family:'JetBrains Mono',monospace;">${refCode}</strong>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span style="color:#94a3b8;">Primary Signer:</span>
        <strong style="color:#ffffff;">${nameVal} (${emailVal})</strong>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span style="color:#94a3b8;">Provider:</span>
        <strong style="color:#00f5d4;">Shamim Ahsan (AI Solutions Architect)</strong>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span style="color:#94a3b8;">Service Package:</span>
        <strong style="color:#facc15;">${pkgName} ($${pkgCost} USD)</strong>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span style="color:#94a3b8;">Duration Guarantee:</span>
        <strong style="color:#10b981;">30 Days Dedicated SOW</strong>
      </div>
      <div style="margin-top:12px; padding-top:8px; border-top:1px solid rgba(255,255,255,0.08);">
        <span style="color:#94a3b8; font-size:0.8rem; display:block; margin-bottom:4px;">Covered Services (${checkedBoxes.length}):</span>
        <div style="color:#ffffff; font-size:0.85rem;">
          ${checkedBoxes.join(' • ')}
        </div>
      </div>
    `;
  }

  if (successModal) {
    successModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  showToast('Contract executed successfully!');
}

/* ==========================================================================
   TOAST HELPER
   ========================================================================== */
function showToast(message) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toastMessage');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
