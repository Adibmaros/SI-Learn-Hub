# Next.js Multirole Auth Boilerplate

Boilerplate Next.js dengan autentikasi multi-role (ADMIN, MODERATOR, USER) menggunakan NextAuth, Prisma, dan proteksi route berbasis role.

## Fitur Utama
- Login/registrasi dengan email/password & Google
- Role: ADMIN, MODERATOR, USER
- Proteksi route via middleware (hanya role tertentu yang bisa akses halaman tertentu)
- Admin page untuk mengelola user & role
- Feedback UI/UX untuk aksi penting (edit, hapus, dsb)

## Setup
1. Clone repo & install dependencies:
   ```bash
   npm install
   # atau
   yarn install
   ```
2. Copy .env.example ke .env dan isi variabel yang dibutuhkan (DATABASE_URL, NEXTAUTH_SECRET, dsb)
3. Jalankan migrasi & seed user admin:
   ```bash
   npx prisma migrate dev
   node prisma/seed.js # (buat file ini untuk seed user admin/moderator)
   ```
4. Jalankan development server:
   ```bash
   npm run dev
   ```

## Manajemen Role
- Hanya ADMIN yang bisa mengakses halaman `/admin/users` untuk mengubah role user lain.
- Proteksi route:
  - `/admin/*` hanya untuk ADMIN
  - `/moderator/*` hanya untuk MODERATOR & ADMIN
  - `/dashboard`, `/profile` hanya untuk user login

## Feedback UI/UX
- Setiap aksi penting (edit, hapus, dsb) akan menampilkan notifikasi sukses/gagal.
- Jika akses ditolak, user akan diarahkan ke halaman yang sesuai.

## Seed User
Buat file `prisma/seed.js` untuk membuat user ADMIN/MODERATOR awal. Contoh:
```js
// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
async function main() {
  await prisma.user.create({
    data: {
      email: 'admin@demo.com',
      password: await bcrypt.hash('admin123', 10),
      name: 'Admin',
      role: 'ADMIN',
    },
  });
}
main();
```

## Testing
- Pastikan proteksi role berjalan dengan login sebagai user dengan role berbeda.
- Cek admin page untuk edit/hapus user & role.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
