import { useState } from "react";
import { createProduct } from "../productFunctions.js";
import '../styles/createProduct.css';

function CreateProduct({ onClose, onProductCreated }) {

  const [productData, setProductData] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    image: ""
  });

  const [loading, setLoading] = useState(false);
  
  const [error, setError] = useState("");


  // Input change
  const handleChange = (e) => {

    setProductData({
      ...productData,
      [e.target.name]: e.target.value
    });

  };


  // Create Product
  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      await createProduct(productData);

      // Product create hone ke baad App.jsx ko batao
      onProductCreated();

      // Form close
      onClose();

    } catch (error) {

      console.log(error);

      setError(
        error.response?.data?.message ||
        "Product don't created bcz Intitial server error"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="create-overlay">

      <div className="create-form">

        {/* Header */}

        <div className="create-header">

          <div>
            <h2>Add New Product</h2>
            <p>Enter product details below</p>
          </div>

          <button
            type="button"
            className="close-btn"
            onClick={onClose}
          >
            ×
          </button>

        </div>


        {/* Error */}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}


        {/* Form */}

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <label>Product ID</label>

            <input
              type="number"
              name="id"
              placeholder="Enter product ID"
              value={productData.id}
              onChange={handleChange}
              required
            />

          </div>


          <div className="input-group">

            <label>Product Title</label>

            <input
              type="text"
              name="title"
              placeholder="Enter product title"
              value={productData.title}
              onChange={handleChange}
              required
            />

          </div>


          <div className="input-row">

            <div className="input-group">

              <label>Price</label>

              <input
                type="number"
                name="price"
                placeholder="Enter price"
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
                placeholder="electronics"
                value={productData.category}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          <div className="input-group">

            <label>Image URL</label>

            <input
              type="text"
              name="image"
              placeholder="Enter product image URL"
              value={productData.image}
              onChange={handleChange}
              required
            />

          </div>


          <div className="input-group">

            <label>Description</label>

            <textarea
              name="description"
              placeholder="Enter product description"
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
              className="add-product-btn"
              disabled={loading}
            >

              {loading ? "Adding..." : "Add Product"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );
}

export default CreateProduct;