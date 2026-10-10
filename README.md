# SI-Learn Hub 🎓

**SI-Learn Hub** adalah platform e-learning / hub pembelajaran Sistem Informasi berbasis web yang dirancang untuk mengelola dan membagikan materi pembelajaran terstruktur mulai dari kategori, seri kursus (series), hingga materi (video YouTube & dokumen PDF).

---

## 🚀 Fitur Utama

- **Autentikasi & Manajemen Peran (Multi-role Auth)**:
  - Register & Login (Email & Password) dengan **NextAuth.js**.
  - Role-based Access Control (**ADMIN** & **USER**).
  - Middleware Protection (Halaman `/admin/*` hanya dapat diakses oleh Admin).
- **Manajemen Kategori (Categories)**:
  - Pengelompokan seri pembelajaran berdasarkan topik/kategori.
- **Manajemen Seri Pembelajaran (Series)**:
  - Pembuatan seri belajar lengkap dengan thumbnail cover (integrasi **Supabase Storage**), slug, serta tingkat kesulitan (*Beginner*, *Intermediate*, *Advanced*).
- **Manajemen Materi Pembelajaran (Materials)**:
  - Dukungan materi berbentuk Video YouTube (URL/embed) dan Dokumen PDF (Upload ke **Supabase Storage**).
  - Pengaturan durasi video dan status publikasi (*Published / Draft*).
- **Dashboard Admin & Pengelolaan User**:
  - Panel kontrol Admin untuk mengelola pengguna, peran, kategori, seri, dan materi.
- **Antarmuka Modern & Responsif**:
  - Di-build dengan **Tailwind CSS**, **Shadcn UI** (Radix UI), dan **Lucide Icons**.

---

## 🛠️ Tumpukan Teknologi (Tech Stack)

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Bahasa**: JavaScript / React 19
- **Database & ORM**: PostgreSQL & [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **File & Image Storage**: [Supabase Storage](https://supabase.com/storage)
- **Styling**: Tailwind CSS & Shadcn UI / Radix UI
- **Form Validation**: Zod

---

## 📁 Struktur Direktori Utama

```text
SI-Learn-Hub/
├── prisma/
│   └── schema.prisma         # Skema database (User, Category, Series, Material)
├── src/
│   ├── app/                  # Router Next.js (App Router)
│   │   ├── (auth)/           # Halaman login & register
│   │   ├── admin/            # Halaman Dashboard Admin (Users, Categories, Series, Materials)
│   │   ├── api/              # API Routes & NextAuth handler
│   │   ├── dashboard/        # Dashboard pengguna
│   │   └── page.js           # Halaman Utama / Landing Page
│   ├── components/           # Komponen UI Reusable (Shadcn UI & Custom)
│   ├── hooks/                # Custom React Hooks
│   ├── lib/                  # Helper & Konfigurasi (Prisma Client, Supabase Client, NextAuth)
│   └── middleware.js         # Middleware proteksi rute berdasarkan role
└── public/                   # Asset statis
```

---

## ⚡ Panduan Instalasi & Pengaturan

### 1. Prasyarat
- **Node.js** v18+ dan **npm** / **yarn** / **pnpm**
- Database **PostgreSQL** (misal: Supabase Database)
- Akun **Supabase** (untuk API Key & Storage Bucket)

### 2. Clone Repository & Install Dependencies
```bash
git clone https://github.com/Adibmaros/SI-Learn-Hub.git
cd SI-Learn-Hub
npm install
```

### 3. Konfigurasi Environment Variables
Buat file `.env` di direktori utama proyek dan lengkapi variabel berikut:

```env
# Database (PostgreSQL / Supabase)
DATABASE_URL="postgresql://user:password@host:port/dbname?pgbouncer=true"
DIRECT_URL="postgresql://user:password@host:port/dbname"

# NextAuth Configuration
NEXTAUTH_SECRET="buat-secret-key-acak-di-sini"
NEXTAUTH_URL="http://localhost:3000"

# Supabase Configuration (Storage untuk Thumbnail & PDF)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

### 4. Migrasi Database & Seed Data
Jalankan migrasi Prisma untuk membuat tabel database:

```bash
npx prisma migrate dev
```

*(Opsional)* Jalankan Prisma Studio untuk melihat & mengedit isi database melalui antarmuka web:
```bash
npx prisma studio
```

### 5. Jalankan Development Server
```bash
npm run dev
```

Buka browser dan akses [http://localhost:3000](http://localhost:3000).

---

## 🔐 Hak Akses & Peran (Role Management)

- **USER**:
  - Mengakses halaman utama, melihat kategori, seri pembelajaran, dan mempelajari materi.
  - Mengakses dashboard profil user.
- **ADMIN**:
  - Mengakses seluruh rute admin `/admin/*`.
  - Mengelola peran user (`ADMIN` / `USER`).
  - Menambah, mengubah, dan menghapus Kategori, Seri Pembelajaran (dengan Upload Thumbnail), serta Materi (dengan Upload PDF & link YouTube).

---

## 📜 Lisensi

Proyek ini dibuat untuk keperluan pembelajaran dan pengembangan platform e-learning Sistem Informasi.

