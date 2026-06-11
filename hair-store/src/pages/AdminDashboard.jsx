import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Tag,
  PlusCircle,
  List,
  LogOut,
  TrendingUp,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import { getProducts, getCategories } from "../services/productService";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    featured: 0,
    categories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProducts({ adminView: true }), getCategories()])
      .then(([prods, cats]) => {
        setStats({
          total: prods.length,
          available: prods.filter((p) => p.is_available).length,
          featured: prods.filter((p) => p.is_featured).length,
          categories: cats.length,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const STAT_CARDS = [
    {
      label: "Total Products",
      value: stats.total,
      icon: Package,
      color: "var(--espresso)",
    },
    {
      label: "Available",
      value: stats.available,
      icon: TrendingUp,
      color: "#27ae60",
    },
    {
      label: "Featured",
      value: stats.featured,
      icon: Tag,
      color: "var(--gold-dark)",
    },
    {
      label: "Categories",
      value: stats.categories,
      icon: List,
      color: "var(--brown-mid)",
    },
  ];

  const QUICK_LINKS = [
    {
      to: "/admin/products/add",
      icon: PlusCircle,
      label: "Add New Product",
      desc: "Upload images and create a listing",
    },
    {
      to: "/admin/products",
      icon: List,
      label: "Manage Products",
      desc: "Edit, delete, or toggle availability",
    },
  ];

  return (
    <>
      <Navbar />
      <main style={{ padding: "48px 0 80px", minHeight: "80vh" }}>
        <div className="container">
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 48,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <p className="section-subtitle" style={{ marginBottom: 8 }}>
                Admin Panel
              </p>
              <h1 className="section-title">Dashboard</h1>
              <p
                style={{
                  color: "var(--brown-light)",
                  fontSize: "0.875rem",
                  marginTop: 6,
                }}
              >
                Logged in as {user?.email}
              </p>
            </div>
            <button
              onClick={logout}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "none",
                border: "1.5px solid var(--cream-dark)",
                borderRadius: "var(--radius-sm)",
                padding: "10px 20px",
                fontSize: "0.85rem",
                color: "var(--brown-mid)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--espresso)";
                e.currentTarget.style.color = "var(--espresso)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--cream-dark)";
                e.currentTarget.style.color = "var(--brown-mid)";
              }}
            >
              <LogOut size={15} /> Logout
            </button>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: 20,
              marginBottom: 48,
            }}
          >
            {STAT_CARDS.map(({ label, value, icon: Icon, color }) => (
              <div
                key={label}
                style={{
                  background: "var(--white)",
                  border: "1.5px solid var(--cream-dark)",
                  borderRadius: "var(--radius-md)",
                  padding: "24px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.75rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--brown-light)",
                    }}
                  >
                    {label}
                  </p>
                  <Icon size={16} color={color} />
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2.5rem",
                    color,
                    lineHeight: 1,
                  }}
                >
                  {loading ? "—" : value}
                </p>
              </div>
            ))}
          </div>

          {/* Quick links */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              marginBottom: 20,
            }}
          >
            Quick Actions
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            {QUICK_LINKS.map(({ to, icon: Icon, label, desc }) => (
              <Link
                key={to}
                to={to}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  background: "var(--white)",
                  border: "1.5px solid var(--cream-dark)",
                  borderRadius: "var(--radius-md)",
                  padding: "24px",
                  textDecoration: "none",
                  transition:
                    "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--gold)";
                  e.currentTarget.style.boxShadow = "var(--shadow-md)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--cream-dark)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    minWidth: 44,
                    background: "var(--espresso)",
                    borderRadius: "var(--radius-sm)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={18} color="var(--gold)" />
                </div>
                <div>
                  <p
                    style={{
                      fontWeight: 600,
                      color: "var(--espresso)",
                      marginBottom: 4,
                      fontSize: "0.9375rem",
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--brown-light)",
                      lineHeight: 1.5,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
