import axios from "axios";
import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import useCategory from "../../../Hooks/useCategory";


const Category = () => {
    // const [category, setCategory] = useState([])
    
    const [category] = useCategory()
    // console.log(category);
    
    return (
        <div>

            <div className="w-[80%] m-auto grid grid-cols-4 gap-6">
                {category?.map((item,idx)=><CategoryCard key={idx} item={item}></CategoryCard>) }
            </div>
            
        </div>
    );
};

export default Category;