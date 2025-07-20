import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
  const { email, password, name } = await req.json();
  if (!email || !password) {
    return new Response(JSON.stringify({ message: "Email dan password wajib diisi" }), { status: 400 });
  }
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return new Response(JSON.stringify({ message: "Email sudah terdaftar" }), { status: 400 });
  }
  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { email, password: hashed, name },
  });
  return new Response(JSON.stringify({ message: "Registrasi berhasil" }), { status: 201 });
}