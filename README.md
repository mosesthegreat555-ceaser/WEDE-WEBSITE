# WEDE-WEBSITE
# Help Me Up (HMU) — Non-Profit Organisation Website

Student: Lethabo Mmako
Student Number: ST10533051
Module: WEDE5020 — Web Development
Programme: Higher Certificate in Mobile Application and Web Development
Institution: The IIE — Rosebank College
Repository: https://github.com/mosesthegreat555-ceaser/WEDE-WEBSITE

---

# Project Overview

This repository contains the website developed for Help Me Up (HMU), a South African
non-profit organisation that helps Grade 12 learners prepare for life after school. HMU makes
information about universities, colleges, bursaries and other opportunities easier to find,
particularly for learners who don't have easy access to it.

The site was built as part of the WEDE5020 module, Part 1: static HTML/CSS pages with light
JavaScript interactivity, no backend or build tools.

# Target Audience

| Audience | What they need from the site |
|---|---|
| Grade 12 learners | Information on tertiary study, bursaries and applications |
| Parents and guardians | An understanding of what support is available to their child |
| Schools | A way to enquire about HMU school visits and workshops |
| Volunteers and donors | Information on how to get involved or support HMU |

---

# Website Goals and Objectives

The site aims to:

- Provide information about tertiary education opportunities.
- Share information about bursaries and scholarships.
- Explain the programmes and projects offered by HMU.
- Raise awareness of the organisation.
- Allow schools and learners to submit enquiries.
- Give visitors information about volunteering and supporting HMU.

Success will be measured by the number of website visits, the number of enquiries submitted,
views of the resource pages, and the number of people making contact with HMU.




# Navigation

Every page shares identical header markup: a top info bar, the HMU logo/brand, a `<nav>` with
links to all five pages, and two call-to-action buttons ("Get Help", "Contact Us"). Below 900px
the nav collapses into a menu button (`.nav-toggle`), which `script.js` toggles open and closed
and keeps in sync with `aria-expanded` for screen readers.

The current page's link is highlighted automatically: each page's `<body>` carries a
`data-page="…"` attribute, and `script.js` compares it against each nav link's `href` to add
the `.active` class — so the same nav markup works unmodified on every page.

---

# Design and User Experience

# Colour Palette

| Colour | Hex | Where it is used | Reason |
|---|---|---|---|
| Primary blue | `#0d5ea8` | Header accents, primary buttons, hero background | Professional and trustworthy appearance |
| Dark blue | `#0a467f` | Top info bar, footer, gradient shading | Depth and contrast against the primary blue |
| Secondary green | `#2cb67d` | Nav underline, check icons, accents | Represents growth and a fresh start |
| Dark green | `#1d8e63` | Hover/active states on green elements | Consistent accent depth |
| Light blue / light green | `#edf6ff` / `#ebfff5` | Section backgrounds, gradients | Keeps the palette soft without losing the brand colours |
| White | `#ffffff` | Cards, page background, text on dark areas | Keeps the layout clean and readable |

All colours are defined once as CSS custom properties in `:root` (e.g. `--primary-blue`,
`--secondary-green`) so the whole site's palette can be changed by editing a single place in
`styles.css`, rather than hunting for hex codes throughout the file.

# Typography

Body text uses a system font stack — `"Segoe UI", Arial, Helvetica, sans-serif` — chosen for
fast loading (no external font request) and reliable, familiar rendering across devices, which
matters for a younger audience reading on a range of phones and school computers. Headings use
`clamp()` (e.g. `clamp(2rem, 4.5vw, 3.2rem)` for the hero heading) so font size scales smoothly
with the viewport instead of jumping at fixed breakpoints.

# Layout Decisions

Content is broken into clearly separated `<section>`s so learners are never faced with a large
unbroken block of text. Card grids (`.card-grid`, `.project-grid`, `.value-grid`) present
related information in equal-sized chunks. Important actions — Get Help, Get Involved
and Contact Us — use the `.btn-primary` / `.btn-secondary` styles so they stand out
consistently on every page.

---

# Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Semantic structure of all five pages (`header`, `nav`, `main`, `section`, `article`, `footer`, `address`) |
| CSS3 | Layout, colour scheme, typography and spacing, in a single external stylesheet |
| JavaScript | Active nav-link highlighting, mobile menu toggle, enquiry form validation, dynamic footer year |
| Visual Studio Code | Code editor used for development |
| Git and GitHub | Version control and change tracking |

# CSS Approach

