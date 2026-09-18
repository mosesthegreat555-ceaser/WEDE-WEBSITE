const body = document.body;
const currentPage = body.dataset.page || "home";

// Highlight the current page's link in the nav by comparing each link's
// href against body's data-page attribute (set per page in the HTML),
// so only one <nav> markup is needed across all five pages.
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach((link) => {
  const href = link.getAttribute('href');
  const pageName = href ? href.replace('.html', '').replace('./', '').replace('/', '') : '';
  if (pageName === currentPage || (currentPage === 'home' && pageName === 'index')) {
    link.classList.add('active');
  }
});

// Mobile menu: below the 900px breakpoint (see styles.css) the nav is
// hidden until this button is clicked. aria-expanded is kept in sync
// with the menu's open/closed state so screen readers announce it.
const menuToggle = document.querySelector('.nav-toggle');
const navLinksMenu = document.querySelector('.nav-links');

if (menuToggle && navLinksMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinksMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Enquiry form: there is no backend to send this data to yet, so
// submitting the form is prevented, the browser's built-in validation
// is checked first, and a confirmation message is shown in its place.
const enquiryForm = document.getElementById('enquiry-form');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!enquiryForm.checkValidity()) {
      enquiryForm.reportValidity();
      return;
    }

    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message');
    const formMessage = document.getElementById('form-message');

    if (message) {
      formMessage.textContent = `Thank you, ${name || 'friend'}! Your enquiry has been submitted successfully. Our team will contact you soon.`;
    }

    enquiryForm.reset();
  });
}

// Footer copyright year: written from the visitor's system clock so it
// never needs manual updating each year.
const yearText = document.getElementById('year');
if (yearText) {
  yearText.textContent = new Date().getFullYear();
}
