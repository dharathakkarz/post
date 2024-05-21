
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Nav from './components/Nav';

import CreatePost from './pages/posts/CreatePost';
import AllUser from './pages/user/AllUser';
import { AuthProvider } from './context/AuthContext';
import SignUp from './pages/user/Signup';
import Login from './pages/user/Login';
  import Post from './pages/posts/Post'

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
          <Route path='/post' element={<Post/>}/>
         

        </Routes>
      </Router>
      </AuthProvider>

    </>
  );
}

export default App;
