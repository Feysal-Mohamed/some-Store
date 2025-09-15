import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const activeClass = "border-b-2 border-green-500"; // green underline for active link
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("LoggedInUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("LoggedInUser");
    setUser(null);
    navigate("/"); // optional redirect
  };

  // Get first name (just the first character capitalized)
  const firstName = user?.Name ? user.Name.charAt(0).toUpperCase() : "";

  return (
    <div className="flex justify-between py-4 text-center items-center px-10">
      <div className="text-3xl font-bold">Loogo</div>

      <ul className="flex space-x-10">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : "")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? activeClass : "")}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop" className={({ isActive }) => (isActive ? activeClass : "")}>
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink to="/blog" className={({ isActive }) => (isActive ? activeClass : "")}>
            Blog
          </NavLink>
        </li>
      </ul>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
           <div className="flex items-center space-x-4">
  {/* User badge */}
  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white font-bold uppercase">
    {firstName}
  </div>

  {/* Logout button */}
  <button
    onClick={handleLogout}
    className="text-red-600 hover:underline font-medium"
  >
    Logout
  </button>
</div>

          </>
        ) : (
          <NavLink to="/login">
            <button className="bg-blue-600 px-3 py-2 rounded-lg text-white">
              Log In
            </button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
