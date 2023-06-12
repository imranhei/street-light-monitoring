import React, { useState } from 'react'
import Logo from '../images/ventia_logo_white.svg'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import UserService from '../secureStore/userInfo';
import TokenService from '../secureStore/refreshToken';
import RoleService from '../secureStore/userRole';
import icon from '../images/icon.jpg'
import { useDispatch } from 'react-redux';
import { setValue } from '../redux/loginData';

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const role = RoleService.getUserRole()

  const handleLogout = async () => {
    try {
      const token = TokenService.getToken()
      const response = await fetch('http://ventia.atpldhaka.com/api/auth/logout', {
        method: 'POST',  
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.ok){
        dispatch(setValue(false))
        UserService.removeUser();
        TokenService.removeToken();
        RoleService.removeUserRole();
        localStorage.removeItem('deviceInfo')
        navigate('/login');
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }
  const handleProfile = () => {

  }

  return (
    <div className='flex justify-between items-center px-10 py-2 bg-indigo-950 text-white fixed top-0 left-0 w-full z-20'>
        <Link to='/'><img src={Logo} alt='Logo' className=''/></Link>
        <div onClick={()=>setOpen(!open)} className='absolute right-10 z-30 top-3 cursor-pointer md:hidden'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>
        <div className={`flex flex-col items-center md:flex-row gap-x-10 gap-y-4 text-sm md:static absolute bg-indigo-950 px-10 md:px-0 py-4 md:py-0 transition-all duration-500 ease-in top-12 ${open ? 'right-0':'right-[-200px]'}`}>
            <Link onClick={()=>setOpen(!open)} to='/' className={`hover:text-cyan-500 cursor-pointer w-fit ${location.pathname === '/' ? 'border-b' : ''}`}>Dashboard</Link>
            <Link onClick={()=>setOpen(!open)} to='/view' className={`hover:text-cyan-500 cursor-pointer w-fit ${location.pathname === '/view' ? 'border-b' : ''}`}>View</Link>
            <Link onClick={()=>setOpen(!open)} to='/alarm' className={`hover:text-cyan-500 cursor-pointer w-fit ${location.pathname === '/alarm' ? 'border-b' : ''}`}>Alarm</Link>
            {/* <Link onClick={()=>setOpen(!open)} to='/profile' className={`hover:text-cyan-500 cursor-pointer w-fit ${location.pathname === '/profile' ? 'border-b' : ''}`}>{loginInfo.name}</Link> */}
            {role === "Admin" && <Link onClick={()=>setOpen(!open)} to='/register' className={`hover:text-cyan-500 cursor-pointer w-fit ${location.pathname === '/register' ? 'border-b' : ''}`}>Add User</Link>}
            <div className='relative h-8 w-8 rounded-full bg-teal-200 group'><img className='rounded-full' src={icon} alt="user" />
              <div className="absolute bg-indigo-950 px-2 hidden group-hover:block w-24 -ml-6 pt-6 md:pt-2 mt-1 pb-2">
                <Link to='/profile' className='hover:text-cyan-500 cursor-pointer py-1' onClick={handleProfile}>Profile</Link>
                <Link to='/login' onClick={handleLogout} className='flex items-center gap-1 hover:text-cyan-500 cursor-pointer my-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32v224c0 17.7 14.3 32 32 32s32-14.3 32-32V32zm-144.5 88.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"/></svg>
                  <p>Log Out</p>
                </Link>
              </div>
            </div>
        </div>
    </div>
  )
}
