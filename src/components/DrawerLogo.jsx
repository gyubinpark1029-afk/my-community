import { Box } from '@mui/material';

// 색은 테마 CSS 변수를 써서 라이트/다크 모드에 맞게 바뀐다.
const INK = 'var(--mui-palette-text-primary)';
const PAPER = 'var(--mui-palette-background-paper)';
const BOOK_PINK = 'var(--mui-palette-primary-main)';
const BOOK_SKY = 'var(--mui-palette-secondary-main)';
const BOOK_MINT = 'var(--mui-palette-success-main)';

// 서랍장 위에 책 세 권이 꽂혀 있는 미니멀한 선 로고.
function DrawerLogo({ size = 64 }) {
  return (
    <Box component="svg" viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <g stroke={INK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="15" y="9" width="8" height="17" rx="1.5" fill={BOOK_PINK} />
        <rect x="25" y="14" width="8" height="12" rx="1.5" fill={BOOK_SKY} />
        <rect x="35" y="6" width="8" height="20" rx="1.5" fill={BOOK_MINT} />
        <rect x="9" y="26" width="46" height="30" rx="5" fill={PAPER} />
        <line x1="9" y1="41" x2="55" y2="41" />
        <line x1="26" y1="33.5" x2="38" y2="33.5" />
        <line x1="26" y1="48.5" x2="38" y2="48.5" />
      </g>
    </Box>
  );
}

export default DrawerLogo;
