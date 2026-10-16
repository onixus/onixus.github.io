import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const check = process.argv.includes('--check');
const context = { document: { addEventListener() {} } };
vm.createContext(context);
for (const file of ['projects-data.js', 'app.js']) vm.runInContext(fs.readFileSync(file, 'utf8'), context);
const copy = JSON.parse(fs.readFileSync('content/projects-ru.json', 'utf8'));
const escape = context.escapeHtml;
const origin = 'https://onixus.github.io';
let changed = false;
function output(file, text) {
  text = text.replace(/[ \t]+$/gm, '');
  if (fs.existsSync(file) && fs.readFileSync(file, 'utf8') === text) return;
  changed = true;
  if (check) { console.error(`Generated content out of date: ${file}`); return; }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text);
}
const projects = context.PROJECTS_DATA;
if (Object.keys(copy).length !== projects.length) throw new Error('Russian copy must match the catalog');
for (const project of projects) {
  const text = copy[project.id];
  if (!text) throw new Error(`Missing Russian copy: ${project.id}`);
  const url = context.projectPageUrl(project);
  const publicRepo = project.visibility === 'public' && project.githubUrl;
  const related = projects.filter(p => p.id !== project.id && p.scope === project.scope);
  const start = publicRepo ? `<p>Откройте README репозитория: там находятся требования к окружению и инструкции для выбранной версии. Перед установкой проверьте актуальную документацию и доступные релизы.</p>
    <p><a href="${escape(project.githubUrl)}" rel="noopener noreferrer">Репозиторий и README →</a> · <a href="${escape(project.githubUrl)}/releases" rel="noopener noreferrer">Релизы →</a>${project.wikiUrl ? ` · <a href="${escape(project.wikiUrl)}">База знаний →</a>` : ''}</p>
    <p>Для изучения исходного кода:</p><pre><code>${escape(project.cloneCmd)}</code></pre>` : '<p>Исходный код этого компонента находится в закрытом репозитории. Публичного пакета для самостоятельной установки на этой странице нет.</p>';
  output(`.${url}index.html`, `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escape(text.heading)}</title>
  <meta name="description" content="${escape(text.description)}">
  <link rel="canonical" href="${origin}${url}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="ru_RU">
  <meta property="og:title" content="${escape(text.heading)}">
  <meta property="og:description" content="${escape(text.description)}">
  <meta property="og:url" content="${origin}${url}">
  <link rel="stylesheet" href="/styles.css?v=project-pages-1">
</head>
<body class="project-page">
  <a class="project-skip" href="#content">К содержанию</a>
  <header class="project-topbar container"><a href="/">onixus // SEC_LAB</a><nav aria-label="Навигация"><a href="/projects/">Все проекты</a> · <a href="/#${project.scope === 'platform' ? 'projects' : 'bonus'}">Каталог</a></nav></header>
  <main id="content" class="container project-document">
    <nav aria-label="Хлебные крошки"><a href="/">Главная</a> / <a href="/projects/">Проекты</a> / ${escape(project.title)}</nav>
    <p class="section-tag">${project.scope === 'platform' ? 'Компонент платформы APEX' : 'Самостоятельный проект'}</p>
    <h1>${escape(text.heading)}</h1>
    <p class="project-lead">${escape(text.description)}</p>
    <section><h2>Кому подходит</h2><p>${escape(text.audience)}</p></section>
    <section><h2>Возможности</h2><ul>${text.features.map(f => `<li>${escape(f)}</li>`).join('')}</ul></section>
    <section><h2>Пример использования</h2><p>${escape(text.scenario)}</p></section>
    <section><h2>Как начать</h2>${start}</section>
    <section><h2>Ограничения и статус</h2><p>${escape(text.limits)}</p></section>
    <section><h2>Другие проекты</h2><ul>${related.map(p => `<li><a href="${context.projectPageUrl(p)}">${escape(p.title)}</a> — ${escape(copy[p.id].heading.split(' — ')[1])}</li>`).join('')}</ul></section>
  </main>
  <footer class="container project-footer"><a href="/projects/">Все проекты onixus</a> · <a href="https://github.com/onixus">GitHub</a></footer>
</body>
</html>
`);
}
output('projects/index.html', `<!DOCTYPE html>
<html lang="ru"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Проекты onixus — безопасность, VPN и инженерные инструменты</title>
<meta name="description" content="Каталог проектов onixus на русском языке: возможности, сценарии применения, ограничения, документация и ссылки на публичные репозитории.">
<link rel="canonical" href="${origin}/projects/"><link rel="stylesheet" href="/styles.css?v=project-pages-1"></head>
<body class="project-page"><header class="container project-topbar"><a href="/">onixus // SEC_LAB</a></header>
<main class="container project-document"><h1>Проекты onixus</h1><p class="project-lead">Инструменты безопасности, сетевые приложения и системы для инженерных команд. Выберите проект, чтобы изучить его назначение, возможности и порядок начала работы.</p>
${projects.map(p => `<section><h2><a href="${context.projectPageUrl(p)}">${escape(copy[p.id].heading)}</a></h2><p>${escape(copy[p.id].description)}</p></section>`).join('\n')}
</main><footer class="container project-footer"><a href="/">На главную</a></footer></body></html>
`);
let home = fs.readFileSync('index.html', 'utf8');
for (const [id, scope] of [['platformProjects', 'platform'], ['bonusProjects', 'bonus']]) {
  const start = `<!-- generated:${id}:start -->`, end = `<!-- generated:${id}:end -->`;
  const a = home.indexOf(start), b = home.indexOf(end);
  if (a < 0 || b < a) throw new Error(`Missing home markers: ${id}`);
  const cards = projects.filter(p => p.scope === scope).map(p => context.projectCard(p, scope === 'platform')).join('');
  home = home.slice(0, a) + `${start}\n        <div id="${id}" class="projects-grid${scope === 'bonus' ? ' bonus-grid' : ''}">${cards}</div>\n        ` + home.slice(b);
}
output('index.html', home);
if (check && changed) process.exitCode = 1;
else console.log(check ? 'Static project pages are current.' : 'Generated 11 project pages, catalog and home cards.');
