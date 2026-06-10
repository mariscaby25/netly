import React, { useState } from "react";
import {
  uploadProductImage,
  addProductImage,
} from "../services/productService";

export default function UploadImage({ productId }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    const { publicUrl, storagePath } = await uploadProductImage(
      file,
      productId,
    );

    await addProductImage({
      product_id: productId,
      image_url: publicUrl,
      storage_path: storagePath,
      is_primary: false,
    });

    setFile(null);
    setLoading(false);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="btn-gold"
        style={{ marginLeft: 10 }}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
