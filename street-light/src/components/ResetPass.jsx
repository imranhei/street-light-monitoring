import React, { useState } from 'react'
import Logo from '../images/ventia_logo_black.svg'
import Login_bg from '../images/login-bg.jpg'
import { Link } from 'react-router-dom';

export default function Login() {
  const [pass, setPass] = useState('');
  const [conPass, setConPass] = useState('');
  const handleSubmit = () => {
    console.log(conPass, pass)
  }
  
  return (
    <div className='bg-teal-100 w-screen min-h-screen relative flex items-center justify-center'>
      <img className='left-8 top-2 absolute' src={Logo} alt='logo' />
      <div className='flex h-fit rounded-md overflow-hidden drop-shadow-lg my-12'>
        <div className='w-72 h-[450px] relative  items-center sm:flex hidden'>
          <img className='w-full h-full object-cover' src={Login_bg} alt='login background'/>
          <h1 className='absolute text-white text-2xl font-bold text-center bg-black m-2 p-1 rounded-md bg-opacity-75'>Welcome to Street Light Management System</h1>
        </div>
        <div className='w-72 h-[450px] bg-white flex flex-col gap-1 items-center justify-center'>
          <h1 className='font-extrabold text-xl mb-8 '>Reset Your Password</h1>
          <div className='w-60 text-sm'>
            <h1 className='font-semibold pb-1'>Password</h1>
            <div className='border-b-2 pb-1 flex items-center focus-within:border-teal-400'>
              <svg className='text-teal-400' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M6 22q-.825 0-1.413-.588T4 20V10q0-.825.588-1.413T6 8h1V6q0-2.075 1.463-3.538T12 1q2.075 0 3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.588 1.413T18 22H6Zm0-2h12V10H6v10Zm6-3q.825 0 1.413-.588T14 15q0-.825-.588-1.413T12 13q-.825 0-1.413.588T10 15q0 .825.588 1.413T12 17ZM9 8h6V6q0-1.25-.875-2.125T12 3q-1.25 0-2.125.875T9 6v2ZM6 20V10v10Z"/></svg>
              <input onChange={e => setPass(e.target.value)} className='outline-none w-full pl-1' type='text' placeholder='Type your new password'/>
            </div>
            <h1 className='font-semibold pb-1 pt-4'>Confirm Password</h1>
            <div className='border-b-2 pb-1 flex items-center focus-within:border-teal-400'>
              <svg className='text-teal-400' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M6 22q-.825 0-1.413-.588T4 20V10q0-.825.588-1.413T6 8h1V6q0-2.075 1.463-3.538T12 1q2.075 0 3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.588 1.413T18 22H6Zm0-2h12V10H6v10Zm6-3q.825 0 1.413-.588T14 15q0-.825-.588-1.413T12 13q-.825 0-1.413.588T10 15q0 .825.588 1.413T12 17ZM9 8h6V6q0-1.25-.875-2.125T12 3q-1.25 0-2.125.875T9 6v2ZM6 20V10v10Z"/></svg>
              <input onChange={e => setConPass(e.target.value)} className='outline-none w-full pl-1' type='password' placeholder='Re-write your password'/>
            </div>
            <button onClick={handleSubmit} className='font-semibold w-full mt-6 p-1 text-white bg-gradient-to-r from-teal-400 to-pink-400  hover:drop-shadow-md rounded-full'>Reset Password</button>
          <h1 className='text-center pt-8'>Or Go to Login Page</h1>
          <Link to='/' className='mt-2 text-teal-400 font-semibold hover:text-blue-500 flex justify-center'>Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
