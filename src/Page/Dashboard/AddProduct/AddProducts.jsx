import React, { useContext, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import axios from 'axios';
import Swal from "sweetalert2";
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { AuthContext } from '../../../Coponents/AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';

const AddProducts = () => {
    const [loading, setLoading] = useState(false)
    const [files, setFiles] = useState([])
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const imageHostingKey = import.meta.env.VITE_HOSTING_KEY
    const imageHosting = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
    const [clothingItem, setClothingItem] = useState(false)

    const { data: allProducts, refetch, isLoading } = useQuery({
        queryKey: ['getAllProduct'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all/products')
            return res.data
        }
    })

    const handleUpload = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const promises = files.map(async (file) => {
                const formData = new FormData();
                formData.append('image', file);

                const response = await axios.post(imageHosting, formData, {
                    params: {
                        key: imageHostingKey,
                    },
                });
                return response.data.data.url;
            });
            const uploadedImageUrls = await Promise.all(promises);
            const date = moment().format('l')
            const time = moment().format('LTS');
            const size = []
            const sizeS = e.target.sizeS.checked
            const sizeM = e.target.sizeM.checked
            const sizeL = e.target.sizeL.checked
            const sizeXL = e.target.sizeXL.checked

            if (sizeS === true) {
                size.push({ size: 's' })
            }
            if (sizeM === true) {
                size.push({ size: 'M' })
            }
            if (sizeL === true) {
                size.push({ size: 'L' })
            }
            if (sizeXL === true) {
                size.push({ size: 'XL' })
            }

            const productData = { date, time, productName: e.target.ProductName.value, gender: e.target.genderSelect.value, image: uploadedImageUrls, ProductCategory: e.target.category.value, mainPrice: e.target.mainPrice.value, discountPrice: e.target.DiscountPrice.value, productDetails: e.target.productDes.value, adminEmail: user.email, adminName: user.displayName, adminPhoto: user.photoURL, condition: 'product', size }

            await axiosSecure.post('/add/new/product', productData)
                .then(res => {
                    if (res.data.insertedId) {
                        e.target.reset()
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Product add successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        setLoading(false)
                        refetch()
                        setFiles([])
                    }
                })
                .catch(error => {
                    if (error.response.data.massage === 'Forbidden') {
                        logOut()
                        navigate('/login')
                    }
                })
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    }


    const handleCategory = (e) => {
        if (e.target.value === 'Clothing') {
            setClothingItem(true)
        }
        else {
            setClothingItem(false)
        }
    }
    const handleFileChange = (event) => {
        setFiles([...event.target.files]);
    }
    console.log(allProducts);

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/delete/product/${id}`)
                    .then(res => {
                        if (res.status === 200) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Product delete successfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch()
                        }
                    })
                    .catch(error => {
                        if (error.response.data.massage === 'Forbidden') {
                            logOut()
                            navigate('/login')
                        }
                    })
            }
        });
    }

    if (isLoading) {
        return (
            <div className='flex justify-center my-10'>
                <span className="loading loading-ring loading-lg "></span>
            </div>
        )
    }

    return (
        <div>
            <div className="my-5 md:my-10 lg:my-10">
                <button className="btn bg-blue-400 ml-3 text-white font-bold hover:text-black" onClick={() => document.getElementById('my_modal_5').showModal()}>Add Product</button>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <form onSubmit={handleUpload}>
                            <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="text" name="ProductName" placeholder="Product Title" required /> <br />
                            <div className='flex gap-x-2'>
                                <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="number" name="mainPrice" placeholder="Main price" min='1' required /> <br />
                                <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="number" name="DiscountPrice" placeholder="Discount price" min='1' required /> <br />
                            </div>

                            <input className="pr-4 w-full mb-6 outline-none  border-2 focus:border-blue-400 rounded-lg text-slate-500 file-input file-input-bordered " onChange={handleFileChange} type="file" multiple />
                            <select onChange={handleCategory} className="px-2 outline-none py-3 border-2 w-full mb-6 focus:border-blue-400 rounded-lg text-slate-500" name="category" id="">
                                <option className="rounded-lg text-slate-500 p-2" value='DefaultCategory'>Select Category</option>
                                <option className="rounded-lg text-slate-500 p-2" value='Electronic & Gadgets'>Electronic & Gadgets</option>
                                <option className="rounded-lg text-slate-500 p-2" value='Home & Kitchen'>Home & Kitchen</option>
                                <option className="rounded-lg text-slate-500 p-2" value='Clothing'>Clothing</option>
                                <option className="rounded-lg text-slate-500 p-2" value='Health & Fitness'>Health & Fitness</option>
                            </select>

                            <select name="genderSelect" className={`${clothingItem === true ? 'block' : 'hidden'} px-2 w-full mb-6 outline-none  border-2 focus:border-blue-400 rounded-lg text-slate-500 file-input file-input-bordered `}>
                                <option className="rounded-lg text-slate-500 p-4" value='Default'>Select Gender</option>
                                <option className="rounded-lg text-slate-500 p-4" value='Boy'>Boy</option>
                                <option className="rounded-lg text-slate-500 p-2" value='Girl'>Girl</option>
                            </select>

                            <div className={`${clothingItem === true ? 'block' : 'hidden'} mb-6`}>
                                <input name='sizeS' type="checkbox" id='sizeS' className="checkbox checkbox-primary" />
                                <label htmlFor="sizeS" className='text-3xl ml-2 mr-4 font-bold'>S</label>
                                <input name='sizeM' type="checkbox" id='sizeM' className="checkbox checkbox-primary" />
                                <label htmlFor="sizeS" className='text-3xl ml-2 mr-4 font-bold'>M</label>
                                <input name='sizeL' type="checkbox" id='sizeL' className="checkbox checkbox-primary" />
                                <label htmlFor="sizeS" className='text-3xl ml-2 mr-4 font-bold'>L</label>
                                <input name='sizeXL' type="checkbox" id='sizeXL' className="checkbox checkbox-primary" />
                                <label htmlFor="sizeS" className='text-3xl ml-2 mr-4 font-bold'>XL</label>
                            </div>

                            <textarea className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" name="productDes" id="" cols="30" rows="2" placeholder='Product description'></textarea>
                            <div>
                                {
                                    loading === true ? <button className='btn bg-blue-500 w-full text-center'><span className="loading loading-spinner loading-lg"></span></button> : files.length === 0 ? <input className='btn bg-blue-500 w-full text-center hover:text-black' type="submit" disabled value="ADD" /> : <input className='btn bg-blue-500 w-full text-center text-white hover:text-black' type="submit" value="ADD" />
                                }
                            </div>
                        </form>
                        <div className="modal-action ">
                            <form method="dialog" className="w-full">
                                <button onClick={() => setLoading(false)} className="btn w-full text-white bg-red-500">Cancel</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
            <div className="overflow-x-auto shadow-xl p-5 rounded-xl">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                            </th>
                            <th>Image</th>
                            <th>Product Title</th>
                            <th>admin Details</th>
                            <th>Product Details</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allProducts?.map((product, index) =>
                                <tr key={product._id}>
                                    <th>
                                        <h1 className="text-lg">{index + 1}</h1>
                                    </th>

                                    <td className="min-w-[100px]">
                                        <img className='bg-[#EFF0F4] w-[70px] h-[70px] rounded-md' src={product.image[0]} alt="" />
                                    </td>
                                    <td className="min-w-[220px]">
                                        <div className="">
                                            <p className="font-bold text-sm">{product.productName.length > 15 ? product.productName.slice(0, 20) : product.productName}{product.productName.length > 15 ? '....' : ''}</p>

                                            <div className='flex gap-x-1 my-1'>
                                                {
                                                    product?.size?.map((g, index) => <p key={index} className='bg-slate-200 text-sm py-1 px-2 rounded-md font-medium'>{g.size}</p>)
                                                }
                                                <h1 className='bg-slate-100 px-2 py-1 rounded-sm font-medium inline-block'>{product?.gender}</h1>
                                            </div>
                                            <p className="bg-slate-200 inline-block text-sm py-1 px-2 rounded-md font-medium">Category : {product?.ProductCategory}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="min-w-[120px]">
                                            <p className="font-bold text-xs">{product.adminName}</p>
                                            <p className="font-medium text-xs text-slate-600">{product.adminEmail}</p>
                                            <p className="text-slate-600 text-xs rounded-lg font-medium">Time : {product?.time}</p>
                                            <p className="text-slate-600 text-xs rounded-lg font-medium">Date : {product?.date}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <p className='text-slate-600 my-1'>{product.productDetails.length > 80 ? product.productDetails.slice(0, 80) : product.productDetails}{product.productDetails.length > 80 ? '....' : ''}</p>
                                        <p className='text-slate-600 font-bold'>Price: {product.discountPrice} / {product.mainPrice}</p>
                                    </td>
                                    <th className="w-[100px]">
                                        <div className="flex justify-center">
                                            <button onClick={() => handleDelete(product._id)} className="btn bg-red-500 text-white hover:text-black">Delete</button>
                                        </div>
                                    </th>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddProducts;