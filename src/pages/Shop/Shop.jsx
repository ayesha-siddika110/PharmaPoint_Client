
import PaginatedItems from "../../componants/Pagination/Pagination";



const Shop = () => {

    return (
        <div>
            <div id="container">
                <PaginatedItems itemsPerPage={8} />
            </div>

        </div>
    );
};

export default Shop;