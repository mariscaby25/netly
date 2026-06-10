import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Scissors } from "lucide-react";
import { STORE_NAME } from "../utils/constants";
import { useAuthContext } from "../context/AuthContext";
import { signOut } from "../services/authService";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const navLinkStyle = ({ isActive }) => ({
    fontWeight: isActive ? "500" : "400",
    color: isActive ? "var(--gold-dark)" : "var(--espresso)",
    fontSize: "0.875rem",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    transition: "color 0.2s",
    paddingBottom: "2px",
    borderBottom: isActive
      ? "1.5px solid var(--gold)"
      : "1.5px solid transparent",
  });

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "var(--navbar-height)",
          background: scrolled ? "rgba(250, 247, 242, 0.96)" : "var(--cream)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: `1px solid ${scrolled ? "var(--cream-dark)" : "transparent"}`,
          display: "flex",
          alignItems: "center",
          zIndex: 1000,
          transition: "background 0.3s, border-color 0.3s",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                background: "var(--espresso)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Scissors size={16} color="var(--gold)" />
            </div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.4rem",
                fontWeight: 400,
                color: "var(--espresso)",
                letterSpacing: "-0.02em",
              }}
            >
              {STORE_NAME}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div
            style={{ display: "flex", gap: 32, alignItems: "center" }}
            className="desktop-nav"
          >
            <NavLink to="/" end style={navLinkStyle}>
              Home
            </NavLink>
            <NavLink to="/products" style={navLinkStyle}>
              Products
            </NavLink>
            <NavLink to="/contact" style={navLinkStyle}>
              Contact
            </NavLink>
            {user && (
              <>
                <NavLink to="/admin" style={navLinkStyle}>
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "0.875rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--brown-light)",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: "var(--espresso)",
            }}
            className="hamburger"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: "var(--navbar-height)",
            left: 0,
            right: 0,
            background: "var(--cream)",
            borderBottom: "1px solid var(--cream-dark)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            zIndex: 999,
            animation: "fadeInUp 0.2s ease",
          }}
        >
          {[
            ["/", "Home"],
            ["/products", "Products"],
            ["/contact", "Contact"],
          ].map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              style={navLinkStyle}
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          {user && (
            <>
              <NavLink
                to="/admin"
                style={navLinkStyle}
                onClick={() => setOpen(false)}
              >
                Dashboard
              </NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                style={{
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  fontSize: "0.875rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--brown-light)",
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}

      {/* Spacer */}
      <div style={{ height: "var(--navbar-height)" }} />

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
        }
      `}</style>
    </>
  );
}
