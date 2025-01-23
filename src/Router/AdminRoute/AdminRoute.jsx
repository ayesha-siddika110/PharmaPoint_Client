import { Navigate } from "react-router-dom";
import useRole from "../../Hooks/useRole";
import LoadingSign from "../../Share/LoadingSign/LoadingSign";


const AdminRoute = ({children}) => {
    const [role, isloading] = useRole()

    if(isloading){
        return <LoadingSign></LoadingSign>
    }

    if (role === 'admin') {
        return children;
    }
    return <Navigate to="/dashboard/adminHome" ></Navigate>
};

export default AdminRoute;