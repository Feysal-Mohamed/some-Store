import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeClass = "border-b-2 border-green-500"; // green underline for active link

  return (
    <div className="flex justify-between py-4 text-center items-center px-10">
      <div className="text-3xl font-bold">Loogo</div>

      <ul className="flex space-x-10">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeClass : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? activeClass : "")}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/shop"
            className={({ isActive }) => (isActive ? activeClass : "")}
          >
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/blog"
            className={({ isActive }) => (isActive ? activeClass : "")}
          >
            Blog
          </NavLink>
        </li>
      </ul>

      <div className="space-x-4">
        <button className="bg-blue-600 px-3 py-2 rounded-lg text-white">
          Log In
        </button>
        <button className="bg-blue-600 px-3 py-2 rounded-lg text-white">
        Register Now
        </button>
      </div>
    </div>
  );
};

export default Header;
