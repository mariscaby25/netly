# GlowHair Store

A full-stack hair products e-commerce storefront built with **React + Vite** and **Supabase**.

## Features

### Customer

- Browse all available hair products
- Search and filter by category
- View full product details with image gallery
- Order via WhatsApp or phone call

### Admin

- Secure login (Supabase Auth)
- Add / edit / delete products
- Upload and manage product images (with drag-and-drop)
- Toggle product availability
- Mark products as featured (shown on homepage)
- Manage product categories

---

## Tech Stack

| Layer    | Technology                             |
| -------- | -------------------------------------- |
| Frontend | React 18, React Router v6              |
| Styling  | Custom CSS (no framework)              |
| Backend  | Supabase (PostgreSQL + Auth + Storage) |
| Build    | Vite                                   |
| Toasts   | react-hot-toast                        |
| Icons    | lucide-react                           |

---

## Setup

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd hair-store
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. In the SQL editor, run the entire contents of `supabase/schema.sql`.
3. This creates all tables, RLS policies, indexes, and the storage bucket.

### 3. Configure environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

VITE_STORE_PHONE=+233XXXXXXXXX
VITE_STORE_WHATSAPP=+233XXXXXXXXX
VITE_STORE_EMAIL=info@yourhairstore.com
VITE_STORE_NAME=GlowHair Store
VITE_STORE_ADDRESS=Your Address, Accra, Ghana
```

### 4. Create an admin user

In your Supabase dashboard go to **Authentication → Users → Invite user** and add your admin email. You can then log in at `/admin/login`.

### 5. Run locally

```bash
npm run dev
```

### 6. Build for production

```bash
npm run build
```

---

## Project Structure

```
src/
├── admin/          # Admin-only pages (Add, Edit, List products + UploadImage)
├── components/     # Shared UI components
├── context/        # AuthContext
├── hooks/          # useProducts, useAuth
├── pages/          # Public pages (Home, Products, ProductDetails, Contact, AdminLogin, AdminDashboard)
├── routes/         # AppRoutes with protected route wrapper
├── services/       # Supabase client, productService, authService
└── utils/          # formatPrice, constants
```

---

## Database Schema

See `supabase/schema.sql` for full schema including:

- `categories` — product categories
- `products` — main product table with attributes
- `product_images` — multiple images per product (with primary flag)
- `admin_profiles` — extends auth.users
- `contact_inquiries` — optional inquiry log
- Row Level Security policies for all tables
- Storage bucket `product-images` with public read / auth write policies
