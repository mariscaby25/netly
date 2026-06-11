import React, { useRef, useState } from "react";
import { Upload, X, Star, Trash2 } from "lucide-react";
import {
  uploadProductImage,
  deleteProductImage,
  setPrimaryImage,
  addProductImage,
} from "../services/productService";
import toast from "react-hot-toast";

/**
 * UploadImage
 * Props:
 *   productId   – string (required when saving to DB)
 *   images      – array of { id, image_url, storage_path, is_primary } from DB
 *   onImagesChange – callback(updatedImages)
 *   pendingMode – boolean: if true, collect files locally before product exists
 *   onPendingFiles – callback(files[]) when in pendingMode
 */
export default function UploadImage({
  productId,
  images = [],
  onImagesChange,
  pendingMode = false,
  onPendingFiles,
}) {
  const inputRef = useState(null);
  const fileRef = useRef();
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState([]); // pendingMode previews

  const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  const handleFiles = async (files) => {
    const valid = Array.from(files).filter((f) => ACCEPTED.includes(f.type));
    if (!valid.length) {
      toast.error("Please upload JPG, PNG, or WebP images.");
      return;
    }

    if (pendingMode) {
      const newPreviews = valid.map((f) => ({
        url: URL.createObjectURL(f),
        file: f,
      }));
      const all = [...previews, ...newPreviews];
      setPreviews(all);
      onPendingFiles?.(all.map((p) => p.file));
      return;
    }

    if (!productId) {
      toast.error("Save the product first before uploading images.");
      return;
    }

    setUploading(true);
    try {
      const uploaded = [];
      for (const file of valid) {
        const { publicUrl, storagePath } = await uploadProductImage(
          file,
          productId,
        );
        const isPrimary = images.length === 0 && uploaded.length === 0;
        const record = await addProductImage({
          product_id: productId,
          image_url: publicUrl,
          storage_path: storagePath,
          is_primary: isPrimary,
          sort_order: images.length + uploaded.length,
        });
        uploaded.push(record);
      }
      onImagesChange?.([...images, ...uploaded]);
      toast.success(
        `${uploaded.length} image${uploaded.length > 1 ? "s" : ""} uploaded`,
      );
    } catch (err) {
      toast.error("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (img) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await deleteProductImage(img.id, img.storage_path);
      onImagesChange?.(images.filter((i) => i.id !== img.id));
      toast.success("Image deleted");
    } catch (err) {
      toast.error("Delete failed: " + err.message);
    }
  };

  const handleSetPrimary = async (img) => {
    try {
      await setPrimaryImage(productId, img.id);
      onImagesChange?.(
        images.map((i) => ({ ...i, is_primary: i.id === img.id })),
      );
    } catch (err) {
      toast.error("Failed to set primary: " + err.message);
    }
  };

  const removePending = (idx) => {
    const updated = previews.filter((_, i) => i !== idx);
    setPreviews(updated);
    onPendingFiles?.(updated.map((p) => p.file));
  };

  const displayImages = pendingMode
    ? previews.map((p) => ({ image_url: p.url, _pending: true }))
    : images;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileRef.current?.click()}
        style={{
          border: `2px dashed ${dragging ? "var(--gold)" : "var(--gray-200)"}`,
          borderRadius: "var(--radius-md)",
          padding: "36px 24px",
          textAlign: "center",
          cursor: "pointer",
          background: dragging ? "rgba(201,168,76,0.05)" : "var(--cream)",
          transition: "all 0.2s",
        }}
      >
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          style={{ display: "none" }}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <Upload
          size={28}
          color="var(--brown-light)"
          style={{ margin: "0 auto 10px" }}
        />
        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--espresso)",
            fontWeight: 500,
            marginBottom: 4,
          }}
        >
          {uploading ? "Uploading…" : "Click or drag images here"}
        </p>
        <p style={{ fontSize: "0.78rem", color: "var(--brown-light)" }}>
          JPG, PNG, WebP — multiple allowed
        </p>
      </div>

      {/* Image previews */}
      {displayImages.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
            gap: 10,
          }}
        >
          {displayImages.map((img, idx) => (
            <div
              key={img.id || idx}
              style={{
                position: "relative",
                aspectRatio: "1",
                borderRadius: "var(--radius-sm)",
                overflow: "hidden",
                border: img.is_primary
                  ? "2px solid var(--gold)"
                  : "2px solid var(--cream-dark)",
                background: "var(--cream-dark)",
              }}
            >
              <img
                src={img.image_url}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />

              {/* Overlay actions */}
              {!img._pending && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(28,18,8,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    opacity: 0,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                >
                  {!img.is_primary && (
                    <button
                      onClick={() => handleSetPrimary(img)}
                      title="Set as primary"
                      style={{
                        background: "var(--gold)",
                        border: "none",
                        borderRadius: "50%",
                        width: 28,
                        height: 28,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Star size={13} color="var(--espresso)" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(img)}
                    title="Delete image"
                    style={{
                      background: "#e74c3c",
                      border: "none",
                      borderRadius: "50%",
                      width: 28,
                      height: 28,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Trash2 size={13} color="white" />
                  </button>
                </div>
              )}

              {/* Pending remove */}
              {img._pending && (
                <button
                  onClick={() => removePending(idx)}
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    background: "#e74c3c",
                    border: "none",
                    borderRadius: "50%",
                    width: 22,
                    height: 22,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <X size={11} color="white" />
                </button>
              )}

              {img.is_primary && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 4,
                    left: 4,
                    background: "var(--gold)",
                    borderRadius: "var(--radius-full)",
                    padding: "1px 6px",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    color: "var(--espresso)",
                    letterSpacing: "0.06em",
                  }}
                >
                  PRIMARY
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
