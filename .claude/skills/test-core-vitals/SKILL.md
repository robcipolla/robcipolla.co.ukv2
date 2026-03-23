---
name: test-core-vitals
description: Run a full Lighthouse audit (Performance, Accessibility, Best Practices, SEO) across all page templates. Generates a markdown report with metrics, scores, and recommendations.
user-invocable: true
---

# Core Web Vitals & Lighthouse Audit Skill

You are running a full Lighthouse audit covering Performance, Accessibility, Best Practices, and SEO. Follow these steps precisely.

## Parse Arguments

Check the user's invocation for optional flags:
- `--production` — test against `https://www.robcipolla.co.uk` instead of local dev server
- `--desktop-only` — skip mobile tests
- `--mobile-only` — skip desktop tests
- `--page <type>` — test only one page type (home, about, blog, blog-post, contact, 404)
- `--perf-only` — only audit Performance category
- `--a11y-only` — only audit Accessibility category
- `--seo-only` — only audit SEO category
- `--bp-only` — only audit Best Practices category

Defaults: local dev server (`http://localhost:4321`), both desktop and mobile, all pages, all 4 categories.

## Step 1: Pre-flight Checks

1. Verify Lighthouse is available:
   ```bash
   npx lighthouse --version
   ```
   If this fails, tell the user to install it: `bun add -g lighthouse`

2. If testing locally (no `--production` flag):
   - Check if dev server is running: `curl -s -o /dev/null -w "%{http_code}" http://localhost:4321`
   - If NOT running (non-200 response), start it:
     ```bash
     bun run dev &
     ```
     Then poll with `curl -s -o /dev/null -w "%{http_code}" http://localhost:4321` every 2 seconds, up to 15 seconds, until it responds with 200.
   - If it still doesn't respond after 15 seconds, tell the user and stop.

3. Create reports directory:
   ```bash
   mkdir -p reports
   ```

4. Tell the user: "Running full Lighthouse audit — this will take approximately {estimate} minutes." (Single page ~30s per form factor; all pages ~4-6 minutes for both form factors.)

## Step 2: Define Test URLs

Set the base URL based on arguments:
- Local: `http://localhost:4321`
- Production: `https://www.robcipolla.co.uk`

Page template URL map:

| Key | Page Type | Path |
|-----|-----------|------|
| home | Home | `/` |
| about | About | `/about` |
| blog | Blog Listing | `/blog` |
| blog-post | Blog Post | `/blog/designing-and-building-my-full-stack-web-developer-and-designer-website` |
| contact | Contact | `/contact` |
| 404 | 404 Page | `/nonexistent-page-404-test` |

If `--page` flag is set, filter to only that page. Otherwise test all 6.

## Step 3: Determine Categories

Based on flags, set the `--only-categories` value:
- Default (no flag): `performance,accessibility,best-practices,seo`
- `--perf-only`: `performance`
- `--a11y-only`: `accessibility`
- `--seo-only`: `seo`
- `--bp-only`: `best-practices`

## Step 4: Run Lighthouse Audits

For each page, for each form factor (desktop then mobile), run Lighthouse and extract metrics.

### Desktop audit command:
```bash
npx lighthouse "{base_url}{path}" \
  --output=json \
  --output-path=stdout \
  --only-categories={categories} \
  --chrome-flags="--headless --no-sandbox --disable-gpu" \
  --preset=desktop \
  --quiet 2>/dev/null | node -e "
    const d = require('fs').readFileSync('/dev/stdin', 'utf8');
    const r = JSON.parse(d), a = r.audits, c = r.categories;
    const result = {};

    if (c.performance) {
      result.performance = {
        score: Math.round(c.performance.score * 100),
        lcp: (a['largest-contentful-paint'].numericValue / 1000).toFixed(2),
        cls: a['cumulative-layout-shift'].numericValue.toFixed(3),
        tbt: Math.round(a['total-blocking-time'].numericValue),
        fcp: (a['first-contentful-paint'].numericValue / 1000).toFixed(2),
        si: (a['speed-index'].numericValue / 1000).toFixed(2),
        ttfb: Math.round((a['server-response-time'] && a['server-response-time'].numericValue) || 0)
      };
    }

    if (c.accessibility) {
      const failedA11y = c.accessibility.auditRefs
        .filter(ref => a[ref.id] && a[ref.id].score !== null && a[ref.id].score < 1)
        .map(ref => ({ id: ref.id, title: a[ref.id].title, score: a[ref.id].score }));
      result.accessibility = {
        score: Math.round(c.accessibility.score * 100),
        failedAudits: failedA11y
      };
    }

    if (c['best-practices']) {
      const failedBP = c['best-practices'].auditRefs
        .filter(ref => a[ref.id] && a[ref.id].score !== null && a[ref.id].score < 1)
        .map(ref => ({ id: ref.id, title: a[ref.id].title, score: a[ref.id].score }));
      result.bestPractices = {
        score: Math.round(c['best-practices'].score * 100),
        failedAudits: failedBP
      };
    }

    if (c.seo) {
      const failedSEO = c.seo.auditRefs
        .filter(ref => a[ref.id] && a[ref.id].score !== null && a[ref.id].score < 1)
        .map(ref => ({ id: ref.id, title: a[ref.id].title, score: a[ref.id].score }));
      result.seo = {
        score: Math.round(c.seo.score * 100),
        failedAudits: failedSEO
      };
    }

    console.log(JSON.stringify(result));
  "
```

