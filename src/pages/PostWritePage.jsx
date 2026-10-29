import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Alert, Box, Button, MenuItem, Paper, Rating, Stack, TextField, Typography } from '@mui/material';
import supabase from '../supabaseClient.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import { GENRES } from '../constants/genres.js';

function PostWritePage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { session, profile, isLoading } = useAuth();
  const [form, setForm] = useState({
    title: '',
    bookTitle: '',
    bookAuthor: '',
    genre: '',
    content: '',
    keywords: '',
    rating: null,
    imageUrl: null,
  });
  const [imageFile, setImageFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (!data) return;
        setForm({
          title: data.title,
          bookTitle: data.book_title ?? '',
          bookAuthor: data.book_author ?? '',
          genre: data.genre ?? '',
          content: data.content,
          keywords: data.keywords.join(', '),
          rating: data.rating,
          imageUrl: data.image_url,
        });
      });
  }, [id, isEdit]);

  const uploadImage = async () => {
    const extension = imageFile.name.split('.').pop();
    const path = `${session.user.id}/${Date.now()}.${extension}`;
    const { error } = await supabase.storage.from('post-images').upload(path, imageFile);
    if (error) throw error;
    return supabase.storage.from('post-images').getPublicUrl(path).data.publicUrl;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setErrorMessage('');
    try {
      const imageUrl = imageFile ? await uploadImage() : form.imageUrl;
      const values = {
        title: form.title.trim(),
        book_title: form.bookTitle.trim(),
        book_author: form.bookAuthor.trim() || null,
        genre: form.genre,
        content: form.content.trim(),
        keywords: form.keywords.split(',').map((word) => word.trim().replace(/^#/, '')).filter(Boolean),
        rating: form.rating,
        image_url: imageUrl,
      };
      const query = isEdit
        ? supabase.from('posts').update(values).eq('id', id)
        : supabase.from('posts').insert({ ...values, user_id: profile.id });
      const { data, error } = await query.select('id').single();
      if (error) throw error;
      navigate(`/posts/${data.id}`);
    } catch {
      setErrorMessage('저장하지 못했어요. 잠시 후 다시 시도해 주세요.');
      setIsSaving(false);
    }
  };

  if (!isLoading && !session) return <Navigate to="/login" replace />;

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
      <Stack spacing={2}>
        <Typography variant="h5">{isEdit ? '글 수정' : '새 글 쓰기'}</Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <TextField label="제목" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <TextField
          label="책 제목"
          value={form.bookTitle}
          onChange={(e) => setForm({ ...form, bookTitle: e.target.value })}
          required
        />
        <TextField
          label="저자"
          value={form.bookAuthor}
          onChange={(e) => setForm({ ...form, bookAuthor: e.target.value })}
        />
        <TextField
          select
          label="장르"
          value={form.genre}
          onChange={(e) => setForm({ ...form, genre: e.target.value })}
          required
        >
          {GENRES.map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="내용"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          multiline
          minRows={8}
          required
        />
        <TextField
          label="키워드 (쉼표로 구분)"
          placeholder="에세이, 위로, 여행"
          value={form.keywords}
          onChange={(e) => setForm({ ...form, keywords: e.target.value })}
        />
        <Box>
          <Typography component="legend" variant="body2" color="text.secondary">
            별점
          </Typography>
          <Rating value={form.rating} onChange={(_e, value) => setForm({ ...form, rating: value })} />
        </Box>
        <Box>
          <Button variant="outlined" color="secondary" component="label">
            사진 선택
            <input hidden type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
          </Button>
          <Typography component="span" variant="body2" sx={{ ml: 2 }}>
            {imageFile ? imageFile.name : form.imageUrl ? '등록된 사진이 있어요' : ''}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button type="submit" variant="contained" disabled={isSaving || !profile}>
            {isEdit ? '수정하기' : '등록하기'}
          </Button>
          <Button onClick={() => navigate(-1)}>취소</Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default PostWritePage;
