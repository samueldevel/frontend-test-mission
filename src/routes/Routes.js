import { BrowserRouter, Route } from "react-router-dom";

import { CartPage } from "../pages/CartPage";
import { Home } from "../pages/Home";
import { MenuBar } from "../components/MenuBar";
import { ModalProducts } from "../components/ModalProducts";
import { PaymentForm } from "../pages/PaymentForm";
import { PrivateRoute } from "./PrivateRoute";

export function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/" component={MenuBar} />
      <PrivateRoute path="/cart" component={CartPage} />
      <Route path="/" component={ModalProducts} />
      <Route path="/paymentForm" component={PaymentForm} />
    </BrowserRouter>
  );
}
