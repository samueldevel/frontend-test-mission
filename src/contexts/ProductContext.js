import axios from "axios";

import { useEffect, useState } from "react";
import { createContext } from "react";

export const ProductContext = createContext({});

export function ProductProvider(props) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/products").then((response) => {
      const productFormatted = response.data.map((product) => {
        return {
          ...product,
          price: product.price.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          }),
        };
      });
      setProducts(productFormatted);
    });
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {props.children}
    </ProductContext.Provider>
  );
}
