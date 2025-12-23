import React from 'react';
import useRole from '../../../hooks/useRole';
import AdminDashboardHome from './AdminDashboardHome';
import StudentDashboardHome from './studentDashboardHome';


const DashboardHome = () => {
    const { role } = useRole();
    if (role === 'admin') {
        return <AdminDashboardHome></AdminDashboardHome>
    }
    if (role === 'student') {
        return <StudentDashboardHome></StudentDashboardHome>
    }
   
};

export default DashboardHome;