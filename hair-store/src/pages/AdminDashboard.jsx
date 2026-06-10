import React from "react";
import { Link } from "react-router-dom";
import { Package, Plus, Image, LogOut } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { signOut } from "../services/authService";

export default function AdminDashboard() {
  const handleLogout = async () => {
    await signOut();
    window.location.href = "/admin/login";
  };

  return (
    <>
      <Navbar />

      <main
        style={{
          padding: "80px 0",
          background: "var(--cream)",
          minHeight: "80vh",
        }}
      >
        <div className="container">
          <h1 className="section-title" style={{ marginBottom: 30 }}>
            Admin Dashboard
          </h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 20,
            }}
          >
            <Link className="admin-card" to="/admin/products">
              <Package />
              <p>Manage Products</p>
            </Link>

            <Link className="admin-card" to="/admin/products/add">
              <Plus />
              <p>Add Product</p>
            </Link>

            <Link className="admin-card" to="/admin/products">
              <Image />
              <p>Manage Images</p>
            </Link>

            <button onClick={handleLogout} className="admin-card danger">
              <LogOut />
              <p>Logout</p>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
