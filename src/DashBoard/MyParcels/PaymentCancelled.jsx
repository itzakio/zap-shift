import React from 'react';
import paymentCancelled from "../../assets/cancel-payment.gif"
import { Link } from 'react-router';
import { MdArrowBack } from 'react-icons/md';

const PaymentCancelled = () => {
    return (
        <div className='space-y-4 flex flex-col justify-center items-center min-h-screen bg-base-100'>
            <img className='w-40' src={paymentCancelled} alt="paymentCancelled" />
            <h2 className='text-3xl font-extrabold text-center'>Payment Cancelled, try again!</h2>
            <Link className='btn btn-primary text-black' to="/dashboard/my-parcels"><MdArrowBack />My Parcels</Link>
        </div>
    );
};

export default PaymentCancelled;