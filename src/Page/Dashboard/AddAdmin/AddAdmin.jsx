import { useContext, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Coponents/AuthProvider/AuthProvider";


const AddAdmin = () => {
    const [loading, setLoading] = useState(false)
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    // const { logOut } = useContext(AuthContext)
    const {logOut} = useContext(AuthContext)


    const { data: allAdmin, refetch, isLoading } = useQuery({
        queryKey: ['getAllAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get('/get/all/admin')
                .catch(error => {
                    if (error.response.data.massage === 'Forbidden') {
                        return logOut()
                        navigate('/login')
                    }
                })
            return res.data
        }
    })

    const handleUpload = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const adminData = { email }
        setLoading(true)
        axiosSecure.post(`/add/admin`, adminData)
            .then(res => {
                if (res.data.massage === 'already admin') {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "This person already admin",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    setLoading(false)
                }
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "admin add successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                    setLoading(false)
                    e.target.reset()
                }
            })
            .catch(error => setLoading(false))
    }

    const handleAdmin = (id) => {
        axiosSecure.delete(`/delete/admin/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Admin delete Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                }
            })
    }
    return (
        <div className="m-2 md:m-5 lg:m-5">
            <div className=" py-5 md:py-10 lg:py-20 rounded-2xl bg-[#eff0f4]">
                <h1 className="text-3xl font-bold text-center">Add admin</h1>
            </div>
            <div className="my-5 md:my-10 lg:my-10">
                <button className="btn bg-blue-400 ml-3 text-white font-bold hover:text-black" onClick={() => document.getElementById('my_modal_5').showModal()}>Add admin</button>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <form onSubmit={handleUpload}>
                            <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="email" name="email" placeholder="Admin email" required /> <br />
                            <div>
                                {
                                    loading === true ? <button className='btn bg-blue-500 w-full text-center'><span className="loading loading-spinner text-white loading-lg"></span></button> : <input className='btn bg-blue-500 w-full text-center text-white hover:text-black' type="submit" value="ADD" />
                                }
                            </div>
                        </form>
                        <div className="modal-action ">
                            <form method="dialog" className="w-full">
                                <button className="btn w-full text-white bg-red-500">Cancel</button>
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
                            <th>email</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allAdmin?.map((admin, index) =>
                                <tr key={admin._id}>
                                    <th>
                                        <h1 className="text-lg">{index + 1}</h1>
                                    </th>

                                    <td className="">
                                        <p className="text-lg font-medium">{admin.email}</p>
                                    </td>
                                    <th className="w-[140px]">
                                        <div className="flex justify-center">
                                            <button onClick={() => handleAdmin(admin._id)} className="btn bg-red-500 text-white hover:text-black">Remove</button>
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

export default AddAdmin;