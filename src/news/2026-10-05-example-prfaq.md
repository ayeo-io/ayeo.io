---
title: "Example: Compass shows its reasoning for every assessment"
subtitle: "A worked example of a PRFAQ post. It's a draft, so it only appears when you run the site locally. Delete it once you've published a real one."
summary: "An example PRFAQ post showing the layout. Not a real announcement."
status: planned
draft: true
faq:
  - q: "Who is this for?"
    a: "Tech leads who want to know why Compass gave a change the process it did, without reading the policy files."
  - q: "Does it change how Compass routes work?"
    a: "No. The routing is the same. This only explains it."
  - q: "Can I turn it off?"
    a: "Yes. Run `compass config set explain off`."
---

From today, every Compass assessment comes with a short, plain-English explanation of why it chose the approach it did, and which part of your policy made the difference.

## The problem

When Compass decides a small change needs a full spec, people want to know why. The answer is in the policy and the assessment, but finding it means reading YAML.

## What's new

`/compass:assess` now ends with two or three sentences naming the deciding factors, for example: "Treated as a feature because it changes a public API. Familiarity lowered the depth of the design."

## Getting started

Update the plugin and assess a change as usual.

```
/compass:assess "Add rate limiting to the public API"
```
