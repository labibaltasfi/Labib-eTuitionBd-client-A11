import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const userEmail = user?.email;

    const { isLoading: roleLoading, data: role = 'student' } = useQuery({
        queryKey: ['user-role', userEmail],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${userEmail}/role`);
            
            return res.data?.role || 'student';
        },
        enabled: !!userEmail,
    })

    return { role, roleLoading };
};

export default useRole;