import { Navigate, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './components/Header.jsx';
import PostListPage from './pages/PostListPage.jsx';
import PostDetailPage from './pages/PostDetailPage.jsx';
import PostWritePage from './pages/PostWritePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import FindIdPage from './pages/FindIdPage.jsx';
import FindPasswordPage from './pages/FindPasswordPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import MyPage from './pages/MyPage.jsx';

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<PostListPage />} />
          <Route path="/posts/new" element={<PostWritePage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/posts/:id/edit" element={<PostWritePage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/find-id" element={<FindIdPage />} />
          <Route path="/find-password" element={<FindPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
