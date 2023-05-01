import React, { useState } from 'react'
import Forget_pass from '../images/forgot_password.svg';
import Logo from '../images/ventia_logo_black.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgetPass() {
  const [email, setEmail] = useState();

    const handleNext = () => {
        console.log("Next")
        toast(`Reset link is sent into this email address ${email}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
    }
    

  return (
    <div className='w-screen min-h-screen bg-teal-100 flex items-center justify-center relative gap-10 flex-col md:flex-row py-20'>
        <img className='left-8 top-2 absolute' src={Logo} alt='logo' />
        <img className='h-56' src={Forget_pass} alt='forget pass graphics'/>
        <div className=''>
            <h1 className='text-5xl font-extrabold pb-4'>Forget<br/>Password?</h1>
            <h1 className='mb-8'>Please enter your email address below</h1>
            <input onChange={e => setEmail(e.target.value)} type='email' className='w-[275px] outline-none bg-transparent text-teal-500 font-semibold border-b-2 focus:border-teal-400 border-teal-200' placeholder='Email address'/>
            <br/>
            <button onClick={handleNext} className='ml-52 bg-teal-400 border border-transparent px-4 mt-4 rounded-sm text-white font-semibold hover:text-teal-400 hover:bg-transparent hover:border-teal-400'>Next</button>
        </div>
        <ToastContainer />
    </div>
  )
}
