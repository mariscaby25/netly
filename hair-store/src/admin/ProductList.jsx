import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash, Plus } from "lucide-react";

import { getProducts, deleteProduct } from "../services/productService";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await getProducts({ adminView: true });
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await deleteProduct(id);
    load();
  };

  return (
    <div className="container" style={{ padding: "60px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 className="section-title">Products</h2>

        <Link to="/admin/products/add" className="btn-gold">
          <Plus size={16} /> Add
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ marginTop: 30, display: "grid", gap: 12 }}>
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                background: "var(--white)",
                padding: 16,
                borderRadius: 12,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h4>{p.name}</h4>
                <small>GH₵ {p.price}</small>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <Link to={`/admin/products/edit/${p.id}`}>
                  <Edit size={16} />
                </Link>

                <button onClick={() => handleDelete(p.id)}>
                  <Trash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
