# onixus // Systems & Cybersecurity Showcase (Git-site)

Официальный сайт-витрина проектов [onixus](https://github.com/onixus), подготовленный для публикации через **GitHub Pages**.

---

## 🚀 Представленные проекты

1. **[FERRUM](https://github.com/onixus/Ferrum)** — *Self-hosted Kubernetes enforcement plane на Rust*. Admission + runtime enforcement, подписанные policy bundle, last-known-good вместо fail-open.
2. **[Shapoclyack](https://github.com/onixus/Shapoclyack)** — *Self-hosted external attack surface discovery & vulnerability management platform* (Python, Kubernetes / Kustomize).
3. **[BSDM-Proxy](https://github.com/onixus/bsdm-proxy)** — *HTTPS caching proxy & Secure Web Gateway (SWG)* на Rust с выделенной админ-панелью.
4. **[Lariska](https://github.com/onixus/Lariska)** — *High-performance endpoint inventory agent* для Shapoclyack (Rust, сбор инвентаря, Shadow IT детекция, локальный спулинг).
5. **[EvaCal](https://github.com/onixus/EvaCal)** — *Корпоративный калькулятор трудозатрат и генератор документации ГОСТ 34.602-2020 / РД 50-34.698-90 / ГОСТ 2.104-2006* (TypeScript).

---

## 🛠 Особенности сайта

- **Zero-Dependency & Lightning Fast**: Чистый HTML5, CSS3 (Modern Glassmorphism & Custom Design Tokens) и Vanilla JS (ES6+).
- **Интерактивный терминал (CLI Shell)**: Встроенная консоль с поддержкой истории команд (стрелки вверх/вниз), автодополнения (Tab) и выводом подробной информации по каждому проекту.
- **Быстрый `git clone`**: Копирование команд клонирования проектов в один клик с визуальными уведомлениями (Toast).
- **Адаптивный дизайн**: Корректное отображение на мобильных устройствах, планшетах и десктопах.
- **Готовый CI/CD workflow**: Автоматический деплой через `.github/workflows/deploy.yml` при пуше в репозиторий.

---

## 🌐 Как включить GitHub Pages в репозитории

### Способ 1: Через GitHub Actions (Рекомендуемый)
1. Перейдите в репозиторий **[onixus/Git-site](https://github.com/onixus/Git-site)** на GitHub.
2. Откройте **Settings** → **Pages**.
3. В разделе **Build and deployment** выберите:
   - **Source**: `GitHub Actions`.
4. При пуше workflow `.github/workflows/deploy.yml` автоматически опубликует сайт.

### Способ 2: Напрямую из ветки main
1. Перейдите в **Settings** → **Pages**.
2. В разделе **Build and deployment** выберите:
   - **Source**: `Deploy from a branch`.
   - **Branch**: `main` (или `master`), папка `/ (root)`.
3. Нажмите **Save**.

После этого сайт станет доступен по адресу:
👉 **`https://onixus.github.io/Git-site/`**
