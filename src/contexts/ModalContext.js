import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const ModalContext = createContext({});

export function ModalProvider(props) {
  const [modal, setModal] = useState(() => {
    const storagedModal = localStorage.getItem("@DevMart:modal");

    if (storagedModal) {
      return JSON.parse(storagedModal);
    }

    return [];
  });
  const [open, setOpen] = useState(false);

  async function openModal(productId) {
    try {
      const { data: product } = await axios.get(
        `https://devmart-api.herokuapp.com/products/${productId}`
      );

      setModal([{ ...product }]);
      setOpen(true);
      localStorage.setItem("@DevMart:modal", JSON.stringify([{ ...product }]));
    } catch {
      toast.error("Erro ao abrir o modal", {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  }

  return (
    <ModalContext.Provider value={{ openModal, open, setOpen, modal }}>
      {props.children}
    </ModalContext.Provider>
  );
}
