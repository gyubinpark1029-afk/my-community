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
        boxShadow: (theme) => `0 16px 40px ${theme.palette.primary.main}66`,
        // 분홍 → 노랑 → 하늘 → 민트로 번지는 몽환적인 배경 위에 흰 빛 번짐을 겹친다
        background: (theme) =>
          `radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.55) 0%, transparent 45%), linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 35%, ${theme.palette.secondary.main} 70%, ${theme.palette.success.main} 100%)`,
      }}
    >
      <Stack spacing={3} alignItems="center">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
            borderRadius: '50%',
            bgcolor: 'background.paper',
            boxShadow: 2,
          }}
        >
          <AutoStoriesIcon sx={{ fontSize: 40, color: 'text.primary' }} />
        </Box>
        <Stack spacing={1} alignItems="center">
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: '2.125rem', md: '3rem' }, letterSpacing: 4 }}
          >
            서랍장
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 400, lineHeight: 1.8, maxWidth: 480, color: 'text.primary' }}
          >
            마음에 담아 둔 책 이야기를
            <br />
            서랍처럼 하나씩 꺼내 나누는 곳
          </Typography>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            variant="contained"
            color="inherit"
            size="large"
            startIcon={<CreateIcon />}
            component={RouterLink}
            to={session ? '/posts/new' : '/signup'}
            sx={{ bgcolor: 'background.paper', '&:hover': { bgcolor: 'background.default' } }}
          >
            {session ? '글쓰기' : '함께 시작하기'}
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            onClick={onBrowse}
            sx={{
              color: 'text.primary',
              borderColor: 'text.primary',
              '&:hover': { borderColor: 'text.primary', bgcolor: 'rgba(255, 255, 255, 0.4)' },
            }}
          >
            글 둘러보기
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default HeroSection;
