import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Coponents/AuthProvider/AuthProvider";

const Orders = () => {
    const axiosSecure = useAxiosSecure()
    const date = moment().format('l')
    const time = moment().format('LTS');
    const axiosPublic = useAxiosPublic()
    const { logOut } = useContext(AuthContext)
    const navigate = useNavigate()
    const [modalIndex, setModalIndex] = useState(0)

    const handleRemoveOrder = async (id) => {
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
                await axiosSecure.delete(`/remove/order/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Order delete successfully",
                                showConfirmButton: false,
                                timer: 1500
                            })
                            refetch()
                        }
                    })
                    .catch(error => {
                    })
            }
        });
    }

    const { data: orders, isLoading, refetch } = useQuery({
        queryKey: ['getAllOrders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/get/all/order')
            return res.data
        }
    })

    console.log(orders);

    const handleStatus = async (id, status) => {
        console.log(id, status);
        console.log(id);
        await axiosSecure.put(`/update/order/status/${id}`, { status })
            .then(res => {
                console.log(res);
                if (res.data.modifiedCount > 0) {
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

    if (isLoading) {
        return <div className="flex justify-center my-20"><span className="loading loading-ring loading-lg"></span></div>
    }

    const handleModal = (index) => {
        document.getElementById('my_modal_4').showModal()
        setModalIndex(index);
    }

    return (
        <div className="m-2 md:m-5 lg:m-5">
            <div className=" py-5 md:py-10 lg:py-20 rounded-2xl bg-[#eff0f4]">
                <h1 className="text-3xl font-bold text-center">Add New Product</h1>
            </div>
            <div>
                <h1 className="text-2xl font-bold bg-blue-100 inline-block px-6 py-3 rounded-lg my-5">Total Orders : {orders.length} </h1>
            </div>
            <div className="overflow-x-auto shadow-xl p-5 rounded-xl">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>

                            </th>
                            <th>customer info</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((order, index) =>
                                <tr key={order._id}>
                                    <th>
                                        <h1 className="text-lg">{index + 1}</h1>
                                    </th>
                                    <td className="flex gap-x-5">
                                        <div className="min-w-[150px]">
                                            <p className="font-bold ">Name: {order.name}</p>
                                            <p className="font-medium  text-slate-600">Phone: {order.phone}</p>
                                            <p className="text-slate-600  py-1 rounded-lg font-medium">Email: {order?.email}</p>
                                            <p className="text-slate-600  py-1 rounded-lg font-medium">Total Order: {order?.product.length} pic</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-600  py-1 rounded-lg font-medium">Time: {order?.time}</p>
                                            <p className="text-slate-600  py-1 rounded-lg font-medium">Time: {order?.date}</p>
                                            <p>Location <span className="text-slate-600  py-1 rounded-lg font-medium">{order.address}</span></p>
                                        </div>
                                    </td>

                                    <th className="w-[240px]">
                                        {
                                            order.status === "pending" &&
                                            <div className="flex justify-center gap-x-2">
                                                <button className="btn bg-[#84a793] text-white hover:text-black" onClick={() => handleModal(index)}>Products</button>
                                                <dialog id="my_modal_4" className="modal">
                                                    <div className="modal-box w-11/12 max-w-5xl">
                                                        <div>
                                                            <h1 className="text-lg">Name : {orders[modalIndex].name}</h1>
                                                            <div>
                                                                <div className='bg-slate-100 p-2 mb-4 rounded-lg w-[400px] my-6 '>
                                                                    <h1 className='text-2xl font-bold mb-3 text-center'>Total Order</h1>
                                                                    <span className='flex justify-between'>
                                                                        <p className='text-lg font-semibold'>Product Price : </p>
                                                                        <p className='text-lg font-semibold'>{orders[modalIndex].totalPrice}</p>
                                                                    </span>
                                                                    <span className='flex justify-between border-b border-black pb-2'>
                                                                        <p className='text-lg font-semibold'>Shipping Cost : </p>
                                                                        <p className='text-lg font-semibold'>{orders[modalIndex].ShippingCost}</p>
                                                                    </span>
                                                                    <span className='flex justify-between pt-2'>
                                                                        <p className='text-lg font-semibold'>Grand Total : </p>
                                                                        <p className='text-lg font-semibold text-white px-4 rounded-md bg-[#84a793]'>{orders[modalIndex].totalPrice + orders[modalIndex].ShippingCost}</p>
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    {
                                                                        orders[modalIndex].product.map(orderProduct =>
                                                                            <div className="flex gap-x-3 shadow-lg mb-3">
                                                                                <img className="w-[100px] m-1 h-[100px] rounded-md" src={orderProduct.image[0]} alt="" />
                                                                                <div>
                                                                                    <p className="text-lg font-semibold mt-3">{orderProduct.productName}</p>
                                                                                    <p>Quantity : {orderProduct.quantity} pice</p>
                                                                                    <p>Main Price : {orderProduct.mainPrice} Taka</p>
                                                                                    <p>Discount Price : {orderProduct.discountPrice} Taka</p>
                                                                                </div>
                                                                            </div>)
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="modal-action">
                                                            <form method="dialog">
                                                                <button className="btn bg-[#84a793] text-white">Close</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </dialog>
                                                <button onClick={() => handleStatus(order._id, 'reject')} className="btn bg-red-500 text-white hover:text-black">Reject</button>
                                                <button onClick={() => handleStatus(order._id, 'confirmed')} className="btn bg-blue-500 text-white hover:text-black">Confirm</button>
                                            </div>
                                        }
                                        {
                                            order.status === 'reject' &&
                                            <div className="flex justify-between items-center gap-x-3">
                                                <button className="btn bg-red-400 text-white disabled cursor-not-allowed" disabled >Rejected</button>
                                                <button onClick={() => handleRemoveOrder(order._id)} className="text-red-400 cursor-pointer"><ImCross></ImCross></button>
                                            </div>
                                        }
                                        {
                                            order.status === 'confirmed' &&
                                            <div className="flex justify-between items-center gap-x-3">
                                                <Link to={`/dashboard/download/order/${order._id}`} className=" bg-blue-400 p-2 text-white rounded-md">Download Order</Link>
                                                <button onClick={() => handleRemoveOrder(order._id)} className="text-red-400 cursor-pointer"><ImCross></ImCross></button>
                                            </div>
                                            // <div className="bg-blue-400 text-center text-white p-3 rounded-md hover:bg-blue-600">
                                            //     <PDFDownloadLink document={<PDFComponent orderData={order} />} fileName={`${order.name} invoice.pdf`}>
                                            //         {({ blob, url, loading, error }) =>
                                            //             loading ? 'Loading document...' : 'Print order'
                                            //         }
                                            //     </PDFDownloadLink>
                                            // </div>
                                        }
                                    </th>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;