import React from 'react';
import reviewQuote from "../../assets/reviewQuote.png"

const ReviewCard = ({review}) => {
    return (
        <div className='bg-base-100 p-8 rounded-3xl'>
            <img src={reviewQuote} alt="reviewQuote" />
            <p className='text-accent py-4 border-b border-dashed '>{review.review}</p>
            <div className='flex gap-4 mt-6'>
                <img className='size-12 rounded-full' src={review.user_photoURL} alt="" />
                <div>
                    <h2 className='text-secondary text-xl font-extrabold'>{review.userName}</h2>
                    <p className='text-accent'>{review.user_email}</p>
                </div>
            </div>
           
        </div>
    );
};

export default ReviewCard;