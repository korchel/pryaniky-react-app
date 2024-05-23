import { Box, Typography, Link } from "@mui/material";

import routes from "../routes";

const center = {
  minHeight: "100%",
  flexGrow: "1",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignContent: "center",
};

const NotfoundPage = () => (
  <Box sx={center}>
    <Typography align="center" variant="h6">
      Страница не найдена
    </Typography>
    <Link align="center" href={routes.contentRoute()}>
      На главную
    </Link>
  </Box>
);

export default NotfoundPage;
