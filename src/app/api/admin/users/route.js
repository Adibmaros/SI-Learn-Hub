import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper: Cek role admin dari header (bisa diganti dengan validasi JWT/session di production)
async function isAdmin(req) {
  // Contoh: Ambil role dari header (di production, ambil dari session/JWT)
  const role = req.headers.get("x-user-role");
  return role === "ADMIN";
}

export async function GET(req) {
  if (!(await isAdmin(req))) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  return new Response(JSON.stringify(users), { status: 200 });
}

export async function PATCH(req) {
  if (!(await isAdmin(req))) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }
  const { id, name, role } = await req.json();
  if (!id) return new Response(JSON.stringify({ message: "ID wajib diisi" }), { status: 400 });
  const user = await prisma.user.update({
    where: { id },
    data: { name, role },
  });
  return new Response(JSON.stringify(user), { status: 200 });
}

export async function DELETE(req) {
  if (!(await isAdmin(req))) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }
  const { id } = await req.json();
  if (!id) return new Response(JSON.stringify({ message: "ID wajib diisi" }), { status: 400 });
  await prisma.user.delete({ where: { id } });
  return new Response(JSON.stringify({ message: "User dihapus" }), { status: 200 });
} 