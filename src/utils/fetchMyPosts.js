import supabase from '../supabaseClient.js';

const POST_FIELDS = 'id, title, book_title, genre, created_at';

// 탭 종류에 따라 내 활동과 관련된 글 목록을 가져온다.
async function fetchMyPosts(tabKey, userId) {
  if (tabKey === 'written') {
    const { data, error } = await supabase
      .from('posts')
      .select(POST_FIELDS)
      .eq('user_id', userId)
      .order('id', { ascending: false });
    return { posts: data ?? [], error };
  }

  if (tabKey === 'liked') {
    const { data, error } = await supabase
      .from('likes')
      .select(`created_at, posts(${POST_FIELDS})`)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { posts: (data ?? []).map((row) => row.posts), error };
  }

  const { data, error } = await supabase
    .from('comments')
    .select(`id, post_id, posts(${POST_FIELDS})`)
    .eq('user_id', userId)
    .order('id', { ascending: false });
  // 같은 글에 댓글을 여러 번 달아도 글은 한 번만 보여준다.
  const uniquePosts = new Map();
  (data ?? []).forEach((row) => uniquePosts.set(row.post_id, row.posts));
  return { posts: [...uniquePosts.values()], error };
}

export default fetchMyPosts;
