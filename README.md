# onixus // Systems & Cybersecurity Showcase (Git-site)

[![Live Portal](https://img.shields.io/badge/site-onixus.github.io-0284c7?style=for-the-badge&logo=githubpages&logoColor=white)](https://onixus.github.io)
[![Enterprise Wiki](https://img.shields.io/badge/wiki-Shapoclyack%20Knowledge%20Base-f59e0b?style=for-the-badge)](https://github.com/onixus/Shapoclyack/wiki)
[![Systems](https://img.shields.io/badge/focus-4%20core%20open--source%20projects-10b981?style=for-the-badge)](#-core-open-source-projects)

Официальный сайт-витрина инженерных и исследовательских проектов [onixus](https://github.com/onixus), подготовленный для публикации через **GitHub Pages**.

🌐 **Живой сайт:** [https://onixus.github.io](https://onixus.github.io) (или [https://onixus.github.io/Git-site/](https://onixus.github.io/Git-site/))

---

## 🧭 Корпоративная база знаний (Wiki) & Ролевые сценарии

Ключевым ядром нормативной документации и процессов информационной безопасности выступает **Enterprise Wiki** платформы Shapoclyack:

* 📚 **[GitHub Wiki онлайн](https://github.com/onixus/Shapoclyack/wiki)**
* 📁 **[Исходники в репозитории (docs/wiki/)](https://github.com/onixus/Shapoclyack/tree/main/docs/wiki)**

### Ролевые руководства
1. 🛠️ **[Инженер ИБ](https://github.com/onixus/Shapoclyack/blob/main/docs/wiki/scenarios-security-engineer.md)** — триаж находок с доказательной базой, **инструментальная верификация закрытия (`machine_verified = true`)**, устранение Patch Gaps на хостах, фильтрация шума.
2. 🏛️ **[Архитектор ИБ / Enterprise](https://github.com/onixus/Shapoclyack/blob/main/docs/wiki/scenarios-architect.md)** — картографирование периметра (EASM/CAASM), выявление Shadow IT, топология remote agents (NATS JetStream mTLS без входящих портов), комплаенс PCI DSS 4.0, CIS Controls v8, ISO 27001.
3. 📊 **[CISO / Руководство ИБ](https://github.com/onixus/Shapoclyack/blob/main/docs/wiki/scenarios-ciso.md)** — дашборд совокупного риска **NIST SP 800-30 Rev. 1**, контроль угроз в дикой природе (CISA KEV), метрики зрелости Adoption и Noise, динамика MTTR и соблюдение SLA.

### Регламенты и стандарты
* 🔄 **[Операционные процессы ИБ](https://github.com/onixus/Shapoclyack/blob/main/docs/wiki/security-processes.md)** — регламент сквозного жизненного цикла уязвимости (VM Lifecycle).
* 🚨 **[Экстренное реагирование (0-Day / KEV)](https://github.com/onixus/Shapoclyack/blob/main/docs/wiki/security-processes.md#3-процесс-экстренного-реагирования-на-0-day-и-активные-угрозы-cisa-kev)** — регламент действий дежурной смены при появлении активных эксплойтов (SLA 24ч).
* ⏱️ **[Матрица SLA ремедиации](https://github.com/onixus/Shapoclyack/blob/main/docs/wiki/security-processes.md#12-матрица-sla-по-устранению-уязвимостей)** — нормативы устранения уязвимостей и регламент согласования риск-акцептов (Waiver с TTL).
* 🗺️ **[12-недельный план внедрения и RACI](https://github.com/onixus/Shapoclyack/blob/main/docs/wiki/implementation-plan.md)** — пошаговый план развертывания, распределение ролей и критерии успеха (KPI).

---

## 🚀 Core open-source projects

1. **[Shapoclyack](https://github.com/onixus/Shapoclyack)** — self-hosted EASM / CAASM / Risk-Based Vulnerability Management with asset-centric identity, distro-aware patch gaps and mechanical remediation verification.
2. **[BSDM-Proxy](https://github.com/onixus/bsdm-proxy)** — Rust HTTP/HTTPS forward proxy and Secure Web Gateway with selective TLS inspection, tiered caching, policy and asynchronous analytics.
3. **[FERRUM](https://github.com/onixus/Ferrum)** — Rust Kubernetes enforcement plane combining admission policy, signed bundles and an eBPF runtime datapath.
4. **[ASMODEUS](https://github.com/onixus/Asmodeus)** — Rust adversary-emulation / BAS and chaos-engineering engine with explicit safety boundaries and Blue Team feedback metrics.

### Supporting public projects

- **[Lariska](https://github.com/onixus/Lariska)** — cross-platform endpoint inventory agent used by Shapoclyack.
- **[EvaCal](https://github.com/onixus/EvaCal)** — enterprise estimation and GOST 34 documentation workflow.

Private and archived repositories are intentionally not presented as flagship projects on the public showcase.

---

## 🛠 Особенности сайта-витрины

- **Zero-Dependency & Lightning Fast**: Чистый HTML5, CSS3 (Modern Glassmorphism & Custom Design Tokens) и Vanilla JS (ES6+).
- **Интерактивный хаб Enterprise Wiki**: Навигация по ролевым сценариям (Инженер, Архитектор, CISO), регламентам SLA и дорожной карте развертывания.
- **Интерактивный терминал (CLI Shell v3.0)**: Встроенная консоль с поддержкой истории команд (стрелки вверх/вниз), автодополнения (Tab) и выводом подробной информации по каждому из 9 проектов и разделам Wiki (`wiki`, `asmodeus`, `ferrum`, `shapoclyack`, `pulse`, `okora`, `octoman`, `tree` и др.).
- **Быстрый `git clone`**: Копирование команд клонирования проектов в один клик с визуальными уведомлениями (Toast).
- **Адаптивный дизайн**: Корректное отображение на мобильных устройствах, планшетах и десктопах.
- **Готовый CI/CD workflow**: Автоматический деплой через `.github/workflows/deploy.yml` при пуше в репозиторий.

---

## 🌐 Как включить GitHub Pages в репозитории

### Способ 1: Через GitHub Actions (Рекомендуемый)
1. Перейдите в репозиторий **[onixus/Git-site](https://github.com/onixus/Git-site)** (или **[onixus/onixus.github.io](https://github.com/onixus/onixus.github.io)**) на GitHub.
2. Откройте **Settings** → **Pages**.
3. В разделе **Build and deployment** выберите:
   - **Source**: `GitHub Actions`.
4. При пуше workflow `.github/workflows/deploy.yml` автоматически опубликует сайт.

### Способ 2: Напрямую из ветки main
1. Перейдите в **Settings** → **Pages**.
2. В разделе **Build and deployment** выберите:
   - **Source**: `Deploy from a branch`.
   - **Branch**: `main`, папка `/ (root)`.
3. Нажмите **Save**.
