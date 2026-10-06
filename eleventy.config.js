import { EleventyRenderPlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";

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

const statusLabels = {
  planned: { label: "Planned", note: "We have written the PRFAQ and committed to building it." },
  building: { label: "Building", note: "Work has started. Details may still change." },
  shipped: { label: "Shipped", note: "This is out. Try it." },
  shelved: { label: "Shelved", note: "We decided not to build this, for now. The post says why." },
};
