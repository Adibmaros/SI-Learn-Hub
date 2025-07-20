import prisma from "@/lib/prisma";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return categories;
  } catch (error) {
    console.log("Error fetching categories:", error);
    return [];
  }
}

export async function getCategoryById(id) {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });
    return category;
  } catch (error) {
    console.log("Error fetching category by ID:", error);
    return null;
  }
}
