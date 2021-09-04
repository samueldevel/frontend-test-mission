import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
} from "@material-ui/core";

import { useCart } from "../hooks/useCart";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "white",
  },
  grow: {
    flexGrow: 1,
  },
  shoppingCart: {
    fontSize: 35,
  },
  cartButton: {
    marginRight: 40,
  },
  money: {
    color: "green",
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15,
  },
}));

export function MenuBar() {
  const classes = useStyles();
  const { cart } = useCart();

  const history = useHistory();

  function handlePageCart() {
    history.push("/cart");
  }

  const totalItems = cart.reduce((sumTotal, product) => {
    sumTotal += product.quantity;
    return sumTotal;
  }, 0);

  const totalPrice = cart.reduce((sumTotal, product) => {
    sumTotal += parseFloat(product.price * product.quantity);

    return sumTotal;
  }, 0);

  const totalPriceFormatted = parseFloat(totalPrice).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography
            color="textSecondary"
            variant="h4"
            className={classes.title}
          >
            <Link style={{ textDecoration: "none" }} to="/">
              Dev Mart
            </Link>
          </Typography>
          <div className={classes.grow}></div>
          <Typography color="textPrimary" variant="overline">
            total:
          </Typography>
          <Typography className={classes.money} variant="button">
            {totalPriceFormatted}
          </Typography>
          <IconButton
            onClick={handlePageCart}
            className={classes.cartButton}
            aria-label="cart"
          >
            <Badge badgeContent={totalItems} color="secondary">
              <ShoppingCartIcon className={classes.shoppingCart} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
