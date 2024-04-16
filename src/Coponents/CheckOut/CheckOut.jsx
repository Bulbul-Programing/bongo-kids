import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useState } from "react";
import moment from "moment";
import Swal from "sweetalert2";

const CheckOut = () => {
    const { cartProduct } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const location = useLocation()
    const { id } = useParams()
    const [quantity, setQuantity] = useState(location.state)
    const [shippingLocation, setShippingLocation] = useState('insideDhaka')
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const getCartProduct = async () => {
            await axiosPublic.post('/get/cartItem/products', cartProduct)
                .then(res => {
                    setProducts(res.data)
                    setLoading(false)
                })
        }
        getCartProduct()
    }, [cartProduct])

    const handleQuantity = (id, value, status = 'default') => {
        if (status === 'plus') {
            console.log('plus');
            setProducts(pre =>
                pre.map(product =>
                    product._id === id ? { ...product, quantity: product.quantity ? parseInt(product.quantity) + 1 : 2 }: product
                )
            )
        }
        if (status === 'minus') {
            setProducts(pre =>
                pre.map(product =>
                    product._id === id ? { ...product, quantity: product.quantity ? parseInt(product.quantity) + 1 : 2} : product
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

        const orderData = { name, phone, email, address, product: product._id, location: shippingLocation, totalPrice: (product?.discountPrice * quantity), ShippingCost: (shippingLocation === 'insideDhaka' ? 70 : 120), productName: product?.productName, productImage: product?.image[0], date, time, status: 'pending', productQuantity: quantity, productPrice: product?.discountPrice, grandTotal: ((shippingLocation === 'insideDhaka' ? 70 : 120) + product?.discountPrice * quantity) }

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
                    navigate('/product')
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

    if (loading) {
        return <h1>Loading....</h1>
    }


    return (
        <div className="my-5">
            <div className=" justify-center gap-x-2 bg-[#eff0f4] flex items-center border">
                <h1 className="text-2xl text-center font-semibold">confirm Your Order</h1>
                <img className="w-40 h-24" src="https://i.ibb.co/3dW03TH/New-Project-10.png" alt="" />
            </div>
            <div className="flex flex-col md:flex-row lg:flex-row gap-y-10 mx-5 md:mx-10 lg:mx-20 my-10">
                <div className=" md:w-1/2 lg:w-1/2">
                    <form onSubmit={handleOrderSubmit}>
                        <input className="px-4 w-full mb-3 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="text" name="name" placeholder="আপনার নাম" id="" required /><br />
                        <input className="px-4 w-full mb-3 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="number" name="phone" placeholder="আপনার ফোন নম্বর" id="" required /><br />
                        <input className="px-4 w-full mb-3 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="email" name="email" placeholder="আপনার ইমেইল (ঐচ্ছিক)" id="" /><br />
                        <input className="px-4 w-full mb-3 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="text" name="address" placeholder="আপনার সম্পূর্ন ঠিকানা" id="" required /><br />
                        <select className="px-4 w-full mb-3 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" name="select" onChange={handleSelectLocation} required id="">
                            <option value="insideDhaka">ঢাকার ভেতরে</option>
                            <option value="outsideDhaka">ঢাকার বাহিরে</option>
                        </select>
                        <input type="submit" value='Confirm Order' className='btn bg-[#dadada] hover:bg-[#eff0f4] border border-[#999d9a] w-full text-center mt-3 hover:text-black' />
                    </form>
                </div>

                <div className='w-1/2'>
                    {
                        products?.map(product =>
                            <div className='flex w-full items-center justify-between gap-x-3 shadow-md'>
                                <img className='w-[100px] h-[100px] p-1' src={product.image[0]} alt="" />
                                <div>
                                    <p className='text-xl mb-2 font-semibold'>{product.productName}</p>
                                    <div className="flex items-center gap-x-2">
                                        <p className=" font-medium">Quantity :</p>
                                        <div className="flex items-center gap-x-2">
                                            <FaMinus onClick={() => handleQuantity(product._id, parseInt(document.getElementById(`${product._id}`).value), 'minus')} className="cursor-pointer font-bold"></FaMinus>
                                            <input onChange={() => handleQuantity(product._id, parseInt(document.getElementById(`${product._id}`).value))} id={product._id} className="w-[70px] text-slate-600 font-medium px-4 outline-none focus:border-blue-400 rounded-sm py-1 border" type="number" defaultValue='1' min='1' value={product?.quantity} />
                                            <FaPlus onClick={() => handleQuantity(product._id, parseInt(document.getElementById(`${product._id}`).value), 'plus')} className="cursor-pointer"></FaPlus>
                                        </div>
                                    </div>
                                </div>
                                <p>{product.quantity ? product.quantity : 1}</p>
                            </div>
                        )
                    }
                </div>
                {/* <div className="md:w-1/2 lg:w-1/2">
                    <div className="flex flex-col md:flex-col lg:flex-row gap-x-3 ">
                        <img className="w-[150px] ml-10 h-[100px] rounded-lg" src={product?.image[0]} alt="" />
                        <div className="md:mx-5 lg:mx-0">
                            <p className="text-lg w-full font-medium my-4 lg:my-2">{product?.productName}</p>
                            <div className="flex items-center gap-x-2">
                                <p className=" font-medium">Quantity :</p>
                                <div className="flex items-center gap-x-2">
                                    <FaMinus onClick={() => handleQuantity('minus')} className="cursor-pointer text-2xl font-bold"></FaMinus>
                                    <input className="w-[80px] text-slate-600 font-medium px-4 outline-none focus:border-blue-400 rounded-sm py-2 border" type="number" onChange={handleValue} value={quantity} min='1' />
                                    <FaPlus onClick={() => handleQuantity('plus')} className="cursor-pointer text-2xl"></FaPlus>
                                </div>
                            </div>
                        </div>
                    </div>

                </div> */}
                {/* <div className=" lg:mx-10 my-5 shadow-xl border rounded-lg p-4">
                    <div>
                        <p className="text-2xl font-bold border-b pb-3">Your Order</p>
                        <div className="my-3">
                            <div className="flex justify-between md:px-3 lg:px-10">
                                <p className="text-slate-500 text-lg font-medium">Product Price</p>
                                <p className="text-slate-500 text-lg font-medium">: {product?.discountPrice * quantity} Taka </p>
                            </div>
                            <div className="flex justify-between md:px-3 lg:px-10 pb-3 border-b">
                                <p className="text-slate-500 text-lg font-medium">Shipping Cost</p>
                                <p className="text-slate-500 text-lg font-medium">: {shippingLocation === 'insideDhaka' ? 70 : 120} Taka </p>
                            </div>
                            <div className="flex justify-between md:px-3 lg:px-10">
                                <p className="text-slate-500 text-lg font-medium">Total</p>
                                <p className="text-slate-500 text-lg font-medium">: {(shippingLocation === 'insideDhaka' ? 70 : 120) + product?.discountPrice * quantity} Taka </p>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default CheckOut;