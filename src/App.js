import './App.css';
import { Routes, Route} from 'react-router-dom'

import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
// import Profile from './pages/Settings/Profile/Profile';
import News from './pages/News/News';
import NoMatch from './pages/NoMatch/NoMatch';
import About from './pages/About/About';
import NewsDetail from './pages/NewsDetail/NewsDetail';
import CategoryDetail from './pages/CategoryDetail/CategoryDetail';

import Profile from './pages/Settings/Profile/Profile';
import LikeHistory from './pages/Settings/LikeHistory/LikeHistory'
import Notifications from './pages/Settings/Notifications/Notifications'
import ProtectedRoute from './Components/ProtectedRoute';
import Events from './pages/Events/Events';

function App() {
  return (
    <>
        <Routes>
          <Route path="*" element={<NoMatch />} />
          <Route path='/' element={<Home />}></Route>
          <Route path='/register' element={<SignUp/>}></Route>
          <Route path='/login' element={<SignIn/>}></Route>
          <Route path='/news' element={<News/>}></Route>
          <Route path='/news/:category/:slug' element={<NewsDetail />}></Route>
          <Route path='/news/:category' element={<CategoryDetail />}></Route>
          <Route path='/events' element={<Events />}></Route>
          <Route path='/about' element={<About/>}></Route>

          <Route path='/editprofile' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
            }></Route>
          <Route path='/likehistory' element={
            <ProtectedRoute>
              <LikeHistory/>
            </ProtectedRoute>
            }></Route>
          <Route path='/notifications' element={
            <ProtectedRoute>
              <Notifications/>
            </ProtectedRoute>
            }></Route>
        </Routes>
    </>
  );
}

export default App;