### Mobile audit command (remove `--preset=desktop`):
```bash
npx lighthouse "{base_url}{path}" \
  --output=json \
  --output-path=stdout \
  --only-categories={categories} \
  --chrome-flags="--headless --no-sandbox --disable-gpu" \
  --quiet 2>/dev/null | node -e "
    const d = require('fs').readFileSync('/dev/stdin', 'utf8');
    const r = JSON.parse(d), a = r.audits, c = r.categories;
    const result = {};

    if (c.performance) {
      result.performance = {
        score: Math.round(c.performance.score * 100),
        lcp: (a['largest-contentful-paint'].numericValue / 1000).toFixed(2),
        cls: a['cumulative-layout-shift'].numericValue.toFixed(3),
        tbt: Math.round(a['total-blocking-time'].numericValue),
        fcp: (a['first-contentful-paint'].numericValue / 1000).toFixed(2),
        si: (a['speed-index'].numericValue / 1000).toFixed(2),
        ttfb: Math.round((a['server-response-time'] && a['server-response-time'].numericValue) || 0)
      };
    }

    if (c.accessibility) {
      const failedA11y = c.accessibility.auditRefs
        .filter(ref => a[ref.id] && a[ref.id].score !== null && a[ref.id].score < 1)
        .map(ref => ({ id: ref.id, title: a[ref.id].title, score: a[ref.id].score }));
      result.accessibility = {
        score: Math.round(c.accessibility.score * 100),
        failedAudits: failedA11y
      };
    }

    if (c['best-practices']) {
      const failedBP = c['best-practices'].auditRefs
        .filter(ref => a[ref.id] && a[ref.id].score !== null && a[ref.id].score < 1)
        .map(ref => ({ id: ref.id, title: a[ref.id].title, score: a[ref.id].score }));
      result.bestPractices = {
        score: Math.round(c['best-practices'].score * 100),
        failedAudits: failedBP
      };
    }

    if (c.seo) {
      const failedSEO = c.seo.auditRefs
        .filter(ref => a[ref.id] && a[ref.id].score !== null && a[ref.id].score < 1)
        .map(ref => ({ id: ref.id, title: a[ref.id].title, score: a[ref.id].score }));
      result.seo = {
        score: Math.round(c.seo.score * 100),
        failedAudits: failedSEO
      };
    }

    console.log(JSON.stringify(result));
  "
```

Run audits sequentially (parallel runs cause resource contention). Parse the JSON output from each run and store the results.

If a Lighthouse run fails for a specific page, note the error and continue with remaining pages.

## Step 5: Evaluate Results

### Performance thresholds:

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP | < 2.5s | 2.5–4.0s | >= 4.0s |
| CLS | < 0.1 | 0.1–0.25 | >= 0.25 |
| TBT | < 200ms | 200–600ms | >= 600ms |
| FCP | < 1.8s | 1.8–3.0s | >= 3.0s |
| TTFB | < 800ms | — | >= 800ms |

### Category score thresholds (applies to all 4 categories):

| Score | Rating |
|-------|--------|
| 90–100 | Good |
| 50–89 | Needs Improvement |
| 0–49 | Poor |

### Accessibility, Best Practices, and SEO:
For these categories, in addition to the overall score, list each **failed audit** by name. These are the specific issues that need fixing (e.g., "Images do not have alt attributes", "Document does not have a meta description").

## Step 6: Generate Report

Write the report to `reports/core-web-vitals-{YYYY-MM-DD-HHmmss}.md` using this structure:

