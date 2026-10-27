import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CreateIcon from '@mui/icons-material/Create';
import { useAuth } from '../contexts/AuthContext.jsx';

function HeroSection({ onBrowse }) {
  const { session } = useAuth();

  return (
    <Box
      sx={{
        p: { xs: 4, md: 6 },
        borderRadius: 4,
        textAlign: 'center',
        // 분홍 → 노랑 → 하늘 → 민트로 번지는 몽환적인 배경
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 35%, ${theme.palette.secondary.main} 70%, ${theme.palette.success.main} 100%)`,
      }}
    >
      <Stack spacing={2} alignItems="center">
        <AutoStoriesIcon sx={{ fontSize: 48, color: 'text.primary' }} />
        <Typography variant="h1" sx={{ fontSize: { xs: '2.125rem', md: '3rem' } }}>
          서랍장
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 400 }}>
          마음에 담아 둔 책 이야기를
          <br />
          서랍처럼 하나씩 꺼내 나누는 곳
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<CreateIcon />}
            component={RouterLink}
            to={session ? '/posts/new' : '/signup'}
            sx={{ bgcolor: 'background.paper' }}
          >
            {session ? '글쓰기' : '함께 시작하기'}
          </Button>
          <Button variant="outlined" color="inherit" onClick={onBrowse}>
            글 둘러보기
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default HeroSection;
