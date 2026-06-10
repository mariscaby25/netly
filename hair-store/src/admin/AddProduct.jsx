import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createProduct,
  getCategories,
  slugify,
  uploadProductImage,
  addProductImage,
} from "../services/productService";

export default function AddProduct() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [imageFile, setImageFile] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    original_price: "",
    category_id: "",
    texture: "",
    length: "",
    is_featured: false,
    is_available: true,
  });

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create product first
      const product = await createProduct({
        ...form,
        slug: slugify(form.name),
      });

      // 2. Upload image if exists
      if (imageFile) {
        const { publicUrl, storagePath } = await uploadProductImage(
          imageFile,
          product.id,
        );

        // 3. Save image reference in DB
        await addProductImage({
          product_id: product.id,
          image_url: publicUrl,
          storage_path: storagePath,
          is_primary: true,
        });
      }

      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Failed to create product");
    }

    setLoading(false);
  };

  return (
    <div className="container" style={{ padding: "60px 0" }}>
      <h2 className="section-title">Add Product</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Price"
          onChange={handleChange}
          required
        />

        <input
          name="original_price"
          placeholder="Original Price"
          onChange={handleChange}
        />

        <select name="category_id" onChange={handleChange}>
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input name="texture" placeholder="Texture" onChange={handleChange} />
        <input name="length" placeholder="Length" onChange={handleChange} />

        {/* ✅ IMAGE UPLOAD FIELD */}
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <label>
          <input type="checkbox" name="is_featured" onChange={handleChange} />
          Featured
        </label>

        <button disabled={loading} className="btn-gold">
          {loading ? "Saving..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
