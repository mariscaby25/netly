import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Shield, Truck } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import { getProducts, getCategories } from "../services/productService";

const PERKS = [
  {
    icon: Sparkles,
    title: "Premium Quality",
    desc: "100% human & premium synthetic hair sourced for longevity and shine.",
  },
  {
    icon: Shield,
    title: "Authentic Products",
    desc: "Every piece is verified for quality before it reaches you.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Same-day delivery available across Accra.",
  },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProducts({ featured: true }), getCategories()])
      .then(([prods, cats]) => {
        setFeatured(prods);
        setCategories(cats);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section
          style={{
            minHeight: "88vh",
            display: "flex",
            alignItems: "center",
            background:
              "linear-gradient(135deg, var(--espresso) 0%, var(--brown) 60%, var(--brown-mid) 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative circles */}
          <div
            style={{
              position: "absolute",
              top: "-10%",
              right: "-5%",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-15%",
              left: "-5%",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            className="container"
            style={{ position: "relative", zIndex: 1 }}
          >
            <div style={{ maxWidth: 640 }}>
              <p
                className="section-subtitle"
                style={{ color: "var(--gold)", marginBottom: 20 }}
              >
                ✦ Premium Hair Collection
              </p>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3rem, 7vw, 5.5rem)",
                  fontWeight: 300,
                  color: "var(--cream)",
                  lineHeight: 1.05,
                  marginBottom: 28,
                }}
              >
                Hair that tells
                <br />
                <em style={{ color: "var(--gold-light)" }}>your story.</em>
              </h1>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "rgba(250,247,242,0.75)",
                  maxWidth: 480,
                  lineHeight: 1.8,
                  marginBottom: 40,
                }}
              >
                Discover our curated collection of wigs, bundles, closures and
                more — crafted for women who wear their crown with pride.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <Link to="/products" className="btn-gold">
                  Shop Collection <ArrowRight size={16} />
                </Link>
                <Link
                  to="/contact"
                  className="btn-outline"
                  style={{
                    borderColor: "rgba(250,247,242,0.4)",
                    color: "var(--cream)",
                  }}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Perks ── */}
        <section style={{ background: "var(--cream-dark)", padding: "60px 0" }}>
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 32,
              }}
            >
              {PERKS.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      minWidth: 44,
                      borderRadius: "50%",
                      background: "var(--espresso)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={18} color="var(--gold)" />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.05rem",
                        marginBottom: 4,
                      }}
                    >
                      {title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--brown-mid)",
                        lineHeight: 1.6,
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Categories ── */}
        {categories.length > 0 && (
          <section style={{ padding: "80px 0" }}>
            <div className="container">
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <p className="section-subtitle" style={{ marginBottom: 10 }}>
                  Browse by type
                </p>
                <h2 className="section-title">Shop Categories</h2>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                  gap: 16,
                }}
              >
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.id}`}
                    style={{
                      display: "block",
                      padding: "24px 16px",
                      background: "var(--white)",
                      borderRadius: "var(--radius-md)",
                      border: "1.5px solid var(--cream-dark)",
                      textAlign: "center",
                      transition:
                        "border-color 0.25s, transform 0.25s, box-shadow 0.25s",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--gold)";
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = "var(--shadow-md)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--cream-dark)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.05rem",
                        color: "var(--espresso)",
                      }}
                    >
                      {cat.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Featured Products ── */}
        <section style={{ padding: "80px 0", background: "var(--cream-dark)" }}>
          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: 48,
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div>
                <p className="section-subtitle" style={{ marginBottom: 10 }}>
                  Handpicked for you
                </p>
                <h2 className="section-title">Featured Products</h2>
              </div>
              <Link
                to="/products"
                className="btn-outline"
                style={{ fontSize: "0.8rem" }}
              >
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <ProductGrid
              products={featured}
              loading={loading}
              emptyMessage="No featured products yet."
            />
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section
          style={{
            padding: "80px 0",
            background: "var(--espresso)",
            textAlign: "center",
          }}
        >
          <div className="container">
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "var(--cream)",
                fontWeight: 300,
                marginBottom: 16,
              }}
            >
              Ready to transform your look?
            </h2>
            <p
              style={{
                color: "rgba(250,247,242,0.65)",
                marginBottom: 36,
                fontSize: "1rem",
              }}
            >
              Browse our full collection and order via WhatsApp or call.
            </p>
            <Link to="/products" className="btn-gold">
              Shop Now <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
