import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Blog from "./components/Blog/Blog"
import Navbar from "./components/Header/Navbar"
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Home from './pages/Blogs/Home';
import BlogRead from './pages/Blogs/BlogRead';
import { useAuthContext } from './hooks/useAuth';
import ProfilePage from './pages/Auth/ProfilePage';
import ProtectedRoute from './components/Routes/ProtectedRoute';

function App() {
  const { isAuthenticated } = useAuthContext();

  return (
    <>
      <Router>
        <Navbar />
        <Routes>

          <Route path='/' element={<Home />} />

          <Route path='/blog-read/:id' element={<BlogRead />} />

          <Route path='/profile' element={<ProtectedRoute element={<ProfilePage />} />} />

          <Route path='/login' element={!isAuthenticated ? <Login /> : <Navigate to='/' />} />

          <Route path='/signup' element={!isAuthenticated ? <Signup /> : <Navigate to='/' />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
