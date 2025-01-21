import { Navigate } from "react-router-dom";
import useRole from "../../../../Hooks/useRole";


const SellerHome = () => {
    const [role, isloading] = useRole()

    return (
        <div>
            seller home
        </div>
    );
};

export default SellerHome;