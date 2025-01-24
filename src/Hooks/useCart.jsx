
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';

const useCart = () => {
    const axiosPublic = useAxiosPublic()
    const {user} = useAuth()
    const {refetch, data: cart = [], isLoading } = useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/cart`)
            return res.data
        }
    })
    const filtercart = cart?.filter(item=> item?.buyerEmail === user?.email)
    return [cart,refetch, isLoading, filtercart]

};

export default useCart;