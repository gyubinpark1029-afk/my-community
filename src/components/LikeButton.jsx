import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import supabase from '../supabaseClient.js';
import { useAuth } from '../contexts/AuthContext.jsx';

function LikeButton({ postId }) {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    supabase
      .from('likes')
      .select('user_id')
      .eq('post_id', postId)
      .then(({ data }) => {
        setCount(data?.length ?? 0);
        setIsLiked(Boolean(profile) && data?.some((like) => like.user_id === profile.id));
      });
  }, [postId, profile]);

  const handleClick = async () => {
    if (!profile) {
      navigate('/login');
      return;
    }
    if (isLiked) {
      await supabase.from('likes').delete().match({ post_id: postId, user_id: profile.id });
      setCount(count - 1);
    } else {
      await supabase.from('likes').insert({ post_id: postId, user_id: profile.id });
      setCount(count + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <Button
      variant={isLiked ? 'contained' : 'outlined'}
      color="primary"
      startIcon={isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      onClick={handleClick}
    >
      좋아요 {count}
    </Button>
  );
}

export default LikeButton;
