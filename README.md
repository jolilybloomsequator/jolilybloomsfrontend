# Jolily Blooms Equator Limited

Jolily Blooms Equator Limited is a Next.js web app for export-grade Kenyan flowers. The site presents the flower catalogue, quality standards, FAQs, and a contact flow for weekly orders.

## Features

- Export-focused homepage with highlights, catalogue previews, and quality information.
- Filterable flower catalogue by category, colour, and availability.
- Contact form with hCaptcha protection and API-backed submission handling.
- Dedicated pages for About, Quality, FAQ, Privacy, and Contact.
- Persistent site header, footer, and WhatsApp shortcut.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide icons
- Framer Motion
- React Hook Form and Zod for form handling and validation
- Upstash Redis for optional rate limiting
- hCaptcha for spam protection

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - start the development server
- `npm run build` - build the production app
- `npm run start` - start the production server
- `npm run lint` - run ESLint

## Environment Variables

The app can run with default fallbacks for some values, but the contact flow and public metadata work best when these are set:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_WHATSAPP_NUMBER=254700000000
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=your_hcaptcha_site_key
HCAPTCHA_SECRET=your_hcaptcha_secret
CONTACT_TO_EMAIL=info@jolilybloomsequator.com
EMAIL_FROM=info@jolilybloomsequator.com
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=465
EMAIL_USE_SSL=True
EMAIL_USE_TLS=False
EMAIL_HOST_USER=your_brevo_smtp_user
EMAIL_HOST_PASSWORD=your_brevo_smtp_password
ADMIN_EMAIL=info@jolilybloomsequator.com
ADMIN_PASSWORD=your_admin_password
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

Notes:

- The contact API returns a 503 response if `HCAPTCHA_SECRET` is missing.
- The contact API uses Brevo SMTP via `EMAIL_HOST`, `EMAIL_HOST_USER`, and `EMAIL_HOST_PASSWORD`.
- The admin login page uses `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
- Upstash Redis is optional; when it is not configured, the API falls back to an in-memory rate limiter.
- If `NEXT_PUBLIC_SITE_URL` is not set, the app uses `https://jolilybloomsequator.com` for metadata defaults.

## Project Structure

```text
src/
	app/
		about/
		api/contact/
		contact/
		faq/
		flowers/
		privacy/
		quality/
	components/
	data/
public/
```

## Routes

- `/` - homepage
- `/about` - company overview
- `/flowers` - filterable catalogue
- `/quality` - grading and packaging standards
- `/faq` - common questions
- `/contact` - inquiry form and contact details
- `/privacy` - privacy policy

## Deployment

The app can be deployed on any platform that supports Next.js. Vercel is the simplest option, but the production build is standard Next.js and can run anywhere Node.js is available.

## Admin Setup

Admin features (adding flowers and uploading images) are managed through the built-in admin UI.

- Admin UI:
  - Login page: `/admin/login`
  - Management dashboard: `/admin/flowers`
  - Upload endpoint: `POST /api/admin/flowers/upload` (multipart/form-data with `flower` JSON and optional `image` file)
  - Login endpoint: `POST /api/admin/login`
  - Logout endpoint: `POST /api/admin/logout`
- Storage and files:
  - Flower metadata is stored in `src/data/flowers.json`.
  - Uploaded images are saved to `public/images/flowers/` and served at `/images/flowers/[filename]`.

Notes:
- The admin UI requires the `admin_session` cookie which is set after a successful login.
- For production, consider using secure secret management for admin credentials and an external image storage (S3, Cloudinary, Vercel Blob).
