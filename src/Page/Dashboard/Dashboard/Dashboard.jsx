import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../../../Coponents/AuthProvider/AuthProvider';

const Dashboard = () => {
    const {user} = useContext(AuthContext)
    return (
        <div className="flex">
            <div className=" h-svh px-5 space-y-5 pt-5 bg-[#b4fad255] w-[200px] md:w-3/12 lg:w-2/12">
                <div>
                    <img className="w-[80px] mx-auto h-[80px] rounded-full" src={user?.photoURL} alt="" />
                    <p className="text-center my-2 font-bold">{user?.displayName}</p>
                </div>
                <div className="  flex flex-col gap-y-2">
                    <NavLink to='/dashboard/home' className='w-full text-center py-2'>Admin Home</NavLink>
                    <NavLink to='/dashboard/addProduct' className='w-ful text-center py-2'>Add Product</NavLink>
                    <NavLink to='/dashboard/order' className='w-ful text-center py-2'>Orders</NavLink>
                   <NavLink to='/dashboard/admin' className='w-full text-center py-2'>Admin</NavLink>
                   {/*   <NavLink to='/dashboard/corner' className='w-full text-center py-2'>Corner</NavLink>
                    <NavLink to='/dashboard/result' className='w-full text-center py-2'>Results</NavLink> */}
                </div>
                <div className="divider"></div>
                <div className="  flex flex-col gap-y-2">
                    <NavLink to='/' className='w-full text-center py-2'>Home</NavLink>
                </div>
            </div>

            <div className="overflow-auto w-full">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;