import { createTheme } from '@mui/material/styles';

// 서랍장 파스텔 팔레트: 분홍(primary), 하늘(secondary), 노랑(warning), 민트(success)
// 다크 모드는 같은 색감을 밤하늘처럼 한 단계 차분하게 만든 버전이다.
const theme = createTheme({
  // data-mui-color-scheme 속성으로 모드를 바꾸므로 직접 고른 모드가 시스템 설정보다 우선한다.
  cssVariables: { colorSchemeSelector: 'data' },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#f8b4cb', contrastText: '#4a3b47' },
        secondary: { main: '#a8d8f0', contrastText: '#3b4a52' },
        warning: { main: '#ffe9a8', contrastText: '#4a432b' },
        success: { main: '#b5ead7', contrastText: '#2f4a3f' },
        background: { default: '#fff8fb', paper: '#ffffff' },
        text: { primary: '#4a3b47', secondary: '#8a7a86' },
      },
    },
    dark: {
      palette: {
        primary: { main: '#e59ab6', contrastText: '#2d1f27' },
        secondary: { main: '#8cc4e0', contrastText: '#16262e' },
        warning: { main: '#e8cf86', contrastText: '#2e2812' },
        success: { main: '#92d0b6', contrastText: '#14291f' },
        background: { default: '#1c1820', paper: '#282230' },
        text: { primary: '#f3e8ee', secondary: '#b8a8b4' },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Malgun Gothic", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.125rem',
      fontWeight: 500,
    },
  },
  shape: { borderRadius: 16 },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // 몽환적인 분위기를 위한 은은한 그라데이션 배경
        body: ({ theme: currentTheme }) => ({
          minHeight: '100vh',
          background: 'linear-gradient(160deg, #fff0f6 0%, #eaf6fd 50%, #eafaf3 100%) fixed',
          ...currentTheme.applyStyles('dark', {
            background: 'linear-gradient(160deg, #241c2a 0%, #1a2230 50%, #182622 100%) fixed',
          }),
        }),
      },
    },
    MuiButton: {
      styleOverrides: { root: { textTransform: 'none', fontWeight: 500 } },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme: currentTheme }) => ({
          boxShadow: '0 8px 24px rgba(248, 180, 203, 0.25)',
          ...currentTheme.applyStyles('dark', {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
          }),
        }),
      },
    },
  },
});

export default theme;
