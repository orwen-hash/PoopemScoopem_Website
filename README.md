# Poop’em Scoop’em — Home, About and Contact

A responsive, dependency-free three-page website built with HTML, CSS and vanilla JavaScript.

## Open it

Open `dist/index.html` directly in a browser. No npm install or build step is needed.
You can also serve `dist` with VS Code Live Server or run `python3 -m http.server 8000 --directory dist` from this folder.
To deploy on a static host, upload the contents of `dist`.

## Files

- `dist/index.html`: semantic homepage markup and editable business copy.
- `dist/about.html`: standalone company story with the same content as the homepage.
- `dist/contact.html`: contact page with name, email, subject and message fields.
- `dist/contact.js`: inline validation and configured-endpoint submission handling.
- `dist/contact-config.js`: contact endpoint configuration; currently unset.
- `dist/assets/logo.png`: original supplied logo, unmodified; CSS frames its transparent margins.
- `dist/styles.css`: design tokens, layouts and responsive breakpoints.
- `dist/script.js`: mobile navigation, testimonial controls, animated counters and copyright year.
- `dist/assets/backyard.webp`: generated border collie hero photograph.
- `dist/assets/happy-dog.webp`: generated golden retriever service photograph.
- `dist/assets/cat-at-home.webp`: generated indoor cat photograph.
- `dev-server.mjs` and `package.json`: optional dependency-free Node preview; run `npm run dev`.
- `dist/assets/favicon.svg`: simple initial favicon.

## What works

Responsive layouts; mobile navigation including Escape and outside-click dismissal; four expandable yard-service descriptions plus cat litter and home feeding; four plan links; expandable company story; previous/next testimonial carousel; click-to-call contact links. No autoplay or tracking. Reduced-motion preferences are respected. Core page content is available without JavaScript.

## Content and integration notes

- Home, About and Contact are separate pages. The homepage retains its About section and links to the dedicated page. Services and pricing links point to the appropriate homepage sections. Booking uses the original external calendar.
- Booking buttons use `https://calendly.com/info-guy`, recovered from the supplied archived HTML. They open in a new tab. The live availability of this third-party calendar has not been verified; update its URL if needed. No booking is submitted automatically.
- Phone number and business hours come from the supplied HTML.
- Prices are reproduced exactly: $15 / one cleaning weekly; $20 / two cleanings weekly; $25 / biweekly; $30 / once monthly. The source does not specify the billing unit or disambiguate “biweekly.” Confirm both before a public launch. The design does not invent a per-visit or per-month billing unit.
- Testimonials come from the supplied HTML, with minor grammar cleanup in the first quote. No ratings, fabricated testimonials, or stock portraits pretending to be customers are added. The counters are the figures explicitly supplied by the user.
- The incomplete source email `info@poopemscoopem` and empty social/privacy/terms links are omitted. Add verified addresses and actual legal pages when available.
- The supplied logo is displayed in the header and footer of all three pages.
- Homepage and About counters display exactly 52 Pets Cared For, 14+ Happy Clients, and 2+ Years of Experience, as requested. They animate once when visible, respect reduced motion, and retain accessible static totals.
- Images are AI-generated brand photography, not a photograph of an actual customer or employee. All images are bundled locally; there are no external image, font or script dependencies.

## Design

Full-width backyard photography and oversized white display type draw from the first supplied moodboard. Open service rows, asymmetric spacing, and editorial image sections draw from the third. Forest green, warm white, pale citrus, and a terracotta cat-care section create a distinct rhythm. Pricing uses open rows instead of repeated cards. Tokens are at the beginning of `styles.css`. Native system fonts keep it fast and portable.

## Validation

Checked local assets, anchor targets, unique HTML IDs and JavaScript syntax. Reviewed the desktop hero and services in a live browser; checked a 390px phone preview (375px content area), mobile menu open/close, service expansion, testimonial switching, and absence of horizontal overflow. Before launching publicly, verify the booking calendar, current prices and contact details.

## Contact delivery — configuration required

The original contact HTML referenced `contact_process.php`, but its source was not supplied. Its email address was incomplete (`info@poopemscoopem`). No recipient or backend has been guessed.

The contact page is complete visually and validates fields on blur. Sending is deliberately disabled until a working endpoint is configured; visitors see a clear phone alternative. Nothing is silently discarded and there is no simulated success message.

To enable online enquiries:

1. Supply or deploy your contact handler or form service endpoint.
2. Set `endpoint` in `dist/contact-config.js` to its URL. Use HTTPS in production.
3. The endpoint must accept a multipart POST with `name`, `email`, `subject`, `message`, and an empty `website` honeypot field. It must validate inputs server-side and return a successful HTTP status with JSON `{ "success": true }` only after accepting the enquiry. Configure CORS if hosted on a different origin.
4. The UI supports sending, confirmation, invalid-field, timeout and error states. It preserves input after failures. Confirm real delivery with your mailbox before launch.

Never put email-service API keys or SMTP passwords in browser JavaScript. Static hosting does not execute PHP files; the handler must run on a suitable server or form service.

## Added-page checks

Reviewed About and Contact on desktop and in a 390px phone frame; checked cross-page navigation, mobile-menu dismissal, contact email validation, disabled delivery when no endpoint is configured, and counters settling on 52 / 14+ / 2+. All local page/asset links and JavaScript syntax were checked. End-to-end email delivery remains untested because no backend was supplied.
