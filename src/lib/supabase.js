import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const uploadImage = async (file, path = "divisi") => {
  const fileType = file.type.split("/")[1];
  const fileName = `${path}-${Date.now()}.${fileType}`;

  const { error } = await supabase.storage.from("series").upload(`public/${path}/${fileName}`, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) {
    console.error("Upload error:", error);
    throw error;
  }
  console.log("Uploaded file:", fileName);
  return fileName;
};

export const uploadPDF = async (file, path = "materials") => {
  const fileType = file.type.split("/")[1];
  const fileName = `${path}-${Date.now()}.${fileType}`;

  const { error } = await supabase.storage.from("pdfs").upload(`public/${path}/${fileName}`, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) {
    console.error("PDF Upload error:", error);
    throw error;
  }
  console.log("Uploaded PDF file:", fileName);
  return fileName;
};

export const getImageUrl = (name, path = "divisi") => {
  const { data } = supabase.storage.from("series").getPublicUrl(`public/${path}/${name}`);
  return data.publicUrl;
};

export const getPDFUrl = (name, path = "materials") => {
  const { data } = supabase.storage.from("pdfs").getPublicUrl(`public/${path}/${name}`);
  return data.publicUrl;
};

export const deleteFile = async (fileName, path = "brands") => {
  const { error } = await supabase.storage.from("series").remove([`public/${path}/${fileName}`]);
  if (error) {
    console.error("Delete error:", error);
    throw error;
  }
};

export const deletePDF = async (fileName, path = "materials") => {
  const { error } = await supabase.storage.from("pdfs").remove([`public/${path}/${fileName}`]);
  if (error) {
    console.error("PDF Delete error:", error);
    throw error;
  }
};
