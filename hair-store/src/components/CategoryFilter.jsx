import React from "react";

export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <button
        onClick={() => onSelect(null)}
        style={{
          padding: "8px 18px",
          borderRadius: "var(--radius-full)",
          border: "1.5px solid",
          borderColor: !selected ? "var(--espresso)" : "var(--gray-200)",
          background: !selected ? "var(--espresso)" : "transparent",
          color: !selected ? "var(--cream)" : "var(--espresso)",
          fontSize: "0.8rem",
          fontWeight: 500,
          letterSpacing: "0.05em",
          cursor: "pointer",
          transition: "all 0.2s",
          whiteSpace: "nowrap",
        }}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          style={{
            padding: "8px 18px",
            borderRadius: "var(--radius-full)",
            border: "1.5px solid",
            borderColor:
              selected === cat.id ? "var(--espresso)" : "var(--gray-200)",
            background: selected === cat.id ? "var(--espresso)" : "transparent",
            color: selected === cat.id ? "var(--cream)" : "var(--espresso)",
            fontSize: "0.8rem",
            fontWeight: 500,
            letterSpacing: "0.05em",
            cursor: "pointer",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
