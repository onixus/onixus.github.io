/**
 * ONIXUS // SEC_LAB
 * Flagship Projects Database (10 Flagship Platforms & Enterprise Wiki)
 */

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
    id: "apex",
    alias: "unified-platform",
    title: "APEX Unified Platform",
    category: "security",
    badge: "Next.js • Single Pane of Glass",
    summary: "Централизованная консоль безопасности и управления, объединяющая 8 систем в платформу класса XDR / EASM / SWG.",
    description: "Единый операторский портал (Single Pane of Glass), объединяющий разрозненные защитные и исследовательские компоненты через Unified API Gateway (BFF) на FastAPI и фронтенд на Next.js 14 с хранилищем телеметрии ClickHouse.",
    highlights: [
      "Asset 360° Explorer: сквозной профиль хоста со сведениями всех подсистем",
      "Unified API Gateway (BFF): высокопроизводительная агрегация телеметрии",
      "ClickHouse DataLake: аналитика событий безопасности в реальном времени",
      "Интеграция 8 компонентов: Shapoclyack, Ferrum, BSDM, Lariska, Pulse, Oko-Ra, Octo-man, EvaCal"
    ],
    structure: `unified-platform/
├── gateway/                  # FastAPI Backend-for-Frontend (BFF)
│   ├── app/
│   │   ├── routers/          # Proxy & aggregator endpoints for 8 subsystems
│   │   ├── services/         # ClickHouse & cache connector
│   │   └── main.py
│   └── Dockerfile
├── web-console/              # Next.js 14 / React 18 / Tailwind Web Shell
│   ├── src/
│   │   ├── app/              # Dashboard, Asset 360, Analytics views
│   │   └── components/       # Radix UI cybersecurity components
│   └── package.json
└── docker-compose.yml        # Orchestration with ClickHouse & Redis`,
    tags: ["Next.js", "FastAPI", "BFF", "ClickHouse", "Single-Pane-of-Glass", "XDR"],
    githubUrl: "https://github.com/onixus/unified-platform",
    cloneCmd: "git clone https://github.com/onixus/unified-platform.git",
    icon: "grid"
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
    githubUrl: "https://github.com/onixus/pulse",
    cloneCmd: "git clone https://github.com/onixus/pulse.git",
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

if (typeof window !== "undefined") {
  window.PROJECTS_DATA = PROJECTS_DATA;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { PROJECTS_DATA };
}
