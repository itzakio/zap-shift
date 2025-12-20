import React, { useEffect, useState } from 'react';
import payment from "../../assets/payment.gif"
import { Link, useSearchParams } from 'react-router';
import { MdArrowBack } from 'react-icons/md';
import useAxiosSecure from '../../hook/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const axiosSecure = useAxiosSecure();
    const [paymentInfo, setPaymentInfo] = useState({})
    const session_id = searchParams.get("session_id")

    useEffect(()=>{
        if(session_id){
            axiosSecure.patch(`/verify-payment?session_id=${session_id}`)
            .then(res=>{
                setPaymentInfo({
                    tracking_id: res.data.tracking_id,
                    transaction_id: res.data.transaction_id,
                })
            })
        }
    },[session_id, axiosSecure])

    return (
        <div className='space-y-4 flex flex-col justify-center items-center min-h-screen bg-base-100'>
            <img className='w-40' src={payment} alt="payment" />
            <h2 className='text-4xl font-extrabold text-center'>Payment Successful!</h2> 
            <p><strong>Your Transaction Id:</strong> {paymentInfo?.transaction_id}</p>
            <p><strong>Your Parcel Tracking Id:</strong> {paymentInfo?.tracking_id}</p>
            <Link className='btn btn-primary text-black' to="/dashboard/my-parcels"><MdArrowBack />My Parcels</Link>
        </div>
    );
};

export default PaymentSuccess;