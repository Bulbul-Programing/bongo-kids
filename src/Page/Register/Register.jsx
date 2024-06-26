import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from 'sweetalert2'
import { AuthContext } from "../../Coponents/AuthProvider/AuthProvider";


const imageHostingKey = import.meta.env.VITE_HOSTING_KEY
const imageHosting = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
const Register = () => {
    const axiosPublic = useAxiosPublic()
    const { emailRegister, userUpdateProfile, user, emailVerification, googleLogin, loading } = useContext(AuthContext)
    const [error, setError] = useState('')
    const Navigate = useNavigate()
    const location = useLocation()
    const [registerLoading, setRegisterLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const [imageError, setImageError] = useState('')


    const onSubmit = async (data) => {
        setRegisterLoading(true)
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(imageHosting, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        },)
            .then()
            .catch(error => {
                setImageError('Please try to another Photo')
            })

        const imageURL = res.data.data.display_url

        if (data.password.length < 6) {
            setRegisterLoading(false)
            return setError('Please set Password minimum 6 character')
        }
        else if (!/[A-Z]/.test(data.password)) {
            setRegisterLoading(false)
            return setError('Please enter minimum one capital later')
        }
        else if (!/[@#$%^&]/.test(data.password)) {
            setRegisterLoading(false)
            return setError('Please enter minimum one special character')
        }
        else {
            emailRegister(data.email, data.password)
                .then(res => {
                    if (res.user.accessToken) {
                        userUpdateProfile(data.name, imageURL)
                            .then(response => {
                                setError('')
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Successfully Register",
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                // const user = { name: data.name, email: data.email }
                                // axiosPublic.post(`/add/new/user`, user)
                                // setImageError('')
                                setRegisterLoading(false)
                                emailVerification()
                                    .then(() => {
                                        console.log('verification mail send');
                                    })
                                Navigate(location?.state ? location.state : '/')
                            })
                    }
                })
                .catch(error =>
                   {
                    setRegisterLoading(false)
                    setError('This email have already register.')
                   }
                )
        }

    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {

                if (res.user.accessToken) {
                    setError('')
                    const user = { name: res.user.displayName, email: res.user.email }
                    axiosPublic.post(`/add/new/user`, user)
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Successfully Register",
                        showConfirmButton: false,
                        timer: 1500
                    })
                    Navigate(location?.state ? location.state : '/')
                }
            })
    }


    return (
        <div className="flex gap-x-5 justify-between items-center m-10 md:m-10 lg:m-20">
            <div className="md:w-[370px] lg:w-[450px] shadow-2xl p-5 rounded-2xl">
                <h1 className="text-2xl font-bold my-5 text-center">Please Register</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {errors.name && <span className="text-red-400">This field is required</span>}
                    <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="text" placeholder="Full Name" {...register("name", { require: true })} /> <br />
                    {errors.image && <span className="text-red-400">This field is required</span>}
                    <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="file" {...register("image", { require: true })} /> <br />
                    <p className="text-red-500 font-medium mb-4">{error}</p>
                    {errors.email && <span className="text-red-400">This field is required</span>}
                    <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="email" placeholder="Email" {...register("email", { required: true })} /> <br />
                    {errors.password && <span className="text-red-400">This field is required</span>}
                    <p className="text-red-400">{error}</p>
                    <input className="px-4 w-full mb-6  outline-none border-2 focus:border-blue-400 py-3 rounded-lg text-slate-500" type="password" placeholder="Password" {...register("password", { required: true })} /> <br />
                    {
                        registerLoading === true ? <span className="loading loading-spinner loading-sm"></span> : <input className='btn bg-blue-500 w-full text-white hover:text-black' type="submit" value="Register" />
                    }
                </form>
                <div>
                    <p className='mt-3 text-sm text-center font-medium mb-2'>Already have account <Link to='/login' className='text-blue-500 font-bold'>Please Login</Link> OR <Link to='/' className="font-bold text-blue-500">Go Home</Link></p>
                    <p className='text-center font-medium'>Or Sign in With</p>
                    <div className='flex justify-center gap-x-4'>
                        <button onClick={handleGoogleLogin}><FaGoogle className=' mt-2 text-3xl text-blue-500'></FaGoogle></button>
                    </div>
                </div>
            </div>
            <div className="w-1/2 hidden md:block lg:block">
                <img src="https://i.ibb.co/HhHfR8J/5165290.jpg" alt="" />
            </div>
        </div>
    );
};

export default Register;