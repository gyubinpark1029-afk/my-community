import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Alert, Button, Link, Paper, Stack, TextField, Typography } from '@mui/material';
import supabase from '../supabaseClient.js';

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    // 이름과 전화번호는 DB 트리거가 users 테이블로 옮겨 저장한다.
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { name: form.name, phone: form.phone } },
    });
    setIsLoading(false);
    if (error) {
      setErrorMessage(error.message);
      return;
    }
    if (data.session) {
      navigate('/');
    } else {
      setInfoMessage('가입 확인 메일을 보냈어요. 메일의 링크를 누른 뒤 로그인해 주세요.');
    }
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ p: 4, maxWidth: 400, mx: 'auto' }}>
      <Stack spacing={2}>
        <Typography variant="h5">서랍장 회원가입</Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {infoMessage && <Alert severity="success">{infoMessage}</Alert>}
        <TextField label="이름" value={form.name} onChange={handleChange('name')} required />
        <TextField label="이메일" type="email" value={form.email} onChange={handleChange('email')} required />
        <TextField
          label="비밀번호 (6자 이상)"
          type="password"
          value={form.password}
          onChange={handleChange('password')}
          slotProps={{ htmlInput: { minLength: 6 } }}
          required
        />
        <TextField label="전화번호" value={form.phone} onChange={handleChange('phone')} />
        <Button type="submit" variant="contained" disabled={isLoading}>
          가입하기
        </Button>
        <Typography variant="body2" color="text.secondary">
          이미 회원이신가요?{' '}
          <Link component={RouterLink} to="/login">
            로그인
          </Link>
        </Typography>
      </Stack>
    </Paper>
  );
}

export default SignupPage;
