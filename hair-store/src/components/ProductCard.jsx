import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Phone } from "lucide-react";
import { formatPrice, discountPercent } from "../utils/formatPrice";
import { getPrimaryImage } from "../services/productService";
import { whatsappLink, callLink } from "../utils/constants";

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);

  const primaryImage = getPrimaryImage(product.product_images);
  const imgUrl = primaryImage?.image_url;

  const discount = discountPercent(product.original_price, product.price);

  const waMsg = `Hi! I'm interested in *${product.name}* (GH₵ ${product.price}). Is it available?`;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--white)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        boxShadow: hovered ? "var(--shadow-lg)" : "var(--shadow-sm)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "box-shadow 0.3s, transform 0.3s",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image */}
      <Link
        to={`/products/${product.slug}`}
        style={{ display: "block", position: "relative" }}
      >
        <div
          style={{
            aspectRatio: "4/5",
            background: "var(--cream-dark)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: hovered ? "scale(1.04)" : "scale(1)",
                transition: "transform 0.5s ease",
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
                letterSpacing: "0.1em",
              }}
            >
              NO IMAGE
            </div>
          )}

          {/* Badges */}
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            {discount > 0 && (
              <span
                style={{
                  background: "var(--gold)",
                  color: "var(--espresso)",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: "var(--radius-full)",
                  letterSpacing: "0.04em",
                }}
              >
                −{discount}%
              </span>
            )}
            {product.is_featured && (
              <span
                style={{
                  background: "var(--espresso)",
                  color: "var(--gold)",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  padding: "3px 8px",
                  borderRadius: "var(--radius-full)",
                  letterSpacing: "0.04em",
                }}
              >
                Featured
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Info */}
      <div
        style={{
          padding: "16px 16px 12px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {product.categories && (
          <span
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--brown-light)",
              fontWeight: 500,
            }}
          >
            {product.categories.name}
          </span>
        )}

        <Link to={`/products/${product.slug}`}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
              fontWeight: 400,
              color: "var(--espresso)",
              lineHeight: 1.3,
              marginBottom: 4,
            }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Meta tags */}
        {(product.texture || product.length) && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[product.texture, product.length].filter(Boolean).map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.7rem",
                  padding: "2px 8px",
                  borderRadius: "var(--radius-full)",
                  border: "1px solid var(--cream-dark)",
                  color: "var(--brown-mid)",
                  background: "var(--cream)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: "auto",
            paddingTop: 8,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              color: "var(--espresso)",
              fontWeight: 600,
            }}
          >
            {formatPrice(product.price)}
          </span>
          {product.original_price && product.original_price > product.price && (
            <span
              style={{
                fontSize: "0.85rem",
                color: "var(--gray-400)",
                textDecoration: "line-through",
              }}
            >
              {formatPrice(product.original_price)}
            </span>
          )}
        </div>
      </div>

      {/* CTA Buttons */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderTop: "1px solid var(--cream-dark)",
        }}
      >
        <a
          href={whatsappLink(waMsg)}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "12px",
            background: hovered ? "#25D366" : "var(--white)",
            color: hovered ? "var(--white)" : "var(--espresso)",
            fontSize: "0.78rem",
            fontWeight: 500,
            letterSpacing: "0.04em",
            borderRight: "1px solid var(--cream-dark)",
            transition: "background 0.25s, color 0.25s",
            textDecoration: "none",
          }}
        >
          <MessageCircle size={14} /> WhatsApp
        </a>
        <a
          href={callLink()}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "12px",
            background: "var(--white)",
            color: "var(--espresso)",
            fontSize: "0.78rem",
            fontWeight: 500,
            letterSpacing: "0.04em",
            textDecoration: "none",
            transition: "background 0.25s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--cream-dark)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "var(--white)")
          }
        >
          <Phone size={14} /> Call
        </a>
      </div>
    </div>
  );
}
