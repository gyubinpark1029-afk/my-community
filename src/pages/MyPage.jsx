import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Alert, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext.jsx';
import fetchMyPosts from '../utils/fetchMyPosts.js';
import PostSummaryItem from '../components/PostSummaryItem.jsx';

const TABS = [
  { key: 'written', label: '내가 쓴 글', emptyText: '아직 쓴 글이 없어요.' },
  { key: 'liked', label: '좋아요한 글', emptyText: '아직 좋아요한 글이 없어요.' },
  { key: 'commented', label: '댓글 단 글', emptyText: '아직 댓글을 단 글이 없어요.' },
];

function MyPage() {
  const { session, profile, isLoading } = useAuth();
  const [tabKey, setTabKey] = useState('written');
  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!profile) return;
    // 탭을 빠르게 바꿨을 때 이전 탭의 응답이 덮어쓰지 않도록 막는다.
    let isCancelled = false;
    fetchMyPosts(tabKey, profile.id).then(({ posts: fetchedPosts, error }) => {
      if (isCancelled) return;
      if (error) setErrorMessage('글 목록을 불러오지 못했어요.');
      else setPosts(fetchedPosts);
      setIsLoadingPosts(false);
    });
    return () => {
      isCancelled = true;
    };
  }, [tabKey, profile]);

  const handleChangeTab = (_event, nextTabKey) => {
    setIsLoadingPosts(true);
    setErrorMessage('');
    setTabKey(nextTabKey);
  };

  if (!isLoading && !session) return <Navigate to="/login" replace />;

  const currentTab = TABS.find((tab) => tab.key === tabKey);

  return (
    <Stack spacing={2}>
      <Typography variant="h1">{profile?.name}님의 서랍</Typography>
      <Tabs value={tabKey} onChange={handleChangeTab}>
        {TABS.map((tab) => (
          <Tab key={tab.key} value={tab.key} label={tab.label} />
        ))}
      </Tabs>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {!isLoadingPosts && !errorMessage && posts.length === 0 && (
        <Typography color="text.secondary">{currentTab.emptyText}</Typography>
      )}
      {posts.map((post) => (
        <PostSummaryItem key={post.id} post={post} />
      ))}
    </Stack>
  );
}

export default MyPage;
