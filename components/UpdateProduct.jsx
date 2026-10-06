import { useState } from "react";
import axios from "axios";
import "../styles/UpdateProduct.css";

function UpdateProduct({ product, onClose, onProductUpdated }) {

  const [productData, setProductData] = useState({
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Update data:", productData);

    setLoading(true);
    setError("");

    try {
      console.log("AXIOS REQUEST START");
      const response = await axios.post(
        "http://localhost:3000/product/update",
        {
          id: Number(productData.id),
          title: productData.title,
          price: Number(productData.price),
          description: productData.description,
          category: productData.category,
          image: productData.image,
        }
      );

      console.log("Backend response:", response.data);
      console.log("AXIOS REQUEST COMPLETE");

      onProductUpdated();
      onClose();

    } catch (error) {
      console.log("Update error:", error);

      // setError(
      //   error.response?.data?.message ||
      //   "Product update nahi hua"
      // );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-overlay">

      <div className="update-form">

        <div className="update-header">

          <div>
            <h2>Update Product</h2>
            <p>Edit product details below</p>
          </div>

          <button
            type="button"
            className="close-btn"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* ID */}

          <div className="input-group">

            <label>Product ID</label>

            <input
              type="number"
              name="id"
              value={productData.id}
              readOnly
            />

          </div>


          {/* Title */}

          <div className="input-group">

            <label>Product Title</label>

            <input
              type="text"
              name="title"
              value={productData.title}
              onChange={handleChange}
              required
            />

          </div>


          {/* Price + Category */}

          <div className="input-row">

            <div className="input-group">

              <label>Price</label>

              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                required
              />

            </div>


            <div className="input-group">

              <label>Category</label>

              <input
                type="text"
                name="category"
                value={productData.category}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* Image */}

          <div className="input-group">

            <label>Image URL</label>

            <input
              type="text"
              name="image"
              value={productData.image}
              onChange={handleChange}
              required
            />

          </div>


          {/* Description */}

          <div className="input-group">

            <label>Description</label>

            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              required
            />

          </div>


          {/* Buttons */}

          <div className="form-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="update-product-btn"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Product"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default UpdateProduct;