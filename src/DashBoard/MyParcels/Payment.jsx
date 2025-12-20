import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../components/Loader';

const Payment = () => {
    const {parcelId} = useParams();
    const axiosSecure = useAxiosSecure();

    const {isLoading, data:parcel,} = useQuery({
        queryKey: ["parcel", parcelId],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/parcels/${parcelId}`)
            return res.data;
        }
    })

    const paymentHandler = async() =>{
        const payment_info = {
            cost: parcel.cost,
            parcel_id: parcel._id,
            parcel_name: parcel.parcel_name,
            sender_email: parcel.sender_email,
        }
        const res = await axiosSecure.post("/create-checkout-session", payment_info);
        console.log(res.data);
        window.location.href = res.data.url
    }   

    if(isLoading){
        return <Loader/>
    }
    return (
        <div>
            <h4>Make Payment ${parcel.cost} for: {parcel.parcel_name}</h4>
            <button onClick={paymentHandler} className='btn btn-primary text-black'>Pay</button>
        </div>
    );
};

export default Payment;