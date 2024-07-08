import React, { useState } from "react";
import Forget_pass from "../images/forgot_password.svg";
import Logo from "../images/ventia_logo_black.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function ForgetPass() {
  const [email, setEmail] = useState();
  const [error, setError] = useState();

  const handleNext = () => {
    fetch("https://backend.trafficiot.com/api/forget-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => {
        if (response.ok) {
          toast(
            `Reset link is sent into this ${email} email address, please check your email`,
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        } else {
          response.json().then((data) => {
            setError(data.email);
          });
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="w-screen min-h-screen bg-teal-100 flex items-center justify-center relative gap-10 flex-col md:flex-row py-20">
      <Link to="/">
        <img className="left-8 top-2 absolute" src={Logo} alt="logo" />
      </Link>
      <img className="h-56" src={Forget_pass} alt="forget pass graphics" />
      <div className="">
        <h1 className="text-5xl font-extrabold pb-4">
          Forget
          <br />
          Password?
        </h1>
        <h1 className="mb-8">Please write your email address below</h1>
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") handleNext();
          }}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          type="email"
          className="w-64 outline-none bg-transparent text-teal-500 font-semibold border-b-2 focus:border-teal-400 border-teal-200"
          placeholder="Email address"
        />
        <h1 className="text-red-500">{error}</h1>
        <button
          onClick={handleNext}
          className="bg-teal-400 border border-transparent px-28 py-1 mt-4 rounded-sm text-white font-semibold hover:text-teal-400 hover:bg-transparent hover:border-teal-400"
        >
          Next
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
