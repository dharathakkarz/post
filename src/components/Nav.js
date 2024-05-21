
import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, Container } from '@mui/material';
import { useNavigate , useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.setItem('isLoggedIn', 'false');
    // navigate('/login');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ color: 'red' }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            POST
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {isLoggedIn ? (
              <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => navigate('/login')}>
                Login
              </Button>
            )}
             {location.pathname !== '/' && (
              <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => navigate('/')}>
                Post
              </Button>
            )}
            {location.pathname !== '/all-users' && (
              <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => navigate('/all-users')}>
                Users
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;


