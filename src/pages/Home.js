import { createTheme, ThemeProvider } from "@material-ui/core";
import { MainProducts } from "../components/MainProducts";

export function Home() {
  const theme = createTheme({});
  return (
    <ThemeProvider theme={theme}>
      <MainProducts />
    </ThemeProvider>
  );
}
