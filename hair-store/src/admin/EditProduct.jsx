import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductForm from "./ProductForm";
import { getProductById, updateProduct } from "../services/productService";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getProductById(id)
      .then((data) => {
        setProduct(data);
        setImages(data.product_images || []);
      })
      .catch(() => {
        toast.error("Product not found");
        navigate("/admin/products");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data) => {
    setSaving(true);
    try {
      await updateProduct(id, data);
      toast.success("Product updated!");
    } catch (err) {
      toast.error("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <>
        <Navbar />
        <LoadingSpinner fullPage />
      </>
    );

  const initialData = product
    ? {
        name: product.name,
        description: product.description || "",
        price: product.price,
        original_price: product.original_price || "",
        category_id: product.category_id || "",
        stock_quantity: product.stock_quantity,
        is_available: product.is_available,
        is_featured: product.is_featured,
        texture: product.texture || "",
        length: product.length || "",
        color: product.color || "",
        weight: product.weight || "",
      }
    : {};

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
            <h1 className="section-title">Edit Product</h1>
            <p
              style={{
                color: "var(--brown-light)",
                fontSize: "0.875rem",
                marginTop: 6,
              }}
            >
              {product?.name}
            </p>
          </div>

          <ProductForm
            initialData={initialData}
            onSubmit={handleSubmit}
            loading={saving}
            submitLabel="Save Changes"
            productId={id}
            existingImages={images}
            onImagesChange={setImages}
          />
        </div>
      </main>
    </>
  );
}
