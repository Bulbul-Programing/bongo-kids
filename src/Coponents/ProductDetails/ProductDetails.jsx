import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
// import { ImageWithZoom, Slide, Slider } from "pure-react-carousel";
import { TbCurrencyTaka } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { AuthContext } from "../AuthProvider/AuthProvider";


const ProductDetails = () => {
    const axiosPublic = useAxiosPublic()
    const [selectImg, setSelectImg] = useState(0)
    const { id } = useParams()
    const [quantity, setQuantity] = useState(1)
    const [relatedProduct, setRelatedProduct] = useState([])
    const [productId, setProductId] = useState(id)
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(false)
    const { cartItem } = useContext(AuthContext)

    useEffect(() => {
        const g = async () => {
            setLoading(true)
            const res = await axiosPublic.get(`/product/details/${productId}`)
            const relatedProduct = await axiosPublic.get(`/product/category/${res.data.ProductCategory}`)
            setRelatedProduct(relatedProduct.data)
            setLoading(false)
            setProduct(res.data);
        }
        g()
    }, [id, productId])
    const handleImageIndex = (index) => {
        setSelectImg(index)
    }

    const handleQuantity = (value) => {
        if (value === 'minus') {
            if (quantity === 1) {
                return
            }
            else {
                setQuantity(parseInt(quantity) - 1)
            }
        }

        if (value === 'plus') {
            setQuantity(parseInt(quantity) + 1)
        }
    }

    const handleValue = (e) => {
        setQuantity(e.target.value)
    }

    const handleRelatedProduct = (id) => {
        setProductId(id)
    }

    const handleCartItem = (product) => {
        cartItem(product._id)
    }

    if (loading) {
        return <div className="flex justify-center my-20"><span className="loading loading-ring loading-lg"></span></div>
    }

    return (
        <div>
            {
                product && <div className=" mx-5 md:mx-10 lg:mx-20 my-10 ">
                    <div className="flex flex-col md:flex-row lg:flex-row">
                        <div className=" min-w-[300px] max-w-[300px]">
                            <img className=" border rounded-md w-[300px] h-[300px]" src={product?.image[selectImg]} alt="" />
                            <div className="overflow-x-auto my-3 gap-x-2 flex items-center">
                                {
                                    product?.image.map((img, index) =>
                                        <img key={index} onClick={() => handleImageIndex(index)} className={`${selectImg === index && 'border-[#84a793] border-2'} p-[2px] w-20 h-20 cursor-pointer rounded-md flex justify-center items-center `} src={img} alt="" />
                                    )
                                }
                            </div>
                        </div>
                        <div className=" md:mx-5 lg:mx-10 my-5 md:w-full lg:w-2/4">
                            <p className="text-lg lg:text-2xl font-bold  border-b pb-3">{product.productName}</p>
                            <div className="py-5 border-b">
                                <div className="flex items-center gap-x-2">
                                    <p className="flex text-base md:text-base lg:text-xl items-center text-red-400 font-bold"><TbCurrencyTaka className="text-lg md:text-2xl lg:text-3xl font-extrabold"></TbCurrencyTaka> <span>{product.discountPrice * quantity}</span></p>
                                    <p className="flex text-xs md:text-base lg:text-lg items-center line-through text-slate-400 font-medium"><TbCurrencyTaka className="text-sm md:text-lg lg:text-lg line-through font-extrabold"></TbCurrencyTaka> <span>{product.mainPrice * quantity}</span></p>
                                    <span className="text-xs md:text-sm lg:text-2xl font-semibold ml-2">{Math.round((product.mainPrice - product.discountPrice) * 100 / product.mainPrice)} %off</span>
                                </div>
                                <div>
                                    <p className="mt-5 bg-slate-200 inline-block px-4 py-1 rounded-lg">Category: <span className="font-semibold">{product.ProductCategory}</span></p>
                                    <div className="flex my-2 gap-x-3">
                                        <p>Available Size : </p>
                                        {
                                            product?.size?.map((sizeName, index) =>
                                                <p key={index} className='bg-slate-200 text-sm py-1 inline-block mr-1 font-bold px-2 rounded-md'>{sizeName.size}</p>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="flex items-center  gap-x-4 mt-5">
                                    <p className="text-lg font-medium">Quantity :</p>
                                    <div className="flex items-center gap-x-4">
                                        <FaMinus onClick={() => handleQuantity('minus')} className="cursor-pointer text-2xl font-bold"></FaMinus>
                                        <input className="w-[80px] text-slate-600 font-medium px-4 outline-none focus:border-blue-400 rounded-sm py-2 border" type="number" defaultValue='1' onChange={handleValue} value={quantity} min='1' />
                                        <FaPlus onClick={() => handleQuantity('plus')} className="cursor-pointer text-2xl"></FaPlus>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-start">
                                <Link onClick={() => handleCartItem(product)} to={`/checkout`}><button className="px-5 py-3 my-2 bg-[#84a793] mb-8 hover:bg-[#303030] delay-75 transition ease-in-out text-white font-medium rounded-md">Bye Now</button></Link>
                                <button onClick={() => handleCartItem(product)} className="px-5 py-3 my-2 bg-[#84a793] mb-8 hover:bg-[#303030] delay-75 transition ease-in-out text-white font-medium rounded-md ml-3">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-medium pb-2 border-b mt-10 inline-block">Product Details:</h1>
                        <p className="mt-2 text-slate-500">{product.productDetails}</p>
                    </div>
                    <div>
                        <h1 className="text-2xl font-medium pb-2 border-b mt-10 inline-block">Ratings & Reviews</h1>
                        <p className="mt-2 text-slate-500">Ratings & Reviews coming...</p>
                    </div>
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
                                    relatedProduct.map(product =>
                                        <SwiperSlide className="px-2" key={product._id}>
                                            <div onClick={() => handleRelatedProduct(product._id)} className="shadow-2xl p-2 h-[280px] cursor-pointer rounded-lg my-5">
                                                <div className=" border mx-auto rounded-xl">
                                                    <img className=" mx-auto rounded-md w-full h-[220px]" src={product.image[0]} alt="" />
                                                </div>
                                                <p className=" my-4 text-xl md:text-base lg:text-base font-semibold text-wrap">{product.productName.length > 22 ? product.productName.slice(0, 22) : product.productName}{product.productName.length > 22 ? '...' : ''}</p>
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
                                    relatedProduct.map(product =>
                                        <SwiperSlide className="px-2" key={product._id}>
                                            <div onClick={() => handleRelatedProduct(product._id)} className="shadow-xl cursor-pointer p-2 h-[270px] rounded-lg my-5">
                                                <div className=" border my-2 rounded-xl">
                                                    <img className=" mx-auto rounded-xl w-full h-[200px]" src={product.image[0]} alt="" />
                                                </div>
                                                <p className=" my-4 text-sm md:text-base lg:text-base font-semibold text-wrap">{product.productName.length > 20 ? product.productName.slice(0, 20) : product.productName}{product.productName.length > 20 ? '...' : ''}</p>
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
                                    relatedProduct.map(product =>
                                        <SwiperSlide className="px-2" key={product._id}>
                                            <div className="shadow-xl cursor-pointer p-2 rounded-lg my-5" onClick={() => handleRelatedProduct(product._id)}>
                                                <div className=" border my-2 rounded-xl">
                                                    <img className=" mx-auto rounded-xl w-full h-[170px]" src={product.image[0]} alt="" />
                                                </div>
                                                <p className=" my-2 text-sm md:text-base lg:text-base font-semibold text-wrap">{product.productName.length > 18 ? product.productName.slice(0, 18) : product.productName}{product.productName.length > 18 ? '...' : ''}</p>
                                            </div>
                                        </SwiperSlide>
                                    )
                                }
                            </Swiper>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default ProductDetails;