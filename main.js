import { fetchProducts } from "./sandbox";
import { orderTotal } from "./sandbox";

const products = fetchProducts("1");
console.log("connected");
console.log(products);

const productList = document.querySelector("ul");
