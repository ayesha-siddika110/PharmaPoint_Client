import { Helmet } from 'react-helmet';
import useAuth from '../../../Hooks/useAuth';
import AdviceDoctor from '../AdviceDoctor/AdviceDoctor';
import Category from '../Category/Category';
import Discount from '../Discount/Discount';
import HowToShop from '../HowTOShop/HowToShop';
import Slider from '../Slider/Slider';
import SmallCards from '../SmallCards/SmallCards';

const Home = () => {
    const {loading} = useAuth()
    
    return (
        <div>
            <Helmet>
                <title>Home - PharmaPoint</title>
            </Helmet>
            <Slider></Slider>
            {/* small cards */}
            <SmallCards></SmallCards>
            {/* category */}
            <Category></Category>
            {/* discount */}
            <Discount></Discount>
            {/* how to shop online */}
            <HowToShop></HowToShop>
            {/* advice from health expert */}
            <AdviceDoctor></AdviceDoctor>


            
        </div>
    );
};

export default Home;