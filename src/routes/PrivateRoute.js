import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("@DevMart:cart") !== null ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}
