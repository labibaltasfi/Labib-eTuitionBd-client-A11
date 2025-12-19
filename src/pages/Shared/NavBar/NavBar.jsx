import React, { useState, useEffect, use } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import logo from "../../../assets/open-book.png"
import { AuthContext } from "../../../context/AuthContext";






const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user, logOut } = use(AuthContext);

  const handleLogOut = () => {

    logOut()
      .then(() => {
        console.log('logOut successful')
        navigate('/')
      })
      .catch()
  }


  useEffect(() => {
    setLoading(false);
  }, [location.pathname]);

  const handleNavigation = (path) => {
    if (location.pathname !== path) {
      setLoading(true);
      setTimeout(() => navigate(path), 100);
    }
  };

  const links = (
    <>
      <li
        onClick={() => handleNavigation("/")}
        className={`my-2 px-3 py-1  font-semibold rounded-md cursor-pointer transition-colors duration-200 btn-secondary ${location.pathname === "/"
          ? "text-[#00A8E7] "
          : "text-white "
          }`}
      >
        Home
      </li>

      <li
        onClick={() => handleNavigation("/About")}
        className={`my-2 px-3 py-1  font-semibold rounded-md cursor-pointer transition-colors duration-200 btn-secondary ${location.pathname === "/allMovies"
            ? "text-[#00A8E7] "
          : "text-white "
          }`}
      >
        About
      </li>
      <li
        onClick={() => handleNavigation("/Contact")}
        className={`my-2 px-3 py-1 font-semibold rounded-md cursor-pointer transition-colors duration-200 btn-secondary ${location.pathname === "/allMovies"
            ? "text-[#00A8E7] "
          : "text-white "
          }`}
      >
       Contact
      </li>
      {user && (
        <>
          <li
            onClick={() => handleNavigation("/PostTuitions")}
            className={`my-2 px-3 mr-3 py-1  font-semibold rounded-md cursor-pointer transition-colors duration-200 btn-secondary ${location.pathname === "/myCollection"
                ? "text-[#00A8E7] "
          : "text-white "
              }`}
          >
            Tuitions
          </li>
          <li
            onClick={() => handleNavigation("/tuitionlist")}
            className={`my-2 px-3 mr-3 py-1  font-semibold rounded-md cursor-pointer transition-colors duration-200 btn-secondary ${location.pathname === "/myCollection"
                ? "text-[#00A8E7] "
          : "text-white "
              }`}
          >
            Tuition List
          </li>
        </>
      )}
    </>
  );

  return (
   <div className="sticky top-0 bg-[#151B72] backdrop-blur border-b border-gray-700 z-50">
     <div className="relative">
      {loading && (
        <div className="flex items-center justify-center h-screen ">
          <div className="flex">
            <img className="animate-spin h-30 w-30 mr-7 mb-3" src="" alt="" /> <h1 className="text-[50px] font-bold"> Loading...</h1>
          </div>
        </div>
      )}

      <div className="navbar xl:px-20">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-[#192489] rounded-box z-2 mt-3 w-52 p-2 shadow">
              {links}
            </ul>
          </div>
          <div className="btn btn-ghost text-xl">
            <img className="w-10 h-10" src={logo} alt="" />
            <span onClick={() => handleNavigation("/")} className="sm:font-extrabold font-bold text-white ">
              eTutionbd
            </span>
          </div>
        </div>

        <div className="navbar-center">
          <ul className="menu menu-horizontal px-1 gap-5  text-[#0B3954] text-2xl  hidden lg:flex">
            {
              links
            }
          </ul>

        </div>

        <div className="navbar-end">

          <div className='login-btn flex  text-[#0B3954] text-2xl font-semibold items-center px-4'>
            {
              !user && (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="cursor-pointer">
                    <img className=" rounded-full object-cover border-2 border-white" src="https://i.ibb.co.com/hR0p6qhz/user.png" alt="" />
                  </div>
                  <div
                    tabIndex="-1"
                    className="menu menu-sm dropdown-content  bg-[#192489] text-white rounded-box z-4 mt-3 w-35 p-2  shadow">
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
                    className="menu menu-sm dropdown-content  bg-[#00A8E7] text-white rounded-box z-4 mt-3 w-40 p-2  shadow">
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
