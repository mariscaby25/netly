import React from "react";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";

export default function ProductGrid({
  products,
  loading,
  emptyMessage = "No products found.",
}) {
  if (loading) return <LoadingSpinner />;

  if (!products || products.length === 0)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px 24px",
          color: "var(--brown-light)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            marginBottom: 8,
          }}
        >
          {emptyMessage}
        </p>
        <p style={{ fontSize: "0.875rem" }}>
          Check back soon or try a different search.
        </p>
      </div>
    );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 24,
      }}
    >
      {products.map((product, i) => (
        <div
          key={product.id}
          style={{
            animation: `fadeInUp 0.4s ease both`,
            animationDelay: `${i * 0.06}s`,
          }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
