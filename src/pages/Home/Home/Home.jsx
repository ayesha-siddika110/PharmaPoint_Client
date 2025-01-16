import useAuth from '../../../Hooks/useAuth';
import Category from '../Category/Category';
import Products from '../Products/Products';
import Slider from '../Slider/Slider';

const Home = () => {
    const {loading} = useAuth()
    
    return (
        <div>
            <Slider></Slider>
            <Category></Category>
            {/* <Products></Products> */}
            
        </div>
    );
};

export default Home;