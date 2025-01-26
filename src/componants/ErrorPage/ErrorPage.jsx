import { Link } from 'react-router-dom';
import page from '../../assets/banner/error.gif'
import { FaArrowLeft } from 'react-icons/fa';

const ErrorPage = () => {
    return (
        <div className='bg-white min-h-screen w-full'>
            <div className='flex flex-col justify-center items-center h-full'>

            <img src={page} alt="" />
            <Link to="/" className='flex gap-2 items-center bg-blue-600 text-white py-2 px-4'><FaArrowLeft/>GO BACK HOME</Link>
            </div>
            
        </div>
    );
};

export default ErrorPage;