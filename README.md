# GangHouse Franchise Proposal Website

A bilingual (English / Vietnamese) responsive franchise proposal site, with an enquiry form and a password-protected admin inbox. Built with Next.js and Supabase, ready for Vercel deployment.

## Included
- English-first proposal with EN / VI language toggle.
- GangHouse logo and coordinated charcoal / cream / flame-orange visual system.
- Two operating formats and indicative investment ranges.
- Franchise fee and 50% / 50% payment milestones.
- Tiered royalty display and proposed 4 km territory protection.
- Partner questionnaire and free-text notes.
- Private `/admin` page for reviewing all submitted enquiries.
- Server-side submission storage; Supabase service-role key is not sent to the browser.

## 1. Create the database
1. Create a project in Supabase.
2. Open **SQL Editor** and run the contents of `supabase-schema.sql`.
3. In Project Settings > API, copy the Project URL and `service_role` key. Keep the service-role key private.

## 2. Configure environment variables
Copy `.env.example` to `.env.local` for local testing, then fill in:

```env
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
ADMIN_PASSWORD=use-a-long-random-password
ADMIN_SESSION_SECRET=a-separate-random-secret-at-least-32-bytes
```

Do not commit `.env.local` or expose the service-role key in any `NEXT_PUBLIC_` variable.

## 3. Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Submit a test enquiry, then visit http://localhost:3000/admin and sign in using `ADMIN_PASSWORD`.

## 4. Deploy to Vercel
1. Push this folder to a private GitHub repository.
2. In Vercel, choose **Add New > Project** and import the repository.
3. Add `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` under Project Settings > Environment Variables (Production, Preview as needed). Use a separate, randomly generated `ADMIN_SESSION_SECRET` with at least 32 bytes of entropy. Never share or commit these secrets.
4. Deploy. Vercel will detect Next.js automatically.
5. Test the public form and `/admin` on the deployed domain.

A Vercel account and access to the owner's GitHub / Supabase projects are required to publish this to a live URL. This project bundle is deployment-ready, but has not been deployed because no account credentials or connected Vercel project were provided.

## Business details shown on the site
- Franchise fee: VND 80 million.
- Model A setup: VND 120–150 million; indicative total including franchise fee: VND 200–230 million.
- Model B setup: VND 200–230 million; indicative total including franchise fee: VND 280–310 million.
- Monthly early-stage operating costs: VND 45–55 million; currently described as excluding ingredients / cost of goods.
- Premises deposit / rent at initial stage for Model A: VND 30–60 million.
- Monthly royalty: 4% below VND 300m; 5% at VND 300–500m; 6% above VND 500m. Exact treatment at exactly VND 300m and VND 500m should be confirmed in the franchise agreement.
- Proposed protected radius: 4 km, subject to final written agreement.
- Franchise fee payment: VND 40m at partnership confirmation; VND 40m when both parties approve the premises and begin build-out.
- First VND 40m refund if no suitable premises are secured: the specific criteria, search period, refund timeline and other cancellation scenarios must be defined in the signed agreement.

## Before sharing with a franchise prospect
Confirm the exact royalty boundaries at VND 300m and VND 500m; the scope / period of 4 km territory protection; the premises search period and refund mechanics; whether monthly costs include all relevant recurring expenses; and the detailed setup budget. The current site deliberately labels the figures as preliminary estimates and does not promise revenue or profitability.


## Updated commercial terms (November 2026)

- Franchise fee: VND 80,000,000, payable in two instalments of VND 40,000,000.
- Included territory protection: 4 km radius for the full term of the franchise agreement.
- Optional additional exclusivity: VND 10,000,000 per additional kilometre per year. The additional exclusivity fee is payable in advance at the beginning of each contract year. All territory protection and paid expanded exclusivity end automatically when the franchise agreement ends, unless the parties make a new written agreement. The boundary and measurement method must be agreed in writing.
- Monthly progressive royalty: 4% on the first VND 300,000,000; 5% on the portion from VND 300,000,000 to VND 500,000,000; 6% on the portion above VND 500,000,000. Example: VND 600,000,000 monthly revenue results in VND 28,000,000 royalty.
- Proposed royalty reporting basis shown on the proposal: recognized sales after discounts, excluding VAT, cancelled orders and refunds; platform commissions and payment fees are not deducted. Confirm this definition with accounting and include it in the signed franchise agreement.


## Admin security note

The admin session cookie is an HMAC-signed token and does not contain the admin password. Set a unique `ADMIN_SESSION_SECRET` in Vercel and keep it private. The Supabase service-role key and both admin secrets must never use a `NEXT_PUBLIC_` prefix.
