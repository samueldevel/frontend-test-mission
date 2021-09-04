import axios from "axios";
import { createContext, useState } from "react";

export const CartContext = createContext({});

export function CartProvider(props) {
  const [cart, setCart] = useState(() => {
    const storagedCart = localStorage.getItem("@DevMart:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  async function addProduct(productId) {
    try {
      const { data: product } = await axios.get(
        `http://localhost:3001/products/${productId}`
      );

      const productAlreadyInCart = cart.find(
        (product) => product.id === productId
      );

      if (!productAlreadyInCart) {
        const stock = product.quantity;
        if (stock > 0) {
          setCart([...cart, { ...product, quantity: 1 }]);
          localStorage.setItem(
            "@DevMart:cart",
            JSON.stringify([...cart, { ...product, quantity: 1 }])
          );
          console.log("item colocado no carrinho com sucesso");
          return;
        } else {
          console.log("Quantidade solicitada excede o extoque");
        }
      }

      if (productAlreadyInCart) {
        const stock = product.quantity;

        if (stock > productAlreadyInCart.quantity) {
          const updatedCart = cart.map((cartItem) =>
            cartItem.id === productId
              ? {
                  ...cartItem,
                  quantity: Number(cartItem.quantity) + 1,
                }
              : cartItem
          );

          const productExists = cart.some(
            (cartProduct) => cartProduct.id === productId
          );

          if (!productExists) {
            console.log("erro na alteração da quantidade do produto");
            return;
          }
          setCart(updatedCart);
          localStorage.setItem("@DevMart:cart", JSON.stringify(updatedCart));
          console.log("item colocado no carrinho com sucesso");
          return;
        } else {
          console.log("Quantidade solicitada excede o extoque");
        }
      }
    } catch {
      console.error("Erro na remoção do produto");
    }
  }

  function removeProduct(productId) {
    try {
      const productExists = cart.some(
        (cartProduct) => cartProduct.id === productId
      );

      if (!productExists) {
        console.log("Não foi possivel encontrar o produto");
        return;
      }

      const updatedCart = cart.filter((cartItem) => cartItem.id !== productId);

      setCart(updatedCart);
      localStorage.setItem("@DevMart:cart", JSON.stringify(updatedCart));
    } catch {
      console.log("Erro na remoção do produto");
    }
  }

  async function updateProductQuantity(productId, quantity) {
    try {
      const { data: product } = await axios.get(
        `http://localhost:3001/products/${productId}`
      );

      if (quantity < 1) {
        console.log("erro na alteração da quantidade do produto");
        return;
      }

      const productQuantity = product.quantity;
      const stockIsAvailable = quantity < productQuantity;

      if (!stockIsAvailable) {
        console.log("Quantidade solicitada fora do estoque");

        return;
      }

      const productExists = cart.some(
        (cartProduct) => cartProduct.id === productId
      );

      if (!productExists) {
        console.log("Erro na alteração de quantidade do produto");
      }

      const updatedCart = cart.map((cartItem) =>
        cartItem.id === productId
          ? {
              ...cartItem,
              quantity: quantity,
            }
          : cartItem
      );

      setCart(updatedCart);
      localStorage.setItem("@DevMart:cart", JSON.stringify(updatedCart));
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductQuantity }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
