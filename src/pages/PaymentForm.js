import { ClientsData } from "../components/ClientsData";
import { PurchaseDescription } from "../components/PurchaseDescription";
import { makeStyles } from "@material-ui/styles";

import { Box, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  boxForm: {
    height: "100vh",
    display: "flex",
    marginTop: "14vh",
  },
  gridItemForm: {
    display: "flex",
    flexDirection: "column",
  },
  errorMessage: {
    color: "#f44336",
  },
}));

export function PaymentForm() {
  const classes = useStyles();

  return (
    <Box className={classes.boxForm}>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <ClientsData />
        <PurchaseDescription />
      </Grid>
    </Box>
  );
}
