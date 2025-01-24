
import { Helmet } from "react-helmet";
import PaginatedItems from "../../componants/Pagination/Pagination";
import DashboardHeading from "../../Share/dashboardHeading/DashboardHeading";



const Shop = () => {

    return (
        <div>
             <Helmet>
                <title>Shop - PharmaPoint</title>
            </Helmet>
            <div className="w-[90%] m-auto">
                <DashboardHeading title={"All Products"}></DashboardHeading>
            </div>
            <div id="container">
                <PaginatedItems itemsPerPage={8} />
            </div>

        </div>
    );
};

export default Shop;