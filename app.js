/* ==========================================================================
   ONIXUS // APEX PLATFORM SHOWCASE
   Zero-dependency UI, project renderer and interactive terminal.
   PROJECTS_DATA is defined in projects-data.js and is the single source of truth.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderProjectSections();
  renderArchitectureSummary();
  initTerminal();
  initQuickCopy();
  initToast();
});

function projectById(targetName) {
  const cleanTarget = String(targetName || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  return PROJECTS_DATA.find((project) => {
    const aliases = [project.id, project.alias, project.title]
      .filter(Boolean)
      .map((value) => String(value).toLowerCase().replace(/[^a-z0-9]/g, ""));
    return aliases.includes(cleanTarget);
  });
}

function renderProjectSections() {
  const platformContainer = document.getElementById("platformProjects");
  const bonusContainer = document.getElementById("bonusProjects");
  if (!platformContainer || !bonusContainer) return;

  const platform = PROJECTS_DATA.filter((project) => project.scope === "platform");
  const bonus = PROJECTS_DATA.filter((project) => project.scope === "bonus");

  platformContainer.innerHTML = platform.map((project) => projectCard(project, true)).join("");
  bonusContainer.innerHTML = bonus.map((project) => projectCard(project, false)).join("");
}

function projectCard(project, showContract) {
  const contract = showContract
    ? `<span class="scope-pill scope-platform">APEX v1 · ${escapeHtml(project.contractStatus || "declared")}</span>`
    : `<span class="scope-pill scope-bonus">Standalone bonus tool</span>`;

  const wikiAction = project.wikiUrl
    ? `<a href="${escapeHtml(project.wikiUrl)}" target="_blank" rel="noopener noreferrer" class="btn-card-secondary">Wiki ↗</a>`
    : "";

  const repositoryAction = project.visibility === "public" && project.githubUrl
    ? `<a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn-card-repo">GitHub Repo ↗</a>`
    : `<span class="btn-card-repo is-disabled" aria-label="Private repository">Private repository</span>`;

  const cloneAction = project.visibility === "public" && project.cloneCmd
    ? `<button class="btn-card-clone" onclick="copyCloneCommand('${escapeJsSingleQuoted(project.cloneCmd)}')" title="Скопировать команду git clone">git clone</button>`
    : "";

  return `
    <article class="project-card project-card-${escapeHtml(project.scope)}" data-project-id="${escapeHtml(project.id)}">
      <div class="card-header">
        <div class="card-icon-box" aria-hidden="true">${escapeHtml(project.icon || "◇")}</div>
        <div class="card-badges">
          ${contract}
          <span class="card-badge">${escapeHtml(project.badge)}</span>
          ${project.visibility === "private" ? '<span class="scope-pill scope-private">Private repo</span>' : ""}
        </div>
      </div>

      <div class="project-role">${escapeHtml(project.platformRole || "")}</div>
      <h3 class="card-title">${escapeHtml(project.title)}</h3>
      <p class="card-summary">${escapeHtml(project.summary)}</p>

      <ul class="card-highlights">
        ${project.highlights.slice(0, 4).map((item) => `
          <li class="highlight-item"><span class="highlight-dot"></span><span>${escapeHtml(item)}</span></li>
        `).join("")}
      </ul>

      <div class="card-tags">
        ${project.tags.map((tag) => `<span class="tag-pill">#${escapeHtml(tag)}</span>`).join("")}
      </div>

      <div class="card-actions">
        ${repositoryAction}
        ${wikiAction}
        ${cloneAction}
      </div>
    </article>`;
}

function renderArchitectureSummary() {
  const container = document.getElementById("architectureGrid");
  if (!container) return;
  const platform = PROJECTS_DATA.filter((project) => project.scope === "platform");

  container.innerHTML = platform.map((project) => {
    const body = `
      <span class="architecture-node-icon">${escapeHtml(project.icon || "◇")}</span>
      <span class="architecture-node-copy">
        <strong>${escapeHtml(project.title)}</strong>
        <small>${escapeHtml(project.platformRole)}</small>
      </span>
      <span class="architecture-node-status">${project.visibility === "private" ? "private" : "enforced"}</span>`;

    if (project.visibility === "public" && project.githubUrl) {
      return `<a class="architecture-node" href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer">${body}</a>`;
    }

    return `<div class="architecture-node architecture-node-private" title="Repository is private">${body}</div>`;
  }).join("");
}

/* --------------------------------------------------------------------------
   Interactive Terminal
   -------------------------------------------------------------------------- */

