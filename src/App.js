import { CartProvider } from "./contexts/CartContext";
import { ProductProvider } from "./contexts/ProductContext";

import { BrowserRouter, Route } from "react-router-dom";

import { CartPage } from "./pages/CartPage";
import { Home } from "./pages/Home";
import { MenuBar } from "./components/MenuBar";
import { ModalProvider } from "./contexts/ModalContext";
import { ModalProducts } from "./components/ModalProducts";

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <CartProvider>
          <ModalProvider>
            <Route path="/" exact component={Home} />
            <Route path="/" component={MenuBar} />
            <Route path="/cart" component={CartPage} />
            <Route path="/" component={ModalProducts} />
          </ModalProvider>
        </CartProvider>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
