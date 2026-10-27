import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, IconButton, Paper, Stack, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import supabase from '../supabaseClient.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import formatDate from '../utils/formatDate.js';

function CommentSection({ postId, onCountChange }) {
  const { profile } = useAuth();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');

  const loadComments = useCallback(async () => {
    const { data } = await supabase
      .from('comments')
      .select('id, content, created_at, user_id, users(name)')
      .eq('post_id', postId)
      .order('id');
    setComments(data ?? []);
    onCountChange(data?.length ?? 0);
  }, [postId, onCountChange]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!content.trim()) return;
    const { error } = await supabase
      .from('comments')
      .insert({ content: content.trim(), post_id: postId, user_id: profile.id });
    if (!error) {
      setContent('');
      loadComments();
    }
  };

  const handleDelete = async (commentId) => {
    await supabase.from('comments').delete().eq('id', commentId);
    loadComments();
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6">댓글 {comments.length}</Typography>
      {comments.map((comment) => (
        <Paper key={comment.id} sx={{ p: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Typography variant="body2" color="text.secondary">
                {comment.users?.name} · {formatDate(comment.created_at)}
              </Typography>
              <Typography sx={{ whiteSpace: 'pre-wrap' }}>{comment.content}</Typography>
            </Box>
            {profile?.id === comment.user_id && (
              <IconButton aria-label="댓글 삭제" size="small" onClick={() => handleDelete(comment.id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Stack>
        </Paper>
      ))}
      {profile ? (
        <Stack component="form" direction="row" spacing={1} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            size="small"
            placeholder="따뜻한 댓글을 남겨 주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button type="submit" variant="contained">
            등록
          </Button>
        </Stack>
      ) : (
        <Typography color="text.secondary">
          댓글을 쓰려면 <RouterLink to="/login">로그인</RouterLink>이 필요해요.
        </Typography>
      )}
    </Stack>
  );
}

export default CommentSection;
