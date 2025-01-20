import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';

const useAdvertise = () => {
    const axiosSecure = useAxiosSecure()
    const { data: advertise = [], isLoading, refetch } = useQuery({
        queryKey: ['advertise'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/advertise`)
            return res.data
        }
    })
    return [advertise, refetch, isLoading]
};

export default useAdvertise;