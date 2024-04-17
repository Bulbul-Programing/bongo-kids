import { IoSearch } from "react-icons/io5";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { TbCurrencyTaka } from "react-icons/tb";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Coponents/AuthProvider/AuthProvider";

const Shop = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [allProduct, setAllProduct] = useState([])
    const [maxValue, setMaxValue] = useState(0)
    const [minValue, setMinValue] = useState(0)
    const {cartItem} = useContext(AuthContext)

    useEffect(() => {
        const getProduct = async () => {
            setIsLoading(true)
            await axiosPublic.get('/all/products')
                .then(res => {
                    setProducts(res.data)
                    setAllProduct(res.data)
                })
            setIsLoading(false)
        }
        getProduct()
    }, [])

    const handleCategory = async (e) => {
        e.preventDefault()
        const searchCategory = e.target.value
        if (searchCategory === 'DefaultCategory') {
            setProducts(allProduct)
        }
        if (searchCategory !== 'DefaultCategory') {
            await axiosPublic.get(`/search/product/${searchCategory}`)
                .then(res => setProducts(res.data))
        }
    }

    const handlePriceSearch = async (e) => {
        e.preventDefault()
        const minPrice = e.target.minPrice.value
        const maxPrice = e.target.maxPrice.value
        await axiosPublic.get(`/search/vi/price?minPrice=${minPrice - 1}&maxPrice=${maxPrice + 1}`)
            .then(res => setProducts(res.data))
    }

    const handleSearch = async (e) => {
        const searchTitle = e.target.value
        if (searchTitle.length === 0) {
            setProducts(allProduct)
        }
        if (searchTitle.length !== 0) {
            await axiosPublic.get(`/search/product/vi/${searchTitle}`)
                .then(res => setProducts(res.data))
        }
    }

    const handleMinValue = (e) => {
        setMinValue(e.target.value);
    }
    const handleMaxValue = (e) => {
        setMaxValue(e.target.value);
    }

    const handleCartItem = (product) => {
        cartItem(product._id)
    }

    if (isLoading) {
        return <div className="flex justify-center my-20"><span className="loading loading-ring loading-lg"></span></div>
    }

    return (
        <div>
            <div className="mx-5 my-5 lg:m-10 bg-contain bg-no-repeat bg-center bg-[url(https://i.ibb.co/xmk4Brn/11878914-Big-phone-with-cart-removebg-preview.png)]">
                <h1 className=" px-3 text-lg md:text-2xl lg:text-3xl rounded-lg font-bold py-5 md:py-10 lg:py-16 bg-[#eff0f4] bg-opacity-70 text-center">Your One-Stop Shop, All Products at Your Fingertips</h1>
            </div>
            <div>
                <div className="hidden md:block lg:block">
                    <div className="flex  flex-col md:flex-row lg:flex-row gap-x-3 justify-center">
                        <div className="relative">
                            <input onChange={handleSearch} className="px-2 md:w-[150px] lg:w-full outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="text" placeholder="Search Hear" />
                            <IoSearch className="absolute text-2xl text-slate-500 md:left-[120px] lg:left-44 top-4"></IoSearch>
                        </div>
                        <div>
                            <select onChange={handleCategory} className="px-5 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" name="category" id="">
                                <option className="rounded-lg text-slate-500 p-2" value='DefaultCategory'>Select Category</option>
                                <option className="rounded-lg text-slate-500 p-2" value='Electronic & Gadgets'>Electronic & Gadgets</option>
                                <option className="rounded-lg text-slate-500 p-2" value='Home & Kitchen'>Home & Kitchen</option>
                                <option className="rounded-lg text-slate-500 p-2" value='Clothing'>Clothing</option>
                                <option className="rounded-lg text-slate-500 p-2" value='Health & Fitness'>Health & Fitness</option>
                            </select>
                        </div>
                        <div>
                            <form className="flex flex-col md:flex-row lg:flex-row gap-x-3" onSubmit={handlePriceSearch}>
                                <input onChange={handleMinValue} className="px-4 w-36 md:w-24 lg:w-36 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="number" name="minPrice" placeholder="Min Price" min='0' max={maxValue} required />
                                <input onChange={handleMaxValue} className="px-4 w-36 md:w-24 lg:w-36 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="number" name="maxPrice" placeholder="Max Price" min={minValue} required />
                                <input type="submit" className="btn w-20 bg-blue-500 text-center text-white hover:text-black" value='Search' />
                            </form>
                        </div>
                    </div>
                </div>
                <div className="block mx-5 md:hidden lg:hidden">
                    <div className="flex flex-col gap-y-3 justify-center">
                        <div className="flex gap-x-1">
                            <div className="">
                                <input onChange={handleSearch} className="px-4 w-11/12 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="text" placeholder="Search Hear" />
                            </div>

                            <div>
                                <select onChange={handleCategory} className="px-5 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" name="category" id="">
                                    <option className="rounded-lg text-slate-500 p-2" value='DefaultCategory'>Select Category</option>
                                    <option className="rounded-lg text-slate-500 p-2" value='Electronic & Gadgets'>Electronic & Gadgets</option>
                                    <option className="rounded-lg text-slate-500 p-2" value='Home & Kitchen'>Home & Kitchen</option>
                                    <option className="rounded-lg text-slate-500 p-2" value='Clothing'>Clothing</option>
                                    <option className="rounded-lg text-slate-500 p-2" value='Health & Fitness'>Health & Fitness</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <form className="flex gap-x-3" onSubmit={handlePriceSearch}>
                                <input className="px-4 w-[100px] outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="number" name="minPrice" placeholder="Min Price" min='0' required />
                                <input className="px-4 w-[100px] outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="number" name="maxPrice" placeholder="Max Price" min='1' required />
                                <input type="submit" className="btn w-[100px] bg-blue-500 text-center text-white hover:text-black" value='Search' />
                            </form>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={`${products.length === 0 ? 'block' : 'hidden'} my-10`}>
                        <h1 className="text-2xl text-center font-bold ">Nothing Found</h1>
                        <div className=" flex justify-center">
                            <img className="w-[400px]" src="https://i.ibb.co/GskWLh0/9264822.jpg" alt="" />
                        </div>
                    </div>
                    <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 m-10 md:m-5 lg:m-10 `}>
                        {
                            products?.map(product =>
                                <div navigate={`/productDetails/${product?._id}`} key={product?._id}>
                                    <div className="shadow-xl relative h-[400px] md:h-[350px] lg:h-[400px] rounded-lg p-3">
                                        <img className="w-full h-[240px] md:h-[200px] lg:h-[250px] transition ease-in hover:scale-105 duration-200 rounded-lg shadow-md" src={product?.image[0]} alt="" />
                                        <p className=" mt-4 text-sm md:text-base lg:text-base font-semibold text-wrap">{product.productName.length > 22 ? product.productName.slice(0, 22) : product.productName}{product.productName.length > 22 ? '....' : ''}</p>
                                        <div className="absolute bottom-3 w-full">
                                            <div className="flex items-center gap-x-0.5">
                                                <p className="flex text-base md:text-base lg:text-base items-center text-red-400 font-bold">৳ <span>{product?.discountPrice}</span></p>
                                                <p className="flex text-xs md:text-base lg:text-base items-center line-through text-slate-400 ml-2 font-medium">৳ <span>{product.mainPrice}</span></p>
                                                <span className="text-xs md:text-sm lg:text-lg font-semibold ml-2">{Math.round((product?.mainPrice - product?.discountPrice) * 100 / product?.mainPrice)} %off</span>
                                            </div>
                                            <div className="flex justify-center">
                                                <Link className="mr-2 mt-2 px-4 md:px-2 lg:px-2 rounded-md bg-[#84a793] hover:bg-[#303030] delay-75 transition ease-in-out text-white font-bold cursor-pointer py-2 text-center" to={`/productDetails/${product?._id}`}><button className="text-center">Bye Now</button></Link>
                                                <button onClick={() => handleCartItem(product)} className="mr-6 mt-2 px-4 md:px-2 lg:px-2 rounded-md bg-[#84a793] hover:bg-[#303030] delay-75 transition ease-in-out text-white font-bold cursor-pointer py-2 text-center">Add to Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;