import { API_URL } from './url.js';

const fetchAllProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const products = await response.json();
      console.log(products);
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  const fetchProduct = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/products/${productId}`);
      const product = await response.json();
      console.log(product);
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };
  
  export { fetchAllProducts, fetchProduct };