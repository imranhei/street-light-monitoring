import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgetPass from './components/ForgetPass';
import Login from './components/Login'
import ResetPass from './components/ResetPass';
import Home from './components/Home';
import Alarm from './components/Alarm';
import Navbar from './components/Navbar'
import Inventory from './components/Inventory';
import View from './components/View';
import Profile from './components/Profile';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function App() {
  const isLogin = useSelector((state) => state.login.value.islogin)

  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch('https://mocki.io/v1/d5a5af2f-13ad-4f9b-b6c4-e8695b14da71');
    const jsonData = await response.json();
    setData(jsonData);
  };
  console.log(data, Date.now());

  //https://mocki.io/v1/d5a5af2f-13ad-4f9b-b6c4-e8695b14da71
  return (
    <>
      <div className="App w-full text-sm">
        <Router>
          {
            isLogin ? <Navbar/> : <></>
          }
          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route path="/forgetpass" element={<ForgetPass />} />
            <Route path="/resetpass" element={<ResetPass />} />
            <Route path="/" element={<Login />} />
            <Route path="/alarm" element={<Alarm />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/view" element={<View />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
