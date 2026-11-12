import { EleventyRenderPlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import markdownIt from "markdown-it";

const isServe = process.env.ELEVENTY_RUN_MODE === "serve";
const showDrafts = isServe || process.env.SHOW_DRAFTS === "1";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("src/_headers");
  eleventyConfig.addPassthroughCopy({ "src/assets/favicon.ico": "favicon.ico" });

  // Drafts (draft: true) show in `npm start` but never in the deployed build.
  eleventyConfig.addPreprocessor("drafts", "*", (data) => {
    if (data.draft && !showDrafts) return false;
  });

  eleventyConfig.addCollection("news", (api) =>
    api
      .getFilteredByGlob("src/news/*.md")
      .sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addFilter("readableDate", (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    })
  );
  eleventyConfig.addFilter("isoDate", (date) => new Date(date).toISOString().slice(0, 10));
  eleventyConfig.addFilter("statusLabel", (status) => statusLabels[status]?.label ?? "");
  eleventyConfig.addFilter("statusNote", (status) => statusLabels[status]?.note ?? "");
  eleventyConfig.addFilter("head", (arr, n) => arr.slice(0, n));

  // Browsers cache /assets/* for a day (src/_headers). Adding a hash of the
  // file to its URL means a changed stylesheet or script gets a new URL, so
  // nobody runs a cached old script against new HTML.
  eleventyConfig.addFilter("versioned", (url) => {
    const hash = createHash("sha256").update(readFileSync(`src${url}`)).digest("hex").slice(0, 10);
    return `${url}?v=${hash}`;
  });

  // The Scope privacy and support pages render the Markdown files from the
  // ayeo-io/scope repository, kept byte for byte in src/_includes/scope/,
  // because the App Store listing and the app's privacy label use the same
  // wording. The first line is the page title, so the page layout shows it
  // and this filter drops it.
  eleventyConfig.addFilter("scopeDoc", (name) => {
    const source = readFileSync(`src/_includes/scope/${name}.md`, "utf8");
    return scopeMarkdown.render(source.replace(/^# .*\n/, ""));
  });

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/news/feed.xml",
    collection: { name: "news", limit: 20 },
    metadata: {
      language: "en-GB",
      title: "ayeo news",
      subtitle: "What we plan to build, written before we build it.",
      base: "https://ayeo.io/",
      author: { name: "ayeo" },
    },
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}

// The Scope documents write addresses and the support email as plain text,
// and put contact lines on separate lines without Markdown line breaks.
// linkify makes them links without changing the text; fuzzyLink is off so
// names such as io.ayeo.scope stay text. Links to other sites open in a new tab.
const scopeMarkdown = markdownIt({ html: false, linkify: true, breaks: true });
scopeMarkdown.linkify.set({ fuzzyLink: false });
const defaultLinkOpen =
  scopeMarkdown.renderer.rules.link_open ??
  ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));
scopeMarkdown.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const href = tokens[idx].attrGet("href") ?? "";
  if (/^https?:\/\//.test(href) && !/^https:\/\/ayeo\.io(\/|$)/.test(href)) {
    tokens[idx].attrSet("target", "_blank");
    tokens[idx].attrSet("rel", "noopener");
  }
  return defaultLinkOpen(tokens, idx, options, env, self);
};

const statusLabels = {
  planned: { label: "Planned", note: "We have written the PRFAQ and committed to building it." },
  building: { label: "Building", note: "Work has started. Details may still change." },
  shipped: { label: "Shipped", note: "This is out. Try it." },
  shelved: { label: "Shelved", note: "We decided not to build this, for now. The post says why." },
};
