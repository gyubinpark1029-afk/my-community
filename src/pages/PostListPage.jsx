import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import { Alert, Box, Button, Chip, Paper, Rating, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import supabase from '../supabaseClient.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import formatDate from '../utils/formatDate.js';
import HeroSection from '../components/HeroSection.jsx';
import { GENRES } from '../constants/genres.js';

function PostListPage() {
  const { session } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const genre = searchParams.get('genre');
  const sort = searchParams.get('sort') === 'likes' ? 'likes' : 'latest';
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    let query = supabase
      .from('posts')
      .select('id, title, book_title, book_author, genre, keywords, rating, view_count, created_at, users!posts_user_id_fkey(name), comments(count), likes(count)')
      .order('id', { ascending: false })
      .limit(100);
    if (keyword) query = query.contains('keywords', [keyword]);
    if (genre) query = query.eq('genre', genre);
    query.then(({ data, error }) => {
      if (error) setErrorMessage('글 목록을 불러오지 못했어요.');
      else setPosts(data);
      setIsLoading(false);
    });
  }, [keyword, genre]);

  const handleBrowse = () => {
    listRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 다른 필터는 그대로 두고 주소의 값 하나만 바꾼다. value가 비어 있으면 지운다.
  const updateParam = (name, value) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value) nextParams.set(name, value);
    else nextParams.delete(name);
    setSearchParams(nextParams);
  };

  const handleSelectGenre = (selectedGenre) => updateParam('genre', selectedGenre);

  const handleClearKeyword = () => updateParam('keyword', null);

  // 이미 불러온 글(최대 100개) 안에서 좋아요 많은 순으로 다시 늘어놓는다.
  const sortedPosts =
    sort === 'likes'
      ? [...posts].sort((a, b) => b.likes[0].count - a.likes[0].count || b.id - a.id)
      : posts;

  const handleChangeSort = (_event, nextSort) => {
    // 이미 선택된 버튼을 다시 누르면 null이 오므로 무시한다.
    if (nextSort) updateParam('sort', nextSort === 'likes' ? 'likes' : null);
  };

  return (
    <Stack spacing={2}>
      {!keyword && !genre && <HeroSection onBrowse={handleBrowse} />}
      <Stack ref={listRef} direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 2 }}>
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
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Chip
          label="전체"
          color="primary"
          variant={genre ? 'outlined' : 'filled'}
          onClick={() => handleSelectGenre(null)}
        />
        {GENRES.map((item) => (
          <Chip
            key={item}
            label={item}
            color="primary"
            variant={genre === item ? 'filled' : 'outlined'}
            onClick={() => handleSelectGenre(item)}
          />
        ))}
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>{keyword && <Chip label={`#${keyword}`} color="warning" onDelete={handleClearKeyword} />}</Box>
        <ToggleButtonGroup size="small" exclusive value={sort} onChange={handleChangeSort}>
          <ToggleButton value="latest">최신순</ToggleButton>
          <ToggleButton value="likes">좋아요순</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {!isLoading && posts.length === 0 && !errorMessage && (
        <Typography color="text.secondary">아직 글이 없어요. 첫 글을 남겨 보세요!</Typography>
      )}
      {sortedPosts.map((post) => (
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
            {post.book_title && (
              <Typography variant="body2" color="text.secondary">
                📖 {post.book_title}
                {post.book_author && ` · ${post.book_author}`}
              </Typography>
            )}
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
              {post.genre && <Chip label={post.genre} size="small" color="secondary" />}
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
