/* ==========================================================================
   ONIXUS // SEC_LAB — Modern DevSecOps & Systems Showcase
   Application Logic & Interactive Terminal Engine
   ========================================================================== */

const PROJECTS_DATA = [
  {
    id: "ferrum",
    title: "FERRUM",
    category: "security",
    badge: "Rust • Kubernetes Security",
    summary: "Self-hosted Kubernetes enforcement plane на Rust. Admission + runtime enforcement, подписанные policy bundle, last-known-good вместо fail-open.",
    description: "Строгий enforcement plane для Kubernetes, ориентированный на детерминированную безопасность. Обеспечивает строгий admission control, подпись и валидацию политик (policy bundles), а также отказоустойчивый режим last-known-good вместо опасного fail-open.",
    highlights: [
      "Admission + Runtime Enforcement",
      "Подписанные Policy Bundles (Sigstore/Cosign)",
      "Отказоустойчивость: Last-Known-Good кэш",
      "Высокая производительность на Rust"
    ],
    structure: `ferrum/
├── Cargo.toml
├── crates/
│   ├── ferrum-admission/     # Webhook admission controller (Validating/Mutating)
│   ├── ferrum-runtime/       # Runtime security & eBPF enforcement engine
│   ├── ferrum-policy/        # Sigstore/Cosign bundle validation & compiler
│   └── ferrum-core/          # Last-known-good state machine & cache
└── config/
    ├── crds/                 # CustomResourceDefinitions (FerrumPolicy)
    └── manifests/            # DaemonSet & Webhook deployment manifests`,
    tags: ["Rust", "Kubernetes", "Admission-Control", "Runtime-Security", "Policy-Bundles"],
    githubUrl: "https://github.com/onixus/Ferrum",
    cloneCmd: "git clone https://github.com/onixus/Ferrum.git",
    icon: "shield"
  },
  {
    id: "shapoclyack",
    title: "Shapoclyack",
    category: "security",
    badge: "Python • Cloud Native EASM",
    summary: "Self-hosted external attack surface discovery & vulnerability management platform.",
    description: "Комплексная система обнаружения внешней поверхности атаки (EASM), инвентаризации сетевых активов и управления уязвимостями. Спроектирована для автономного развертывания в Kubernetes с использованием Kustomize манифестов.",
    highlights: [
      "External Attack Surface Discovery (EASM)",
      "Непрерывный аудит активов, портов и сертификатов",
      "Корреляция уязвимостей периметра (CVE)",
      "Готовые манифесты для Kubernetes / Kustomize"
    ],
    structure: `shapoclyack/
├── pyproject.toml
├── app/
│   ├── core/                 # EASM scanner engine & asset inventory
│   ├── api/                  # FastAPI REST endpoints & Prometheus metrics
│   ├── scanners/             # Subdomain, port, TLS & CVE discovery modules
│   └── worker/               # Celery / Redis background task queue
├── deploy/
│   └── kustomize/            # Base & Overlay manifests for Kubernetes
└── docker-compose.yml`,
    tags: ["Python", "Kubernetes", "Kustomize", "EASM", "Vulnerability-Management"],
    githubUrl: "https://github.com/onixus/Shapoclyack",
    cloneCmd: "git clone https://github.com/onixus/Shapoclyack.git",
    icon: "radar"
  },
  {
    id: "bsdm",
    alias: "bsdm-proxy",
    title: "BSDM-Proxy",
    category: "network",
    badge: "Rust • Secure Web Gateway",
    summary: "HTTPS caching proxy & Secure Web Gateway (SWG) на Rust с изолированной консолью администратора.",
    description: "Высокопроизводительный кэширующий HTTPS прокси-сервер и шлюз безопасности веб-доступа (Secure Web Gateway). Включает встроенную панель администрирования, автоматизированные CI/CD пайплайны и строгий контроль трафика.",
    highlights: [
      "HTTPS Caching & Трафик-контроль",
      "Secure Web Gateway (SWG) архитектура",
      "Выделенная Admin Console",
      "Сверхбыстрый асинхронный I/O на Rust"
    ],
    structure: `bsdm-proxy/
├── Cargo.toml
├── src/
│   ├── main.rs
│   ├── proxy/                # Tokio/Hyper async HTTPS caching proxy engine
│   ├── swg/                  # TLS inspection & Secure Web Gateway rules
│   ├── admin_ui/             # Embedded web console & dashboard
│   └── auth/                 # RBAC & bearer token authorization
└── config/
    └── bsdm.example.toml     # Routing, caching & SWG policy config`,
    tags: ["Rust", "SWG", "Proxy-Server", "WebGateway", "Admin-Console"],
    githubUrl: "https://github.com/onixus/bsdm-proxy",
    cloneCmd: "git clone https://github.com/onixus/bsdm-proxy.git",
    icon: "server"
  },
  {
    id: "lariska",
    title: "Lariska",
    category: "telemetry",
    badge: "Rust • Endpoint Agent",
    summary: "Высокопроизводительный легковесный кроссплатформенный агент инвентаризации конечных точек для экосистемы Shapoclyack.",
    description: "Системный агент телеметрии и инвентаризации: собирает информацию об установленном ПО, детектирует сторонние и неучтенные пакеты в рантайме (Shadow IT), собирает метаданные контейнеров/виртуализации и отправляет сжатые версионированные снапшоты с локальным спулингом.",
    highlights: [
      "Детекция несанкционированного ПО (Shadow IT)",
      "Инвентаризация хостов, контейнеров и виртуализации",
      "Локальный спулинг и защита от падений (Crash Recovery)",
      "Минимальный футпринт по памяти и CPU"
    ],
    structure: `lariska/
├── Cargo.toml
├── src/
│   ├── main.rs
│   ├── collector/            # OS packages, kernel modules & process telemetry
│   ├── shadow_it/            # Runtime unauthorized binary detector
│   ├── spool/                # Local crash-resilient disk spooler
│   └── transport/            # mTLS compressed snapshot sender
└── packaging/
    └── systemd/              # Linux systemd daemon service definition`,
    tags: ["Rust", "Endpoint-Agent", "Shadow-IT", "Telemetry", "Inventory"],
    githubUrl: "https://github.com/onixus/Lariska",
    cloneCmd: "git clone https://github.com/onixus/Lariska.git",
    icon: "cpu"
  },
  {
    id: "evacal",
    title: "EvaCal",
    category: "enterprise",
    badge: "TypeScript • Enterprise Tooling",
    summary: "Корпоративный калькулятор трудозатрат и автоматизированный генератор документации по ГОСТ 34 / ГОСТ 2.104.",
    description: "Профессиональная платформа для пресейла, комплексной оценки трудозатрат ИТ-проектов и автоматической генерации полного комплекта нормативно-технической документации (ГОСТ 34.602-2020 / РД 50-34.698-90) с основной надписью по ГОСТ 2.104-2006 и сквозной матрицей трассируемости.",
    highlights: [
      "Календарный план и сметные расчеты КП",
      "Генерация ТЗ и документации по ГОСТ 34.602-2020",
      "Оформление по ГОСТ 2.104-2006 (Формы 2 и 2а)",
      "Сквозная матрица требований и трассируемости"
    ],
    structure: `evacal/
├── package.json
├── tsconfig.json
├── src/
│   ├── engine/               # Labor cost estimation & calendar planner
│   ├── gost/                 # GOST 34.602 & RD 50-34.698 doc generator
│   ├── stamps/               # GOST 2.104 title blocks (Form 2 / 2a)
│   └── ui/                   # Interactive estimation dashboard
└── templates/
    └── gost_spec.json        # Standard requirements & traceability matrix`,
    tags: ["TypeScript", "ГОСТ-34", "Presale", "Estimation", "Enterprise-Docs"],
    githubUrl: "https://github.com/onixus/EvaCal",
    cloneCmd: "git clone https://github.com/onixus/EvaCal.git",
    icon: "file-text"
  }
];

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initTerminal();
  initQuickCopy();
  initToast();
});

