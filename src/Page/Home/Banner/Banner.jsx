import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className='bg-[#F2F2F2] p-5 m-2 flex flex-col-reverse md:flex-row lg:flex-row justify-between items-center'>
            <div className='w-full md:w-1/2 lg:w-1/2'>
                <h1 className='text-4xl mt-6 md:text-4xl lg:text-6xl md:leading-[50px] lg:leading-[70px] font-medium'>New Collection <br /> Up to <span className='text-[#84a793] font-bold'>30% Off</span></h1>
                <p className='text-slate-500 text-lg my-4 mb-8 hidden md:hidden lg:block'>Unusual gifts on weekdays are able to bring <br />a feeling of the holiday !</p>
                <p className='text-slate-500 text-lg my-4 mb-8 block md:block lg:hidden'>Unusual gifts on weekdays are able to bring a feeling of the holiday !</p>
                <Link to='/shop'><button className='px-5 py-3 bg-[#84a793] mb-8 hover:bg-[#303030] delay-75 transition ease-in-out text-white font-medium rounded-md'>Shop Now</button></Link>
            </div>
            <div className='w-full md:w-1/2 lg:w-1/2'>
                <img className='w-full md:w-full lg:w-[80%]' src="https://i.ibb.co/TtK4gQm/banner-1-ad01da57-7fcd-4879-a0f4-e2afa333d7c8-2048x660-crop-top.png" alt="" />
            </div>
        </div>
    );
};

export default Banner;