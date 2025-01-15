import useAuth from '../../../Hooks/useAuth';
import Slider from '../Slider/Slider';

const Home = () => {
    const {loading} = useAuth()
    
    return (
        <div>
            <Slider></Slider>
            
        </div>
    );
};

export default Home;