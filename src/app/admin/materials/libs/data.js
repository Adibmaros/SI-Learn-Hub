import prisma from "@/lib/prisma";

export async function getMaterialData() {
  try {
    const materials = await prisma.material.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return materials;
  } catch (error) {
    console.error("Error fetching material data:", error);
    return [];
  }
}

export async function getMaterialById(id) {
  try {
    const material = await prisma.material.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
      },
    });
    return material;
  } catch (error) {
    console.error("Error fetching material by ID:", error);
    return null;
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
