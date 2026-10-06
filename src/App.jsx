import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";

import CreateProduct from "../components/CreateProduct.jsx";
import UpdateProduct from "../components/UpdateProduct.jsx";
import { viewMore, deleteProduct } from "../productFunctions.js";

function App() {
  const [showCreate, setShowCreate] = useState(false);
  const [products, setProducts] = useState([]);
  const [description, setDescription] = useState();
  const [search, setSearch] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const searchRef = useRef(null);

  // Products fetch
  const getAllProducts = () => {
    axios
      .get("http://localhost:3000/product/getAll")
      .then((res) => {
        setProducts(res.data.response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    searchRef.current?.focus();
    getAllProducts();
  }, []);

  // Search filter
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      getAllProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Fake Store Products</h1>

      {/* Search */}
      <input
       className="search-box"
        ref={searchRef}
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Create Button */}
      <button className="create-btn" onClick={() => setShowCreate(true)}>
        + Add Product
      </button>

      <div className="products-container">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              className="product-image"
              src={product.image}
              alt={product.title}
            />

            <h2 className="product-title">{product.title}</h2>

            <p className="product-text product-price">
              Price: ₹{product.price}
            </p>

            <p className="product-text">{product.category}</p>

            <button
              className="delete-btn"
              onClick={() => handleDelete(product.id)}
            >
              Delete
            </button>

            <button
              className="update-btn"
              onClick={() => {
                setSelectedProduct(product);
                setShowUpdate(true);
              }}
            >
              Update
            </button>

            <button
              className="view-btn"
              onClick={() =>
                setDescription(description === product.id ? null : product.id)
              }
            >
              {description === product.id ? "Hide" : "View More"}
            </button>

            {description === product.id && (
              <div className="description">
                <p>{viewMore(product)}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {showCreate && (
        <CreateProduct
          onClose={() => setShowCreate(false)}
          onProductCreated={getAllProducts}
        />
      )}

      {showUpdate && selectedProduct && (
        <UpdateProduct
          product={selectedProduct}
          onClose={() => setShowUpdate(false)}
          onProductUpdated={getAllProducts}
        />
      )}
    </div>
  );
}

export default App;
