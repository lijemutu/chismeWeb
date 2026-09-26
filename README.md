# 🎙️ ChismeWeb | The Listener Story Portal & Studio for Podcasts

> **The frictionless story portal for podcast hosts.** Stop digging through messy Gmail threads and lost Instagram DMs. Let listeners submit ghost stories, workplace drama, confessions, and relationship tea with zero login friction — complete with built-in **Web Speech Read-Aloud**, photo evidence attachments, host ranking, and **Patreon VIP flags**.

---

## ⚡ The Problem ChismeWeb Solves

Podcast hosts often dedicate episodes to reading tales sent in by their audience (paranormal events, petty revenge, dating disasters, office gossip). Today, listeners email them to a general Gmail or send direct messages on Instagram.

This causes major pain points:
1. **Buried Attachments**: Photo evidence, receipts, and screenshots get lost or expire in DMs.
2. **Reading Fatigue**: Hosts spend hours reading lengthy emails manually just to find out if they have a punchline.
3. **Ignored Patrons**: VIP paying members get lost in the noise of general inbox spam.
4. **Disorganized Recording Prep**: No way to track reading times, tag stories by genre, or organize episode line-ups.

---

## ✨ Key Features

- **⚡ Zero-Login Listener Submissions**: Casual listeners can draft and send stories with zero account creation friction.
- **👑 Patron VIP Gold Flags & Priority Queue**: Paying supporters can authenticate or verify their tier to bump their tale to the top with an exclusive gold badge.
- **🎙️ Built-in Browser Read Aloud**: Powered by the native Web Speech API. Hosts can listen to listener drafts hands-free at 1.0x, 1.25x, or 1.5x speed without paying costly external API bills.
- **📸 Photo & Receipt Attachments**: Viewers can attach photos (haunted rooms, receipts, text screenshots) with an integrated zoom lightbox.
- **⭐ Host Scoring & Spiciness Ranking**: Rate stories from 1 to 5 stars, track spiciness (🌶️ Mild to Nuclear), and upvote favorites with co-hosts.
- **🏷️ Topic Channels**: Easily filter by *Paranormal & Glitches*, *Workplace Drama*, *Dating Disasters*, *Petty Revenge*, or *Wild Confessions*.
- **📺 On-Air Teleprompter Mode**: Full-screen, high-contrast teleprompter with font scaling and host broadcast notes designed for live recording behind a mic.
- **⏱️ Word Count & Read Time Estimates**: Displays exact on-air pacing so hosts can build the perfect 45-minute episode run.

---

## 🚀 How to Deploy

### Option 1: Deploy to Vercel (Recommended, 1-Click)

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: launch ChismeWeb podcast portal"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/chismeWeb.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your `chismeWeb` repository.
4. Vercel will automatically detect Vite. Click **Deploy**.

---

### Option 2: Deploy to GitHub Pages (100% Free)

This repository includes a ready-to-run GitHub Actions workflow (`.github/workflows/deploy.yml`) and `vite.config.js` is already configured with `base: './'`:

1. Push this code to GitHub.
2. In your GitHub repository, navigate to **Settings** -> **Pages**.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. The deployment workflow will automatically run, build, and publish your site at `https://YOUR_USERNAME.github.io/chismeWeb/`.

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build production static bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 💡 Tech Stack

- **Framework**: React 18 + Vite 6 (Static SPA, no backend required)
- **Styling**: Tailwind CSS + Custom Studio Dark Theme
- **Icons**: Lucide React
- **Audio Synthesis**: Native Browser Web Speech API (`SpeechSynthesis`)
- **Effects**: Canvas Confetti
- **Storage**: Client-side localStorage persistence
