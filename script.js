/* ==========================================================================
   Thasleema Nasreen - Power Portfolio JavaScript
   Interactive Terminal, Architecture Switcher, Filter, Modals, Clipboard & Form
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll Effect & Active Link Highlight
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scrollspy
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 2. Interactive Architecture Visualizer Switcher
  const archBtns = document.querySelectorAll('.arch-btn');
  const diagramFlows = document.querySelectorAll('.diagram-flow');
  const archDescription = document.getElementById('archDescription');

  const archDescriptions = {
    'aws': 'Production-grade AWS topology: Traffic flows through Internet Gateway to Application Load Balancer across Public Subnets, proxying to EC2 application instances in Private Subnets with isolated RDS PostgreSQL/MySQL and secured via Bastion Host.',
    'cicd': 'End-to-end automated DevOps pipeline: Developer pushes to GitLab/GitHub -> Triggers automated linting & test suites -> Builds multi-stage Docker container -> Deploys to staging/prod with automated rollback and zero downtime.',
    'observability': 'Full-stack observability mesh: Node Exporters and Promtail agents continuously scrape system metrics and logs across distributed instances -> Prometheus aggregates time-series data while Loki ingests logs -> Grafana dashboards provide unified real-time visualization and alerting.'
  };

  archBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      archBtns.forEach(b => b.classList.remove('active'));
      diagramFlows.forEach(d => d.classList.remove('active'));

      btn.classList.add('active');
      const targetFlow = btn.getAttribute('data-target');
      const activeFlowEl = document.getElementById(`diagram-${targetFlow}`);
      if (activeFlowEl) {
        activeFlowEl.classList.add('active');
      }
      if (archDescription && archDescriptions[targetFlow]) {
        archDescription.textContent = archDescriptions[targetFlow];
      }
    });
  });

  // 3. Interactive Cloud Terminal Emulator
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalBody = document.querySelector('.terminal-body');
  const tchips = document.querySelectorAll('.tchip');

  const commands = {
    'help': `Available commands:
  • <span class="t-accent">cv</span>         : View and download original uploaded PDF resume
  • <span class="t-accent">status</span>     : View current availability, location & visa status
  • <span class="t-accent">experience</span> : View 3 industry internships & engineering impact
  • <span class="t-accent">skills</span>     : Display cloud & DevOps technical competencies
  • <span class="t-accent">deploy</span>     : Simulate an automated Terraform + Docker deployment
  • <span class="t-accent">awards</span>     : View hackathon achievements & certifications
  • <span class="t-accent">contact</span>    : Quick contact info & direct communication
  • <span class="t-accent">clear</span>      : Clear the terminal console`,

    'cv': `<span class="t-success">[ORIGINAL RESUME ATTACHED]</span>
  📄 File: Thasleema_Nasreen_DevOps_Resume.pdf
  👉 <a href="assets/Thasleema_Nasreen_DevOps_Resume.pdf" target="_blank" download="Thasleema_Nasreen_DevOps_Resume.pdf" class="t-prompt" style="text-decoration: underline; font-weight: bold;">Click here to open and download original CV PDF</a>`,

    'resume': `<span class="t-success">[ORIGINAL RESUME ATTACHED]</span>
  📄 File: Thasleema_Nasreen_DevOps_Resume.pdf
  👉 <a href="assets/Thasleema_Nasreen_DevOps_Resume.pdf" target="_blank" download="Thasleema_Nasreen_DevOps_Resume.pdf" class="t-prompt" style="text-decoration: underline; font-weight: bold;">Click here to open and download original CV PDF</a>`,

    'status': `<span class="t-success">[STATUS] 🚀 ACTIVE & READY FOR ACTION</span>
  • Name: Thasleema Nasreen
  • Role: DevOps Engineer / Cloud & Infrastructure Specialist
  • Location: Dubai, United Arab Emirates
  • Experience: 3 Industry Internships (DevOps, Full-Stack, Generative AI)
  • Work Authorization: Immediate Joiner (Open to UAE & Global Remote Roles)
  • Mindset: Continuous Learner, 99.99% Uptime Advocate, Solution-Oriented`,

    'experience': `<span class="t-accent">INDUSTRY EXPERIENCE (3 INTERNSHIPS):</span>
  1. <span class="t-prompt">DevOps Intern</span> @ Pace Wisdom Solutions (04/2026 – 07/2026)
     • Nginx reverse proxies, load balancing & Docker automation
  2. <span class="t-prompt">Web Developer Intern</span> @ Unlox Academy (03/2026 – 05/2026)
     • Full-stack React.js feature development & REST API database integration
  3. <span class="t-prompt">Gen AI Intern</span> @ Learner’s Byte (01/2026 – 03/2026)
     • AI agent workflows (LangChain, n8n) & LLM prompt engineering (ChatGPT, Claude, Gemini)`,

    'exp': `<span class="t-accent">INDUSTRY EXPERIENCE (3 INTERNSHIPS):</span>
  1. <span class="t-prompt">DevOps Intern</span> @ Pace Wisdom Solutions (04/2026 – 07/2026)
     • Nginx reverse proxies, load balancing & Docker automation
  2. <span class="t-prompt">Web Developer Intern</span> @ Unlox Academy (03/2026 – 05/2026)
     • Full-stack React.js feature development & REST API database integration
  3. <span class="t-prompt">Gen AI Intern</span> @ Learner’s Byte (01/2026 – 03/2026)
     • AI agent workflows (LangChain, n8n) & LLM prompt engineering (ChatGPT, Claude, Gemini)`,

    'skills': `<span class="t-accent">CLOUD & DEVOPS STACK:</span>
  • Cloud: AWS (VPC, EC2, S3, RDS, ALB, ASG, IAM, Route53, CloudWatch), GCP
  • Infrastructure as Code: Terraform (Modular, Zero Drift)
  • Containers & Orchestration: Docker, Docker Compose, Kubernetes (K8s Pods, Deployments)
  • CI/CD & Automation: GitLab CI/CD, GitHub Actions, Jenkins
  • Observability: Prometheus, Grafana, Grafana Loki, Promtail, Node Exporter
  • Systems & Security: Linux (Ubuntu/CentOS), Bash Scripting, Python, SC-900, Vault, SSL/TLS`,

    'deploy': `<span class="t-prompt">[TERRAFORM INITIALIZATION]</span>
  Initializing provider plugins: aws v5.40.0... <span class="t-success">SUCCESS</span>
  Analyzing infrastructure drift... <span class="t-success">0 DRIFT DETECTED</span>
  Provisioning AWS VPC (10.0.0.0/16) across 2 Availability Zones...
  Creating Public & Private Subnets, Internet Gateway & NAT Gateways... <span class="t-success">DONE</span>
  Configuring Application Load Balancer & Auto Scaling Group... <span class="t-success">DONE</span>
  Building Docker image: <span class="t-accent">ghcr.io/thasleema/cloud-app:v1.2.0</span>...
  Executing security vulnerability scan (Trivy)... <span class="t-success">0 HIGH / 0 CRITICAL</span>
  Deploying container pods with rolling update strategy...
  Health check: HTTP GET /healthz returned 200 OK
  <span class="t-success">✔ DEPLOYMENT SUCCESSFUL! All services healthy & monitored via Prometheus/Grafana.</span>`,

    'awards': `<span class="t-accent">HONORS & CERTIFICATIONS:</span>
  🏆 1st Prize Jury's Award - Project OMEGA 2025 (24-hour National Hackathon)
  🎖️ Google Cloud Arcade Trooper Milestone - Google Cloud Facilitator Program
  📜 Microsoft Certified: SC-900 (Security, Compliance & Identity)
  📜 AWS Educate - Introduction to Cloud
  📜 IBM - Rapid Development for AI Services
  📜 Complete Full-Stack Web Development Bootcamp`,

    'contact': `<span class="t-accent">DIRECT CONTACT DETAILS:</span>
  • Email: <a href="mailto:thasleemanasreen19@gmail.com" class="t-prompt">thasleemanasreen19@gmail.com</a>
  • Phone / WhatsApp: <a href="tel:+971558702460" class="t-prompt">+971 558702460</a>
  • Location: Dubai, United Arab Emirates
  • GitHub: github.com/Thasleema-Nasreen
  • LinkedIn: linkedin.com/in/thasleema-nasreen`,

    'clear': '__CLEAR__'
  };

  function executeCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      terminalOutput.innerHTML = '';
      return;
    }

    // Add command line
    const cmdLine = document.createElement('div');
    cmdLine.className = 'terminal-line';
    cmdLine.innerHTML = `<span class="t-prompt">➜</span> <span class="t-user">thasleema@dubai-cloud</span>:<span class="t-path">~</span>$ ${escapeHtml(cmdRaw)}`;
    terminalOutput.appendChild(cmdLine);

    // Add output
    const outLine = document.createElement('div');
    outLine.className = 'terminal-line';

    if (commands[cmd]) {
      outLine.innerHTML = commands[cmd];
    } else {
      outLine.innerHTML = `<span style="color: #F87171;">command not found: "${escapeHtml(cmdRaw)}". Type '<span class="t-accent">help</span>' to inspect available instructions.</span>`;
    }
    terminalOutput.appendChild(outLine);

    // Scroll to bottom
    if (terminalBody) {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
  }

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value;
        terminalInput.value = '';
        executeCommand(val);
      }
    });
  }

  tchips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
      }
    });
  });

  // 4. Projects Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal || category.includes(filterVal)) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => { card.style.display = 'none'; }, 250);
        }
      });
    });
  });

  // 5. Interactive Project Details Modal
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalContent = document.getElementById('modalBodyContent');
  const viewDetailsBtns = document.querySelectorAll('.view-project-btn');

  const projectDetailsData = {
    'project-aws': {
      title: 'Secure AWS Cloud Infrastructure & Automated CI/CD Pipeline',
      subtitle: 'Production Infrastructure as Code (Terraform) & Automated GitLab CI/CD',
      architecture: 'Multi-AZ AWS VPC • Public / Private Subnets • Bastion Host • ALB • RDS Isolation • GitLab Runner',
      overview: 'Engineered a highly resilient, isolated multi-tier cloud infrastructure on AWS utilizing modular Terraform scripts to adhere strictly to Infrastructure as Code (IaC) principles. Eliminated configuration drift and built an end-to-end GitLab CI/CD pipeline triggering automated Docker builds and zero-downtime rolling deployments.',
      highlights: [
        'Isolated application instances and MySQL/Postgres RDS database within strict private subnets without public IPv4 exposure.',
        'Hardened ingress traffic using an Application Load Balancer with SSL/TLS termination and a secure Bastion Host for SSH management.',
        'Constructed modular Terraform IaC modules (VPC, Subnets, Route Tables, NAT, ALB, Security Groups) allowing rapid provisioning across environments.',
        'Automated Dockerized application builds upon every commit in GitLab CI/CD, testing container integrity and pushing to container registries with automated rollbacks.'
      ],
      techStack: ['AWS VPC', 'Terraform (IaC)', 'Docker', 'GitLab CI/CD', 'AWS ALB', 'RDS Multi-AZ', 'Bastion Host', 'Linux']
    },
    'project-obs': {
      title: 'Distributed Observability & Centralized Log Management',
      subtitle: 'Full-Stack Telemetry with Prometheus, Grafana, Loki & Promtail',
      architecture: 'Distributed Node Exporters • Promtail Daemon • Central Prometheus Server • Loki Object Store • Grafana Dashboards',
      overview: 'Architected and deployed a production-grade observability and logging infrastructure across distributed virtual instances. Solved distributed debugging bottlenecks by aggregating metrics and structured log streams into a single pane of glass.',
      highlights: [
        'Configured Prometheus with automated service discovery and Node Exporters across target instances to monitor real-time CPU, RAM, disk I/O, and socket exhaustion.',
        'Constructed comprehensive Grafana visualization dashboards with granular alerting rules, notifying on latency spikes and service health degradation.',
        'Implemented centralized log aggregation using Grafana Loki and lightweight Promtail collectors, reducing incident root-cause diagnosis time by over 60%.',
        'Streamlined troubleshooting workflows for development teams by linking log context directly with corresponding Prometheus metric anomalies.'
      ],
      techStack: ['Prometheus', 'Grafana', 'Grafana Loki', 'Promtail', 'Node Exporter', 'Alertmanager', 'Linux Administration']
    },
    'project-estate': {
      title: 'Cloud-Native Full-Stack Real Estate Platform',
      subtitle: 'Scalable Microservices Architecture with React, Node.js & MongoDB Atlas on AWS',
      architecture: 'AWS S3 CloudFront (Static React) • AWS EC2 Linux (Node.js REST API) • MongoDB Atlas Cloud Cluster',
      overview: 'Engineered a modern web platform designed to streamline real estate property listings, search filters, and client inquiry workflows. Focused heavily on high availability, responsive user experience, and decoupled cloud architecture.',
      highlights: [
        'Developed RESTful API endpoints using Node.js and Express to manage high-throughput property listings, user authentication, and inquiries.',
        'Integrated cloud-hosted MongoDB Atlas with automated indexing and connection pooling for optimized query latency.',
        'Decoupled frontend and backend: hosted the React SPA statically on AWS S3 with fast caching, while backend APIs run on hardened AWS EC2 instances.',
        'Configured Nginx reverse proxy and SSL certificates for secure HTTPS data transmission and client protection.'
      ],
      techStack: ['AWS EC2', 'AWS S3', 'Node.js', 'Express', 'React.js', 'MongoDB Atlas', 'Nginx', 'RESTful APIs']
    }
  };

  viewDetailsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pId = btn.getAttribute('data-project');
      const data = projectDetailsData[pId];
      if (data && modalOverlay && modalContent) {
        modalContent.innerHTML = `
          <div style="margin-bottom: 1.5rem;">
            <span class="pill pill-rose" style="margin-bottom: 0.75rem;">${data.subtitle}</span>
            <h2 style="font-size: 1.75rem; font-weight: 800; color: #0F172A; margin: 0.5rem 0;">${data.title}</h2>
            <div style="font-size: 0.88rem; color: #E11D48; font-weight: 600; font-family: var(--font-mono);">${data.architecture}</div>
          </div>
          <div style="margin-bottom: 1.75rem; color: #334155; line-height: 1.7;">
            ${data.overview}
          </div>
          <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.75rem; color: #0F172A;">Technical Implementation & Impact:</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 2rem;">
            ${data.highlights.map(h => `<li style="position: relative; padding-left: 1.5rem; font-size: 0.93rem; color: #475569; line-height: 1.6;"><span style="position: absolute; left: 0; color: #E11D48; font-weight: bold;">✔</span> ${h}</li>`).join('')}
          </ul>
          <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.75rem; color: #0F172A;">Technologies Used:</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${data.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
        `;
        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // 6. Copy to Clipboard Utility with Toast Notification
  const copyButtons = document.querySelectorAll('.copy-btn');
  const toastNotice = document.getElementById('toastNotice');
  const toastText = document.getElementById('toastText');

  function showToast(msg) {
    if (toastNotice && toastText) {
      toastText.textContent = msg;
      toastNotice.classList.add('show');
      setTimeout(() => {
        toastNotice.classList.remove('show');
      }, 3200);
    }
  }

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const copyVal = btn.getAttribute('data-copy');
      if (copyVal) {
        navigator.clipboard.writeText(copyVal).then(() => {
          showToast(`Copied "${copyVal}" to clipboard!`);
          const origIcon = btn.innerHTML;
          btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
          setTimeout(() => {
            btn.innerHTML = origIcon;
          }, 2000);
        }).catch(() => {
          showToast(`Copied: ${copyVal}`);
        });
      }
    });
  });

  // 7. Contact Form Submission Simulation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName')?.value || 'Friend';
      showToast(`Thank you, ${name}! Your message has been received. I will respond promptly.`);
      contactForm.reset();
    });
  }

  // 8. Download / Print Resume Action
  const printResumeBtns = document.querySelectorAll('.print-resume-btn');
  printResumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  });
});
