import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './selectProduct.css'

const SelectedProduct = () => {
    return (
        <div className="my-10">
            <h1 className="text-3xl font-medium text-center">Our Selected Products</h1>
            <div className='my-8'>
                <Tabs>
                    <TabList className='flex justify-center gap-x-5 text-xl font-medium '>
                        <Tab className='cursor-pointer'>All</Tab>
                        <Tab className='cursor-pointer'>Boy</Tab>
                        <Tab className='cursor-pointer'>Girl</Tab>
                    </TabList>

                    <TabPanel>
                        <div className='m-10 gap-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
                            <div className='shadow-lg rounded-md'>
                                <div className=''>
                                    <img className='h-[300px] md:h-[220px] lg:h-[280px] w-full' src="https://i.ibb.co/tXbXCFj/cable-texture-sweater-1-343x367-crop-top-1.jpg" alt="" />
                                </div>
                                <div className='px-4 pt-4'>
                                    <h3 className='text-xl font-bold'>Cable Texture Sweater</h3>
                                    <p className='my-2 text-slate-500'>Can’t live without sport? We’re very pleased to ...</p>
                                    <h4><span className='text-xl text-[#84a793] font-bold mr-3'>৳ 200</span><span className='text-slate-500 font-semibold line-through'>৳ 260</span></h4>
                                </div>
                                <div className='m-3'>
                                    <button className='w-full rounded-md bg-[#84a793] hover:bg-[#303030] delay-75 transition ease-in-out text-white font-bold cursor-pointer py-2'>Add to Cart</button>
                                </div>
                            </div>
                            <div className='shadow-lg rounded-md'>
                                <div className=''>
                                    <img className='h-[300px] md:h-[220px] lg:h-[280px] w-full' src="https://i.ibb.co/12pmcWk/jacquard-dress-1-343x367-crop-top.jpg" alt="" />
                                </div>
                                <div className='px-4 pt-4'>
                                    <h3 className='text-xl font-bold'>Jacquard Dress</h3>
                                    <p className='my-2 text-slate-500'>Can’t live without sport? We’re very pleased to ...</p>
                                    <h4><span className='text-xl text-[#84a793] font-bold mr-3'>৳ 200</span><span className='text-slate-500 font-semibold line-through'>৳ 260</span></h4>
                                </div>
                                <div className='m-3'>
                                    <button className='w-full rounded-md bg-[#84a793] hover:bg-[#303030] delay-75 transition ease-in-out text-white font-bold cursor-pointer py-2'>Add to Cart</button>
                                </div>
                            </div>
                            <div className='shadow-lg rounded-md'>
                                <div className=''>
                                    <img className='h-[300px] md:h-[220px] lg:h-[280px] w-full' src="https://i.ibb.co/gWBX12c/contrast-dress-1-343x367-crop-top.webp" alt="" />
                                </div>
                                <div className='px-4 pt-4'>
                                    <h3 className='text-xl font-bold'>Contrast Dress</h3>
                                    <p className='my-2 text-slate-500'>Can’t live without sport? We’re very pleased to ...</p>
                                    <h4><span className='text-xl text-[#84a793] font-bold mr-3'>৳ 200</span><span className='text-slate-500 font-semibold line-through'>৳ 260</span></h4>
                                </div>
                                <div className='m-3'>
                                    <button className='w-full rounded-md bg-[#84a793] hover:bg-[#303030] delay-75 transition ease-in-out text-white font-bold cursor-pointer py-2'>Add to Cart</button>
                                </div>
                            </div>
                            <div className='shadow-lg rounded-md'>
                                <div className=''>
                                    <img className='h-[300px] md:h-[220px] lg:h-[280px] w-full' src="https://i.ibb.co/R6GHt4y/contrast-embroidered-top-1-343x367-crop-top.webp" alt="" />
                                </div>
                                <div className='px-4 pt-4'>
                                    <h3 className='text-xl font-bold'>Contrast Embroidered Top</h3>
                                    <p className='my-2 text-slate-500'>Can’t live without sport? We’re very pleased to ...</p>
                                    <h4><span className='text-xl text-[#84a793] font-bold mr-3'>৳ 200</span><span className='text-slate-500 font-semibold line-through'>৳ 260</span></h4>
                                </div>
                                <div className='m-3'>
                                    <button className='w-full rounded-md bg-[#84a793] hover:bg-[#303030] delay-75 transition ease-in-out text-white font-bold cursor-pointer py-2'>Add to Cart</button>
                                </div>
                            </div>
                            <div className='shadow-lg rounded-md'>
                                <div className=''>
                                    <img className='h-[300px] md:h-[220px] lg:h-[280px] w-full' src="https://i.ibb.co/R6GHt4y/contrast-embroidered-top-1-343x367-crop-top.webp" alt="" />
                                </div>
                                <div className='px-4 pt-4'>
                                    <h3 className='text-xl font-bold'>Contrast Embroidered Top</h3>
                                    <p className='my-2 text-slate-500'>Can’t live without sport? We’re very pleased to ...</p>
                                    <h4><span className='text-xl text-[#84a793] font-bold mr-3'>৳ 200</span><span className='text-slate-500 font-semibold line-through'>৳ 260</span></h4>
                                </div>
                                <div className='m-3'>
                                    <button className='w-full rounded-md bg-[#84a793] hover:bg-[#303030] delay-75 transition ease-in-out text-white font-bold cursor-pointer py-2'>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 2</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 2</h2>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default SelectedProduct;