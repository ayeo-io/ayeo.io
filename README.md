# ayeo.io

The website for ayeo and Compass. Static HTML built with [Eleventy](https://www.11ty.dev/), hosted on Cloudflare Workers. No cookies, no tracking, no JavaScript framework.

## Run it locally

```
npm install
npm start
```

Then open http://localhost:8080. Drafts show locally but never deploy.

## Publish a PRFAQ as news

We write the press release and FAQ before we build something. When we commit to it, the public half goes here.

```
npm run news -- "Compass now does the thing"
```

That creates a draft in `src/news/` from `templates/prfaq.md`. Fill in the press release as the body and the external FAQ in the `faq:` list. Leave internal FAQs, costs and imagined customer quotes out. Remove `draft: true`, then build and deploy as described under Hosting.

As the work moves, update `status` in the front matter:

| status | meaning |
| --- | --- |
| `planned` | PRFAQ written and committed to |
| `building` | work has started |
| `shipped` | out; add `shipped:` and optionally `release:` |
| `shelved` | not building it for now; say why in `statusUpdate:` |

Don't delete shelved posts. Each status change is worth a commit, so the history shows when it moved.

## Where things live

```
src/index.njk               home page
src/_data/assessments.js    the examples in the "pick a change" panel
src/_data/site.js           site settings, including the Compass repo
src/news/                   news posts (one Markdown file each)
src/assets/css/site.css     all the styles
templates/prfaq.md          template for new posts
```

## Hosting

The site runs on Cloudflare Workers as static assets. `wrangler.jsonc` sets the Worker name, the `_site` folder and the `ayeo.io` custom domain. `src/_headers` sets the security and cache headers.

To check the built site locally, then deploy it:

```
npm run build
npx wrangler dev
npx wrangler deploy
```

The `ayeo.io` zone must be on the same Cloudflare account. The first deploy creates the DNS record and certificate.
