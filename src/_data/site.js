// Site-wide settings. Change the repo here once and every link follows.
export default {
  name: "ayeo",
  url: "https://ayeo.io",
  description:
    "ayeo makes open-source tools for building software with AI agents. Compass, our first, gives each change the process it needs and no more.",
  githubOrg: "https://github.com/ayeo-io",
  compass: {
    repo: "ayeo-io/compass",
    get url() {
      return `https://github.com/${this.repo}`;
    },
    licence: "Apache 2.0",
  },
};
