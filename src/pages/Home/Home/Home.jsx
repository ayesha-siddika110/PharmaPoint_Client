import useAuth from '../../../Hooks/useAuth';
import Category from '../Category/Category';
import Discount from '../Discount/Discount';
import Products from '../Products/Products';
import Slider from '../Slider/Slider';
import SmallCards from '../SmallCards/SmallCards';

const Home = () => {
    const {loading} = useAuth()
    
    return (
        <div>
            <Slider></Slider>
            {/* small cards */}
            <SmallCards></SmallCards>
            {/* category */}
            <Category></Category>
            {/* discount */}
            <Discount></Discount>
            {/* how to shop online */}
            {/* advice from health expert */}
            
        </div>
    );
};

export default Home;