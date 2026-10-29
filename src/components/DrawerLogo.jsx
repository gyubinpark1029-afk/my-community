import { Box } from '@mui/material';
import { keyframes } from '@mui/material/styles';

const float = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(-4px); }
`;

// 색은 테마 CSS 변수를 써서 라이트/다크 모드에 맞게 바뀐다.
const INK = 'var(--mui-palette-text-primary)';
const BODY = 'var(--mui-palette-warning-main)';
const BOOK = 'var(--mui-palette-success-main)';
const BLUSH = 'var(--mui-palette-primary-main)';
const KNOB = 'var(--mui-palette-secondary-main)';

// 웃는 얼굴의 서랍장 캐릭터. 맨 위 서랍에서 책이 살짝 삐져나와 있다.
function DrawerLogo({ size = 64 }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden="true"
      sx={{
        animation: `${float} 2.4s ease-in-out infinite alternate`,
        // 움직임이 불편한 사람을 위해 모션 줄이기 설정을 따른다
        '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
      }}
    >
      <g stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="20" y="6" width="24" height="18" rx="3" fill={BOOK} />
        <line x1="32" y1="8" x2="32" y2="20" />
        <rect x="10" y="18" width="44" height="40" rx="8" fill={BODY} />
        <line x1="10" y1="38" x2="54" y2="38" />
        <circle cx="32" cy="48" r="3" fill={KNOB} strokeWidth="1.5" />
        <path d="M29 30 Q32 34 35 30" fill="none" />
        <path d="M52 5 L53.5 9 L57.5 10.5 L53.5 12 L52 16 L50.5 12 L46.5 10.5 L50.5 9 Z" fill={BLUSH} strokeWidth="1" />
      </g>
      <circle cx="24" cy="27" r="2" fill={INK} />
      <circle cx="40" cy="27" r="2" fill={INK} />
      <ellipse cx="19" cy="31" rx="3" ry="2" fill={BLUSH} opacity="0.8" />
      <ellipse cx="45" cy="31" rx="3" ry="2" fill={BLUSH} opacity="0.8" />
      <rect x="16" y="58" width="6" height="4" rx="2" fill={INK} />
      <rect x="42" y="58" width="6" height="4" rx="2" fill={INK} />
    </Box>
  );
}

export default DrawerLogo;
