# 🔍 OSINT Intelligence Workspace

A professional, fully functional **Open-Source Intelligence (OSINT) research dashboard** built with pure **HTML + CSS + Vanilla JavaScript**. No backend, no framework, no API keys required.

> ⚠️ **Responsible Use:** This tool is designed exclusively for **lawful OSINT research using publicly available information**. Never use it for harassment, stalking, credential collection, unauthorized access, or surveillance.

---

## 🚀 Getting Started

1. Open `index.html` in any modern browser
2. The dashboard loads with fictional demo data automatically
3. Start exploring — all data is saved locally in your browser

**No installation. No server. No internet required.**

---

## 📁 Project Structure

```
osint-dashboard/
│
├── index.html      — Main application (all pages & modals)
├── style.css       — Complete design system with CSS variables
├── script.js       — Full vanilla JS application logic
│
└── assets/
    └── logo.svg    — SVG logo
```

---

## ✨ Features

### Dashboard
- Live statistics: Cases, People, Sources, Notes, Evidence
- Recent investigations table
- Activity feed
- Quick-action shortcuts

### 👤 People / Individual Profiles
- Full public information profile form
- Photo, bio, occupation, location, language fields
- Tab view: Basic Info | Biography | Notes
- Edit / Delete with confirmation

### 🔎 Username Investigation
- Enter any username → mock results across 11 platforms
- Status badges: 🟢 Found / 🟡 Possible Match / ⚪ Not Checked / 🔴 No Match
- One-click platform URL opening

### 📱 Social Profiles
- Cards for YouTube, Instagram, Facebook, X, LinkedIn, GitHub, Reddit, TikTok, and more
- Platform-colored cards, verification badges
- Edit / Delete

### 🌐 Domain Intelligence
- Domain records with SSL status, registrar, technology stack
- Hosting provider, public email
- Open Website / Copy Domain buttons

### 📧 Public Contact Info
- Record publicly exposed email addresses with source
- Source type classification (Company Website, GitHub, Press Release, etc.)

### 📰 News & Public Records
- Article management with table **and** timeline views
- Relevance ratings, publication metadata

### 🗺️ Geographic Research
- Public location records (business, organization, event)
- Map URL integration — opens in Google Maps or any service

### 🖼️ Media Analysis
- Image cards with lazy-loaded thumbnails
- Metadata: platform, author, date, file type
- Source URL linking

### 🕸️ Relationship Map
- Drag-and-drop node positioning
- SVG edge connections with relationship labels
- Node types: Person, Organization, Website, Project, Profile, Event
- Zoom in/out/fit controls

### ⏱️ Timeline
- Chronological event log sorted by date
- Source attribution, description, notes per event

### 📚 Sources & Evidence
- Evidence cards with reliability ratings
- Tagged, linked to person/case

### 📁 Cases
- Full case management: Open → Researching → Waiting → Completed → Archived
- Priority levels: Low / Medium / High / Critical
- Filter by status

### 📝 Notes
- Sticky-card note system
- Full-text search
- Tags, case/person links, timestamps

### 📄 Reports
- Auto-generated structured intelligence report from all data
- **Print** support
- **Export JSON** — full data backup
- **Export TXT** — human-readable text report

### ⚙️ Settings
- Dark / Light theme toggle
- Sidebar collapse
- Compact view
- Import / Export / Clear / Load Demo

---

## 🎨 Design System

All colors, spacing, and typography are defined via **CSS custom properties** in `:root`:

```css
--accent: #00d4ff          /* Primary neon accent */
--bg-primary: #0a0e1a      /* Page background */
--bg-card: #131d35         /* Card background */
--sidebar-width: 260px     /* Sidebar width */
```

Switch the entire theme by changing `data-theme="dark"` to `data-theme="light"` on `<html>`, or use the in-app toggle.

---

## 💾 Data Storage

All data is stored in **browser localStorage** under keys prefixed with `osint_`. Data persists across browser sessions. Use **Export JSON** to back up your data.

---

## 🛡️ Responsible OSINT

This dashboard is built for **legal, ethical open-source intelligence research only**:

- ✅ Publicly available information
- ✅ Official company websites
- ✅ Public social media profiles
- ✅ Published news articles
- ✅ Public GitHub repositories
- ✅ Conference speaker bios

- ❌ Private account access
- ❌ Password or credential collection
- ❌ Real-time location tracking
- ❌ Unauthorized system access
- ❌ Harassment or surveillance

Always respect applicable laws, platform Terms of Service, and privacy regulations (GDPR, CCPA, etc.).

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | Semantic HTML5 |
| Styling | Pure CSS3 with custom properties |
| Logic | Vanilla ES6+ JavaScript |
| Storage | Browser localStorage |
| Icons | Unicode emoji |
| Fonts | System UI stack |
| Modals | Native `<dialog>` element |

---

## 📖 Demo Data

The dashboard ships with fictional demo data featuring:
- **Alex Morgan** — Software Engineer, Nova Technologies
- **Jordan Carter** — Freelance Journalist
- **Nova Rivera** — Security Researcher, CipherLabs
- **Nova Technologies** — Example organization
- **DataStream.io** — Example domain

All demo data is clearly fictional and for illustration only.

---

*Built as a portfolio project for cybersecurity / networking students. For educational and lawful research purposes only.*
