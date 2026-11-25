# d4e.ai Cloudflare Worker — First-Party Telemetry & Pilot Logo Capture

Zero-dependency ES Module Cloudflare Worker backed by **Cloudflare D1** (SQLite) and **Cloudflare R2** (logo storage) on `d4e.ai/api/*`.

## Endpoints

| Method | Path | Purpose |
| :--- | :--- | :--- |
| `POST` | `/api/track` | Stores raw activity events (`events`) and merges session dwell, active/idle seconds, scroll depth, drop-off section, video watch progress, and modal abandon state (`sessions`). |
| `POST` | `/api/pilot-register` | Captures DIAD Pilot Registration details, decodes and validates uploaded brand logos (PNG/JPG/SVG/WEBP, <=5 MB), stores binary logo in R2, saves lead in D1, marks session converted, and optionally notifies `FORMSPREE_ENDPOINT`. |
| `GET` | `/api/admin` | Dark-theme Admin Dashboard HTML (prompts for `ADMIN_TOKEN`, stored in `sessionStorage`). |
| `GET` | `/api/admin/data` | Bearer-protected JSON feed: summary KPIs, registrations + logo preview keys, drop-offs, modal abandon counts, recent sessions. |
| `GET` | `/api/admin/session/:sessionId` | Bearer-protected full chronological event timeline for a single session. |
| `GET` | `/api/admin/logo/:key` | Bearer-protected logo proxy from R2 (`X-Content-Type-Options: nosniff`, `Content-Security-Policy: sandbox`). |

## Required Cloudflare Resources & Bindings

1. **D1 Database** (`DB` binding)
   - Create a D1 database (e.g., `d4e-analytics-db`) and execute [`schema.sql`](./schema.sql).
2. **R2 Bucket** (`LOGOS_BUCKET` binding)
   - Create an R2 bucket (e.g., `d4e-pilot-logos`) with private access (no public bucket needed; `/api/admin/logo/*` streams authenticated downloads).
3. **Worker Secrets / Environment Variables**
   - `ADMIN_TOKEN` *(required secret)* — strong random token to unlock `https://d4e.ai/api/admin`.
   - `FORMSPREE_ENDPOINT` *(optional var/secret)* — e.g. `https://formspree.io/f/mvgzepkj` for instant email notifications on every pilot registration.
4. **Worker Routes (Zone: `d4e.ai`)**
   - `d4e.ai/api/*`
   - `diad.d4e.ai/api/*` (if routed to the same Worker)
