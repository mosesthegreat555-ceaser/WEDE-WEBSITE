# Help Me Up (HMU) — Part 3 Final POE Website

*Module:* WEDE5020 — Web Development  
*Course:* Higher Certificate in Mobile Application and Web Development  
*Institution:* IIE Rosebank College  
*Original Part 2 author information (retained from uploaded project):* Lethabo Mmako — ST10533051  
*Project:* Help Me Up — Grade 12 learner guidance NGO  
*Version:* Part 3 — 29 October 2026  
*Original repository noted in Part 2:* https://github.com/mosesthegreat555-ceaser/assignment-step-1  
**Live website:** — add the actual public URL after publishing.

# 1. Project overview

Help Me Up (HMU) is a South African non-profit website concept supporting Grade 12 learners as they make decisions about universities, colleges, bursaries, careers and opportunities after matric. The Part 3 upgrade builds directly on the uploaded Part 2 HTML/CSS website and preserves its blue/green look, brand, site structure and educational mission.

**Audience:** learners, parents, schools, volunteers and supporters. The website is designed to offer information, searchable programme descriptions, enquiry assistance and contact routes. The illustrations are original project SVG assets. Programme content is descriptive and does not guarantee funding, acceptance, workshop availability or individual services.

# 2. Website pages

| Page | Filename | Purpose / key features |
| --- | --- | --- |
| Home | `index.html` | Welcome, educational goals, calls to action, interactive FAQ accordion |
| About | `about.html` | NGO story, values, timeline, six-image original artwork gallery and keyboard-accessible lightbox |
| Programmes | `projects.html` | Eight JavaScript-generated programme entries, keyword search, audience filter buttons, A–Z/Z–A sorting |
| Enquiry | `enquiry.html` | Typed enquiry, conditional school name, validation, personalised cost/availability/next-steps response, Netlify asynchronous submission |
| Contact | `contact.html` | Existing business details, separate general-message form, asynchronous delivery on Netlify or email-draft fallback, Leaflet/OSM interactive map |

# 3. Part 3 assessment requirement coverage

| Rubric criterion | Where it is demonstrated | Test it by... |
| --- | --- | --- |
| Interactive elements | Home accordion, project filter buttons, gallery modal | Open/close FAQ, filter programmes, enlarge photos |
| Interactive map | Contact page Leaflet map with marker, popup, circle, zoom, OSM attribution | Open Contact with an internet connection |
| Gallery lightbox | About page `dialog` | Click a gallery image, use Next/Previous, Escape or Close |
| Dynamic content and search | `programmes.js` and Projects page | Search “bursary”; select Schools; sort A–Z |
| SEO titles | Unique `<title>` on every page | Inspect each HTML `<head>` |
| Meta keywords | `<meta name="keywords">` on every page | Inspect each HTML `<head>` (included for rubric; not a modern ranking factor) |
| Meta descriptions | Unique descriptive summaries on all pages | Inspect each HTML `<head>` |
| Image SEO | Clear image paths and specific alt text for meaningful illustrations | Inspect About image elements |
| Mobile layout | Original mobile header + new gallery, map and form breakpoints | Test at 375px, 768px and desktop |
| Enquiry controls | Enquiry page name, email, role, enquiry type, optional school, message | Complete the form |
| Enquiry validation | `script.js` per-field error messages, required selection, valid email and minimum lengths | Enter blank/incorrect values |
| Enquiry process and response | `topicAdvice` lookup in `script.js` | Choose a type and get personalised guidance |
| Contact controls | Contact form name, email, message type, subject, full message | Enter all fields |
| Contact validation | `script.js` per-field error messages | Submit an invalid message |
| Contact processing/email | Netlify Forms AJAX or composed `mailto:` email link | Deploy to Netlify; otherwise open prepared email |
| Version control | Git commands below; not yet pushed by this ZIP | Commit and push to own repo |
| README and changelog | This `README.md` | Review Section 7 |
| Deployment | `netlify.toml` and deploy walkthrough | Publish using Netlify |
| Robots and sitemap | `robots.txt`, `sitemap.xml`, SEO configuration script | Update the live domain after deployment |
| Security | No insertion of user-entered HTML, field limits, honeypot, HTTPS hosting, Netlify `_headers` | Inspect `script.js`, form markup, `_headers` |
| Page speed | SVG local artwork, no JS framework, lazy-loaded gallery images | Run Lighthouse on final deployed URL |

## 4. How to open in Visual Studio Code (Windows)

1. Extract the full ZIP to a folder, such as `Documents\WEDE_Part_3_HMU`.
2. Open **Visual Studio Code** and choose **File → Open Folder**. Select the folder containing `index.html`.
3. Install the optional **Live Server** extension, right-click `index.html`, and choose **Open with Live Server**. The site normally opens at `http://127.0.0.1:5500/`.
4. Navigate through all five pages. For map tiles and the Leaflet library, keep internet connected.
5. No `npm install` or build command is required. HTML, CSS and JavaScript are editable directly.