function initTerminal() {
  const input = document.getElementById("terminalInput");
  const output = document.getElementById("terminalBody");
  const terminalWrapper = document.querySelector(".terminal-wrapper");
  if (!input || !output) return;

  const history = [];
  let historyIndex = -1;
  const availableCommands = [
    "help", "platform", "bonus", "projects", "contract", "tree", "wiki",
    "apex-gateway", "shapoclyack", "lariska", "ferrum", "bsdm", "pulse",
    "okora", "asmodeus", "evacal", "metis", "whoami", "contact", "clear", "date"
  ];

  if (terminalWrapper) {
    terminalWrapper.addEventListener("click", (event) => {
      if (event.target.tagName !== "BUTTON" && event.target.tagName !== "A") input.focus();
    });
  }

  printOutput(`
<span class="output-accent">ONIXUS // APEX Platform Shell v4.0</span>
Platform: <span class="output-success">8 APEX components</span> · Bonus: <span class="output-warning">EvaCal, Metis</span>
Type <span class="output-success">'help'</span>, <span class="output-success">'platform'</span>, <span class="output-success">'bonus'</span>, <span class="output-success">'contract'</span> or <span class="output-success">'tree'</span>.
---------------------------------------------------------------------`);

  function handleCommand(rawCommand) {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    history.push(trimmed);
    historyIndex = history.length;
    printOutput(`<span class="terminal-prompt">onixus@apex:~$</span> <span class="output-highlight">${escapeHtml(trimmed)}</span>`);

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ").toLowerCase();

    switch (cmd) {
      case "help":
        printOutput(`
<span class="output-highlight">Команды:</span>
  <span class="output-accent">platform</span>       - 8 компонентов APEX Platform
  <span class="output-accent">bonus</span>          - standalone инструменты EvaCal и Metis
  <span class="output-accent">contract</span>       - ключевые правила APEX Architecture Contract v1
  <span class="output-accent">projects</span>       - весь публичный каталог, сгруппированный по scope
  <span class="output-accent">tree [project]</span> - архитектурное дерево или структура конкретного проекта
  <span class="output-accent">wiki</span>           - Shapoclyack Enterprise Wiki
  <span class="output-accent">cat &lt;project&gt;</span> - подробности проекта
  <span class="output-accent">whoami</span>         - инженерный профиль
  <span class="output-accent">contact</span>        - ссылки
  <span class="output-accent">clear</span>          - очистить терминал`);
        break;

      case "platform":
        showProjectList("platform");
        break;

      case "bonus":
        showProjectList("bonus");
        break;

      case "projects":
      case "ls":
        showProjectList("platform");
        showProjectList("bonus");
        break;

      case "contract":
        showContract();
        break;

      case "tree":
      case "structure":
      case "arch":
        if (arg) showProjectStructure(arg);
        else showPlatformTree();
        break;

      case "wiki":
        showWiki();
        break;

      case "cat":
        if (!arg) printOutput('<span class="output-warning">Использование: cat &lt;project&gt;</span>');
        else showProjectDetails(arg);
        break;

      case "apex":
      case "gateway":
      case "apex-gateway":
        showProjectDetails("apex-gateway");
        break;

      case "bsdm":
      case "bsdm-proxy":
        showProjectDetails("bsdm");
        break;

      case "oko-ra":
      case "okora":
        showProjectDetails("okora");
        break;

      case "shapoclyack":
      case "lariska":
      case "ferrum":
      case "pulse":
      case "asmodeus":
      case "evacal":
      case "metis":
        showProjectDetails(cmd);
        break;

      case "whoami":
        printOutput(`
<span class="output-accent">Engineering profile:</span>
  • Systems programming, cloud-native security and integration architecture
  • Rust, Python, Go, TypeScript, Kubernetes, eBPF, ClickHouse, NATS
  • Focus: explicit ownership, versioned boundaries, evidence-backed security claims`);
        break;

      case "contact":
        printOutput(`
<span class="output-accent">Links:</span>
  • GitHub: <a href="https://github.com/onixus" target="_blank" class="output-success">github.com/onixus ↗</a>
  • APEX contract: <span class="output-dim">canonical source is maintained in the private platform repository</span>
  • Shapoclyack Wiki: <a href="https://github.com/onixus/Shapoclyack/wiki" target="_blank" class="output-success">GitHub Wiki ↗</a>`);
        break;

      case "date":
        printOutput(`<span class="output-dim">${new Date().toUTCString()}</span>`);
        break;

      case "clear":
        output.innerHTML = "";
        break;

      default:
        if (!showProjectDetails(cmd, true)) {
          printOutput(`<span class="output-warning">Команда не найдена: '${escapeHtml(cmd)}'. Введите 'help'.</span>`);
        }
    }

    output.scrollTop = output.scrollHeight;
  }

  function showProjectList(scope) {
    const projects = PROJECTS_DATA.filter((project) => project.scope === scope);
    const title = scope === "platform"
      ? "APEX PLATFORM · canonical participants"
      : "BONUS TOOLS · standalone colleague utilities";
    printOutput(`
<span class="output-accent">=== ${title} ===</span>
${projects.map((project, index) => `  [${index + 1}] <span class="output-success">${escapeHtml(project.title)}</span> — ${escapeHtml(project.platformRole)}`).join("\n")}`);
  }

  function showContract() {
    printOutput(`
<span class="output-accent">=== APEX Architecture Contract v1 ===</span>
  • Gateway is an integration plane, <span class="output-highlight">not downstream source of truth</span>.
  • Safety-critical authorization is re-checked by the owning service.
  • ClickHouse is analytics/read projection, never transactional control-plane state.
  • Cross-system links use canonical refs; private DB coupling is forbidden.
  • Integration APIs/events are explicitly versioned.
  • Async consumers are idempotent and do not rely on exactly-once broker semantics.
  • W3C Trace Context crosses service boundaries.
  • Production promotion requires immutable versioning, SHA256, SBOM, signature and provenance.

Canonical source: <span class="output-dim">private platform repository · contracts/v1/CONTRACT.md</span>`);
  }

  function showPlatformTree() {
    printOutput(`
<span class="output-accent">=== APEX Platform ===</span>
<span class="output-dim">APEX Gateway / Integration Plane
├── Shapoclyack     [EASM / RBVM]
│   └── Lariska     [Endpoint Inventory]
├── Pulse           [Network Scanner]
├── BSDM-Proxy      [Secure Web Gateway]
├── Ferrum          [Kubernetes Enforcement]
├── Oko-Ra          [World-model Risk]
└── Asmodeus        [Synthetic BAS]

Standalone bonus tools
├── EvaCal          [ГОСТ 34 / Estimation]
└── Metis           [Portfolio Governance]</span>

The bonus tools are intentionally outside the APEX participant registry.`);
  }

  function showProjectStructure(targetName) {
    const project = projectById(targetName);
    if (!project) {
      printOutput(`<span class="output-warning">Проект '${escapeHtml(targetName)}' не найден.</span>`);
      return;
    }
    printOutput(`
<span class="output-accent">=== ${escapeHtml(project.title)} structure ===</span>
<span class="output-dim">${escapeHtml(project.structure)}</span>
<span class="output-highlight">Repository:</span> ${project.visibility === "public" && project.githubUrl
      ? `<a href="${escapeHtml(project.githubUrl)}" target="_blank" class="output-success">${escapeHtml(project.githubUrl)}</a>`
      : '<span class="output-dim">private</span>'}`);
  }

  function showProjectDetails(targetName, silentIfNotFound = false) {
    const project = projectById(targetName);
    if (!project) {
      if (!silentIfNotFound) printOutput(`<span class="output-warning">Проект '${escapeHtml(targetName)}' не найден.</span>`);
      return false;
    }

    const scopeLine = project.scope === "platform"
      ? `<span class="output-success">APEX PLATFORM · contract ${escapeHtml(project.contractStatus || "declared")}</span>`
      : '<span class="output-warning">STANDALONE BONUS TOOL · outside APEX platform</span>';

    printOutput(`
<span class="output-accent">=== ${escapeHtml(project.title)} ===</span>
${scopeLine}
<span class="output-highlight">Role:</span> ${escapeHtml(project.platformRole)}
${escapeHtml(project.description)}

<span class="output-highlight">Capabilities:</span>
${project.highlights.map((item) => `  • ${escapeHtml(item)}`).join("\n")}

<span class="output-highlight">Repository:</span> ${project.visibility === "public" && project.githubUrl
      ? `<a href="${escapeHtml(project.githubUrl)}" target="_blank" class="output-success">${escapeHtml(project.githubUrl)}</a>`
      : '<span class="output-dim">private</span>'}
${project.visibility === "public" && project.cloneCmd
      ? `<span class="output-highlight">Clone:</span> <span class="output-success">${escapeHtml(project.cloneCmd)}</span>`
      : ""}`);
    return true;
  }

  function showWiki() {
    printOutput(`
<span class="output-accent">=== Shapoclyack Enterprise Wiki ===</span>
Operational role guides, vulnerability-management processes, SLA, emergency response and implementation roadmap.
  • <a href="https://github.com/onixus/Shapoclyack/wiki" target="_blank" class="output-success">GitHub Wiki ↗</a>
  • <a href="https://github.com/onixus/Shapoclyack/tree/main/docs/wiki" target="_blank" class="output-success">docs/wiki source ↗</a>`);
  }

  function printOutput(html) {
    const div = document.createElement("div");
    div.className = "terminal-output";
    div.innerHTML = html;
    output.appendChild(div);
  }

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const value = input.value;
      input.value = "";
      handleCommand(value);
    } else if (event.key === "ArrowUp") {
      if (historyIndex > 0) {
        historyIndex -= 1;
        input.value = history[historyIndex] || "";
      }
      event.preventDefault();
    } else if (event.key === "ArrowDown") {
      if (historyIndex < history.length - 1) {
        historyIndex += 1;
        input.value = history[historyIndex] || "";
      } else {
        historyIndex = history.length;
        input.value = "";
      }
      event.preventDefault();
    } else if (event.key === "Tab") {
      event.preventDefault();
      const current = input.value.trim().toLowerCase();
      const match = availableCommands.find((command) => command.startsWith(current));
      if (match) input.value = match;
    }
  });

  window.runTerminalCommand = (command) => {
    input.value = command;
    handleCommand(command);
    input.focus();
  };
}

/* --------------------------------------------------------------------------
   Clipboard and toast
   -------------------------------------------------------------------------- */

function initQuickCopy() {
  window.copyCloneCommand = (command) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(command)
        .then(() => showToast(`Скопировано: ${command}`))
        .catch(() => fallbackCopy(command));
    } else {
      fallbackCopy(command);
    }
  };
}

function fallbackCopy(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    showToast(`Скопировано: ${text}`);
  } catch (_) {
    showToast("Не удалось скопировать команду");
  }
  document.body.removeChild(textArea);
}

function initToast() {
  let timeout;
  window.showToast = (message) => {
    let toast = document.getElementById("toast");
    if (!toast) {
      const container = document.createElement("div");
      container.className = "toast-container";
      container.innerHTML = '<div id="toast" class="toast"></div>';
      document.body.appendChild(container);
      toast = document.getElementById("toast");
    }

    toast.innerHTML = `<span aria-hidden="true">✓</span><span>${escapeHtml(message)}</span>`;
    toast.classList.add("show");
    clearTimeout(timeout);
    timeout = setTimeout(() => toast.classList.remove("show"), 3000);
  };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeJsSingleQuoted(value) {
  return String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'");
}
