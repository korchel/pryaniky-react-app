import { Typography, Box } from "@mui/material";

const center = {
  flexGrow: "1",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignContent: "center",
};

const SignupPage = () => (
  <Box component="div" sx={center}>
    <Typography variant="h6" align="center">
      Здесь пока ничего нет. Зайдите попозже.
    </Typography>
  </Box>
);

export default SignupPage;