*Important about forms:* Browser preview and Live Server *do not send enquiries to the organisation*. Enquiry validates locally and displays a clearly labelled preview response. Contact validates and prepares an email the visitor must send from their email application. This avoids falsely claiming that an email was sent.

# 5. How to deploy on Netlify for AJAX forms

Netlify is recommended because the project uses static HTML forms marked `data-netlify="true"`, with an AJAX `fetch` submission in `script.js`.

1. Sign in to Netlify. Choose *Add new project / Deploy manually* (exact UI wording may vary) and drag in the extracted *website folder contents*, with `index.html` at its root. Alternatively connect your GitHub repository.
2. Wait until Netlify finishes deploying; copy the actual `https://...netlify.app` URL.
3. In Netlify, ensure *Forms / Form detection* is enabled, then redeploy if necessary. The two form names are `hmu-enquiry` and `hmu-contact`.
4. Open the live page, fill both forms with test data and confirm the submissions appear in *Netlify → Forms*. A successful AJAX response reports receipt by Netlify's form service; it does *not* promise a staff member has read it.
5. In Netlify's form notification settings, configure an email notification to the project's intended contact email if organisation email alerts are required. *A form saved in Netlify does not, by itself, send an email notification.* Verify that the email belongs to the organisation before enabling notifications.
6. For custom domains not ending in `.netlify.app`, set `window.HMU_NETLIFY_FORMS = true` in a small script *before* `script.js` is loaded (only if the custom domain is actually deployed on Netlify).
7. Run the SEO configurator with the real deployed HTTPS URL, commit the updated pages/SEO files and redeploy:

   ```bash
   python tools/configure_site.py https://YOUR-REAL-SITE.netlify.app
   ```

   The helper updates `robots.txt`, `sitemap.xml`, and page-specific canonical / social URLs. Replace the sample Netlify domain with the live site URL before publishing to production.

8. Test the actual public site from phone and desktop, including link and image loading.

*Hosting limitation:* GitHub Pages can serve the content and map, but cannot handle these Netlify form POST requests. If deployed to GitHub Pages instead, the enquiry result stays a preview and contact requires the email-draft link or a separate functioning form backend. The code does not pretend otherwise.

# 6. GitHub repository and descriptive commits

> The ZIP contains website files, not a live GitHub commit history. The original uploaded repository URL has *not* been modified or pushed by creating this ZIP.

From the website folder in the VS Code terminal, if upgrading an existing clone:

```bash
git status
git add .
git commit -m "feat: add searchable programme cards and accessible filters"
git commit --allow-empty -m "docs: record Part 3 upgrades and deployment instructions" # optional if separated changes already committed
git push origin main
```

Prefer several *real incremental commits as work is completed*, for example:

```text
fix: improve heading order and navigation accessibility
feat: add gallery lightbox and FAQ accordion
feat: add interactive Johannesburg outreach map
feat: add enquiry guidance and contact validation
feat: add Netlify AJAX forms and email fallback
docs: add detailed changelog, SEO assets and references
```

If your local project isn't a clone yet, initialise Git or copy these files into the proper existing repository, then commit and push. Submit **your actual GitHub repository URL and actual live Netlify URL** to the LMS.

# 7. Changelog (most recent first)

# [Part 3] — 2026-10-29

*Changed — Part 2 improvements made while upgrading*
- Retained original five-page site structure, blue/green colour palette, images and mobile menu.
- Improved navigation by adding `aria-current="page"`, consistent active-link logic, an accessible Skip to content link and Escape behaviour for the mobile menu.
- Kept a clear heading structure and addressed existing UI issues such as the missing dedicated contact form.
- Replaced the old enquiry-only visual confirmation (which said it was submitted although no backend existed) with honest preview vs actual submission states.
- Added field labels, specific error messages, input limits, required indicators and instructions to avoid sensitive personal data.
- Added safe DOM construction for user-driven rendering and improved keyboard interaction.

*Added — Part 3 requirements*
- FAQ accordion on Home with ARIA state management and keyboard-accessible native buttons.
- Original SVG illustration gallery on About with native dialog lightbox, arrow navigation and Escape-to-close.
- Eight programme cards generated from JavaScript data, searchable by keywords, audience filters and alphabetical sorting.
- Leaflet interactive Johannesburg outreach area map with popup, zoom, OSM attribution and external map search. Map pin intentionally represents an approximate area, not a verified office location.
- Separate enquiry form with conditional school input, meaningful client-side validation, personalised response by enquiry category and Netlify asynchronous POST.
- Separate general-message contact form, field validation, Netlify asynchronous POST and fully composed email draft when no form backend is present.
- Distinct page titles, descriptions, meta keywords, Open Graph tags, favicon, alt text, robots.txt, sitemap.xml and URL setup helper.
- Response and error states for form submission; CSP and other HTTP response headers for Netlify deployment.
- Responsive styles, animations with reduced-motion support, focus indicators, image lazy loading, Netlify configuration and updated documentation.

