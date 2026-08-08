# MAC Studio — Premium Art Studio Website

A cinematic, responsive website for MAC Studio in Sector 57, Gurugram. The experience includes course filtering, an accessible gallery lightbox, workshop and event states, sample-labelled stories, FAQ accordion, mobile navigation, smooth motion, and a validated registration flow that prepares a WhatsApp message for the visitor to review and send.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
npm run start
```

## Editing content

- `data/content.ts` contains courses, gallery items, FAQs, sample testimonials, editable statistics, and creative-process steps.
- `components/MacStudioSite.tsx` contains the page sections, verified business contact details, registration flow, and map search.
- `app/globals.css` contains the complete design system, animation, and responsive styling.
- `app/layout.tsx` contains SEO and social metadata.
- `public/og.png` is the custom social-sharing image.

## Replace imagery

The current website uses carefully selected royalty-free images from Pexels and Unsplash as an art-direction moodboard. Replace each remote `src` value in `data/content.ts` and the hero/about/workshop/event image URLs in `components/MacStudioSite.tsx` with optimized official MAC Studio photography when permission is available. Keep the provided alt text accurate after replacement.

## WhatsApp registration

The form validates name, Indian phone format, optional email, age, city, course, preferred date, and message length. On success it prepares a URL-encoded message for `917838116352`. Visitors always review the message in WhatsApp before choosing Send. No backend or API key is required.

## Deployment

The project is configured for OpenAI Sites/Cloudflare-compatible deployment through `.openai/hosting.json`. It can also be connected to a standard Git provider and deployed through a compatible React/Next-style hosting workflow. Replace the placeholder canonical domain `https://mac-studio.example` in `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts` with the final production domain.

## Assumptions and unverified content

- Studio name, Sector 57 area, phone/WhatsApp number, Facebook URL, and Instagram URL came from the supplied brief.
- The exact street address, public map pin, business hours, course schedules, durations, prices, workshop dates, event dates, and statistics are not verified and are not presented as facts.
- Course titles and guidance marked with an asterisk are editable sample content.
- Testimonials are explicitly labelled illustrative samples and must be replaced with approved, verified feedback.
- The map displays a Sector 57 area search rather than an exact location pin.
- Newsletter submission is a clearly labelled interface demo until an email service and consent approach are configured.
- Analytics hooks are intentionally not connected until a valid analytics ID and consent plan are available.
