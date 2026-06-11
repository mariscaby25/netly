import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PlusCircle,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Search,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  getProducts,
  deleteProduct,
  updateProduct,
  getPrimaryImage,
} from "../services/productService";
import { formatPrice } from "../utils/formatPrice";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(null);

  const load = () => {
    setLoading(true);
    getProducts({ adminView: true })
      .then(setProducts)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async (p) => {
    if (!window.confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    setDeleting(p.id);
    try {
      await deleteProduct(p.id);
      setProducts((prev) => prev.filter((x) => x.id !== p.id));
      toast.success("Product deleted");
    } catch (err) {
      toast.error("Delete failed: " + err.message);
    } finally {
      setDeleting(null);
    }
  };

  const toggleAvailable = async (p) => {
    try {
      const updated = await updateProduct(p.id, {
        is_available: !p.is_available,
      });
      setProducts((prev) =>
        prev.map((x) =>
          x.id === p.id ? { ...x, is_available: updated.is_available } : x,
        ),
      );
      toast.success(
        updated.is_available ? "Product set to available" : "Product hidden",
      );
    } catch (err) {
      toast.error("Update failed: " + err.message);
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ padding: "48px 0 80px", minHeight: "80vh" }}>
        <div className="container">
          <Link
            to="/admin"
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
            <ArrowLeft size={15} /> Dashboard
          </Link>

          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 32,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <p className="section-subtitle" style={{ marginBottom: 8 }}>
                Admin
              </p>
              <h1 className="section-title">Products</h1>
              {!loading && (
                <p
                  style={{
                    color: "var(--brown-light)",
                    fontSize: "0.85rem",
                    marginTop: 4,
                  }}
                >
                  {filtered.length} of {products.length} products
                </p>
              )}
            </div>
            <Link
              to="/admin/products/add"
              className="btn-primary"
              style={{ fontSize: "0.85rem" }}
            >
              <PlusCircle size={15} /> Add Product
            </Link>
          </div>

          {/* Search */}
          <div
            style={{ position: "relative", maxWidth: 360, marginBottom: 28 }}
          >
            <Search
              size={15}
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--brown-light)",
                pointerEvents: "none",
              }}
            />
            <input
              className="form-input"
              style={{ paddingLeft: 36 }}
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Table */}
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  background: "var(--white)",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "var(--cream-dark)",
                      borderBottom: "1px solid var(--gray-200)",
                    }}
                  >
                    {[
                      "Product",
                      "Category",
                      "Price",
                      "Stock",
                      "Status",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontSize: "0.72rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--brown-mid)",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        style={{
                          textAlign: "center",
                          padding: "48px",
                          color: "var(--brown-light)",
                          fontFamily: "var(--font-display)",
                          fontSize: "1.1rem",
                        }}
                      >
                        No products found
                      </td>
                    </tr>
                  ) : (
                    filtered.map((p, idx) => {
                      const img = getPrimaryImage(p.product_images);
                      return (
                        <tr
                          key={p.id}
                          style={{
                            borderBottom:
                              idx < filtered.length - 1
                                ? "1px solid var(--cream-dark)"
                                : "none",
                            transition: "background 0.15s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "var(--cream)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "var(--white)")
                          }
                        >
                          {/* Product */}
                          <td style={{ padding: "14px 16px" }}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                              }}
                            >
                              <div
                                style={{
                                  width: 48,
                                  height: 48,
                                  borderRadius: "var(--radius-sm)",
                                  background: "var(--cream-dark)",
                                  overflow: "hidden",
                                  flexShrink: 0,
                                }}
                              >
                                {img && (
                                  <img
                                    src={img.image_url}
                                    alt=""
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </div>
                              <div>
                                <p
                                  style={{
                                    fontWeight: 500,
                                    color: "var(--espresso)",
                                    fontSize: "0.9rem",
                                    marginBottom: 2,
                                  }}
                                >
                                  {p.name}
                                </p>
                                <p
                                  style={{
                                    fontSize: "0.75rem",
                                    color: "var(--brown-light)",
                                  }}
                                >
                                  {p.texture} {p.length}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td
                            style={{
                              padding: "14px 16px",
                              fontSize: "0.85rem",
                              color: "var(--brown-mid)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {p.categories?.name || "—"}
                          </td>

                          {/* Price */}
                          <td
                            style={{
                              padding: "14px 16px",
                              fontSize: "0.9rem",
                              fontWeight: 500,
                              color: "var(--espresso)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {formatPrice(p.price)}
                          </td>

                          {/* Stock */}
                          <td style={{ padding: "14px 16px" }}>
                            <span
                              style={{
                                fontSize: "0.8rem",
                                fontWeight: 600,
                                color:
                                  p.stock_quantity > 0
                                    ? "var(--success)"
                                    : "var(--error)",
                              }}
                            >
                              {p.stock_quantity}
                            </span>
                          </td>

                          {/* Status */}
                          <td style={{ padding: "14px 16px" }}>
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 5,
                                padding: "3px 10px",
                                borderRadius: "var(--radius-full)",
                                fontSize: "0.72rem",
                                fontWeight: 600,
                                letterSpacing: "0.05em",
                                background: p.is_available
                                  ? "rgba(39,174,96,0.12)"
                                  : "rgba(160,160,160,0.15)",
                                color: p.is_available
                                  ? "var(--success)"
                                  : "var(--gray-600)",
                              }}
                            >
                              <span
                                style={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  background: p.is_available
                                    ? "var(--success)"
                                    : "var(--gray-400)",
                                  display: "inline-block",
                                }}
                              />
                              {p.is_available ? "Active" : "Hidden"}
                            </span>
                          </td>

                          {/* Actions */}
                          <td style={{ padding: "14px 16px" }}>
                            <div style={{ display: "flex", gap: 6 }}>
                              <button
                                onClick={() => toggleAvailable(p)}
                                title={
                                  p.is_available
                                    ? "Hide product"
                                    : "Make available"
                                }
                                style={iconBtn}
                              >
                                {p.is_available ? (
                                  <EyeOff size={14} />
                                ) : (
                                  <Eye size={14} />
                                )}
                              </button>
                              <Link
                                to={`/admin/products/edit/${p.id}`}
                                style={{
                                  ...iconBtn,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  textDecoration: "none",
                                  color: "var(--espresso)",
                                }}
                              >
                                <Pencil size={14} />
                              </Link>
                              <button
                                onClick={() => handleDelete(p)}
                                disabled={deleting === p.id}
                                title="Delete product"
                                style={{
                                  ...iconBtn,
                                  color: "var(--error)",
                                  borderColor: "rgba(192,57,43,0.2)",
                                  background: "rgba(192,57,43,0.06)",
                                }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

const iconBtn = {
  width: 32,
  height: 32,
  borderRadius: "var(--radius-sm)",
  border: "1.5px solid var(--cream-dark)",
  background: "var(--cream)",
  color: "var(--espresso)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.15s",
  padding: 0,
};
