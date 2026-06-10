import { supabase } from "./supabase";

// ── Products ──────────────────────────────────────────────────

export async function getProducts({
  categoryId,
  search,
  featured,
  adminView = false,
} = {}) {
  let query = supabase
    .from("products")
    .select(
      `
      *,
      categories(id, name, slug),
      product_images(id, image_url, is_primary, sort_order)
    `,
    )
    .order("created_at", { ascending: false });

  if (!adminView) query = query.eq("is_available", true);
  if (categoryId) query = query.eq("category_id", categoryId);
  if (featured) query = query.eq("is_featured", true);
  if (search) query = query.ilike("name", `%${search}%`);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getProductBySlug(slug) {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      categories(id, name, slug),
      product_images(id, image_url, storage_path, is_primary, sort_order)
    `,
    )
    .eq("slug", slug)
    .single();
  if (error) throw error;
  return data;
}

export async function getProductById(id) {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      categories(id, name, slug),
      product_images(id, image_url, storage_path, is_primary, sort_order)
    `,
    )
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function createProduct(productData) {
  const { data, error } = await supabase
    .from("products")
    .insert([productData])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProduct(id, productData) {
  const { data, error } = await supabase
    .from("products")
    .update(productData)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProduct(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

// ── Categories ────────────────────────────────────────────────

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");
  if (error) throw error;
  return data;
}

export async function createCategory(categoryData) {
  const { data, error } = await supabase
    .from("categories")
    .insert([categoryData])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteCategory(id) {
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw error;
}

// ── Product Images ────────────────────────────────────────────

export async function addProductImage(imageData) {
  const { data, error } = await supabase
    .from("product_images")
    .insert([imageData])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProductImage(imageId, storagePath) {
  if (storagePath) {
    await supabase.storage.from("product-images").remove([storagePath]);
  }
  const { error } = await supabase
    .from("product_images")
    .delete()
    .eq("id", imageId);
  if (error) throw error;
}

export async function setPrimaryImage(productId, imageId) {
  await supabase
    .from("product_images")
    .update({ is_primary: false })
    .eq("product_id", productId);

  const { data, error } = await supabase
    .from("product_images")
    .update({ is_primary: true })
    .eq("id", imageId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ── Storage ───────────────────────────────────────────────────

export async function uploadProductImage(file, productId) {
  const ext = file.name.split(".").pop();
  const path = `${productId}/${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("product-images").getPublicUrl(path);
  return { publicUrl: data.publicUrl, storagePath: path };
}

export function getImageUrl(storagePath) {
  if (!storagePath) return null;
  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(storagePath);
  return data.publicUrl;
}

// ── Helpers ───────────────────────────────────────────────────

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function getPrimaryImage(images = []) {
  if (!images || images.length === 0) return null;
  return images.find((img) => img.is_primary) || images[0];
}
