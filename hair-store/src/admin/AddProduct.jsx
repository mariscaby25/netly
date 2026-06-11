import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import ProductForm from "./ProductForm";
import {
  createProduct,
  uploadProductImage,
  addProductImage,
} from "../services/productService";

export default function AddProduct() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data, pendingFiles) => {
    setLoading(true);
    try {
      // 1. Create product record
      const product = await createProduct(data);

      // 2. Upload any pending images
      if (pendingFiles.length > 0) {
        for (let i = 0; i < pendingFiles.length; i++) {
          const file = pendingFiles[i];
          const { publicUrl, storagePath } = await uploadProductImage(
            file,
            product.id,
          );
          await addProductImage({
            product_id: product.id,
            image_url: publicUrl,
            storage_path: storagePath,
            is_primary: i === 0,
            sort_order: i,
          });
        }
      }

      toast.success("Product created successfully!");
      navigate(`/admin/products/edit/${product.id}`);
    } catch (err) {
      toast.error("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ padding: "48px 0 80px", minHeight: "80vh" }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <Link
            to="/admin/products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "var(--brown-mid)",
              fontSize: "0.875rem",
              marginBottom: 32,
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={15} /> Back to Products
          </Link>

          <div style={{ marginBottom: 36 }}>
            <p className="section-subtitle" style={{ marginBottom: 8 }}>
              Admin
            </p>
            <h1 className="section-title">Add New Product</h1>
          </div>

          <ProductForm
            onSubmit={handleSubmit}
            loading={loading}
            submitLabel="Create Product"
          />
        </div>
      </main>
    </>
  );
}
