# AWS-002 Design — Aarambh Vidya Play School

Standalone copy of the AWS-002 (Aarambh Vidya Play School & Day Care, Cherial) public-website
design concept, exported from the `arav-web-studio-build` repository's
`projects/proj-aws-002-aarambh-vidya-play-school/design/` folder for design review outside the
main build repo.

## Source of truth

The `arav-web-studio-build` repository remains the source of truth for project state, decisions,
and requirements (see that project's `STATE.md`, `DECISIONS.md` and `DESIGN.md`). Changes made
here should be reflected back there if they affect the approved concept.

Status: v0.1 baseline, refined and enhanced with gentle motion on 2026-09-15 after owner review; alternative homepage directions will be explored before client sharing

`public-site/` is a navigable, static HTML design concept for the **public marketing website** described in section 2.1 of the client's specification. It is a design deliverable, not production code: the form does not submit, the map is not embedded, and every photo, notice, testimonial and news item is a clearly labelled placeholder.

The admin ERP, teacher portal and parent PWA screens (spec sections 2.2 to 2.4) are **not yet designed**; see `DESIGN.md` in the build repo for the direction they will follow.

## How to view

Open `public-site/index.html` in a browser and scroll to review the motion. Fonts (Fredoka, Nunito) load from Google Fonts, so an internet connection is needed for the intended typography; the system fallbacks are still readable. Static screenshots for quick sharing are in `screenshots/`, but they do not demonstrate motion.

## Pages

| File | Spec item | Notes |
| --- | --- | --- |
| `index.html` | Home | Hero, why-choose-us, program ladder, activities, campus tour, admissions steps, notices and testimonial previews, contact strip |
| `programs.html` | Programs | Playgroup, Nursery, LKG, UKG, Daycare, each with draft copy |
| `about.html` | About & Vision | Client wording for about, vision and mission; safety ethos; Principal's message placeholder |
| `admissions.html` | Admissions 2026–27 + Enquiry Form | Eligibility table, proposed three-step process, documents, fee note, full enquiry form |
| `facilities.html` | Facilities | Six facilities from the spec with placeholders |
| `gallery.html` | Gallery | Album grid with category filter chips; consent note |
| `notices.html` | Notices & News | Alert band, notice list, key-dates table, news cards |
| `testimonials.html` | Testimonials | Video placeholder and three quote cards |
| `contact.html` | Contact Us | Call, WhatsApp, visit, hours cards; map placeholder; quick enquiry form |

Every page shares the header, sticky mobile action bar (Call, WhatsApp, Enquire) and footer. The blue "Design concept v0.1" bar at the top is for review only and is removed at implementation.

## v0.1 pre-client refinement

- Replaced unverified scarcity and response-time promises with factual enquiry guidance.
- Standardised the conversion language around enquiries rather than implying that the website completes admission.
- Replaced the empty home-hero photo frame with a consent-safe school, book and learning-block illustration; it remains clearly marked for replacement by a real consented campus photograph.
- Converted the eligibility table into scannable program cards below 600 px.
- Made the unavailable prospectus and gallery category controls visibly non-interactive instead of linking to `#`.
- Replaced the non-functional privacy links with an explicit launch placeholder.
- Changed the five home-page program cards from rising steps to equal heights for cleaner comparison; their order, age labels and coloured top borders still communicate progression.

## v0.1 motion pass

- Added a shared, dependency-free `motion.js` controller to all nine pages.
- Added one-time reveal and short stagger sequences for introductions, headings, split layouts and repeated cards.
- Added draw-on-view animation for the crayon underlines and restrained ambient movement in the illustrated home hero.
- Kept content visible without JavaScript and disabled all motion when the visitor requests reduced motion.
- Preserved normal scrolling and immediate access to every action; no parallax or scroll hijacking is used.

This remains the stable v0.1 baseline for comparing the later motion-led, Warm Storybook Campus, Playful Classroom Scrapbook and Calm Early-Learning Editorial directions. The new gentle motion pass does not select or replace any of those alternative art directions.

## Content status

| Content | Status |
| --- | --- |
| Business name, address, phone, school hours, programs and age bands, taglines, about/vision/mission wording, highlights, activities, facilities list | Client wording, taken from the supplied flyers and specification |
| Program descriptions, facility descriptions, teaching-approach paragraph, admissions process, form helper text | Draft copy written by Arav for review; marked "Draft copy for review" on the page |
| LKG "4+" and UKG "5" split | Interpretation of the flyer's "LKG & UKG: 4+ – 5 years"; confirm |
| Working days (Monday to Saturday), document list, passport-photo count, fee wording | Assumptions or spec-derived; marked "Confirm" on the page |
| Photos, campus tour video, map pin, prospectus PDF, Principal's message | Placeholders; to be supplied by the school. The home hero uses a non-human illustration until a consented campus photograph is available |
| Notices, key dates, news, testimonials, gallery album names | Sample content marked "Sample"; not real |

## Assets

- `assets/aarambh-vidya-logo-client-supplied-v01.jpg` — copy of the client-supplied logo (see `references/README.md` in the build repo for provenance). It has a light, non-transparent background; the design hides this with `mix-blend-mode: multiply` on light surfaces and a white card in the footer. Request a transparent PNG or vector for production.

## Screenshots

`screenshots/2026-09-15-v0.1-*.png` — desktop (1366 px) captures of Home, Programs, Admissions and About, and true 390 px mobile captures of Home and Admissions.

- `screenshots/2026-09-15-v0.1-index-desktop-equal-program-cards-preview.png`: desktop verification of the equal-height program cards at 1366 px.
- `screenshots/2026-09-15-v0.1-admissions-mobile-500-current-preview.png`: current mobile eligibility-card preview at 500 px.

The earlier v0.1 captures remain available for within-version comparison; the refinement did not create a new concept version.

## Known limitations of the concept

- The enquiry form is visual only; submission, validation messages and the success state are specified in DESIGN.md and built in implementation.
- The prospectus and gallery category filters are deliberately non-interactive until the school supplies the underlying content.
- Notices are shown as a static "Latest" band rather than a scrolling marquee, for accessibility; a rotating alert with controls can be added at implementation if the client wants it.
- The spec's Milestone 1 names Figma. This concept is HTML; see AWS-002-ADR-003 in `DECISIONS.md` in the build repo.
- The concept was generated from a build script kept outside the repository; edit the HTML and CSS here directly from now on.
