import { TextField, Container, CssBaseline, Box, Typography, FormControlLabel, Checkbox, Button, Grid, Link } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";

import routes from "../routes";
import { useAuth } from '../context/AuthContext';

interface IFormInput {
  username: string,
  password: string,
}

const LoginPage = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const { logIn } = useAuth();

  const onSubmit = (data: FieldValues) => {
    fetch(routes.loginPath(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
    }).then((response) => response.json())
      .then((data) => logIn(data.data.token))
  };

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Вход
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <TextField
          {...register('username')}
          margin="normal"
          required
          fullWidth
          id="username"
          label="Имя пользователя"
          autoFocus
        />
        <TextField
          {...register('password')}
          margin="normal"
          required
          fullWidth
          label="Пароль"
          type="password"
          id="password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Запомнить меня"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
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