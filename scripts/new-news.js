#!/usr/bin/env node
// Scaffold a news post from the PRFAQ template.
// Usage: npm run news -- "Compass now does the thing"
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const title = process.argv.slice(2).join(" ").trim();

if (!title) {
  console.error('Give the post a title: npm run news -- "Compass now does the thing"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize("NFKD")
  .replace(/[^\w\s-]/g, "")
  .trim()
  .replace(/[\s_]+/g, "-")
  .replace(/-+/g, "-")
  .slice(0, 60)
  .replace(/-$/, "");

const date = new Date().toISOString().slice(0, 10);
const file = join(root, "src", "news", `${date}-${slug}.md`);

if (existsSync(file)) {
  console.error(`${relative(root, file)} already exists.`);
  process.exit(1);
}

const template = readFileSync(join(root, "templates", "prfaq.md"), "utf8");
writeFileSync(file, template.replace("__TITLE__", title.replace(/"/g, '\\"')));

console.log(`Created ${relative(root, file)}`);
console.log("It's a draft, so it shows in `npm start` but won't deploy until you remove `draft: true`.");
