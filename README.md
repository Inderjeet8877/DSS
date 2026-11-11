# DSS Talent Bridge

Company website for DSS Talent Bridge, a recruitment and staffing firm that hires for technology and BFSI roles. Live at [dsstalentbridge.com](https://dsstalentbridge.com).

## What is on the site

- Home, about and contact pages
- A jobs board with a page per opening
- A blog
- Privacy policy and terms
- A contact form that validates input with zod and posts to a Google Apps Script, which writes the enquiry to a sheet (`google-apps-script.js` is the script deployed on the Google side)

## Stack

Next.js (App Router) with TypeScript and Tailwind CSS. Animations use GSAP, Motion and Lottie; the Lottie files load only when they scroll into view, because loading them upfront hurt the first paint. `sitemap.ts` and `robots.ts` generate the SEO files, and the home page ships Organization structured data.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.
