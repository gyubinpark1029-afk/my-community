import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Link, Paper, Stack, TextField, Typography } from '@mui/material';
import supabase from '../supabaseClient.js';

function FindPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    // 메일 링크를 누르면 비밀번호 재설정 화면으로 돌아오도록 주소를 지정한다.
    const redirectTo = `${window.location.origin}${import.meta.env.BASE_URL}#/reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    setIsLoading(false);
    if (error) setErrorMessage('메일을 보내지 못했어요. 잠시 후 다시 시도해 주세요.');
    else setIsSent(true);
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ p: 4, maxWidth: 400, mx: 'auto' }}>
      <Stack spacing={2}>
        <Typography variant="h5">비밀번호 찾기</Typography>
        <Typography variant="body2" color="text.secondary">
          가입한 이메일로 비밀번호를 다시 정하는 링크를 보내 드려요.
        </Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {isSent && (
          <Alert severity="success">가입된 이메일이라면 재설정 메일이 곧 도착해요. 스팸함도 확인해 주세요.</Alert>
        )}
        <TextField label="이메일" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Button type="submit" variant="contained" disabled={isLoading}>
          재설정 메일 보내기
        </Button>
        <Link component={RouterLink} to="/login" variant="body2">
          로그인으로 돌아가기
        </Link>
      </Stack>
    </Paper>
  );
}

export default FindPasswordPage;
