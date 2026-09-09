/* ==========================================================================
   ONIXUS // SEC_LAB — Modern DevSecOps & Systems Showcase
   Application Logic & Interactive Terminal Engine
   ========================================================================== */

var PROJECTS_DATA = [
  {
    id: "asmodeus",
    title: "ASMODEUS",
    category: "security",
    badge: "Rust • BAS & Red Team",
    summary: "Adversary Emulation (BAS), Red Team Cyber Exercises & Chaos Engineering Engine на Rust (NIST CSF 2.0).",
    description: "Автономный наступательный движок моделирования атак и стресс-тестирования инфраструктуры. Проводит контролируемые кибер-учения по MITRE ATT&CK для непрерывной валидации защитных контуров ядра Ferrum, шлюза BSDM-Proxy и агентов Lariska.",
    highlights: [
      "8 сценариев атак по MITRE ATT&CK (Ransomware, K8s Escape, C2, Exfiltration)",
      "Инфраструктурный хаос (LATENCY_SPIKE, AGENT_CRASH, DNS_SINKHOLE_DROP)",
      "Защитные барьеры: Blast Radius limit, Circuit Breaker, Auto-Rollback",
      "Автоматический замер метрик Blue Team: MTTD, MTTR, Resilience Score"
    ],
    structure: `asmodeus/
├── Cargo.toml
├── crates/
│   ├── asmodeus-control-plane/ # REST & gRPC mTLS orchestration API
│   ├── asmodeus-runner/        # Lightweight attack runner (<32MB RAM, <5% CPU)
│   ├── asmodeus-dsl/           # Attack & Chaos scenario definition engine
│   ├── asmodeus-safety/        # Blast Radius, Circuit Breaker & Dead-man switch
│   └── asmodeus-telemetry/     # Blue Team MTTD/MTTR reaction observer
└── docs/
    ├── FTT.md                  # Functional and Technical Requirements
    ├── TT.md                   # Technical Specification & API contracts
    └── ARCHITECTURE.md         # Canonical architectural design & crate graph`,
    tags: ["Rust", "BAS", "Red-Team", "MITRE-ATTCK", "Chaos-Engineering", "Tokio"],
    githubUrl: "https://github.com/onixus/Asmodeus",
    cloneCmd: "git clone https://github.com/onixus/Asmodeus.git",
    icon: "zap"
  },
  {
    id: "ferrum",
    title: "FERRUM",
    category: "security",
    badge: "Rust • Kubernetes eBPF Security",
    summary: "Self-hosted Kubernetes enforcement plane на Rust. Admission + runtime enforcement, подписанные policy bundle, last-known-good вместо fail-open.",
    description: "Строгий enforcement plane для Kubernetes, ориентированный на детерминированную безопасность. Обеспечивает низкоуровневый eBPF-перехват системных вызовов в ядре Linux, строгий admission control, подпись и валидацию политик (Ed25519), а также мгновенный SIGKILL нарушителей.",
    highlights: [
      "eBPF sys_enter tracepoint datapath (aya-ebpf под target_arch = bpf)",
      "Admission Webhook: fail-closed, hot-reload bundle, LKG на диске",
      "Ed25519 Signed Bundles: офлайн-выпуск PKI и валидация политик",
      "Strict Boundary Gate: строгий контроль покрытия тестами (boundary_gate.rs)"
    ],
    structure: `ferrum/
├── Cargo.toml
├── crates/
│   ├── ferrum-ebpf/          # Userspace loader, prefilter, decoder kernel-записей
│   ├── ferrum-ebpf-progs/    # eBPF datapath: sys_enter tracepoint (aya-ebpf)
│   ├── ferrum-admission/     # Validating/mutating webhook, fail-closed, LKG
│   ├── ferrum-agent/         # BPF-носитель, LKG на диске, respond через SIGKILL
│   ├── ferrum-crypto/        # Ed25519 подпись bundle, X.509/mTLS material
│   ├── ferrum-controller/    # Reconcile CRD -> compile -> rollout через Secret
│   ├── ferrum-cli/           # ferrumctl: validate, compile, sign, verify
│   └── ferrum-testkit/       # Boundary gates и replay ring-buffer тестов
└── docs/
    └── MVP-1-BOUNDARY.md     # Границы MVP-1 и приемочные критерии`,
    tags: ["Rust", "Kubernetes", "eBPF", "Aya", "Admission-Control", "Runtime-Security"],
    githubUrl: "https://github.com/onixus/Ferrum",
    cloneCmd: "git clone https://github.com/onixus/Ferrum.git",
    icon: "shield"
  },
  {
    id: "shapoclyack",
    title: "Shapoclyack",
    category: "security",
    badge: "Python • EASM & RBVM",
    summary: "Self-hosted EASM, CAASM и Risk-Based Vulnerability Management платформа со встроенной Enterprise Wiki.",
    description: "Комплексная платформа непрерывного обнаружения внешней поверхности атаки (EASM) и управления рисками уязвимостей. Заменяет шум традиционных сканеров механической верификацией устранения дефектов, двухосевой оценкой риска по стандарту NIST SP 800-30 Rev. 1, точным учетом бэкпортов вендоров и полной корпоративной базой знаний (Wiki).",
    highlights: [
      "Asset-Centric модель: сохранение контекста активов при смене IP/DHCP адресации",
      "Двухосевой риск по NIST SP 800-30 Rev. 1: Risk = f(Likelihood, Impact)",
      "Механическая ре-верификация закрытия (machine_verified = true)",
      "Distro-Aware Vendor Advisory Matching: учет бэкпортов Ubuntu USN / Debian Security",
      "Enterprise Wiki: ролевые сценарии (Инженер, Архитектор, CISO) и регламенты SLA"
    ],
    structure: `shapoclyack/
├── pyproject.toml
├── app/
│   ├── core/                 # EASM scanner engine & asset inventory
│   ├── api/                  # FastAPI REST endpoints & verification API
│   ├── scanners/             # Subdomain, port, TLS, NSE & CVE modules
│   └── worker/               # NATS JetStream distributed task consumer
├── web-next/                 # Modern Next.js 14 Web Operator Console
├── docs/
│   ├── wiki/                 # Enterprise Wiki: role guides & security processes
│   │   ├── README.md         # Wiki Home & Portal
│   │   ├── scenarios-security-engineer.md
│   │   ├── scenarios-architect.md
│   │   ├── scenarios-ciso.md
│   │   ├── security-processes.md # VM SLA & 0-day Emergency Response
│   │   └── implementation-plan.md # 12-week roadmap & RACI matrix
│   ├── architecture.md       # Core architecture, ClickHouse & NATS
│   └── risk-scoring.md       # NIST SP 800-30 Risk formulation
└── k8s/                      # Kubernetes / Kustomize manifests`,
    tags: ["Python", "Kubernetes", "EASM", "RBVM", "NIST-SP-800-30", "ClickHouse", "Wiki"],
    githubUrl: "https://github.com/onixus/Shapoclyack",
    cloneCmd: "git clone https://github.com/onixus/Shapoclyack.git",
    wikiUrl: "https://github.com/onixus/Shapoclyack/wiki",
    icon: "radar"
  },
  {
    id: "bsdm",
    alias: "bsdm-proxy",
    title: "BSDM-Proxy",
    category: "network",
    badge: "Rust • Secure Web Gateway",
    summary: "HTTPS caching proxy & Secure Web Gateway (SWG) на Rust с изолированной консолью администратора.",
    description: "Высокопроизводительный кэширующий HTTPS прокси-сервер и шлюз безопасности веб-доступа (Secure Web Gateway). Включает встроенную панель администрирования, глубокий анализ трафика (MITM TLS), фильтрацию DNS Sinkhole (RPZ) и туннели AmneziaWG.",
    highlights: [
      "HTTPS Caching & MITM TLS-инспекция трафика",
      "DNS Sinkhole (RPZ) для блокировки C2 и вредоносных доменов",
      "Аналитика безопасности: Kafka -> ClickHouse -> ML-детекция",
      "Поддержка защищенных туннелей AmneziaWG VPN"
    ],
    structure: `bsdm-proxy/
├── Cargo.toml
├── src/
│   ├── main.rs
│   ├── proxy/                # Tokio/Hyper async HTTPS caching proxy engine
│   ├── swg/                  # TLS inspection & Secure Web Gateway rules
│   ├── admin_ui/             # Embedded web console & dashboard
│   ├── dns/                  # DNS Sinkhole Response Policy Zones (RPZ)
│   └── auth/                 # RBAC & bearer token authorization
└── config/
    └── bsdm.example.toml     # Routing, caching & SWG policy config`,
    tags: ["Rust", "SWG", "Proxy-Server", "WebGateway", "DNS-RPZ", "Admin-Console"],
    githubUrl: "https://github.com/onixus/bsdm-proxy",
    cloneCmd: "git clone https://github.com/onixus/bsdm-proxy.git",
    icon: "server"
  },
  {
    id: "lariska",
    title: "Lariska",
    category: "telemetry",
    badge: "Rust • Endpoint Agent",
    summary: "Высокопроизводительный кроссплатформенный агент инвентаризации конечных точек с изоляцией на E-ядрах.",
    description: "Системный агент телеметрии и инвентаризации для платформы Shapoclyack. Собирает установленное ПО, детектирует Shadow IT (Python, Node, Java runtime packages), работает с нулевым влиянием на хост благодаря строгой привязке к энергоэффективным E-ядрам и локальному спулингу zstd.",
    highlights: [
      "E-Core Pinning: ограничение работы энергоэффективными ядрами (M1-M4, Intel, AMD)",
      "Детекция несанкционированного ПО (Shadow IT) в рантайме",
      "Устойчивая доставка: локальная очередь SQLite с zstd сжатием",
      "Псевдонимизация hardware ID (SHA-256) и защита от PATH-hijacking"
    ],
    structure: `lariska/
├── Cargo.toml
├── src/
│   ├── main.rs
│   ├── collector/            # OS packages, kernel modules & process telemetry
│   ├── shadow_it/            # Python, Node.js, Java package inspector
│   ├── affinity/             # Apple Silicon & Intel Hybrid E-core detector
│   ├── spool/                # Local SQLite crash-resilient disk spooler
│   └── transport/            # mTLS compressed snapshot delta sender
└── packaging/
    └── systemd/              # Linux systemd daemon service definition`,
    tags: ["Rust", "Endpoint-Agent", "Shadow-IT", "Telemetry", "Inventory", "E-Cores"],
    githubUrl: "https://github.com/onixus/Lariska",
    cloneCmd: "git clone https://github.com/onixus/Lariska.git",
    icon: "cpu"
  },
  {
    id: "pulse",
    title: "Pulse",
    category: "network",
    badge: "Rust • Async Port Scanner",
    summary: "Субсекундный асинхронный сканер сети, портов и TLS-отпечатков на Rust (CLI, TUI, macOS & Win GUI).",
    description: "Современный асинхронный сканер открытых портов и периметра. Поддерживает TCP SYN, UDP зонды 20 протоколов, хэширование Salesforce JARM TLS (10 зондов), встроенные песочницы скриптов Rhai и непрерывный мониторинг периметра с алертами.",
    highlights: [
      "Async TCP Connect, SYN half-open, UDP probes для 20 протоколов",
      "Salesforce JARM TLS Server Fingerprinting (10-probe SHA-256)",
      "Встроенный движок аудита Rhai для скриптов безопасности",
      "Непрерывный периметральный мониторинг с алертами в Telegram/Slack"
    ],
    structure: `pulse/
├── Cargo.toml
├── src/
│   ├── main.rs
│   ├── scan/                 # Async TCP/UDP probe engine & SinFP OS detection
│   ├── jarm/                 # Salesforce JARM TLS 10-probe fingerprinter
│   ├── rhai/                 # Sandboxed scripting plugin environment
│   ├── monitor/              # Continuous perimeter drift daemon
│   └── tui/                  # Ratatui terminal dashboard
└── gui/                      # Native macOS and Windows Glass-Neon GUI apps`,
    tags: ["Rust", "Port-Scanner", "JARM-TLS", "Rhai", "TUI", "Network-Audit"],
    githubUrl: "https://github.com/onixus/GenDec",
    cloneCmd: "git clone https://github.com/onixus/GenDec.git",
    icon: "radio"
  },
  {
    id: "okora",
    alias: "oko-ra",
    title: "Oko-Ra (Око-Ра)",
    category: "security",
    badge: "Python • Causal AI Threats",
    summary: "Автономная платформа анализа гибридных угроз, моделирования каскадных сценариев и социетальных рисков.",
    description: "Аналитический комплекс для моделирования эффекта домино и каскадных инфраструктурных сбоев. Сочетает детерминированное ядро расчетов, каузальный искусственный интеллект (Causal AI), интеграцию с сертификатами Минцифры РФ и 7 автоматических шлюзов безопасности.",
    highlights: [
      "Детерминированное ядро расчетов + Causal AI для анализа гибридных угроз",
      "Моделирование каскадных сбоев и инфраструктурного эффекта домино",
      "Интеграция с Национальным УЦ Минцифры РФ (Russian CA)",
      "7 строгих производственных шлюзов: 282/282 тестов, 100% strict Mypy"
    ],
    structure: `Oko-Ra/
├── pyproject.toml
├── okora/
│   ├── core/                 # Deterministic risk & threat calculation core
│   ├── causal/               # Causal AI inference & cascade graph model
│   ├── adapters/             # Cross-domain & Russian CA telemetry ingesters
│   └── api/                  # Operator REST API & verification gates
├── web-ui/                   # Next.js analyst interface & scenario explorer
└── tests/                    # 282 automated unit & integration test suite`,
    tags: ["Python", "Causal-AI", "Hybrid-Threats", "Risk-Modeling", "Russian-CA"],
    githubUrl: "https://github.com/onixus/Oko-Ra",
    cloneCmd: "git clone https://github.com/onixus/Oko-Ra.git",
    icon: "eye"
  },
  {
    id: "octoman",
    alias: "network-scan-cli",
    title: "Network Scan CLI (Octo-man)",
    category: "network",
    badge: "Go • Scalable Network Sweep",
    summary: "Контейнеризованный конвейер пакетного сканирования масштабных сетей (CIDR + IP + FQDN).",
    description: "Воспроизводимый конвейер массового сканирования распределенных сетей. Реализует ступенчатую лестницу зондирования (Probe ladder), адаптивное двухволновое сканирование с добором пропущенных хостов и инкрементальное выявление дельты изменений периметра.",
    highlights: [
      "Лестница зондирования (Probe Ladder): fping ICMP -> TCP SYN -> naabu",
      "Адаптивное сканирование с заполнением пробелов (wave-2 gap fill)",
      "Delta Discovery (--delta) для отслеживания динамики периметра",
      "Обогащение именами хостов (dnsx forward + reverse PTR)"
    ],
    structure: `network-scan-cli/
├── Dockerfile                # Multi-stage image with naabu, nmap, dnsx, fping
├── pipeline/
│   ├── discovery.sh          # Staged host & port discovery pipeline
│   ├── enrich.sh             # Hostname & PTR DNS enrichment
│   └── nmap_runner.py        # Targeted NSE service & vulnerability scanner
├── presets/                  # Speed & depth profiles (fast, balanced, thorough)
└── README.md`,
    tags: ["Go", "Docker", "Network-Scan", "Naabu", "Nmap", "CIDR-Sweep"],
    githubUrl: "https://github.com/onixus/Octo-man",
    cloneCmd: "git clone https://github.com/onixus/Octo-man.git",
    icon: "terminal"
  },
  {
    id: "evacal",
    title: "EvaCal",
    category: "enterprise",
    badge: "TypeScript • ГОСТ 34 & Presale",
    summary: "Корпоративный калькулятор трудозатрат и автоматизированный генератор документации по ГОСТ 34 / ГОСТ 2.104.",
    description: "Профессиональная платформа для пресейла, комплексной оценки трудозатрат ИТ-проектов и автоматической генерации полного комплекта нормативно-технической документации (ГОСТ 34.602-2020 / РД 50-34.698-90) с основной надписью по ГОСТ 2.104-2006 и сквозной матрицей трассируемости.",
    highlights: [
      "Календарный план, ставки ролей и сметные расчеты коммерческих предложений",
      "7-шаговый мастер генерации комплекта (ТЗ, ПЗ, АФ, ПМИ, Ведомость оборудования)",
      "Оформление по ГОСТ 2.104-2006 (Формы 2 и 2а) и профиль без рамок",
      "Сквозная трассируемость требований ТЗ с разделами ПЗ и методиками испытаний"
    ],
    structure: `evacal/
├── package.json
├── tsconfig.json
├── lib/
│   ├── gost34/               # GOST 34.602-2020 & RD 50 doc generation engine
│   │   ├── applicability/    # Requirement applicability rules
│   │   ├── traceability/     # Bidirectional traceability matrix
│   │   └── templates/        # Standard sections & boilerplate
│   ├── eskd/                 # GOST 2.104 title blocks & stamps (Forms 2/2a)
│   └── estimation/           # Role matrix, effort calculator & Gantt generator
└── app/                      # Next.js interactive estimation studio`,
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
    "wiki",
    "asmodeus",
    "ferrum",
    "shapoclyack",
    "bsdm",
    "bsdm-proxy",
    "lariska",
    "pulse",
    "okora",
    "octoman",
    "evacal",
    "whoami",
    "contact",
    "clear",
    "uname",
    "date"
  ];

  // Welcome banner
  printOutput(`
<span class="output-accent">ONIXUS // SEC_LAB Interactive Shell v3.0</span>
Type <span class="output-success">'help'</span>, <span class="output-success">'projects'</span>, <span class="output-success">'wiki'</span> or <span class="output-success">'tree'</span> to explore, or click any button below.
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
  <span class="output-accent">projects</span> (или <span class="output-accent">ls</span>)  - Вывести список 9 авторских систем
  <span class="output-accent">wiki [role/ops]</span> - Корпоративная база знаний (Wiki) и сценарии ИБ
  <span class="output-accent">tree [project]</span> - Дерево компонентов и файловая структура
  <span class="output-accent">asmodeus</span>       - BAS, симуляция атак по MITRE ATT&CK и хаос-тестирование
  <span class="output-accent">ferrum</span>         - Kubernetes eBPF enforcement plane на Rust
  <span class="output-accent">shapoclyack</span>    - Платформа EASM, CAASM, NIST SP 800-30 скоринг и Wiki
  <span class="output-accent">bsdm</span>           - Корпоративный HTTPS SWG и кэширующий прокси
  <span class="output-accent">lariska</span>        - Агент инвентаризации с изоляцией на E-ядрах
  <span class="output-accent">pulse</span>          - Асинхронный сканер портов и JARM TLS отпечатков
  <span class="output-accent">okora</span>          - Causal AI анализ гибридных угроз и каскадных сбоев
  <span class="output-accent">octoman</span>        - Масштабируемый сетевой сканер (CIDR sweep)
  <span class="output-accent">evacal</span>         - Расчет смет пресейла и генератор документации ГОСТ 34
  <span class="output-accent">cat &lt;name&gt;</span>     - Просмотр проекта (например: <span class="output-success">cat shapoclyack</span>)
  <span class="output-accent">whoami</span>         - Профиль инженера и компетенции
  <span class="output-accent">contact</span>        - Ссылки и репозитории
  <span class="output-accent">clear</span>          - Очистить экран консоли`);
        break;

      case "ls":
      case "projects":
        printOutput(`
<span class="output-accent">=== Флагманские авторские проекты (9 систем) ===</span>
  [1] <span class="output-success">ASMODEUS</span>     - Adversary Emulation (BAS), Red Team & Chaos Engine (Rust)
  [2] <span class="output-success">FERRUM</span>       - Kubernetes Admission & Runtime eBPF enforcement plane (Rust)
  [3] <span class="output-success">Shapoclyack</span>  - External Attack Surface Discovery, RBVM & Enterprise Wiki
  [4] <span class="output-success">BSDM-Proxy</span>   - HTTPS Caching Proxy & Secure Web Gateway (Rust)
  [5] <span class="output-success">Lariska</span>      - E-Core isolated endpoint telemetry & inventory agent (Rust)
  [6] <span class="output-success">Pulse</span>        - Async network scanner & JARM TLS fingerprinting (Rust)
  [7] <span class="output-success">Oko-Ra</span>       - Causal AI hybrid threat & cascading risk platform (Python)
  [8] <span class="output-success">Octo-man</span>     - Scalable containerized network sweep CLI (Go / Docker)
  [9] <span class="output-success">EvaCal</span>       - Enterprise ГОСТ 34 doc generator & presale estimation (TS)

Введите имя проекта (например: <span class="output-success">asmodeus</span>, <span class="output-success">wiki</span>, <span class="output-success">tree shapoclyack</span>)`);
        break;

      case "wiki":
        showWikiInfo(arg);
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
          printOutput(`<span class="output-warning">Использование: cat &lt;project-name&gt; (например: cat asmodeus)</span>`);
        } else {
          showProjectDetails(arg);
        }
        break;

      case "asmodeus":
        showProjectDetails("asmodeus");
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

      case "pulse":
        showProjectDetails("pulse");
        break;

      case "okora":
      case "oko-ra":
        showProjectDetails("okora");
        break;

      case "octoman":
      case "octo-man":
      case "network-scan-cli":
        showProjectDetails("octoman");
        break;

      case "evacal":
        showProjectDetails("evacal");
        break;

      case "whoami":
        printOutput(`
<span class="output-accent">Профиль инженера:</span>
  • <span class="output-highlight">Никнейм:</span> onixus
  • <span class="output-highlight">Специализация:</span> Systems Programming, eBPF Kernel Datapath, Cloud-Native Security, DevSecOps, EASM, Enterprise Automation
  • <span class="output-highlight">Основной стек:</span> Rust, Python, Go, TypeScript, Kubernetes, eBPF, ClickHouse, NATS
  • <span class="output-highlight">GitHub:</span> https://github.com/onixus`);
        break;

      case "contact":
        printOutput(`
<span class="output-accent">Ссылки & Репозитории:</span>
  • Профиль GitHub: <a href="https://github.com/onixus" target="_blank" class="output-success">https://github.com/onixus</a>
  • Корпоративная Wiki: <a href="https://github.com/onixus/Shapoclyack/wiki" target="_blank" class="output-success">https://github.com/onixus/Shapoclyack/wiki</a>
  • Репозиторий сайта: <a href="https://github.com/onixus/onixus.github.io" target="_blank" class="output-success">https://github.com/onixus/onixus.github.io</a>`);
        break;

      case "uname":
      case "uname -a":
        printOutput(`<span class="output-dim">Linux onixus-sec-node 6.18.44-rust-ebpf #1 SMP PREEMPT_DYNAMIC aarch64/x86_64 GNU/Linux</span>`);
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

  function showWikiInfo(section) {
    if (section === "se" || section === "engineer") {
      printOutput(`
<span class="output-accent">=== Wiki: Сценарии Инженера ИБ ===</span>
  • <span class="output-highlight">Триаж с доказательствами:</span> фиксация вектора атаки и PoC эксплойтов.
  • <span class="output-highlight">Механическая верификация:</span> перевод в CLOSED только по целевому перескану (POST /api/vulnerabilities/<built-in function id>/verify).
  • <span class="output-highlight">Patch Gaps:</span> готовые команды обновления пакетов дистрибутивов (Ubuntu USN / Debian Security).
  • <span class="output-highlight">Ссылка:</span> <a href="https://github.com/onixus/Shapoclyack/blob/main/docs/wiki/scenarios-security-engineer.md" target="_blank" class="output-success">docs/wiki/scenarios-security-engineer.md ↗</a>`);
    } else if (section === "arch" || section === "architect") {
      printOutput(`
<span class="output-accent">=== Wiki: Сценарии Архитектора ИБ ===</span>
  • <span class="output-highlight">EASM & CAASM:</span> картографирование внешнего периметра и выявление Shadow IT.
  • <span class="output-highlight">Топология Remote Agents:</span> агенты в изолированных DMZ/VPC без входящих портов (NATS JetStream mTLS).
  • <span class="output-highlight">Комплаенс-сигналы:</span> объективная оценка контролей PCI DSS 4.0, CIS Controls v8, ISO 27001.
  • <span class="output-highlight">Ссылка:</span> <a href="https://github.com/onixus/Shapoclyack/blob/main/docs/wiki/scenarios-architect.md" target="_blank" class="output-success">docs/wiki/scenarios-architect.md ↗</a>`);
    } else if (section === "ciso") {
      printOutput(`
<span class="output-accent">=== Wiki: Сценарии CISO / Руководства ===</span>
  • <span class="output-highlight">NIST SP 800-30:</span> расчет совокупного риска периметра Risk = f(Likelihood, Impact).
  • <span class="output-highlight">CISA KEV:</span> контроль активных эксплойтов в дикой природе и уязвимостей с высоким EPSS.
  • <span class="output-highlight">Adoption & Noise:</span> доля машинной проверки закрытий, динамика MTTR и соблюдение SLA.
  • <span class="output-highlight">Ссылка:</span> <a href="https://github.com/onixus/Shapoclyack/blob/main/docs/wiki/scenarios-ciso.md" target="_blank" class="output-success">docs/wiki/scenarios-ciso.md ↗</a>`);
    } else {
      printOutput(`
<span class="output-accent">=== Корпоративная база знаний (Wiki) платформы Shapoclyack ===</span>
Полный свод ролевых сценариев, регламентов ИБ и дорожной карты внедрения.
  • <span class="output-highlight">wiki se</span>       - Сценарии для Инженера ИБ (триаж, ремедиация, верификация)
  • <span class="output-highlight">wiki arch</span>     - Сценарии для Архитектора ИБ (периметр, remote agents, compliance)
  • <span class="output-highlight">wiki ciso</span>     - Сценарии для CISO (риск NIST SP 800-30, CISA KEV, MTTR/SLA)
  • <span class="output-highlight">Онлайн Wiki:</span>  <a href="https://github.com/onixus/Shapoclyack/wiki" target="_blank" class="output-success">https://github.com/onixus/Shapoclyack/wiki ↗</a>
  • <span class="output-highlight">Репозиторий:</span>  <a href="https://github.com/onixus/Shapoclyack/tree/main/docs/wiki" target="_blank" class="output-success">docs/wiki/ на GitHub ↗</a>`);
    }
  }

  function showFullEcosystemTree() {
    printOutput(`
<span class="output-accent">=== Архитектурное дерево авторских проектов ONIXUS // SEC_LAB ===</span>
<span class="output-dim">.
├── </span><span class="output-highlight">asmodeus/</span>         <span class="output-accent">[Rust]</span>        BAS, Red Team Cyber Exercises & Chaos Engine
<span class="output-dim">├── </span><span class="output-highlight">ferrum/</span>           <span class="output-accent">[Rust]</span>        Kubernetes Admission & Runtime eBPF Enforcement
<span class="output-dim">├── </span><span class="output-highlight">shapoclyack/</span>      <span class="output-accent">[Python]</span>      EASM, CAASM, RBVM & Enterprise Wiki
<span class="output-dim">│   └── </span><span class="output-highlight">docs/wiki/</span>    <span class="output-accent">[Markdown]</span>    Corporate Wiki, Role Guides & SLA Regulations
<span class="output-dim">├── </span><span class="output-highlight">bsdm-proxy/</span>       <span class="output-accent">[Rust]</span>        HTTPS Caching Proxy, SWG & DNS Sinkhole (RPZ)
<span class="output-dim">├── </span><span class="output-highlight">lariska/</span>          <span class="output-accent">[Rust]</span>        E-Core Isolated Endpoint Telemetry & Inventory Agent
<span class="output-dim">├── </span><span class="output-highlight">pulse/</span>            <span class="output-accent">[Rust]</span>        Async Network & Port Scanner, JARM TLS, Rhai
<span class="output-dim">├── </span><span class="output-highlight">oko-ra/</span>           <span class="output-accent">[Python]</span>      Causal AI Hybrid Threat & Societal Risk Platform
<span class="output-dim">├── </span><span class="output-highlight">network-scan-cli/</span> <span class="output-accent">[Go]</span>          Containerized Scalable CIDR Sweep (Octo-man)
<span class="output-dim">└── </span><span class="output-highlight">evacal/</span>           <span class="output-accent">[TypeScript]</span>  ГОСТ 34 Doc Generator & Presale Estimation Studio</span>

Для просмотра детальной структуры проекта введите: <span class="output-success">tree &lt;project&gt;</span> (например: <span class="output-success">tree asmodeus</span>)`);
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

    let wikiSnippet = "";
    if (proj.wikiUrl) {
      wikiSnippet = `\n<span class="output-highlight">Enterprise Wiki:</span> <a href="${escapeHtml(proj.wikiUrl)}" target="_blank" class="output-success">${escapeHtml(proj.wikiUrl)}</a>`;
    }

    printOutput(`
<span class="output-accent">=== ${escapeHtml(proj.title)} [${escapeHtml(proj.badge)}] ===</span>
${escapeHtml(proj.description)}

<span class="output-highlight">Файловая структура & компоненты:</span>
<span class="output-dim">${escapeHtml(proj.structure)}</span>

<span class="output-highlight">Ключевые возможности:</span>
${proj.highlights.map(h => `  • ${escapeHtml(h)}`).join("\n")}

<span class="output-highlight">GitHub:</span> <a href="${escapeHtml(proj.githubUrl)}" target="_blank" class="output-success">${escapeHtml(proj.githubUrl)}</a>${wikiSnippet}
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
