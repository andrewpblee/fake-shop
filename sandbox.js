const fetch = require("node-fetch");

async function fetchProducts(params) {
  try {
    const url = ["https://fakestoreapi.com/products", params].join("/");
    const result = await fetch(url);
    const data = await result.json();
    return data;
  } catch (e) {
    return e;
  }
}

const orderTotal = (basket, shipping) => {
  const productTotal = basket.reduce(
    (acc, curr) => acc + curr.price * (curr.quantity || 1),
    0
  );
  return parseFloat(
    productTotal.toFixed(2) + (productTotal > 50 ? 0 : shipping || 0)
  );
};

module.exports = { fetchProducts, orderTotal };
