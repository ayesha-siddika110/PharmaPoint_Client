
import { Link, NavLink, } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import logo from '../../assets/Logo/darklogo.png'
import { BsCart2 } from "react-icons/bs";
import useCart from "../../Hooks/useCart";
import './Navbar.css'
import useRole from "../../Hooks/useRole";
import toast from "react-hot-toast";
import { IoHomeOutline } from "react-icons/io5";
import { CiLocationArrow1, CiShoppingBasket } from "react-icons/ci";
import { LuHandshake } from "react-icons/lu";



const Navbar = () => {
    const { user, signOutUser } = useAuth()

    const handleSignOut = () => {
        signOutUser()
            .then(res => {
                toast.success('Sign Out')

            })
            .catch(err => {
                console.log(err);

            })

    }

    const [cart, refetch, isLoading, filtercart] = useCart()
    const [role] = useRole()


    const links = <>
        <NavLink className={'flex text-white  space-x-2 justify-center items-center px-2'} to="/"><IoHomeOutline /><p className="py-1">Home</p></NavLink>
        <NavLink className={' flex text-white  space-x-2 justify-center items-center px-2'} to="/shop"><CiShoppingBasket className="text-xl" /><p className="py-1 ">Shop</p></NavLink>
        <NavLink className={' flex text-white  space-x-2 justify-center items-center px-2'} to="/shop"><CiLocationArrow1 className="text-xl" /><p className="py-1 ">Contact</p></NavLink>
        <NavLink className={' flex text-white  space-x-2 justify-center items-center px-2'} to="/shop"><LuHandshake className="text-xl" /><p className="py-1 ">Support</p></NavLink>
        {/* <NavLink to="/language">Languages</NavLink> */}

    </>
    const profile = <>

        {
            user ? <>
                <div className="drawer drawer-end">

                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content ">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-4" className="drawer-button ">
                            <img src={user?.photoURL} alt="Profile" className="border md:w-10 md:h-10 w-8 h-8 rounded-full" /></label>
                    </div>
                    <div className="drawer-side z-50">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className={`bg-[#033B4C]  mt-[80px]   lg:w-[30%] md:w-[30%] w-[90%]  p-4 `}>
                            <li className="flex justify-center items-center"><img src={user?.photoURL} alt="profile image" className="md:w-24 md:h-24 w-14 h-14  rounded-full object-cover p-1 border-2 border-[#012029]" /></li>
                            <li className="py-2 border-b border-[#033B4C] hover:bg-[#033b4c42] pl-3 mt-8 "><Link to="/UpdateProfile">Update Profile</Link></li>

                            <li className="  ">
                                {
                                    role === 'admin' && <Link to={`/dashboard/adminHome`} className="py-2 border-b border-[#033B4C] hover:bg-[#033b4c42] pl-3">Dashboard</Link>
                                }
                                {
                                    role === 'seller' && <Link to={`/dashboard/sellerHome`} className="py-2 border-b border-[#033B4C] hover:bg-[#033b4c42] pl-3">Dashboard</Link>
                                }
                                {
                                    role === 'user' && <Link to={`/dashboard/userPaymentHistory`} className="py-2 border-b border-[#033B4C] hover:bg-[#033b4c42] pl-3">Dashboard</Link>
                                }

                            </li>

                            <li className="py-2  hover:bg-[#033b4c42] pl-3 " onClick={handleSignOut}>Log Out</li>
                        </ul>
                    </div>
                </div>
            </>
                :
                <NavLink to="/login" className={`bg-white bg-opacity-50 py-2 px-4 text-white uppercase`}>Join us</NavLink>
        }

    </>
    return (
        <div className={`bg-[#033B4C] text-white sticky top-0 z-50 py-1`}>
            <div className={`  w-[90%] m-auto flex justify-between items-center`}>
                <div className=" flex justify-start items-center">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="lg:hidden pr-6">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className={`menu space-y-3 menu-sm dropdown-content rounded-lg z-50 bg-[#033B4C] mt-3 p-6  shadow-lg w-56`}>
                            {links}
                            <NavLink to="/carts" className='flex gap-2 pr-3 items-center justify-center text-center'><BsCart2 className='font-bold text-lg ' /><span className="w-20 text-center ">My Cart ({filtercart.length})</span></NavLink>
                        </ul>
                    </div>

                    <img src={logo} className="md:h-16 h-16 " alt="" />

                </div>
                <div className=" hidden lg:flex">
                    <ul className="flex justify-center items-center space-x-3">
                        {links}
                    </ul>
                </div>
                <div className="">
                    <div className="flex justify-between items-center ">
                        <Link to="/carts" className='md:flex hidden gap-2 pr-3 items-center'><BsCart2 className='font-bold text-lg ' /><span className="w-20">My Cart ({filtercart?.length})</span></Link>
                        {profile}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;