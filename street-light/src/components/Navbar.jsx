import React, { useState } from 'react'
import Logo from '../images/ventia_logo_white.svg'
import { Link, useNavigate, useLocation,  } from 'react-router-dom'
import { setValue } from '../redux/loginData';
import { useDispatch, useSelector } from 'react-redux'

export default function Navbar() {
  const dispatch = useDispatch()
  // const token = useSelector(state => state.login.value.id)
  // console.log(token)
  const [open, setOpen] = useState(false)

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // fetch('https://ventia.atpldhaka.com/api/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       email: email,
    //       password: password
    //     })
    //   })
    //   .then(response => {
    //     if (response.ok) {
    //       navigate('/home');
    //       response.json().then(data => {
    //         dispatch(setValue(data))
    //         localStorage.setItem('ID', data.id);
    //         localStorage.setItem('accessToken', data.access_token);
    //         localStorage.setItem('user', data.name);
    //       })
    //     } else {
    //       response.json().then(data => {
    //         setErrors(data)
    //       })
    //     }
    //   })
    //   .catch(error => {
    //   });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('ID');
    dispatch(setValue(null));
    navigate('/');
  }
  const loginInfo = useSelector((state) => state.login.value)

  // if(!loginInfo?.token && !loginInfo?.id) return null;
  return (
    <div className='flex justify-between items-center px-10 py-2 bg-indigo-950 text-white fixed top-0 left-0 w-full z-20'>
        <Link to='/home'><img src={Logo} alt='Logo' className=''/></Link>
        <div onClick={()=>setOpen(!open)} className='absolute right-10 z-30 top-3 cursor-pointer md:hidden'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>
        <div className={`flex flex-col md:flex-row gap-x-10 gap-y-4 text-sm md:static absolute bg-indigo-950 px-10 md:px-0 py-4 md:py-0 transition-all duration-500 ease-in top-12 ${open ? 'right-0':'right-[-200px]'}`}>
            <Link onClick={()=>setOpen(!open)} to='/home' className={`hover:text-cyan-500 cursor-pointer w-fit ${location.pathname === '/home' ? 'border-b' : ''}`}>Dashboard</Link>
            {/* <Link onClick={()=>setOpen(!open)} to='/inventory' className={`hover:text-cyan-500 cursor-pointer w-fit ${location.pathname === '/inventory' ? 'border-b' : ''}`}>Inventory</Link> */}
            <Link onClick={()=>setOpen(!open)} to='/view' className={`hover:text-cyan-500 cursor-pointer w-fit ${location.pathname === '/view' ? 'border-b' : ''}`}>View</Link>
            <Link onClick={()=>setOpen(!open)} to='/alarm' className={`hover:text-cyan-500 cursor-pointer w-fit ${location.pathname === '/alarm' ? 'border-b' : ''}`}>Alarm</Link>
            {/* <Link onClick={()=>setOpen(!open)} to='/profile' className={`hover:text-cyan-500 cursor-pointer w-fit ${location.pathname === '/profile' ? 'border-b' : ''}`}>{loginInfo.name}</Link> */}
            <Link onClick={()=>setOpen(!open)} to='/register' className={`hover:text-cyan-500 cursor-pointer w-fit ${location.pathname === '/register' ? 'border-b' : ''}`}>Add User</Link>
            <Link to='/' onClick={handleLogout}><svg className='hover:text-cyan-500 cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M6 2h9a2 2 0 0 1 2 2v2h-2V4H6v16h9v-2h2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><path fill="currentColor" d="M16.09 15.59L17.5 17l5-5l-5-5l-1.41 1.41L18.67 11H9v2h9.67z"/></svg></Link>
        </div>
    </div>
  )
}