/* --------------------------------------------------------------------------
   Interactive Terminal Emulator
   -------------------------------------------------------------------------- */
function initTerminal() {
  const input = document.getElementById("terminalInput");
  const output = document.getElementById("terminalBody");
  const terminalWrapper = document.querySelector(".terminal-wrapper");
  if (!input || !output) return;

  // Auto focus input on click
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
    "tree",
    "structure",
    "arch",
    "ferrum",
    "shapoclyack",
    "bsdm",
    "bsdm-proxy",
    "lariska",
    "evacal",
    "whoami",
    "contact",
    "clear",
    "uname",
    "date"
  ];

  // Welcome banner
  printOutput(`
<span class="output-accent">ONIXUS // SEC_LAB Interactive Shell v2.4</span>
Type <span class="output-success">'help'</span>, <span class="output-success">'projects'</span> or <span class="output-success">'tree'</span> to explore, or click any button below.
---------------------------------------------------------------------`);

  function handleCommand(rawCmd) {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    history.push(trimmed);
    historyIndex = history.length;

    // Echo user prompt
    printOutput(`<span class="terminal-prompt">onixus@lab:~$</span> <span class="output-highlight">${escapeHtml(trimmed)}</span>`);

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts[1]?.toLowerCase();

    switch (cmd) {
      case "help":
        printOutput(`
<span class="output-highlight">Доступные команды терминала:</span>
  <span class="output-accent">projects</span> (или <span class="output-accent">ls</span>)  - Вывести список 5 флагманских проектов
  <span class="output-accent">tree [project]</span> - Дерево компонентов и файловая структура
  <span class="output-accent">ferrum</span>         - Детали и структура FERRUM (K8s enforcement plane)
  <span class="output-accent">shapoclyack</span>    - Детали и структура Shapoclyack (EASM & Vuln Management)
  <span class="output-accent">bsdm</span>           - Детали и структура BSDM-Proxy (HTTPS Caching & SWG)
  <span class="output-accent">lariska</span>        - Детали и структура Lariska (Endpoint inventory agent)
  <span class="output-accent">evacal</span>         - Детали и структура EvaCal (Оценка трудозатрат и ГОСТ 34)
  <span class="output-accent">cat &lt;name&gt;</span>     - Просмотр проекта (например: <span class="output-success">cat ferrum</span>)
  <span class="output-accent">whoami</span>         - Профиль инженера и компетенции
  <span class="output-accent">contact</span>        - Ссылки и репозитории
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

Введите имя проекта (например: <span class="output-success">ferrum</span>, <span class="output-success">tree</span>, <span class="output-success">tree ferrum</span>)`);
        break;

      case "tree":
      case "structure":
      case "arch":
        if (arg) {
          showProjectStructure(arg);
        } else {
          showFullEcosystemTree();
        }
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
        showProjectDetails("bsdm");
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
  • Репозиторий сайта: <a href="https://github.com/onixus/onixus.github.io" target="_blank" class="output-success">https://github.com/onixus/onixus.github.io</a>`);
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
        // Try matching by project name directly
        if (!showProjectDetails(cmd, true)) {
          printOutput(`<span class="output-warning">Команда не найдена: '${escapeHtml(cmd)}'. Введите <span class="output-success">'help'</span> для списка.</span>`);
        }
        break;
    }

    output.scrollTop = output.scrollHeight;
  }

  function findProject(targetName) {
    const cleanTarget = targetName.toLowerCase().replace(/[^a-z0-9]/g, "");
    return PROJECTS_DATA.find(p => {
      const pId = p.id.toLowerCase().replace(/[^a-z0-9]/g, "");
      const pTitle = p.title.toLowerCase().replace(/[^a-z0-9]/g, "");
      const pAlias = (p.alias || "").toLowerCase().replace(/[^a-z0-9]/g, "");
      return pId === cleanTarget || pTitle === cleanTarget || pAlias === cleanTarget;
    });
  }

  function showFullEcosystemTree() {
    printOutput(`
<span class="output-accent">=== Архитектурное дерево экосистемы ONIXUS // SEC_LAB ===</span>
<span class="output-dim">.
├── </span><span class="output-highlight">ferrum/</span>         <span class="output-accent">[Rust]</span>        Kubernetes Admission & Runtime Enforcement Plane
<span class="output-dim">├── </span><span class="output-highlight">shapoclyack/</span>    <span class="output-accent">[Python]</span>      External Attack Surface Discovery & Vulnerability Platform
<span class="output-dim">├── </span><span class="output-highlight">bsdm-proxy/</span>     <span class="output-accent">[Rust]</span>        HTTPS Caching Proxy & Secure Web Gateway (SWG)
<span class="output-dim">├── </span><span class="output-highlight">lariska/</span>        <span class="output-accent">[Rust]</span>        High-Performance Endpoint Telemetry & Inventory Agent
<span class="output-dim">└── </span><span class="output-highlight">evacal/</span>         <span class="output-accent">[TypeScript]</span>  Enterprise Labor Cost & ГОСТ 34 Documentation Generator</span>

Для просмотра детальной структуры проекта введите: <span class="output-success">tree &lt;project&gt;</span> (например: <span class="output-success">tree ferrum</span>)`);
  }

  function showProjectStructure(targetName) {
    const proj = findProject(targetName);
    if (!proj) {
      printOutput(`<span class="output-warning">Проект '${escapeHtml(targetName)}' не найден. Введите 'projects' для списка.</span>`);
      return;
    }

    printOutput(`
<span class="output-accent">=== Структура репозитория: ${escapeHtml(proj.title)} ===</span>
<span class="output-dim">${escapeHtml(proj.structure)}</span>

<span class="output-highlight">GitHub:</span> <a href="${escapeHtml(proj.githubUrl)}" target="_blank" class="output-success">${escapeHtml(proj.githubUrl)}</a>`);
  }

  function showProjectDetails(targetName, silentIfNotFound = false) {
    const proj = findProject(targetName);

    if (!proj) {
      if (!silentIfNotFound) {
        printOutput(`<span class="output-warning">Проект '${escapeHtml(targetName)}' не найден. Введите 'projects' для списка.</span>`);
      }
      return false;
    }

    printOutput(`
<span class="output-accent">=== ${escapeHtml(proj.title)} [${escapeHtml(proj.badge)}] ===</span>
${escapeHtml(proj.description)}

<span class="output-highlight">Файловая структура & компоненты:</span>
<span class="output-dim">${escapeHtml(proj.structure)}</span>

<span class="output-highlight">Ключевые возможности:</span>
${proj.highlights.map(h => `  • ${escapeHtml(h)}`).join("\n")}

<span class="output-highlight">GitHub:</span> <a href="${escapeHtml(proj.githubUrl)}" target="_blank" class="output-success">${escapeHtml(proj.githubUrl)}</a>
<span class="output-highlight">Клонировать:</span> <span class="output-success">${escapeHtml(proj.cloneCmd)}</span>`);
    return true;
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

  // Global helper for quick action buttons
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
