import { NavLink } from "react-router-dom";
import "./navbar.css"
import { FaUser } from "react-icons/fa";
import { IoCartOutline, IoSearch } from "react-icons/io5";


const Navbar = () => {


    const navElement = <>
        <NavLink className='text-lg font-bold px-2' to='/'>Home</NavLink>
        <NavLink className='text-lg font-bold px-2' to='/shop'>Shop</NavLink>
        <NavLink className='text-lg font-bold px-2' to='/contact'>Contact</NavLink>
    </>
    return (
        <div>
            <div className="hidden md:block lg:block">
                <div className="flex py-2 items-center justify-between bg-base-100 px-2 md:px-10 lg:px-10 ">
                    <div className="md:navbar-start lg:navbar-start col-span-3 md:w-[50%] lg:w-[28%]">
                        <div >
                            <div className="flex items-center">
                                <img className="w-[80px] " src="https://i.ibb.co/kGGjggj/23095971-1122-ai.png" alt="" />
                                <h1 className="text-xl md:text-2xl lg:text-3xl  font-bold"><span className="text-[#84a793]">Bongo</span> Kids</h1>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block lg:block">
                        <div className="flex flex-wrap justify-center my-3 gap-x-5 font-medium">
                            {navElement}
                        </div>
                    </div>
                    <div className=" flex items-center justify-end gap-x-4  ml-0 col-span-5 lg:w-[32%]">
                        <IoSearch className="text-xl"></IoSearch>
                        <div className="relative">
                            <IoCartOutline className="text-2xl"></IoCartOutline>
                            <p className="absolute text-sm font-semibold -top-4 -right-3 text-white w-[25px] h-[25px] text-center p-[2px] rounded-full bg-[#84a793] ">1</p>
                        </div>
                        <FaUser className="text-xl"></FaUser>
                    </div>

                </div>

            </div>


            <div className="block md:hidden lg:hidden mt-0">
                <div className=" flex items-center justify-between bg-base-100 px-2 md:px-10 lg:px-10 ">
                    <div>
                        <div >
                            <div className="flex items-center">
                                <img className="w-[80px] " src="https://i.ibb.co/kGGjggj/23095971-1122-ai.png" alt="" />
                                <h1 className="text-xl md:text-3xl lg:text-3xl font-bold"><span className="text-[#84a793]">Bongo</span> Kids</h1>
                            </div>
                        </div>
                    </div>
                    <div className=" flex items-center justify-end gap-x-4  ml-0 col-span-5 lg:w-[32%]">
                        <IoSearch className="text-xl"></IoSearch>
                        <div className="relative">
                            <IoCartOutline className="text-2xl"></IoCartOutline>
                            <p className="absolute text-sm font-semibold -top-4 -right-3 text-white w-[25px] h-[25px] text-center p-[2px] rounded-full bg-[#84a793] ">1</p>
                        </div>
                        <FaUser className="text-xl"></FaUser>
                    </div>
                    {/* <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content ml-[-250px] z-[1] py-4 shadow bg-slate-200 rounded-box w-[300px]">
                            <div>
                                <div className="flex flex-col items-center space-y-2">
                                    <p className="text-lg">{user?.displayName}</p>
                                    {
                                        user && <img className="rounded-full  w-[50px] h-[50px]" src={user.photoURL} alt="" />
                                    }
                                    {
                                        user ? <button onClick={handleLogout} className="btn bg-blue-400 text-white hover:text-black">Logout</button> : <button className="btn bg-blue-400 text-white hover:text-black"><Link to='/login'>Login</Link></button>
                                    }
                                </div>
                            </div>
                        </ul>
                    </div> */}
                </div>
                <div className="flex flex-wrap justify-center my-3 gap-x-5 lg:text-lg font-medium">
                    {navElement}
                </div>
            </div>
        </div>
    );
};

export default Navbar;