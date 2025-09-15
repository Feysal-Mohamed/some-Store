// import React, { useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";

// const Header = () => {
//   const activeClass = "border-b-2 border-green-500"; // green underline for active link
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   // Check if user is logged in on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem("LoggedInUser");
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setUser(parsedUser);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("LoggedInUser");
//     setUser(null);
//     navigate("/"); // optional redirect
//   };

//   // Get first name (just the first character capitalized)
//   const firstName = user?.Name ? user.Name.charAt(0).toUpperCase() : "";

//   return (
//     <>
//     <div className="flex justify-between py-4 text-center items-center px-10">
//       <div className="text-3xl font-bold">Loogo</div>

//       <ul className="flex space-x-10">
//         <li>
//           <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : "")}>
//             Home
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/about" className={({ isActive }) => (isActive ? activeClass : "")}>
//             About
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/shop" className={({ isActive }) => (isActive ? activeClass : "")}>
//             Shop
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/blog" className={({ isActive }) => (isActive ? activeClass : "")}>
//             Blog
//           </NavLink>
//         </li>
//       </ul>

//       <div className="flex items-center space-x-4">
//         {user ? (
//           <>
//            <div className="flex items-center space-x-4">
//   {/* User badge */}
//     <NavLink className={`list-none`} to="/cart">
//           <li><i className="fa-solid fa-cart-shopping"></i> Cart</li>
//         </NavLink>
//   <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white font-bold uppercase">
//     {firstName}
//   </div>

//   {/* Logout button */}
//   <button
//     onClick={handleLogout}
//     className="text-red-600 hover:underline font-medium"
//   >
//     Logout
//   </button>
// </div>

//           </>
//         ) : (
//           <NavLink to="/login">
//             <button className="bg-blue-600 px-3 py-2 rounded-lg text-white">
//               Log In
//             </button>
//           </NavLink>
//         )}
        
//       </div>
//     </div>
//     </>
//   );
// };

// export default Header;


import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const activeClass = "text-indigo-600 border-b-2 border-indigo-600";
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("LoggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("LoggedInUser");
    setUser(null);
    navigate("/");
  };

  const firstName = user?.Name ? user.Name.charAt(0).toUpperCase() : "";

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/10 shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 lg:px-16 py-4">
        {/* Logo */}
        <div className="text-2xl lg:text-3xl font-extrabold text-gray-400 drop-shadow-md">
          Loogo
        </div>

        {/* Links */}
        <ul className="flex space-x-8 text-gray-300 font-medium">
          {["/", "/about", "/shop", "/blog"].map((path, i) => {
            const names = ["Home", "About", "Shop", "Blog"];
            return (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `transition-colors duration-300 hover:text-indigo-400 ${
                      isActive ? activeClass : ""
                    }`
                  }
                >
                  {names[i]}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Right side */}
        <div className="flex items-center space-x-5">
          {user ? (
            <>
              {/* Cart */}
              <NavLink
                to="/cart"
                className="text-gray-200 hover:text-indigo-400 transition-colors duration-300"
              >
                <i className="fa-solid fa-cart-shopping text-lg"></i>
              </NavLink>

              {/* User badge */}
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-700 text-white font-bold uppercase shadow">
                {firstName}
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-red-400 hover:underline font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow-md transition-transform duration-300 hover:scale-105">
                Log In
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
