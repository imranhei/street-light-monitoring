import React, { useEffect, useState } from 'react';
import icon from '../images/icon.jpg'
import UserService from '../secureStore/userInfo';
import TokenService from '../secureStore/refreshToken';
import { ToastContainer, toast } from 'react-toastify';

const Profile = () => {
    const [current_pass, setCurrent_pass] = useState();
    const [new_pass, setNew_pass] = useState();
    const [confirm_pass, setConfirm_pass] = useState();
    const token = TokenService.getToken()
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const user = UserService.getUser();

    useEffect(() => {
        setEmail(user.name);
        setName(user.email)
    }, [])

    const handleSave = () => {
        const formData = new FormData();
        formData.append('current_password', current_pass);
        formData.append('new_password', new_pass);
        formData.append('new_password_confirmation', confirm_pass);
        fetch('http://ventia.atpldhaka.com/api/auth/change-password', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        }).then(response => {
            response.json().then(data => {
                toast(data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
            });
            
        }).catch(error => {
            alert(error)
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'cur_pass':
                setCurrent_pass(value);
                break;
            case 'new_pass':
                setNew_pass(value);
                break;
            case 'con_pass':
                setConfirm_pass(value);
                break;
            default:
                break;
        }
    };

    return (
        <div className='mt-16 m-4 flex gap-4'>
            <div className="flex flex-col justify-center items-center shadow rounded p-4 w-1/3 min-w-96 border gap-2 h-fit py-20">
                <div className="h-16 w-16 rounded-full overflow-hidden">
                    <img src={icon} alt="profile" />
                </div>
                <p className='font-semibold text-teal-600'>{name}</p>
                <p  className='text-orange-400'>{email}</p>
            </div>
            <div className="flex flex-col shadow rounded p-4 flex-1 border gap-2">
                <p className='font-semibold text-teal-600'>Current password</p>
                <input className='border-b w-96 outline-none focus:border-teal-400' type="text" name="cur_pass" value={current_pass} onChange={handleChange} placeholder='Write your current password'/>
                <p className='font-semibold text-teal-600'>New Password</p>
                <input className='border-b w-96 outline-none focus:border-teal-400' type="text" name="new_pass" value={new_pass} onChange={handleChange} placeholder='Write your new password'/>
                <p className='font-semibold text-teal-600'>Confirm password</p>
                <input className='border-b w-96 outline-none focus:border-teal-400' type="text" name="con_pass" value={confirm_pass} onChange={handleChange} placeholder='Cinfirm password'/>
                <button className='bg-green-400 py-1 rounded-sm text-white' onClick={handleSave}>Save</button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Profile;
