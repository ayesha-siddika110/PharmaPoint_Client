import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useCategory = () => {
    const axiosPublic = useAxiosPublic()
    const {refetch, data: category = [], isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/category`)
            return res.data
        }
    })
    return [category,refetch, isLoading]
};

export default useCategory;