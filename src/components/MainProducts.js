import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import {
  Box,
  Grid,
  makeStyles,
  Typography,
  IconButton,
  Paper,
  Link,
} from "@material-ui/core";
import { useCart } from "../hooks/useCart";
import { useProduct } from "../hooks/useProduct";
import { useModal } from "../hooks/useModal";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  gridContainer: {
    padding: 0,
    margin: 0,
    width: "80%",
    height: "80%",
    paddingTop: 100,
  },

  product: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: "100%",
    height: "100%",
  },
  imgProduct: {
    width: 100,
  },
  productTypography: {
    fontSize: 12,
  },
  money: {
    color: "green",
    fontSize: 18,
  },
  iconCart: {
    marginRight: 40,
  },
  cardImg: {
    height: 300,
    width: 300,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export function MainProducts() {
  const classes = useStyles();
  const { products } = useProduct();
  const { addProduct, cart } = useCart();
  const { openModal } = useModal();

  function handleOpenModal(productId) {
    openModal(productId);
  }

  function handleTitleProduct(product) {
    if (product.length > 70) {
      product = `${product.substring(0, 40)} ...`;
    }

    return product;
  }

  function handleAddProduct(id) {
    addProduct(id);
    console.log(products);
  }

  return (
    <Box className={classes.box}>
      <Grid className={classes.gridContainer} container spacing={4}>
        {products.map((product) => (
          <Grid key={product.id} item lg={3} md={4} sm={6} xs={12}>
            <Paper elevation={3} className={classes.product}>
              <abbr style={{ textDecoration: "none" }} title={product.title}>
                <Link
                  onClick={() => handleOpenModal(product.id)}
                  underline="none"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    className={classes.imgProduct}
                    src={product.picture}
                    alt={product.title}
                  />
                  <Typography
                    className={classes.productTypography}
                    variant="overline"
                    color="textPrimary"
                    paragraph
                  >
                    {handleTitleProduct(product.title)}
                  </Typography>
                  <Typography className={classes.money} variant="button">
                    {product.price}
                  </Typography>
                </Link>
                <IconButton
                  onClick={() => handleAddProduct(product.id)}
                  className={classes.iconCart}
                  color="primary"
                  aria-label="add to shopping cart"
                >
                  <AddShoppingCartIcon />
                </IconButton>
              </abbr>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
