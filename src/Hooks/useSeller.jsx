// import React from 'react';
// import useAuth from './useAuth';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from './useAxiosSecure';

// const useSeller = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();
//     const { data: isSeller, isPending: isSellerLoading } = useQuery({
//         queryKey: [user?.email, 'isSeller'],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users/admin/${user.email}`);
//             console.log(res.data);
//             return res.data?.admin;
//         }
//     })
//     return [isSeller, isSellerLoading]
// };

// export default useSeller;