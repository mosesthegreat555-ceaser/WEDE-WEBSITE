/** Help Me Up · WEDE Part 3 · Accessible interactions and client-side forms. */
(() => {
  'use strict';

  // Navigation: correct active state, mobile toggle and keyboard closing.
  const currentPage = document.body.dataset.page || 'index';
  const links = [...document.querySelectorAll('.nav-links a')];
  links.forEach((link) => {
    const active = link.getAttribute('href') === `${currentPage}.html`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  const menuButton = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-links');
  function closeMenu() {
    if (!menu || !menuButton) return;
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }
  menuButton?.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  links.forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => {
    if (event.matches) closeMenu();
  });
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Home: accordion opens one answer at a time.
  const faqButtons = [...document.querySelectorAll('.accordion-trigger')];
  faqButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const opening = button.getAttribute('aria-expanded') !== 'true';
      faqButtons.forEach((other) => {
        const panel = document.getElementById(other.getAttribute('aria-controls'));
        other.setAttribute('aria-expanded', 'false');
        if (panel) panel.hidden = true;
        const icon = other.querySelector('.accordion-icon');
        if (icon) icon.textContent = '+';
      });
      if (opening) {
        button.setAttribute('aria-expanded', 'true');
        const panel = document.getElementById(button.getAttribute('aria-controls'));
        if (panel) panel.hidden = false;
        button.querySelector('.accordion-icon').textContent = '−';
      }
    });
  });

  // About: native dialog gives keyboard Escape and focus management.
  const tiles = [...document.querySelectorAll('.gallery-tile')];
  const dialog = document.getElementById('gallery-lightbox');
  if (dialog && tiles.length && typeof dialog.showModal === 'function') {
    const largeImage = document.getElementById('lightbox-image');
    const caption = document.getElementById('lightbox-caption');
    let activeIndex = 0;
    function showImage(index) {
      activeIndex = (index + tiles.length) % tiles.length;
      const tile = tiles[activeIndex];
      largeImage.src = tile.dataset.full;
      largeImage.alt = tile.querySelector('img').alt;
      caption.textContent = `${activeIndex + 1} / ${tiles.length} · ${tile.dataset.caption}`;
    }
    tiles.forEach((tile, index) => tile.addEventListener('click', () => {
      showImage(index);
      dialog.showModal();
    }));
    document.getElementById('lightbox-close').addEventListener('click', () => dialog.close());
    document.getElementById('lightbox-prev').addEventListener('click', () => showImage(activeIndex - 1));
    document.getElementById('lightbox-next').addEventListener('click', () => showImage(activeIndex + 1));
    dialog.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') showImage(activeIndex - 1);
      else if (event.key === 'ArrowRight') showImage(activeIndex + 1);
    });
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  }

  // Contact: approximate Johannesburg outreach area. Never show this pin as a verified office entrance.
  const mapElement = document.getElementById('hmu-map');
  if (mapElement) {
    if (typeof window.L !== 'undefined') {
      const position = [-26.190, 28.030]; // Approximate Johannesburg area, NOT verified office coordinates.
      const map = window.L.map(mapElement, { scrollWheelZoom: false }).setView(position, 12);
      window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      window.L.marker(position).addTo(map).bindPopup('<strong>Johannesburg outreach area</strong><br>Approximate location, not the office entrance.');
      window.L.circle(position, { radius: 2400, color: '#0d5ea8', fillColor: '#2cb67d', fillOpacity: 0.1, weight: 2 }).addTo(map);
      mapElement.querySelector('.map-placeholder')?.remove();
    } else {
      mapElement.textContent = 'Map unavailable offline. Use the OpenStreetMap link to view the area.';
      mapElement.classList.add('map-unavailable');
    }
  }

  // Form helpers: clear, per-field feedback. Nothing claims success before delivery is confirmed.
  function getError(input) {
    const value = input.value.trim();
    if (input.required && !value) return 'This field is required.';
    if (!value) return '';
    if (input.type === 'email' && !input.checkValidity()) return 'Enter a valid email address (example: name@email.com).';
    if (input.minLength > 0 && value.length < input.minLength) return `Please enter at least ${input.minLength} characters.`;
    if (input.maxLength > 0 && value.length > input.maxLength) return `Use no more than ${input.maxLength} characters.`;
    if (!input.checkValidity()) return 'Please check your answer.';
    return '';
  }

  function updateField(input) {
    const error = getError(input);
    const message = document.getElementById(`${input.id}-error`);
    if (message) message.textContent = error;
    input.setAttribute('aria-invalid', error ? 'true' : 'false');
    return !error;
  }

  function validateForm(form) {
    const inputs = [...form.querySelectorAll('input:not([type="hidden"]):not([name="bot-field"]), select, textarea')]
      .filter((field) => !field.closest('[hidden]'));
    let firstInvalid = null;
    inputs.forEach((field) => {
      if (!updateField(field) && firstInvalid === null) firstInvalid = field;
    });
    firstInvalid?.focus();
    return firstInvalid === null;
  }

  function setupValidation(form) {
    form.querySelectorAll('input, select, textarea').forEach((field) => {
      if (field.name === 'bot-field' || field.type === 'hidden') return;
      field.addEventListener('blur', () => updateField(field));
      field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') updateField(field);
      });
      field.addEventListener('change', () => updateField(field));
    });
  }

  function status(message, text, kind) {
    message.className = `form-status ${kind || ''}`;
    message.textContent = text;
  }

  function netlifyHost() {
    // Also supports custom Netlify domains when window.HMU_NETLIFY_FORMS is set to true.
    return /\.netlify\.app$/i.test(window.location.hostname) || window.HMU_NETLIFY_FORMS === true;
  }

  async function submitNetlify(form) {
    // Documented Netlify Forms AJAX format. Non-2xx responses are failures.
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    });
    if (!response.ok) throw new Error(`Form submission failed (${response.status})`);
  }

  const topicAdvice = {
    study: { heading: 'Your study guidance request', text: 'General study information is free. Prepare your latest results and list of institutions you are interested in. An adviser will need to check any specific admission requirements with the institution.', next: 'See our study and career programmes.' },
    funding: { heading: 'Your funding guidance request', text: 'Bursary information is free. Check eligibility criteria and official deadlines, and keep your results and supporting documents ready. Funding is not guaranteed.', next: 'Explore the bursary support programme.' },
    workshop: { heading: 'Your school workshop request', text: 'A school visit depends on team availability and planning. Share the school, preferred date, audience size, and topics you want covered. No booking has been confirmed.', next: 'Ask us about the school partnerships programme.' },
    volunteer: { heading: 'Your volunteering enquiry', text: 'Thank you for your interest in helping learners. Describe your skills and what you could contribute. Opportunities depend on current needs.', next: 'Read more about getting involved.' },
    partner: { heading: 'Your partnership enquiry', text: 'Tell us what kind of programme or resources you want to support. Costs and availability are discussed individually; no donation is processed by this website.', next: 'See how you can get involved.' },
    other: { heading: 'Your general enquiry', text: 'Your request may need a personalised answer. Please describe the information you are looking for and use the contact page if you need to send a general email.', next: 'Browse our programmes.' }
  };

  function revealEnquiryResult(topic, sent) {
    const advice = topicAdvice[topic] || topicAdvice.other;
    const result = document.getElementById('enquiry-result');
    result.replaceChildren();
    const heading = document.createElement('h3');
    heading.textContent = advice.heading;
    const info = document.createElement('p');
    info.textContent = advice.text;
    const next = document.createElement('p');
    next.textContent = advice.next;
    const delivery = document.createElement('p');
    delivery.className = 'result-delivery';
    delivery.textContent = sent ? 'Your enquiry was sent to the site form service.' : 'Preview result only: your details have NOT been sent to HMU. Deploy on Netlify with form detection to receive enquiries.';
    const link = document.createElement('a');
    link.href = 'projects.html';
    link.textContent = 'Explore programmes →';
    result.append(heading, info, next, delivery, link);
    result.hidden = false;
    result.focus();
  }

  const enquiry = document.getElementById('enquiry-form');
  if (enquiry) {
    setupValidation(enquiry);
    const topic = document.getElementById('enquiry-topic');
    const schoolWrap = document.getElementById('school-field');
    const school = document.getElementById('enquiry-school');
    function adjustSchool() {
      const need = topic.value === 'workshop';
      schoolWrap.hidden = !need;
      school.required = need;
      if (!need) {
        school.value = '';
        updateField(school);
      }
    }
    topic.addEventListener('change', adjustSchool);
    const initialTopic = new URLSearchParams(window.location.search).get('topic');
    if (initialTopic && [...topic.options].some((o) => o.value === initialTopic)) topic.value = initialTopic;
    adjustSchool();
    enquiry.addEventListener('submit', async (event) => {
      event.preventDefault();
      const message = document.getElementById('enquiry-status');
      const result = document.getElementById('enquiry-result');
      result.hidden = true;
      if (!validateForm(enquiry)) {
        status(message, 'Please correct the highlighted fields, then try again.', 'error');
        return;
      }
      const selected = topic.value;
      const button = enquiry.querySelector('[type="submit"]');
      if (!netlifyHost()) {
        status(message, 'Your answers were validated. Here is guidance for your enquiry type.', 'success');
        revealEnquiryResult(selected, false);
        return;
      }
      button.disabled = true;
      status(message, 'Submitting your enquiry securely…', 'info');
      try {
        await submitNetlify(enquiry);
        status(message, 'Your enquiry was received by the form service. Read your guidance below.', 'success');
        revealEnquiryResult(selected, true);
        enquiry.reset();
        adjustSchool();
      } catch (error) {
        status(message, 'We could not send your enquiry. Please email helpmeup@gmail.com or try again.', 'error');
        revealEnquiryResult(selected, false);
      } finally {
        button.disabled = false;
      }
    });
  }

  const contact = document.getElementById('contact-form');
  if (contact) {
    setupValidation(contact);
    contact.addEventListener('submit', async (event) => {
      event.preventDefault();
      const message = document.getElementById('contact-status');
      if (!validateForm(contact)) {
        status(message, 'Please correct the highlighted fields, then try again.', 'error');
        return;
      }
      const button = contact.querySelector('[type="submit"]');
      if (netlifyHost()) {
        button.disabled = true;
        status(message, 'Sending your message…', 'info');
        try {
          await submitNetlify(contact);
          status(message, 'The form service received your message. Email notifications require setup in the Netlify dashboard.', 'success');
          contact.reset();
        } catch (error) {
          status(message, 'The message could not be sent. You can use your email application instead.', 'error');
        } finally {
          button.disabled = false;
        }
        return;
      }
      const data = new FormData(contact);
      const subject = `[HMU: ${data.get('type')}] ${data.get('subject')}`;
      const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nMessage type: ${data.get('type')}\n\n${data.get('message')}`;
      const href = `mailto:helpmeup@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status(message, 'Your details are valid. This preview cannot send emails directly. Open the prepared email and press Send in your email application.', 'info');
      const link = document.createElement('a');
      link.href = href;
      link.className = 'btn btn-secondary email-draft-link';
      link.textContent = 'Open my prepared email →';
      message.append(document.createElement('br'), link);
    });
  }
})();
