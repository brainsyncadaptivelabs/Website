import { NeuralParticles } from './particles.js';
import { initSimulator } from './simulator.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Neural Particles Canvas Background
  new NeuralParticles('particles-canvas');

  // 2. Initialize Cognitive Workload Simulator
  initSimulator();

  // 3. Header Scrolled Effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 4. Reveal on Scroll Animation
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // Reveal once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 5. Expandable Product Cards
  const learnMoreBtns = document.querySelectorAll('.product-learn-more');
  learnMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      if (!card) return;

      const isExpanded = card.classList.contains('expanded');
      
      // Close any other expanded cards first
      document.querySelectorAll('.product-card.expanded').forEach(c => {
        if (c !== card) {
          c.classList.remove('expanded');
          const otherBtn = c.querySelector('.product-learn-more');
          if (otherBtn) otherBtn.innerHTML = 'Show Technical Specs <span>+</span>';
        }
      });

      if (isExpanded) {
        card.classList.remove('expanded');
        btn.innerHTML = 'Show Technical Specs <span>+</span>';
      } else {
        card.classList.add('expanded');
        btn.innerHTML = 'Hide Technical Specs <span>−</span>';
      }
    });
  });

  // 6. Contact Form & Terminal Log simulation
  const contactForm = document.getElementById('contact-form');
  const terminalBody = document.getElementById('terminal-body');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const firstnameInput = document.getElementById('form-firstname');
      const lastnameInput = document.getElementById('form-lastname');
      const emailInput = document.getElementById('form-email');
      const messageInput = document.getElementById('form-message');

      let name = '';
      if (nameInput) {
        name = nameInput.value.trim();
      } else if (firstnameInput && lastnameInput) {
        name = `${firstnameInput.value.trim()} ${lastnameInput.value.trim()}`;
      }
      
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) return;

      // Disable form during transmission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const inputs = contactForm.querySelectorAll('input, textarea, select');
      submitBtn.disabled = true;
      inputs.forEach(input => input.disabled = true);

      const clearForm = () => {
        // Clear input values
        if (nameInput) nameInput.value = '';
        if (firstnameInput) firstnameInput.value = '';
        if (lastnameInput) lastnameInput.value = '';
        if (emailInput) emailInput.value = '';
        if (messageInput) messageInput.value = '';

        const phoneInput = document.getElementById('form-phone');
        const companyInput = document.getElementById('form-company');
        const roleInput = document.getElementById('form-role');
        const countryInput = document.getElementById('form-country');
        const inquiryTypeInput = document.getElementById('form-inquiry-type');
        const consentInput = document.getElementById('form-consent');
        if (phoneInput) phoneInput.value = '';
        if (companyInput) companyInput.value = '';
        if (roleInput) roleInput.value = '';
        if (countryInput) countryInput.value = '';
        if (inquiryTypeInput) inquiryTypeInput.selectedIndex = 0;
        if (consentInput) consentInput.checked = false;
      };

      if (terminalBody) {
        // Clear input values
        clearForm();

        // Run terminal logs sequence
        const terminalCursor = terminalBody.querySelector('.terminal-cursor');
        if (terminalCursor) terminalCursor.remove();

        const lines = [
          { text: `Initializing secure communication channel...`, type: 'system' },
          { text: `Establishing TLS handshake... [OK]`, type: 'success' },
          { text: `Inquiry payload received from: ${name} <${email}>`, type: 'accent' },
          { text: `Sanitizing input parameters... [CLEAN]`, type: 'system' },
          { text: `Verifying database write authorization... [OK]`, type: 'system' },
          { text: `Transmitting record to central database...`, type: 'accent' },
          { text: `Record indexed. Transmission complete. Transaction ID: BS-${Math.floor(1000 + Math.random() * 9000)}`, type: 'success' },
          { text: `System idle. Awaiting next inquiry request...`, type: 'system' }
        ];

        let delay = 300;

        lines.forEach((line, index) => {
          setTimeout(() => {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'terminal-line';
            
            const promptSpan = document.createElement('span');
            promptSpan.className = 'terminal-prompt';
            promptSpan.textContent = 'bs-labs$';
            
            const textSpan = document.createElement('span');
            textSpan.className = `terminal-text ${line.type}`;
            textSpan.textContent = line.text;

            lineDiv.appendChild(promptSpan);
            lineDiv.appendChild(textSpan);
            
            terminalBody.appendChild(lineDiv);
            terminalBody.scrollTop = terminalBody.scrollHeight;

            // If this is the last line, re-append cursor, enable form inputs
            if (index === lines.length - 1) {
              const cursorSpan = document.createElement('span');
              cursorSpan.className = 'terminal-cursor';
              terminalBody.appendChild(cursorSpan);

              submitBtn.disabled = false;
              inputs.forEach(input => input.disabled = false);
            }
          }, delay);
        });
      } else {
        // No terminal (contact page flow) - show success message
        setTimeout(() => {
          const successMessage = document.getElementById('form-success-message');
          if (successMessage) {
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          } else {
            alert('Thank you! Your inquiry has been sent successfully.');
          }

          // Enable controls again
          submitBtn.disabled = false;
          inputs.forEach(input => input.disabled = false);
          clearForm();
        }, 600);
      }
    });

    // Reset button handling for success card
    const resetBtn = document.getElementById('form-reset-btn');
    const successMessage = document.getElementById('form-success-message');
    if (resetBtn && successMessage) {
      resetBtn.addEventListener('click', () => {
        successMessage.style.display = 'none';
        contactForm.style.display = '';
      });
    }
  }

  // 7. Works Showcase Tabs Switcher
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update active tab buttons
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update active tab content panels
      tabContents.forEach(content => {
        if (content.id === targetTab) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });
});
