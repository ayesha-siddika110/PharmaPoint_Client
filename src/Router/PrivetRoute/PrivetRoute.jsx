
import { Navigate, useLocation } from "react-router-dom";
import LoadingSign from "../../Share/LoadingSign/LoadingSign";
import useAuth from "../../Hooks/useAuth";


const PrivetRouter = ({children}) => {
    const {user, loading} = useAuth()
    const location = useLocation();
    if(user){
        return children
    }

    if(loading){
        return <LoadingSign></LoadingSign>
    }
     
    
    
    
    return <Navigate to="/login" state={location?.pathname}></Navigate>
};

export default PrivetRouter;