import { createTheme } from '@mui/material/styles';

// 서랍장 파스텔 팔레트: 분홍(primary), 하늘(secondary), 노랑(warning), 민트(success)
const theme = createTheme({
  palette: {
    primary: { main: '#f8b4cb', contrastText: '#4a3b47' },
    secondary: { main: '#a8d8f0', contrastText: '#3b4a52' },
    warning: { main: '#ffe9a8', contrastText: '#4a432b' },
    success: { main: '#b5ead7', contrastText: '#2f4a3f' },
    background: { default: '#fff8fb', paper: '#ffffff' },
    text: { primary: '#4a3b47', secondary: '#8a7a86' },
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
        body: {
          minHeight: '100vh',
          background:
            'linear-gradient(160deg, #fff0f6 0%, #eaf6fd 50%, #eafaf3 100%) fixed',
        },
      },
    },
    MuiButton: {
      styleOverrides: { root: { textTransform: 'none', fontWeight: 500 } },
    },
    MuiPaper: {
      styleOverrides: { root: { boxShadow: '0 8px 24px rgba(248, 180, 203, 0.25)' } },
    },
  },
});

export default theme;
