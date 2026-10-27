import { useEffect, useState } from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import { Alert, Box, Button, Chip, Paper, Rating, Stack, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import supabase from '../supabaseClient.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import formatDate from '../utils/formatDate.js';

function PostListPage() {
  const { session } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    let query = supabase
      .from('posts')
      .select('id, title, keywords, rating, view_count, created_at, users(name), comments(count), likes(count)')
      .order('id', { ascending: false })
      .limit(100);
    if (keyword) query = query.contains('keywords', [keyword]);
    query.then(({ data, error }) => {
      if (error) setErrorMessage('글 목록을 불러오지 못했어요.');
      else setPosts(data);
      setIsLoading(false);
    });
  }, [keyword]);

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h1">책 이야기 서랍 📖</Typography>
        <Button
          variant="contained"
          startIcon={<CreateIcon />}
          component={RouterLink}
          to={session ? '/posts/new' : '/login'}
        >
          글쓰기
        </Button>
      </Stack>
      {keyword && (
        <Box>
          <Chip label={`#${keyword}`} color="warning" onDelete={() => setSearchParams({})} />
        </Box>
      )}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {!isLoading && posts.length === 0 && !errorMessage && (
        <Typography color="text.secondary">아직 글이 없어요. 첫 글을 남겨 보세요!</Typography>
      )}
      {posts.map((post) => (
        <Paper
          key={post.id}
          component={RouterLink}
          to={`/posts/${post.id}`}
          sx={{ p: 2, textDecoration: 'none', color: 'inherit', display: 'block' }}
        >
          <Stack spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" color="text.secondary">
                No.{post.id}
              </Typography>
              <Typography variant="h6">{post.title}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
              {post.rating && <Rating value={post.rating} readOnly size="small" />}
              {post.keywords.map((word) => (
                <Chip key={word} label={`#${word}`} size="small" color="success" />
              ))}
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center" color="text.secondary">
              <Typography variant="body2">{post.users?.name}</Typography>
              <Typography variant="body2">{formatDate(post.created_at)}</Typography>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <VisibilityIcon fontSize="small" />
                <Typography variant="body2">{post.view_count}</Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <FavoriteIcon fontSize="small" />
                <Typography variant="body2">{post.likes[0].count}</Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <ChatBubbleIcon fontSize="small" />
                <Typography variant="body2">{post.comments[0].count}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}

export default PostListPage;
