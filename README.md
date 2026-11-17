# Thasleema Nasreen — DevOps Power Portfolio

> **Role**: DevOps Engineer & Cloud Infrastructure Specialist  
> **Location**: Dubai, United Arab Emirates  
> **Focus**: AWS Cloud Architecture, Kubernetes, Docker, Terraform IaC, Observability & CI/CD Pipelines

A responsive, high-performance power portfolio website featuring an interactive DevOps architecture visualizer, live cloud terminal CLI emulator, project telemetry breakdowns, and direct resume export.

---

## ⚡ Tech Stack

- **Frontend**: HTML5, Modern CSS3 (Glassmorphism & Luminous Pearl / Rose Theme), Vanilla JavaScript (ES6+)
- **DevOps Blueprints**: AWS Multi-Tier VPC, Automated GitLab CI/CD, Prometheus & Grafana Loki Observability
- **CLI Simulation**: Interactive Terminal with bash command interpreter
- **Assets**: Embedded SVG icons, high-resolution optimized profile imagery, verified original PDF resume

---

## 🚀 Local Setup & Preview

1. **Clone or navigate to the directory**:
   ```bash
   cd thasleema-portfolio
   ```

2. **Run with any local HTTP server**:
   ```bash
   # Using Node.js:
   npx serve .

   # Or using Python 3:
   python -m http.server 8080
   ```

3. Open `http://localhost:8080` in your browser.

---

## 🌐 Deployment

### Deploy to GitHub Pages
1. Create a new repository on GitHub: `thasleema-portfolio` or `<username>.github.io`
2. Push the code:
   ```bash
   git init
   git add .
   git commit -m "feat: initial portfolio release"
   git branch -M main
   git remote add origin https://github.com/<username>/thasleema-portfolio.git
   git push -u origin main
   ```
3. Go to **Settings > Pages** and set source to `main` branch.

### Deploy to Vercel
```bash
npx vercel
```

### Deploy to Netlify
```bash
npx netlify deploy --prod
```
