import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../images/ventia_logo_white.svg";
import icon from "../images/icon.jpg";
import UserService from "../secureStore/userInfo";
import TokenService from "../secureStore/refreshToken";
import RoleService from "../secureStore/userRole";
import { useDispatch, useSelector } from "react-redux";
import { setValue } from "../redux/loginData";

export default function Navbar() {
  const [open, setOpen] = useState(false); // Toggle main menu
  const [expandSubMenu, setExpandSubMenu] = useState(false); // Toggle submenu
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const role = RoleService.getUserRole();
  const varified = useSelector((state) => state.login.value);

  const handleLogout = async () => {
    try {
      const token = TokenService.getToken();
      const response = await fetch(
        "https://backend.trafficiot.com/api/auth/logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        dispatch(setValue(false));
        UserService.removeUser();
        TokenService.removeToken();
        RoleService.removeUserRole();
        localStorage.removeItem("deviceInfo");
        navigate("/login");
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return varified ? (
    <div className="flex justify-between items-center px-10 py-2 bg-indigo-950 text-white fixed top-0 left-0 w-full z-20">
      <Link to="/">
        <img src={Logo} alt="Logo" className="" />
      </Link>
      <div
        onClick={() => setOpen(!open)}
        className="absolute right-10 z-30 top-3 cursor-pointer md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
      <div
        className={`flex flex-col md:flex-row gap-x-10 gap-y-4 text-sm md:static absolute bg-indigo-950 px-10 md:px-0 py-4 md:py-0 transition-all duration-500 ease-in ${
          open ? "top-12 right-0" : "top-12 right-[-200px]"
        }`}
      >
        <div className="relative group">
          <div className="flex items-center gap-1 cursor-pointer h-8 hover:text-cyan-500">
            <span>Street Light</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transform transition duration-300 group-hover:rotate-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
          <div className="hidden group-hover:flex flex-col gap-2 ml-4 mt-2 md:ml-0 md:mt-0 md:absolute md:left-0 md:bg-indigo-950 md:shadow-lg md:rounded">
            <Link
              to="/"
              className={`block px-4 pt-2 hover:text-cyan-500`}
            >
              <p className={`py-px ${
                location.pathname === "/" ? "border-b" : ""
              }`}>Dashboard</p>
            </Link>
            <Link
              to="/view"
              className={`block px-4 hover:text-cyan-500`}
            >
              <p className={`py-px ${
                location.pathname === "/view" ? "border-b" : ""
              }`}>View</p>
            </Link>
            <Link
              to="/alarm"
              className={`block px-4 pb-2 hover:text-cyan-500`}
            >
              <p className={`py-px ${
                location.pathname === "/alarm" ? "border-b" : ""
              }`}>Alarm</p>
            </Link>
          </div>
        </div>
        <Link
          onClick={() => setOpen(false)}
          to="/workzone"
          className={`hover:text-cyan-500 cursor-pointer w-fit flex items-center ${
            location.pathname === "/workzone" ? "border-b" : ""
          }`}
        >
          Work Zone
        </Link>
        <Link
          onClick={() => setOpen(false)}
          to="/aws"
          className={`hover:text-cyan-500 cursor-pointer w-fit flex items-center ${
            location.pathname === "/aws" ? "border-b" : ""
          }`}
        >
          AWS
        </Link>
        <Link
          onClick={() => setOpen(false)}
          to="/battery-chart"
          className={`hover:text-cyan-500 cursor-pointer w-fit flex items-center ${
            location.pathname === "/battery-chart" ? "border-b" : ""
          }`}
        >
          Battery Chart
        </Link>
        <div className="relative h-8 w-8 rounded-full bg-teal-200 group">
          <img className="rounded-full" src={icon} alt="user" />
          <div className="absolute bg-indigo-950 px-2 hidden group-hover:block w-24 -ml-6 pt-4 md:pt-2 mt-1 pb-2">
            {role === "Admin" && (
              <Link
                onClick={() => setOpen(false)}
                to="/register"
                className={`hover:text-cyan-500 whitespace-nowrap cursor-pointer ${
                  location.pathname === "/register" ? "border-b" : ""
                }`}
              >
                <p className="py-2">Add User</p>
              </Link>
            )}
            <Link
              to="/profile"
              className="hover:text-cyan-500 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <p>Profile</p>
            </Link>
            <Link
              to="/login"
              onClick={handleLogout}
              className="flex items-center gap-1 hover:text-cyan-500 cursor-pointer py-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32v224c0 17.7 14.3 32 32 32s32-14.3 32-32V32zm-144.5 88.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"
                />
              </svg>
              <p>Log Out</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
