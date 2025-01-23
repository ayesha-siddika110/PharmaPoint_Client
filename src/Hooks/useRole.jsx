import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import LoadingSign from "../Share/LoadingSign/LoadingSign";


const useRole = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: role, isloading } = useQuery({
        queryKey: ['role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user?.email}`)
            return res?.data?.role
        }
    })
    console.log(role);
    if(isloading){
        return <LoadingSign></LoadingSign>
    }
    
    return [role, isloading]
};

export default useRole;