```markdown
# Lighthouse Audit Report

**Date:** {YYYY-MM-DD HH:mm}
**Environment:** {Local (http://localhost:4321) | Production (https://www.robcipolla.co.uk)}
**Tool:** Lighthouse {version}
**Categories:** {Performance, Accessibility, Best Practices, SEO}

## Executive Summary

| Category | Target | Desktop | Mobile |
|----------|--------|---------|--------|
| Performance 90+ | {total}/{total} | {count}/{total} | {count}/{total} |
| Accessibility 90+ | {total}/{total} | {count}/{total} | {count}/{total} |
| Best Practices 90+ | {total}/{total} | {count}/{total} | {count}/{total} |
| SEO 90+ | {total}/{total} | {count}/{total} | {count}/{total} |

## Desktop Scores

| Page | Performance | Accessibility | Best Practices | SEO |
|------|-------------|---------------|----------------|-----|
| Home (/) | {score} | {score} | {score} | {score} |
| About (/about) | {score} | {score} | {score} | {score} |
| Blog (/blog) | {score} | {score} | {score} | {score} |
| Blog Post | {score} | {score} | {score} | {score} |
| Contact (/contact) | {score} | {score} | {score} | {score} |
| 404 | {score} | {score} | {score} | {score} |

## Mobile Scores

| Page | Performance | Accessibility | Best Practices | SEO |
|------|-------------|---------------|----------------|-----|
| Home (/) | {score} | {score} | {score} | {score} |
| ... | ... | ... | ... | ... |

## Performance Details

### Desktop

| Page | LCP | CLS | TBT | FCP | SI | TTFB |
|------|-----|-----|-----|-----|----|----|
| Home (/) | {lcp}s | {cls} | {tbt}ms | {fcp}s | {si}s | {ttfb}ms |
| ... | ... | ... | ... | ... | ... | ... |

### Mobile

| Page | LCP | CLS | TBT | FCP | SI | TTFB |
|------|-----|-----|-----|-----|----|----|
| Home (/) | {lcp}s | {cls} | {tbt}ms | {fcp}s | {si}s | {ttfb}ms |
| ... | ... | ... | ... | ... | ... | ... |

## Accessibility Issues

List any failed accessibility audits per page. If a page scores 100, note "No issues found."

### Home (/)
- **Score:** {score}/100
- {List each failed audit title, or "No issues found."}

### About (/about)
...

(Repeat for each page)

## Best Practices Issues

List any failed best practices audits per page.

### Home (/)
- **Score:** {score}/100
- {List each failed audit title, or "No issues found."}

(Repeat for each page)

## SEO Issues

List any failed SEO audits per page.

### Home (/)
- **Score:** {score}/100
- {List each failed audit title, or "No issues found."}

(Repeat for each page)

## Detailed Findings Per Page

### Home (/)
- Key observations across all categories.
- Performance: watch for LCP from hero images.
- Accessibility: check color contrast on hero text, alt text on images.
- SEO: verify meta description, Open Graph tags.

### About (/about)
...

### Blog Listing (/blog)
...

### Blog Post (/blog/...)
- Note: This page is prerendered (`prerender = true`) — should have excellent TTFB.
- SEO: verify structured data (BlogPosting schema.org) is valid.
...

### Contact (/contact)
- Note: Contains a React hydration island (`ContactForm` with `client:visible`). Monitor TBT impact from React bundle.
- Accessibility: verify form labels, focus management, and ARIA attributes on the contact form.
...

### 404 (/nonexistent-page-404-test)
...

## Recommendations

### Critical (Poor scores — any category below 50)
{Numbered list of issues with Poor ratings and suggested fixes}

### Improvements (Needs Improvement — scores 50-89)
{Numbered list of issues and suggested fixes}

### Maintenance (Good — scores 90+)
{Brief notes on what's performing well}

---
*Generated by `/test-core-vitals` skill*
```

## Step 7: Print Summary

After writing the report, print a concise summary table to the conversation showing:
- Each page's desktop and mobile scores across all 4 categories
- Any scores below 90 highlighted
- Count of failed audits per category if any
- The path to the full report file

## Page-Specific Context

Use this knowledge when analysing results and writing recommendations:

- **Home (/)**: Hero section with images, 3 blog post cards, custom fonts (DM Serif, DM Sans, DM Mono) preloaded. Watch for LCP from hero images. Check alt text on blog card images and hero.
- **About (/about)**: Long page with timeline, multiple sections. Watch for CLS from images loading. Check heading hierarchy and landmark regions for accessibility.
- **Blog (/blog)**: Grid of blog post cards with images. Watch for CLS from card layout shifts. Verify blog post links are descriptive for SEO.
- **Blog Post**: MDX content with potential code blocks and images. Prerendered — expect fast TTFB. Has BlogPosting structured data — verify it's valid for SEO. Check code block accessibility.
- **Contact (/contact)**: React hydration island (`@formspree/react` with `client:visible`). Most likely page to have elevated TBT. Critical for accessibility — form labels, error states, focus management.
- **404**: Minimal page — should score very well. If it doesn't, indicates a site-wide issue.
