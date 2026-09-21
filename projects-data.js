/**
 * onixus.github.io project catalog.
 *
 * Single source of truth for the public showcase and interactive terminal.
 * APEX platform components are intentionally separated from standalone bonus tools.
 */
var PROJECTS_DATA = [
  {
    id: "apex-gateway",
    title: "APEX Gateway",
    scope: "platform",
    platformRole: "Integration plane",
    contractStatus: "enforced",
    visibility: "private",
    badge: "FastAPI • Integration Plane",
    summary: "Unified API gateway/BFF implementing the APEX integration plane and versioned cross-system boundaries.",
    description: "APEX Gateway aggregates and routes cross-system workflows while preserving ownership in downstream services. It is not the source of truth for Shapoclyack, Ferrum, BSDM-Proxy, Oko-Ra, Pulse or Asmodeus.",
    highlights: [
      "Canonical APEX Architecture Contract v1",
      "Versioned HTTP/event boundaries instead of private database coupling",
      "Owning services keep safety-critical authorization and domain state",
      "W3C Trace Context and canonical resource references across boundaries"
    ],
    structure: `unified-platform/
├── contracts/v1/CONTRACT.md
├── contracts/v1/systems.json
├── gateway/
└── web-console/`,
    tags: ["APEX", "FastAPI", "Integration", "Contracts"],
    githubUrl: null,
    cloneCmd: null,
    icon: "◇"
  },
  {
    id: "shapoclyack",
    title: "Shapoclyack",
    scope: "platform",
    platformRole: "EASM / RBVM",
    contractStatus: "enforced",
    visibility: "public",
    badge: "Python • EASM & RBVM",
    summary: "Asset-centric EASM, CAASM and risk-based vulnerability management with evidence-backed remediation.",
    description: "Shapoclyack is the platform domain authority for assets, findings, remediation lifecycle and exposure-risk evidence. It combines external attack-surface discovery, vulnerability context, mechanical re-verification and the operational Enterprise Wiki.",
    highlights: [
      "Asset-centric identity across changing network addresses",
      "Risk model aligned to NIST SP 800-30 concepts",
      "Mechanical remediation re-verification",
      "Enterprise Wiki with operational roles, SLA and implementation guides"
    ],
    structure: `Shapoclyack/
├── api/
├── scanner/
├── agent/
├── web-next/
├── docs/wiki/
└── k8s/`,
    tags: ["Python", "EASM", "CAASM", "RBVM", "NIST"],
    githubUrl: "https://github.com/onixus/Shapoclyack",
    cloneCmd: "git clone https://github.com/onixus/Shapoclyack.git",
    wikiUrl: "https://github.com/onixus/Shapoclyack/wiki",
    icon: "◎"
  },
  {
    id: "lariska",
    title: "Lariska",
    scope: "platform",
    platformRole: "Endpoint inventory",
    contractStatus: "enforced",
    visibility: "public",
    badge: "Rust • Endpoint Agent",
    summary: "Cross-platform endpoint inventory and telemetry agent for the APEX security platform.",
    description: "Lariska collects endpoint inventory and telemetry with a service-owned identity boundary and versioned agent APIs. It supplies Shapoclyack with endpoint context without turning the central Gateway into endpoint source of truth.",
    highlights: [
      "Cross-platform inventory and Shadow IT signals",
      "Local resilient spool and compressed delivery",
      "Signed service identity boundary",
      "Versioned enrollment, inventory and heartbeat APIs"
    ],
    structure: `Lariska/
├── src/
├── packaging/
└── apex-contract/`,
    tags: ["Rust", "Endpoint", "Inventory", "Telemetry"],
    githubUrl: "https://github.com/onixus/Lariska",
    cloneCmd: "git clone https://github.com/onixus/Lariska.git",
    icon: "◈"
  },
  {
    id: "ferrum",
    title: "FERRUM",
    scope: "platform",
    platformRole: "Kubernetes enforcement",
    contractStatus: "enforced",
    visibility: "public",
    badge: "Rust • Kubernetes/eBPF",
    summary: "Admission and runtime enforcement plane with signed policy bundles and eBPF datapath.",
    description: "Ferrum is the owning service for Kubernetes admission policy, runtime enforcement and break-glass state. The Gateway cannot bypass its authorization and analytics storage cannot become control-plane state.",
    highlights: [
      "Admission and runtime policy enforcement",
      "Signed bundles with last-known-good behavior",
      "eBPF runtime datapath",
      "Strict product boundary gates and canonical APEX URNs"
    ],
    structure: `Ferrum/
├── crates/ferrum-admission/
├── crates/ferrum-agent/
├── crates/ferrum-ebpf/
└── crates/ferrum-testkit/`,
    tags: ["Rust", "Kubernetes", "eBPF", "Policy"],
    githubUrl: "https://github.com/onixus/Ferrum",
    cloneCmd: "git clone https://github.com/onixus/Ferrum.git",
    icon: "⬡"
  },
  {
    id: "bsdm",
    alias: "bsdm-proxy",
    title: "BSDM-Proxy",
    scope: "platform",
    platformRole: "Secure Web Gateway",
    contractStatus: "enforced",
    visibility: "public",
    badge: "Rust • Secure Web Gateway",
    summary: "High-performance HTTP/HTTPS proxy and SWG with explicit policy and agent boundaries.",
    description: "BSDM-Proxy owns SWG policy and proxy decisions. Kafka and ClickHouse remain implementation details for transport and analytics rather than cross-system authority. The APEX boundary exposes versioned agent APIs and event contracts.",
    highlights: [
      "HTTP/HTTPS proxy and selective TLS inspection",
      "DNS sinkhole and policy enforcement",
      "Versioned /api/v1/agent boundary",
      "Asynchronous analytics without making ClickHouse transactional state"
    ],
    structure: `bsdm-proxy/
├── src/
├── bsdm-events/
├── docs/architecture/
└── apex-contract/`,
    tags: ["Rust", "SWG", "Proxy", "DNS", "Policy"],
    githubUrl: "https://github.com/onixus/bsdm-proxy",
    cloneCmd: "git clone https://github.com/onixus/bsdm-proxy.git",
    icon: "▣"
  },
  {
    id: "pulse",
    title: "Pulse",
    scope: "platform",
    platformRole: "Network scanner",
    contractStatus: "enforced",
    visibility: "private",
    badge: "Rust • Network Scanner",
    summary: "Fast network scanning engine with a versioned APEX scan API and scan-report event boundary.",
    description: "Pulse is the network-scanning component of the platform. It owns scan execution and observations, exposes versioned /api/v1 scan routes and publishes the apex.pulse.scan_report.v1 event contract.",
    highlights: [
      "Async network and service scanning",
      "Versioned /api/v1 scan boundary",
      "APEX scan report event adapter",
      "CI-enforced local contract manifest"
    ],
    structure: `GenDec/
├── src/
├── docs/
├── apex-contract/
└── .github/workflows/`,
    tags: ["Rust", "Scanner", "Network", "TLS"],
    githubUrl: null,
    cloneCmd: null,
    icon: "⌁"
  },
  {
    id: "okora",
    alias: "oko-ra",
    title: "Oko-Ra",
    scope: "platform",
    platformRole: "World-model risk",
    contractStatus: "enforced",
    visibility: "private",
    badge: "Python • Risk & Causal Analysis",
    summary: "World-model and causal-risk service for scenarios, threat relationships and operational briefings.",
    description: "Oko-Ra owns world-model, scenario-graph and causal-risk projections. Its APEX boundary keeps domain authority local while exposing versioned workflow, result and briefing APIs.",
    highlights: [
      "Threat and scenario graph analysis",
      "Causal and cascading-risk projections",
      "Versioned agent workflow/result APIs",
      "Service-native JWT and tenant boundary"
    ],
    structure: `Oko-Ra/
├── apps/api/
├── packages/
├── tests/
└── apex-contract/`,
    tags: ["Python", "Risk", "Causal", "FastAPI"],
    githubUrl: null,
    cloneCmd: null,
    icon: "◉"
  },
  {
    id: "asmodeus",
    title: "ASMODEUS",
    scope: "platform",
    platformRole: "Synthetic BAS",
    contractStatus: "enforced",
    visibility: "public",
    badge: "Rust • BAS & Red Team",
    summary: "Synthetic adversary-emulation and resilience validation with explicit safety boundaries.",
    description: "Asmodeus owns synthetic scenarios, exercise runs and exercise safety state. Signed APEX identity is verified at its runtime boundary and the Gateway cannot bypass synthetic-only safety controls.",
    highlights: [
      "Synthetic BAS and adversary-emulation workflows",
      "Signed APEX v1 identity verification",
      "Explicit blast-radius and safety constraints",
      "Blue-team validation and resilience metrics"
    ],
    structure: `Asmodeus/
├── crates/
├── apex-contract/
├── ARCHITECTURE.md
├── FTT.md
├── TT.md
└── Jenkinsfile`,
    tags: ["Rust", "BAS", "Red Team", "Safety"],
    githubUrl: "https://github.com/onixus/Asmodeus",
    cloneCmd: "git clone https://github.com/onixus/Asmodeus.git",
    icon: "⚡"
  },
  {
    id: "evacal",
    title: "EvaCal",
    scope: "bonus",
    platformRole: "Standalone colleague tool",
    visibility: "public",
    badge: "TypeScript • ГОСТ 34",
    summary: "Standalone presale estimation, project workflow, resource planning and ГОСТ 34 documentation workspace.",
    description: "EvaCal helps colleagues move from estimation and approval through ГОСТ 34 document production, project lifecycle tracking, capacity planning and actual-vs-plan analytics. It is intentionally outside the APEX platform.",
    highlights: [
      "Role-based estimation, margins and presale approval flow",
      "ГОСТ 34 document generation with traceability and review gates",
      "Project lifecycle board, actual hours and schedule deviation tracking",
      "Portfolio capacity planning and delivery analytics"
    ],
    structure: `EvaCal/
├── app/
├── lib/
├── prisma/
└── docs/`,
    tags: ["TypeScript", "ГОСТ-34", "Presale", "Docs"],
    githubUrl: "https://github.com/onixus/EvaCal",
    cloneCmd: "git clone https://github.com/onixus/EvaCal.git",
    icon: "▤"
  },
  {
    id: "metis",
    title: "Metis",
    scope: "bonus",
    platformRole: "Standalone colleague tool",
    visibility: "public",
    badge: "Go • Portfolio Governance",
    summary: "Standalone portfolio-governance workspace for products, priorities, roadmaps, commitments and economics.",
    description: "Metis is an independent colleague-facing platform for portfolio graphs, demand signals, prioritization, roadmap and delivery governance, SSDLC/certification, economics and decision history. It evolves independently of APEX.",
    highlights: [
      "Portfolio graph, demand signals and prioritization",
      "Roadmaps, delivery projections and commitments",
      "SSDLC/certification evidence and decision history",
      "Economics, P&L scenarios and win/loss analysis"
    ],
    structure: `Metis/
├── api/
├── cmd/
├── internal/
├── web/
└── db/`,
    tags: ["Go", "Portfolio", "Roadmap", "Governance"],
    githubUrl: "https://github.com/onixus/Metis",
    cloneCmd: "git clone https://github.com/onixus/Metis.git",
    icon: "◆"
  }
];
