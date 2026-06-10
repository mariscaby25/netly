import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { signIn } from "../services/authService";
import { useAuthContext } from "../context/AuthContext";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { user, loading } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [email, password]);

  if (!loading && user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      await signIn(email, password);

      navigate("/admin");
    } catch (err) {
      setError(err.message || "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 20px",
          background: "var(--cream)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 460,
            background: "var(--white)",
            borderRadius: "var(--radius-lg)",
            padding: 40,
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                margin: "0 auto 20px",
                background: "var(--espresso)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Lock size={28} color="var(--gold)" />
            </div>

            <p className="section-subtitle" style={{ marginBottom: 8 }}>
              Administration
            </p>

            <h1 className="section-title">Admin Login</h1>

            <p
              style={{
                marginTop: 12,
                color: "var(--brown-light)",
                fontSize: "0.9rem",
              }}
            >
              Sign in to manage products, categories and images.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: 8,
                  fontSize: "0.85rem",
                  color: "var(--brown-mid)",
                }}
              >
                Email Address
              </label>

              <div style={{ position: "relative" }}>
                <Mail
                  size={16}
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--brown-light)",
                  }}
                />

                <input
                  type="email"
                  required
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  style={{
                    width: "100%",
                    paddingLeft: 42,
                  }}
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: 8,
                  fontSize: "0.85rem",
                  color: "var(--brown-mid)",
                }}
              >
                Password
              </label>

              <div style={{ position: "relative" }}>
                <Lock
                  size={16}
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--brown-light)",
                  }}
                />

                <input
                  required
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  style={{
                    width: "100%",
                    paddingLeft: 42,
                    paddingRight: 42,
                  }}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    color: "var(--brown-light)",
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div
                style={{
                  padding: 12,
                  borderRadius: "var(--radius-md)",
                  background: "#FEF2F2",
                  color: "#B91C1C",
                  fontSize: "0.875rem",
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-gold"
              style={{
                justifyContent: "center",
                width: "100%",
                opacity: submitting ? 0.8 : 1,
              }}
            >
              {submitting ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
