import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export function useCart() {
  const value = useContext(CartContext);

  return value;
}
