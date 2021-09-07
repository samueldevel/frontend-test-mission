import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export function PrivateRoute({ component: Component, ...rest }) {
  const { cart } = useCart();

  return (
    <Route
      {...rest}
      render={(props) =>
        cart !== [] ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}