All five pages link to one external stylesheet, `styles.css`, so the design stays consistent
site-wide and only one file needs editing to change the whole site's look. The file is grouped
into sections in this order: colour tokens (`:root` custom properties) → reset → header/nav →
buttons → hero → page-specific sections (about, projects, contact, enquiry) → footer →
responsive breakpoints — each grouping is marked with a comment.

Specific techniques used, and why:

- CSS custom properties (`--primary-blue`, `--shadow`, etc.) — a single source of truth for
  colour and shadow values, instead of repeating hex codes across dozens of rules.
- Flexbox — used for the navbar, button groups, and any row of items that needs to align
  and space itself along one axis (e.g. `.nav-links`, `.hero-actions`).
- CSS Grid — used for every card layout (`.card-grid`, `.project-grid`, `.value-grid`,
  `.contact-grid`, `.footer-grid`) via `grid-template-columns: repeat(n, minmax(0, 1fr))`,
  because these are two-dimensional layouts of equal-width items, which Grid handles more
  directly than Flexbox.
- `clamp()` on heading font sizes, so text scales fluidly between a minimum and maximum
  size across viewport widths rather than needing a separate font-size rule per breakpoint.
- `backdrop-filter: blur(10px)` on the sticky header, so page content remains legible as it
  scrolls underneath a semi-transparent header bar.
- Two media query breakpoints — `900px` (all grids collapse to one column; the nav becomes
  a toggleable menu) and `540px` (the top info bar stacks; secondary nav buttons are hidden to
  save space on small phones).

No CSS framework (e.g. Bootstrap) or CSS preprocessor is used — every rule in `styles.css` was
written directly for this project's HTML structure and class names.

# JavaScript Approach

`script.js` is loaded once at the bottom of every page's `<body>` and does four things, each
documented inline: highlights the current page in the nav, toggles the mobile menu and its
`aria-expanded` state, validates and "submits" the enquiry form (there is no backend yet, so a
confirmation message is shown in its place after the browser's built-in validation passes), and
writes the current year into the footer.

---

# How to View the Website

1. Clone the repository:
   ```bash
   git clone https://github.com/mosesthegreat555-ceaser/WEDE-WEBSITE.git
   ```
2. Open the project folder in Visual Studio Code.
3. Open `index.html` in a web browser, or use the Live Server extension in VS Code.

No build tools, frameworks or server setup are required — the site is plain HTML, CSS and
JavaScript.

---

# Changelog

All notable changes to this project are recorded here, most recent first.

# [Unreleased] — 2026-09-16
Added
- Content images: three original SVG illustrations (`images/illustration-graduation.svg`,
  `illustration-study.svg`, `illustration-support.svg`) used on the Home, About Us, Projects
  and Contact pages, each with descriptive `alt` text.
- Explanatory comments throughout every HTML file, `styles.css` and `script.js`.
- `<h2>` headings above the card grids on `contact.html` and `projects.html` so the heading
  order no longer skips from `<h1>` to `<h3>`.
- `aria-expanded` and `aria-controls` on the mobile menu button, kept in sync by `script.js`.

# Changed
- Replaced every inline `style="…"` attribute across all five pages with named CSS classes
  (`.footer-brand`, `.footer-tagline`, `.section-header.left-align`, `.stacked-heading`,
  `.info-box .btn`) defined in `styles.css`, so styling is handled in one place instead of
  being split between HTML and CSS.
- Replaced the plain `<p>` address on `contact.html` with the semantic `<address>` element.
- Standardised `<meta charset>` casing to `UTF-8` across all pages.

---

# References

Mozilla (2026) *CSS custom properties (--*)*. MDN Web Docs. Available at:
https://developer.mozilla.org/en-US/docs/Web/CSS/--* (Accessed:16/09/2026).

Mozilla (2026) *CSS Grid Layout*. MDN Web Docs. Available at:
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout (Accessed:16/09/2026).

Mozilla (2026) *clamp()*. MDN Web Docs. Available at:
https://developer.mozilla.org/en-US/docs/Web/CSS/clamp (Accessed:16/09/2026).

Mozilla (2026) *backdrop-filter*. MDN Web Docs. Available at:
https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter (Accessed:16/09/2026).

Mozilla (2026) *ARIA: aria-expanded attribute*. MDN Web Docs. Available at:
https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded
(Accessed:16/09/2026).


# Image Credits

| Image file | Source | Licence |
|---|---|---|
| `images/illustration-graduation.svg` | Original illustration created for this project | N/A — original work |
| `images/illustration-study.svg` | Original illustration created for this project | N/A — original work |
| `images/illustration-support.svg` | Original illustration created for this project | N/A — original work |


---

# Author

Lethabo Mmako (ST10533051)
Higher Certificate in Mobile Application and Web Development
The IIE — Rosebank College
