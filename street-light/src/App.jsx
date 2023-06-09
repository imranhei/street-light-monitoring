import UserService from './secureStore/userInfo';
import TokenService from './secureStore/refreshToken';
import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setValue } from './redux/loginData'
import ForgetPass from './components/ForgetPass';
import Login from './components/Login'
import ResetPass from './components/ResetPass';
import Home from './components/Home';
import Alarm from './components/Alarm';
import Navbar from './components/Navbar'
import View from './components/View';
import Profile from './components/Profile'; 
import Register from './components/Register';
import PrivateRoutes from './components/PrivateRoutes';
import Loader from './components/Loader';;

function App() {
  const token = TokenService.getToken();
  const user = UserService.getUser()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const varified = useSelector(state => state.login.value);
  
  const fetchData = async () => {
    const profileData = await fetch('http://ventia.atpldhaka.com/api/auth/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (profileData.ok) {
      dispatch(setValue(true))
      const profile = await profileData.json();
      const isEmpty = Object.keys(profile).length === 0;
      if (isEmpty) navigate('/login');
      else navigate('/');
      // setIsLoggedIn(true);
    } else {
      // setIsLoggedIn(true);
      navigate('/login');
    }
  }

  useEffect(() => {
    fetchData();
  }, [token]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoggedIn(true);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!isLoggedIn) {
    return <Loader />;
  }

  return (
    <div className="App w-full text-sm">
      {varified ? <Navbar /> : <></>}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpass" element={<ForgetPass />} />
        <Route path="/resetpass" element={<ResetPass />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/alarm" element={<Alarm />} />
          <Route path="/view" element={<View />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
