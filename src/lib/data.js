import prisma from "./prisma";

// Fungsi untuk mengambil semua kategori dengan series
export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        series: {
          where: { isActive: true },
          include: {
            materials: {
              where: { isPublished: true },
              select: {
                id: true,
                title: true,
              },
            },
          },
          orderBy: {
            orderIndex: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Fungsi untuk mengambil kategori berdasarkan ID dengan series
export async function getCategoryById(id) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: {
        series: {
          where: { isActive: true },
          include: {
            materials: {
              where: { isPublished: true },
              orderBy: {
                orderIndex: "asc",
              },
            },
          },
          orderBy: {
            orderIndex: "asc",
          },
        },
      },
    });
    return category;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

// Fungsi untuk mengambil series berdasarkan ID
export async function getSeriesById(id) {
  try {
    const series = await prisma.series.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
        materials: {
          where: { isPublished: true },
          orderBy: {
            orderIndex: "asc",
          },
        },
      },
    });
    return series;
  } catch (error) {
    console.error("Error fetching series:", error);
    return null;
  }
}

// Fungsi untuk mengambil material berdasarkan ID
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
    console.error("Error fetching material:", error);
    return null;
  }
}

// Fungsi untuk mengambil semua series aktif
export async function getSeries() {
  try {
    const series = await prisma.series.findMany({
      where: { isActive: true },
      include: {
        category: true,
        materials: {
          where: { isPublished: true },
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: [{ categoryId: "asc" }, { orderIndex: "asc" }],
    });
    return series;
  } catch (error) {
    console.error("Error fetching series:", error);
    return [];
  }
}

// Fungsi untuk mengambil materi berdasarkan ID
// export async function getMaterialById(id) {
//   try {
//     const material = await prisma.material.findUnique({
//       where: { id: parseInt(id) },
//       include: {
//         category: true,
//       },
//     });
//     return material;
//   } catch (error) {
//     console.error("Error fetching material:", error);
//     return null;
//   }
// }

// Fungsi untuk mengambil materi berdasarkan kategori
export async function getMaterialsByCategory(categoryId) {
  try {
    const materials = await prisma.material.findMany({
      where: { categoryId: parseInt(categoryId) },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return materials;
  } catch (error) {
    console.error("Error fetching materials by category:", error);
    return [];
  }
}

export async function getMaterials() {
  try {
    const materials = await prisma.material.findMany({
      include: {
        series: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return materials;
  } catch (error) {
    console.error("Error fetching materials:", error);
    return [];
  }
}
