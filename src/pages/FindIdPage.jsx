import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Link, Paper, Stack, TextField, Typography } from '@mui/material';
import supabase from '../supabaseClient.js';

function FindIdPage() {
  const [form, setForm] = useState({ name: '', phone: '' });
  const [maskedEmail, setMaskedEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setMaskedEmail('');
    const { data, error } = await supabase.rpc('find_masked_email', {
      p_name: form.name,
      p_phone: form.phone,
    });
    setIsLoading(false);
    if (error) setErrorMessage('잠시 후 다시 시도해 주세요.');
    else if (!data) setErrorMessage('일치하는 회원 정보를 찾지 못했어요.');
    else setMaskedEmail(data);
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ p: 4, maxWidth: 400, mx: 'auto' }}>
      <Stack spacing={2}>
        <Typography variant="h5">아이디 찾기</Typography>
        <Typography variant="body2" color="text.secondary">
          가입할 때 적은 이름과 전화번호를 입력해 주세요. (아이디는 이메일이에요)
        </Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {maskedEmail && <Alert severity="success">가입하신 이메일은 {maskedEmail} 입니다.</Alert>}
        <TextField label="이름" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <TextField label="전화번호" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
        <Button type="submit" variant="contained" disabled={isLoading}>
          아이디 찾기
        </Button>
        <Link component={RouterLink} to="/login" variant="body2">
          로그인으로 돌아가기
        </Link>
      </Stack>
    </Paper>
  );
}

export default FindIdPage;
