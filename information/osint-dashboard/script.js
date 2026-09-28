/**
 * OSINT Intelligence Workspace — script.js
 * Pure vanilla JavaScript. No external dependencies.
 * All data persisted in localStorage.
 */

'use strict';

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS & DEMO DATA
   ═══════════════════════════════════════════════════════════════ */

const DEMO_DATA = {
  cases: [
    { id:'CASE-001', name:'Operation Lighthouse', subject:'Alex Morgan', category:'Person Investigation', priority:'High', status:'Researching', description:'Research into publicly available information about Alex Morgan, software lead at Nova Technologies.', notes:'Found LinkedIn, GitHub. Awaiting public news confirmation.', created:'2026-01-10', updated:'2026-09-20' },
    { id:'CASE-002', name:'Nova Tech Analysis', subject:'Nova Technologies', category:'Organization Research', priority:'Medium', status:'Open', description:'Organizational OSINT on Nova Technologies Inc. Public-facing research only.', notes:'Website active. SSL valid. Cloudflare protected.', created:'2026-02-05', updated:'2026-09-18' },
    { id:'CASE-003', name:'Project Horizon Watch', subject:'Jordan Carter', category:'Social Media Analysis', priority:'Low', status:'Completed', description:'Public social media footprint analysis of Jordan Carter, freelance journalist.', notes:'Completed. Full public profile documented.', created:'2026-03-14', updated:'2026-08-30' },
    { id:'CASE-004', name:'DataStream Domain Intel', subject:'datastream.io', category:'Domain Intelligence', priority:'Medium', status:'Researching', description:'Public domain and website intelligence for datastream.io.', notes:'WHOIS public data available. Active SSL.', created:'2026-04-02', updated:'2026-09-22' },
    { id:'CASE-005', name:'Cipher Forum Investigation', subject:'CipherForum.net', category:'Public Records Search', priority:'High', status:'Waiting', description:'Research into public activity on CipherForum.net.', notes:'Waiting for archival sources.', created:'2026-05-19', updated:'2026-09-15' },
    { id:'CASE-006', name:'Raven Shield Org', subject:'Raven Shield LLC', category:'Organization Research', priority:'Low', status:'Archived', description:'Historical research on Raven Shield LLC public records.', notes:'Archived. Case closed.', created:'2026-06-01', updated:'2026-07-10' },
    { id:'CASE-007', name:'OpSky Public Profile', subject:'SkyWatcher99', category:'Social Media Analysis', priority:'Critical', status:'Open', description:'Public profile analysis of SkyWatcher99 across platforms.', notes:'Username found on 4 platforms.', created:'2026-09-01', updated:'2026-09-26' },
  ],
  people: [
    { id:'P-001', name:'Alex Morgan', alias:'AlexM', username:'alexmorgan_dev', photo:'', dob:'1990-06-15', nationality:'American', country:'USA', city:'San Francisco', state:'California', occupation:'Software Engineer', org:'Nova Technologies', website:'https://alexmorgan.dev', bio:'Senior software engineer specializing in cloud infrastructure and open-source tools. Speaker at DevConf 2025.', languages:'English, Spanish', notes:'Public GitHub active. LinkedIn confirmed employer.' },
    { id:'P-002', name:'Jordan Carter', alias:'JC', username:'jordancarterwriter', photo:'', dob:'', nationality:'British', country:'UK', city:'London', state:'England', occupation:'Freelance Journalist', org:'Independent', website:'https://jordancarter.co.uk', bio:'Award-winning investigative journalist covering technology and cybersecurity. Published in The Guardian, Wired.', languages:'English, French', notes:'Active on X and Medium. Twitter verified.' },
    { id:'P-003', name:'Nova Rivera', alias:'NovR', username:'nova_r_dev', photo:'', dob:'', nationality:'Canadian', country:'Canada', city:'Toronto', state:'Ontario', occupation:'Security Researcher', org:'CipherLabs', website:'https://novarivera.ca', bio:'Public security researcher and bug bounty hunter. CVE contributor. Presented at DEF CON 33.', languages:'English', notes:'GitHub: 340+ repositories. Keynote speaker.' },
  ],
  socialProfiles: [
    { id:'SP-001', platform:'GitHub', username:'alexmorgan_dev', url:'https://github.com/alexmorgan_dev', displayName:'Alex Morgan', bio:'Open source enthusiast. 🔐 Security. ☁️ Cloud.', type:'Personal', verified:'Unverified', person:'Alex Morgan', notes:'340 public repos. Active committer.' },
    { id:'SP-002', platform:'LinkedIn', username:'alex-morgan-dev', url:'https://linkedin.com/in/alex-morgan-dev', displayName:'Alex Morgan', bio:'Senior Software Engineer @ Nova Technologies', type:'Personal', verified:'Verified ✓', person:'Alex Morgan', notes:'500+ connections. Premium account.' },
    { id:'SP-003', platform:'X / Twitter', username:'jordancarterwriter', url:'https://x.com/jordancarterwriter', displayName:'Jordan Carter', bio:'Investigative journalist. Tech & cybersecurity.', type:'Personal', verified:'Verified ✓', person:'Jordan Carter', notes:'32K followers. Verified blue checkmark.' },
    { id:'SP-004', platform:'Reddit', username:'nova_r_researcher', url:'https://reddit.com/u/nova_r_researcher', displayName:'NovaR', bio:'Security research. Bug bounties. CTF.', type:'Personal', verified:'Unverified', person:'Nova Rivera', notes:'r/netsec, r/bugbounty active contributor.' },
    { id:'SP-005', platform:'YouTube', username:'NovaRiveraSec', url:'https://youtube.com/@NovaRiveraSec', displayName:'Nova Rivera Security', bio:'Security tutorials and CTF walkthroughs', type:'Personal', verified:'Unverified', person:'Nova Rivera', notes:'12K subscribers. Regular upload schedule.' },
  ],
  domains: [
    { id:'D-001', domain:'novatechnologies.com', title:'Nova Technologies Inc.', url:'https://novatechnologies.com', org:'Nova Technologies', status:'Active', ssl:'Valid HTTPS', registrar:'Namecheap', email:'contact@novatechnologies.com', tech:'React, Cloudflare, AWS', hosting:'AWS', notes:'Public contact page available. Annual report linked on site.' },
    { id:'D-002', domain:'datastream.io', title:'DataStream Analytics', url:'https://datastream.io', org:'DataStream LLC', status:'Active', ssl:'Valid HTTPS', registrar:'GoDaddy', email:'hello@datastream.io', tech:'Vue.js, Nginx, DigitalOcean', hosting:'DigitalOcean', notes:'API docs publicly accessible at /docs.' },
    { id:'D-003', domain:'cipherforum.net', title:'CipherForum Community', url:'https://cipherforum.net', org:'Unknown', status:'Active', ssl:'Valid HTTPS', registrar:'Namecheap', email:'', tech:'phpBB, Apache', hosting:'OVH', notes:'Public forum. Registration required for posting.' },
  ],
  contacts: [
    { id:'C-001', email:'contact@novatechnologies.com', domain:'novatechnologies.com', sourcetype:'Company Website', sourceurl:'https://novatechnologies.com/contact', verified:'Verified', notes:'Listed on official contact page.' },
    { id:'C-002', email:'alex@alexmorgan.dev', domain:'alexmorgan.dev', sourcetype:'Public Profile', sourceurl:'https://alexmorgan.dev', verified:'Verified', notes:'Personal website contact.' },
    { id:'C-003', email:'press@jordancarter.co.uk', domain:'jordancarter.co.uk', sourcetype:'Public Profile', sourceurl:'https://jordancarter.co.uk', verified:'Unverified', notes:'Listed on contact page.' },
  ],
  news: [
    { id:'N-001', title:'Nova Technologies Announces New Cloud Security Platform', publication:'TechCrunch', date:'2026-08-15', author:'Sarah Lin', relevance:'High', url:'https://techcrunch.com/2026/08/15/nova-tech-cloud-security', summary:'Nova Technologies announced a new open-source cloud security platform aimed at small businesses.', notes:'Alex Morgan mentioned as lead engineer.' },
    { id:'N-002', title:'Jordan Carter Wins Journalism Award for Cybersecurity Reporting', publication:'Press Gazette', date:'2026-07-22', author:'Mike Thompson', relevance:'Medium', url:'https://pressgazette.co.uk/2026/07/22/jordan-carter-award', summary:'Freelance journalist Jordan Carter received the Digital Journalism Award for outstanding cybersecurity coverage.', notes:'Public ceremony. Photos available.' },
    { id:'N-003', title:'DEF CON 33: Top Security Talks Recap', publication:'Wired', date:'2026-08-09', author:'Amy Chen', relevance:'High', url:'https://wired.com/2026/08/defcon-33-recap', summary:'Recap of notable talks from DEF CON 33, including Nova Rivera\'s presentation on firmware vulnerabilities.', notes:'Nova Rivera keynote confirmed.' },
  ],
  geo: [
    { id:'G-001', label:'Nova Technologies HQ', type:'Business Location', country:'USA', state:'California', city:'San Francisco', mapurl:'https://maps.google.com/?q=Nova+Technologies+San+Francisco', notes:'Listed on company website.' },
    { id:'G-002', label:'Jordan Carter - Base (Public)', type:'Public Organization', country:'UK', state:'England', city:'London', mapurl:'https://maps.google.com/?q=London+UK', notes:'Mentioned in multiple published interviews.' },
  ],
  media: [
    { id:'M-001', url:'https://picsum.photos/seed/osint1/400/300', filename:'alex_morgan_devconf.jpg', filetype:'JPEG', platform:'Company Blog', published:'2025-11-20', source:'https://novatechnologies.com/blog/devconf2025', desc:'Alex Morgan presenting at DevConf 2025. Source: company blog.', author:'Nova Tech Media Team', notes:'Public event photo. CC licensed.' },
    { id:'M-002', url:'https://picsum.photos/seed/osint2/400/300', filename:'jordancarter_award.jpg', filetype:'JPEG', platform:'Press Gazette', published:'2026-07-22', source:'https://pressgazette.co.uk/2026/07/22/jordan-carter-award', desc:'Jordan Carter accepting journalism award. Public ceremony.', author:'Press Gazette', notes:'Publicly published.' },
  ],
  timeline: [
    { id:'T-001', date:'2026-01-10', event:'Public Profile Found', source:'LinkedIn', desc:'Alex Morgan\'s LinkedIn profile discovered during initial search.', notes:'500+ connections. Nova Technologies listed as employer.' },
    { id:'T-002', date:'2026-02-05', event:'Company Website Identified', source:'WHOIS / Google', desc:'Nova Technologies website confirmed active with public contact page and team listing.', notes:'Alex Morgan listed as Senior Engineer.' },
    { id:'T-003', date:'2026-03-14', event:'GitHub Repository Analysed', source:'GitHub.com', desc:'Public GitHub profile for alexmorgan_dev found with 340+ repositories.', notes:'Recent commits to open-source cloud security project.' },
    { id:'T-004', date:'2026-08-15', event:'Public News Article Found', source:'TechCrunch', desc:'TechCrunch article mentions Alex Morgan as lead engineer for new security platform launch.', notes:'High relevance. Corroborates employer information.' },
    { id:'T-005', date:'2026-09-20', event:'Profile Bio Updated', source:'LinkedIn', desc:'Alex Morgan updated their LinkedIn bio to include conference speaking credentials.', notes:'Added DevConf 2025 speaker tag.' },
  ],
  sources: [
    { id:'SRC-001', title:'Alex Morgan GitHub Profile', type:'GitHub', reliability:'High', url:'https://github.com/alexmorgan_dev', desc:'Public GitHub profile with 340+ repos. Activity dates back to 2015.', person:'Alex Morgan', case:'CASE-001', tags:['github','code','profile'], collected:'2026-01-15' },
    { id:'SRC-002', title:'Nova Technologies – Public About Page', type:'Website', reliability:'High', url:'https://novatechnologies.com/about', desc:'Official about page listing leadership and team members publicly.', person:'Alex Morgan', case:'CASE-001', tags:['website','company','bio'], collected:'2026-02-10' },
    { id:'SRC-003', title:'DEF CON 33 Speaker Bio', type:'Public Document', reliability:'High', url:'https://defcon.org/speakers/nova-rivera', desc:'Official DEF CON conference speaker bio for Nova Rivera.', person:'Nova Rivera', case:'CASE-003', tags:['conference','bio','security'], collected:'2026-08-12' },
    { id:'SRC-004', title:'Jordan Carter – Wired Profile', type:'News Article', reliability:'High', url:'https://wired.com/author/jordan-carter', desc:'Author profile page on Wired listing published articles.', person:'Jordan Carter', case:'CASE-003', tags:['journalism','profile','media'], collected:'2026-03-20' },
  ],
  notes: [
    { id:'NOTE-001', title:'Alex Morgan – Key Findings', body:'Confirmed public employer: Nova Technologies. LinkedIn shows 8 years experience. GitHub shows active open-source contributions. No social media accounts found beyond LinkedIn and GitHub.', case:'CASE-001', person:'Alex Morgan', tags:['findings','confirmed'], created:'2026-01-20', updated:'2026-09-20' },
    { id:'NOTE-002', title:'Nova Tech Domain Notes', body:'WHOIS shows Namecheap as registrar. Cloudflare CDN detected via headers. No OSINT vulnerabilities. Public contact page lists support@novatechnologies.com. Annual report PDF publicly downloadable from /investors.', case:'CASE-002', person:'', tags:['domain','tech','company'], created:'2026-02-08', updated:'2026-08-05' },
    { id:'NOTE-003', title:'Jordan Carter Social Media Summary', body:'Verified Twitter account with 32K followers. Active Medium publication with 15 articles in 2025. Personal website with public contact form. No Instagram or Facebook found under this name.', case:'CASE-003', person:'Jordan Carter', tags:['social','journalism','verified'], created:'2026-03-16', updated:'2026-08-30' },
    { id:'NOTE-004', title:'Research Ethics Reminder', body:'All data collected in this workspace must be from publicly available sources only. No private account access, no credential harvesting, no real-time location tracking. This workspace is for lawful OSINT research only.', case:'', person:'', tags:['ethics','reminder'], created:'2026-01-01', updated:'2026-01-01' },
  ],
  mapNodes: [
    { id:'MN-001', label:'Alex Morgan', type:'person', x:300, y:150 },
    { id:'MN-002', label:'Nova Technologies', type:'org', x:500, y:100 },
    { id:'MN-003', label:'alexmorgan.dev', type:'website', x:150, y:280 },
    { id:'MN-004', label:'Cloud Security Project', type:'project', x:500, y:280 },
    { id:'MN-005', label:'LinkedIn Profile', type:'profile', x:300, y:340 },
  ],
  mapEdges: [
    { from:'MN-001', to:'MN-002', label:'Works At' },
    { from:'MN-001', to:'MN-003', label:'Owns' },
    { from:'MN-001', to:'MN-005', label:'Has Profile' },
    { from:'MN-001', to:'MN-004', label:'Created' },
    { from:'MN-002', to:'MN-004', label:'Sponsors' },
  ],
};

