# 🔖 Smart Bookmark App

A modern, real-time bookmark manager built with **Next.js (App Router)** and **Supabase**, allowing users to securely save, view, and manage their bookmarks using **Google OAuth**.

---

## 🚀 Live Demo

👉 **Live URL:** https://your-vercel-url.vercel.app  
👉 **GitHub Repo:** https://github.com/your-username/smart-bookmark-app

> You can log in using your own Google account to test the app.

---

## 🧩 Features

- 🔐 Google Authentication (OAuth only)
- 👤 Private bookmarks per user (RLS enabled)
- ➕ Add bookmarks (URL + title)
- ❌ Delete bookmarks
- ⚡ Real-time sync across tabs
- 🎨 Modern UI (Purple, Blue, Grey, White, Red theme)
- 📱 Fully responsive
- 🚀 Deployed on Vercel

---

## 🛠️ Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Auth, Database, Realtime)
- Vercel

---

## 🗂️ Folder Structure

smart-bookmark-app/
├── app/
├── components/
├── lib/
├── .env.local
└── README.md

---

## ⚙️ Environment Variables

Create a `.env.local` file:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url  
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_public_key

Found in:
Supabase Dashboard → Project Settings → API

---

## 🗄️ Database Schema

```sql
create table bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  url text not null,
  created_at timestamptz default now()
);
```

---

## 🔐 Row Level Security (RLS)

```sql
alter table bookmarks enable row level security;
```

### Policies

```sql
create policy "Users can view own bookmarks"
on bookmarks for select
using (auth.uid() = user_id);

create policy "Users can insert own bookmarks"
on bookmarks for insert
with check (auth.uid() = user_id);

create policy "Users can delete own bookmarks"
on bookmarks for delete
using (auth.uid() = user_id);
```

---

## ⚡ Realtime

Enabled via:
Supabase Dashboard → Database → Realtime → Enable for bookmarks table

---

## 🧠 Problems Faced & Solutions

### Google OAuth Error
**Issue:** Unsupported provider  
**Fix:** Enabled Google provider and correct redirect URL

---

### Bookmarks Not Visible
**Issue:** Empty results due to RLS  
**Fix:** Filter queries using user_id

---

### UI Not Updating
**Issue:** Needed refresh after add/delete  
**Fix:** Implemented optimistic UI + realtime

---

### Runtime Error (undefined id)
**Issue:** Component rendered before auth  
**Fix:** Added guards and dependency checks

---

## 🎨 UI Design

- Purple–Blue gradient for branding
- White glass cards
- Grey text for readability
- Red for destructive actions

---

## 🧪 Run Locally

```bash
npm install
npm run dev
```

---

## 📦 Deployment

Deployed on Vercel with environment variables configured.

---

## 📌 Future Enhancements

- Search & filters
- Tags
- Toast notifications
- Dark/Light mode
- Drag & drop reordering

---

## 👨‍💻 Author

**Abhishek Kumar**
