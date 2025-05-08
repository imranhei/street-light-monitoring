import TokenService from "./secureStore/refreshToken";
import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setValue } from "./redux/loginData";
import ForgetPass from "./components/ForgetPass";
import Login from "./components/Login";
import ResetPass from "./components/ResetPass";
import Home from "./components/Home";
import Alarm from "./components/Alarm";
import Milesight from "./components/Milesight";
import Radar from "./components/Radar";
import Navbar from "./components/Navbar";
import View from "./components/View";
import Profile from "./components/Profile";
import Register from "./components/Register";
import PrivateRoutes from "./components/PrivateRoutes";
import Loader from "./components/Loader";
import RoleService from "./secureStore/userRole";
import AWS from "./components/AWS";

function App() {
  const token = TokenService.getToken();
  const role = RoleService.getUserRole();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchData = async () => {
    const profileData = await fetch(
      "https://backend.trafficiot.com/api/auth/profile",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (profileData.ok) {
      const profile = await profileData.json();
      // const isEmpty = Object.keys(profile).length <= 1;
      if(profile.user) {
        dispatch(setValue(true));
        navigate("/");
      }
      // if (isEmpty) navigate("/login");
      // else navigate("/");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoggedIn(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!isLoggedIn) {
    return <Loader className="h-screen"/>;
  }

  return (
    <div className="App w-full text-sm">
      {/* {varified ? <Navbar /> : <></>} */}
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpass" element={<ForgetPass />} />
        <Route path="/resetpass" element={<ResetPass />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/alarm" element={<Alarm />} />
          <Route path="/view" element={<View />} />
          <Route path="/milesight" element={<Milesight />} />
          <Route path="/workzone" element={<Radar />} />
          <Route path="/aws" element={<AWS />} />
          <Route path="/profile" element={<Profile />} />
          {role === "Admin" && (
            <Route path="/register" element={<Register />} />
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
