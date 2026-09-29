/**
 * RUNKANA VENKATARAMANA - DIGITAL PORTFOLIO JAVASCRIPT
 * Features:
 * - Dynamic typing effect
 * - Light/Dark theme switch (Default: Light mode)
 * - Interactive Route Comparison Simulator (Road Guard AI)
 * - Category filter for skills
 * - One-click clipboard copy with animated toasts
 * - Interactive contact form with validation
 * - PDF Resume viewer modal
 * - Mobile navigation drawer
 * - Smooth scroll & active navigation spy
 */

document.addEventListener('DOMContentLoaded', () => {
  // Update footer year automatically
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* -------------------------------------------------------------
     1. TYPING EFFECT
     ------------------------------------------------------------- */
  const typingElement = document.getElementById('typing-text');
  const roles = [
    'AI & ML Specialist',
    'Generative AI Enthusiast',
    'Aspiring Software Engineer',
    'B.Tech CSE Student (8.5 CGPA)',
    'Deep Learning Explorer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of text
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Short pause before next role
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  /* -------------------------------------------------------------
     2. THEME TOGGLE (Default: Light)
     ------------------------------------------------------------- */
  const themeToggle = document.getElementById('theme-toggle');
  const htmlTag = document.documentElement;

  // Retrieve saved preference or default to light
  const savedTheme = localStorage.getItem('rv-portfolio-theme') || 'light';
  htmlTag.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlTag.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlTag.setAttribute('data-theme', newTheme);
      localStorage.setItem('rv-portfolio-theme', newTheme);
      showToast(`Switched to ${newTheme === 'light' ? 'Light' : 'Dark'} theme`, 'info');
    });
  }

  /* -------------------------------------------------------------
     3. NAVBAR SCROLL EFFECT & ACTIVE LINK SPY
     ------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Add shadow on scroll
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy
    let currentSection = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  /* -------------------------------------------------------------
     4. MOBILE DRAWER NAVIGATION
     ------------------------------------------------------------- */
  const menuToggle = document.getElementById('menu-toggle');
  const drawerClose = document.getElementById('drawer-close');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle) menuToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  /* -------------------------------------------------------------
     5. SKILLS CATEGORY FILTER
     ------------------------------------------------------------- */
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterCategory = tab.getAttribute('data-category');

      skillCards.forEach(card => {
        const cardCategories = card.getAttribute('data-category') || '';
        if (filterCategory === 'all' || cardCategories.includes(filterCategory)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* -------------------------------------------------------------
     6. ROAD GUARD AI - INTERACTIVE ROUTE SIMULATOR
     ------------------------------------------------------------- */
  const simSafeBtn = document.getElementById('sim-safe-btn');
  const simShortBtn = document.getElementById('sim-short-btn');
  const simScore = document.getElementById('sim-score');
  const simRisk = document.getElementById('sim-risk');
  const simTime = document.getElementById('sim-time');
  const simInfra = document.getElementById('sim-infra');
  const simProgress = document.getElementById('sim-progress');

  if (simSafeBtn && simShortBtn) {
    simSafeBtn.addEventListener('click', () => {
      simSafeBtn.classList.add('active');
      simShortBtn.classList.remove('active');

      // Update to Safe Route state
      simScore.textContent = '96/100';
      simScore.className = 'sim-score-val text-success';
      simRisk.textContent = 'Very Low (0 Detected)';
      simRisk.className = 'text-success';
      simTime.textContent = '18 mins (2.1 mi)';
      simInfra.textContent = 'Optimal & Continuous';

      simProgress.style.width = '96%';
      simProgress.className = 'sim-progress-fill safe-fill';
    });

    simShortBtn.addEventListener('click', () => {
      simShortBtn.classList.add('active');
      simSafeBtn.classList.remove('active');

      // Update to Short Route state (riskier)
      simScore.textContent = '74/100';
      simScore.className = 'sim-score-val text-warning';
      simRisk.textContent = 'Moderate (2 High-Risk Intersections)';
      simRisk.className = 'text-warning';
      simTime.textContent = '16 mins (1.8 mi)';
      simInfra.textContent = 'Dimly lit sections & traffic bottleneck';

      simProgress.style.width = '74%';
      simProgress.className = 'sim-progress-fill risk-fill';
    });
  }

  /* -------------------------------------------------------------
     7. TOAST NOTIFICATION SYSTEM
     ------------------------------------------------------------- */
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, type = 'success') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconClass = 'fa-solid fa-circle-check';
    if (type === 'info') iconClass = 'fa-solid fa-circle-info text-primary';
    if (type === 'danger') iconClass = 'fa-solid fa-circle-exclamation text-danger';

    toast.innerHTML = `
      <i class="${iconClass}"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    // Remove after 3.2 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3200);
  }

  /* -------------------------------------------------------------
     8. CLIPBOARD COPY BUTTONS
     ------------------------------------------------------------- */
  const copyButtons = document.querySelectorAll('.copy-chip');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: "${textToCopy}"`, 'success');
        }).catch(() => {
          // Fallback
          const tempInput = document.createElement('input');
          tempInput.value = textToCopy;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          showToast(`Copied: "${textToCopy}"`, 'success');
        });
      }
    });
  });

  /* -------------------------------------------------------------
     9. PDF RESUME MODAL VIEWER
     ------------------------------------------------------------- */
  const previewPdfBtn = document.getElementById('btn-quick-preview-pdf');
  const pdfModal = document.getElementById('pdf-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  function openPdfModal() {
    if (pdfModal) {
      pdfModal.classList.add('open');
      pdfModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closePdfModal() {
    if (pdfModal) {
      pdfModal.classList.remove('open');
      pdfModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (previewPdfBtn) previewPdfBtn.addEventListener('click', openPdfModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closePdfModal);

  if (pdfModal) {
    pdfModal.addEventListener('click', (e) => {
      if (e.target === pdfModal) {
        closePdfModal();
      }
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pdfModal && pdfModal.classList.contains('open')) {
      closePdfModal();
    }
  });

  /* -------------------------------------------------------------
     10. CONTACT FORM VALIDATION & SUBMISSION
     ------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const messageInput = document.getElementById('form-message');
  const subjectInput = document.getElementById('form-subject');
  const successBanner = document.getElementById('form-success-banner');
  const submitBtn = document.getElementById('form-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate name
      if (!nameInput.value.trim()) {
        nameInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        nameInput.closest('.form-group').classList.remove('has-error');
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        emailInput.closest('.form-group').classList.remove('has-error');
      }

      // Validate message
      if (!messageInput.value.trim()) {
        messageInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        messageInput.closest('.form-group').classList.remove('has-error');
      }

      if (isValid) {
        // Show submission loading
        submitBtn.disabled = true;
        const originalBtnHtml = submitBtn.innerHTML;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>`;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;

          // Display success feedback
          if (successBanner) {
            successBanner.classList.add('active');
          }

          showToast('Message sent! Opening email draft...', 'success');

          // Trigger mailto link for direct communication
          const subject = encodeURIComponent(subjectInput.value.trim() || 'Portfolio Contact Inquiry');
          const body = encodeURIComponent(`Name: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}`);
          
          window.location.href = `mailto:venkataramanarunkana991@gmail.com?subject=${subject}&body=${body}`;

          contactForm.reset();
        }, 800);
      } else {
        showToast('Please fill in the required fields correctly.', 'danger');
      }
    });

    // Real-time input clearing
    [nameInput, emailInput, messageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          input.closest('.form-group').classList.remove('has-error');
        });
      }
    });
  }

  /* -------------------------------------------------------------
     11. BACK TO TOP BUTTON
     ------------------------------------------------------------- */
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
