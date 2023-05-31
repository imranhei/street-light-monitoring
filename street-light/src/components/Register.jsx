import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [conPassword, setConPassword] = useState();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleRegister = () => {
        fetch('http://ventia.atpldhaka.com/api/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                password_confirmation: conPassword
            })
        })
        .then(response => {
            if (response.ok) {
            // dispatch(logIn())
            navigate('/home');
            } else {
            // Login failed, handle error
            response.json().then(data => {
                setErrors(data)
                console.log(data)
            })
            }
        })
        .catch(error => {
            // Handle network or other error
        });

    }
  
    return (
        <div className='min-w-screen min-h-screen flex justify-center items-center  bg-teal-50'>
            <div className="h-fit w-96 rounded overflow-hidden shadow-md flex justify-center flex-col items-center py-10 gap-4  bg-white">
                <h1 className="font-extrabold text-2xl">Register Account</h1>
                <div className="w-80 flex flex-col gap-2">
                    <div className="flex w-full gap-2">
                        <h1 className='w-16'>Name</h1>
                        <input onChange={e => setName(e.target.value)} type="text" className='bg-transparent border-b border-gray-300 focus:border-teal-400 px-1 flex-1 outline-none'/>
                    </div>
                    <h1 className="text-xs text-red-400">{errors.name}</h1>
                    <div className="flex w-full gap-2">
                        <h1 className='w-16'>Email</h1>
                        <input onChange={e => setEmail(e.target.value)} type="text" className='bg-transparent border-b border-gray-300 focus:border-teal-400 px-1 flex-1 outline-none'/>
                    </div>
                    <h1 className="text-xs text-red-400">{errors.email}</h1>
                    <div className="flex w-full gap-2">
                        <h1 className='w-16'>Password</h1>
                        <input onChange={e => setPassword(e.target.value)} type="text" className='bg-transparent border-b border-gray-300 focus:border-teal-400 px-1 flex-1 outline-none'/>
                    </div>
                    <h1 className="text-xs text-red-400">{errors.password}</h1>
                    <div className="flex w-full gap-2">
                        <h1 className='w-16'>Confirm password</h1>
                        <input onChange={e => setConPassword(e.target.value)} type="text" className='bg-transparent border-b border-gray-300 focus:border-teal-400 px-1 flex-1 outline-none'/>
                    </div>
                    <h1 className="text-xs text-red-400">{errors.password}</h1>
                    <button onClick={handleRegister} className='bg-rose-400 px-5 py-1 rounded mt-4 hover:bg-rose-500 text-white'>Register</button>
                </div>
            </div>
        </div>
    );
}

export default Register;
