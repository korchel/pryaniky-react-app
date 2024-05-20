const apiPath = 'https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs';

const routes = {
  loginRoute: () => '/login',
  signupRoute: () => '/signup',
  recoverPasswordRoute: () => '/login',
  loginPath: () => [apiPath, 'login'].join('/'),
};

export default routes;