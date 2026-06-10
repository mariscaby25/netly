import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getProductById,
  updateProduct,
  getCategories,
} from "../services/productService";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(null);

  useEffect(() => {
    getProductById(id).then(setForm);
    getCategories().then(setCategories);
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateProduct(id, form);
    navigate("/admin/products");
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div className="container" style={{ padding: "60px 0" }}>
      <h2 className="section-title">Edit Product</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <input name="name" value={form.name} onChange={handleChange} />
        <textarea
          name="description"
          value={form.description || ""}
          onChange={handleChange}
        />

        <input name="price" value={form.price} onChange={handleChange} />

        <select
          name="category_id"
          value={form.category_id || ""}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <label>
          <input
            type="checkbox"
            name="is_featured"
            checked={form.is_featured}
            onChange={handleChange}
          />
          Featured
        </label>

        <label>
          <input
            type="checkbox"
            name="is_available"
            checked={form.is_available}
            onChange={handleChange}
          />
          Available
        </label>

        <button className="btn-gold">Update Product</button>
      </form>
    </div>
  );
}
