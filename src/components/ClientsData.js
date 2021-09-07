import { Formik, Form } from "formik";

import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/styles";
import {
  Box,
  Typography,
  Grid,
  Button,
  InputLabel,
  Input,
  FormHelperText,
} from "@material-ui/core";

import schema from "../schema";
import InputMask from "react-input-mask";
import { useCart } from "../hooks/useCart";

const useStyles = makeStyles((theme) => ({
  errorMessage: {
    color: "#f44336",
  },
}));

export function ClientsData() {
  const classes = useStyles();

  const history = useHistory();

  const { setCart } = useCart();

  function onSubmit(values) {
    setCart([]);
    localStorage.removeItem("@DevMart:cart");
    alert("COMPRA FEITA COM SUCESSO, VOLTE SEMPRE!!");
    history.push("/");
  }

  return (
    <Grid item className={classes.grid}>
      <Typography variant="h5">Informações do Cliente</Typography>

      <Box pt={3}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            cpf: "",
            endereco: "",
            cep: "",
            rua: "",
            bairro: "",
            numero: "",
          }}
          onSubmit={onSubmit}
          validateOnMount
          validationSchema={schema}
        >
          {({ values, handleChange, errors, setFieldValue }) => (
            <Form>
              <Grid container direction="column" spacing={3}>
                <Grid item>
                  <InputLabel htmlFor="name">Nome:</InputLabel>
                  <Input
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[1-9]/g, "");

                      setFieldValue("name", value);
                    }}
                  />
                  {errors.name && (
                    <FormHelperText className={classes.errorMessage}>
                      {errors.name}
                    </FormHelperText>
                  )}
                </Grid>

                <Grid item>
                  <InputLabel htmlFor="email">Email:</InputLabel>
                  <Input
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <FormHelperText className={classes.errorMessage}>
                      {errors.email}
                    </FormHelperText>
                  )}
                </Grid>

                <Grid item>
                  <InputLabel htmlFor="cpf">CPF:</InputLabel>
                  <InputMask
                    type="text"
                    name="cpf"
                    value={values.cpf}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/-/g, "")
                        .replace(/_/g, "")
                        .replace(/\./g, "");

                      setFieldValue("cpf", value);
                    }}
                    mask="999.999.999-99"
                  >
                    {(input) => <Input {...input} />}
                  </InputMask>

                  {errors.cpf && (
                    <FormHelperText className={classes.errorMessage}>
                      {errors.cpf}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item>
                  <InputLabel htmlFor="endereco">Endereço:</InputLabel>
                  <Input
                    name="endereco"
                    type="text"
                    value={values.endereco}
                    onChange={handleChange}
                  />
                  {errors.endereco && (
                    <FormHelperText className={classes.errorMessage}>
                      {errors.endereco}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item>
                  <InputLabel htmlFor="cep">CEP:</InputLabel>
                  <InputMask
                    type="text"
                    name="cep"
                    value={values.cep}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/-/g, "")
                        .replace(/_/g, "");

                      setFieldValue("cep", value);
                    }}
                    mask="99999-999"
                  >
                    {(input) => <Input {...input} />}
                  </InputMask>
                  {errors.cep && (
                    <FormHelperText className={classes.errorMessage}>
                      {errors.cep}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item>
                  <InputLabel htmlFor="rua">Rua:</InputLabel>
                  <Input
                    type="text"
                    name="rua"
                    value={values.rua}
                    onChange={handleChange}
                  />
                  {errors.rua && (
                    <FormHelperText className={classes.errorMessage}>
                      {errors.rua}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item>
                  <InputLabel htmlFor="bairro">Bairro:</InputLabel>
                  <Input
                    type="text"
                    name="bairro"
                    value={values.bairro}
                    onChange={handleChange}
                  />
                  {errors.bairro && (
                    <FormHelperText className={classes.errorMessage}>
                      {errors.bairro}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item>
                  <InputLabel htmlFor="numero">Numero:</InputLabel>
                  <Input
                    type="number"
                    name="numero"
                    value={values.numero}
                    onChange={handleChange}
                  />
                  {errors.numero && (
                    <FormHelperText className={classes.errorMessage}>
                      {errors.numero}
                    </FormHelperText>
                  )}
                </Grid>
                <Button
                  style={{ marginBottom: 40 }}
                  type="submit"
                  variant="outlined"
                  color="primary"
                >
                  Finalizar Pedido
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Grid>
  );
}
