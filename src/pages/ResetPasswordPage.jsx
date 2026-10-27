import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Alert, Button, Link, Paper, Stack, TextField, Typography } from '@mui/material';
import supabase from '../supabaseClient.js';
import { useAuth } from '../contexts/AuthContext.jsx';

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { session, isLoading: isAuthLoading } = useAuth();
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    const { error } = await supabase.auth.updateUser({ password });
    setIsLoading(false);
    if (error) setErrorMessage(error.message);
    else navigate('/');
  };

  // 메일 링크로 들어오면 자동으로 로그인 상태가 되므로, 세션이 없으면 잘못된 접근이다.
  if (!isAuthLoading && !session) {
    return (
      <Paper sx={{ p: 4, maxWidth: 400, mx: 'auto' }}>
        <Stack spacing={2}>
          <Alert severity="warning">링크가 만료되었거나 올바르지 않아요.</Alert>
          <Link component={RouterLink} to="/find-password">
            비밀번호 찾기 다시 하기
          </Link>
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ p: 4, maxWidth: 400, mx: 'auto' }}>
      <Stack spacing={2}>
        <Typography variant="h5">새 비밀번호 정하기</Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <TextField
          label="새 비밀번호 (6자 이상)"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          slotProps={{ htmlInput: { minLength: 6 } }}
          required
        />
        <Button type="submit" variant="contained" disabled={isLoading}>
          비밀번호 변경
        </Button>
      </Stack>
    </Paper>
  );
}

export default ResetPasswordPage;
