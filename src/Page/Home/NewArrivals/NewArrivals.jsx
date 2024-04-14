import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const NewArrivals = () => {
    const [newProduct, setNewProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const axiosPublic = useAxiosPublic()
    useEffect(() => {
        setLoading(true)
        const getProduct = async () => {
            const result = await axiosPublic.get('/all/products')
            setNewProduct(result.data)
            setLoading(false)
        }
        getProduct()
    }, [])

    return (
        <div>
            <h1 className='uppercase text-4xl font-bold text-center my-10'>New Arrivals</h1>
            <div className="my-5">
                <div className=" lg:block md:hidden hidden">
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        {
                            newProduct.slice(0,5).map(product =>
                                <SwiperSlide className="px-2" key={product._id}>
                                    <div className="shadow-2xl p-2 h-[310px] cursor-pointer rounded-lg my-5">
                                        <div className=" border mx-auto rounded-xl">
                                            <img className=" mx-auto rounded-md w-full h-[220px]" src={product.image[0]} alt="" />
                                        </div>
                                        <div className='pt-2'>
                                            <h3 className='text-lg font-bold text-center'>{product.productName.length > 20 ? product.productName.slice(0, 18) : product.productName}{product.productName.length > 18 ? '...' : ''}</h3>
                                            <h4 className='text-center my-1'><span className='text-xl text-red-500 font-bold mr-3'>৳ {product.discountPrice}</span><span className='text-slate-500 font-semibold line-through'>৳ {product.mainPrice}</span></h4>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        }
                    </Swiper>
                </div>
                <div className=" lg:hidden md:block hidden">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        {
                            newProduct.slice(0,5).map(product =>
                                <SwiperSlide className="px-2" key={product._id}>
                                    <div className="shadow-xl cursor-pointer p-2 h-[300px] rounded-lg my-5">
                                        <div className=" border my-2 rounded-xl">
                                            <img className=" mx-auto rounded-xl w-full h-[200px]" src={product.image[0]} alt="" />
                                        </div>
                                        <div className='pt-1'>
                                            <h3 className='text-lg font-bold text-center'>{product.productName.length > 18 ? product.productName.slice(0, 18) : product.productName}{product.productName.length > 18 ? '...' : ''}</h3>
                                            <h4 className='text-center my-1'><span className='text-lg text-red-500 font-bold mr-3'>৳ {product.discountPrice}</span><span className='text-slate-500 font-semibold line-through'>৳ {product.mainPrice}</span></h4>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        }
                    </Swiper>
                </div>
                <div className=" lg:hidden md:hidden block">
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        {
                            newProduct.slice(0,5).map(product =>
                                <SwiperSlide className="px-2" key={product._id}>
                                    <div className="shadow-xl cursor-pointer p-2 rounded-lg my-5" >
                                        <div className=" border my-2 rounded-xl">
                                            <img className=" mx-auto rounded-xl w-full h-[170px]" src={product.image[0]} alt="" />
                                        </div>
                                        <div className='pt-1'>
                                            <h3 className='font-bold text-center'>{product.productName.length > 15 ? product.productName.slice(0, 15) : product.productName}{product.productName.length > 15 ? '...' : ''}</h3>
                                            <h4 className='text-center my-1'><span className=' text-red-500 font-bold mr-3'>৳ {product.discountPrice}</span><span className='text-slate-500 font-semibold line-through'>৳ {product.mainPrice}</span></h4>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        }
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default NewArrivals;