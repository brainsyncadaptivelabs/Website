# BrainSync Adaptive Labs — Official Website

Transforming ideas into intelligent digital products. BrainSync Adaptive Labs is a technology startup focused on building custom software, scalable SaaS platforms, AI-powered applications, and innovative digital products for businesses, startups, institutions, and innovators.

---

## 🚀 Core Capabilities
* **Software Development**: Building tailored application ecosystems engineered for specific corporate logic rules.
* **AI Solutions**: Integrating local vector databases, inference engines, OCR tools, and specialized AI models.
* **Product Development**: Architecting scalable, multi-tenant subscription systems and modern cloud applications.
* **Product Maintenance**: Ongoing reliability engineering, security patches, performance scaling, and cloud optimization.

---

## 📦 The Product Suite

### 1. Featured Products
* **PlacementAI Platform** *(Status: Under Development)*
  * **Description**: Intelligent career readiness dashboard and ATS resume matching engine operating on local vector search models. 
  * **Tech Stack**: Next.js 15, Spring Boot 3, Ollama Llama3, Tesseract OCR, SQLite-VSS.
  * **Key Features**: Local OCR pipeline for transcript/credential scanning, semantic ATS resume evaluation, and off-grid execution on edge hardware.
* **EGO Platform — Equipment Guardian & Optimize** *(Status: R&D)*
  * **Description**: An upcoming AI-powered Industrial IoT platform for real-time factory operations and equipment diagnostics.
  * **Tech Stack**: IoT Telemetry, ML Edge Inference, Real-Time Analytics, Industry 4.0.
  * **Key Features**: Real-time sensor and machine telemetry monitoring, predictive maintenance alerts, and automated scheduling controls.

### 2. Commercial SDKs
* **SyncOS Dashboard**: Low-latency grid systems and WebGL analytic renderings with light/dark adaptive CSS configurations.
* **SyncLink SDK**: Lightweight Vanilla JS WebSocket client linking application interfaces to real-time microservices.
* **CogTwin Indexer**: Local vectorized database search index compiler utilizing MiniLM models directly on device SQLite configurations.

---

## 🛠️ Technology Stack & Architecture

This repository contains the official, customer-facing static website built with a focus on speed, responsiveness, and premium visual design.

* **Front-end**: Semantic HTML5, Vanilla CSS3 (Custom Design System with CSS variables).
* **Interactivity**: Vanilla JavaScript, Canvas-based particles background animation (`js/particles.js`), interactive UI components.
* **Branding & Assets**: Curated periwinkle-accented color scheme matching the custom vector-sharp emblem (`assets/logo-design.png`).

---

## 📂 Project Structure

```bash
├── assets/                  # Branding assets and graphics
│   ├── logo-design.png      # Transparent vector-sharp emblem logo
│   └── logo.jpg             # Original raw logo
├── css/                     # Core Styling files
│   ├── styles.css           # Global layout, variables, grids, and typography
│   └── components.css       # Reusable UI elements (buttons, cards, badges)
├── js/                      # Interactivity Scripts
│   ├── main.js              # Header controls, scroll behaviors, page interactions
│   ├── particles.js         # Canvas particle simulation for the hero section
│   └── simulator.js         # Client-side analytics/diagnostics simulator
├── about.html               # About BrainSync Adaptive Labs page
├── contact.html             # Client inquiry / contact page
├── cookies.html             # Cookie consent policy page
├── index.html               # Website homepage
├── privacy.html             # Privacy policy page
├── products.html            # Product catalog & commercial SDKs
├── services.html            # Services & technological capabilities
├── terms.html               # Terms of Service page
└── README.md                # Project documentation
```

---

## 💻 Local Development

Since this is a high-performance static website, running it locally requires no build steps:

1. **Direct Access**: Open `index.html` directly in any web browser.
2. **Local HTTP Server** (Recommended for local routing and API simulations):
   ```bash
   # Using Node/npx
   npx http-server ./
   
   # Using Python
   python3 -m http.server 8000
   ```
3. **VS Code Live Server**: Right-click `index.html` and select **"Open with Live Server"**.

---

## 📡 Deployment & Repository

This website is linked to the GitHub remote repository:
* **Remote URL**: `https://github.com/brainsyncadaptivelabs/Website.git`
* **Target Branch**: `main`
