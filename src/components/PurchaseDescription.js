import {
  Typography,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { useCart } from "../hooks/useCart";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    marginBottom: "28vh",
  },
  money: {
    color: "green",
    fontSize: 14,
  },
  container: {
    height: "56vh",
  },
  container2: {
    width: "100%",
    height: "15%",
  },
}));

export function PurchaseDescription() {
  const classes = useStyles();
  const { cart } = useCart();

  const cartFormatted = cart.map((product) => ({
    ...product,

    subTotal: parseFloat(product.price * product.quantity).toLocaleString(
      "pt-br",
      {
        style: "currency",
        currency: "BRL",
      }
    ),
  }));

  const totalPrice = cartFormatted.reduce((sumTotal, product) => {
    sumTotal += product.price * product.quantity;
    return sumTotal;
  }, 0);

  const totalPriceFormatted = totalPrice.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <Grid item className={classes.gridItem}>
      <Typography variant="h5">Descrição da compra</Typography>

      <TableContainer component={Paper} className={classes.container}>
        <Table
          stickyHeader
          className={classes.table}
          aria-label="spanning table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Produto</TableCell>
              <TableCell align="center">Quantidade</TableCell>
              <TableCell align="center">SubTotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartFormatted.map((cartProduct) => (
              <TableRow key={cartProduct.id}>
                <TableCell>
                  <Typography variant="body2" gutterBottom>
                    <abbr
                      style={{ textDecoration: "none" }}
                      title={cartProduct.title}
                    >
                      {cartProduct.titleFormatted}
                    </abbr>
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="button" gutterBottom>
                    {cartProduct.quantity}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className={classes.money} variant="caption">
                    {cartProduct.subTotal}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer className={classes.container2}>
        <Table stickyHeader>
          <TableFooter>
            <TableRow>
              <TableCell align="right">
                <Typography style={{ fontSize: 20 }}>TOTAL:</Typography>
                <Typography
                  style={{ fontSize: 15 }}
                  variant="button"
                  className={classes.money}
                >
                  {totalPriceFormatted}
                </Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Grid>
  );
}
