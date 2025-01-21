import { Navigate } from "react-router-dom";
import useRole from "../../Hooks/useRole";
import LoadingSign from "../../Share/LoadingSign/LoadingSign";


const UserRoute = ({children}) => {
    const [role, isloading] = useRole()

    if(isloading){
        return <LoadingSign></LoadingSign>
    }

    if (role === 'user') {
        return children;
    }
    return <Navigate to="/"  replace></Navigate>
};

export default UserRoute;