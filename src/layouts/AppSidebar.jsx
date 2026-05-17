import { Link, NavLink } from "react-router";

import {
  FaUsersCog,
  FaUserCog,
} from "react-icons/fa";

import {
  FaBookOpenReader,
  FaRegCreditCard,
  FaUserCheck,
} from "react-icons/fa6";

import { BsFillClipboardPlusFill } from "react-icons/bs";
import { HiClipboardList, HiDotsHorizontal } from "react-icons/hi";
import { PiPresentationChartDuotone } from "react-icons/pi";
import { RiHistoryFill } from "react-icons/ri";
import { TbReportMoney } from "react-icons/tb";

import useRole from "../hooks/useRole";

import { useSidebar } from "../context/useSidebar";

import logoImg from "../assets/open-book.png";

const AppSidebar = () => {
  const {
    isExpanded,
    isMobileOpen,
    isHovered,
    setIsHovered,
    toggleSidebar,
    toggleMobileSidebar,
  } = useSidebar();

  const { role } = useRole();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const navItemClass = ({ isActive }) =>
    `relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
      isExpanded || isHovered || isMobileOpen ? "" : "justify-center"
    } ${
      isActive
        ? "bg-primary/15 text-primary shadow-sm ring-1 ring-primary/20"
        : "text-base-content/70 hover:bg-base-300 hover:text-base-content"
    }`;

  const iconClass =
    "flex h-6 w-6 shrink-0 items-center justify-center  text-[30px] leading-none";

  const adminItems = [
    {
      name: "Reports & Analytics",
      path: "/dashboard",
      icon: <TbReportMoney />,
    },
    {
      name: "Users Management",
      path: "/dashboard/users-management",
      icon: <FaUsersCog />,
    },
    {
      name: "Tuition Management",
      path: "/dashboard/tuition-management",
      icon: <FaBookOpenReader />,
    },
  ];

  const studentItems = [
    {
      name: "Applied Tuitions",
      path: "/dashboard",
      icon: <FaBookOpenReader />,
    },
    {
      name: "Post New Tuition",
      path: "/dashboard/PostTuitions",
      icon: <BsFillClipboardPlusFill />,
    },
    {
      name: "Applied Tutors",
      path: "/dashboard/applied-tutors",
      icon: <FaUserCheck />,
    },
    {
      name: "Payments History",
      path: "/dashboard/payments-history",
      icon: <FaRegCreditCard />,
    },
    {
      name: "Profile Settings",
      path: "/dashboard/profile-setting",
      icon: <FaUserCog />,
    },
  ];

  const tutorItems = [
    {
      name: "My Applications",
      path: "/dashboard",
      icon: <HiClipboardList />,
    },
    {
      name: "Tutor Ongoing Tuitions",
      path: "/dashboard/tutor-ongoing-tuitions",
      icon: <PiPresentationChartDuotone />,
    },
    {
      name: "Revenue History",
      path: "/dashboard/revenue-history",
      icon: <RiHistoryFill />,
    },
    {
      name: "Profile Settings",
      path: "/dashboard/profile-setting",
      icon: <FaUserCog />,
    },
  ];

  let menuItems = [];

  if (role === "admin") {
    menuItems = adminItems;
  } else if (role === "student") {
    menuItems = studentItems;
  } else if (role === "tutor") {
    menuItems = tutorItems;
  }

  return (
  <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

        <div className="mb-6 mt-6">
          <Link to="/" className="flex items-center gap-3 px-6 py-3">
            <img className="h-10 w-10 rounded-xl" src={logoImg} alt="" />

            {(isExpanded || isHovered || isMobileOpen) && (
              <div>
                <p className="text-xl font-bold">eTuitionbd</p>

                <p className="text-xs text-base-content/60">Dashboard</p>
              </div>
            )}
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto">
          <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HiDotsHorizontal className="size-6" />
                )}
              </h2>

          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={navItemClass}
                  end={item.path === "/dashboard"}
                >
                  <span className={iconClass}>{item.icon}</span>

                  {(isExpanded || isHovered || isMobileOpen) && <span>{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
    </aside>
  );
};

export default AppSidebar;