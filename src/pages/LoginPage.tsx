import {
  TextField,
  Container,
  CssBaseline,
  Box,
  Typography,
  Button,
  Grid,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import routes from "../routes";
import { useAuth } from "../context/AuthContext";

interface IFormInput {
  username: string;
  password: string;
}

const LoginPage = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [authFailed, setauthFailed] = useState<boolean>(false);

  const onSubmit = (data: FieldValues) => {
    setauthFailed(false);
    setButtonDisabled(true);
    fetch(routes.loginPath(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error_code) {
          logIn(data.data.token);
          navigate(routes.contentRoute());
        } else {
          setauthFailed(true);
          setButtonDisabled(false);
        }
      });
  };

  return (
    <Container
      component="main"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "500px",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            {...register("username")}
            margin="normal"
            required
            fullWidth
            id="username"
            label="Имя пользователя"
            autoFocus
            error={authFailed}
          />
          <TextField
            {...register("password")}
            margin="normal"
            required
            fullWidth
            label="Пароль"
            type="password"
            id="password"
            error={authFailed}
            helperText={"Неправильное имя пользователя или пароль"}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={buttonDisabled}
          >
            Войти
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Забыли пароль?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                Регистрация
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
