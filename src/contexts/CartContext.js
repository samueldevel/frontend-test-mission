import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        `https://devmart-api.herokuapp.com/products/${productId}`
      );

      const productAlreadyInCart = cart.find(
        (product) => product.id === productId
      );

      if (!productAlreadyInCart) {
        const stock = product.quantity;
        if (stock > 0) {
          setCart([
            ...cart,
            {
              ...product,
              quantity: 1,
              titleFormatted: `${product.title.substring(0, 40)} ... `,
              priceFormatted: parseFloat(product.price).toLocaleString(
                "pt-br",
                {
                  style: "currency",
                  currency: "BRL",
                }
              ),
            },
          ]);
          localStorage.setItem(
            "@DevMart:cart",
            JSON.stringify([
              ...cart,
              {
                ...product,
                quantity: 1,
                titleFormatted: `${product.title.substring(0, 40)} ... `,
                priceFormatted: parseFloat(product.price).toLocaleString(
                  "pt-br",
                  {
                    style: "currency",
                    currency: "BRL",
                  }
                ),
              },
            ])
          );
          toast.success("item colocado no carrinho com sucesso", {
            position: toast.POSITION.TOP_LEFT,
          });
          return;
        } else {
          toast.error("Quantidade solicitada excede o extoque", {
            position: toast.POSITION.TOP_LEFT,
          });
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
            toast.error("erro na alteração da quantidade do produto", {
              position: toast.POSITION.TOP_LEFT,
            });
            return;
          }
          setCart(updatedCart);
          localStorage.setItem("@DevMart:cart", JSON.stringify(updatedCart));
          toast.success("item colocado no carrinho com sucesso", {
            position: toast.POSITION.TOP_LEFT,
          });
          return;
        } else {
          toast.error("Quantidade solicitada excede o extoque", {
            position: toast.POSITION.TOP_LEFT,
          });
        }
      }
    } catch {
      toast.error("Erro na remoção do produto", {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  }

  function removeProduct(productId) {
    try {
      const productExists = cart.some(
        (cartProduct) => cartProduct.id === productId
      );

      if (!productExists) {
        toast.error("Não foi possivel encontrar o produto", {
          position: toast.POSITION.TOP_LEFT,
        });
        return;
      }

      const updatedCart = cart.filter((cartItem) => cartItem.id !== productId);

      setCart(updatedCart);
      localStorage.setItem("@DevMart:cart", JSON.stringify(updatedCart));
    } catch {
      toast.error("Erro na remoção do produto", {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  }

  async function updateProductQuantity(productId, quantity) {
    try {
      const { data: product } = await axios.get(
        `https://devmart-api.herokuapp.com/products/${productId}`
      );

      if (quantity < 1) {
        toast.error("erro na alteração da quantidade do produto", {
          position: toast.POSITION.TOP_LEFT,
        });
        return;
      }

      const productQuantity = product.quantity;
      const stockIsAvailable = quantity <= productQuantity;

      if (!stockIsAvailable) {
        toast.error("Quantidade solicitada fora do estoque", {
          position: toast.POSITION.TOP_LEFT,
        });
        return;
      }

      const productExists = cart.some(
        (cartProduct) => cartProduct.id === productId
      );

      if (!productExists) {
        toast.error("Erro na alteração de quantidade do produto", {
          position: toast.POSITION.TOP_LEFT,
        });
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
      toast.error("erro ao atualizar o produto", {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addProduct,
        removeProduct,
        updateProductQuantity,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
