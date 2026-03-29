import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaUserCog, FaUsersCog } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router';
import logoImg from '../assets/open-book.png';
import useRole from '../hooks/useRole';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { FaBookOpenReader, FaRegCreditCard, FaUserCheck } from 'react-icons/fa6';
import { BsFillClipboardPlusFill } from 'react-icons/bs';
import { HiClipboardList } from "react-icons/hi";
import { PiPresentationChartDuotone } from "react-icons/pi";
import { RiHistoryFill } from "react-icons/ri";
import { TbReportMoney } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { LuMail } from "react-icons/lu";
import { IoNotificationsOutline } from "react-icons/io5";


const DashboardLayout = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { role } = useRole();

    const { data: userData, isLoading: userLoading } = useQuery({
        queryKey: ['dashboard-user', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get('/users/by-email', {
                params: { email: user.email },
            });
            return res.data;
        },
    });

    const accountRole = userData?.role || role || 'user';
    const accountRoleLabel = `${accountRole.charAt(0).toUpperCase()}${accountRole.slice(1)} Account`;

    const navItemClass = ({ isActive }) =>
        `is-drawer-close:tooltip is-drawer-close:tooltip-right relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
            ? 'bg-primary/15 text-primary shadow-sm ring-1 ring-primary/20'
            : 'text-base-content/70 hover:bg-base-300 hover:text-base-content'
        }`;

    const iconClass = 'text-lg';

    return (
        <div className="drawer lg:drawer-open max-w-7xl mx-auto min-h-screen">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content bg-base-100 transition-colors duration-300">

                <nav className="mx-3 mt-3 rounded-2xl border border-base-content/10 bg-base-200 px-4 py-3 transition-colors duration-300">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-3">
                            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                            </label>

                            {/* <div className="flex w-full items-center gap-3 rounded-xl border border-base-content/10 bg-base-100 px-3 py-2 shadow-sm lg:w-90">
                                <FiSearch className="text-base-content/60" />
                                <input
                                    type="text"
                                    placeholder="Search task"
                                    className="w-full bg-transparent text-sm text-base-content outline-none placeholder:text-base-content/50"
                                />
                                <span className="rounded-md bg-base-200 px-2 py-1 text-xs font-semibold text-base-content/60">Ctrl+F</span>
                            </div> */}
                        </div>

                        <div className="flex items-center justify-end gap-3">
                            {/* <button className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-100" aria-label="messages">
                                <LuMail className="text-base" />
                            </button>
                            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-100" aria-label="notifications">
                                <IoNotificationsOutline className="text-base" />
                            </button> */}

                            <div className="flex items-center gap-3 rounded-xl border border-base-content/10 bg-base-100 px-2 py-1 shadow-sm transition-colors duration-300">
                                <img
                                    src={userData?.photoURL || user?.photoURL || 'https://i.ibb.co.com/hR0p6qhz/user.png'}
                                    alt="User"
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                                <div className="hidden sm:block">
                                    <p className="text-sm font-semibold text-base-content">
                                        {userLoading ? 'Loading...' : (userData?.displayName || user?.displayName || 'eTutionbd User')}
                                    </p>
                                    <p className="text-xs text-base-content/60">
                                        {userLoading ? 'Dashboard Account' : accountRoleLabel}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <Outlet></Outlet>

            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start border-r border-base-content/10 bg-base-200 px-3 py-4 transition-colors duration-300 is-drawer-close:w-20 is-drawer-open:w-72">

                    <ul className="menu w-full grow">
                        <li className="mb-5">
                            <label
                                htmlFor="my-drawer-4"
                                aria-label="open sidebar"
                                className="flex h-9 items-center gap-2 rounded-full border border-base-content/10 bg-base-100 px-3 text-sm font-medium text-base-content/70 hover:bg-base-300 cursor-pointer transition-colors duration-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                    fill="none"
                                    stroke="currentColor"
                                    className="size-4"
                                >
                                    <path d="M4 6h16"></path>
                                    <path d="M4 12h16"></path>
                                    <path d="M4 18h16"></path>
                                </svg>
                                <span className="is-drawer-close:hidden">Close</span>
                            </label>
                        </li>
                        <li className="mb-5">
                            <Link to="/" className="flex items-center gap-3 rounded-2xl bg-base-100 px-3 py-3 shadow-sm ring-1 ring-base-content/10 transition-colors duration-300">
                                <img className="h-10 w-10 rounded-xl bg-emerald-50" src={logoImg} alt="" />
                                <div className="is-drawer-close:hidden">
                                    <p className="text-xl font-bold text-base-content">eTutionbd</p>
                                    <p className="text-xs text-base-content/60">Dashboard</p>
                                </div>
                            </Link>
                        </li>
                        <li className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-base-content/50 is-drawer-close:hidden">Menu</li>

                        <li>
                            <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-base-content/70 transition-all duration-200 hover:bg-base-300 hover:text-base-content" data-tip="Homepage">

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-5"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                <span className="is-drawer-close:hidden">Homepage</span>
                            </Link>
                        </li>


                        {/* admin only links  */}
                        {
                            role === 'admin' && <>

                                <li>
                                    <NavLink className={navItemClass} data-tip="dashboard" to="/dashboard" end>
                                        <span className={iconClass}><TbReportMoney /></span>
                                        <span className="is-drawer-close:hidden">Reports & Analytics</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className={navItemClass} data-tip="Users Management" to="/dashboard/users-management">
                                        <span className={iconClass}><FaUsersCog /></span>
                                        <span className="is-drawer-close:hidden">Users Management</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className={navItemClass} data-tip="Tuition Management" to="/dashboard/tuition-management">
                                        <span className={iconClass}><FaBookOpenReader /></span>
                                        <span className="is-drawer-close:hidden">Tuition Management</span>
                                    </NavLink>
                                </li>
                            </>
                        }
                        {
                            role === 'student' && <>

                                <li>
                                    <NavLink className={navItemClass} data-tip="My Tuitions" to="/dashboard/tuitionlist">
                                        <span className={iconClass}><FaBookOpenReader /></span>
                                        <span className="is-drawer-close:hidden">My Tuitions</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className={navItemClass} data-tip="Post New Tuition" to="/dashboard/PostTuitions">
                                        <span className={iconClass}><BsFillClipboardPlusFill /></span>
                                        <span className="is-drawer-close:hidden">Post New Tuition</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className={navItemClass} data-tip="Applied Tutors" to={`/dashboard/applied-tutors`}>
                                        <span className={iconClass}><FaUserCheck /></span>
                                        <span className="is-drawer-close:hidden">Applied Tutors</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className={navItemClass} data-tip="Payments History" to="/dashboard/payments-history">
                                        <span className={iconClass}><FaRegCreditCard /></span>
                                        <span className="is-drawer-close:hidden">Payments History</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className={navItemClass} data-tip="Profile Settings" to="/dashboard/profile-setting">
                                        <span className={iconClass}><FaUserCog /></span>
                                        <span className="is-drawer-close:hidden">Profile Settings</span>
                                    </NavLink>
                                </li>
                            </>
                        }

                        {
                            role === 'tutor' && <>

                                <li>
                                    <NavLink className={navItemClass} data-tip="My Applications" to="/dashboard/my-applications">
                                        <span className={iconClass}><HiClipboardList /></span>
                                        <span className="is-drawer-close:hidden">My Applications</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className={navItemClass} data-tip="Tutor Ongoing Tuitions" to="/dashboard/tutor-ongoing-tuitions">
                                        <span className={iconClass}><PiPresentationChartDuotone /></span>
                                        <span className="is-drawer-close:hidden">Tutor Ongoing Tuitions</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className={navItemClass} data-tip="Revenue History" to="/dashboard/revenue-history">
                                        <span className={iconClass}><RiHistoryFill /></span>
                                        <span className="is-drawer-close:hidden">Revenue History</span>
                                    </NavLink>
                                </li>
                            </>
                        }


                        <li className="mt-5 mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-base-content/50 is-drawer-close:hidden">General</li>

                        {/* List item */}
                        <li>
                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-base-content/70 transition-all duration-200 hover:bg-base-300 hover:text-base-content" data-tip="Settings">

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-5"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                                <span className="is-drawer-close:hidden">Settings</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;