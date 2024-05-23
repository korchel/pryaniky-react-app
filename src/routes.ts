const apiPath = "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs";

const routes = {
  loginRoute: () => "/login",
  signupRoute: () => "/signup",
  contentRoute: () => "/",
  recoverPasswordRoute: () => "/recover",
  loginPath: () => [apiPath, "login"].join("/"),
};

export default routes;
