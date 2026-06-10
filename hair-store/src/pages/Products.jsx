import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import { getProducts, getCategories } from "../services/productService";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const search = searchParams.get("q") || "";
  const categoryId = searchParams.get("category") || null;

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    getProducts({
      search: search || undefined,
      categoryId: categoryId || undefined,
    })
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [search, categoryId]);

  const handleSearch = (val) => {
    const p = new URLSearchParams(searchParams);
    if (val) p.set("q", val);
    else p.delete("q");
    setSearchParams(p);
  };

  const handleCategory = (id) => {
    const p = new URLSearchParams(searchParams);
    if (id) p.set("category", id);
    else p.delete("category");
    setSearchParams(p);
  };

  const selectedCat = categories.find((c) => c.id === categoryId);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh", padding: "48px 0 80px" }}>
        <div className="container">
          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <p className="section-subtitle" style={{ marginBottom: 8 }}>
              Our Collection
            </p>
            <h1 className="section-title">
              {selectedCat ? selectedCat.name : "All Products"}
            </h1>
            {!loading && (
              <p
                style={{
                  color: "var(--brown-light)",
                  fontSize: "0.875rem",
                  marginTop: 6,
                }}
              >
                {products.length} product{products.length !== 1 ? "s" : ""}{" "}
                found
              </p>
            )}
          </div>

          {/* Filters */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              marginBottom: 40,
            }}
          >
            <SearchBar value={search} onChange={handleSearch} />
            <CategoryFilter
              categories={categories}
              selected={categoryId}
              onSelect={handleCategory}
            />
          </div>

          {/* Grid */}
          <ProductGrid products={products} loading={loading} />
        </div>
      </main>
      <Footer />
    </>
  );
}
