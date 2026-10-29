import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import supabase from '../supabaseClient.js';
import { useAuth } from '../contexts/AuthContext.jsx';

function Header() {
  const { session, profile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <AppBar position="sticky" color="primary" elevation={0}>
      <Toolbar>
        <Box
          component={RouterLink}
          to="/"
          sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'inherit', textDecoration: 'none', flexGrow: 1 }}
        >
          <MenuBookIcon />
          <Typography variant="h6" component="span">
            서랍장
          </Typography>
        </Box>
        {session ? (
          <>
            <Typography sx={{ mr: 2 }}>{profile?.name}님</Typography>
            <Button color="inherit" component={RouterLink} to="/my">
              내 활동
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              로그아웃
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to="/login">
              로그인
            </Button>
            <Button color="inherit" component={RouterLink} to="/signup">
              회원가입
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
