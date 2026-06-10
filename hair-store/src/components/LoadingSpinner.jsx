import React from "react";

export default function LoadingSpinner({ fullPage = false, size = 36 }) {
  const spinner = (
    <div
      style={{
        width: size,
        height: size,
        border: `3px solid var(--cream-dark)`,
        borderTopColor: "var(--gold)",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }}
    />
  );

  if (fullPage)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--cream)",
        }}
      >
        {spinner}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );

  return (
    <div
      style={{ display: "flex", justifyContent: "center", padding: "48px 0" }}
    >
      {spinner}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
