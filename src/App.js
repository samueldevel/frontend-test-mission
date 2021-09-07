import { CartProvider } from "./contexts/CartContext";
import { ProductProvider } from "./contexts/ProductContext";
import { ModalProvider } from "./contexts/ModalContext";
import { Routes } from "./routes/Routes";
import { toast } from "react-toastify";

toast.configure();
function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <ModalProvider>
          <Routes />
        </ModalProvider>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
