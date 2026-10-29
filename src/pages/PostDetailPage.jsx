import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { Alert, Box, Button, Chip, Divider, Paper, Rating, Stack, Typography } from '@mui/material';
import supabase from '../supabaseClient.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import formatDate from '../utils/formatDate.js';
import LikeButton from '../components/LikeButton.jsx';
import CommentSection from '../components/CommentSection.jsx';

function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [post, setPost] = useState(null);
  const [commentCount, setCommentCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadPost = async () => {
      // 조회수를 먼저 올린 뒤 글을 읽어 온다.
      await supabase.rpc('increment_view_count', { p_post_id: id });
      const { data, error } = await supabase.from('posts').select('*, users!posts_user_id_fkey(name)').eq('id', id).single();
      if (error) setErrorMessage('글을 찾을 수 없어요.');
      else setPost(data);
    };
    loadPost();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('이 글을 삭제할까요?')) return;
    await supabase.from('posts').delete().eq('id', id);
    navigate('/');
  };

  if (errorMessage) return <Alert severity="error">{errorMessage}</Alert>;
  if (!post) return null;

  return (
    <Stack spacing={3}>
      <Paper sx={{ p: 4 }}>
        <Stack spacing={2}>
          <Typography variant="h1">{post.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {post.users?.name} · 작성 {formatDate(post.created_at)} · 조회 {post.view_count} · 댓글 {commentCount}
          </Typography>
          {post.book_title && (
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
              <Typography variant="subtitle1">
                📖 {post.book_title}
                {post.book_author && ` · ${post.book_author}`}
              </Typography>
              {post.genre && (
                <Chip
                  label={post.genre}
                  size="small"
                  color="secondary"
                  component={RouterLink}
                  to={`/?genre=${encodeURIComponent(post.genre)}`}
                  clickable
                />
              )}
            </Stack>
          )}
          {post.rating && <Rating value={post.rating} readOnly />}
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {post.keywords.map((word) => (
              <Chip
                key={word}
                label={`#${word}`}
                color="success"
                size="small"
                component={RouterLink}
                to={`/?keyword=${encodeURIComponent(word)}`}
                clickable
              />
            ))}
          </Stack>
          <Divider />
          {post.image_url && (
            <Box component="img" src={post.image_url} alt="" sx={{ maxWidth: '100%', borderRadius: 2 }} />
          )}
          <Typography sx={{ whiteSpace: 'pre-wrap' }}>{post.content}</Typography>
          <Stack direction="row" spacing={1}>
            <LikeButton postId={post.id} />
            {profile?.id === post.user_id && (
              <>
                <Button variant="outlined" color="secondary" component={RouterLink} to={`/posts/${post.id}/edit`}>
                  수정
                </Button>
                <Button variant="outlined" onClick={handleDelete}>
                  삭제
                </Button>
              </>
            )}
            <Button component={RouterLink} to="/">
              목록으로
            </Button>
          </Stack>
        </Stack>
      </Paper>
      <CommentSection postId={post.id} onCountChange={setCommentCount} />
    </Stack>
  );
}

export default PostDetailPage;
