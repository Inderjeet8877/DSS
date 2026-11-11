# DSS Talent Bridge

Company website for DSS Talent Bridge, a recruitment and staffing firm that hires for technology and BFSI roles. Live at [dsstalentbridge.com](https://dsstalentbridge.com).

## What is on the site

- Home, about and contact pages
- A jobs board where candidates can apply and employers can post an opening
- A blog with a page per post
- Privacy policy and terms

The three forms (contact, apply, post a job) go through API routes that validate the input with zod and rate-limit by caller, then forward it to a Google Apps Script. The script appends a row to a Google Sheet and sends an email. `google-apps-script.js` is the copy of what is deployed on the Google side.

## Stack

Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4. Animations use GSAP, Motion and Lottie, and the Lottie files are lazy-loaded on scroll. `sitemap.ts` and `robots.ts` generate the SEO files, and the home page ships Organization structured data.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.
