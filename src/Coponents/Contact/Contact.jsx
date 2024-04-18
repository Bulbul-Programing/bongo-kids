import { MdCall } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";

const Contact = () => {
    return (
        <div className="my-5">
            <div className="bg-[#84a793] text-white flex flex-col md:flex-row lg:flex-row items-center justify-between">
                <div className=" my-5 mx-5 md:mx-10 lg:mx-20">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl text-center md:text-left lg:text-left font-bold">Get in touch</h1>
                    <p className="text-lg my-4 text-center md:text-left lg:text-left lg:mr-[200px]">Want to get in touch? We'd love to hear from you. Here's how you can reach us.</p>
                </div>
                <img className= " md:w-[300px] lg:w-[400px] md:rounded-tl-full lg:rounded-tl-full md:rounded-bl-full lg:rounded-bl-full" src="https://i.ibb.co/fM924w1/12983800-5124105.jpg" alt="" />
            </div>
            <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center  gap-5 my-10">
                <div className=" w-[300px] lg:w-[400px] shadow-xl py-2 rounded-xl">
                    <MdCall className="text-5xl mx-auto my-3"></MdCall>
                    <h1 className="text-2xl font-semibold text-center">Call for Advice or Report</h1>
                    <p className="text-xl font-medium text-center my-2">01985004919</p>
                </div>
                <div className=" w-[300px] lg:w-[400px] shadow-xl py-2 rounded-xl">
                    <AiOutlineMail className="text-5xl mx-auto my-3"></AiOutlineMail>
                    <h1 className="text-2xl font-semibold text-center">Mail</h1>
                    <p className="text-xl font-medium text-center my-2">bongokidsshop@gmail.com</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;