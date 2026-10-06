import axios from "axios";


export const viewMore = (product) => {
  return product.description;
};



export const createProduct = async (productData) => {

  const res = await axios.post(
    "http://localhost:3000/product/create",
    
    {
      ...productData,
      id: Number(productData.id),
      price: Number(productData.price)
    }
  );

  return res.data;
};



export const deleteProduct = async (id) => {
  const res = await axios.post(
    "http://localhost:3000/product/delete",
    { id }
  );

  return res.data;
};