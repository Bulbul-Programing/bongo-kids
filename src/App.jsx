import { useContext } from 'react';
import './App.css'
import Footer from './SharePage/Footer/Footer';
import Navbar from './SharePage/Navbar/Navbar'
import { Outlet } from "react-router-dom";
import { AuthContext } from './Coponents/AuthProvider/AuthProvider';

function App() {
  const { user } = useContext(AuthContext)

  return (
    <>
      {
        user?.emailVerified === false && <p className='text-center font-medium py-2 bg-[#84a793] bg-opacity-80 sticky text-white'>Please Verify Your Email. Please check you Email.</p>
      }
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}

export default App
