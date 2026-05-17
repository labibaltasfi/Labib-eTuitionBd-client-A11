import React from 'react';
import useRole from '../../../hooks/useRole';
import AdminDashboardHome from './AdminDashboardHome';
import StudentDashboardHome from './studentDashboardHome';
import RevenueHistory from '../TutorDashboard/RevenueHistory';
import MyApplications from '../TutorDashboard/MyApplications';
import AppliedTuition from '../StudentDashboard/AppliedTuition';


const DashboardHome = () => {
    const { role } = useRole();
    if (role === 'admin') {
        return <AdminDashboardHome></AdminDashboardHome>
    }
    if (role === 'student') {
        return <AppliedTuition></AppliedTuition>
    }
      if (role === 'tutor') {
        return <MyApplications></MyApplications>
    }
   
};

export default DashboardHome;