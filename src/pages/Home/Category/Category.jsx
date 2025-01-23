import axios from "axios";
import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import useCategory from "../../../Hooks/useCategory";
import DashboardHeading from "../../../Share/dashboardHeading/DashboardHeading";
import LoadingSign from "../../../Share/LoadingSign/LoadingSign";
import NoData from "../../../Share/NoData/NoData";


const Category = () => {
    // const [category, setCategory] = useState([])
    
    const [category,refetch, isLoading] = useCategory()
    // console.log(category);
    if(isLoading){
        return <LoadingSign></LoadingSign>
    }
    if(category.length == 0){
        return <NoData></NoData>
    }
    
    return (
        <div className="w-[90%] m-auto">
            <DashboardHeading title={"All Category Products"}></DashboardHeading>

            <div className=" grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 2xl:grid-cols-5 gap-6">
                {category?.map((item,idx)=><CategoryCard key={idx} item={item}></CategoryCard>) }
            </div>
            
        </div>
    );
};

export default Category;