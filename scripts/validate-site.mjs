import fs from "node:fs";
import vm from "node:vm";

const read = (path) => fs.readFileSync(path, "utf8");
const fail = (message) => {
  console.error(`site validation failed: ${message}`);
  process.exitCode = 1;
};

const dataSource = read("projects-data.js");
const appSource = read("app.js");
const html = read("index.html");

const sandbox = {};
vm.runInNewContext(dataSource, sandbox, { filename: "projects-data.js" });
const projects = sandbox.PROJECTS_DATA;

if (!Array.isArray(projects)) {
  fail("PROJECTS_DATA must be an array");
  process.exit();
}

const expectedPlatform = [
  "apex-gateway",
  "shapoclyack",
  "lariska",
  "ferrum",
  "bsdm",
  "pulse",
  "okora",
  "asmodeus"
];
const expectedBonus = ["evacal", "metis"];

const platform = projects.filter((project) => project.scope === "platform");
const bonus = projects.filter((project) => project.scope === "bonus");
const ids = projects.map((project) => project.id);

if (new Set(ids).size !== ids.length) fail("project ids must be unique");

if (JSON.stringify(platform.map((project) => project.id)) !== JSON.stringify(expectedPlatform)) {
  fail(`platform catalog drift: expected ${expectedPlatform.join(", ")}`);
}

if (JSON.stringify(bonus.map((project) => project.id)) !== JSON.stringify(expectedBonus)) {
  fail(`bonus catalog drift: expected ${expectedBonus.join(", ")}`);
}

for (const project of platform) {
  if (project.contractStatus !== "enforced") {
    fail(`${project.id} must be marked contractStatus=enforced`);
  }
}

for (const project of bonus) {
  if (project.contractStatus) {
    fail(`${project.id} is a bonus tool and must not carry APEX contract status`);
  }
}

if (ids.includes("octoman")) fail("archived Octo-man must not be presented as an active project");
if (appSource.includes("var PROJECTS_DATA")) fail("app.js must not duplicate PROJECTS_DATA");

for (const requiredId of ["architecture", "projects", "bonus", "terminal"]) {
  if (!html.includes(`id="${requiredId}"`)) fail(`index.html missing #${requiredId}`);
}

const dataScript = html.indexOf('<script src="projects-data.js"></script>');
const appScript = html.indexOf('<script src="app.js"></script>');
if (dataScript < 0 || appScript < 0 || dataScript > appScript) {
  fail("projects-data.js must load before app.js");
}

if (!html.includes("EvaCal and Metis") && !html.includes("EvaCal") && !html.includes("Metis")) {
  fail("bonus tool scope copy is missing");
}

if (!process.exitCode) {
  console.log(`site validation OK: ${platform.length} platform components, ${bonus.length} bonus tools`);
}
