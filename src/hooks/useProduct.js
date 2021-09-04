import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";

export function useProduct() {
  const value = useContext(ProductContext);

  return value;
}
