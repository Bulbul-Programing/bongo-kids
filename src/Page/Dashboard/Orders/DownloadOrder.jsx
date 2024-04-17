import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFComponent from './PDFComponent';

const DownloadOrder = () => {
    const id = useParams()
    const [orderInfo, setOrderInfo] = useState({})
    const axiosSecure = useAxiosSecure()
    
    useEffect(() => {
        const getOrder = async () => {
            await axiosSecure.get(`/get/single/order/${id.orderId}`)
                .then(res => setOrderInfo(res.data))
        }
        getOrder()
    }, [id])

    // console.log(orderInfo);
    return (
        <div>
            <div className="bg-blue-400 text-center m-5 text-white inline-block p-3 rounded-md hover:bg-blue-600">
                <PDFDownloadLink document={<PDFComponent orderData={orderInfo} />} fileName={`${orderInfo.name} invoice.pdf`}>
                    {({ blob, url, loading, error }) =>
                        loading ? 'Loading document...' : 'Print order'
                    }
                </PDFDownloadLink>
            </div>
        </div>
    );
};

export default DownloadOrder;