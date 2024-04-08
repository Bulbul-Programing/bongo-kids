import './App.css'
import Footer from './SharePage/Footer/Footer';
import Navbar from './SharePage/Navbar/Navbar'
import { Outlet } from "react-router-dom";
function App() {

  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}

export default App
