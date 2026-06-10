import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MessageCircle,
  Phone,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Tag,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import { getProductBySlug } from "../services/productService";
import { formatPrice, discountPercent } from "../utils/formatPrice";
import { whatsappLink, callLink } from "../utils/constants";

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    getProductBySlug(slug)
      .then((data) => {
        setProduct(data);
        // sort images: primary first
        if (data?.product_images) {
          data.product_images.sort(
            (a, b) => (b.is_primary ? 1 : 0) - (a.is_primary ? 1 : 0),
          );
        }
      })
      .catch(() => navigate("/products", { replace: true }))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading)
    return (
      <>
        <Navbar />
        <LoadingSpinner fullPage />
      </>
    );
  if (!product) return null;

  const images = product.product_images || [];
  const hasImgs = images.length > 0;
  const curImg = hasImgs ? images[imgIdx]?.image_url : null;
  const discount = discountPercent(product.original_price, product.price);

  const waMsg = `Hi! I'm interested in *${product.name}* (${formatPrice(product.price)}). Is it available?`;

  const prev = () => setImgIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setImgIdx((i) => (i + 1) % images.length);

  const DETAILS = [
    { label: "Category", value: product.categories?.name },
    { label: "Texture", value: product.texture },
    { label: "Length", value: product.length },
    { label: "Color", value: product.color },
    { label: "Weight", value: product.weight },
  ].filter((d) => d.value);

  return (
    <>
      <Navbar />
      <main style={{ padding: "48px 0 80px" }}>
        <div className="container">
          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: "none",
              color: "var(--brown-mid)",
              fontSize: "0.875rem",
              cursor: "pointer",
              marginBottom: 40,
              letterSpacing: "0.04em",
            }}
          >
            <ArrowLeft size={15} /> Back
          </button>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 56,
              alignItems: "start",
            }}
          >
            {/* ── Image Gallery ── */}
            <div>
              {/* Main image */}
              <div
                style={{
                  position: "relative",
                  aspectRatio: "3/4",
                  background: "var(--cream-dark)",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  marginBottom: 12,
                }}
              >
                {curImg ? (
                  <img
                    src={curImg}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "opacity 0.3s",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--brown-light)",
                      fontSize: "0.8rem",
                      letterSpacing: "0.12em",
                    }}
                  >
                    NO IMAGE
                  </div>
                )}

                {images.length > 1 && (
                  <>
                    {[
                      {
                        dir: "prev",
                        icon: ChevronLeft,
                        fn: prev,
                        side: "12px",
                      },
                      {
                        dir: "next",
                        icon: ChevronRight,
                        fn: next,
                        side: undefined,
                      },
                    ].map(({ dir, icon: Icon, fn, side }) => (
                      <button
                        key={dir}
                        onClick={fn}
                        style={{
                          position: "absolute",
                          top: "50%",
                          [dir === "prev" ? "left" : "right"]: 12,
                          transform: "translateY(-50%)",
                          background: "rgba(250,247,242,0.9)",
                          border: "none",
                          borderRadius: "50%",
                          width: 36,
                          height: 36,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          boxShadow: "var(--shadow-sm)",
                        }}
                      >
                        <Icon size={18} color="var(--espresso)" />
                      </button>
                    ))}
                  </>
                )}

                {discount > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      background: "var(--gold)",
                      color: "var(--espresso)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: "var(--radius-full)",
                    }}
                  >
                    −{discount}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {images.map((img, i) => (
                    <button
                      key={img.id}
                      onClick={() => setImgIdx(i)}
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: "var(--radius-sm)",
                        overflow: "hidden",
                        border: `2px solid ${i === imgIdx ? "var(--gold)" : "transparent"}`,
                        padding: 0,
                        background: "var(--cream-dark)",
                        cursor: "pointer",
                        transition: "border-color 0.2s",
                      }}
                    >
                      <img
                        src={img.image_url}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Product Info ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {product.categories && (
                <Link
                  to={`/products?category=${product.categories.id}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: "var(--brown-light)",
                    fontSize: "0.8rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  <Tag size={13} /> {product.categories.name}
                </Link>
              )}

              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                  fontWeight: 300,
                  lineHeight: 1.15,
                }}
              >
                {product.name}
              </h1>

              {/* Price */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2rem",
                    fontWeight: 600,
                    color: "var(--espresso)",
                  }}
                >
                  {formatPrice(product.price)}
                </span>
                {product.original_price > product.price && (
                  <span
                    style={{
                      fontSize: "1.1rem",
                      color: "var(--gray-400)",
                      textDecoration: "line-through",
                    }}
                  >
                    {formatPrice(product.original_price)}
                  </span>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p
                  style={{
                    color: "var(--brown-mid)",
                    lineHeight: 1.8,
                    fontSize: "0.9375rem",
                  }}
                >
                  {product.description}
                </p>
              )}

              {/* Details grid */}
              {DETAILS.length > 0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(140px, 1fr))",
                    gap: 12,
                    padding: "20px",
                    background: "var(--cream-dark)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  {DETAILS.map(({ label, value }) => (
                    <div key={label}>
                      <p
                        style={{
                          fontSize: "0.7rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--brown-light)",
                          marginBottom: 4,
                        }}
                      >
                        {label}
                      </p>
                      <p
                        style={{
                          fontWeight: 500,
                          color: "var(--espresso)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Stock */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background:
                      product.stock_quantity > 0 ? "var(--success)" : "#e74c3c",
                  }}
                />
                <span
                  style={{ fontSize: "0.85rem", color: "var(--brown-mid)" }}
                >
                  {product.stock_quantity > 0
                    ? `${product.stock_quantity} in stock`
                    : "Out of stock"}
                </span>
              </div>

              {/* Order CTA */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginTop: 8,
                }}
              >
                <a
                  href={whatsappLink(waMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                  style={{
                    justifyContent: "center",
                    fontSize: "0.9rem",
                    padding: "16px",
                  }}
                >
                  <MessageCircle size={18} /> Order via WhatsApp
                </a>
                <a
                  href={callLink()}
                  className="btn-outline"
                  style={{
                    justifyContent: "center",
                    fontSize: "0.9rem",
                    padding: "15px",
                  }}
                >
                  <Phone size={18} /> Call to Order
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
