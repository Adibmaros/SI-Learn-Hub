"use server";
import prisma from "@/lib/prisma";
import { uploadPDF, deletePDF } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function addMaterialAction(prevState, formData) {
  try {
    const title = formData.get("title")?.trim();
    const description = formData.get("description")?.trim();
    const youtube_url = formData.get("youtube_url")?.trim();
    const pdf_file = formData.get("pdf_file");
    const categoryId = formData.get("categoryId");

    // Basic validation
    if (!title || !categoryId) {
      return {
        success: false,
        message: "Judul dan kategori wajib diisi.",
      };
    }

    // Validate at least one content type (YouTube or PDF)
    if (!youtube_url && (!pdf_file || pdf_file.size === 0)) {
      return {
        success: false,
        message: "Setidaknya satu dari YouTube URL atau PDF file harus diisi.",
      };
    }

    // Validate YouTube URL format if provided
    if (youtube_url && !isValidYouTubeUrl(youtube_url)) {
      return {
        success: false,
        message: "Format URL YouTube tidak valid.",
      };
    }

    // Handle PDF upload
    let pdfUrl = null;
    if (pdf_file && pdf_file.size > 0) {
      // Validate PDF file type
      if (!pdf_file.type.includes("pdf")) {
        return {
          success: false,
          message: "File harus berformat PDF.",
        };
      }

      // Check file size (max 10MB)
      if (pdf_file.size > 10 * 1024 * 1024) {
        return {
          success: false,
          message: "Ukuran file PDF maksimal 10MB.",
        };
      }

      try {
        pdfUrl = await uploadPDF(pdf_file, "materials");
      } catch (pdfError) {
        return {
          success: false,
          message: `Error mengunggah PDF: ${pdfError.message}`,
        };
      }
    }

    // Create material in database
    const materialBaru = await prisma.material.create({
      data: {
        title,
        description: description || null,
        youtube_url: youtube_url || null,
        pdf_url: pdfUrl,
        categoryId: parseInt(categoryId),
      },
    });

    // Revalidate the material pages
    revalidatePath("/admin/materials");
    revalidatePath("/materials");

    return {
      success: true,
      message: "Materi berhasil ditambahkan.",
      redirectUrl: "/admin/materials",
    };
  } catch (error) {
    console.error("Error adding material:", error);
    return {
      success: false,
      message: "Terjadi kesalahan saat menambahkan materi.",
    };
  }
}

export async function editMaterialAction(prevState, formData, materialId) {
  try {
    const title = formData.get("title")?.trim();
    const description = formData.get("description")?.trim();
    const youtube_url = formData.get("youtube_url")?.trim();
    const pdf_file = formData.get("pdf_file");
    const categoryId = formData.get("categoryId");

    // Basic validation
    if (!title || !categoryId) {
      return {
        success: false,
        message: "Judul dan kategori wajib diisi.",
      };
    }

    // Check if material exists
    const existingMaterial = await prisma.material.findUnique({
      where: { id: parseInt(materialId) },
    });

    if (!existingMaterial) {
      return {
        success: false,
        message: "Materi tidak ditemukan.",
      };
    }

    // Validate at least one content type (YouTube or PDF)
    const hasPdfFile = pdf_file && pdf_file.size > 0;
    const hasExistingPdf = existingMaterial.pdf_url;

    if (!youtube_url && !hasPdfFile && !hasExistingPdf) {
      return {
        success: false,
        message: "Setidaknya satu dari YouTube URL atau PDF file harus diisi.",
      };
    }

    // Validate YouTube URL format if provided
    if (youtube_url && !isValidYouTubeUrl(youtube_url)) {
      return {
        success: false,
        message: "Format URL YouTube tidak valid.",
      };
    }

    // Handle PDF upload
    let pdfUrl = existingMaterial.pdf_url; // Keep existing PDF by default
    if (pdf_file && pdf_file.size > 0) {
      // Validate PDF file type
      if (!pdf_file.type.includes("pdf")) {
        return {
          success: false,
          message: "File harus berformat PDF.",
        };
      }

      // Check file size (max 10MB)
      if (pdf_file.size > 10 * 1024 * 1024) {
        return {
          success: false,
          message: "Ukuran file PDF maksimal 10MB.",
        };
      }

      try {
        // Delete old PDF if exists
        if (existingMaterial.pdf_url) {
          await deletePDF(existingMaterial.pdf_url, "materials");
        }

        // Upload new PDF
        pdfUrl = await uploadPDF(pdf_file, "materials");
      } catch (pdfError) {
        return {
          success: false,
          message: `Error mengunggah PDF: ${pdfError.message}`,
        };
      }
    }

    // Update material in database
    const updatedMaterial = await prisma.material.update({
      where: { id: parseInt(materialId) },
      data: {
        title,
        description: description || null,
        youtube_url: youtube_url || null,
        pdf_url: pdfUrl,
        categoryId: parseInt(categoryId),
      },
    });

    // Revalidate the material pages
    revalidatePath("/admin/materials");
    revalidatePath("/materials");

    return {
      success: true,
      message: "Materi berhasil diperbarui.",
      redirectUrl: "/admin/materials",
    };
  } catch (error) {
    console.error("Error editing material:", error);
    return {
      success: false,
      message: "Terjadi kesalahan saat memperbarui materi.",
    };
  }
}

export async function deleteMaterialAction(prevState, formData, materialId) {
  try {
    // Check if material exists
    const existingMaterial = await prisma.material.findUnique({
      where: { id: parseInt(materialId) },
    });

    if (!existingMaterial) {
      return {
        success: false,
        message: "Materi tidak ditemukan.",
      };
    }

    // Delete PDF file from storage if exists
    if (existingMaterial.pdf_url) {
      try {
        await deletePDF(existingMaterial.pdf_url, "materials");
      } catch (error) {
        console.error("Error deleting PDF file:", error);
        // Continue with database deletion even if file deletion fails
      }
    }

    // Delete material from database
    await prisma.material.delete({
      where: { id: parseInt(materialId) },
    });

    // Revalidate the material pages
    revalidatePath("/admin/materials");
    revalidatePath("/materials");

    return {
      success: true,
      message: "Materi berhasil dihapus.",
      redirectUrl: "/admin/materials",
    };
  } catch (error) {
    console.error("Error deleting material:", error);
    return {
      success: false,
      message: "Terjadi kesalahan saat menghapus materi.",
    };
  }
}

// Helper function to validate YouTube URL
function isValidYouTubeUrl(url) {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)[\w\-]+/;
  return youtubeRegex.test(url);
}
