import React, { useState, use } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import logo from "../../../assets/open-book.png"
import { AuthContext } from "../../../context/AuthContext";
import ThemeToggle from "../../../components/ThemeToggle/ThemeToggle";
import useRole from "../../../hooks/useRole";






const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user, logOut } = use(AuthContext);
  const { role, roleLoading } = useRole();

  const handleLogOut = () => {

    logOut()
      .then(() => {
        console.log('logOut successful')
        navigate('/')
      })
      .catch()
  }
  const handleNavigation = (path) => {
    if (location.pathname !== path) {
      setLoading(true);
      setTimeout(() => {
        navigate(path);
        setLoading(false);
      }, 100);
    }
  };

  const navItemClass = (isActive) =>
    `my-2 px-3 py-1 font-semibold rounded-md cursor-pointer transition-colors duration-200 ${
      isActive
        ? "bg-primary/15 text-primary ring-1 ring-primary/30"
        : "text-base-content hover:bg-base-300"
    }`;

  const links = (
    <>
      <li
        onClick={() => handleNavigation("/")}
        className={navItemClass(location.pathname === "/")}
      >
        Home
      </li>

      <li
        onClick={() => handleNavigation("/about")}
        className={navItemClass(location.pathname === "/about")}
      >
        About
      </li>
      <li
        onClick={() => handleNavigation("/contact")}
        className={navItemClass(location.pathname === "/contact")}
      >
       Contact
      </li>
      {user && !roleLoading && (role === 'admin' || role === 'tutor') && (
        <li
          onClick={() => handleNavigation('/tuition-list')}
          className={navItemClass(location.pathname.startsWith('/tuition-list'))}
        >
          Tuitions
        </li>
      )}
      {user && (
        <>
          <li
            onClick={() => handleNavigation("/dashboard")}
            className={navItemClass(location.pathname.startsWith("/dashboard"))}
          >
            Dashboard
          </li>
        </>
      )}
    </>
  );

  return (
  <div className="sticky top-0 bg-base-200/95 text-base-content backdrop-blur border-b border-base-content/10 z-50 transition-colors duration-300">
     <div className="relative">
      {loading && (
        <div className="flex items-center justify-center h-screen ">
          <div className="flex">
            <img className="animate-spin h-30 w-30 mr-7 mb-3" alt="" /> <h1 className="text-[50px] font-bold"> Loading...</h1>
          </div>
        </div>
      )}

      <div className="navbar xl:w-9/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost xl:hidden ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-2 mt-3 w-52 p-2 shadow-xl">
              {links}
            </ul>
          </div>
          <div onClick={() => handleNavigation("/")} className="flex items-center cursor-pointer text-xl">
            <img className="w-10 h-10 mr-1" src={logo} alt="" />
            <span  className="sm:font-extrabold font-bold text-base-content ">
              eTutionbd
            </span>
          </div>
        </div>

        <div className="navbar-center">
          <ul className="menu menu-horizontal px-1 gap-5 text-2xl hidden xl:flex">
            {
              links
            }
          </ul>

        </div>

        <div className="navbar-end">
          <ThemeToggle />
          <div className='login-btn flex text-2xl font-semibold items-center '>
            {
              !user && (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="cursor-pointer">
                    <img className=" rounded-full object-cover border-2 border-white" src="https://i.ibb.co.com/hR0p6qhz/user.png" alt="" />
                  </div>
                  <div
                    tabIndex="-1"
                    className="menu menu-sm dropdown-content bg-base-300 text-base-content rounded-box z-4 mt-3 w-35 p-2 shadow-xl">
                    <ul className="dropdown-menu sub-menu ">
                      <li><Link to='login' className="text-2xl">Login</Link></li>
                      <div className="border border-dashed"></div>
                      <li><Link to='register' className="text-2xl">Register</Link></li>
                    </ul>
                  </div>
                </div>

              )
            }
            <div>
              {user && (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="cursor-pointer">
                    <img
                      className="w-15 h-15 md:h-15 xl:h-14 2xl:h-16  rounded-full object-cover border-2  sm:mr-0"
                      src={
                        user?.photoURL ? user.photoURL : "https://i.ibb.co.com/hR0p6qhz/user.png"
                      }
                      alt="User"
                    />
                  </div>
                  <div
                    tabIndex="-1"
                    className="menu menu-sm dropdown-content bg-base-300 text-base-content rounded-box z-4 mt-3 w-40 p-2 shadow-xl">
                    <ul className="dropdown-menu sub-menu ">
                      <li><Link to='profile' className="text-2xl">Profile</Link></li>
                      <div className="border border-dashed"></div>
                      <li><button onClick={handleLogOut} className='text-2xl cursor-pointer'>Logout</button></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>

   </div>
  );
};

export default Navbar;