*Required manual follow-up before final submission*
- *Actual Part 2 lecturer feedback was not included with the uploaded ZIP or screenshots.* This changelog accurately records the changes made, but any additional corrections explicitly required by the lecturer must be added after reading their feedback; do not describe these as lecturer-requested changes without evidence.
- Set the real deployed URL in canonical URLs, sitemap and robots using `configure_site.py`.
- Enable and test Netlify form detection and email notifications if needed.
- Publish and test, commit several descriptive Git changes, and include both public URLs in your LMS submission.

# [Part 2] — 2026-09-16 (preserved from uploaded project)

- Added original SVG graphics: `illustration-graduation.svg`, `illustration-study.svg` and `illustration-support.svg`, with descriptive alt text.
- Added source comments and adjusted heading order on Projects and Contact.
- Added menu `aria-expanded` and `aria-controls` and removed inline CSS in favour of named styles.
- Used semantic `<address>` for contact information and standardised UTF-8 meta tags.

# 8. Verification checklist

- [ ] Navigation works on all five pages and on a phone-width screen.
- [ ] FAQ opens/closes with buttons, and Escape closes the mobile menu.
- [ ] Gallery opens, arrow keys/Next/Previous work and Escape closes it.
- [ ] Programme search finds *Bursary & Scholarship Support* for “bursary”.
- [ ] Schools filter returns school programmes; sorting changes card order.
- [ ] Empty search shows “No programmes match that search.”
- [ ] Enquiry empty submit displays field errors; invalid email is rejected.
- [ ] Choosing School workshop asks for school/organisation name.
- [ ] Correct enquiry returns the relevant guidance, including a clear send status.
- [ ] Contact invalid submit displays errors; local preview creates an email-draft link.
- [ ] Map loads online with OSM attribution (CDN and tiles need internet).
- [ ] After Netlify deployment both forms appear in the Netlify dashboard and submissions arrive.
- [ ] SEO metadata is present, and `robots.txt`/`sitemap.xml` reflect the actual live domain.
- [ ] Run Lighthouse and fix any real accessibility/performance issues found.
- [ ] Commit all changes, confirm GitHub repository is public/accessible, submit live URL and repository link.

# 9. Search optimisation strategy

*Keyword research/topics:* HMU's audience is likely to search for phrases around “Grade 12 support”, “bursaries South Africa”, “university applications”, “college guidance”, “school workshops” and “youth volunteer programmes”. Page-specific keywords are used naturally in titles, descriptions, headings and content. Meta keyword tags are included for this course rubric even though major search engines do not rely on them for ranking.

On-page SEO: semantic HTML and orderly H1/H2/H3, alt text, fast SVG images, natural internal links and direct descriptive `.html` filenames. Canonicals and XML sitemap should be configured only once the real URL is known.

*Off-page SEO to do after publishing:* Share the actual public website through the organisation's verified social-media channels; request legitimate education/community partners to link to relevant project pages. Do not manufacture backlinks or claim these were already obtained. For local SEO, verify the real organisation address before submitting it to any public business directory; Part 2 contains an address, but it has not been independently validated here.

**Security and performance:** static code, no client secrets, a honeypot for spam reduction, no raw insertion of user input into HTML, resource length limits, accessible feedback, Netlify-specific security headers, lazy SVG image loading and reduced-motion support. Client-side validation is for user experience, **not a replacement for backend validation**; Netlify or a future server must enforce its own checks and anti-spam controls.

# 10. References 

Leaflet (2026) *Leaflet downloads*. Available at: https://leafletjs.com/download (Accessed: 29 October 2026).

Leaflet (2026) *Leaflet quick start guide*. Available at: https://leafletjs.com/examples/quick-start/ (Accessed: 29 October 2026).

MDN Web Docs (n.d.) *Client-side form validation*. Available at: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation (Accessed: 29 October 2026).

MDN Web Docs (n.d.) *HTMLDialogElement: showModal() method*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal (Accessed: 29 October 2026).

Netlify (2026) *Forms setup*. Available at: https://docs.netlify.com/manage/forms/setup/ (Accessed: 29 October 2026).

OpenStreetMap (n.d.) *Copyright and license*. Available at: https://www.openstreetmap.org/copyright (Accessed: 29 October 2026).

Google Search Central (n.d.) *Understand sitemaps*. Available at: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview (Accessed: 29 October 2026).

# 11. Image and library credits

- Original illustrations from the submitted Part 2 project: `illustration-graduation.svg`, `illustration-study.svg`, `illustration-support.svg`.
- New original illustrations for Part 3: `illustration-pathways.svg`, `illustration-books.svg`, `illustration-community.svg` and `favicon.svg`.
- Interactive map: Leaflet (BSD-2-Clause) and © OpenStreetMap contributors (ODbL map data; map tiles and attribution subject to OSM usage terms).
- No external stock photography was required.
