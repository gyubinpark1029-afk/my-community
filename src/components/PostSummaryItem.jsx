import { Link as RouterLink } from 'react-router-dom';
import { Chip, Paper, Stack, Typography } from '@mui/material';
import formatDate from '../utils/formatDate.js';

function PostSummaryItem({ post }) {
  return (
    <Paper
      component={RouterLink}
      to={`/posts/${post.id}`}
      sx={{ p: 2, textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <Stack spacing={1}>
        <Typography variant="h6">{post.title}</Typography>
        {post.book_title && (
          <Typography variant="body2" color="text.secondary">
            📖 {post.book_title}
          </Typography>
        )}
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          {post.genre && <Chip label={post.genre} size="small" color="secondary" />}
          <Typography variant="body2" color="text.secondary">
            {formatDate(post.created_at)}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default PostSummaryItem;
