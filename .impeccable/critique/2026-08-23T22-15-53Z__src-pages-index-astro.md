---
target: personal portfolio site, primarily src/pages/index.astro
total_score: 24
p0_count: 0
p1_count: 2
timestamp: 2026-08-23T22-15-53Z
slug: src-pages-index-astro
---
# Design health

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of system status | 2 | Navigation has no current-page state, and the mobile menu does not announce whether it is open. |
| 2 | Match between the site and the real world | 3 | Most language is clear, but the dictionary treatment and shifting job titles make visitors translate the positioning. |
| 3 | User control and freedom | 2 | The mobile menu ignores Escape, does not manage focus, and exposes hidden links to assistive technology. |
| 4 | Consistency and standards | 3 | The visual system is consistent, but Product Engineer, Senior Full Stack Web Developer, designer and digital strategist compete. |
| 5 | Error prevention | 3 | The contact form covers common mistakes, but it lacks autocomplete and useful guidance before submission. |
| 6 | Recognition rather than recall | 3 | Core routes are clear. There is no active-page state, and closed mobile navigation remains in the accessibility tree. |
| 7 | Flexibility and efficiency | 2 | Direct email is useful, but keyboard navigation lacks a skip link and a reliable mobile-menu interaction. |
| 8 | Aesthetic and minimalist design | 2 | The composition is clean, but repeated decorative devices replace proof of work and personality. |
| 9 | Error recognition and recovery | 2 | Field errors exist, but the generic submission failure gives no cause or recovery step. |
| 10 | Help and documentation | 2 | Contact details are easy to find. The site does not set expectations for replies or explain what makes a useful project enquiry. |
| **Total** |  | **24/40** | **Acceptable, with significant improvements needed** |

## Anti-pattern verdict

The site looks AI-generated. The dictionary idea is relevant to Rob's public brand, but the supporting design belongs to a saturated editorial portfolio style: warm parchment, near-black panels, a display serif, mono metadata, tiny tracked labels, numbered dividers, orange side stripes and repeated bordered card grids.

The deterministic scan reported zero findings. That result is a limitation of the scanner, not proof that the site is clean. It missed Astro fragments that do not contain a full HTML document. Manual source and browser review found eleven repeated label treatments, eight decorative section numbers, four side-stripe callouts, a cream page treatment and two identical three-card grids. No false positives were present because the scan returned nothing.

No user-visible overlay was created. Browser mutation was unavailable, so the assessment used full-page browser inspection, DOM snapshots, mobile rendering and source review instead.

## Overall impression

The site is tidy, responsive and readable. It does not sound or look quite like Rob. The public profiles are cooler, simpler and more direct. They use one sans-serif voice, charcoal and white, a straightforward portrait and the dictionary definition as the only distinctive device. The site copied that device, then surrounded it with generic editorial decoration.

The biggest opportunity is to stop decorating the claim and prove it. Use the portrait, show selected work, make the writing sound more like Rob's posts and give paid project enquiries a clear route through Lancio Studio.

## What works

- Contrast is solid. The tested text and background combinations passed WCAG AA, including muted text on both dark and light sections.
- The layouts behave well on mobile. Cards stack cleanly, the hero fits at 390 pixels and no horizontal overflow appeared.
- The attributed LinkedIn recommendations are credible. They use names, roles and specific praise rather than generic testimonial copy.

## Priority issues

### P1: The portfolio does not show work

The homepage claims product judgment, design skill and engineering ability, then leads with three text-only blog cards. There is no shipped interface, project image, design decision or result.

Add selected work before the blog. Lancio's existing case studies can provide real proof without inventing a new portfolio narrative. Show the project, Rob's role, one useful decision and a link to the complete case study.

Suggested command: `$impeccable bolder`

### P1: Mobile navigation is inaccessible

The menu is hidden with opacity and pointer events only, so its links remain available to keyboards and assistive technology. The control lacks `aria-expanded` and `aria-controls`, does not update its label, ignores Escape and does not restore focus. Several targets are smaller than 44 pixels.

Give the menu a real hidden state, connect it to the control, update its accessible state, handle Escape and focus, and enlarge mobile targets.

Suggested command: `$impeccable harden`

### P2: The visual identity uses a familiar template grammar

The warm paper palette, DM Serif, DM Mono, numbered labels, rules, side stripes and identical cards make the site feel generated. The social profiles already provide a better direction: cool charcoal, plain white, a strong sans serif, one dictionary idea and a real photograph.

Keep the dictionary hero. Remove the extra editorial devices. Use a cool neutral palette, one type family, direct section headings, open layouts and real project or portrait imagery.

Suggested command: `$impeccable quieter`

### P2: The positioning conflicts with itself

The site switches between Product Engineer, Senior Full Stack Web Developer, designer and digital strategist. It also treats freelance work as a vague personal service, even though Lancio Studio is the business that accepts those projects.

Use Product Engineer as the personal title. Describe design and full-stack engineering as skills. Route commercial projects through Lancio Studio in the homepage, contact page and footer.

Suggested command: `$impeccable clarify`

### P2: The page loses momentum after its opening

The hero is the strongest moment. The next section leads to blog posts, the services copy is vague, the About section repeats the same claim and the page ends after testimonials with no next action.

Move proof closer to the hero. Give employment and client visitors distinct paths. End with a clear choice to read about Rob or start a project with Lancio.

Suggested command: `$impeccable layout`

## Persona red flags

### Jordan, a first-time visitor

Jordan cannot tell whether the site is for an employer, a client or a blog reader. Framework names and phrases such as "full-stack capability" arrive before proof. With no visible projects, the claim that the work "works as well as it looks" cannot be checked.

### Sam, a keyboard or screen-reader user

Sam encounters closed menu links that remain focusable. The menu does not announce its state, handle Escape or restore focus. The navigation lacks an active-page state, and several controls fall below the recommended 44-pixel target.

### Casey, a distracted mobile visitor

Casey sees multiple competing actions and small header controls. The paid-project route sits halfway down the homepage. After the strongest testimonial, the page ends without telling Casey what to do next.

## Minor observations

- The contact hero ends with the sentence fragment, "If you have a project in mind, or just want to say hello."
- The contact button does not change its message while submitting or expose a busy state.
- Smooth scrolling has no reduced-motion override.
- Three suitable portrait assets exist but are unused.
- The two oldest roles on the About timeline show the same dates despite different timeline years.
- The footer repeats social links but omits the useful email address and primary navigation.

## Questions to consider

- Should the first 15 seconds sell Rob as a senior product engineer, or sell a Lancio Studio engagement?
- Can the dictionary idea remain the brand device while the rest of the page becomes simpler and more personal?
- Which Lancio case studies best prove the combination of product thinking, design and engineering?
- What should a visitor do after reading the strongest recommendation?