const PLATFORM_CONFIG = {
  'GitHub':         { icon:'💻', color:'#238636' },
  'Reddit':         { icon:'🔴', color:'#ff4500' },
  'YouTube':        { icon:'▶️', color:'#ff0000' },
  'Instagram':      { icon:'📸', color:'#e1306c' },
  'X / Twitter':    { icon:'🐦', color:'#1da1f2' },
  'Facebook':       { icon:'📘', color:'#1877f2' },
  'LinkedIn':       { icon:'💼', color:'#0077b5' },
  'TikTok':         { icon:'🎵', color:'#010101' },
  'Medium':         { icon:'✍️', color:'#00ab6c' },
  'Telegram':       { icon:'✈️', color:'#0088cc' },
  'Personal Website':{ icon:'🌐', color:'#7b5ea7' },
  'Blog':           { icon:'✏️', color:'#ff6b35' },
  'Other':          { icon:'🔗', color:'#00d4ff' },
};

const USERNAME_PLATFORMS = [
  { name:'GitHub',    icon:'💻', urlTpl:'https://github.com/{u}' },
  { name:'Reddit',    icon:'🔴', urlTpl:'https://reddit.com/u/{u}' },
  { name:'YouTube',   icon:'▶️', urlTpl:'https://youtube.com/@{u}' },
  { name:'Instagram', icon:'📸', urlTpl:'https://instagram.com/{u}' },
  { name:'X / Twitter',icon:'🐦',urlTpl:'https://x.com/{u}' },
  { name:'Facebook',  icon:'📘', urlTpl:'https://facebook.com/{u}' },
  { name:'LinkedIn',  icon:'💼', urlTpl:'https://linkedin.com/in/{u}' },
  { name:'TikTok',    icon:'🎵', urlTpl:'https://tiktok.com/@{u}' },
  { name:'Medium',    icon:'✍️', urlTpl:'https://medium.com/@{u}' },
  { name:'Telegram',  icon:'✈️', urlTpl:'https://t.me/{u}' },
  { name:'Pinterest', icon:'📌', urlTpl:'https://pinterest.com/{u}' },
];

const STATUS_CONFIG = {
  'Open':        { cls:'badge-blue',   icon:'🔵' },
  'Researching': { cls:'badge-yellow', icon:'🟡' },
  'Waiting':     { cls:'badge-orange', icon:'🟠' },
  'Completed':   { cls:'badge-green',  icon:'🟢' },
  'Archived':    { cls:'badge-gray',   icon:'⚪' },
};

const PRIORITY_CONFIG = {
  'Low':      'badge-gray',
  'Medium':   'badge-blue',
  'High':     'badge-yellow',
  'Critical': 'badge-red',
};

const NODE_TYPE_CONFIG = {
  person:  { icon:'👤', label:'Person' },
  org:     { icon:'🏢', label:'Organization' },
  website: { icon:'🌐', label:'Website' },
  project: { icon:'📁', label:'Project' },
  profile: { icon:'📱', label:'Profile' },
  event:   { icon:'📅', label:'Event' },
};

/* ═══════════════════════════════════════════════════════════════
   STORAGE LAYER
   ═══════════════════════════════════════════════════════════════ */

const DB = {
  _key(name) { return `osint_${name}`; },
  get(name)   { try { return JSON.parse(localStorage.getItem(this._key(name))) || []; } catch { return []; } },
  set(name,v) { localStorage.setItem(this._key(name), JSON.stringify(v)); },
  getPref(k,d){ const v = localStorage.getItem(`osint_pref_${k}`); return v === null ? d : JSON.parse(v); },
  setPref(k,v){ localStorage.setItem(`osint_pref_${k}`, JSON.stringify(v)); },
};

/* ═══════════════════════════════════════════════════════════════
   UTILITY HELPERS
   ═══════════════════════════════════════════════════════════════ */

function uid() {
  return Math.random().toString(36).slice(2,9).toUpperCase();
}

function now() {
  return new Date().toISOString().slice(0,10);
}

function esc(str) {
  const d = document.createElement('div');
  d.textContent = str || '';
  return d.innerHTML;
}

function truncate(str='', n=80) {
  return str.length > n ? str.slice(0,n) + '…' : str;
}

function badge(text, cls='badge-gray') {
  return `<span class="badge ${cls}">${esc(text)}</span>`;
}

function statusBadge(status) {
  const c = STATUS_CONFIG[status] || { cls:'badge-gray', icon:'⚪' };
  return `<span class="badge ${c.cls}"><span class="badge-dot ${c.cls.replace('badge-','').split('-')[0]}"></span>${esc(status)}</span>`;
}

function priorityBadge(p) {
  return badge(p, PRIORITY_CONFIG[p] || 'badge-gray');
}

function formatDate(d) {
  if (!d) return '—';
  try { return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }); }
  catch { return d; }
}

/* ═══════════════════════════════════════════════════════════════
   APP CONTROLLER
   ═══════════════════════════════════════════════════════════════ */

