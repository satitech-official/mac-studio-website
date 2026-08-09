<div align="center">

# 🎨 MAC Studio — Premium Art Studio Website

A cinematic, responsive and interactive website for **MAC Studio, Sector 57, Gurugram**.

<br />

<a href="https://satitech-official.github.io/mac-studio-website/">
  <img src="https://img.shields.io/badge/🌐%20LIVE%20WEBSITE-OPEN%20DEMO-111111?style=for-the-badge" alt="Open MAC Studio Live Website" />
</a>

<br /><br />

<img src="https://raw.githubusercontent.com/satitech-official/mac-studio-website/main/public/og.png" alt="MAC Studio Website Preview" width="100%" />

</div>

---

## ✨ About the project

The experience includes course filtering, an accessible gallery lightbox, workshop and event states, sample-labelled stories, FAQ accordion, mobile navigation, smooth motion, and a validated registration flow that prepares a WhatsApp message for the visitor to review and send.

### Live website

**https://satitech-official.github.io/mac-studio-website/**

## 🚀 Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
npm run start
```

## 🛠️ Editing content

- `data/content.ts` contains courses, gallery items, FAQs, sample testimonials, editable statistics, and creative-process steps.
- `components/MacStudioSite.tsx` contains the page sections, verified business contact details, registration flow, and map search.
- `app/globals.css` contains the complete design system, animation, and responsive styling.
- `app/layout.tsx` contains SEO and social metadata.
- `public/og.png` is the custom social-sharing and README preview image.

## 🖼️ Replace imagery

The current website uses carefully selected royalty-free images from Pexels and Unsplash as an art-direction moodboard. Replace each remote `src` value in `data/content.ts` and the hero/about/workshop/event image URLs in `components/MacStudioSite.tsx` with optimized official MAC Studio photography when permission is available. Keep the provided alt text accurate after replacement.

## 💬 WhatsApp registration

The form validates name, Indian phone format, optional email, age, city, course, preferred date, and message length. On success it prepares a URL-encoded message for `917838116352`. Visitors always review the message in WhatsApp before choosing Send. No backend or API key is required.

## 🌐 Deployment

GitHub Pages deployment is automated through `.github/workflows/deploy-pages.yml`.

Every push to `main` builds the static Vinext export and publishes `dist/client` to GitHub Pages. The deployment uses the project base path `/mac-studio-website` so the existing layout and styling remain unchanged when served from the repository Pages URL.

The project also keeps its OpenAI Sites/Cloudflare-compatible configuration through `.openai/hosting.json`.

## ✅ Assumptions and unverified content

- Studio name, Sector 57 area, phone/WhatsApp number, Facebook URL, and Instagram URL came from the supplied brief.
- The exact street address, public map pin, business hours, course schedules, durations, prices, workshop dates, event dates, and statistics are not verified and are not presented as facts.
- Course titles and guidance marked with an asterisk are editable sample content.
- Testimonials are explicitly labelled illustrative samples and must be replaced with approved, verified feedback.
- The map displays a Sector 57 area search rather than an exact location pin.
- Newsletter submission is a clearly labelled interface demo until an email service and consent approach are configured.
- Analytics hooks are intentionally not connected until a valid analytics ID and consent plan are available.

---

<div align="center">
  <b>MAC Studio Premium Website</b><br />
  Built for a polished, responsive and creative web experience.
</div>
