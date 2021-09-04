import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { CartProducts } from "../components/CartProducts";

export function CartPage() {
  const theme = createTheme({});

  return (
    <ThemeProvider theme={theme}>
      <CartProducts />
    </ThemeProvider>
  );
}
