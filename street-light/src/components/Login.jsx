import React, { useEffect, useState } from 'react'
import Logo from '../images/ventia_logo_black.svg'
import Login_bg from '../images/login-bg.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setValue } from '../redux/loginData';

export default function Login() {
  
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
 
  useEffect(() => {
    if(localStorage.getItem('accessToken')) navigate('/home');
    // eslint-disable-next-line 
  }, [])

  const handleSubmit = async (event) => {
    // event.preventDefault();

    if (true) {
      fetch('https://ventia.atpldhaka.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      .then(response => {
        if (response.ok) {
          navigate('/home');
          response.json().then(data => {
            dispatch(setValue(data))
            localStorage.setItem('ID', data.id);
            localStorage.setItem('accessToken', data.access_token);
          })
        } else {
          response.json().then(data => {
            setErrors(data)
          })
        }
      })
      .catch(error => {
      });

    }
  };

  // const validateForm = () => {
  //   const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]{8,}$/;

  //   let errors = {};
  //   let isValid = true;

  //   if (!email) {
  //     errors.email = "Email is required";
  //     isValid = false;
  //   } else if (!regexEmail.test(email)) {
  //     errors.email = "Email is invalid";
  //     isValid = false;
  //   }

  //   if (!password) {
  //     errors.password = "Password is required";
  //     isValid = false;
  //   } else if (!regexPass.test(password)) {
  //     errors.password = "Password must have at least 1 lowercase letter, 1 uppercase letter, 1 digit, and a minimum length of 8 characters";
  //     isValid = false;
  //   }
  //   setErrors(errors);
  //   return isValid;
  // };

  return (
    <div className='bg-teal-100 w-screen min-h-screen relative flex items-center justify-center'>
      <img className='left-8 top-2 absolute' src={Logo} alt='logo' />
      <div className='flex h-fit rounded-md overflow-hidden drop-shadow-lg mt-12'>
        <div className='w-72 h-[450px] relative  items-center sm:flex hidden'>
          <img className='w-full h-full object-cover' src={Login_bg} alt='login background'/>
          <h1 className='absolute text-white text-2xl font-bold text-center bg-black m-2 p-1 rounded-md bg-opacity-75'>Welcome to Street Light Management System</h1>
        </div>
        <div className='w-72 h-[450px] bg-white flex flex-col gap-1 items-center justify-center'>
          <h1 className='font-extrabold text-xl mb-8'>Login</h1>
          <div className='w-60 text-sm'>
            <h1 className='font-semibold pb-1'>Email</h1>
            <div className='border-b-2 pb-1 flex items-center focus-within:border-teal-400'>
              <svg className='text-teal-400' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12Zm-8 8v-2.8q0-.85.438-1.563T5.6 14.55q1.55-.775 3.15-1.163T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20H4Zm2-2h12v-.8q0-.275-.138-.5t-.362-.35q-1.35-.675-2.725-1.012T12 15q-1.4 0-2.775.338T6.5 16.35q-.225.125-.363.35T6 17.2v.8Zm6-8q.825 0 1.413-.588T14 8q0-.825-.588-1.413T12 6q-.825 0-1.413.588T10 8q0 .825.588 1.413T12 10Zm0-2Zm0 10Z"/></svg>
              <input onKeyDown={e => {if(e.key === "Enter") handleSubmit()}} onChange={e => {setEmail(e.target.value); setErrors(prevErrors => ({...prevErrors, email: ''}))}} className='outline-none w-full pl-1' type='text' placeholder='Type your email'/>
            </div>
            <h1 className="text-xs text-red-400">{errors.email}</h1>
            <h1 className='font-semibold pb-1 pt-4'>Password</h1>
            <div className='border-b-2 pb-1 flex items-center focus-within:border-teal-400'>
              <svg className='text-teal-400' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M6 22q-.825 0-1.413-.588T4 20V10q0-.825.588-1.413T6 8h1V6q0-2.075 1.463-3.538T12 1q2.075 0 3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.588 1.413T18 22H6Zm0-2h12V10H6v10Zm6-3q.825 0 1.413-.588T14 15q0-.825-.588-1.413T12 13q-.825 0-1.413.588T10 15q0 .825.588 1.413T12 17ZM9 8h6V6q0-1.25-.875-2.125T12 3q-1.25 0-2.125.875T9 6v2ZM6 20V10v10Z"/></svg>
              <input onKeyDown={e => {if(e.key === "Enter") handleSubmit()}} onChange={e => {setPassword(e.target.value); setErrors(prevErrors => ({...prevErrors, password: ''}))}} className='outline-none w-full pl-1' type='password' placeholder='Type your password'/>
            </div>
            <h1 className="text-xs text-red-400">{errors.password}</h1>
            <Link to='/forgetpass' className='font-semibold pt-2 hover:text-rose-400 cursor-pointer w-full flex justify-end'>Forget Password?</Link>
            <button onClick={handleSubmit} className='font-semibold w-full mt-6 p-1 text-white bg-gradient-to-r from-teal-400 to-pink-400  hover:drop-shadow-md rounded-full'>LOGIN</button>
          </div>
        </div>
      </div>
    </div>
  )
}