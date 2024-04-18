import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './selectProduct.css'
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { Link } from 'react-router-dom';


const SelectedProduct = () => {
    const axiosPublic = useAxiosPublic()
    const { data: allProducts, isLoading } = useQuery({
        queryKey: ['allProducts'],
        queryFn: async () => {
            const response = await axiosPublic.get('/all/products')
            return response.data
        }
    })
    const { data: boyProducts, isLoading: boyLoading } = useQuery({
        queryKey: ['allProducts'],
        queryFn: async () => {
            const response = await axiosPublic.get(`/get/products/Boy`)
            return response.data
        }
    })
    const { data: girlProducts, isLoading: girlLoading } = useQuery({
        queryKey: ['allProducts'],
        queryFn: async () => {
            const response = await axiosPublic.get('/all/products/Girl')
            return response.data
        }
    })


    if (isLoading || boyLoading || girlLoading) {
        return (
            <div className='flex justify-center my-10'>
                <span className="loading loading-ring loading-lg "></span>
            </div>
        )
    }

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
                        <div>
                            <div className='m-10 gap-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
                                {
                                    allProducts?.slice(0, 8).map(product =>
                                        <div key={product._id} className='shadow-lg rounded-md h-[500px] md:h-[450px] lg:h-[500px] relative'>
                                            <div className=''>
                                                <img className='h-[300px] md:h-[220px] lg:h-[280px] w-full rounded-lg' src={product?.image[0]} alt="" />
                                            </div>
                                            <div className='px-4 pt-4'>
                                                <h3 className='text-xl font-bold'>{product.productName.length > 20 ? product.productName.slice(0, 22) : product.productName}{product.productName.length > 15 ? '....' : ''}</h3>
                                                <p className='my-2 text-slate-500'>{product.productDetails.length > 50 ? product.productDetails.slice(0, 50) : product.productDetails}{product.productDetails.length > 50 ? '....' : ''}</p>
                                                <h4><span className='text-xl text-[#84a793] font-bold mr-3'>৳ {product.discountPrice}</span><span className='text-slate-500 font-semibold line-through'>৳ {product.mainPrice}</span></h4>
                                            </div>
                                            <div className='m-3 absolute bottom-0 w-[90%] text-center '>
                                                <Link to={`/productDetails/${product?._id}`}><button className='w-full rounded-md bg-[#84a793] hover:bg-[#303030] delay-75 transition ease-in-out text-white font-bold cursor-pointer py-2'>Bye Now</button></Link>
                                            </div>
                                        </div>)
                                }
                            </div>
                            <Link to='/shop' className='flex justify-center'><button className='px-5 py-3 bg-[#84a793] mb-8 hover:bg-[#303030] delay-75 transition ease-in-out text-white font-medium rounded-md'>Explore More</button></Link>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            <div className='m-10 gap-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
                                {
                                    boyProducts?.slice(0, 8).map(product =>
                                        product.gender === 'Boy' &&
                                        <div key={product._id} className='shadow-lg rounded-md h-[500px] md:h-[450px] lg:h-[500px] relative'>
                                            <div className=''>
                                                <img className='h-[300px] md:h-[220px] lg:h-[280px] w-full rounded-lg' src={product?.image[0]} alt="" />
                                            </div>
                                            <div className='px-4 pt-4'>
                                                <h3 className='text-xl font-bold'>{product.productName.length > 20 ? product.productName.slice(0, 22) : product.productName}{product.productName.length > 15 ? '....' : ''}</h3>
                                                <p className='my-2 text-slate-500'>{product.productDetails.length > 80 ? product.productDetails.slice(0, 80) : product.productDetails}{product.productDetails.length > 80 ? '....' : ''}</p>
                                                <h4><span className='text-xl text-[#84a793] font-bold mr-3'>৳ {product.discountPrice}</span><span className='text-slate-500 font-semibold line-through'>৳ {product.mainPrice}</span></h4>
                                            </div>
                                            <div className='m-3 absolute bottom-0 w-[90%] text-center '>
                                                <Link to={`/productDetails/${product?._id}`}><button className='w-full rounded-md bg-[#84a793] hover:bg-[#303030] delay-75 transition ease-in-out text-white font-bold cursor-pointer py-2'>Bye Now</button></Link>
                                            </div>
                                        </div>)
                                }
                            </div>
                            <Link to='/shop' className='flex justify-center'><button className='px-5 py-3 bg-[#84a793] mb-8 hover:bg-[#303030] delay-75 transition ease-in-out text-white font-medium rounded-md'>Explore More</button></Link>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            <div className='m-10 gap-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
                                {
                                    girlProducts?.slice(0, 8).map(product =>
                                        product.gender === 'Girl' &&
                                        <div key={product._id} className='shadow-lg rounded-md h-[500px] md:h-[450px] lg:h-[500px] relative'>
                                            <div className=''>
                                                <img className='h-[300px] md:h-[220px] lg:h-[280px] w-full rounded-lg' src={product?.image[0]} alt="" />
                                            </div>
                                            <div className='px-4 pt-4'>
                                                <h3 className='text-xl font-bold'>{product.productName.length > 22 ? product.productName.slice(0, 22) : product.productName}{product.productName.length > 22 ? '....' : ''}</h3>
                                                <p className='my-2 text-slate-500'>{product.productDetails.length > 80 ? product.productDetails.slice(0, 80) : product.productDetails}{product.productDetails.length > 80 ? '....' : ''}</p>
                                                <h4><span className='text-xl text-[#84a793] font-bold mr-3'>৳ {product.discountPrice}</span><span className='text-slate-500 font-semibold line-through'>৳ {product.mainPrice}</span></h4>
                                            </div>
                                            <div className='m-3 absolute bottom-0 w-[90%] text-center '>
                                                <Link to={`/productDetails/${product?._id}`}><button className='w-full rounded-md bg-[#84a793] hover:bg-[#303030] delay-75 transition ease-in-out text-white font-bold cursor-pointer py-2'>Bye Now</button></Link>
                                            </div>
                                        </div>)
                                }
                            </div>
                            <Link to='/shop' className='flex justify-center'><button className='px-5 py-3 bg-[#84a793] mb-8 hover:bg-[#303030] delay-75 transition ease-in-out text-white font-medium rounded-md'>Explore More</button></Link>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default SelectedProduct;