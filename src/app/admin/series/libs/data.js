import prisma from "@/lib/prisma";

export async function getSeriesData() {
  try {
    const series = await prisma.series.findMany({
      include: {
        category: true,
        materials: {
          orderBy: {
            orderIndex: "asc",
          },
        },
      },
      orderBy: [{ categoryId: "asc" }, { orderIndex: "asc" }, { createdAt: "desc" }],
    });
    return series;
  } catch (error) {
    console.error("Error fetching series data:", error);
    return [];
  }
}

export async function getSeriesById(id) {
  try {
    const series = await prisma.series.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
        materials: {
          orderBy: {
            orderIndex: "asc",
          },
        },
      },
    });
    return series;
  } catch (error) {
    console.error("Error fetching series by ID:", error);
    return null;
  }
}

export async function getSeriesByCategory(categoryId) {
  try {
    const series = await prisma.series.findMany({
      where: { categoryId: parseInt(categoryId) },
      include: {
        materials: {
          orderBy: {
            orderIndex: "asc",
          },
        },
      },
      orderBy: {
        orderIndex: "asc",
      },
    });
    return series;
  } catch (error) {
    console.error("Error fetching series by category:", error);
    return [];
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
