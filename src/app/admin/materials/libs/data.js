import prisma from "@/lib/prisma";

export async function getMaterialData() {
  try {
    const materials = await prisma.material.findMany({
      include: {
        series: {
          include: {
            category: true,
          },
        },
      },
      orderBy: [{ seriesId: "asc" }, { orderIndex: "asc" }, { createdAt: "desc" }],
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
        series: {
          include: {
            category: true,
          },
        },
      },
    });
    return material;
  } catch (error) {
    console.error("Error fetching material by ID:", error);
    return null;
  }
}

export async function getMaterialsBySeries(seriesId) {
  try {
    const materials = await prisma.material.findMany({
      where: { seriesId: parseInt(seriesId) },
      orderBy: {
        orderIndex: "asc",
      },
    });
    return materials;
  } catch (error) {
    console.error("Error fetching materials by series:", error);
    return [];
  }
}

export async function getSeries() {
  try {
    const series = await prisma.series.findMany({
      where: { isActive: true },
      include: {
        category: true,
      },
      orderBy: [{ categoryId: "asc" }, { orderIndex: "asc" }, { name: "asc" }],
    });
    return series;
  } catch (error) {
    console.error("Error fetching series:", error);
    return [];
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        series: {
          where: { isActive: true },
          orderBy: { orderIndex: "asc" },
        },
      },
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
