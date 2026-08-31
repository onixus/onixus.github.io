/**
 * ONIXUS // SEC_LAB
 * Flagship Projects Database
 */

var PROJECTS_DATA = [
  {
    id: "ferrum",
    title: "FERRUM",
    category: "security",
    badge: "Rust • Kubernetes Security",
    summary: "Self-hosted Kubernetes enforcement plane на Rust. Admission + runtime enforcement, подписанные policy bundle, last-known-good вместо fail-open.",
    description: "Строгий enforcement plane для Kubernetes, ориентированный на детерминированную безопасность. Обеспечивает строгий admission control, подпись и валидацию политик (policy bundles), а также отказоустойчивый режим last-known-good вместо опасного fail-open.",
    highlights: [
      "Admission + Runtime Enforcement",
      "Подписанные Policy Bundles",
      "Отказоустойчивость: Last-Known-Good",
      "Высокая производительность на Rust"
    ],
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
      "External Attack Surface Discovery",
      "Непрерывный аудит активов и сервисов",
      "Управление уязвимостями периметра",
      "Готовые манифесты для Kubernetes / Kustomize"
    ],
    tags: ["Python", "Kubernetes", "Kustomize", "EASM", "Vulnerability-Management"],
    githubUrl: "https://github.com/onixus/Shapoclyack",
    cloneCmd: "git clone https://github.com/onixus/Shapoclyack.git",
    icon: "radar"
  },
  {
    id: "bsdm-proxy",
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
