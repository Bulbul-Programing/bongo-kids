import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const NewArrivals = () => {
    return (
        <div>
            <h1 className='uppercase text-4xl font-bold text-center my-10'>New Arrivals</h1>
            <div>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide className='hidden'>
                        <div className='m-10 gap-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
                            <div className='shadow-lg rounded-md'>
                                <div className=''>
                                    <img className='h-[300px] md:h-[220px] lg:h-[280px] w-full' src="https://i.ibb.co/tXbXCFj/cable-texture-sweater-1-343x367-crop-top-1.jpg" alt="" />
                                </div>
                                <div className='px-4 pt-4'>
                                    <h3 className='text-xl font-bold text-center'>Cable Texture Sweater</h3>
                                    <h4 className='text-center my-3'><span className='text-xl text-red-500 font-bold mr-3'>৳ 200</span><span className='text-slate-500 font-semibold line-through'>৳ 260</span></h4>
                                </div>
                            </div>
                            <div className='shadow-lg rounded-md'>
                                <div className=''>
                                    <img className='h-[300px] md:h-[220px] lg:h-[280px] w-full' src="https://i.ibb.co/tXbXCFj/cable-texture-sweater-1-343x367-crop-top-1.jpg" alt="" />
                                </div>
                                <div className='px-4 pt-4'>
                                    <h3 className='text-xl font-bold text-center'>Cable Texture Sweater</h3>
                                    <h4 className='text-center my-3'><span className='text-xl text-red-500 font-bold mr-3'>৳ 200</span><span className='text-slate-500 font-semibold line-through'>৳ 260</span></h4>
                                </div>
                            </div>
                            <div className='shadow-lg rounded-md'>
                                <div className=''>
                                    <img className='h-[300px] md:h-[220px] lg:h-[280px] w-full' src="https://i.ibb.co/tXbXCFj/cable-texture-sweater-1-343x367-crop-top-1.jpg" alt="" />
                                </div>
                                <div className='px-4 pt-4'>
                                    <h3 className='text-xl font-bold text-center'>Cable Texture Sweater</h3>
                                    <h4 className='text-center my-3'><span className='text-xl text-red-500 font-bold mr-3'>৳ 200</span><span className='text-slate-500 font-semibold line-through'>৳ 260</span></h4>
                                </div>
                            </div>
                            <div className='shadow-lg rounded-md'>
                                <div className=''>
                                    <img className='h-[300px] md:h-[220px] lg:h-[280px] w-full' src="https://i.ibb.co/tXbXCFj/cable-texture-sweater-1-343x367-crop-top-1.jpg" alt="" />
                                </div>
                                <div className='px-4 pt-4'>
                                    <h3 className='text-xl font-bold text-center'>Cable Texture Sweater</h3>
                                    <h4 className='text-center my-3'><span className='text-xl text-red-500 font-bold mr-3'>৳ 200</span><span className='text-slate-500 font-semibold line-through'>৳ 260</span></h4>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='m-10 gap-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
                            <div className='shadow-lg rounded-md'>
                                <div className=''>
                                    <img className='h-[300px] md:h-[220px] lg:h-[280px] w-full' src="https://i.ibb.co/tXbXCFj/cable-texture-sweater-1-343x367-crop-top-1.jpg" alt="" />
                                </div>
                                <div className='px-4 pt-4'>
                                    <h3 className='text-xl font-bold text-center'>Cable Texture Sweater</h3>
                                    <h4 className='text-center my-3'><span className='text-xl text-red-500 font-bold mr-3'>৳ 200</span><span className='text-slate-500 font-semibold line-through'>৳ 260</span></h4>
                                </div>
                            </div>
                            <div className='shadow-lg rounded-md'>
                                <div className=''>
                                    <img className='h-[300px] md:h-[220px] lg:h-[280px] w-full' src="https://i.ibb.co/tXbXCFj/cable-texture-sweater-1-343x367-crop-top-1.jpg" alt="" />
                                </div>
                                <div className='px-4 pt-4'>
                                    <h3 className='text-xl font-bold text-center'>Cable Texture Sweater</h3>
                                    <h4 className='text-center my-3'><span className='text-xl text-red-500 font-bold mr-3'>৳ 200</span><span className='text-slate-500 font-semibold line-through'>৳ 260</span></h4>
                                </div>
                            </div>
                            <div className='shadow-lg rounded-md'>
                                <div className=''>
                                    <img className='h-[300px] md:h-[220px] lg:h-[280px] w-full' src="https://i.ibb.co/tXbXCFj/cable-texture-sweater-1-343x367-crop-top-1.jpg" alt="" />
                                </div>
                                <div className='px-4 pt-4'>
                                    <h3 className='text-xl font-bold text-center'>Cable Texture Sweater</h3>
                                    <h4 className='text-center my-3'><span className='text-xl text-red-500 font-bold mr-3'>৳ 200</span><span className='text-slate-500 font-semibold line-through'>৳ 260</span></h4>
                                </div>
                            </div>
                            <div className='shadow-lg rounded-md'>
                                <div className=''>
                                    <img className='h-[300px] md:h-[220px] lg:h-[280px] w-full' src="https://i.ibb.co/tXbXCFj/cable-texture-sweater-1-343x367-crop-top-1.jpg" alt="" />
                                </div>
                                <div className='px-4 pt-4'>
                                    <h3 className='text-xl font-bold text-center'>Cable Texture Sweater</h3>
                                    <h4 className='text-center my-3'><span className='text-xl text-red-500 font-bold mr-3'>৳ 200</span><span className='text-slate-500 font-semibold line-through'>৳ 260</span></h4>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default NewArrivals;