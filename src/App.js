import { CartProvider } from "./contexts/CartContext";
import { ProductProvider } from "./contexts/ProductContext";

import { BrowserRouter, Route } from "react-router-dom";

import { CartPage } from "./pages/CartPage";
import { Home } from "./pages/Home";
import { MenuBar } from "./components/MenuBar";

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <CartProvider>
          <Route path="/" exact component={Home} />
          <Route path="/" component={MenuBar} />
          <Route path="/cart" component={CartPage} />
        </CartProvider>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
