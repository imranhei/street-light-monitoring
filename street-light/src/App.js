// import './App.css';
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


function App() {
  return (
    <>
      {/* <div className="App"> */}
        <Router>
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/forgetpass" element={<ForgetPass />} />
            <Route path="/resetpass" element={<ResetPass />} />
            <Route path="/login" element={<Login />} />
            <Route path="/alarm" element={<Alarm />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/view" element={<View />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      {/* </div> */}
    </>
  );
}

export default App;
