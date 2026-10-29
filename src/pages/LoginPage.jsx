import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Alert, Button, Link, Paper, Stack, TextField, Typography } from '@mui/material';
import supabase from '../supabaseClient.js';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setIsLoading(false);
    if (error) {
      setErrorMessage('이메일 또는 비밀번호를 확인해 주세요.');
      return;
    }
    navigate('/');
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ p: 4, maxWidth: 400, mx: 'auto' }}>
      <Stack spacing={2}>
        <Typography variant="h5">서랍장에 오신 걸 환영해요 📚</Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <TextField label="이메일" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <TextField label="비밀번호" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" variant="contained" disabled={isLoading}>
          로그인
        </Button>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
          <Link component={RouterLink} to="/find-id" variant="body2">
            아이디 찾기
          </Link>
          <Link component={RouterLink} to="/find-password" variant="body2">
            비밀번호 찾기
          </Link>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          아직 회원이 아니신가요?{' '}
          <Link component={RouterLink} to="/signup">
            회원가입
          </Link>
        </Typography>
      </Stack>
    </Paper>
  );
}

export default LoginPage;
