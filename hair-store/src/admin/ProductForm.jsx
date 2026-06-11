import React, { useEffect, useState } from "react";
import { getCategories, slugify } from "../services/productService";
import { TEXTURES, LENGTHS, COLORS } from "../utils/constants";
import UploadImage from "./UploadImage";

/**
 * ProductForm – shared form for Add & Edit
 * Props:
 *   initialData   – pre-filled values for edit mode
 *   onSubmit(formData, pendingFiles) – called on valid submit
 *   loading       – bool
 *   submitLabel   – string
 *   productId     – string | null (null = new product, images upload after create)
 *   existingImages – array
 *   onImagesChange – callback
 */
export default function ProductForm({
  initialData = {},
  onSubmit,
  loading = false,
  submitLabel = "Save Product",
  productId = null,
  existingImages = [],
  onImagesChange,
}) {
  const [categories, setCategories] = useState([]);
  const [pendingFiles, setPendingFiles] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    original_price: "",
    category_id: "",
    stock_quantity: "1",
    is_available: true,
    is_featured: false,
    texture: "",
    length: "",
    color: "",
    weight: "",
    ...initialData,
  });

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      slug: slugify(form.name),
      price: parseFloat(form.price),
      original_price: form.original_price
        ? parseFloat(form.original_price)
        : null,
      stock_quantity: parseInt(form.stock_quantity) || 0,
      category_id: form.category_id || null,
    };
    onSubmit(data, pendingFiles);
  };

  const inputStyle = {
    background: "var(--white)",
    border: "1.5px solid var(--gray-200)",
    borderRadius: "var(--radius-sm)",
    padding: "10px 14px",
    fontSize: "0.9375rem",
    color: "var(--espresso)",
    width: "100%",
    fontFamily: "var(--font-body)",
  };

  const selectStyle = { ...inputStyle, cursor: "pointer" };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 28 }}
    >
      {/* ── Basic Info ── */}
      <section style={sectionStyle}>
        <h3 style={sectionHeading}>Basic Information</h3>
        <div style={gridTwo}>
          <div className="form-group" style={{ gridColumn: "1 / -1" }}>
            <label className="form-label">Product Name *</label>
            <input
              style={inputStyle}
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Brazilian Body Wave Bundle"
              required
            />
            {form.name && (
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--brown-light)",
                  marginTop: 4,
                }}
              >
                Slug: {slugify(form.name)}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Price (GH₵) *</label>
            <input
              style={inputStyle}
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              placeholder="0.00"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Original Price (GH₵)</label>
            <input
              style={inputStyle}
              type="number"
              min="0"
              step="0.01"
              value={form.original_price}
              onChange={(e) => set("original_price", e.target.value)}
              placeholder="Leave blank if no discount"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              style={selectStyle}
              value={form.category_id}
              onChange={(e) => set("category_id", e.target.value)}
            >
              <option value="">— Select category —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Stock Quantity</label>
            <input
              style={inputStyle}
              type="number"
              min="0"
              value={form.stock_quantity}
              onChange={(e) => set("stock_quantity", e.target.value)}
            />
          </div>

          <div className="form-group" style={{ gridColumn: "1 / -1" }}>
            <label className="form-label">Description</label>
            <textarea
              style={{ ...inputStyle, minHeight: 100, resize: "vertical" }}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Describe the product…"
            />
          </div>
        </div>
      </section>

      {/* ── Attributes ── */}
      <section style={sectionStyle}>
        <h3 style={sectionHeading}>Hair Attributes</h3>
        <div style={gridTwo}>
          <div className="form-group">
            <label className="form-label">Texture</label>
            <select
              style={selectStyle}
              value={form.texture}
              onChange={(e) => set("texture", e.target.value)}
            >
              <option value="">— Select —</option>
              {TEXTURES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Length</label>
            <select
              style={selectStyle}
              value={form.length}
              onChange={(e) => set("length", e.target.value)}
            >
              <option value="">— Select —</option>
              {LENGTHS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Color</label>
            <select
              style={selectStyle}
              value={form.color}
              onChange={(e) => set("color", e.target.value)}
            >
              <option value="">— Select —</option>
              {COLORS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Weight</label>
            <input
              style={inputStyle}
              type="text"
              value={form.weight}
              onChange={(e) => set("weight", e.target.value)}
              placeholder="e.g. 100g"
            />
          </div>
        </div>
      </section>

      {/* ── Visibility ── */}
      <section style={sectionStyle}>
        <h3 style={sectionHeading}>Visibility</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            {
              key: "is_available",
              label: "Available for sale",
              desc: "Customers can see and order this product",
            },
            {
              key: "is_featured",
              label: "Featured product",
              desc: "Show on the homepage featured section",
            },
          ].map(({ key, label, desc }) => (
            <label
              key={key}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={form[key]}
                onChange={(e) => set(key, e.target.checked)}
                style={{
                  marginTop: 2,
                  accentColor: "var(--espresso)",
                  width: 16,
                  height: 16,
                }}
              />
              <div>
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    color: "var(--espresso)",
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--brown-light)",
                    marginTop: 2,
                  }}
                >
                  {desc}
                </p>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* ── Images ── */}
      <section style={sectionStyle}>
        <h3 style={sectionHeading}>Product Images</h3>
        <UploadImage
          productId={productId}
          images={existingImages}
          onImagesChange={onImagesChange}
          pendingMode={!productId}
          onPendingFiles={setPendingFiles}
        />
      </section>

      {/* ── Submit ── */}
      <button
        type="submit"
        className="btn-primary"
        disabled={loading}
        style={{
          alignSelf: "flex-start",
          padding: "14px 40px",
          fontSize: "0.9rem",
          opacity: loading ? 0.7 : 1,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}

const sectionStyle = {
  background: "var(--white)",
  border: "1.5px solid var(--cream-dark)",
  borderRadius: "var(--radius-md)",
  padding: "28px 24px",
  display: "flex",
  flexDirection: "column",
  gap: 20,
};

const sectionHeading = {
  fontFamily: "var(--font-display)",
  fontSize: "1.15rem",
  fontWeight: 400,
  color: "var(--espresso)",
  paddingBottom: 12,
  borderBottom: "1px solid var(--cream-dark)",
};

const gridTwo = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: 16,
};
