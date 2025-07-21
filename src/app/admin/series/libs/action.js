"use server";
import prisma from "@/lib/prisma";
import { uploadImage, deleteFile } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// Function to generate URL-friendly slug
function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim("-"); // Remove leading/trailing hyphens
}

export async function addSeriesAction(prevState, formData) {
  try {
    const name = formData.get("name")?.trim();
    const description = formData.get("description")?.trim();
    const categoryId = formData.get("categoryId");
    const level = formData.get("level");
    const thumbnail = formData.get("thumbnail");
    const orderIndex = formData.get("orderIndex");

    // Basic validation
    if (!name || !categoryId) {
      return {
        success: false,
        message: "Nama series dan kategori wajib diisi.",
      };
    }

    // Generate slug from name
    const slug = generateSlug(name);

    // Check if slug already exists in the same category
    const existingSeries = await prisma.series.findFirst({
      where: {
        categoryId: parseInt(categoryId),
        slug: slug,
      },
    });

    if (existingSeries) {
      return {
        success: false,
        message: "Series dengan nama yang sama sudah ada dalam kategori ini.",
      };
    }

    // Handle thumbnail upload
    let thumbnailUrl = null;
    if (thumbnail && thumbnail.size > 0) {
      try {
        thumbnailUrl = await uploadImage(thumbnail, "series");
      } catch (thumbnailError) {
        return {
          success: false,
          message: `Error mengunggah gambar: ${thumbnailError.message}`,
        };
      }
    }

    // Create series in database
    const seriesBaru = await prisma.series.create({
      data: {
        name,
        description: description || null,
        slug,
        thumbnail: thumbnailUrl,
        level: level || "BEGINNER",
        categoryId: parseInt(categoryId),
        orderIndex: orderIndex ? parseInt(orderIndex) : 0,
      },
    });

    // Revalidate the series pages
    revalidatePath("/admin/series");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Series berhasil ditambahkan.",
      redirectUrl: "/admin/series",
    };
  } catch (error) {
    console.error("Error adding series:", error);
    return {
      success: false,
      message: "Terjadi kesalahan saat menambahkan series.",
    };
  }
}

export async function editSeriesAction(prevState, formData, seriesId) {
  try {
    const name = formData.get("name")?.trim();
    const description = formData.get("description")?.trim();
    const categoryId = formData.get("categoryId");
    const level = formData.get("level");
    const thumbnail = formData.get("thumbnail");
    const orderIndex = formData.get("orderIndex");

    // Basic validation
    if (!name || !categoryId) {
      return {
        success: false,
        message: "Nama series dan kategori wajib diisi.",
      };
    }

    // Check if series exists
    const existingSeries = await prisma.series.findUnique({
      where: { id: parseInt(seriesId) },
    });

    if (!existingSeries) {
      return {
        success: false,
        message: "Series tidak ditemukan.",
      };
    }

    // Generate slug from name
    const slug = generateSlug(name);

    // Check if slug already exists in the same category (excluding current series)
    const duplicateSeries = await prisma.series.findFirst({
      where: {
        categoryId: parseInt(categoryId),
        slug: slug,
        id: { not: parseInt(seriesId) },
      },
    });

    if (duplicateSeries) {
      return {
        success: false,
        message: "Series dengan nama yang sama sudah ada dalam kategori ini.",
      };
    }

    // Handle thumbnail upload
    let thumbnailUrl = existingSeries.thumbnail;
    if (thumbnail && thumbnail.size > 0) {
      try {
        // Delete old thumbnail if exists
        if (existingSeries.thumbnail) {
          await deleteFile(existingSeries.thumbnail, "series");
        }
        thumbnailUrl = await uploadImage(thumbnail, "series");
      } catch (thumbnailError) {
        return {
          success: false,
          message: `Error mengunggah gambar: ${thumbnailError.message}`,
        };
      }
    }

    // Update series in database
    const updatedSeries = await prisma.series.update({
      where: { id: parseInt(seriesId) },
      data: {
        name,
        description: description || null,
        slug,
        thumbnail: thumbnailUrl,
        level: level || "BEGINNER",
        categoryId: parseInt(categoryId),
        orderIndex: orderIndex ? parseInt(orderIndex) : 0,
      },
    });

    // Revalidate the series pages
    revalidatePath("/admin/series");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Series berhasil diperbarui.",
      redirectUrl: "/admin/series",
    };
  } catch (error) {
    console.error("Error editing series:", error);
    return {
      success: false,
      message: "Terjadi kesalahan saat memperbarui series.",
    };
  }
}

export async function deleteSeriesAction(prevState, formData, seriesId) {
  try {
    // Check if series exists
    const existingSeries = await prisma.series.findUnique({
      where: { id: parseInt(seriesId) },
      include: {
        materials: true,
      },
    });

    if (!existingSeries) {
      return {
        success: false,
        message: "Series tidak ditemukan.",
      };
    }

    // Check if series has materials
    if (existingSeries.materials.length > 0) {
      return {
        success: false,
        message: "Tidak dapat menghapus series yang masih memiliki materi. Hapus semua materi terlebih dahulu.",
      };
    }

    // Delete thumbnail if exists
    if (existingSeries.thumbnail) {
      try {
        await deleteFile(existingSeries.thumbnail, "series");
      } catch (error) {
        console.error("Error deleting thumbnail:", error);
        // Continue with deletion even if thumbnail deletion fails
      }
    }

    // Delete series from database
    await prisma.series.delete({
      where: { id: parseInt(seriesId) },
    });

    // Revalidate the series pages
    revalidatePath("/admin/series");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Series berhasil dihapus.",
      redirectUrl: "/admin/series",
    };
  } catch (error) {
    console.error("Error deleting series:", error);
    return {
      success: false,
      message: "Terjadi kesalahan saat menghapus series.",
    };
  }
}