const App = (() => {

  /* ─── State ─────────────────────────────────────────────────── */
  let _currentPage = 'dashboard';
  let _selectedPersonId = null;
  let _newsView = 'table';
  let _mapScale = 1;
  let _mapOffsetX = 0;
  let _mapOffsetY = 0;
  let _draggingNode = null;
  let _dragOffX = 0;
  let _dragOffY = 0;

  /* ─── Init ──────────────────────────────────────────────────── */
  function init() {
    _applyPrefs();
    _bindNav();
    _bindSearch();
    _bindTheme();
    _bindHamburger();
    _bindSidebarToggle();
    loadDemoData(false);
    _renderAll();
    navigate('dashboard');
  }

  function _applyPrefs() {
    const theme = DB.getPref('theme','dark');
    document.documentElement.setAttribute('data-theme', theme);
    _updateThemeBtn(theme);

    if (DB.getPref('sidebarCollapsed', false)) {
      document.getElementById('app').classList.add('sidebar-collapsed');
    }

    if (DB.getPref('compact', false)) {
      document.body.classList.add('compact');
    }
  }

  /* ─── Demo Data ─────────────────────────────────────────────── */
  function loadDemoData(force = false) {
    const loaded = DB.getPref('demoLoaded', false);
    if (loaded && !force) return;

    Object.keys(DEMO_DATA).forEach(k => DB.set(k, DEMO_DATA[k]));
    DB.setPref('demoLoaded', true);

    if (force) {
      _renderAll();
      toast('Demo data loaded!', 'success');
    }
  }

  /* ─── Navigation ─────────────────────────────────────────────── */
  function navigate(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.page === page);
      n.setAttribute('aria-current', n.dataset.page === page ? 'page' : 'false');
    });
    const pg = document.getElementById(`page-${page}`);
    if (pg) pg.classList.add('active');
    _currentPage = page;

    // Re-render page-specific content
    const renders = {
      dashboard: () => { renderDashboard(); renderActivityFeed(); },
      people: renderPeople,
      profiles: renderSocialProfiles,
      domains: renderDomains,
      contacts: renderContacts,
      news: renderNews,
      geography: renderGeo,
      media: renderMedia,
      relationships: renderRelationshipMap,
      timeline: renderTimeline,
      sources: renderSources,
      cases: renderCases,
      notes: renderNotes,
    };
    if (renders[page]) renders[page]();

    // Close mobile sidebar
    const sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('mobile-open')) {
      sidebar.classList.remove('mobile-open');
      document.getElementById('sidebarOverlay').style.display = 'none';
    }
    // Scroll to top
    document.getElementById('main').scrollTop = 0;
  }

  function _bindNav() {
    document.querySelectorAll('.nav-item[data-page]').forEach(btn => {
      btn.addEventListener('click', () => navigate(btn.dataset.page));
    });
  }

  /* ─── Sidebar ───────────────────────────────────────────────── */
  function _bindSidebarToggle() {
    document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);
  }

  function toggleSidebar() {
    const app = document.getElementById('app');
    const collapsed = app.classList.toggle('sidebar-collapsed');
    DB.setPref('sidebarCollapsed', collapsed);
    const icon = document.getElementById('sidebarToggleIcon');
    icon.textContent = collapsed ? '▶' : '◀';
    const setting = document.getElementById('sidebarToggleSetting');
    if (setting) setting.classList.toggle('active', collapsed);
  }

  function _bindHamburger() {
    const btn = document.getElementById('hamburgerBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    btn.addEventListener('click', () => {
      const open = sidebar.classList.toggle('mobile-open');
      btn.setAttribute('aria-expanded', open);
      overlay.style.display = open ? 'block' : 'none';
    });

    overlay.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
      overlay.style.display = 'none';
      btn.setAttribute('aria-expanded', 'false');
    });
  }

  /* ─── Theme ─────────────────────────────────────────────────── */
  function _bindTheme() {
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  }

  function toggleTheme() {
    const cur = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    DB.setPref('theme', next);
    _updateThemeBtn(next);
    const setting = document.getElementById('themeToggleSetting');
    if (setting) setting.classList.toggle('active', next === 'dark');
    toast(`Switched to ${next} theme`, 'info');
  }

  function _updateThemeBtn(theme) {
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    const setting = document.getElementById('themeToggleSetting');
    if (setting) setting.classList.toggle('active', theme === 'dark');
  }

  function toggleCompact() {
    const on = document.body.classList.toggle('compact');
    DB.setPref('compact', on);
    document.getElementById('compactToggle').classList.toggle('active', on);
  }

  /* ─── Search ─────────────────────────────────────────────────── */
  function _bindSearch() {
    const input = document.getElementById('globalSearch');
    const dropdown = document.getElementById('searchDropdown');

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (!q) { dropdown.classList.remove('show'); return; }
      const results = _searchAll(q);
      _renderSearchDropdown(results);
      dropdown.classList.toggle('show', results.length > 0);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { dropdown.classList.remove('show'); input.value = ''; }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.header-search')) dropdown.classList.remove('show');
    });
  }

  function _searchAll(q) {
    const results = [];
    DB.get('people').forEach(p => { if ((p.name+p.username+p.alias).toLowerCase().includes(q)) results.push({ icon:'👤', text:p.name, sub:'Person', page:'people', id:p.id }); });
    DB.get('cases').forEach(c => { if ((c.name+c.subject).toLowerCase().includes(q)) results.push({ icon:'📁', text:c.name, sub:'Case', page:'cases' }); });
    DB.get('domains').forEach(d => { if (d.domain.toLowerCase().includes(q)) results.push({ icon:'🌐', text:d.domain, sub:'Domain', page:'domains' }); });
    DB.get('notes').forEach(n => { if ((n.title+n.body).toLowerCase().includes(q)) results.push({ icon:'📝', text:n.title, sub:'Note', page:'notes' }); });
    DB.get('sources').forEach(s => { if ((s.title+s.desc).toLowerCase().includes(q)) results.push({ icon:'📚', text:s.title, sub:'Source', page:'sources' }); });
    DB.get('socialProfiles').forEach(sp => { if ((sp.username+sp.displayName+sp.platform).toLowerCase().includes(q)) results.push({ icon:'📱', text:`${sp.platform}: ${sp.username}`, sub:'Profile', page:'profiles' }); });
    return results.slice(0, 10);
  }

  function _renderSearchDropdown(results) {
    const dd = document.getElementById('searchDropdown');
    dd.innerHTML = results.map(r => `
      <div class="search-result-item" role="option" onclick="App.navigate('${esc(r.page)}');document.getElementById('searchDropdown').classList.remove('show');document.getElementById('globalSearch').value='';">
        <span class="search-result-icon">${r.icon}</span>
        <div>
          <div class="search-result-text">${esc(r.text)}</div>
          <div class="search-result-type">${esc(r.sub)}</div>
        </div>
      </div>
    `).join('');
  }

  /* ─── Toast ─────────────────────────────────────────────────── */
  function toast(msg, type='info') {
    const icons = { success:'✅', error:'❌', warning:'⚠️', info:'ℹ️' };
    const container = document.getElementById('toast-container');
    const el = document.createElement('div');
    el.className = `toast ${type === 'info' ? '' : type}`;
    el.innerHTML = `<span class="toast-icon">${icons[type]||'ℹ️'}</span><span class="toast-msg">${esc(msg)}</span>`;
    container.appendChild(el);
    setTimeout(() => {
      el.classList.add('out');
      el.addEventListener('animationend', () => el.remove(), { once:true });
    }, 3500);
  }

  /* ─── Modal ─────────────────────────────────────────────────── */
  function openModal(id) {
    const dlg = document.getElementById(id);
    if (dlg) dlg.showModal();
  }

  function closeModal(id) {
    const dlg = document.getElementById(id);
    if (dlg) dlg.close();
  }

  /* ─── Confirm Dialog ────────────────────────────────────────── */
  function confirm(msg, cb) {
    document.getElementById('confirmMessage').textContent = msg;
    const btn = document.getElementById('confirmOkBtn');
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener('click', () => { closeModal('modalConfirm'); cb(); }, { once:true });
    openModal('modalConfirm');
  }

  /* ─── Render All ─────────────────────────────────────────────── */
  function _renderAll() {
    renderDashboard();
    renderActivityFeed();
    renderPeople();
    renderSocialProfiles();
    renderDomains();
    renderContacts();
    renderNews();
    renderGeo();
    renderMedia();
    renderTimeline();
    renderSources();
    renderCases();
    renderNotes();
  }

  /* ═══════════════════════════════════════════
     DASHBOARD
  ═══════════════════════════════════════════ */
  function renderDashboard() {
    const cases = DB.get('cases');
    const people = DB.get('people');
    const sources = DB.get('sources');
    const notes = DB.get('notes');
    const media = DB.get('media');

    _setInner('stat-cases', cases.length);
    _setInner('stat-active', cases.filter(c => ['Open','Researching'].includes(c.status)).length);
    _setInner('stat-people', people.length);
    _setInner('stat-sources', sources.length);
    _setInner('stat-notes', notes.length);
    _setInner('stat-evidence', media.length + sources.length);
    _setInner('badge-cases', cases.filter(c => c.status === 'Open').length);

    // Recent cases table
    const tbody = document.getElementById('recentCasesBody');
    const recent = [...cases].sort((a,b) => b.updated.localeCompare(a.updated)).slice(0,6);
    tbody.innerHTML = recent.map(c => `
      <tr>
        <td class="td-mono">${esc(c.id)}</td>
        <td><strong>${esc(c.subject)}</strong></td>
        <td>${esc(c.category)}</td>
        <td>${badge(sources.filter(s => s.case === c.id).length + ' sources', 'badge-blue')}</td>
        <td>${statusBadge(c.status)}</td>
        <td class="text-muted text-sm">${formatDate(c.updated)}</td>
      </tr>
    `).join('') || '<tr><td colspan="6" class="empty-state" style="padding:1.5rem;text-align:center;">No cases yet</td></tr>';
  }

  function renderActivityFeed() {
    const feed = document.getElementById('activityFeed');
    const items = [
      { dot:'green', text:'<strong>CASE-007</strong> opened — SkyWatcher99 username investigation', time:'2h ago' },
      { dot:'', text:'Alex Morgan profile updated with DevConf credentials', time:'5h ago' },
      { dot:'yellow', text:'Domain <strong>datastream.io</strong> flagged for review', time:'1d ago' },
      { dot:'green', text:'3 new public sources added to CASE-001', time:'2d ago' },
      { dot:'', text:'Timeline event: Nova Rivera DEF CON keynote confirmed', time:'3d ago' },
      { dot:'red', text:'CASE-005 status changed to <strong>Waiting</strong>', time:'4d ago' },
      { dot:'green', text:'Note added: Jordan Carter social media summary', time:'5d ago' },
    ];
    feed.innerHTML = items.map(i => `
      <div class="activity-item">
        <div class="activity-dot ${esc(i.dot)}"></div>
        <div>
          <div class="activity-text">${i.text}</div>
          <div class="activity-time">${esc(i.time)}</div>
        </div>
      </div>
    `).join('');
  }

  /* ═══════════════════════════════════════════
     PEOPLE
  ═══════════════════════════════════════════ */
  function renderPeople() {
    const people = DB.get('people');
    const search = (document.getElementById('peopleSearch')?.value || '').toLowerCase();
    const filtered = people.filter(p => (p.name+p.username+p.org).toLowerCase().includes(search));

    const list = document.getElementById('peopleList');
    list.innerHTML = filtered.length ? filtered.map(p => `
      <button class="nav-item ${p.id === _selectedPersonId ? 'active' : ''}" style="border-radius:var(--radius-sm);margin-bottom:.25rem;padding:.55rem .75rem;" onclick="App.selectPerson('${esc(p.id)}')">
        <div class="profile-avatar-large" style="width:32px;height:32px;font-size:.9rem;border-width:2px;flex-shrink:0;">
          ${p.photo ? `<img src="${esc(p.photo)}" alt="" onerror="this.parentNode.textContent='${esc(p.name[0]||'?')}'" />` : esc(p.name[0]||'?')}
        </div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:.85rem;font-weight:600;color:var(--text-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(p.name)}</div>
          <div style="font-size:.72rem;color:var(--text-muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(p.occupation||'No occupation')}</div>
        </div>
      </button>
    `).join('') : '<div class="text-muted text-sm" style="padding:.5rem;">No profiles found</div>';

    document.getElementById('peopleSearch')?.addEventListener('input', renderPeople);
    if (_selectedPersonId) selectPerson(_selectedPersonId);
  }

  function selectPerson(id) {
    _selectedPersonId = id;
    const p = DB.get('people').find(x => x.id === id);
    const detail = document.getElementById('personDetail');
    if (!p || !detail) return;

    // Refresh list highlight
    document.querySelectorAll('#peopleList .nav-item').forEach(b => b.classList.remove('active'));

    const age = p.dob ? Math.floor((Date.now() - new Date(p.dob)) / 31557600000) : null;

    detail.innerHTML = `
      <div class="card mb-4 scan-line">
        <div class="profile-header">
          <div class="profile-avatar-large">
            ${p.photo ? `<img src="${esc(p.photo)}" alt="${esc(p.name)}" onerror="this.style.display='none'" />` : esc(p.name[0]||'?')}
          </div>
          <div class="profile-meta">
            <div class="profile-name">${esc(p.name)}</div>
            ${p.occupation ? `<div class="profile-title">${esc(p.occupation)}${p.org ? ' @ ' + esc(p.org) : ''}</div>` : ''}
            ${p.bio ? `<p class="profile-bio">${esc(p.bio)}</p>` : ''}
            <div class="profile-tags">
              ${p.country ? badge(p.country,'badge-blue') : ''}
              ${p.languages ? badge(p.languages,'badge-gray') : ''}
            </div>
          </div>
          <div style="display:flex;gap:.4rem;flex-shrink:0;">
            <button class="btn btn-sm btn-outline" onclick="App.editPerson('${esc(id)}')">✏️ Edit</button>
            <button class="btn btn-sm btn-danger" onclick="App.deletePerson('${esc(id)}')">🗑️</button>
          </div>
        </div>

        <div class="tabs">
          <button class="tab-btn active" onclick="App._switchTab(this,'ptab-basic')">Basic Info</button>
          <button class="tab-btn" onclick="App._switchTab(this,'ptab-bio')">Biography</button>
          <button class="tab-btn" onclick="App._switchTab(this,'ptab-notes')">Notes</button>
        </div>

        <div class="tab-panel active" id="ptab-basic">
          <div class="form-row">
            ${_infoField('Full Name', p.name)}
            ${_infoField('Alias / Nickname', p.alias)}
            ${_infoField('Username', p.username)}
            ${age ? _infoField('Age', age + ' yrs') : ''}
            ${p.dob ? _infoField('Date of Birth (Public)', p.dob) : ''}
            ${_infoField('Nationality', p.nationality)}
            ${_infoField('Country', p.country)}
            ${_infoField('City', p.city)}
            ${_infoField('Occupation', p.occupation)}
            ${_infoField('Organization', p.org)}
            ${_infoField('Languages', p.languages)}
          </div>
          ${p.website ? `<a href="${esc(p.website)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary mt-2">🔗 Open Website</a>` : ''}
        </div>

        <div class="tab-panel" id="ptab-bio">
          <div class="form-group">
            <div class="form-label">Public Biography</div>
            <div style="background:var(--bg-secondary);border-radius:var(--radius-sm);padding:.75rem;font-size:.82rem;line-height:1.6;color:var(--text-secondary);min-height:80px;">${esc(p.bio) || '<em>No biography recorded</em>'}</div>
          </div>
        </div>

        <div class="tab-panel" id="ptab-notes">
          <div style="background:var(--bg-secondary);border-radius:var(--radius-sm);padding:.75rem;font-size:.82rem;line-height:1.6;color:var(--text-secondary);">${esc(p.notes) || '<em>No research notes</em>'}</div>
        </div>
      </div>
    `;

    renderPeople();
  }

  function _infoField(label, val) {
    if (!val) return '';
    return `
      <div class="form-group" style="margin-bottom:.5rem;">
        <div class="form-label">${esc(label)}</div>
        <div style="font-size:.85rem;color:var(--text-primary);">${esc(val)}</div>
      </div>
    `;
  }

  function _switchTab(btn, panelId) {
    const container = btn.closest('.card') || btn.closest('.page');
    container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById(panelId);
    if (panel) panel.classList.add('active');
  }

  function savePerson(e) {
    e.preventDefault();
    const editId = document.getElementById('p-edit-id').value;
    const people = DB.get('people');

    const p = {
      id: editId || 'P-' + uid(),
      name: document.getElementById('p-name').value.trim(),
      alias: document.getElementById('p-alias').value.trim(),
      username: document.getElementById('p-username').value.trim(),
      photo: document.getElementById('p-photo').value.trim(),
      dob: document.getElementById('p-dob').value,
      nationality: document.getElementById('p-nationality').value.trim(),
      country: document.getElementById('p-country').value.trim(),
      city: document.getElementById('p-city').value.trim(),
      state: '',
      occupation: document.getElementById('p-occupation').value.trim(),
      org: document.getElementById('p-org').value.trim(),
      website: document.getElementById('p-website').value.trim(),
      bio: document.getElementById('p-bio').value.trim(),
      languages: document.getElementById('p-languages').value.trim(),
      notes: document.getElementById('p-notes').value.trim(),
    };

    if (editId) {
      const idx = people.findIndex(x => x.id === editId);
      if (idx > -1) people[idx] = p;
    } else {
      people.push(p);
    }

    DB.set('people', people);
    closeModal('modalNewPerson');
    _clearForm('formNewPerson');
    _selectedPersonId = p.id;
    renderPeople();
    toast(`Profile "${p.name}" saved!`, 'success');
  }

  function editPerson(id) {
    const p = DB.get('people').find(x => x.id === id);
    if (!p) return;
    _fillForm({ 'p-name':p.name, 'p-alias':p.alias, 'p-username':p.username, 'p-photo':p.photo, 'p-dob':p.dob, 'p-nationality':p.nationality, 'p-country':p.country, 'p-city':p.city, 'p-occupation':p.occupation, 'p-org':p.org, 'p-website':p.website, 'p-bio':p.bio, 'p-languages':p.languages, 'p-notes':p.notes, 'p-edit-id':p.id });
    openModal('modalNewPerson');
  }

  function deletePerson(id) {
    const p = DB.get('people').find(x => x.id === id);
    confirm(`Delete profile "${p?.name}"? This cannot be undone.`, () => {
      DB.set('people', DB.get('people').filter(x => x.id !== id));
      _selectedPersonId = null;
      document.getElementById('personDetail').innerHTML = '<div class="empty-state"><span class="empty-state-icon">👤</span><p class="empty-state-text">Select a profile</p></div>';
      renderPeople();
      toast('Profile deleted.', 'warning');
    });
  }

  /* ═══════════════════════════════════════════
     SOCIAL PROFILES
  ═══════════════════════════════════════════ */
  function renderSocialProfiles() {
    const profiles = DB.get('socialProfiles');
    const grid = document.getElementById('socialProfileGrid');

    grid.innerHTML = profiles.length ? profiles.map(sp => {
      const cfg = PLATFORM_CONFIG[sp.platform] || PLATFORM_CONFIG['Other'];
      return `
        <div class="social-card" style="--platform-color:${cfg.color};">
          <div class="social-platform">
            <div class="platform-icon" style="background:${cfg.color};">${cfg.icon}</div>
            <div>
              <div class="platform-name">${esc(sp.platform)}</div>
              <div class="platform-type">${esc(sp.type)} · ${esc(sp.verified)}</div>
            </div>
            ${sp.verified === 'Verified ✓' ? '<span title="Verified" style="margin-left:auto;color:#1da1f2;">✓</span>' : ''}
          </div>
          <div class="social-info">
            <strong>@${esc(sp.username)}</strong><br/>
            ${sp.displayName ? `Name: ${esc(sp.displayName)}<br/>` : ''}
            ${sp.person ? `Person: ${esc(sp.person)}<br/>` : ''}
            ${sp.bio ? `<span style="color:var(--text-muted);font-size:.75rem;font-style:italic;">"${esc(truncate(sp.bio,80))}"</span>` : ''}
          </div>
          ${sp.notes ? `<div style="font-size:.72rem;color:var(--text-muted);margin-top:.4rem;">${esc(truncate(sp.notes,60))}</div>` : ''}
          <div class="social-footer">
            ${sp.url ? `<a href="${esc(sp.url)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">🔗 Open Profile</a>` : '<span></span>'}
            <div class="flex gap-1">
              <button class="btn btn-sm btn-secondary btn-icon" onclick="App.editSocialProfile('${esc(sp.id)}')" title="Edit">✏️</button>
              <button class="btn btn-sm btn-danger btn-icon" onclick="App.deleteSocialProfile('${esc(sp.id)}')" title="Delete">🗑️</button>
            </div>
          </div>
        </div>
      `;
    }).join('') : `<div class="empty-state"><span class="empty-state-icon">📱</span><p class="empty-state-text">No social profiles recorded</p><button class="btn btn-primary" onclick="App.openModal('modalNewProfile')">➕ Add Profile</button></div>`;
  }

  function saveSocialProfile(e) {
    e.preventDefault();
    const editId = document.getElementById('sp-edit-id').value;
    const profiles = DB.get('socialProfiles');
    const sp = {
      id: editId || 'SP-' + uid(),
      platform: document.getElementById('sp-platform').value,
      username: document.getElementById('sp-username').value.trim(),
      url: document.getElementById('sp-url').value.trim(),
      displayName: document.getElementById('sp-displayname').value.trim(),
      type: document.getElementById('sp-type').value,
      verified: document.getElementById('sp-verified').value,
      person: document.getElementById('sp-person').value.trim(),
      bio: document.getElementById('sp-bio').value.trim(),
      notes: document.getElementById('sp-notes').value.trim(),
    };
    if (editId) { const i = profiles.findIndex(x=>x.id===editId); if(i>-1) profiles[i]=sp; }
    else profiles.push(sp);
    DB.set('socialProfiles', profiles);
    closeModal('modalNewProfile');
    _clearForm('formNewProfile');
    renderSocialProfiles();
    toast('Social profile saved!', 'success');
  }

  function editSocialProfile(id) {
    const sp = DB.get('socialProfiles').find(x=>x.id===id);
    if(!sp) return;
    _fillForm({'sp-platform':sp.platform,'sp-username':sp.username,'sp-url':sp.url,'sp-displayname':sp.displayName,'sp-type':sp.type,'sp-verified':sp.verified,'sp-person':sp.person,'sp-bio':sp.bio,'sp-notes':sp.notes,'sp-edit-id':sp.id});
    openModal('modalNewProfile');
  }

  function deleteSocialProfile(id) {
    confirm('Delete this social profile?', () => {
      DB.set('socialProfiles', DB.get('socialProfiles').filter(x=>x.id!==id));
      renderSocialProfiles();
      toast('Deleted.', 'warning');
    });
  }

  /* ═══════════════════════════════════════════
     USERNAME INVESTIGATION
  ═══════════════════════════════════════════ */
  function searchUsername() {
    const u = document.getElementById('usernameInput').value.trim();
    if (!u) { toast('Please enter a username', 'warning'); return; }

    const grid = document.getElementById('usernameResultGrid');
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;"><div class="spinner"></div><p class="text-muted mt-2">Generating mock results…</p></div>';

    setTimeout(() => {
      const statuses = ['Found','Not Checked','Possible Match','No Match'];
      const statusBadgeMap = {
        'Found':         { cls:'badge-green',  dot:'🟢' },
        'Not Checked':   { cls:'badge-gray',   dot:'⚪' },
        'Possible Match':{ cls:'badge-yellow', dot:'🟡' },
        'No Match':      { cls:'badge-red',    dot:'🔴' },
      };
      const notes = ['Mock result — verify manually','Not confirmed','Demo data only','Please verify directly'];

      grid.innerHTML = USERNAME_PLATFORMS.map(pl => {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const sb = statusBadgeMap[status];
        const url = pl.urlTpl.replace('{u}', u);
        return `
          <div class="platform-result-card">
            <div class="platform-result-icon">${pl.icon}</div>
            <div style="flex:1;min-width:0;">
              <div class="platform-result-name">${esc(pl.name)}</div>
              <div class="platform-result-url">${esc(url)}</div>
              <div class="mt-2 flex gap-2 items-center flex-wrap">
                <span class="badge ${sb.cls}">${sb.dot} ${esc(status)}</span>
              </div>
              <div class="platform-result-notes">${esc(notes[Math.floor(Math.random()*notes.length)])}</div>
              <a href="${esc(url)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline mt-2" style="font-size:.7rem;">🔗 Open</a>
            </div>
          </div>
        `;
      }).join('');

      toast(`Mock results generated for "@${u}". Verify each URL manually.`, 'info');
    }, 900);
  }

  function clearUsernameResults() {
    document.getElementById('usernameInput').value = '';
    document.getElementById('usernameResultGrid').innerHTML = `<div class="empty-state"><span class="empty-state-icon">🔎</span><p class="empty-state-text">Enter a username above and click Check Platforms</p></div>`;
  }

  /* ═══════════════════════════════════════════
     DOMAINS
  ═══════════════════════════════════════════ */
  function renderDomains() {
    const domains = DB.get('domains');
    const container = document.getElementById('domainsList');
    container.innerHTML = domains.length ? `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1.25rem;">
        ${domains.map(d => `
          <div class="card">
            <div class="card-header">
              <div class="card-title">🌐 ${esc(d.domain)}</div>
              <div class="flex gap-1">
                <button class="btn btn-sm btn-secondary btn-icon" onclick="App.editDomain('${esc(d.id)}')" title="Edit">✏️</button>
                <button class="btn btn-sm btn-danger btn-icon" onclick="App.deleteDomain('${esc(d.id)}')" title="Delete">🗑️</button>
              </div>
            </div>
            <div class="flex gap-2 mb-2 flex-wrap">
              ${badge(d.status, d.status === 'Active' ? 'badge-green' : 'badge-gray')}
              ${badge(d.ssl, d.ssl.includes('Valid') ? 'badge-green' : 'badge-yellow')}
            </div>
            <div class="social-info">
              ${d.title ? `<strong>${esc(d.title)}</strong><br/>` : ''}
              ${d.org ? `Org: ${esc(d.org)}<br/>` : ''}
              ${d.email ? `Email: <a href="mailto:${esc(d.email)}">${esc(d.email)}</a><br/>` : ''}
              ${d.tech ? `Tech: ${esc(d.tech)}<br/>` : ''}
              ${d.hosting ? `Host: ${esc(d.hosting)}<br/>` : ''}
              ${d.registrar ? `Registrar: ${esc(d.registrar)}<br/>` : ''}
            </div>
            ${d.notes ? `<div class="form-hint mt-2">${esc(truncate(d.notes))}</div>` : ''}
            <div class="flex gap-2 mt-3">
              ${d.url ? `<a href="${esc(d.url)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">🔗 Open</a>` : ''}
              <button class="btn btn-sm btn-secondary" onclick="navigator.clipboard.writeText('${esc(d.domain)}');App.toast('Copied!','success')">📋 Copy</button>
            </div>
          </div>
        `).join('')}
      </div>
    ` : `<div class="empty-state"><span class="empty-state-icon">🌐</span><p class="empty-state-text">No domains recorded yet</p><button class="btn btn-primary" onclick="App.openModal('modalNewDomain')">➕ Add Domain</button></div>`;
  }

  function saveDomain(e) {
    e.preventDefault();
    const editId = document.getElementById('d-edit-id').value;
    const domains = DB.get('domains');
    const d = { id: editId || 'D-'+uid(), domain: document.getElementById('d-domain').value.trim(), title: document.getElementById('d-title').value.trim(), url: document.getElementById('d-url').value.trim(), org: document.getElementById('d-org').value.trim(), status: document.getElementById('d-status').value, ssl: document.getElementById('d-ssl').value, registrar: document.getElementById('d-registrar').value.trim(), email: document.getElementById('d-email').value.trim(), tech: document.getElementById('d-tech').value.trim(), hosting: document.getElementById('d-hosting').value.trim(), notes: document.getElementById('d-notes').value.trim() };
    if (editId) { const i = domains.findIndex(x=>x.id===editId); if(i>-1) domains[i]=d; } else domains.push(d);
    DB.set('domains', domains);
    closeModal('modalNewDomain');
    _clearForm('formNewDomain');
    renderDomains();
    toast('Domain saved!', 'success');
  }

  function editDomain(id) {
    const d = DB.get('domains').find(x=>x.id===id);
    if(!d) return;
    _fillForm({'d-domain':d.domain,'d-title':d.title,'d-url':d.url,'d-org':d.org,'d-status':d.status,'d-ssl':d.ssl,'d-registrar':d.registrar,'d-email':d.email,'d-tech':d.tech,'d-hosting':d.hosting,'d-notes':d.notes,'d-edit-id':d.id});
    openModal('modalNewDomain');
  }

  function deleteDomain(id) {
    confirm('Delete this domain record?', () => {
      DB.set('domains', DB.get('domains').filter(x=>x.id!==id));
      renderDomains();
      toast('Domain deleted.', 'warning');
    });
  }

  /* ═══════════════════════════════════════════
     CONTACTS
  ═══════════════════════════════════════════ */
  function renderContacts() {
    const contacts = DB.get('contacts');
    const tbody = document.getElementById('contactsTableBody');
    tbody.innerHTML = contacts.length ? contacts.map(c => `
      <tr>
        <td><strong>${esc(c.email)}</strong></td>
        <td class="td-mono">${esc(c.domain)}</td>
        <td>${badge(c.sourcetype,'badge-blue')}</td>
        <td>${c.sourceurl ? `<a href="${esc(c.sourceurl)}" target="_blank" rel="noopener noreferrer" class="text-sm">🔗 Source</a>` : '—'}</td>
        <td class="text-muted text-sm">—</td>
        <td>${badge(c.verified, c.verified==='Verified'?'badge-green':c.verified==='Inactive'?'badge-red':'badge-gray')}</td>
        <td class="text-muted text-sm">${esc(truncate(c.notes,40))}</td>
        <td>
          <div class="flex gap-1">
            <button class="btn btn-sm btn-secondary btn-icon" onclick="App.editContact('${esc(c.id)}')" title="Edit">✏️</button>
            <button class="btn btn-sm btn-danger btn-icon" onclick="App.deleteContact('${esc(c.id)}')" title="Delete">🗑️</button>
          </div>
        </td>
      </tr>
    `).join('') : '<tr><td colspan="8" style="text-align:center;padding:1.5rem;color:var(--text-muted);">No contacts recorded</td></tr>';
  }

  function saveContact(e) {
    e.preventDefault();
    const editId = document.getElementById('c-edit-id').value;
    const contacts = DB.get('contacts');
    const c = { id: editId || 'C-'+uid(), email: document.getElementById('c-email').value.trim(), domain: document.getElementById('c-domain').value.trim(), sourcetype: document.getElementById('c-sourcetype').value, sourceurl: document.getElementById('c-sourceurl').value.trim(), verified: document.getElementById('c-verified').value, notes: document.getElementById('c-notes').value.trim() };
    if (editId) { const i=contacts.findIndex(x=>x.id===editId); if(i>-1) contacts[i]=c; } else contacts.push(c);
    DB.set('contacts', contacts);
    closeModal('modalNewContact');
    _clearForm('formNewContact');
    renderContacts();
    toast('Contact saved!', 'success');
  }

  function editContact(id) {
    const c = DB.get('contacts').find(x=>x.id===id);
    if(!c) return;
    _fillForm({'c-email':c.email,'c-domain':c.domain,'c-sourcetype':c.sourcetype,'c-sourceurl':c.sourceurl,'c-verified':c.verified,'c-notes':c.notes,'c-edit-id':c.id});
    openModal('modalNewContact');
  }

  function deleteContact(id) {
    confirm('Delete this contact record?', () => {
      DB.set('contacts', DB.get('contacts').filter(x=>x.id!==id));
      renderContacts();
      toast('Deleted.', 'warning');
    });
  }

  /* ═══════════════════════════════════════════
     NEWS
  ═══════════════════════════════════════════ */
  function renderNews() {
    const news = DB.get('news').sort((a,b)=>b.date.localeCompare(a.date));
    const tbody = document.getElementById('newsTableBody');
    tbody.innerHTML = news.length ? news.map(n => `
      <tr>
        <td><strong>${esc(n.title)}</strong><br/><span class="text-muted text-xs">${esc(truncate(n.summary,60))}</span></td>
        <td>${esc(n.publication)}</td>
        <td class="td-mono">${formatDate(n.date)}</td>
        <td>${esc(n.author)}</td>
        <td>${badge(n.relevance, n.relevance==='High'?'badge-red':n.relevance==='Medium'?'badge-yellow':'badge-gray')}</td>
        <td>
          <div class="flex gap-1">
            ${n.url ? `<a href="${esc(n.url)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">🔗</a>` : ''}
            <button class="btn btn-sm btn-secondary btn-icon" onclick="App.editNews('${esc(n.id)}')" title="Edit">✏️</button>
            <button class="btn btn-sm btn-danger btn-icon" onclick="App.deleteNews('${esc(n.id)}')" title="Delete">🗑️</button>
          </div>
        </td>
      </tr>
    `).join('') : '<tr><td colspan="6" style="text-align:center;padding:1.5rem;color:var(--text-muted);">No articles recorded</td></tr>';

    // Timeline view
    const tl = document.getElementById('newsTimeline');
    tl.innerHTML = news.map(n => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-date">${formatDate(n.date)}</div>
        <div class="timeline-content">
          <div class="timeline-title">${esc(n.title)}</div>
          <div class="timeline-desc">${esc(truncate(n.summary))}</div>
          <div class="timeline-source">📰 ${esc(n.publication)} ${n.author ? '· ' + esc(n.author) : ''}</div>
          ${n.url ? `<a href="${esc(n.url)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline mt-2">🔗 Read Article</a>` : ''}
        </div>
      </div>
    `).join('') || '<div class="empty-state"><span class="empty-state-icon">📰</span><p>No articles</p></div>';
  }

  function toggleNewsView() {
    _newsView = _newsView === 'table' ? 'timeline' : 'table';
    document.getElementById('newsTableView').classList.toggle('hidden', _newsView !== 'table');
    document.getElementById('newsTimelineView').classList.toggle('hidden', _newsView !== 'timeline');
    document.getElementById('newsViewToggle').textContent = _newsView === 'table' ? '📅 Timeline View' : '📋 Table View';
  }

  function saveNews(e) {
    e.preventDefault();
    const editId = document.getElementById('n-edit-id').value;
    const news = DB.get('news');
    const n = { id: editId || 'N-'+uid(), title: document.getElementById('n-title').value.trim(), publication: document.getElementById('n-publication').value.trim(), date: document.getElementById('n-date').value, author: document.getElementById('n-author').value.trim(), relevance: document.getElementById('n-relevance').value, url: document.getElementById('n-url').value.trim(), summary: document.getElementById('n-summary').value.trim(), notes: document.getElementById('n-notes').value.trim() };
    if (editId) { const i=news.findIndex(x=>x.id===editId); if(i>-1) news[i]=n; } else news.push(n);
    DB.set('news', news);
    closeModal('modalNewNews');
    _clearForm('formNewNews');
    renderNews();
    toast('Article saved!', 'success');
  }

  function editNews(id) {
    const n = DB.get('news').find(x=>x.id===id);
    if(!n) return;
    _fillForm({'n-title':n.title,'n-publication':n.publication,'n-date':n.date,'n-author':n.author,'n-relevance':n.relevance,'n-url':n.url,'n-summary':n.summary,'n-notes':n.notes,'n-edit-id':n.id});
    openModal('modalNewNews');
  }

  function deleteNews(id) {
    confirm('Delete this article?', () => {
      DB.set('news', DB.get('news').filter(x=>x.id!==id));
      renderNews();
      toast('Deleted.', 'warning');
    });
  }

  /* ═══════════════════════════════════════════
     GEO
  ═══════════════════════════════════════════ */
  function renderGeo() {
    const geo = DB.get('geo');
    const tbody = document.getElementById('geoTableBody');
    tbody.innerHTML = geo.length ? geo.map(g => `
      <tr>
        <td><strong>${esc(g.label)}</strong></td>
        <td>${esc(g.country)}</td>
        <td>${esc(g.city)}</td>
        <td>${badge(g.type,'badge-blue')}</td>
        <td>${g.mapurl ? `<a href="${esc(g.mapurl)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">🗺️ Open Map</a>` : '—'}</td>
        <td class="text-muted text-sm">${esc(truncate(g.notes,40))}</td>
        <td>
          <div class="flex gap-1">
            <button class="btn btn-sm btn-secondary btn-icon" onclick="App.editGeo('${esc(g.id)}')" title="Edit">✏️</button>
            <button class="btn btn-sm btn-danger btn-icon" onclick="App.deleteGeo('${esc(g.id)}')" title="Delete">🗑️</button>
          </div>
        </td>
      </tr>
    `).join('') : '<tr><td colspan="7" style="text-align:center;padding:1.5rem;color:var(--text-muted);">No locations recorded</td></tr>';
  }

  function saveGeo(e) {
    e.preventDefault();
    const editId = document.getElementById('g-edit-id').value;
    const geo = DB.get('geo');
    const g = { id: editId || 'G-'+uid(), label: document.getElementById('g-label').value.trim(), type: document.getElementById('g-type').value, country: document.getElementById('g-country').value.trim(), state: document.getElementById('g-state').value.trim(), city: document.getElementById('g-city').value.trim(), mapurl: document.getElementById('g-mapurl').value.trim(), notes: document.getElementById('g-notes').value.trim() };
    if (editId) { const i=geo.findIndex(x=>x.id===editId); if(i>-1) geo[i]=g; } else geo.push(g);
    DB.set('geo', geo);
    closeModal('modalNewGeo');
    _clearForm('formNewGeo');
    renderGeo();
    toast('Location saved!', 'success');
  }

  function editGeo(id) {
    const g = DB.get('geo').find(x=>x.id===id);
    if(!g) return;
    _fillForm({'g-label':g.label,'g-type':g.type,'g-country':g.country,'g-state':g.state,'g-city':g.city,'g-mapurl':g.mapurl,'g-notes':g.notes,'g-edit-id':g.id});
    openModal('modalNewGeo');
  }

  function deleteGeo(id) {
    confirm('Delete this location?', () => {
      DB.set('geo', DB.get('geo').filter(x=>x.id!==id));
      renderGeo();
      toast('Deleted.', 'warning');
    });
  }

  /* ═══════════════════════════════════════════
     MEDIA
  ═══════════════════════════════════════════ */
  function renderMedia() {
    const media = DB.get('media');
    const grid = document.getElementById('mediaGrid');
    grid.innerHTML = media.length ? media.map(m => `
      <div class="card">
        <div style="height:160px;background:var(--bg-secondary);border-radius:var(--radius-sm);overflow:hidden;margin-bottom:.75rem;display:flex;align-items:center;justify-content:center;">
          <img src="${esc(m.url)}" alt="${esc(m.desc||m.filename)}" loading="lazy" style="width:100%;height:100%;object-fit:cover;" onerror="this.parentNode.innerHTML='<span style=font-size:2.5rem>🖼️</span>'" />
        </div>
        <div class="evidence-id">${esc(m.id)}</div>
        <div class="evidence-title">${esc(m.filename || 'Untitled Media')}</div>
        <div class="evidence-meta">
          ${m.platform ? `<span>📱 ${esc(m.platform)}</span>` : ''}
          ${m.filetype ? `<span>📄 ${esc(m.filetype)}</span>` : ''}
          ${m.published ? `<span>📅 ${formatDate(m.published)}</span>` : ''}
        </div>
        ${m.desc ? `<p class="text-muted text-sm mt-1">${esc(truncate(m.desc,80))}</p>` : ''}
        <div class="flex gap-1 mt-2 flex-wrap">
          <a href="${esc(m.url)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">🖼️ View</a>
          ${m.source ? `<a href="${esc(m.source)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary">🔗 Source</a>` : ''}
          <button class="btn btn-sm btn-secondary btn-icon" onclick="App.editMedia('${esc(m.id)}')" title="Edit">✏️</button>
          <button class="btn btn-sm btn-danger btn-icon" onclick="App.deleteMedia('${esc(m.id)}')" title="Delete">🗑️</button>
        </div>
      </div>
    `).join('') : `<div class="empty-state"><span class="empty-state-icon">🖼️</span><p class="empty-state-text">No media items yet</p><button class="btn btn-primary" onclick="App.openModal('modalNewMedia')">➕ Add Media</button></div>`;
  }

  function saveMedia(e) {
    e.preventDefault();
    const editId = document.getElementById('m-edit-id').value;
    const media = DB.get('media');
    const m = { id: editId || 'M-'+uid(), url: document.getElementById('m-url').value.trim(), filename: document.getElementById('m-filename').value.trim(), filetype: document.getElementById('m-filetype').value, platform: document.getElementById('m-platform').value.trim(), published: document.getElementById('m-published').value, source: document.getElementById('m-source').value.trim(), desc: document.getElementById('m-desc').value.trim(), author: document.getElementById('m-author').value.trim(), notes: document.getElementById('m-notes').value.trim() };
    if (editId) { const i=media.findIndex(x=>x.id===editId); if(i>-1) media[i]=m; } else media.push(m);
    DB.set('media', media);
    closeModal('modalNewMedia');
    _clearForm('formNewMedia');
    renderMedia();
    toast('Media saved!', 'success');
  }

  function editMedia(id) {
    const m = DB.get('media').find(x=>x.id===id);
    if(!m) return;
    _fillForm({'m-url':m.url,'m-filename':m.filename,'m-filetype':m.filetype,'m-platform':m.platform,'m-published':m.published,'m-source':m.source,'m-desc':m.desc,'m-author':m.author,'m-notes':m.notes,'m-edit-id':m.id});
    openModal('modalNewMedia');
  }

  function deleteMedia(id) {
    confirm('Delete this media item?', () => {
      DB.set('media', DB.get('media').filter(x=>x.id!==id));
      renderMedia();
      toast('Deleted.', 'warning');
    });
  }

  /* ═══════════════════════════════════════════
     TIMELINE
  ═══════════════════════════════════════════ */
  function renderTimeline() {
    const events = DB.get('timeline').sort((a,b)=>b.date.localeCompare(a.date));
    const tl = document.getElementById('mainTimeline');
    tl.innerHTML = events.length ? events.map(t => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-date">${formatDate(t.date)}</div>
        <div class="timeline-content">
          <div class="flex justify-between items-start">
            <div class="timeline-title">${esc(t.event)}</div>
            <div class="flex gap-1" style="margin-left:.5rem;flex-shrink:0;">
              <button class="btn btn-sm btn-secondary btn-icon" onclick="App.editTimelineEvent('${esc(t.id)}')" title="Edit">✏️</button>
              <button class="btn btn-sm btn-danger btn-icon" onclick="App.deleteTimelineEvent('${esc(t.id)}')" title="Delete">🗑️</button>
            </div>
          </div>
          ${t.desc ? `<div class="timeline-desc">${esc(t.desc)}</div>` : ''}
          ${t.source ? `<div class="timeline-source">📎 Source: ${esc(t.source)}</div>` : ''}
          ${t.notes ? `<div class="form-hint mt-1">${esc(t.notes)}</div>` : ''}
        </div>
      </div>
    `).join('') : '<div class="empty-state"><span class="empty-state-icon">⏱️</span><p class="empty-state-text">No timeline events yet</p><button class="btn btn-primary" onclick="App.openModal(\'modalNewTimelineEvent\')">➕ Add Event</button></div>';
  }

  function saveTimelineEvent(e) {
    e.preventDefault();
    const editId = document.getElementById('te-edit-id').value;
    const timeline = DB.get('timeline');
    const t = { id: editId || 'T-'+uid(), date: document.getElementById('te-date').value, event: document.getElementById('te-event').value.trim(), source: document.getElementById('te-source').value.trim(), desc: document.getElementById('te-desc').value.trim(), notes: document.getElementById('te-notes').value.trim() };
    if (editId) { const i=timeline.findIndex(x=>x.id===editId); if(i>-1) timeline[i]=t; } else timeline.push(t);
    DB.set('timeline', timeline);
    closeModal('modalNewTimelineEvent');
    _clearForm('formNewTimelineEvent');
    renderTimeline();
    toast('Timeline event added!', 'success');
  }

  function editTimelineEvent(id) {
    const t = DB.get('timeline').find(x=>x.id===id);
    if(!t) return;
    _fillForm({'te-date':t.date,'te-event':t.event,'te-source':t.source,'te-desc':t.desc,'te-notes':t.notes,'te-edit-id':t.id});
    openModal('modalNewTimelineEvent');
  }

  function deleteTimelineEvent(id) {
    confirm('Delete this timeline event?', () => {
      DB.set('timeline', DB.get('timeline').filter(x=>x.id!==id));
      renderTimeline();
      toast('Deleted.', 'warning');
    });
  }

  /* ═══════════════════════════════════════════
     SOURCES
  ═══════════════════════════════════════════ */
  function renderSources() {
    const q = (document.getElementById('sourcesSearch')?.value || '').toLowerCase();
    const sources = DB.get('sources').filter(s => !q || (s.title+s.desc+s.type).toLowerCase().includes(q));
    const grid = document.getElementById('sourcesGrid');

    grid.innerHTML = sources.length ? sources.map(s => `
      <div class="evidence-card">
        <div class="flex justify-between items-center">
          <div class="evidence-id">${esc(s.id)}</div>
          ${badge(s.reliability, s.reliability==='High'?'badge-green':s.reliability==='Low'?'badge-red':'badge-yellow')}
        </div>
        <div class="evidence-title">${esc(s.title)}</div>
        <div class="evidence-meta">
          <span>🏷️ ${badge(s.type,'badge-blue')}</span>
          ${s.person ? `<span>👤 ${esc(s.person)}</span>` : ''}
          ${s.case ? `<span>📁 ${esc(s.case)}</span>` : ''}
          ${s.collected ? `<span>📅 ${formatDate(s.collected)}</span>` : ''}
        </div>
        ${s.desc ? `<p class="text-muted text-sm">${esc(truncate(s.desc,100))}</p>` : ''}
        ${s.tags && s.tags.length ? `<div class="note-tags">${(Array.isArray(s.tags)?s.tags:s.tags.split(',')).map(t=>`<span class="tag">${esc(t.trim())}</span>`).join('')}</div>` : ''}
        <div class="evidence-actions">
          ${s.url ? `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">🔗 Open</a>` : ''}
          <button class="btn btn-sm btn-secondary" onclick="App.editSource('${esc(s.id)}')">✏️ Edit</button>
          <button class="btn btn-sm btn-danger" onclick="App.deleteSource('${esc(s.id)}')">🗑️</button>
        </div>
      </div>
    `).join('') : `<div class="empty-state" style="grid-column:1/-1;"><span class="empty-state-icon">📚</span><p class="empty-state-text">No sources recorded</p><button class="btn btn-primary" onclick="App.openModal('modalNewSource')">➕ Add Source</button></div>`;

    document.getElementById('sourcesSearch')?.addEventListener('input', renderSources);
  }

  function saveSource(e) {
    e.preventDefault();
    const editId = document.getElementById('s-edit-id').value;
    const sources = DB.get('sources');
    const s = { id: editId || 'SRC-'+uid(), title: document.getElementById('s-title').value.trim(), type: document.getElementById('s-type').value, reliability: document.getElementById('s-reliability').value, url: document.getElementById('s-url').value.trim(), desc: document.getElementById('s-desc').value.trim(), person: document.getElementById('s-person').value.trim(), case: document.getElementById('s-case').value.trim(), tags: document.getElementById('s-tags').value.split(',').map(t=>t.trim()).filter(Boolean), collected: now() };
    if (editId) { const i=sources.findIndex(x=>x.id===editId); if(i>-1) sources[i]=s; } else sources.push(s);
    DB.set('sources', sources);
    closeModal('modalNewSource');
    _clearForm('formNewSource');
    renderSources();
    toast('Source saved!', 'success');
  }

  function editSource(id) {
    const s = DB.get('sources').find(x=>x.id===id);
    if(!s) return;
    _fillForm({'s-title':s.title,'s-type':s.type,'s-reliability':s.reliability,'s-url':s.url,'s-desc':s.desc,'s-person':s.person,'s-case':s.case,'s-tags':(Array.isArray(s.tags)?s.tags:s.tags||[]).join(', '),'s-edit-id':s.id});
    openModal('modalNewSource');
  }

  function deleteSource(id) {
    confirm('Delete this source?', () => {
      DB.set('sources', DB.get('sources').filter(x=>x.id!==id));
      renderSources();
      toast('Deleted.', 'warning');
    });
  }

  /* ═══════════════════════════════════════════
     CASES
  ═══════════════════════════════════════════ */
  function renderCases() {
    const filter = document.getElementById('casesFilter')?.value || '';
    const cases = DB.get('cases').filter(c => !filter || c.status === filter);
    const grid = document.getElementById('casesGrid');
    grid.innerHTML = cases.length ? cases.map(c => `
      <div class="card">
        <div class="card-header">
          <div>
            <div class="evidence-id mb-1">${esc(c.id)}</div>
            <div class="card-title">${esc(c.name)}</div>
          </div>
          <div class="flex gap-1">
            <button class="btn btn-sm btn-secondary btn-icon" onclick="App.editCase('${esc(c.id)}')" title="Edit">✏️</button>
            <button class="btn btn-sm btn-danger btn-icon" onclick="App.deleteCase('${esc(c.id)}')" title="Delete">🗑️</button>
          </div>
        </div>
        <div class="flex gap-2 flex-wrap mb-2">
          ${statusBadge(c.status)}
          ${priorityBadge(c.priority)}
          ${badge(c.category,'badge-gray')}
        </div>
        ${c.subject ? `<div class="text-sm mb-1">👤 <strong>Subject:</strong> ${esc(c.subject)}</div>` : ''}
        ${c.description ? `<p class="text-muted text-sm">${esc(truncate(c.description,100))}</p>` : ''}
        <div class="flex gap-3 mt-2" style="font-size:.72rem;color:var(--text-muted);">
          <span>Created: ${formatDate(c.created)}</span>
          <span>Updated: ${formatDate(c.updated)}</span>
        </div>
        ${c.notes ? `<div class="form-hint mt-1">📝 ${esc(truncate(c.notes,60))}</div>` : ''}
      </div>
    `).join('') : `<div class="empty-state" style="grid-column:1/-1;"><span class="empty-state-icon">📁</span><p class="empty-state-text">No cases yet</p><button class="btn btn-primary" onclick="App.openModal('modalNewCase')">➕ New Case</button></div>`;
  }

  function saveCase(e) {
    e.preventDefault();
    const editId = document.getElementById('case-edit-id')?.value || '';
    const cases = DB.get('cases');
    const c = {
      id: editId || 'CASE-' + String(cases.length + 1).padStart(3,'0'),
      name: document.getElementById('case-name').value.trim(),
      subject: document.getElementById('case-subject').value.trim(),
      category: document.getElementById('case-category').value,
      priority: document.getElementById('case-priority').value,
      status: 'Open',
      description: document.getElementById('case-description').value.trim(),
      notes: document.getElementById('case-notes').value.trim(),
      created: editId ? (cases.find(x=>x.id===editId)?.created || now()) : now(),
      updated: now(),
    };
    if (editId) { const i=cases.findIndex(x=>x.id===editId); if(i>-1) cases[i]=c; } else cases.push(c);
    DB.set('cases', cases);
    closeModal('modalNewCase');
    _clearForm('formNewCase');
    renderCases();
    renderDashboard();
    toast(`Case "${c.name}" created!`, 'success');
  }

  function editCase(id) {
    const c = DB.get('cases').find(x=>x.id===id);
    if(!c) return;
    // Add hidden edit-id field if not present
    let hiddenField = document.getElementById('case-edit-id');
    if (!hiddenField) {
      hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.id = 'case-edit-id';
      document.getElementById('formNewCase').appendChild(hiddenField);
    }
    _fillForm({'case-name':c.name,'case-subject':c.subject,'case-category':c.category,'case-priority':c.priority,'case-description':c.description,'case-notes':c.notes,'case-edit-id':c.id});
    openModal('modalNewCase');
  }

  function deleteCase(id) {
    const c = DB.get('cases').find(x=>x.id===id);
    confirm(`Delete case "${c?.name}"?`, () => {
      DB.set('cases', DB.get('cases').filter(x=>x.id!==id));
      renderCases();
      renderDashboard();
      toast('Case deleted.', 'warning');
    });
  }

  /* ═══════════════════════════════════════════
     NOTES
  ═══════════════════════════════════════════ */
  function renderNotes() {
    const q = (document.getElementById('notesSearch')?.value || '').toLowerCase();
    const notes = DB.get('notes').filter(n => !q || (n.title+n.body+n.tags.join?.('')||'').toLowerCase().includes(q));
    const grid = document.getElementById('notesGrid');
    grid.innerHTML = notes.length ? notes.map(n => `
      <div class="note-card">
        <div class="note-card-title">${esc(n.title)}</div>
        <div class="note-card-body">${esc(n.body)}</div>
        ${n.tags && n.tags.length ? `<div class="note-tags">${(Array.isArray(n.tags)?n.tags:n.tags.split(',')).map(t=>`<span class="tag">${esc(t.trim())}</span>`).join('')}</div>` : ''}
        <div class="note-card-footer">
          <div>
            ${n.case ? `<span>📁 ${esc(n.case)}</span>` : ''}
            ${n.person ? `<span style="margin-left:.3rem;">👤 ${esc(n.person)}</span>` : ''}
          </div>
          <div class="flex gap-1">
            <button class="btn btn-sm btn-secondary btn-icon" onclick="App.editNote('${esc(n.id)}')" title="Edit">✏️</button>
            <button class="btn btn-sm btn-danger btn-icon" onclick="App.deleteNote('${esc(n.id)}')" title="Delete">🗑️</button>
          </div>
        </div>
        <div class="text-xs text-muted mt-1">Updated: ${formatDate(n.updated)}</div>
      </div>
    `).join('') : `<div class="empty-state" style="grid-column:1/-1;"><span class="empty-state-icon">📝</span><p class="empty-state-text">No notes yet</p><button class="btn btn-primary" onclick="App.openModal('modalNewNote')">➕ New Note</button></div>`;
  }

  function saveNote(e) {
    e.preventDefault();
    const editId = document.getElementById('note-edit-id').value;
    const notes = DB.get('notes');
    const n = { id: editId || 'NOTE-'+uid(), title: document.getElementById('note-title').value.trim(), body: document.getElementById('note-body').value.trim(), case: document.getElementById('note-case').value.trim(), person: document.getElementById('note-person').value.trim(), tags: document.getElementById('note-tags').value.split(',').map(t=>t.trim()).filter(Boolean), created: editId ? (notes.find(x=>x.id===editId)?.created||now()) : now(), updated: now() };
    if (editId) { const i=notes.findIndex(x=>x.id===editId); if(i>-1) notes[i]=n; } else notes.push(n);
    DB.set('notes', notes);
    closeModal('modalNewNote');
    _clearForm('formNewNote');
    renderNotes();
    toast('Note saved!', 'success');
  }

  function editNote(id) {
    const n = DB.get('notes').find(x=>x.id===id);
    if(!n) return;
    _fillForm({'note-title':n.title,'note-body':n.body,'note-case':n.case,'note-person':n.person,'note-tags':(Array.isArray(n.tags)?n.tags:n.tags||[]).join(', '),'note-edit-id':n.id});
    openModal('modalNewNote');
  }

  function deleteNote(id) {
    confirm('Delete this note?', () => {
      DB.set('notes', DB.get('notes').filter(x=>x.id!==id));
      renderNotes();
      toast('Note deleted.', 'warning');
    });
  }

  /* ═══════════════════════════════════════════
     RELATIONSHIP MAP
  ═══════════════════════════════════════════ */
  function renderRelationshipMap() {
    const nodes = DB.get('mapNodes');
    const edges = DB.get('mapEdges');
    const container = document.getElementById('map-nodes-container');
    const svg = document.getElementById('relationship-svg');

    container.innerHTML = '';
    svg.innerHTML = '';

    // Render edges
    edges.forEach(edge => {
      const from = nodes.find(n=>n.id===edge.from);
      const to = nodes.find(n=>n.id===edge.to);
      if (!from || !to) return;

      const line = document.createElementNS('http://www.w3.org/2000/svg','line');
      line.setAttribute('x1', from.x); line.setAttribute('y1', from.y);
      line.setAttribute('x2', to.x);   line.setAttribute('y2', to.y);
      line.setAttribute('stroke','rgba(0,212,255,0.35)');
      line.setAttribute('stroke-width','1.5');
      line.setAttribute('stroke-dasharray','5 3');
      svg.appendChild(line);

      // Edge label
      const text = document.createElementNS('http://www.w3.org/2000/svg','text');
      text.setAttribute('x', (from.x+to.x)/2);
      text.setAttribute('y', (from.y+to.y)/2 - 5);
      text.setAttribute('text-anchor','middle');
      text.setAttribute('font-size','10');
      text.setAttribute('fill','rgba(0,212,255,0.7)');
      text.textContent = edge.label;
      svg.appendChild(text);
    });

    // Render relationship list
    const relList = document.getElementById('relationshipsList');
    relList.innerHTML = edges.map(e => {
      const from = nodes.find(n=>n.id===e.from);
      const to = nodes.find(n=>n.id===e.to);
      if (!from || !to) return '';
      return `<span style="font-size:.78rem;background:var(--bg-card);border:1px solid var(--border);border-radius:99px;padding:.2rem .6rem;">${esc(from.label)} <span style="color:var(--accent);">→ ${esc(e.label)} →</span> ${esc(to.label)}</span>`;
    }).join('');

    // Render nodes
    nodes.forEach(node => {
      const cfg = NODE_TYPE_CONFIG[node.type] || NODE_TYPE_CONFIG.person;
      const el = document.createElement('div');
      el.className = 'map-node';
      el.dataset.id = node.id;
      el.style.left = node.x + 'px';
      el.style.top  = node.y + 'px';
      el.innerHTML = `
        <div class="map-node-inner">
          <span class="map-node-icon">${cfg.icon}</span>
          <div class="map-node-label">${esc(node.label)}</div>
          <div class="map-node-type">${esc(cfg.label)}</div>
        </div>
      `;
      _makeDraggable(el, node.id);
      container.appendChild(el);
    });
  }

  function _makeDraggable(el, nodeId) {
    let isDragging = false, startX, startY, startLeft, startTop;

    el.addEventListener('mousedown', e => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      startLeft = parseInt(el.style.left)||0;
      startTop  = parseInt(el.style.top)||0;
      e.preventDefault();
    });

    document.addEventListener('mousemove', e => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      el.style.left = (startLeft + dx) + 'px';
      el.style.top  = (startTop  + dy) + 'px';

      // Update stored position
      const nodes = DB.get('mapNodes');
      const node = nodes.find(n=>n.id===nodeId);
      if (node) { node.x = startLeft+dx; node.y = startTop+dy; DB.set('mapNodes', nodes); }

      // Re-render edges only
      _updateMapEdges();
    });

    document.addEventListener('mouseup', () => { isDragging = false; });
  }

  function _updateMapEdges() {
    const nodes = DB.get('mapNodes');
    const edges = DB.get('mapEdges');
    const svg = document.getElementById('relationship-svg');
    svg.innerHTML = '';
    edges.forEach(edge => {
      const from = nodes.find(n=>n.id===edge.from);
      const to = nodes.find(n=>n.id===edge.to);
      if (!from || !to) return;
      const line = document.createElementNS('http://www.w3.org/2000/svg','line');
      line.setAttribute('x1',from.x); line.setAttribute('y1',from.y);
      line.setAttribute('x2',to.x);   line.setAttribute('y2',to.y);
      line.setAttribute('stroke','rgba(0,212,255,0.35)');
      line.setAttribute('stroke-width','1.5');
      line.setAttribute('stroke-dasharray','5 3');
      svg.appendChild(line);
      const text = document.createElementNS('http://www.w3.org/2000/svg','text');
      text.setAttribute('x',(from.x+to.x)/2);
      text.setAttribute('y',(from.y+to.y)/2-5);
      text.setAttribute('text-anchor','middle');
      text.setAttribute('font-size','10');
      text.setAttribute('fill','rgba(0,212,255,0.7)');
      text.textContent = edge.label;
      svg.appendChild(text);
    });
  }

  function saveMapNode(e) {
    e.preventDefault();
    const nodes = DB.get('mapNodes');
    const n = { id:'MN-'+uid(), label: document.getElementById('node-label').value.trim(), type: document.getElementById('node-type').value, x: 100 + Math.random()*400, y: 80 + Math.random()*300 };
    nodes.push(n);
    DB.set('mapNodes', nodes);
    closeModal('modalNewNode');
    _clearForm('formNewNode');
    renderRelationshipMap();
    toast('Node added!', 'success');
  }

  function addRelationshipEdge() {
    const nodes = DB.get('mapNodes');
    if (nodes.length < 2) { toast('Add at least 2 nodes first', 'warning'); return; }
    const labels = ['Works At','Owns','Created','Member Of','Associated With','Mentioned In'];
    const randomEdge = { from: nodes[0].id, to: nodes[1].id, label: labels[Math.floor(Math.random()*labels.length)] };
    const edges = DB.get('mapEdges');
    edges.push(randomEdge);
    DB.set('mapEdges', edges);
    renderRelationshipMap();
    toast('Connection added', 'success');
  }

  function resetRelationshipMap() {
    DB.set('mapNodes', DEMO_DATA.mapNodes);
    DB.set('mapEdges', DEMO_DATA.mapEdges);
    renderRelationshipMap();
    toast('Map reset to default layout', 'info');
  }

  function zoomMap(factor) {
    _mapScale = Math.min(Math.max(_mapScale * factor, 0.4), 3);
    const container = document.getElementById('map-nodes-container');
    container.style.transform = `scale(${_mapScale})`;
    container.style.transformOrigin = 'top left';
  }

  function fitMap() {
    _mapScale = 1;
    const container = document.getElementById('map-nodes-container');
    container.style.transform = '';
  }

  /* ═══════════════════════════════════════════
     REPORT
  ═══════════════════════════════════════════ */
  function generateReport() {
    const people = DB.get('people');
    const cases = DB.get('cases');
    const domains = DB.get('domains');
    const sources = DB.get('sources');
    const timeline = DB.get('timeline').sort((a,b)=>a.date.localeCompare(b.date));
    const notes = DB.get('notes');
    const profiles = DB.get('socialProfiles');
    const mapEdges = DB.get('mapEdges');
    const mapNodes = DB.get('mapNodes');

    const reportDate = new Date().toLocaleString();

    const out = document.getElementById('reportOutput');
    out.innerHTML = `
      <div style="font-family:var(--font-mono);border-bottom:2px solid var(--accent);padding-bottom:1rem;margin-bottom:1.5rem;">
        <div style="font-size:1.3rem;font-weight:700;color:var(--accent);">OSINT INTELLIGENCE REPORT</div>
        <div class="text-muted text-sm">Generated: ${reportDate}</div>
        <div style="margin-top:.5rem;font-size:.75rem;color:var(--accent-yellow);">⚠️ This report contains publicly available information only. Handle in accordance with applicable privacy laws.</div>
      </div>

      <div class="report-section">
        <div class="report-section-title">§1 — Subject Overview</div>
        ${people.length ? people.map(p => `
          <div class="card mb-3">
            <div class="profile-header">
              <div class="profile-avatar-large">${esc(p.name[0]||'?')}</div>
              <div>
                <div class="profile-name">${esc(p.name)}</div>
                ${p.occupation ? `<div class="profile-title">${esc(p.occupation)}${p.org ? ' @ '+esc(p.org) : ''}</div>` : ''}
                <div style="display:flex;gap:.5rem;margin-top:.4rem;flex-wrap:wrap;">
                  ${p.country ? badge(p.country,'badge-blue') : ''}
                  ${p.languages ? badge(p.languages,'badge-gray') : ''}
                </div>
              </div>
            </div>
            <div class="form-row">
              ${_infoField('Full Name',p.name)}
              ${_infoField('Alias',p.alias)}
              ${_infoField('Username',p.username)}
              ${_infoField('Country',p.country)}
              ${_infoField('City',p.city)}
              ${_infoField('Occupation',p.occupation)}
              ${_infoField('Organization',p.org)}
              ${_infoField('Languages',p.languages)}
            </div>
          </div>
        `).join('') : '<p class="text-muted">No subjects profiled.</p>'}
      </div>

      <div class="report-section">
        <div class="report-section-title">§2 — Public Social Profiles (${profiles.length})</div>
        ${profiles.length ? profiles.map(sp=>`
          <div class="report-field">
            <span class="report-field-label">${esc(sp.platform)}</span>
            <span class="report-field-value">@${esc(sp.username)}${sp.url?' — '+esc(sp.url):''}</span>
          </div>
        `).join('') : '<p class="text-muted">No social profiles recorded.</p>'}
      </div>

      <div class="report-section">
        <div class="report-section-title">§3 — Organizations &amp; Domains (${domains.length})</div>
        ${domains.length ? domains.map(d=>`
          <div class="report-field">
            <span class="report-field-label">${esc(d.domain)}</span>
            <span class="report-field-value">${esc(d.title||'')} — ${badge(d.status,d.status==='Active'?'badge-green':'badge-gray')}</span>
          </div>
        `).join('') : '<p class="text-muted">No domains recorded.</p>'}
      </div>

      <div class="report-section">
        <div class="report-section-title">§4 — Investigation Timeline (${timeline.length} events)</div>
        <div class="timeline" style="padding-left:1.5rem;">
          ${timeline.map(t=>`
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-date">${formatDate(t.date)}</div>
              <div class="timeline-content">
                <div class="timeline-title">${esc(t.event)}</div>
                ${t.source ? `<div class="timeline-source">Source: ${esc(t.source)}</div>` : ''}
                ${t.desc ? `<div class="timeline-desc">${esc(t.desc)}</div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="report-section">
        <div class="report-section-title">§5 — Relationship Network (${mapEdges.length} connections)</div>
        ${mapEdges.map(e=>{
          const from = mapNodes.find(n=>n.id===e.from);
          const to = mapNodes.find(n=>n.id===e.to);
          if(!from||!to) return '';
          return `<div class="report-field"><span class="report-field-label">${esc(e.label)}</span><span class="report-field-value">${esc(from.label)} → ${esc(to.label)}</span></div>`;
        }).join('')}
      </div>

      <div class="report-section">
        <div class="report-section-title">§6 — Public Sources &amp; Evidence (${sources.length} items)</div>
        ${sources.map((s,i)=>`
          <div class="report-field">
            <span class="report-field-label">[${i+1}] ${badge(s.type,'badge-blue')}</span>
            <span class="report-field-value">${esc(s.title)}${s.url ? ` — ${esc(s.url)}` : ''}</span>
          </div>
        `).join('')}
      </div>

      <div class="report-section">
        <div class="report-section-title">§7 — Case Overview (${cases.length} cases)</div>
        ${cases.map(c=>`
          <div class="report-field">
            <span class="report-field-label">${esc(c.id)}</span>
            <span class="report-field-value">${esc(c.name)} — ${statusBadge(c.status)}</span>
          </div>
        `).join('')}
      </div>

      <div class="report-section">
        <div class="report-section-title">§8 — Research Notes (${notes.length})</div>
        ${notes.map(n=>`
          <details class="accordion" style="margin-bottom:.4rem;">
            <summary class="accordion-summary">${esc(n.title)}</summary>
            <p style="font-size:.82rem;line-height:1.6;color:var(--text-secondary);">${esc(n.body)}</p>
          </details>
        `).join('')}
      </div>

      <div style="background:rgba(0,230,118,.06);border:1px solid rgba(0,230,118,.2);border-radius:var(--radius);padding:1rem;font-size:.8rem;color:var(--text-secondary);margin-top:1rem;">
        🛡️ <strong>Responsible OSINT Notice:</strong> This report is generated from publicly available information only. All data collection must comply with applicable laws, platform terms of service, and ethical OSINT principles.
      </div>
    `;

    toast('Report generated!', 'success');
    navigate('reports');
  }

  /* ═══════════════════════════════════════════
     EXPORT
  ═══════════════════════════════════════════ */
  function exportAllJSON() {
    const data = {};
    ['cases','people','socialProfiles','domains','contacts','news','geo','media','timeline','sources','notes','mapNodes','mapEdges'].forEach(k => { data[k] = DB.get(k); });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type:'application/json' });
    _download(blob, `osint-export-${now()}.json`);
    toast('Data exported as JSON!', 'success');
  }

  function exportTXT() {
    const lines = [];
    lines.push('═══ OSINT INTELLIGENCE WORKSPACE EXPORT ═══');
    lines.push(`Generated: ${new Date().toLocaleString()}`);
    lines.push('');

    DB.get('cases').forEach(c => {
      lines.push(`[CASE] ${c.id} — ${c.name}`);
      lines.push(`  Status: ${c.status} | Priority: ${c.priority}`);
      lines.push(`  Subject: ${c.subject}`);
      if (c.description) lines.push(`  Desc: ${c.description}`);
      lines.push('');
    });

    DB.get('people').forEach(p => {
      lines.push(`[PERSON] ${p.name} (${p.username||'n/a'})`);
      lines.push(`  Occupation: ${p.occupation} @ ${p.org}`);
      lines.push(`  Location: ${p.city}, ${p.country}`);
      if (p.bio) lines.push(`  Bio: ${p.bio.substring(0,120)}…`);
      lines.push('');
    });

    DB.get('sources').forEach((s,i) => {
      lines.push(`[SOURCE ${i+1}] ${s.title}`);
      if (s.url) lines.push(`  URL: ${s.url}`);
      lines.push('');
    });

    const blob = new Blob([lines.join('\n')], { type:'text/plain' });
    _download(blob, `osint-export-${now()}.txt`);
    toast('Exported as TXT!', 'success');
  }

  function importJSON(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        Object.keys(data).forEach(k => DB.set(k, data[k]));
        _renderAll();
        toast('Data imported successfully!', 'success');
      } catch {
        toast('Invalid JSON file!', 'error');
      }
    };
    reader.readAsText(file);
  }

  function clearAllData() {
    confirm('This will delete ALL workspace data. Are you sure?', () => {
      ['cases','people','socialProfiles','domains','contacts','news','geo','media','timeline','sources','notes','mapNodes','mapEdges'].forEach(k => DB.set(k,[]));
      DB.setPref('demoLoaded', false);
      _renderAll();
      toast('All data cleared.', 'warning');
    });
  }

  function _download(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /* ═══════════════════════════════════════════
     UTILITY HELPERS (internal)
  ═══════════════════════════════════════════ */
  function _setInner(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function _clearForm(formId) {
    const form = document.getElementById(formId);
    if (form) form.reset();
    // Clear hidden edit IDs
    form?.querySelectorAll('input[type=hidden]').forEach(h => h.value = '');
  }

  function _fillForm(fields) {
    Object.entries(fields).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (el.tagName === 'SELECT') el.value = val;
      else el.value = val || '';
    });
  }

  /* ─── Public API ────────────────────────────────────────────── */
  return {
    init, navigate, toast, openModal, closeModal,
    loadDemoData, toggleTheme, toggleSidebar, toggleCompact,
    // People
    renderPeople, savePerson, editPerson, deletePerson, selectPerson,
    _switchTab,
    // Social Profiles
    renderSocialProfiles, saveSocialProfile, editSocialProfile, deleteSocialProfile,
    // Username
    searchUsername, clearUsernameResults,
    // Domains
    renderDomains, saveDomain, editDomain, deleteDomain,
    // Contacts
    renderContacts, saveContact, editContact, deleteContact,
    // News
    renderNews, saveNews, editNews, deleteNews, toggleNewsView,
    // Geo
    renderGeo, saveGeo, editGeo, deleteGeo,
    // Media
    renderMedia, saveMedia, editMedia, deleteMedia,
    // Timeline
    renderTimeline, saveTimelineEvent, editTimelineEvent, deleteTimelineEvent,
    // Sources
    renderSources, saveSource, editSource, deleteSource,
    // Cases
    renderCases, saveCase, editCase, deleteCase,
    // Notes
    renderNotes, saveNote, editNote, deleteNote,
    // Relationship Map
    renderRelationshipMap, saveMapNode, addRelationshipEdge, resetRelationshipMap, zoomMap, fitMap,
    // Report
    generateReport,
    // Export/Import
    exportAllJSON, exportTXT, importJSON, clearAllData,
    // Dashboard
    renderDashboard, renderActivityFeed,
  };

})();

/* ═══════════════════════════════════════════════════════════════
   BOOT
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => App.init());
