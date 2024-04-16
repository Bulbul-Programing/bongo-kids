import { Link, NavLink } from "react-router-dom";
import "./navbar.css"
import { FaUser } from "react-icons/fa";
import { IoCartOutline, IoSearch } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Coponents/AuthProvider/AuthProvider";
import Swal from "sweetalert2";


const Navbar = () => {
    const { user, logOut, cartProduct } = useContext(AuthContext)
    const [hideNavbar, setHideNavbar] = useState(false);
    const [scrollValue, setScrollValue] = useState(0)

    window.addEventListener('scroll', function () {
        if (scrollValue < this.scrollY) {
            setHideNavbar(true)
        }
        else {
            setHideNavbar(false)
        }
        setScrollValue(this.scrollY)
    })

    const handleLogout = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Log Out Success",
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }

    const navElement = <>
        <NavLink className='text-lg font-bold px-2' to='/'>Home</NavLink>
        <NavLink className='text-lg font-bold px-2' to='/shop'>Shop</NavLink>
        <NavLink className='text-lg font-bold px-2' to='/dashboard/home'>Dashboard</NavLink>
        <NavLink className='text-lg font-bold px-2' to='/contact'>Contact</NavLink>
    </>
    return (
        <div className={`sticky top-0 z-10 transition duration-500 ${hideNavbar ? 'translate-y-[-110px]' : 'top-0 translate-y-0'}`}>
            <div className={`hidden  w-full shadow-lg md:block lg:block`}>
                <div className="flex py-2 items-center justify-between bg-base-100 px-2 md:px-5 lg:px-5 ">
                    <div className="md:navbar-start inline-block  lg:navbar-start col-span-3 md:w-[28%] lg:w-[28%]">
                        <div >
                            <div className="flex items-center">
                                <img className="md:w-[60px] " src="https://i.ibb.co/kGGjggj/23095971-1122-ai.png" alt="" />
                                <h1 className="text-xl md:text-2xl lg:text-3xl  font-bold"><span className="text-[#84a793]">Bongo</span> Kids</h1>
                            </div>
                        </div>
                    </div>
                    <div className=" hidden md:block lg:block">
                        <div className="flex flex-wrap justify-center my-3 md:gap-x-2 lg:gap-x-5 font-medium">
                            {navElement}
                        </div>
                    </div>
                    <div className=" flex items-center justify-end md:gap-x-2 lg:gap-x-4  ml-0 col-span-5 lg:w-[20%]">

                        <Link to='/checkout' className="cursor-pointer">
                            <div className="relative">
                                <IoCartOutline className="text-2xl"></IoCartOutline>
                                <p className="absolute text-sm font-semibold -top-4 -right-3 text-white w-[25px] h-[25px] text-center p-[2px] rounded-full bg-[#84a793] ">{cartProduct ? cartProduct.length : 0 }</p>
                            </div>
                        </Link>

                        <div className="flex justify-center items-center">
                            {
                                user ? <img className="w-[40px] h-[40px] rounded-full" src={user?.photoURL} alt="" /> : <FaUser className="text-xl"></FaUser>
                            }
                            {
                                user ? <button onClick={handleLogout} className="bg-[#84a793] ml-1 hover:bg-[#303030] delay-75 transition ease-in-out px-3 py-1 rounded-sm text-white font-medium">Log Out</button> : <Link to='/login'><button className="bg-[#84a793] ml-3 hover:bg-[#303030] delay-75 transition ease-in-out px-3 py-1 rounded-sm text-white font-medium">Login</button></Link>
                            }
                        </div>
                    </div>

                </div>

            </div>

            <div className="block md:hidden bg-white lg:hidden mt-0">
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

                        <Link to='/checkout' className="cursor-pointer">
                            <div className="relative">
                                <IoCartOutline className="text-2xl"></IoCartOutline>
                                <p className="absolute text-sm font-semibold -top-4 -right-3 text-white w-[25px] h-[25px] text-center p-[2px] rounded-full bg-[#84a793] ">{cartProduct ? cartProduct.length : 0 }</p>
                            </div>
                        </Link>
                        <div className="flex justify-center items-center">
                            {
                                user ? <img className="w-[40px] h-[40px] rounded-full" src={user?.photoURL} alt="" /> : <FaUser className="text-xl"></FaUser>
                            }
                            {
                                user ? <button onClick={handleLogout} className="bg-[#84a793] ml-1 hover:bg-[#303030] delay-75 transition ease-in-out px-3 py-1 rounded-sm text-white font-medium">Log Out</button> : <Link to='/login'><button className="bg-[#84a793] ml-3 hover:bg-[#303030] delay-75 transition ease-in-out px-3 py-1 rounded-sm text-white font-medium">Login</button></Link>
                            }
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center my-3 gap-x-5 lg:text-lg font-medium">
                    {navElement}
                </div>
            </div>
        </div>
    );
};

export default Navbar;