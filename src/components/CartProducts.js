import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  Box,
  Input,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Table,
  IconButton,
  Button,
} from "@material-ui/core";
import { useCart } from "../hooks/useCart";
import { useProduct } from "../hooks/useProduct";

const useStyles = makeStyles((theme) => ({
  box: {
    height: "100vh",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingTop: 30,
  },
  container: {
    width: "65%",
    height: "71%",
  },
  container2: {
    width: "65%",
    height: "15%",
  },
  table: {
    minWidth: 800,
  },
  img: {
    width: 60,
  },
  money: {
    color: "green",
    fontSize: 14,
  },
  header: {
    fontSize: 16,
  },
  titleFormatted: {
    fontSize: 12,
  },
  divQuantity: {
    display: "flex",
    flexDirection: "row",
  },
  boxInput: {
    marginLeft: 10,
    marginRight: 10,
  },
  buttonFinal: {
    background: "#4caf50",
  },
}));

export function CartProducts() {
  const classes = useStyles();
  const { cart, removeProduct, updateProductQuantity } = useCart();
  const { products } = useProduct();

  function handleRemoveProduct(id) {
    removeProduct(id);
  }

  function handleProductIncrement(product) {
    updateProductQuantity(product.id, product.quantity + 1);
  }

  function handleProductDecrement(product) {
    updateProductQuantity(product.id, product.quantity - 1);
  }

  const cartFormatted = cart.map((product) => ({
    ...product,
    priceFormatted: parseFloat(product.price).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    }),
    subTotal: parseFloat(product.price * product.quantity).toLocaleString(
      "pt-br",
      {
        style: "currency",
        currency: "BRL",
      }
    ),
    titleFormatted: `${product.title.substring(0, 30)} ...`,
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
    <Box className={classes.box} display="flex">
      <TableContainer className={classes.container} component={Paper}>
        <Table
          stickyHeader
          className={classes.table}
          aria-label="spanning table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                <Typography className={classes.header}>Produto</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography className={classes.header}>Preço</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography className={classes.header}>Quantidade</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography className={classes.header}>SubTotal</Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartFormatted.map((cartItem) => (
              <TableRow key={cartItem.id}>
                <TableCell>
                  <img
                    className={classes.img}
                    src={cartItem.picture}
                    alt={cartItem.title}
                  />
                </TableCell>
                <TableCell>
                  <abbr
                    style={{ textDecoration: "none" }}
                    title={cartItem.title}
                  >
                    <Typography
                      variant="overline"
                      className={classes.titleFormatted}
                    >
                      {cartItem.titleFormatted}
                    </Typography>
                  </abbr>
                </TableCell>
                <TableCell align="center">
                  <Typography className={classes.money} variant="button">
                    {cartItem.priceFormatted}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <div className={classes.divQuantity}>
                    <IconButton
                      disabled={cartItem.quantity <= 1}
                      color="primary"
                      aria-label="return product"
                      onClick={() => handleProductDecrement(cartItem)}
                    >
                      <NavigateBeforeIcon />
                    </IconButton>
                    <Box className={classes.boxInput} maxWidth={23}>
                      <Input value={cartItem.quantity} readOnly />
                    </Box>
                    <IconButton
                      disabled={cartItem.quantity == 10}
                      color="primary"
                      aria-label="return product"
                      onClick={() => handleProductIncrement(cartItem)}
                    >
                      <NavigateNextIcon />
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell align="center">
                  <Typography className={classes.money} variant="caption">
                    {cartItem.subTotal}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => handleRemoveProduct(cartItem.id)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer className={classes.container2}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Button className={classes.buttonFinal} variant="contained">
                  <Typography variant="button">Finalizar Pedido</Typography>
                </Button>
              </TableCell>
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
          </TableHead>
        </Table>
      </TableContainer>
    </Box>
  );
}
