# onixus.github.io — APEX Platform Showcase

[![Live Portal](https://img.shields.io/badge/site-onixus.github.io-0284c7?style=for-the-badge&logo=githubpages&logoColor=white)](https://onixus.github.io)
![APEX Contract](https://img.shields.io/badge/APEX-contract%20v1-10b981?style=for-the-badge)
[![Shapoclyack Wiki](https://img.shields.io/badge/wiki-Shapoclyack-f59e0b?style=for-the-badge)](https://github.com/onixus/Shapoclyack/wiki)

Public engineering showcase for the **APEX security platform** and independent tools published by [onixus](https://github.com/onixus).

## APEX Platform

The site presents eight canonical APEX participants. APEX Gateway, Pulse and Oko-Ra currently live in private repositories, so the public site labels them as private instead of exposing dead GitHub links:

1. **APEX Gateway** — integration plane and canonical architecture contract.
2. **Shapoclyack** — EASM / CAASM / RBVM and operational knowledge base.
3. **Lariska** — endpoint inventory and telemetry.
4. **FERRUM** — Kubernetes admission/runtime enforcement.
5. **BSDM-Proxy** — Secure Web Gateway and policy enforcement.
6. **Pulse** — network scanning and scan observations.
7. **Oko-Ra** — world-model / causal-risk analysis.
8. **ASMODEUS** — synthetic BAS and resilience validation.

The canonical participant registry and normative architecture contract are maintained in the private `onixus/unified-platform` repository at `contracts/v1/systems.json` and `contracts/v1/CONTRACT.md`. The public site presents a readable architecture summary without linking visitors to inaccessible private pages.

Core rules include explicit domain ownership, versioned integration APIs/events, no private-database coupling, ClickHouse as analytics projection only, idempotent async processing, W3C Trace Context and verifiable software-supply-chain promotion.

## Bonus tools

**EvaCal** and **Metis** are standalone tools for colleagues. They are intentionally **outside the APEX platform** and do not participate in the canonical APEX contract registry.

- [EvaCal](https://github.com/onixus/EvaCal) — estimation and ГОСТ 34 documentation workflow.
- [Metis](https://github.com/onixus/Metis) — product portfolio, roadmap and delivery governance.

## Site architecture

The site remains intentionally zero-dependency:

- `index.html` — semantic page layout and static content.
- `projects-data.js` — **single source of truth** for the project catalog and scope (`platform` vs `bonus`).
- `app.js` — dynamic cards, architecture view, terminal and clipboard helpers.
- `styles.css` — responsive design system.
- `scripts/validate-site.mjs` — structural checks used by CI.
- `.github/workflows/deploy.yml` — pull-request validation and GitHub Pages deployment.

The interactive terminal supports commands such as:

```text
platform
bonus
contract
projects
tree
cat ferrum
metis
wiki
```

## Local preview

The site is static, so any local HTTP server is enough:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deployment

Pushes to `main` deploy to GitHub Pages after the structural validation job passes. Pull requests run validation without deploying.
