import { AppBar, Toolbar, Button } from '@mui/material';

import { useAuth } from '../../context/AuthContext';
import routes from '../../routes';

const Header = () => {
  const { logOut, userData } = useAuth();

  return (
    <AppBar position="sticky" sx={{ px: '50px' }}>
      <Toolbar disableGutters sx={{ alignSelf: 'end' }}>
        {userData && <Button href={routes.loginRoute()} color="inherit" onClick={logOut}>Выйти</Button>}
      </Toolbar>
    </AppBar>
  );
};

export default Header;