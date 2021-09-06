import axios from "axios";
import { createContext, useState } from "react";

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
        `http://localhost:3001/products/${productId}`
      );

      setModal([{ ...product }]);
      setOpen(true);
      localStorage.setItem("@DevMart:modal", JSON.stringify([{ ...product }]));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ModalContext.Provider value={{ openModal, open, setOpen, modal }}>
      {props.children}
    </ModalContext.Provider>
  );
}
