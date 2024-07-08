import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [conPassword, setConPassword] = useState();
  const [designation, setDesignation] = useState();
  const [picture, setPicture] = useState();
  const [comment, setComment] = useState();
  const [phone, setPhone] = useState();
  const [errors, setErrors] = useState({});
  const [selectedRole, setSelectedRole] = useState("");
  const roles = ["Admin", "User"];

  const handleRegister = () => {
    fetch("https://backend.trafficiot.com/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        password_confirmation: conPassword,
        role_id: selectedRole === "Admin" ? 1 : 2,
        designation: designation,
        picture: picture,
        comments: comment,
        phone_number: phone,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
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
            resetAll();
          });
        } else {
          // Login failed, handle error
          response.json().then((data) => {
            setErrors(data);
            console.log(data);
          });
        }
      })
      .catch((error) => {
        // Handle network or other error
      });
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const resetAll = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConPassword("");
    setDesignation("");
    setPicture("");
    setComment("");
    setPhone("");
    setErrors({});
    setSelectedRole("");
  };

  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center  bg-teal-50">
      <div className="h-fit w-96 rounded overflow-hidden shadow-md flex justify-center flex-col items-center py-10 gap-4  bg-white">
        <h1 className="font-extrabold text-2xl">Register Account</h1>
        <div className="w-80 flex flex-col gap-2">
          <div className="flex w-full gap-2">
            <h1 className="w-24">
              Name<span className="text-red-400"> *</span> :
            </h1>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="bg-transparent border-b border-gray-300 focus:border-teal-400 px-1 flex-1 outline-none"
            />
          </div>
          <h1 className="text-xs text-red-400">{errors.name}</h1>
          <div className="flex w-full gap-2">
            <h1 className="w-24">
              Email<span className="text-red-400"> *</span> :
            </h1>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="bg-transparent border-b border-gray-300 focus:border-teal-400 px-1 flex-1 outline-none"
            />
          </div>
          <h1 className="text-xs text-red-400">{errors.email}</h1>
          <div className="flex w-full gap-2">
            <h1 className="w-24">
              Password <span className="text-red-400">*</span> :
            </h1>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="bg-transparent border-b border-gray-300 focus:border-teal-400 px-1 flex-1 outline-none"
            />
          </div>
          <h1 className="text-xs text-red-400">{errors.password}</h1>
          <div className="flex w-full gap-2">
            <h1 className="w-24">
              Confirm password <span className="text-red-400">*</span> :
            </h1>
            <input
              onChange={(e) => setConPassword(e.target.value)}
              type="password"
              className="bg-transparent border-b border-gray-300 focus:border-teal-400 px-1 flex-1 outline-none"
            />
          </div>
          <h1 className="text-xs text-red-400">{errors.password}</h1>
          <div className="flex w-full gap-2">
            <label className="w-24" htmlFor="role">
              Select Role<span className="text-red-400">*</span>:
            </label>
            <select
              className="border outline-none"
              id="role"
              value={selectedRole}
              onChange={handleRoleChange}
            >
              <option value="">Select...</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <h1 className="text-xs text-red-400">{errors.password}</h1>
          <div className="flex w-full gap-2">
            <h1 className="w-24">Designation :</h1>
            <input
              onChange={(e) => setDesignation(e.target.value)}
              type="text"
              className="bg-transparent border-b border-gray-300 focus:border-teal-400 px-1 flex-1 outline-none"
            />
          </div>
          <h1 className="text-xs text-red-400">{errors.designation}</h1>
          <div className="flex w-full gap-2">
            <h1 className="w-24">Picture</h1>
            <input
              onChange={(e) => setPicture(e.target.value)}
              type="file"
              className="bg-transparent border-gray-300 focus:border-teal-400 px-1 flex-1 outline-none"
            />
          </div>
          <h1 className="text-xs text-red-400">{errors.picture}</h1>
          <div className="flex w-full gap-2">
            <h1 className="w-24">Comment :</h1>
            <input
              onChange={(e) => setComment(e.target.value)}
              type="text"
              className="bg-transparent border-b border-gray-300 focus:border-teal-400 px-1 flex-1 outline-none"
            />
          </div>
          <h1 className="text-xs text-red-400">{errors.comment}</h1>
          <div className="flex w-full gap-2">
            <h1 className="w-24">Phone :</h1>
            <input
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              className="bg-transparent border-b border-gray-300 focus:border-teal-400 px-1 flex-1 outline-none"
            />
          </div>
          <h1 className="text-xs text-red-400">{errors.phone}</h1>
          <button
            onClick={handleRegister}
            className="bg-rose-400 px-5 py-1 rounded mt-4 hover:bg-rose-500 text-white"
          >
            Register
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
