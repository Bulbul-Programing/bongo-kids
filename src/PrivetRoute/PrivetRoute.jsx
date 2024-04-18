import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Coponents/AuthProvider/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const PrivetRoute = ({children}) => {
    const location = useLocation()
    const {user, isLoading} = useContext(AuthContext)
    const [admin , setAdmin] = useState({})
    const axiosPublic = useAxiosPublic()

    useEffect(()=>{
        axiosPublic.get(`/get/isAdmin/${user?.email}`)
        .then(res => setAdmin(res.data))
    }, [user])
    
    if(isLoading){
        return <span className="loading loading-dots loading-lg my-20 text-center"></span>
    }
    if(user && admin){
        return children
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default PrivetRoute;