import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { createContext, useEffect, useState } from "react";
import app from "../../firebaseInfo";


export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const auth = getAuth(app);
    const axiosPublic = useAxiosPublic()
    const [totalCartItem, setTotalCartItem] = useState([])
    const [cartProduct, setCartProduct] = useState([])

    const emailRegister = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const userUpdateProfile = (name, image) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: image
        })
    }

    const emailVerification = () => {
        return sendEmailVerification(auth.currentUser)
    }

    const emailLogin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth)
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const provider = new GoogleAuthProvider();
    const googleLogin = () => {
        return signInWithPopup(auth, provider)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser)
            setLoading(false)
            return () => {
                unSubscribe()
            }
        })
    }, [user])

    const cartItem = (id) => {
        const storedArrayString = localStorage.getItem('CartItemId')
        let myArray = JSON.parse(storedArrayString) || []
        const newItem = id
        const existingItem = myArray.find(g => g === newItem)

        if (existingItem) {
            return
        }
        else {
            myArray.push(newItem)
            const updateArray = JSON.stringify(myArray)
            localStorage.setItem('CartItemId', updateArray)
        }
        const cartItemString = localStorage.getItem('CartItemId')
        let cartItems = JSON.parse(cartItemString)
        setCartProduct(cartItems)

    }

    useEffect(() => {
        const cartItemString = localStorage.getItem('CartItemId')
        let cartItems = JSON.parse(cartItemString)
        setCartProduct(cartItems)
    }, [])

    const authInfo = {
        emailRegister,
        emailLogin,
        userUpdateProfile,
        user,
        emailVerification,
        loading,
        resetPassword,
        logOut,
        googleLogin,
        setTotalCartItem,
        totalCartItem,
        cartItem,
        cartProduct
    }

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;