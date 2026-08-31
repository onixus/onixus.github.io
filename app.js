/* ==========================================================================
   ONIXUS // SEC_LAB — Modern DevSecOps & Systems Showcase
   Application Logic & Terminal Engine
   ========================================================================== */

function getProjectsData() {
  if (typeof window !== "undefined" && window.PROJECTS_DATA) {
    return window.PROJECTS_DATA;
  }
  if (typeof PROJECTS_DATA !== "undefined") {
    return PROJECTS_DATA;
  }
  return [];
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  initTerminal();
  initQuickCopy();
  initToast();
});

/* --------------------------------------------------------------------------
   Projects Grid Renderer
   -------------------------------------------------------------------------- */
function renderProjects() {
  const container = document.getElementById("projectsGrid");
  const projects = getProjectsData();
  if (!container || !projects.length) return;

  const icons = {
    shield: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    radar: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/><path d="M12 12 19 5"/></svg>`,
    server: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>`,
    cpu: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`,
    "file-text": `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>`
  };

  container.innerHTML = projects.map(project => {
    const iconSvg = icons[project.icon] || icons.shield;
    const highlightsHtml = project.highlights.map(item => `
      <li class="highlight-item">
        <span class="highlight-dot"></span>
        <span>${escapeHtml(item)}</span>
      </li>
    `).join("");

    const tagsHtml = project.tags.map(tag => `
      <span class="tag-pill">#${escapeHtml(tag)}</span>
    `).join("");

    return `
      <article class="project-card" data-project-id="${escapeHtml(project.id)}">
        <div class="card-header">
          <div class="card-icon-box">
            ${iconSvg}
          </div>
          <span class="card-badge">${escapeHtml(project.badge)}</span>
        </div>
        
        <h3 class="card-title">${escapeHtml(project.title)}</h3>
        <p class="card-summary">${escapeHtml(project.summary)}</p>
        
        <ul class="card-highlights">
          ${highlightsHtml}
        </ul>
        
        <div class="card-tags">
          ${tagsHtml}
        </div>
        
        <div class="card-actions">
          <a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn-card-repo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            GitHub Repo
          </a>
          <button class="btn-card-clone" onclick="copyCloneCommand('${escapeHtml(project.cloneCmd)}')" title="Скопировать команду git clone">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            git clone
          </button>
        </div>
      </article>
    `;
  }).join("");
}

/* --------------------------------------------------------------------------
   Interactive Terminal Emulator
   -------------------------------------------------------------------------- */
function initTerminal() {
  const input = document.getElementById("terminalInput");
  const output = document.getElementById("terminalBody");
  const terminalWrapper = document.querySelector(".terminal-wrapper");
  if (!input || !output) return;

  // Focus input when clicking anywhere on the terminal
  if (terminalWrapper) {
    terminalWrapper.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON" && e.target.tagName !== "A") {
        input.focus();
      }
    });
  }

  const history = [];
  let historyIndex = -1;

  const availableCommands = [
    "help",
    "ls",
    "projects",
    "ferrum",
    "shapoclyack",
    "bsdm",
    "lariska",
    "evacal",
    "whoami",
    "contact",
    "clear",
    "uname",
    "date"
  ];

  // Welcome Message
  printOutput(`
<span class="output-accent">ONIXUS // SEC_LAB Interactive Shell v2.4</span>
Type <span class="output-success">'help'</span> or <span class="output-success">'projects'</span>, or click any button below.
---------------------------------------------------------------------`);

  function handleCommand(rawCmd) {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    history.push(trimmed);
    historyIndex = history.length;

    // Print executed prompt line
    printOutput(`<span class="terminal-prompt">onixus@lab:~$</span> <span class="output-highlight">${escapeHtml(trimmed)}</span>`);

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts[1]?.toLowerCase();

    switch (cmd) {
      case "help":
        printOutput(`
<span class="output-highlight">Доступные команды терминала:</span>
  <span class="output-accent">projects</span> (или <span class="output-accent">ls</span>)  - Список всех флагманских проектов
  <span class="output-accent">ferrum</span>         - FERRUM (K8s enforcement plane на Rust)
  <span class="output-accent">shapoclyack</span>    - Shapoclyack (Attack Surface & Vuln Management)
  <span class="output-accent">bsdm</span>           - BSDM-Proxy (HTTPS Caching Proxy & SWG)
  <span class="output-accent">lariska</span>        - Lariska (Endpoint inventory agent на Rust)
  <span class="output-accent">evacal</span>         - EvaCal (Калькулятор трудозатрат и ГОСТ 34)
  <span class="output-accent">cat &lt;name&gt;</span>     - Посмотреть манифест проекта (например: <span class="output-success">cat ferrum</span>)
  <span class="output-accent">whoami</span>         - Профиль инженера и стек
  <span class="output-accent">contact</span>        - Ссылки и контакты
  <span class="output-accent">uname -a</span>       - Информация об окружении
  <span class="output-accent">clear</span>          - Очистить экран консоли`);
        break;

      case "ls":
      case "projects":
        printOutput(`
<span class="output-accent">=== Флагманские авторские проекты ===</span>
  [1] <span class="output-success">FERRUM</span>       - Kubernetes Admission + Runtime enforcement plane (Rust)
  [2] <span class="output-success">Shapoclyack</span>  - External Attack Surface Discovery & Vuln Platform (Python/K8s)
  [3] <span class="output-success">BSDM-Proxy</span>   - HTTPS Caching Proxy & Secure Web Gateway (Rust)
  [4] <span class="output-success">Lariska</span>      - High-performance endpoint inventory agent (Rust)
  [5] <span class="output-success">EvaCal</span>       - Enterprise ГОСТ 34 docs & labor estimation (TypeScript)

Введите имя проекта (например: <span class="output-success">ferrum</span> или <span class="output-success">cat bsdm</span>) для вывода деталей.`);
        break;

      case "cat":
        if (!arg) {
          printOutput(`<span class="output-warning">Использование: cat &lt;project-name&gt; (например: cat ferrum)</span>`);
        } else {
          showProjectDetails(arg);
        }
        break;

      case "ferrum":
        showProjectDetails("ferrum");
        break;

      case "shapoclyack":
        showProjectDetails("shapoclyack");
        break;

      case "bsdm":
      case "bsdm-proxy":
        showProjectDetails("bsdm-proxy");
        break;

      case "lariska":
        showProjectDetails("lariska");
        break;

      case "evacal":
        showProjectDetails("evacal");
        break;

      case "whoami":
        printOutput(`
<span class="output-accent">Профиль инженера:</span>
  • <span class="output-highlight">Никнейм:</span> onixus
  • <span class="output-highlight">Специализация:</span> Systems Programming, Cloud-Native Security, DevSecOps, Enterprise Automation
  • <span class="output-highlight">Основной стек:</span> Rust, Python, TypeScript, Kubernetes, Linux
  • <span class="output-highlight">GitHub:</span> https://github.com/onixus`);
        break;

      case "contact":
        printOutput(`
<span class="output-accent">Ссылки & Репозитории:</span>
  • Профиль GitHub: <a href="https://github.com/onixus" target="_blank" class="output-success">https://github.com/onixus</a>
  • Репозиторий сайта: <a href="https://github.com/onixus/Git-site" target="_blank" class="output-success">https://github.com/onixus/Git-site</a>`);
        break;

      case "uname":
      case "uname -a":
        printOutput(`<span class="output-dim">Linux onixus-sec-node 6.12.0-rust-sec #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux</span>`);
        break;

      case "date":
        printOutput(`<span class="output-dim">${new Date().toUTCString()}</span>`);
        break;

      case "clear":
        output.innerHTML = "";
        break;

      default:
        printOutput(`<span class="output-warning">Команда не найдена: '${escapeHtml(cmd)}'. Введите <span class="output-success">'help'</span> для списка команд.</span>`);
        break;
    }

    output.scrollTop = output.scrollHeight;
  }

  function showProjectDetails(id) {
    const projects = getProjectsData();
    const proj = projects.find(p => p.id === id || p.title.toLowerCase() === id);
    if (!proj) {
      printOutput(`<span class="output-warning">Проект '${escapeHtml(id)}' не найден. Введите 'projects' для списка.</span>`);
      return;
    }

    printOutput(`
<span class="output-accent">=== ${escapeHtml(proj.title)} [${escapeHtml(proj.badge)}] ===</span>
${escapeHtml(proj.description)}

<span class="output-highlight">Ключевые возможности:</span>
${proj.highlights.map(h => `  • ${escapeHtml(h)}`).join("\n")}

<span class="output-highlight">GitHub:</span> <a href="${escapeHtml(proj.githubUrl)}" target="_blank" class="output-success">${escapeHtml(proj.githubUrl)}</a>
<span class="output-highlight">Клонировать:</span> <span class="output-success">${escapeHtml(proj.cloneCmd)}</span>`);
  }

  function printOutput(html) {
    const div = document.createElement("div");
    div.className = "terminal-output";
    div.innerHTML = html;
    output.appendChild(div);
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = input.value;
      input.value = "";
      handleCommand(val);
    } else if (e.key === "ArrowUp") {
      if (historyIndex > 0) {
        historyIndex--;
        input.value = history[historyIndex] || "";
      }
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      if (historyIndex < history.length - 1) {
        historyIndex++;
        input.value = history[historyIndex] || "";
      } else {
        historyIndex = history.length;
        input.value = "";
      }
      e.preventDefault();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = input.value.trim().toLowerCase();
      if (!current) return;
      const match = availableCommands.find(c => c.startsWith(current));
      if (match) {
        input.value = match;
      }
    }
  });

  window.runTerminalCommand = function(cmdStr) {
    if (!input) return;
    input.value = cmdStr;
    handleCommand(cmdStr);
    input.focus();
  };
}

/* --------------------------------------------------------------------------
   Quick Copy & Toast Notifications
   -------------------------------------------------------------------------- */
function initQuickCopy() {
  window.copyCloneCommand = function(cmd) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cmd).then(() => {
        showToast(`Скопировано: ${cmd}`);
      }).catch(() => {
        fallbackCopy(cmd);
      });
    } else {
      fallbackCopy(cmd);
    }
  };

  function fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`Скопировано: ${text}`);
    } catch (err) {
      showToast("Ошибка копирования в буфер");
    }
    document.body.removeChild(textArea);
  }
}

function initToast() {
  let toastTimeout;
  window.showToast = function(message) {
    let toast = document.getElementById("toast");
    if (!toast) {
      const container = document.createElement("div");
      container.className = "toast-container";
      container.innerHTML = `<div id="toast" class="toast"></div>`;
      document.body.appendChild(container);
      toast = document.getElementById("toast");
    }

    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      <span>${escapeHtml(message)}</span>
    `;
    toast.classList.add("show");

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  };
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
