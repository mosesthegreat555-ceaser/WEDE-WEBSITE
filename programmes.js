/**
 * Part 3: content created dynamically and filtered in the browser.
 * These are programme descriptions, not live dates or guaranteed services.
 */
(() => {
  'use strict';

  const programmes = [
    { id: 1, category: 'learners', icon: '🎓', title: 'University & College Guidance', description: 'Understand admission choices, application steps and ways to compare study options after matric.', points: ['Higher education pathways', 'Application planning', 'Admission requirement checklists'], topic: 'study' },
    { id: 2, category: 'learners', icon: '📘', title: 'Bursary & Scholarship Support', description: 'Learn where to look for funding information and what documents are commonly requested.', points: ['Funding research tips', 'Document preparation', 'Scholarship application basics'], topic: 'funding' },
    { id: 3, category: 'learners', icon: '🧭', title: 'Career Readiness', description: 'Explore interests, career routes, goals and possible next steps toward work or further study.', points: ['Career exploration', 'Goal setting', 'Study and career planning'], topic: 'study' },
    { id: 4, category: 'schools', icon: '🏫', title: 'School Partnerships', description: 'Connect with HMU about guidance programmes that could benefit learners at your school.', points: ['Planning school visits', 'Learner information sessions', 'Partnership discussions'], topic: 'workshop' },
    { id: 5, category: 'schools', icon: '🗓', title: 'Matric Information Workshops', description: 'Enquire about sessions covering tertiary choices, education funding and planning beyond Grade 12.', points: ['Session enquiries', 'Topics for learners', 'Date and location requests'], topic: 'workshop' },
    { id: 6, category: 'supporters', icon: '🤝', title: 'Volunteer Opportunities', description: 'Find out how volunteers could help with guidance, outreach and school information activities.', points: ['Outreach support', 'Sharing skills', 'Community involvement'], topic: 'volunteer' },
    { id: 7, category: 'supporters', icon: '🌱', title: 'Community Sponsorship', description: 'Ask about supporting information events and education resources through partnerships.', points: ['Sponsorship enquiries', 'Learning resources', 'Programme support'], topic: 'partner' },
    { id: 8, category: 'learners', icon: '💻', title: 'Digital Application Skills', description: 'Get guidance on preparing basic documents and using online study application portals.', points: ['Online application basics', 'Digital readiness', 'Document checklists'], topic: 'study' }
  ];

  const grid = document.getElementById('programme-grid');
  if (!grid) return;

  const search = document.getElementById('programme-search');
  const sort = document.getElementById('programme-sort');
  const tabs = [...document.querySelectorAll('.filter-tab')];
  const summary = document.getElementById('results-summary');
  const empty = document.getElementById('results-empty');
  let category = 'all';

  function buildCard(programme) {
    const card = document.createElement('article');
    card.className = 'project-card dynamic-card';

    const meta = document.createElement('div');
    meta.className = 'programme-card-meta';
    const icon = document.createElement('span');
    icon.className = 'programme-symbol';
    icon.textContent = programme.icon;
    icon.setAttribute('aria-hidden', 'true');
    const tag = document.createElement('span');
    tag.className = 'programme-tag';
    tag.textContent = programme.category === 'learners' ? 'Learners' : programme.category === 'schools' ? 'Schools' : 'Supporters';
    meta.append(icon, tag);

    const title = document.createElement('h3');
    title.textContent = programme.title;
    const description = document.createElement('p');
    description.textContent = programme.description;
    const list = document.createElement('ul');
    for (const point of programme.points) {
      const li = document.createElement('li');
      li.textContent = point;
      list.append(li);
    }
    const link = document.createElement('a');
    link.className = 'card-cta';
    link.href = `enquiry.html?topic=${encodeURIComponent(programme.topic)}`;
    link.textContent = 'Ask about this programme →';
    card.append(meta, title, description, list, link);
    return card;
  }

  function render() {
    const query = search.value.toLocaleLowerCase().trim();
    const visible = programmes.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      const text = `${p.title} ${p.description} ${p.points.join(' ')} ${p.category}`.toLocaleLowerCase();
      return text.includes(query);
    });
    if (sort.value === 'az') visible.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort.value === 'za') visible.sort((a, b) => b.title.localeCompare(a.title));
    // replaceChildren with DOM nodes prevents user search text from becoming HTML.
    grid.replaceChildren(...visible.map(buildCard));
    empty.hidden = visible.length > 0;
    summary.textContent = `${visible.length} programme${visible.length === 1 ? '' : 's'} found`;
  }

  search.addEventListener('input', render);
  sort.addEventListener('change', render);
  tabs.forEach((tab) => tab.addEventListener('click', () => {
    category = tab.dataset.category;
    tabs.forEach((t) => {
      const selected = t === tab;
      t.classList.toggle('is-selected', selected);
      t.setAttribute('aria-pressed', String(selected));
    });
    render();
  }));
  render();
})();
