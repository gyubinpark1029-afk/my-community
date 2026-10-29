import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, IconButton, Toolbar, Typography, useColorScheme } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import supabase from '../supabaseClient.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import DrawerLogo from './DrawerLogo.jsx';

function Header() {
  const { session, profile } = useAuth();
  const navigate = useNavigate();
  const { mode, systemMode, setMode } = useColorScheme();
  // 모드가 'system'이면 컴퓨터 설정에 따라 실제로 보이는 모드를 계산한다.
  const isDarkMode = (mode === 'system' ? systemMode : mode) === 'dark';

  const handleToggleMode = () => setMode(isDarkMode ? 'light' : 'dark');

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
          <DrawerLogo size={36} />
          <Typography variant="h6" component="span">
            서랍장
          </Typography>
        </Box>
        <IconButton
          color="inherit"
          onClick={handleToggleMode}
          aria-label={isDarkMode ? '라이트 모드로 바꾸기' : '다크 모드로 바꾸기'}
          sx={{ mr: 1 }}
        >
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
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
