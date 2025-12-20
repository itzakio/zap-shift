import React from 'react';
import bookingIcon from "../../assets/bookingIcon.png"

const booking = [
    {
        icon: bookingIcon,
        title: "Booking Pick & Drop",
        description: "From personal packages to business shipments — we deliver on time, every time."
    },
    {
        icon: bookingIcon,
        title: "Cash On Delivery",
        description: "From personal packages to business shipments — we deliver on time, every time."
    },
    {
        icon: bookingIcon,
        title: "Delivery Hub",
        description: "From personal packages to business shipments — we deliver on time, every time."
    },
    {
        icon: bookingIcon,
        title: "Booking SME & Corporate",
        description: "From personal packages to business shipments — we deliver on time, every time."
    },
]

const HowItWorks = () => {
    return (
        <section className='text-secondary margin-bottom mx-4'>
            <h2 className='text-3xl font-extrabold mb-8'>How it Works</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                {
                    booking.map((book, index) =>(
                        <div key={index} className='bg-base-100 p-8 rounded-3xl space-y-6'>
                            <img src={book.icon} alt={book.title} />
                            <h3 className='text-xl font-bold'>{book.title}</h3>
                            <p className='text-accent font-medium'>{book.description}</p>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default HowItWorks;