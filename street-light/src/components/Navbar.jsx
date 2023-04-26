import React, { useState } from 'react'
import Logo from '../images/ventia_logo_white.svg'
import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/login');
    console.log("logout")
  }

  return (
    <div className='flex justify-between items-center px-10 py-2 bg-indigo-950 text-white fixed top-0 left-0 w-full z-20'>
        <Link to='/'><img src={Logo} alt='Logo' className=''/></Link>
        <div onClick={()=>setOpen(!open)} className='absolute right-10 z-30 top-3 cursor-pointer sm:hidden'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>
        <div className={`flex flex-col sm:flex-row gap-x-10 gap-y-4 text-sm sm:static absolute bg-indigo-950 px-10 sm:px-0 py-4 sm:py-0 transition-all duration-500 ease-in top-12 ${open ? 'right-0':'right-[-200px]'}`}>
            <Link to='/' className={`hover:text-rose-400 cursor-pointer ${location.pathname === '/' ? 'border-b' : ''}`}>Dashboard</Link>
            <Link to='/inventory' className={`hover:text-rose-400 cursor-pointer ${location.pathname === '/inventory' ? 'border-b' : ''}`}>Inventory</Link>
            <Link to='/view' className={`hover:text-rose-400 cursor-pointer ${location.pathname === '/view' ? 'border-b' : ''}`}>View</Link>
            <Link to='/alarm' className={`hover:text-rose-400 cursor-pointer ${location.pathname === '/alarm' ? 'border-b' : ''}`}>Alarm</Link>
            <Link to='/login' onClick={handleLogout}><svg className='hover:text-rose-400 cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M6 2h9a2 2 0 0 1 2 2v2h-2V4H6v16h9v-2h2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><path fill="currentColor" d="M16.09 15.59L17.5 17l5-5l-5-5l-1.41 1.41L18.67 11H9v2h9.67z"/></svg></Link>
        </div>
    </div>
  )
}
