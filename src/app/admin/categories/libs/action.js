"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCategory(_, formData) {
  const name = formData.get("name");
  const description = formData.get("description");

  try {
    const category = await prisma.category.create({
      data: {
        name,
        description,
      },
    });
    revalidatePath("/admin/categories");
    revalidatePath("/");
    return {
      success: true,
      message: "Category created successfully",
      redirectUrl: "/admin/categories",
    };
  } catch (error) {
    console.log("Error creating category:", error);
    return {
      success: false,
      message: "Failed to create category",
    };
  }
}

export async function updateCategory(_, formData, id) {
  const name = formData.get("name");
  const description = formData.get("description");

  try {
    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
        description,
      },
    });
    revalidatePath(`/admin/categories/${id}`);
    revalidatePath("/admin/categories");
    return {
      success: true,
      message: "Category updated successfully",
      redirectUrl: `/admin/categories`,
    };
  } catch (error) {
    console.log("Error updating category:", error);
    return {
      success: false,
      message: "Failed to update category",
    };
  }
}

export async function deleteCategory(_, formData, id) {
  try {
    await prisma.category.delete({
      where: { id },
    });
    revalidatePath("/admin/categories");
    revalidatePath("/");
    return {
      success: true,
      message: "Category deleted successfully",
      redirectUrl: "/admin/categories",
    };
  } catch (error) {
    console.log("Error deleting category:", error);
    return {
      success: false,
      message: "Failed to delete category",
    };
  }
}
