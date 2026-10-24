// Site-wide settings. Change the repo here once and every link follows.
export default {
  name: "ayeo",
  url: "https://ayeo.io",
  description:
    "Compass is an open-source plugin for Claude Code. Spec-driven development gives every change the same process. Compass gives each change the process it needs and no more.",
  githubOrg: "https://github.com/ayeo-io",
  compass: {
    repo: "ayeo-io/compass",
    get url() {
      return `https://github.com/${this.repo}`;
    },
    licence: "Apache 2.0",
    // Update both on each Compass release; the home page links to the release notes.
    version: "7.0.0",
    released: "20 October 2026",
  },
};
