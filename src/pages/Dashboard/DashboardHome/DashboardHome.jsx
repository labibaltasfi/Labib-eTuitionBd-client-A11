import React from 'react';
import useRole from '../../../hooks/useRole';
import AdminDashboardHome from './AdminDashboardHome';

const DashboardHome = () => {
    const { role } = useRole();
    if (role === 'admin') {
        return <AdminDashboardHome></AdminDashboardHome>
    }
   
};

export default DashboardHome;