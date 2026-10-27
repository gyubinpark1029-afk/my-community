import { createClient } from '@supabase/supabase-js';

// 공개용(publishable) 키라서 브라우저에 노출되어도 안전하다. 실제 보호는 DB의 RLS 정책이 담당한다.
// pkce: 메일 링크의 인증 정보가 ?code= 로 전달되어 HashRouter(#/...)와 충돌하지 않는다.
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY,
  { auth: { flowType: 'pkce' } },
);

export default supabase;
