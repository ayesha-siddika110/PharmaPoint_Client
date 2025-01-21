import { Navigate } from "react-router-dom";
import useRole from "../../Hooks/useRole";
import LoadingSign from "../../Share/LoadingSign/LoadingSign";


const SellerRoute = ({children}) => {
    const [role, isloading] = useRole()

    if(isloading){
        return <LoadingSign></LoadingSign>
    }

    if (role === 'seller') {
        return children;
    }
    return <Navigate to="/"  replace></Navigate>
};

export default SellerRoute;