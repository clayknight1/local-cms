# local-cms

Admin interface for managing businesses, deals, events, and magazine pickup locations.

---

## Overview

This CMS is one of three applications in the North County Local platform:

```
├── local-app/          # React Native / Expo mobile app
├── local-cms/          # This repo — admin CMS
└── Supabase            # Shared Postgres backend
```

---

## Tech Stack

- [Vite](https://vitejs.dev) + React + TypeScript
- [Mantine](https://mantine.dev) UI component library
- [TanStack Query](https://tanstack.com/query) for server state
- [React Router](https://reactrouter.com) for routing
- [Supabase JS](https://supabase.com/docs/reference/javascript) for data and storage
- Auto-generated TypeScript types from Supabase schema

---

## Features

### Business Management

- Create and edit businesses with full details — address, hours, cuisine types, features, contact info
- Image upload to Supabase Storage for logos and cover images
- Featured listing scheduling via `featured_start` / `featured_end` date pickers
- Active/inactive toggle
- Business type categorization via managed lookup table

### Deal Management

- Create time-scoped deals with `starts_at` / `expires_at` scheduling
- Deals go live and expire automatically — no manual toggling
- Image upload per deal with fallback to business cover image
- Redemption code support
- Category and color assignment

### Event Management

- Create one-time and recurring events
- Recurring event generation via Postgres function
- Image upload per event
- Category, color, location, price, and registration URL support

### Magazine Pickup Locations

- Manage physical distribution points for the Osider print magazine
- Location type categorization (hotel, cafe, restaurant, shop, visitor center)
- Hours and description per location

---

## Project Structure

```
src/
  pages/
    businesses/        # Business list + edit pages
    deals/             # Deal list + edit pages
    events/            # Event list + edit pages
    magazine/          # Pickup location management
  components/
    RestaurantForm     # Business create/edit form
    EventForm          # Event create/edit form
    DealForm           # Deal create/edit form
    ImageUpload        # Reusable Supabase Storage upload component
    QueryState         # Shared loading/error state component
  services/            # Supabase data fetching
  hooks/
    useMutationWithNotifications  # Wrapper for mutations with Mantine notifications
  utils/
    hours.ts           # Parse and transform hours between form and DB format
  types/
    database.types.ts  # Auto-generated Supabase types
  constants/
    cuisines.ts        # Cuisine type definitions
    features.ts        # Business feature definitions
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project (shared with `local-app`)

### Installation

```bash
git clone https://github.com/clayknight/local-cms.git
cd local-cms
npm install
```

### Environment Variables

Create a `.env` file in the root:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Running

```bash
npm run dev
```

---

## Hours Format

Business hours are stored in Supabase as a JSON object with day keys and time range strings:

```json
{
  "monday": "09:00-21:00",
  "tuesday": "09:00-21:00",
  "wednesday": null,
  "thursday": "09:00-21:00",
  "friday": "09:00-23:00",
  "saturday": "10:00-23:00",
  "sunday": "10:00-20:00"
}
```

- `null` values indicate the business is closed that day
- Overnight hours are supported (close time earlier than open time, e.g. `"22:00-02:00"`)
- The CMS form transforms between this format and a `{ open, close }` object per day via `parseHours` / `transformHours` in `utils/hours.ts`

---

## Image Uploads

Images are uploaded to Supabase Storage via the `ImageUpload` component. The component handles:

- File selection and preview
- Upload to the appropriate storage bucket (`restaurants`, `deals`, `events`)
- Returns a public URL stored on the record

---

## Featured Listings

Businesses can be scheduled for featured placement in the mobile app by setting `featured_start` and `featured_end` dates. The mobile app filters and sorts featured businesses client-side based on whether the current date falls within the scheduled range. No manual toggling or cron jobs required.

---

## Roadmap

- Lat/lng auto-fill from address via Nominatim geocoding
- Cuisine type management (move from hardcoded constants to DB table)
- Multi-tenant support in the UI (currently hardcoded to `tenant_id: 1`)
- User auth for CMS access
- Analytics dashboard

---

## Related

- [local-app](https://github.com/clayknight/local-app) — The React Native mobile app

---

## License

Private — all rights reserved.
