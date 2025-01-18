
import { Link, NavLink, } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import logo from '../../assets/Logo/Lightlogo.png'
import { BsCart2 } from "react-icons/bs";
import useCart from "../../Hooks/useCart";



const Navbar = () => {
    const { user, signOutUser } = useAuth()

    const handleSignOut = () => {
        signOutUser()
            .then(res => {
                console.log(res);

            })
            .catch(err => {
                console.log(err);

            })

    }
  
    const [cart] = useCart()
    

    const links = <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="">Shop</NavLink>
        <NavLink to="">Languages</NavLink>

    </>
    const profile = <>

        {
            user ? <>
                <div className="drawer drawer-end">

                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content ">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-4" className="drawer-button ">
                            <img src={user?.photoURL} alt="Profile" className="border w-10 h-10 rounded-full" /></label>
                    </div>
                    <div className="drawer-side z-50">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className={`bg-base-200  mt-[63px]   lg:w-[30%] md:w-[30%] w-[50%]  p-4 `}>
                            <li className="flex justify-center items-center"><img src={user?.photoURL} alt="profile image" className="w-24 h-24  rounded-full object-cover p-1 border-2 border-[#033B4C]" /></li>
                            <li className="py-2 border-b border-[#033B4C] hover:bg-[#033b4c42] pl-3 mt-8 "><Link>Update Profile</Link></li>

                            <li className="  "><Link to="/dashboard" className="py-2 border-b border-[#033B4C] hover:bg-[#033b4c42] pl-3">Dashboard</Link></li>

                            <li className="py-2  hover:bg-[#033b4c42] pl-3 " onClick={handleSignOut}>Log Out</li>
                        </ul>
                    </div>
                </div>


            </>
                :
                <NavLink to="/login" className={`bg-[#033B4C] py-2 px-4 text-white uppercase`}>Join us</NavLink>
        }

    </>
    return (
        <div className={`border`}>
            <div className={`navbar bg-base-100 w-[95%] m-auto flex justify-between`}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                            className={`menu space-y-3 menu-sm dropdown-content rounded-box z-50 mt-3 w-52 p-2 shadow-lg `}>
                            {links}
                        </ul>
                    </div>

                    <img src={logo} className="h-16" alt="" />

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-4">
                        {links}
                    </ul>
                </div>
                <div className="">
                    <div className="flex justify-between items-center ">
                        <Link to="/carts" className='flex gap-2 pr-3 items-center'><BsCart2 className='font-bold text-lg ' /><span className="w-20">My Cart ({cart.length})</span></Link>
                        {profile}

                    </div>


                </div>

                {/* dark mode */}

            </div>
        </div>
    );
};

export default Navbar;