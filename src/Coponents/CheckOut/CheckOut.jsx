import { useContext, useEffect } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useState } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import { ImCross } from "react-icons/im";


const CheckOut = () => {
    const { cartProduct, deleteCartItem } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const location = useLocation()
    const [productId, setProductId] = useState(location.state)
    const [shippingLocation, setShippingLocation] = useState('insideDhaka')
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        const getCartProduct = async () => {
            if (cartProduct) {
                await axiosPublic.post('/get/cartItem/products', cartProduct)
                    .then(res => {
                        setProducts(res.data)
                        setLoading(false)
                    })
            }
            if (productId) {
                await axiosPublic.get(`/product/details/${productId}`)
                    .then(res => {
                        console.log(res.data);
                        setLoading(false)
                    })
            }
            setProducts([])
            setLoading(false)
        }
        getCartProduct()
    }, [cartProduct])
    console.log(products);
    const handleQuantity = (id, value, status = 'default') => {
        if (status === 'plus') {
            setProducts(pre =>
                pre?.map(product =>
                    product._id === id ? { ...product, quantity: product.quantity ? parseInt(product.quantity) + 1 : 2 } : product
                )
            )
        }
        if (status === 'minus') {
            setProducts(pre =>
                pre?.map(product =>
                    product._id === id ? { ...product, quantity: product.quantity ? parseInt(product.quantity) === 1 ? parseInt(product.quantity) - 0 : parseInt(product.quantity) - 1 : 1 } : product
                )
            )
        }

        if (status === 'default') {
            setProducts(pre =>
                pre.map(product =>
                    product._id === id ? { ...product, quantity: value } : product
                )
            )
        }

        // const calculateTotalPrice = products?.reduce((sum, product) => sum + ((product.quantity ? product.quantity : 1) * (product.discountPrice)), 0)
        // setTotalPrice(calculateTotalPrice)
        // console.log(calculateTotalPrice);
    }

    const handleOrderSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const phone = form.phone.value
        const email = form.email.value
        const address = form.address.value
        const date = moment().format('l')
        const time = moment().format('LTS');

        const orderData = { name, phone, email, address, product: products, location: shippingLocation, totalPrice: (products?.reduce((sum, product) => sum + ((product.quantity ? product.quantity : 1) * (product.discountPrice)), 0)), ShippingCost: (shippingLocation === 'insideDhaka' ? 70 : 120), date, time, status: 'pending' }

        await axiosPublic.post('/add/new/order', orderData)
            .then(res => {
                if (res.data.insertedId) {
                    form.reset()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thanks for Order",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/shop')
                }
            })
    }

    const handleValue = (e) => {
        setQuantity(e.target.value)
    }

    const handleSelectLocation = (e) => {
        e.preventDefault()
        setShippingLocation(e.target.value)
    }

    const handleCartItemDelete = (id) => {
        deleteCartItem(id)
    }

    if (loading) {
        return <h1>Loading....</h1>
    }


    return (
        <div className="my-5">
            <div className=" justify-center gap-x-2 bg-[#eff0f4] flex items-center border">
                <h1 className="text-2xl text-center font-semibold">confirm Your Order</h1>
                <img className="w-40 h-24" src="https://i.ibb.co/ZdrpQkT/4525270-removebg-preview.png" alt="" />
            </div>
            <div className="flex justify-center flex-col md:flex-row lg:flex-row gap-y-10 md:gap-x-4 lg:gap-x-10 mx-5 md:mx-5 lg:mx-0 my-10">
                <div className=" md:w-3/6 lg:w-2/6">
                    <form onSubmit={handleOrderSubmit}>
                        <input className="px-4 w-full mb-3 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="text" name="name" placeholder="আপনার নাম" id="" required /><br />
                        <input className="px-4 w-full mb-3 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="number" name="phone" placeholder="আপনার ফোন নম্বর" id="" required /><br />
                        <input className="px-4 w-full mb-3 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="email" name="email" placeholder="আপনার ইমেইল (ঐচ্ছিক)" id="" /><br />
                        <input className="px-4 w-full mb-3 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="text" name="address" placeholder="আপনার সম্পূর্ন ঠিকানা" id="" required /><br />
                        <select className="px-4 w-full mb-3 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" name="select" onChange={handleSelectLocation} required id="">
                            <option value="insideDhaka">ঢাকার ভেতরে</option>
                            <option value="outsideDhaka">ঢাকার বাহিরে</option>
                        </select>
                        <input type="submit" value='Confirm Order' className='btn bg-[#84a793] text-white hover:bg-[#518065] hover:text-white border border-[#999d9a] w-full text-center mt-3' />
                    </form>
                </div>

                <div className=' md:w-3/6 lg:w-1/2'>
                    <div className='bg-slate-100 p-2 mb-4 rounded-lg'>
                        <h1 className='text-2xl font-bold mb-3 text-center'>Total Order</h1>
                        <span className='flex justify-between'>
                            <p className='text-lg font-semibold'>Total Price : </p>
                            <p className='text-lg font-semibold'>{products?.reduce((sum, product) => sum + ((product.quantity ? product.quantity : 1) * (product.discountPrice)), 0)}</p>
                        </span>
                        <span className='flex justify-between border-b border-black pb-2'>
                            <p className='text-lg font-semibold'>Shipping Cost : </p>
                            <p className='text-lg font-semibold'>{shippingLocation === 'insideDhaka' ? 70 : 120}</p>
                        </span>
                        <span className='flex justify-between pt-2'>
                            <p className='text-lg font-semibold'>Grand Total : </p>
                            <p className='text-lg font-semibold text-white px-4 rounded-md bg-[#84a793]'>{(products?.reduce((sum, product) => sum + ((product.quantity ? product.quantity : 1) * (product.discountPrice)), 0)) + (shippingLocation === 'insideDhaka' ? 70 : 120)}</p>
                        </span>
                    </div>
                    <div>
                        {
                            products?.map(product =>
                                <div key={product._id} className='w-full mb-5 shadow-md'>
                                    <div className='flex gap-x-3 items-center md:gap-x-2 lg:gap-x-4'>
                                        <img className=' w-[100px] md:w-[70px] lg:w-[100px] h-[100px] md:h-[70px] lg:h-[100px] rounded-lg p-1' src={product.image[0]} alt="" />
                                        <div className='w-full'>
                                            <div className='flex justify-between items-center '>
                                                <p className=' md:text-base lg:text-xl hidden lg:block md:hidden md:mb-0 lg:mb-2 font-bold'>{product.productName.length > 37 ? product.productName.slice(0, 37) : product.productName}{product.productName.length > 37 ? '....' : ''}</p>
                                                <p className=' md:text-base lg:text-xl md:mb-0 lg:mb-2 hidden md:block lg:hidden  font-bold'>{product.productName.length > 30 ? product.productName.slice(0, 28) : product.productName}{product.productName.length > 30 ? '....' : ''}</p>
                                                <p className=' md:text-base lg:text-xl md:mb-0 lg:mb-2 block md:hidden lg:hidden  font-bold'>{product.productName.length > 25 ? product.productName.slice(0, 25) : product.productName}{product.productName.length > 30 ? '....' : ''}</p>
                                                <ImCross onClick={handleCartItemDelete} className='mr-3 cursor-pointer text-red-500'></ImCross>
                                            </div>
                                            <div className='flex flex-col md:flex-row lg:flex-row justify-between'>
                                                <div className="flex items-center gap-x-2">
                                                    <p className=" md:text-sm lg:text-base font-medium">Quantity :</p>
                                                    <div className="flex items-center gap-x-2">
                                                        <FaMinus onClick={() => handleQuantity(product._id, parseInt(document.getElementById(`${product._id}`).value), 'minus')} className="cursor-pointer font-bold"></FaMinus>
                                                        <input onChange={() => handleQuantity(product._id, parseInt(document.getElementById(`${product._id}`).value))} id={product._id} className="w-[60px] md:w-[55px] lg:w-[70px] text-slate-600 font-medium px-4 outline-none focus:border-blue-400 rounded-sm py-1 border" type="number" defaultValue='1' min='1' value={product?.quantity} />
                                                        <FaPlus onClick={() => handleQuantity(product._id, parseInt(document.getElementById(`${product._id}`).value), 'plus')} className="cursor-pointer"></FaPlus>
                                                    </div>
                                                </div>
                                                <div className='text-center flex items-center md:gap-x-1 lg:gap-x-3 mr-4 md:mr-3 lg:mr-5'>
                                                    <h1 className='mb-1 md:text-base lg:text-lg font-bold '>Price: </h1>
                                                    <p className='font-semibold text-slate-500'>{(product.quantity ? product.quantity : 1) * (product.discountPrice)}</p>
                                                </div>
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

export default CheckOut;