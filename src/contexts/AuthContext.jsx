import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../supabaseClient.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setIsLoading(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  // 로그인한 사람의 users 테이블 정보(번호, 이름)를 가져온다.
  useEffect(() => {
    if (!session) {
      setProfile(null);
      return;
    }
    supabase
      .from('users')
      .select('id, name')
      .eq('auth_id', session.user.id)
      .single()
      .then(({ data }) => setProfile(data));
  }, [session]);

  return (
    <AuthContext.Provider value={{ session, profile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
