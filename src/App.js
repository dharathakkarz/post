
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Nav from './components/Nav';
// import Post from './pages/posts/Post';
import CreatePost from './pages/posts/CreatePost';
import AllUser from './pages/user/AllUser';
import { AuthProvider } from './context/AuthContext';
import SignUp from './pages/user/Signup';
import Login from './pages/user/Login';

function App() {
  return (
    <>
    <AuthProvider>

      <Router>
        <Nav/>
        <Routes>
          <Route path="/" element={<CreatePost />} />
          <Route path='/create-post' element={<CreatePost/>} />
          <Route path='/all-users' element={<AllUser/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/login' element={<Login/>} />

        </Routes>
      </Router>
      </AuthProvider>

    </>
  );
}

export default App;
