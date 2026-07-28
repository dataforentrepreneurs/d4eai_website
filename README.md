# Data for Entrepreneurs (d4e.ai) — Main Portal

Official Next.js web portal for **Data for Entrepreneurs (D4E.AI)**, showcasing our data pipeline infrastructure, agentic AI analytics, Party Games Hub, and our flagship product **Data In A Day (DIAD)**.

---

## 🌐 Live URLs & Links

* **Main Website**: [https://d4e.ai](https://d4e.ai)
* **DIAD Product Subdomain**: [https://diad.d4e.ai](https://diad.d4e.ai) (also available at [https://d4e.ai/diad](https://d4e.ai/diad))
* **Party Games Hub**: [https://play.d4e.ai](https://play.d4e.ai)
* **GitHub Repository**: [https://github.com/dataforentrepreneurs/d4eai_website](https://github.com/dataforentrepreneurs/d4eai_website)
* **GitHub Pages Origin**: `https://dataforentrepreneurs.github.io/d4eai_website/`

---

## 🚀 Products & Site Routes

| Route | Description | Key Components |
| :--- | :--- | :--- |
| `/` | Homepage with 3D background animation, capabilities, & API snippets | `src/app/page.tsx`, `Hero.tsx`, `FeatureCards.tsx` |
| `/diad` | **Data In A Day (DIAD)** — 1-click deployment & installer hub | `src/app/diad/page.tsx` |
| `/play` | Party Games Hub portal | `src/app/play/page.tsx` |
| `/resources` | Developer guides, API docs, & e-commerce tutorials | `src/app/resources/page.tsx` |
| `/about` | Mission statement & company background | `src/app/about/page.tsx` |
| `/contact` | Contact form & enterprise inquiry details | `src/app/contact/page.tsx` |

---

## 📦 DIAD Self-Hosted Installer Architecture

To eliminate dependencies on external cloud storage buckets, all DIAD installer binaries and scripts are self-hosted directly inside the `public/` directory:

```
public/
├── setup.bat                ← 1-Click Windows batch installer script
└── DIAD_release_v1.0.zip   ← Complete encrypted DIAD release package
```

### How the 1-Click Installer Flow Works:
1. **Client Action**: Client clicks **"Download 1-Click Installer (.bat)"** on `https://d4e.ai/diad`.
2. **Download**: Browser downloads `/setup.bat` directly from the website.
3. **Execution**: Client double-clicks `setup.bat` on Windows.
4. **Automation**: `setup.bat` launches PowerShell in bypass mode, downloads `https://diad.d4e.ai/DIAD_release_v1.0.zip` behind the scenes, unpacks it to `%USERPROFILE%\DIAD`, installs Python dependencies, and opens the local onboarding wizard at `http://localhost:8000`.

---

## ⚙️ Hosting & Deployment (GitHub Pages)

This project is statically exported via Next.js and hosted on **GitHub Pages** (behind Cloudflare CDN).

### Automated CI/CD Pipeline
Deployment is 100% automated using GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)).

Every time code is pushed to the `master` branch:
1. GitHub Actions checks out the code and installs Node 20.
2. Runs `npm run build` using Next.js static export (`output: "export"` in `next.config.ts`).
3. Uploads the compiled `./out` directory as a Pages artifact.
4. Deploys the artifact directly to GitHub Pages (`d4e.ai`).

### How to Deploy Updates
Simply commit and push your changes to GitHub:

```bash
git add .
git commit -m "Update site content or features"
git push origin master
```

You can track live deployment progress under the **[GitHub Actions Tab](https://github.com/dataforentrepreneurs/d4eai_website/actions)**.

---

## 💻 Local Development

### Prerequisites
* Node.js v18+ or v20+
* npm

### Running Locally
```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Validating Production Build Locally
```bash
# Test static export build
npm run build
```

---

## 🛠️ Technology Stack

* **Framework**: Next.js 16 (App Router)
* **Styling**: Tailwind CSS v4 + Custom Glassmorphism System ([src/app/globals.css](src/app/globals.css))
* **Animations**: Framer Motion & Three.js ([@react-three/fiber](https://github.com/pmndrs/react-three-fiber))
* **Icons**: Lucide React
* **Hosting**: GitHub Pages via GitHub Actions
