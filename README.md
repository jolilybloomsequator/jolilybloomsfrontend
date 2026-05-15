# Jolily Blooms Equator Limited

Jolily Blooms Equator Limited is a Next.js web app for export-grade Kenyan flowers. The site presents the flower catalogue, export and logistics details, quality standards, FAQs, and a contact flow for weekly orders.

## Features

- Export-focused homepage with highlights, catalogue previews, quality information, and logistics details.
- Filterable flower catalogue by category, colour, and availability.
- Contact form with hCaptcha protection and API-backed submission handling.
- Dedicated pages for About, Logistics, Quality, FAQ, Privacy, and Contact.
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
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

Notes:

- The contact API returns a 503 response if `HCAPTCHA_SECRET` is missing.
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
		logistics/
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
- `/logistics` - export and shipping process
- `/faq` - common questions
- `/contact` - inquiry form and contact details
- `/privacy` - privacy policy

## Deployment

The app can be deployed on any platform that supports Next.js. Vercel is the simplest option, but the production build is standard Next.js and can run anywhere Node.js is available.

## Admin Setup

Admin features (adding flowers and uploading images) are managed through the built-in admin UI.

- Set environment variables in `.env.local`:
	- `ADMIN_EMAIL=info@jolilybloomsequator.com`
	- `ADMIN_PASSWORD=PrincessRhea2023!`
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
