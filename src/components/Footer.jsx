import { Box, Container, Link, Stack, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const REPOSITORY_URL = 'https://github.com/gyubinpark1029-afk/my-community';
const CURRENT_YEAR = new Date().getFullYear();

function Footer() {
  return (
    <Box component="footer" sx={{ py: 3, borderTop: 1, borderColor: 'divider' }}>
      <Container maxWidth="md">
        <Stack spacing={1} sx={{ alignItems: 'center', textAlign: 'center' }}>
          <Typography variant="subtitle1">📖 서랍장</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'keep-all', textWrap: 'balance' }}>
            마음에 담아 둔 책 이야기를 서랍처럼 하나씩 꺼내 나누는 곳
          </Typography>
          <Link
            href={REPOSITORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            color="text.secondary"
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            <GitHubIcon fontSize="small" />
            <Typography variant="body2" component="span">
              문의 및 소스 코드
            </Typography>
          </Link>
          <Typography variant="caption" color="text.secondary">
            © {CURRENT_YEAR} 서랍장. All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
